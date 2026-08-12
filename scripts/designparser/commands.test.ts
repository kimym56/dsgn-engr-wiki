// @vitest-environment node

import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  checkExecutable,
  discoverReels,
  downloadReel,
  type CommandResult,
  type CommandRunner,
} from "./commands.ts";
import { PROFILE_URL } from "./domain.ts";

const reel = {
  id: "C-example_1",
  url: "https://www.instagram.com/reel/C-example_1/",
  publishedAt: "2026-08-01T12:00:00.000Z",
};

const galleryOutput = JSON.stringify([
  [2, { username: "designparser" }],
  [
    3,
    "https://scontent.example/video.mp4",
    {
      post_shortcode: "C-example_1",
      post_id: "123456789",
      post_url: "https://www.instagram.com/p/C-example_1/",
      username: "designparser",
      date: "2026-08-01 12:00:00",
      video_url: "https://scontent.example/video.mp4",
      extension: "mp4",
    },
  ],
  [
    3,
    "https://scontent.example/cover.jpg",
    { post_shortcode: "C-example_1", extension: "jpg" },
  ],
]);

function runner(result: CommandResult): CommandRunner {
  return async () => result;
}

describe("Designparser command adapters", () => {
  it("normalizes Designparser video messages from complete gallery discovery", async () => {
    const calls: Array<{ command: string; args: readonly string[] }> = [];
    const result = await discoverReels(async (command, args) => {
      calls.push({ command, args });
      return { code: 0, stdout: galleryOutput, stderr: "" };
    });

    expect(result).toEqual([reel]);
    expect(calls).toEqual([
      {
        command: "gallery-dl",
        args: [
          "--cookies-from-browser",
          "chrome/.instagram.com",
          "--sleep-request",
          "6.0-12.0",
          "--no-colors",
          "-o",
          "extractor.instagram.include=reels",
          "--dump-json",
          PROFILE_URL,
        ],
      },
    ]);
  });

  it("rejects partial gallery discovery after a nonzero exit", async () => {
    await expect(
      discoverReels(runner({ code: 1, stdout: galleryOutput, stderr: "" })),
    ).rejects.toThrow("gallery-dl discovery failed");
  });

  it("rejects malformed, challenged, and empty gallery responses", async () => {
    await expect(
      discoverReels(runner({ code: 0, stdout: "not json", stderr: "" })),
    ).rejects.toThrow("gallery-dl discovery output is invalid");
    await expect(
      discoverReels(
        runner({ code: 0, stdout: galleryOutput, stderr: "login challenge" }),
      ),
    ).rejects.toThrow("gallery-dl discovery was interrupted");
    await expect(
      discoverReels(runner({ code: 0, stdout: "[]", stderr: "" })),
    ).rejects.toThrow("gallery-dl discovery found no reels");
  });

  it("deduplicates and orders complete gallery discovery by publication date", async () => {
    const output = JSON.stringify([
      [
        3,
        "https://scontent.example/one.mp4",
        {
          post_shortcode: "older",
          username: "designparser",
          video_url: "https://scontent.example/one.mp4",
          date: "2026-08-01 12:00:00",
        },
      ],
      [
        3,
        "https://scontent.example/two.mp4",
        {
          post_shortcode: "newer",
          username: "designparser",
          video_url: "https://scontent.example/two.mp4",
          date: "2026-08-02 12:00:00",
        },
      ],
      [
        3,
        "https://scontent.example/newer.mp4",
        {
          post_shortcode: "newer",
          username: "designparser",
          video_url: "https://scontent.example/newer.mp4",
          date: "2026-08-01 12:00:00",
        },
      ],
    ]);

    await expect(
      discoverReels(runner({ code: 0, stdout: output, stderr: "" })),
    ).resolves.toEqual([
      {
        id: "newer",
        url: "https://www.instagram.com/reel/newer/",
        publishedAt: "2026-08-02T12:00:00.000Z",
      },
      {
        id: "older",
        url: "https://www.instagram.com/reel/older/",
        publishedAt: "2026-08-01T12:00:00.000Z",
      },
    ]);
  });

  it("rejects unavailable executables", async () => {
    await expect(
      checkExecutable(
        "gallery-dl",
        runner({ code: 127, stdout: "", stderr: "" }),
      ),
    ).rejects.toThrow("gallery-dl is unavailable");
  });

  it("writes only sanitized metadata after one validated reel download", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "designparser-commands-"));
    const reelDirectory = path.join(root, reel.id);
    const calls: Array<{ command: string; args: readonly string[] }> = [];

    await downloadReel(reel, reelDirectory, async (command, args) => {
      calls.push({ command, args });
      await writeFile(path.join(reelDirectory, "downloaded-1.mp4"), "video");
      await writeFile(
        path.join(reelDirectory, "downloaded-1.json"),
        JSON.stringify({
          post_shortcode: reel.id,
          post_url: reel.url,
          username: "designparser",
          date: "2026-08-01 12:00:00",
          duration: 12.5,
          width: 1080,
          height: 1920,
          cookie: "must not persist",
          description: "must not persist",
        }),
      );
      await writeFile(
        path.join(reelDirectory, "downloaded-1-extra.json"),
        JSON.stringify({ cookie: "must not persist" }),
      );
      return { code: 0, stdout: "", stderr: "" };
    });

    expect(calls).toEqual([
      {
        command: "gallery-dl",
        args: [
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
        ],
      },
    ]);
    await expect(
      readFile(path.join(reelDirectory, "source.mp4"), "utf8"),
    ).resolves.toBe("video");
    await expect(
      readFile(path.join(reelDirectory, "downloaded-1.mp4"), "utf8"),
    ).rejects.toThrow();
    await expect(
      readFile(path.join(reelDirectory, "downloaded-1.json"), "utf8"),
    ).rejects.toThrow();
    await expect(
      readFile(path.join(reelDirectory, "downloaded-1-extra.json"), "utf8"),
    ).rejects.toThrow();
    await expect(
      readFile(path.join(reelDirectory, "source.json"), "utf8"),
    ).resolves.toBe(
      `${JSON.stringify({
        id: reel.id,
        url: reel.url,
        creator: "@designparser",
        publishedAt: reel.publishedAt,
        duration: 12.5,
        width: 1080,
        height: 1920,
      })}\n`,
    );
  });

  it("fails closed when download output has no video or multiple videos", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "designparser-commands-"));
    await expect(
      downloadReel(
        reel,
        path.join(root, "none"),
        runner({ code: 0, stdout: "", stderr: "" }),
      ),
    ).rejects.toThrow("exactly one MP4");

    const multiple = path.join(root, "multiple");
    await expect(
      downloadReel(reel, multiple, async () => {
        await writeFile(path.join(multiple, "downloaded-1.mp4"), "one");
        await writeFile(path.join(multiple, "downloaded-2.mp4"), "two");
        return { code: 0, stdout: "", stderr: "" };
      }),
    ).rejects.toThrow("exactly one MP4");
  });

  it("removes gallery metadata when the download command fails", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "designparser-commands-"));
    const reelDirectory = path.join(root, reel.id);

    await expect(
      downloadReel(reel, reelDirectory, async () => {
        await writeFile(
          path.join(reelDirectory, "downloaded-1.json"),
          JSON.stringify({ cookie: "must not persist" }),
        );
        return { code: 1, stdout: "", stderr: "" };
      }),
    ).rejects.toThrow("gallery-dl download failed");

    await expect(
      readFile(path.join(reelDirectory, "downloaded-1.json"), "utf8"),
    ).rejects.toThrow();
  });

  it("removes gallery metadata after download validation fails", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "designparser-commands-"));
    const reelDirectory = path.join(root, reel.id);

    await expect(
      downloadReel(reel, reelDirectory, async () => {
        await writeFile(path.join(reelDirectory, "downloaded-1.mp4"), "video");
        await writeFile(
          path.join(reelDirectory, "downloaded-1.json"),
          JSON.stringify({ post_shortcode: reel.id, username: "someone-else" }),
        );
        return { code: 0, stdout: "", stderr: "" };
      }),
    ).rejects.toThrow("gallery-dl metadata does not match the reel");

    await expect(
      readFile(path.join(reelDirectory, "downloaded-1.json"), "utf8"),
    ).rejects.toThrow();
  });
});
