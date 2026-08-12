import { lintHyperframeHtml } from "@hyperframes/lint";
import { describe, expect, it } from "vitest";
import {
  buildHyperframesComposition,
  buildSlideshowManifest,
} from "./hyperframes";
import { validateStudy } from "./model";

const validStudy = validateStudy({
  id: "C-example_1",
  locale: "en",
  source: {
    url: "https://www.instagram.com/reel/C-example_1/",
    creator: "@designparser",
    publishedAt: "2026-08-01",
  },
  processedAt: "2026-08-12",
  reviewedAt: "2026-08-12",
  status: "reviewed",
  title: "Separate alignment from distribution",
  summary: "A study of choosing one layout responsibility at a time.",
  principles: ["Use one mechanism for each spatial responsibility."],
  applications: ["Separate group placement from spacing within the group."],
  uncertainties: [],
  evidence: [{ label: "Main explanation", start: 2.5, end: 12.25 }],
  slides: [
    {
      kind: "source",
      eyebrow: "Study",
      title: "Alignment has two jobs",
      body: "Treat placement and internal spacing as separate decisions.",
      visual: { type: "rule", statement: "One mechanism, one responsibility" },
    },
    {
      kind: "problem",
      eyebrow: "Problem",
      title: "One rule is asked to do too much",
      body: "Mixed responsibilities make responsive behavior hard to predict.",
      visual: { type: "comparison", before: "Mixed", after: "Separated" },
    },
    {
      kind: "principle",
      eyebrow: "Principle",
      title: "Separate the decisions",
      body: "Place the group first, then distribute its children.",
      visual: { type: "sequence", items: ["Place", "Distribute", "Verify"] },
    },
    {
      kind: "takeaway",
      eyebrow: "Takeaway",
      title: "Clear ownership creates stable layouts",
      body: "Each layout primitive should answer one spatial question.",
      visual: { type: "layers", items: ["Container", "Group", "Item"] },
    },
  ],
});

describe("HyperFrames study compositions", () => {
  it("maps each slide to a deterministic six-second scene with speaker notes", () => {
    const manifest = JSON.parse(buildSlideshowManifest(validStudy));

    expect(Object.keys(manifest)).toEqual(["slides"]);
    expect(manifest.slides).toEqual([
      {
        sceneId: "C-example_1-slide-1",
        notes: "Treat placement and internal spacing as separate decisions.",
      },
      {
        sceneId: "C-example_1-slide-2",
        notes:
          "Mixed responsibilities make responsive behavior hard to predict.",
      },
      {
        sceneId: "C-example_1-slide-3",
        notes: "Place the group first, then distribute its children.",
      },
      {
        sceneId: "C-example_1-slide-4",
        notes: "Each layout primitive should answer one spatial question.",
      },
    ]);
  });

  it("emits a complete lint-clean composition for all four visual variants", async () => {
    const html = buildHyperframesComposition(validStudy);
    const timelineKeys = [
      ...html.matchAll(/window\.__timelines\["([^"]+)"\]\s*=/g),
    ].map((match) => match[1]);
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    const sceneWindows = [
      ...html.matchAll(
        /data-composition-id="([^"]+)"[^>]*data-start="([^"]+)"[^>]*data-duration="([^"]+)"/g,
      ),
    ].map((match) => match.slice(1));

    expect(html).toMatch(/^<!doctype html>/);
    expect(html).toContain('data-composition-id="C-example_1-slide-1"');
    expect(html).toContain('type="application/hyperframes-slideshow+json"');
    expect(html).toContain("prefers-reduced-motion: reduce");
    expect(html).toContain(
      "https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js",
    );
    expect(html).toContain('class="visual rule"');
    expect(html).toContain('class="visual comparison"');
    expect(html).toContain('class="visual sequence"');
    expect(html).toContain('class="visual layers"');
    expect(sceneWindows).toEqual([
      ["C-example_1-slide-1", "0", "6"],
      ["C-example_1-slide-2", "6", "6"],
      ["C-example_1-slide-3", "12", "6"],
      ["C-example_1-slide-4", "18", "6"],
    ]);
    expect(timelineKeys).toEqual(
      validStudy.slides.map(
        (_, index) => `${validStudy.id}-slide-${index + 1}`,
      ),
    );
    expect(new Set(ids).size).toBe(ids.length);
    expect(html).not.toMatch(
      /<video|<audio|\.mp4|\.study-cache|Instagram|Designparser|transcript|caption|requestAnimationFrame|\.play\(|repeat\s*:\s*-1|Math\.random|render/i,
    );
    const lintResult = await lintHyperframeHtml(html);
    expect(
      lintResult.findings.filter((finding) => finding.severity === "error"),
    ).toEqual([]);
  });

  it("escapes prose and visual strings before inserting them into HTML", () => {
    const escapedStudy = validateStudy({
      ...structuredClone(validStudy),
      slides: validStudy.slides.map((slide, index) =>
        index === 0
          ? {
              ...slide,
              title: 'A & B "quoted"',
              visual: { type: "rule", statement: 'Use A & B "quoted"' },
            }
          : slide,
      ),
    });

    const html = buildHyperframesComposition(escapedStudy);

    expect(html).toContain("A &amp; B &quot;quoted&quot;");
    expect(html).toContain("Use A &amp; B &quot;quoted&quot;");
    expect(html).not.toContain('A & B "quoted"');
  });
});
