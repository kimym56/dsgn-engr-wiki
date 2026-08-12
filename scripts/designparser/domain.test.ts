// @vitest-environment node

import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  emptyManifest,
  normalizeWhisperTranscript,
  parseManifest,
  reconcileDiscovery,
  setStage,
  stageOutputExists,
  validatePrivateDraft,
} from "./domain.ts";

const discovered = {
  id: "C-example_1",
  url: "https://www.instagram.com/reel/C-example_1/",
  publishedAt: "2026-08-01T12:00:00.000Z",
};

describe("Designparser extraction domain", () => {
  it("adds a newly discovered reel without replacing completed work", () => {
    const initial = reconcileDiscovery(
      emptyManifest("2026-08-12T00:00:00.000Z"),
      [discovered],
      "2026-08-12T00:01:00.000Z",
    );
    const complete = setStage(
      initial.reels[discovered.id],
      "download",
      "complete",
      "2026-08-12T00:02:00.000Z",
    );
    const rerun = reconcileDiscovery(
      { ...initial, reels: { [discovered.id]: complete } },
      [discovered],
      "2026-08-12T00:03:00.000Z",
    );

    expect(rerun.reels[discovered.id].stages.download.status).toBe("complete");
  });

  it("normalizes Whisper segments and rejects overlapping timestamps", () => {
    expect(
      normalizeWhisperTranscript({
        language: "en",
        text: "First. Second.",
        segments: [
          { start: 0, end: 1.25, text: " First. " },
          { start: 1.25, end: 2.5, text: " Second. " },
        ],
      }).segments,
    ).toEqual([
      { start: 0, end: 1.25, text: "First." },
      { start: 1.25, end: 2.5, text: "Second." },
    ]);

    expect(() =>
      normalizeWhisperTranscript({
        language: "en",
        text: "bad",
        segments: [
          { start: 0, end: 2, text: "one" },
          { start: 1, end: 3, text: "two" },
        ],
      }),
    ).toThrow("overlaps the previous segment");
  });

  it("rejects a completed downstream stage until its upstream stages complete", () => {
    const record = reconcileDiscovery(
      emptyManifest("2026-08-12T00:00:00.000Z"),
      [discovered],
      "2026-08-12T00:01:00.000Z",
    ).reels[discovered.id];

    expect(() =>
      setStage(record, "audio", "complete", "2026-08-12T00:02:00.000Z"),
    ).toThrow("download");
  });

  it("parses only canonical manifest records", () => {
    const manifest = emptyManifest("2026-08-12T00:00:00.000Z");
    expect(() =>
      parseManifest({ ...manifest, profile: "https://example.com/" }),
    ).toThrow("profile");
  });

  it("requires completed stage outputs including a frame image", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "designparser-domain-"));
    const record = reconcileDiscovery(
      emptyManifest("2026-08-12T00:00:00.000Z"),
      [discovered],
      "2026-08-12T00:01:00.000Z",
    ).reels[discovered.id];
    const reelRoot = path.join(root, "reels", record.id);
    await mkdir(path.join(reelRoot, "frames"), { recursive: true });
    await writeFile(path.join(reelRoot, "frames", "000001.jpg"), "frame");

    expect(await stageOutputExists(root, record, "frames")).toBe(true);
  });

  it("rejects private drafts that contain source-media paths", () => {
    expect(() =>
      validatePrivateDraft({
        reelId: discovered.id,
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
          body: "source.mp4",
          visual: { type: "rule", statement: "Use hierarchy" },
        })),
      }),
    ).toThrow("source-media path");
  });

  it("rejects private drafts that include a transcript text field", () => {
    expect(() =>
      validatePrivateDraft({
        reelId: discovered.id,
        status: "needs-review",
        title: "A title",
        summary: "A summary",
        transcript: "Copied source words",
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
      }),
    ).toThrow("transcript text field");
  });
});
