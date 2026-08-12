import { spawn } from "node:child_process";
import {
  mkdir,
  readdir,
  readFile,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { PROFILE_URL, type DiscoveredReel } from "./domain.ts";

export interface CommandResult {
  code: number;
  stdout: string;
  stderr: string;
}

export type CommandRunner = (
  command: string,
  args: readonly string[],
  options?: { cwd?: string },
) => Promise<CommandResult>;

export const runCommand: CommandRunner = (command, args, options) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: options?.cwd, shell: false });
    let stdout = "";
    let stderr = "";
    let settled = false;
    const fail = (error: Error) => {
      if (settled) return;
      settled = true;
      reject(error);
    };

    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk: string) => (stdout += chunk));
    child.stderr.on("data", (chunk: string) => (stderr += chunk));
    child.on("error", () => fail(new Error(`${command} failed to start`)));
    child.on("close", (code, signal) => {
      if (signal) return fail(new Error(`${command} terminated by ${signal}`));
      if (code === null) return fail(new Error(`${command} terminated`));
      if (settled) return;
      settled = true;
      resolve({ code, stdout, stderr });
    });
  });

export async function checkExecutable(
  command: string,
  runner: CommandRunner = runCommand,
) {
  if ((await runner(command, ["--version"])).code !== 0) {
    throw new Error(`${command} is unavailable`);
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function shortcode(value: unknown): value is string {
  return typeof value === "string" && /^[A-Za-z0-9_-]+$/.test(value);
}

function publishedAt(value: unknown): string | undefined {
  if (typeof value !== "string" || value.trim() === "") return undefined;
  const source = value.trim();
  const date = new Date(
    /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(source)
      ? `${source.replace(" ", "T")}Z`
      : source,
  );
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function hasInterruption(output: string) {
  return /login|challenge|not logged in|rate[\s-]*limit/i.test(output);
}

const discoveryArgs = [
  "--cookies-from-browser",
  "chrome/.instagram.com",
  "--sleep-request",
  "6.0-12.0",
  "--no-colors",
  "-o",
  "extractor.instagram.include=reels",
  "--dump-json",
  PROFILE_URL,
] as const;

export async function discoverReels(
  runner: CommandRunner = runCommand,
): Promise<DiscoveredReel[]> {
  const result = await runner("gallery-dl", discoveryArgs);
  if (result.code !== 0) throw new Error("gallery-dl discovery failed");
  if (hasInterruption(result.stderr)) {
    throw new Error("gallery-dl discovery was interrupted");
  }

  let messages: unknown;
  try {
    messages = JSON.parse(result.stdout);
  } catch {
    throw new Error("gallery-dl discovery output is invalid");
  }
  if (!Array.isArray(messages)) {
    throw new Error("gallery-dl discovery output is invalid");
  }

  const reels = new Map<string, DiscoveredReel>();
  for (const message of messages) {
    if (!Array.isArray(message) || message[0] !== 3 || !isObject(message[2]))
      continue;
    const metadata = message[2];
    if (
      !shortcode(metadata.post_shortcode) ||
      metadata.username !== "designparser" ||
      typeof metadata.video_url !== "string" ||
      metadata.video_url.trim() === ""
    ) {
      continue;
    }
    const date = publishedAt(metadata.date);
    const next =
      date === undefined
        ? {
            id: metadata.post_shortcode,
            url: `https://www.instagram.com/reel/${metadata.post_shortcode}/`,
          }
        : {
            id: metadata.post_shortcode,
            url: `https://www.instagram.com/reel/${metadata.post_shortcode}/`,
            publishedAt: date,
          };
    const current = reels.get(metadata.post_shortcode);
    if (!current || (next.publishedAt ?? "") > (current.publishedAt ?? "")) {
      reels.set(metadata.post_shortcode, next);
    }
  }

  const discovered = [...reels.values()].sort(
    (a, b) =>
      (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "") ||
      a.id.localeCompare(b.id),
  );
  if (discovered.length === 0) {
    throw new Error("gallery-dl discovery found no reels");
  }
  return discovered;
}

function isCanonicalReel(reel: DiscoveredReel) {
  return (
    shortcode(reel.id) &&
    reel.url === `https://www.instagram.com/reel/${reel.id}/`
  );
}

function metadataNumber(value: unknown, field: string) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    throw new Error(`gallery-dl metadata ${field} is invalid`);
  }
  return value;
}

const downloadArgs = (reel: DiscoveredReel, reelDirectory: string) => [
  "--cookies-from-browser",
  "chrome/.instagram.com",
  "--sleep-request",
  "6.0-12.0",
  "--no-colors",
  "-o",
  "extractor.instagram.videos=merged",
  "--filter",
  "video_url",
  "--directory",
  reelDirectory,
  "--filename",
  "downloaded-{num}.{extension}",
  "--write-metadata",
  reel.url,
];

export async function downloadReel(
  reel: DiscoveredReel,
  reelDirectory: string,
  runner: CommandRunner = runCommand,
) {
  if (!isCanonicalReel(reel)) throw new Error("reel URL must be canonical");
  await mkdir(reelDirectory);
  const result = await runner("gallery-dl", downloadArgs(reel, reelDirectory));
  if (result.code !== 0) throw new Error("gallery-dl download failed");

  const files = await readdir(reelDirectory, { withFileTypes: true });
  const videos = files.filter(
    (file) => file.isFile() && path.extname(file.name).toLowerCase() === ".mp4",
  );
  if (videos.length !== 1)
    throw new Error("gallery-dl download must contain exactly one MP4");

  const video = videos[0];
  const base = path.basename(video.name, path.extname(video.name));
  const metadataPath = path.join(reelDirectory, `${base}.json`);
  let metadata: unknown;
  try {
    metadata = JSON.parse(await readFile(metadataPath, "utf8"));
  } catch {
    throw new Error("gallery-dl metadata is missing or invalid");
  }
  if (
    !isObject(metadata) ||
    metadata.post_shortcode !== reel.id ||
    metadata.username !== "designparser"
  ) {
    throw new Error("gallery-dl metadata does not match the reel");
  }
  const date = publishedAt(metadata.date);
  if (!date) throw new Error("gallery-dl metadata date is invalid");

  const source = {
    id: reel.id,
    url: reel.url,
    creator: "@designparser",
    publishedAt: date,
    duration: metadataNumber(metadata.duration, "duration"),
    width: metadataNumber(metadata.width, "width"),
    height: metadataNumber(metadata.height, "height"),
  };
  await rename(
    path.join(reelDirectory, video.name),
    path.join(reelDirectory, "source.mp4"),
  );
  const temporary = path.join(reelDirectory, "source.json.tmp");
  await writeFile(temporary, `${JSON.stringify(source)}\n`);
  await rename(temporary, path.join(reelDirectory, "source.json"));
  await Promise.all(
    files
      .filter((file) => file.isFile() && path.extname(file.name) === ".json")
      .map((file) => rm(path.join(reelDirectory, file.name))),
  );
}
