import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  checkExecutable,
  discoverReels,
  downloadReel,
  extractAudio,
  extractSceneFrames,
  runCommand,
  transcribeAudio,
} from "./commands.ts";
import {
  emptyManifest,
  PROFILE_URL,
  readManifest,
  reconcileDiscovery,
  setStage,
  stageOutputExists,
  validatePrivateDraft,
  writeManifest,
  type DiscoveredReel,
  type Manifest,
  type ReelRecord,
} from "./domain.ts";

const USAGE = `Usage:
  npm run study:designparser -- preflight
  npm run study:designparser -- discover
  npm run study:designparser -- extract [--limit 1] [--reel ID] [--scene-threshold NUMBER]
  npm run study:designparser -- status [--json]
  npm run study:designparser -- validate-drafts`;

type CliArguments =
  | { command: "preflight" }
  | { command: "discover" }
  | { command: "validate-drafts" }
  | { command: "status"; json?: true }
  | {
      command: "extract";
      limit?: 1;
      reel?: string;
      threshold?: number;
    };

export interface CliAdapters {
  checkExecutable(command: string): Promise<void>;
  checkGitIgnored(
    repositoryRoot: string,
    relativePath: string,
  ): Promise<boolean>;
  discoverReels(): Promise<DiscoveredReel[]>;
  downloadReel(reel: DiscoveredReel, reelDirectory: string): Promise<void>;
  extractAudio(reelDirectory: string): Promise<void>;
  transcribeAudio(reelDirectory: string): Promise<void>;
  extractSceneFrames(reelDirectory: string, threshold: number): Promise<void>;
}

export interface CliDependencies {
  repositoryRoot?: string;
  now?: () => string;
  nodeVersion?: string;
  adapters?: CliAdapters;
  stdout?: (line: string) => void;
  stderr?: (line: string) => void;
}

function usageError(message: string): never {
  throw new Error(`${message}\n\n${USAGE}`);
}

export function parseCliArguments(argv: readonly string[]): CliArguments {
  const [command, ...options] = argv;
  if (
    command === "preflight" ||
    command === "discover" ||
    command === "validate-drafts"
  ) {
    if (options.length > 0) usageError(`${command} does not accept options`);
    return { command };
  }
  if (command === "status") {
    if (options.length === 0) return { command };
    if (options.length === 1 && options[0] === "--json") {
      return { command, json: true };
    }
    usageError("status accepts only one --json option");
  }
  if (command !== "extract") usageError("unknown command");

  const parsed: Extract<CliArguments, { command: "extract" }> = { command };
  const seen = new Set<string>();
  for (let index = 0; index < options.length; index += 2) {
    const option = options[index];
    const value = options[index + 1];
    if (
      !option?.startsWith("--") ||
      value === undefined ||
      value.startsWith("--")
    ) {
      usageError("extract options require values");
    }
    if (seen.has(option)) usageError(`duplicate option: ${option}`);
    seen.add(option);
    if (option === "--limit") {
      if (value !== "1") usageError("--limit must be 1");
      parsed.limit = 1;
    } else if (option === "--reel") {
      if (!/^[A-Za-z0-9_-]+$/.test(value)) usageError("--reel is invalid");
      parsed.reel = value;
    } else if (option === "--scene-threshold") {
      const threshold = Number(value);
      if (!Number.isFinite(threshold) || threshold <= 0 || threshold >= 1) {
        usageError("--scene-threshold must be between 0 and 1");
      }
      parsed.threshold = threshold;
    } else {
      usageError(`unknown option: ${option}`);
    }
  }
  if (parsed.limit && parsed.reel) {
    usageError("--limit and --reel are mutually exclusive");
  }
  return parsed;
}

function defaultAdapters(): CliAdapters {
  return {
    checkExecutable: (command) => checkExecutable(command),
    async checkGitIgnored(repositoryRoot, relativePath) {
      const result = await runCommand("git", ["check-ignore", relativePath], {
        cwd: repositoryRoot,
      });
      return result.code === 0;
    },
    discoverReels: () => discoverReels(),
    downloadReel: (reel, directory) => downloadReel(reel, directory),
    extractAudio: (directory) => extractAudio(directory),
    transcribeAudio: (directory) => transcribeAudio(directory),
    extractSceneFrames: (directory, threshold) =>
      extractSceneFrames(directory, threshold),
  };
}

function conciseCause(error: unknown) {
  return error instanceof Error
    ? (error.message.split(/\r?\n/, 1)[0] ?? "unknown error")
    : "unknown error";
}

interface Context {
  repositoryRoot: string;
  cacheRoot: string;
  manifestPath: string;
  now: () => string;
  nodeVersion: string;
  adapters: CliAdapters;
  stdout: (line: string) => void;
  stderr: (line: string) => void;
}

