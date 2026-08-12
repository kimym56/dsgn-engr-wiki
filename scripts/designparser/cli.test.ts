// @vitest-environment node

import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { beforeEach, describe, expect, it } from "vitest";
import {
  parseCliArguments,
  runCli,
  type CliAdapters,
  type CliDependencies,
} from "./cli.ts";
import {
  emptyManifest,
  PROFILE_URL,
  readManifest,
  reconcileDiscovery,
  setStage,
  writeManifest,
  type DiscoveredReel,
  type Manifest,
} from "./domain.ts";

const newest = reel("newest", "2026-08-02T00:00:00.000Z");
const older = reel("older", "2026-08-01T00:00:00.000Z");

function reel(id: string, publishedAt: string): DiscoveredReel {
  return { id, url: `https://www.instagram.com/reel/${id}/`, publishedAt };
}

function validDraft(id: string) {
  return {
    reelId: id,
    status: "needs-review",
    title: "A title",
    summary: "A summary",
    principles: ["A principle"],
    applications: ["An application"],
    uncertainties: [],
    evidence: [{ label: "Opening", start: 0, end: 1 }],
    slides: Array.from({ length: 4 }, () => ({
      kind: "principle",
      eyebrow: "Design",
      title: "A slide",
      body: "Original wording",
      visual: { type: "rule", statement: "Use hierarchy" },
    })),
  };
}

function cacheRoot(root: string) {
  return path.join(root, ".study-cache", "designparser");
}

function manifestPath(root: string) {
  return path.join(cacheRoot(root), "manifest.json");
}

function reelRoot(root: string, id: string) {
  return path.join(cacheRoot(root), "reels", id);
}

function adapters(
  discovered: DiscoveredReel[] = [newest, older],
): CliAdapters & { calls: string[] } {
  const calls: string[] = [];
  return {
    calls,
    async checkExecutable(command) {
      calls.push(`check:${command}`);
    },
    async checkGitIgnored() {
      calls.push("check:git-ignore");
      return true;
    },
    async discoverReels() {
      calls.push("discover");
      return discovered;
    },
    async downloadReel(value, directory) {
      calls.push(`download:${value.id}`);
      await mkdir(directory, { recursive: true });
      await writeFile(path.join(directory, "source.mp4"), "video");
      await writeFile(path.join(directory, "source.json"), "{}\n");
    },
    async extractAudio(directory) {
      calls.push(`audio:${path.basename(directory)}`);
      await writeFile(path.join(directory, "audio.wav"), "audio");
    },
    async transcribeAudio(directory) {
      calls.push(`transcript:${path.basename(directory)}`);
      await writeFile(path.join(directory, "transcript.json"), "{}\n");
      await writeFile(path.join(directory, "transcript.txt"), "words\n");
    },
    async extractSceneFrames(directory, threshold) {
      calls.push(`frames:${path.basename(directory)}:${threshold}`);
      await mkdir(path.join(directory, "frames"), { recursive: true });
      await writeFile(
        path.join(directory, "frames", "000000.000.jpg"),
        "frame",
      );
    },
  };
}

function dependencies(
  root: string,
  commandAdapters: CliAdapters,
  output: string[] = [],
): CliDependencies {
  return {
    repositoryRoot: root,
    now: () => "2026-08-12T00:00:00.000Z",
    nodeVersion: "22.20.0",
    adapters: commandAdapters,
    stdout: (line) => output.push(line),
    stderr: (line) => output.push(line),
  };
}

async function saveManifest(root: string, manifest: Manifest) {
  await mkdir(cacheRoot(root), { recursive: true });
  await writeManifest(manifestPath(root), manifest);
}

