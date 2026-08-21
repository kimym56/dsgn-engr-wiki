// @vitest-environment node

import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

describe("private Designparser study artifacts", () => {
  it("keeps the complete working cache and credential exports untracked", () => {
    const ignored = execFileSync(
      "git",
      [
        "check-ignore",
        ".study-cache/designparser/reels/example/source.mp4",
        ".study-cache/designparser/reels/example/audio.wav",
        ".study-cache/designparser/reels/example/transcript.json",
        ".study-cache/designparser/reels/example/frames/000001.250.jpg",
        "cookies-instagram.txt",
        "instagram-session.json",
      ],
      { encoding: "utf8" },
    );

    expect(ignored.trim().split("\n")).toHaveLength(6);
    expect(
      execFileSync("git", ["ls-files", ".study-cache"], {
        encoding: "utf8",
      }).trim(),
    ).toBe("");
  });
});