function context(dependencies: CliDependencies): Context {
  const repositoryRoot = dependencies.repositoryRoot ?? process.cwd();
  const cacheRoot = path.join(repositoryRoot, ".study-cache", "designparser");
  return {
    repositoryRoot,
    cacheRoot,
    manifestPath: path.join(cacheRoot, "manifest.json"),
    now: dependencies.now ?? (() => new Date().toISOString()),
    nodeVersion: dependencies.nodeVersion ?? process.versions.node,
    adapters: dependencies.adapters ?? defaultAdapters(),
    stdout: dependencies.stdout ?? console.log,
    stderr: dependencies.stderr ?? console.error,
  };
}

async function loadManifest(ctx: Context): Promise<Manifest> {
  try {
    return await readManifest(ctx.manifestPath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    const manifest = emptyManifest(ctx.now());
    await writeManifest(ctx.manifestPath, manifest);
    return manifest;
  }
}

async function preflight(ctx: Context): Promise<boolean> {
  const failures: string[] = [];
  if (ctx.nodeVersion.split(".")[0] !== "22") {
    failures.push(`Node 22 is required (found ${ctx.nodeVersion})`);
  }

  const executableChecks = await Promise.allSettled(
    ["gallery-dl", "ffmpeg", "whisper"].map((command) =>
      ctx.adapters.checkExecutable(command),
    ),
  );
  executableChecks.forEach((result, index) => {
    if (result.status === "rejected") {
      const command = ["gallery-dl", "ffmpeg", "whisper"][index];
      const cause = conciseCause(result.reason);
      failures.push(cause.includes(command) ? cause : `${command}: ${cause}`);
    }
  });

  try {
    await mkdir(path.join(ctx.cacheRoot, "reels"), { recursive: true });
    const probe = path.join(ctx.cacheRoot, "probe");
    await writeFile(probe, "private cache probe\n");
    await rm(probe);
  } catch (error) {
    failures.push(`cache root is not writable: ${conciseCause(error)}`);
  }

  try {
    const ignored = await ctx.adapters.checkGitIgnored(
      ctx.repositoryRoot,
      ".study-cache/designparser/probe",
    );
    if (!ignored)
      failures.push(".study-cache/designparser/probe is not gitignored");
  } catch (error) {
    failures.push(`git check-ignore failed: ${conciseCause(error)}`);
  }

  if (failures.length > 0) {
    failures.forEach(ctx.stderr);
    return false;
  }
  await loadManifest(ctx);
  return true;
}

async function performDiscovery(ctx: Context): Promise<Manifest | undefined> {
  const manifest = await loadManifest(ctx);
  manifest.discovery = { status: "running", updatedAt: ctx.now() };
  await writeManifest(ctx.manifestPath, manifest);
  try {
    const reels = await ctx.adapters.discoverReels();
    const reconciled = reconcileDiscovery(manifest, reels, ctx.now());
    reconciled.discovery = { status: "complete", updatedAt: ctx.now() };
    await writeManifest(ctx.manifestPath, reconciled);
    return reconciled;
  } catch (error) {
    const detail = `gallery-dl: ${conciseCause(error)}`;
    manifest.discovery = {
      status: "failed",
      updatedAt: ctx.now(),
      error: detail,
    };
    await writeManifest(ctx.manifestPath, manifest);
    ctx.stderr(detail);
    return undefined;
  }
}

const extractionStages = ["download", "audio", "transcript", "frames"] as const;
const executables: Record<(typeof extractionStages)[number], string> = {
  download: "gallery-dl",
  audio: "ffmpeg",
  transcript: "whisper",
  frames: "ffmpeg",
};

async function needsExtraction(ctx: Context, record: ReelRecord) {
  for (const stage of extractionStages) {
    if (
      record.stages[stage].status !== "complete" ||
      !(await stageOutputExists(ctx.cacheRoot, record, stage))
    ) {
      return true;
    }
  }
  return false;
}

async function runStage(
  ctx: Context,
  manifest: Manifest,
  reelId: string,
  stage: (typeof extractionStages)[number],
  threshold: number,
) {
  let record = manifest.reels[reelId];
  if (
    record.stages[stage].status === "complete" &&
    (await stageOutputExists(ctx.cacheRoot, record, stage))
  ) {
    return true;
  }

  record = setStage(record, stage, "running", ctx.now());
  manifest.reels[reelId] = record;
  await writeManifest(ctx.manifestPath, manifest);
  const directory = path.join(ctx.cacheRoot, "reels", reelId);
  try {
    if (stage === "download")
      await ctx.adapters.downloadReel(record, directory);
    else if (stage === "audio") await ctx.adapters.extractAudio(directory);
    else if (stage === "transcript")
      await ctx.adapters.transcribeAudio(directory);
    else await ctx.adapters.extractSceneFrames(directory, threshold);
    if (!(await stageOutputExists(ctx.cacheRoot, record, stage))) {
      throw new Error("output verification failed");
    }
    manifest.reels[reelId] = setStage(record, stage, "complete", ctx.now());
    await writeManifest(ctx.manifestPath, manifest);
    return true;
  } catch (error) {
    const detail = `${executables[stage]}: ${conciseCause(error)}`;
    manifest.reels[reelId] = setStage(
      record,
      stage,
      "failed",
      ctx.now(),
      detail,
    );
    await writeManifest(ctx.manifestPath, manifest);
    ctx.stderr(`${reelId} ${stage}: ${detail}`);
    return false;
  }
}

function newestFirst(left: ReelRecord, right: ReelRecord) {
  return (
    (right.publishedAt ?? right.observedAt).localeCompare(
      left.publishedAt ?? left.observedAt,
    ) || left.id.localeCompare(right.id)
  );
}

async function extract(
  ctx: Context,
  options: Extract<CliArguments, { command: "extract" }>,
) {
  const manifest = await performDiscovery(ctx);
  if (!manifest) return false;
  let records = Object.values(manifest.reels).sort(newestFirst);
  if (options.reel) {
    const requested = manifest.reels[options.reel];
    if (!requested) {
      ctx.stderr(`reel ${options.reel} was not discovered`);
      return false;
    }
    records = [requested];
  } else {
    const pending: ReelRecord[] = [];
    for (const record of records) {
      if (await needsExtraction(ctx, record)) pending.push(record);
    }
    records = pending;
    if (options.limit) records = records.slice(0, options.limit);
  }

  let succeeded = true;
  for (const record of records) {
    for (const stage of extractionStages) {
      if (
        !(await runStage(
          ctx,
          manifest,
          record.id,
          stage,
          options.threshold ?? 0.32,
        ))
      ) {
        succeeded = false;
        break;
      }
    }
  }
  return succeeded;
}

function totals(manifest: Manifest) {
  const records = Object.values(manifest.reels);
  return {
    discovered: records.length,
    extracted: records.filter(
      (record) => record.stages.frames.status === "complete",
    ).length,
    failed: records.filter((record) =>
      extractionStages.some(
        (stage) => record.stages[stage].status === "failed",
      ),
    ).length,
    draftReady: records.filter(
      (record) =>
        record.stages.frames.status === "complete" &&
        record.stages.draft.status !== "complete",
    ).length,
  };
}

async function printStatus(ctx: Context, json: boolean) {
  const manifest = await loadManifest(ctx);
  const summary = totals(manifest);
  if (json) {
    ctx.stdout(JSON.stringify(summary));
    return;
  }
  ctx.stdout(`discovered: ${summary.discovered}`);
  ctx.stdout(`extracted: ${summary.extracted}`);
  ctx.stdout(`failed: ${summary.failed}`);
  ctx.stdout(`draft-ready: ${summary.draftReady}`);
  for (const record of Object.values(manifest.reels).sort(newestFirst)) {
    if (
      record.stages.frames.status === "complete" &&
      record.stages.draft.status !== "complete"
    ) {
      ctx.stdout(`draft-ready ${record.id}`);
    }
  }
}

async function validateDrafts(ctx: Context) {
  const manifest = await loadManifest(ctx);
  const reelsRoot = path.join(ctx.cacheRoot, "reels");
  await mkdir(reelsRoot, { recursive: true });
  const directories = (await readdir(reelsRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  let valid = true;
  for (const id of directories) {
    const draftPath = path.join(reelsRoot, id, "draft.json");
    let source: string;
    try {
      source = await readFile(draftPath, "utf8");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") continue;
      ctx.stderr(`${id}/draft.json: ${conciseCause(error)}`);
      valid = false;
      continue;
    }
    try {
      const record = manifest.reels[id];
      if (!record) throw new Error("reel is not in the manifest");
      const draft = validatePrivateDraft(JSON.parse(source));
      if (draft.reelId !== id)
        throw new Error("reelId does not match its directory");
      manifest.reels[id] = setStage(record, "draft", "complete", ctx.now());
      await writeManifest(ctx.manifestPath, manifest);
    } catch (error) {
      ctx.stderr(`${id}/draft.json: ${conciseCause(error)}`);
      valid = false;
    }
  }
  return valid;
}

export async function runCli(
  argv: readonly string[],
  dependencies: CliDependencies = {},
): Promise<number> {
  const ctx = context(dependencies);
  let args: CliArguments;
  try {
    args = parseCliArguments(argv);
  } catch (error) {
    ctx.stderr(error instanceof Error ? error.message : USAGE);
    return 1;
  }

  try {
    if (args.command === "status") {
      await printStatus(ctx, args.json === true);
      return 0;
    }
    if (args.command === "validate-drafts") {
      return (await validateDrafts(ctx)) ? 0 : 1;
    }
    if (!(await preflight(ctx))) return 1;
    if (args.command === "preflight") {
      ctx.stdout(`ready: ${PROFILE_URL}`);
      return 0;
    }
    if (args.command === "discover") {
      return (await performDiscovery(ctx)) ? 0 : 1;
    }
    return (await extract(ctx, args)) ? 0 : 1;
  } catch (error) {
    ctx.stderr(conciseCause(error));
    return 1;
  }
}

const isMain =
  process.argv[1] !== undefined &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isMain) process.exitCode = await runCli(process.argv.slice(2));
