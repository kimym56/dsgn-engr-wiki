// @vitest-environment node

import { mkdir, mkdtemp, readFile, readdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  checkExecutable,
  discoverReels,
  downloadReel,
  extractAudio,
  extractSceneFrames,
  transcribeAudio,
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

  it("uses harmless probes supported by each required executable", async () => {
    const calls: Array<{ command: string; args: readonly string[] }> = [];
    const probe: CommandRunner = async (command, args) => {
      calls.push({ command, args });
      return { code: 0, stdout: "", stderr: "" };
    };

    await checkExecutable("gallery-dl", probe);
    await checkExecutable("ffmpeg", probe);
    await checkExecutable("whisper", probe);

    expect(calls).toEqual([
      { command: "gallery-dl", args: ["--version"] },
      { command: "ffmpeg", args: ["-version"] },
      { command: "whisper", args: ["--help"] },
    ]);
  });

  it("writes only sanitized metadata after one validated reel download", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "designparser-commands-"));
    const reelDirectory = path.join(root, reel.id);
    const calls: Array<{ command: string; args: readonly string[] }> = [];

    await downloadReel(reel, reelDirectory, async (command, args) => {
      calls.push({ command, args });
      await writeFile(path.join(reelDirectory, "downloaded-1.mp4"), "video");
      await writeFile(
        path.join(reelDirectory, "downloaded-1.mp4.json"),
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
      readFile(path.join(reelDirectory, "downloaded-1.mp4.json"), "utf8"),
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
          path.join(reelDirectory, "downloaded-1.mp4.json"),
          JSON.stringify({ cookie: "must not persist" }),
        );
        return { code: 1, stdout: "", stderr: "" };
      }),
    ).rejects.toThrow("gallery-dl download failed");

    await expect(
      readFile(path.join(reelDirectory, "downloaded-1.mp4.json"), "utf8"),
    ).rejects.toThrow();
  });

  it("removes gallery metadata after download validation fails", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "designparser-commands-"));
    const reelDirectory = path.join(root, reel.id);

    await expect(
      downloadReel(reel, reelDirectory, async () => {
        await writeFile(path.join(reelDirectory, "downloaded-1.mp4"), "video");
        await writeFile(
          path.join(reelDirectory, "downloaded-1.mp4.json"),
          JSON.stringify({ post_shortcode: reel.id, username: "someone-else" }),
        );
        return { code: 0, stdout: "", stderr: "" };
      }),
    ).rejects.toThrow("gallery-dl metadata does not match the reel");

    await expect(
      readFile(path.join(reelDirectory, "downloaded-1.mp4.json"), "utf8"),
    ).rejects.toThrow();
  });

  it("extracts mono PCM audio with FFmpeg", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "designparser-test-"));
    const reelDirectory = path.join(root, reel.id);
    const source = path.join(reelDirectory, "source.mp4");
    const audio = path.join(reelDirectory, "audio.wav");
    const calls: Array<{ command: string; args: readonly string[] }> = [];
    await mkdir(reelDirectory);
    await writeFile(source, "video");

    await extractAudio(reelDirectory, async (command, args) => {
      calls.push({ command, args });
      await writeFile(audio, "audio");
      return { code: 0, stdout: "", stderr: "" };
    });

    expect(calls).toEqual([
      {
        command: "ffmpeg",
        args: [
          "-nostdin",
          "-hide_banner",
          "-loglevel",
          "error",
          "-y",
          "-i",
          source,
          "-vn",
          "-ac",
          "1",
          "-ar",
          "16000",
          "-c:a",
          "pcm_s16le",
          audio,
        ],
      },
    ]);
    await expect(readFile(audio, "utf8")).resolves.toBe("audio");
  });

  it("normalizes local English Whisper transcription artifacts", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "designparser-test-"));
    const reelDirectory = path.join(root, reel.id);
    const audio = path.join(reelDirectory, "audio.wav");
    const whisperOutput = path.join(reelDirectory, "audio.json");
    const calls: Array<{ command: string; args: readonly string[] }> = [];
    await mkdir(reelDirectory);
    await writeFile(audio, "audio");

    await transcribeAudio(reelDirectory, async (command, args) => {
      calls.push({ command, args });
      await writeFile(
        whisperOutput,
        JSON.stringify({
          language: "en",
          text: " First. Second. ",
          segments: [
            { start: 0, end: 1.25, text: " First. " },
            { start: 1.25, end: 2.5, text: " Second. " },
          ],
        }),
      );
      return { code: 0, stdout: "", stderr: "" };
    });

    expect(calls).toEqual([
      {
        command: "whisper",
        args: [
          audio,
          "--language",
          "en",
          "--task",
          "transcribe",
          "--model",
          "small.en",
          "--output_format",
          "json",
          "--output_dir",
          reelDirectory,
        ],
      },
    ]);
    await expect(
      readFile(path.join(reelDirectory, "transcript.json"), "utf8"),
    ).resolves.toBe(
      `${JSON.stringify({
        language: "en",
        text: "First. Second.",
        segments: [
          { start: 0, end: 1.25, text: "First." },
          { start: 1.25, end: 2.5, text: "Second." },
        ],
      })}\n`,
    );
    await expect(
      readFile(path.join(reelDirectory, "transcript.txt"), "utf8"),
    ).resolves.toBe("First.\nSecond.\n");
    await expect(readFile(whisperOutput, "utf8")).rejects.toThrow();
  });

  it("keeps the first scene frame and names frames by showinfo timestamp", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "designparser-test-"));
    const reelDirectory = path.join(root, reel.id);
    const source = path.join(reelDirectory, "source.mp4");
    const framePattern = path.join(reelDirectory, "frames", "%06d.jpg");
    const calls: Array<{ command: string; args: readonly string[] }> = [];
    await mkdir(reelDirectory);
    await writeFile(source, "video");

    await extractSceneFrames(reelDirectory, 0.32, async (command, args) => {
      calls.push({ command, args });
      await Promise.all(
        ["000001.jpg", "000002.jpg", "000003.jpg"].map((name) =>
          writeFile(path.join(reelDirectory, "frames", name), "frame"),
        ),
      );
      return {
        code: 0,
        stdout: "",
        stderr: [
          "[Parsed_showinfo_1] n:0 pts:0 pts_time:0",
          "[Parsed_showinfo_1] n:1 pts:375 pts_time:12.5",
          "[Parsed_showinfo_1] n:2 pts:930 pts_time:31",
        ].join("\n"),
      };
    });

    expect(calls).toEqual([
      {
        command: "ffmpeg",
        args: [
          "-nostdin",
          "-hide_banner",
          "-loglevel",
          "info",
          "-y",
          "-i",
          source,
          "-vf",
          "select='eq(n,0)+gt(scene,0.32)',showinfo",
          "-fps_mode",
          "vfr",
          framePattern,
        ],
      },
    ]);
    expect(await readdir(path.join(reelDirectory, "frames"))).toEqual([
      "000000.000.jpg",
      "000012.500.jpg",
      "000031.000.jpg",
    ]);
  });

  it("rejects scene thresholds outside the open unit interval before FFmpeg", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "designparser-test-"));
    const reelDirectory = path.join(root, reel.id);
    await mkdir(reelDirectory);
    await writeFile(path.join(reelDirectory, "source.mp4"), "video");
    let calls = 0;
    const noCommand: CommandRunner = async () => {
      calls++;
      return { code: 0, stdout: "", stderr: "" };
    };

    await expect(
      extractSceneFrames(reelDirectory, 0, noCommand),
    ).rejects.toThrow("scene threshold");
    await expect(
      extractSceneFrames(reelDirectory, Number.NaN, noCommand),
    ).rejects.toThrow("scene threshold");
    expect(calls).toBe(0);
  });

  it("preserves source.mp4 when FFmpeg audio extraction exits nonzero", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "designparser-test-"));
    const reelDirectory = path.join(root, reel.id);
    const source = path.join(reelDirectory, "source.mp4");
    await mkdir(reelDirectory);
    await writeFile(source, "original video");

    await expect(
      extractAudio(reelDirectory, async () => ({
        code: 1,
        stdout: "",
        stderr: "ffmpeg failed",
      })),
    ).rejects.toThrow("ffmpeg audio extraction failed");
    await expect(readFile(source, "utf8")).resolves.toBe("original video");
  });

  it.each([
    { artifact: "missing", writeOutput: false, error: "audio.wav is missing" },
    { artifact: "empty", writeOutput: true, error: "audio.wav is empty" },
  ])(
    "rejects a $artifact audio artifact after successful FFmpeg extraction",
    async ({ writeOutput, error }) => {
      const root = await mkdtemp(path.join(tmpdir(), "designparser-test-"));
      const reelDirectory = path.join(root, reel.id);
      const audio = path.join(reelDirectory, "audio.wav");
      await mkdir(reelDirectory);
      await writeFile(path.join(reelDirectory, "source.mp4"), "video");

      await expect(
        extractAudio(reelDirectory, async () => {
          if (writeOutput) await writeFile(audio, "");
          return { code: 0, stdout: "", stderr: "" };
        }),
      ).rejects.toThrow(error);
    },
  );

  it("rejects a nonzero Whisper transcription exit", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "designparser-test-"));
    const reelDirectory = path.join(root, reel.id);
    await mkdir(reelDirectory);
    await writeFile(path.join(reelDirectory, "audio.wav"), "audio");

    await expect(
      transcribeAudio(reelDirectory, async () => ({
        code: 1,
        stdout: "",
        stderr: "whisper failed",
      })),
    ).rejects.toThrow("whisper transcription failed");
  });

  it.each([
    { output: "missing", content: undefined },
    { output: "invalid", content: "not JSON" },
  ])(
    "rejects $output Whisper JSON after a successful exit",
    async ({ content }) => {
      const root = await mkdtemp(path.join(tmpdir(), "designparser-test-"));
      const reelDirectory = path.join(root, reel.id);
      await mkdir(reelDirectory);
      await writeFile(path.join(reelDirectory, "audio.wav"), "audio");

      await expect(
        transcribeAudio(reelDirectory, async () => {
          if (content !== undefined) {
            await writeFile(path.join(reelDirectory, "audio.json"), content);
          }
          return { code: 0, stdout: "", stderr: "" };
        }),
      ).rejects.toThrow("whisper transcript is missing or invalid");
    },
  );

  it("rejects a nonzero FFmpeg scene extraction exit", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "designparser-test-"));
    const reelDirectory = path.join(root, reel.id);
    await mkdir(reelDirectory);
    await writeFile(path.join(reelDirectory, "source.mp4"), "video");

    await expect(
      extractSceneFrames(reelDirectory, 0.32, async () => ({
        code: 1,
        stdout: "",
        stderr: "ffmpeg failed",
      })),
    ).rejects.toThrow("ffmpeg frame extraction failed");
  });

  it("rejects a scene timestamp count that differs from JPEG output", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "designparser-test-"));
    const reelDirectory = path.join(root, reel.id);
    await mkdir(reelDirectory);
    await writeFile(path.join(reelDirectory, "source.mp4"), "video");

    await expect(
      extractSceneFrames(reelDirectory, 0.32, async () => {
        await writeFile(
          path.join(reelDirectory, "frames", "000001.jpg"),
          "one",
        );
        return {
          code: 0,
          stdout: "",
          stderr: "pts_time:0\npts_time:1",
        };
      }),
    ).rejects.toThrow("ffmpeg frame count does not match timestamps");
  });

  it("rejects rounded scene timestamp collisions before renaming frames", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "designparser-test-"));
    const reelDirectory = path.join(root, reel.id);
    const frames = path.join(reelDirectory, "frames");
    await mkdir(reelDirectory);
    await writeFile(path.join(reelDirectory, "source.mp4"), "video");

    await expect(
      extractSceneFrames(reelDirectory, 0.32, async () => {
        await Promise.all(
          ["000001.jpg", "000002.jpg"].map((name) =>
            writeFile(path.join(frames, name), "frame"),
          ),
        );
        return {
          code: 0,
          stdout: "",
          stderr: "pts_time:0\npts_time:0.0004",
        };
      }),
    ).rejects.toThrow("ffmpeg frame timestamps collide");
    expect(await readdir(frames)).toEqual(["000001.jpg", "000002.jpg"]);
  });
});