describe("Designparser CLI", () => {
  let root: string;

  beforeEach(async () => {
    root = await mkdtemp(path.join(tmpdir(), "designparser-cli-"));
  });

  it("rejects commands and options outside the exact authoring interface", () => {
    const invalid = [
      [],
      ["unknown"],
      ["preflight", PROFILE_URL],
      ["discover", "--json"],
      ["extract", "--limit", "2"],
      ["extract", "--limit", "1", "--limit", "1"],
      ["extract", "--reel", "bad/id"],
      ["extract", "--reel", "valid", "--limit", "1"],
      ["extract", "--scene-threshold", "1"],
      ["extract", "--scene-threshold", "NaN"],
      ["status", "--json", "--json"],
      ["validate-drafts", "--json"],
    ];

    for (const argv of invalid) {
      expect(() => parseCliArguments(argv)).toThrow("Usage:");
    }
    expect(
      parseCliArguments([
        "extract",
        "--reel",
        "C-example_1",
        "--scene-threshold",
        "0.32",
      ]),
    ).toEqual({ command: "extract", reel: "C-example_1", threshold: 0.32 });
  });

  it("reports every missing executable before discovery", async () => {
    const commandAdapters = adapters();
    commandAdapters.checkExecutable = async (command) => {
      throw new Error(`${command} is unavailable`);
    };
    let discoveryCalls = 0;
    commandAdapters.discoverReels = async () => {
      discoveryCalls++;
      return [newest];
    };
    const output: string[] = [];

    expect(
      await runCli(["discover"], dependencies(root, commandAdapters, output)),
    ).toBe(1);
    expect(output.join("\n")).toContain("gallery-dl is unavailable");
    expect(output.join("\n")).toContain("ffmpeg is unavailable");
    expect(output.join("\n")).toContain("whisper is unavailable");
    expect(discoveryCalls).toBe(0);
  });

  it("requires Node 22 and the private cache ignore rule", async () => {
    const commandAdapters = adapters();
    commandAdapters.checkGitIgnored = async () => false;
    const output: string[] = [];
    const deps = dependencies(root, commandAdapters, output);
    deps.nodeVersion = "23.0.0";

    expect(await runCli(["preflight"], deps)).toBe(1);
    expect(output.join("\n")).toContain("Node 22");
    expect(output.join("\n")).toContain(".study-cache/designparser/probe");
  });

  it("marks discovery complete only after a complete result", async () => {
    const commandAdapters = adapters();
    let release!: (value: DiscoveredReel[]) => void;
    let entered!: () => void;
    const discoveryStarted = new Promise<void>((resolve) => {
      entered = resolve;
    });
    commandAdapters.discoverReels = () =>
      new Promise((resolve) => {
        entered();
        release = resolve;
      });
    const running = runCli(["discover"], dependencies(root, commandAdapters));

    await discoveryStarted;
    await expect(readManifest(manifestPath(root))).resolves.toMatchObject({
      discovery: { status: "running" },
    });
    release([newest]);
    expect(await running).toBe(0);
    await expect(readManifest(manifestPath(root))).resolves.toMatchObject({
      discovery: { status: "complete" },
      reels: { newest: { id: "newest" } },
    });
  });

  it("extract --limit 1 processes exactly the newest pending reel", async () => {
    const commandAdapters = adapters();

    expect(
      await runCli(
        ["extract", "--limit", "1"],
        dependencies(root, commandAdapters),
      ),
    ).toBe(0);
    expect(commandAdapters.calls.filter((call) => call.includes(":"))).toEqual([
      "check:gallery-dl",
      "check:ffmpeg",
      "check:whisper",
      "check:git-ignore",
      "download:newest",
      "audio:newest",
      "transcript:newest",
      "frames:newest:0.32",
    ]);
    const manifest = await readManifest(manifestPath(root));
    expect(manifest.reels.newest.stages.frames.status).toBe("complete");
    expect(manifest.reels.newest.stages.draft.status).toBe("pending");
    expect(manifest.reels.older.stages.download.status).toBe("pending");
  });

  it("records a transcript failure without hiding completed stages and resumes there", async () => {
    const commandAdapters = adapters([newest]);
    commandAdapters.transcribeAudio = async (directory) => {
      commandAdapters.calls.push(`transcript:${path.basename(directory)}`);
      throw new Error("model failed");
    };

    expect(
      await runCli(
        ["extract", "--reel", newest.id],
        dependencies(root, commandAdapters),
      ),
    ).toBe(1);
    let manifest = await readManifest(manifestPath(root));
    expect(manifest.reels.newest.stages.download.status).toBe("complete");
    expect(manifest.reels.newest.stages.audio.status).toBe("complete");
    expect(manifest.reels.newest.stages.transcript).toMatchObject({
      status: "failed",
      error: expect.stringContaining("whisper"),
    });
    expect(manifest.reels.newest.stages.frames.status).toBe("pending");

    const recovered = adapters([newest]);
    expect(
      await runCli(
        ["extract", "--reel", newest.id],
        dependencies(root, recovered),
      ),
    ).toBe(0);
    expect(recovered.calls).not.toContain("download:newest");
    expect(recovered.calls).not.toContain("audio:newest");
    expect(recovered.calls).toContain("transcript:newest");
    expect(recovered.calls).toContain("frames:newest:0.32");
    manifest = await readManifest(manifestPath(root));
    expect(manifest.reels.newest.stages.transcript.status).toBe("complete");
  });

  it("retries a stale running stage", async () => {
    const manifest = reconcileDiscovery(
      emptyManifest("2026-08-12T00:00:00.000Z"),
      [newest],
      "2026-08-12T00:00:00.000Z",
    );
    manifest.discovery.status = "complete";
    for (const stage of ["download", "audio"] as const) {
      manifest.reels.newest = setStage(
        manifest.reels.newest,
        stage,
        "complete",
        "2026-08-12T00:00:00.000Z",
      );
    }
    manifest.reels.newest = setStage(
      manifest.reels.newest,
      "transcript",
      "running",
      "2026-08-11T00:00:00.000Z",
    );
    await saveManifest(root, manifest);
    await mkdir(reelRoot(root, newest.id), { recursive: true });
    await writeFile(path.join(reelRoot(root, newest.id), "source.json"), "{}");
    await writeFile(
      path.join(reelRoot(root, newest.id), "source.mp4"),
      "video",
    );
    await writeFile(path.join(reelRoot(root, newest.id), "audio.wav"), "audio");
    const commandAdapters = adapters([newest]);

    expect(
      await runCli(
        ["extract", "--reel", newest.id],
        dependencies(root, commandAdapters),
      ),
    ).toBe(0);
    expect(commandAdapters.calls).toContain("transcript:newest");
  });

  it("persists running before an adapter starts", async () => {
    const commandAdapters = adapters([newest]);
    let release!: () => void;
    let entered!: () => void;
    const audioStarted = new Promise<void>((resolve) => {
      entered = resolve;
    });
    commandAdapters.extractAudio = (directory) =>
      new Promise((resolve) => {
        entered();
        release = async () => {
          await writeFile(path.join(directory, "audio.wav"), "audio");
          resolve();
        };
      });
    const extraction = runCli(
      ["extract", "--reel", newest.id],
      dependencies(root, commandAdapters),
    );

    await audioStarted;
    await expect(readManifest(manifestPath(root))).resolves.toMatchObject({
      reels: { newest: { stages: { audio: { status: "running" } } } },
    });
    release();
    expect(await extraction).toBe(0);
  });

  it("retries missing completed frames and resets a completed draft", async () => {
    const manifest = reconcileDiscovery(
      emptyManifest("2026-08-12T00:00:00.000Z"),
      [newest],
      "2026-08-12T00:00:00.000Z",
    );
    for (const stage of [
      "download",
      "audio",
      "transcript",
      "frames",
      "draft",
    ] as const) {
      manifest.reels.newest = setStage(
        manifest.reels.newest,
        stage,
        "complete",
        "2026-08-12T00:00:00.000Z",
      );
    }
    await saveManifest(root, manifest);
    await mkdir(reelRoot(root, newest.id), { recursive: true });
    await writeFile(path.join(reelRoot(root, newest.id), "source.json"), "{}");
    await writeFile(
      path.join(reelRoot(root, newest.id), "source.mp4"),
      "video",
    );
    await writeFile(path.join(reelRoot(root, newest.id), "audio.wav"), "audio");
    await writeFile(
      path.join(reelRoot(root, newest.id), "transcript.json"),
      "{}",
    );
    await writeFile(
      path.join(reelRoot(root, newest.id), "transcript.txt"),
      "words",
    );
    const commandAdapters = adapters([newest]);

    expect(
      await runCli(
        ["extract", "--reel", newest.id],
        dependencies(root, commandAdapters),
      ),
    ).toBe(0);
    expect(commandAdapters.calls).not.toContain("download:newest");
    expect(commandAdapters.calls).not.toContain("audio:newest");
    expect(commandAdapters.calls).not.toContain("transcript:newest");
    expect(commandAdapters.calls).toContain("frames:newest:0.32");
    await expect(readManifest(manifestPath(root))).resolves.toMatchObject({
      reels: { newest: { stages: { draft: { status: "pending" } } } },
    });
  });

  it("runs reels sequentially and continues after one reel fails", async () => {
    const commandAdapters = adapters([newest, older]);
    commandAdapters.downloadReel = async (value, directory) => {
      commandAdapters.calls.push(`download:start:${value.id}`);
      if (value.id === newest.id) {
        commandAdapters.calls.push(`download:failed:${value.id}`);
        throw new Error("inaccessible");
      }
      await mkdir(directory, { recursive: true });
      await writeFile(path.join(directory, "source.mp4"), "video");
      await writeFile(path.join(directory, "source.json"), "{}\n");
      commandAdapters.calls.push(`download:end:${value.id}`);
    };

    expect(await runCli(["extract"], dependencies(root, commandAdapters))).toBe(
      1,
    );
    expect(
      commandAdapters.calls.filter(
        (call) =>
          call.startsWith("download:") ||
          call.startsWith("audio:") ||
          call.startsWith("transcript:") ||
          call.startsWith("frames:"),
      ),
    ).toEqual([
      "download:start:newest",
      "download:failed:newest",
      "download:start:older",
      "download:end:older",
      "audio:older",
      "transcript:older",
      "frames:older:0.32",
    ]);
  });

  it("status reports discovered, extracted, failed, and draft-ready totals", async () => {
    const manifest = reconcileDiscovery(
      emptyManifest("2026-08-12T00:00:00.000Z"),
      [newest, older, reel("failed", "2026-07-31T00:00:00.000Z")],
      "2026-08-12T00:00:00.000Z",
    );
    for (const stage of [
      "download",
      "audio",
      "transcript",
      "frames",
    ] as const) {
      manifest.reels.newest = setStage(
        manifest.reels.newest,
        stage,
        "complete",
        "2026-08-12T00:00:00.000Z",
      );
    }
    manifest.reels.failed = setStage(
      manifest.reels.failed,
      "download",
      "failed",
      "2026-08-12T00:00:00.000Z",
      "gallery-dl: inaccessible",
    );
    await saveManifest(root, manifest);
    const output: string[] = [];

    expect(
      await runCli(
        ["status", "--json"],
        dependencies(root, adapters(), output),
      ),
    ).toBe(0);
    expect(JSON.parse(output.join("\n"))).toMatchObject({
      discovered: 3,
      extracted: 1,
      failed: 1,
      draftReady: 1,
    });
  });

  it("names all invalid drafts, preserves them, and completes only valid draft stages", async () => {
    let manifest = reconcileDiscovery(
      emptyManifest("2026-08-12T00:00:00.000Z"),
      [newest, older, reel("broken", "2026-07-31T00:00:00.000Z")],
      "2026-08-12T00:00:00.000Z",
    );
    for (const id of Object.keys(manifest.reels)) {
      for (const stage of [
        "download",
        "audio",
        "transcript",
        "frames",
      ] as const) {
        manifest.reels[id] = setStage(
          manifest.reels[id],
          stage,
          "complete",
          "2026-08-12T00:00:00.000Z",
        );
      }
      await mkdir(reelRoot(root, id), { recursive: true });
    }
    manifest.reels.older = setStage(
      manifest.reels.older,
      "draft",
      "complete",
      "2026-08-12T00:00:00.000Z",
    );
    await saveManifest(root, manifest);
    const validText = `${JSON.stringify(validDraft(newest.id), null, 2)}\n`;
    const wrongIdText = `${JSON.stringify(validDraft("someone-else"))}\n`;
    const malformedText = "{invalid\n";
    await writeFile(
      path.join(reelRoot(root, newest.id), "draft.json"),
      validText,
    );
    await writeFile(
      path.join(reelRoot(root, older.id), "draft.json"),
      wrongIdText,
    );
    await writeFile(
      path.join(reelRoot(root, "broken"), "draft.json"),
      malformedText,
    );
    const output: string[] = [];

    expect(
      await runCli(["validate-drafts"], dependencies(root, adapters(), output)),
    ).toBe(1);
    expect(output.join("\n")).toContain("older/draft.json");
    expect(output.join("\n")).toContain("broken/draft.json");
    await expect(
      readFile(path.join(reelRoot(root, older.id), "draft.json"), "utf8"),
    ).resolves.toBe(wrongIdText);
    await expect(
      readFile(path.join(reelRoot(root, "broken"), "draft.json"), "utf8"),
    ).resolves.toBe(malformedText);
    manifest = await readManifest(manifestPath(root));
    expect(manifest.reels.newest.stages.draft.status).toBe("complete");
    expect(manifest.reels.older.stages.draft).toMatchObject({
      status: "failed",
      error: expect.stringContaining("reelId"),
    });
    expect(manifest.reels.broken.stages.draft).toMatchObject({
      status: "failed",
      error: expect.any(String),
    });
  });
});
