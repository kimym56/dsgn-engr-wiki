import { describe, expect, it } from "vitest";
import { validateStudies, validateStudy } from "./model";
import {
  designparserStudies,
  getDesignparserStudy,
  getDesignparserStudyParams,
} from "./studies";

const validStudy = {
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
      eyebrow: "Designparser study",
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
} as const;

function copyStudy(): Record<string, unknown> {
  return structuredClone(validStudy);
}

describe("reviewed Designparser studies", () => {
  it("starts with no reviewed studies and has empty lookup params", () => {
    expect(designparserStudies).toEqual([]);
    expect(getDesignparserStudy("C-example_1")).toBeUndefined();
    expect(getDesignparserStudyParams()).toEqual([]);
  });

  it("accepts a reviewed English study as a frozen narrowed copy", () => {
    const input = copyStudy();
    const study = validateStudy(input);

    expect(study).toEqual(validStudy);
    expect(study).not.toBe(input);
    expect(Object.isFrozen(study)).toBe(true);
    expect(Object.isFrozen(study.slides[0])).toBe(true);
  });

  it.each([
    ["copied transcript field", { transcript: "Copied source words" }],
    [
      "private cache path",
      { title: ".study-cache/reels/C-example_1/draft.json" },
    ],
    ["HTML video", { summary: "<video>source</video>" }],
    ["media extension", { applications: ["Watch clip.mp4"] }],
    ["caption token", { metadata: { note: "caption" } }],
    ["screenshot token", { metadata: { note: "screenshot" } }],
  ])("rejects %s in committed content", (_name, change) => {
    expect(() => validateStudy({ ...copyStudy(), ...change })).toThrow();
  });

  it.each([
    ["too few slides", { slides: validStudy.slides.slice(0, 3) }],
    [
      "too many slides",
      {
        slides: [
          ...validStudy.slides,
          ...validStudy.slides,
          validStudy.slides[0],
        ],
      },
    ],
    ["wrong creator", { source: { ...validStudy.source, creator: "@other" } }],
    [
      "wrong host",
      {
        source: {
          ...validStudy.source,
          url: "https://example.com/reel/C-example_1/",
        },
      },
    ],
    ["wrong status", { status: "needs-review" }],
    ["Korean locale", { locale: "ko" }],
    ["English translation relationship", { translationOf: "C-parent" }],
    ["invalid calendar date", { reviewedAt: "2026-02-30" }],
    [
      "overlapping evidence timestamps",
      {
        evidence: [
          { label: "First", start: 0, end: 4 },
          { label: "Second", start: 3, end: 5 },
        ],
      },
    ],
    [
      "out-of-order slides",
      {
        slides: [
          validStudy.slides[0],
          validStudy.slides[2],
          validStudy.slides[1],
          validStudy.slides[3],
        ],
      },
    ],
    [
      "a repeated source slide",
      {
        slides: [
          validStudy.slides[0],
          validStudy.slides[0],
          validStudy.slides[2],
          validStudy.slides[3],
        ],
      },
    ],
    [
      "an early takeaway slide",
      {
        slides: [
          validStudy.slides[0],
          validStudy.slides[1],
          validStudy.slides[3],
          validStudy.slides[3],
        ],
      },
    ],
  ])("rejects %s", (_name, change) => {
    expect(() => validateStudy({ ...copyStudy(), ...change })).toThrow();
  });

  it("sorts the collection by newest publication date then ID", () => {
    const earlier = {
      ...copyStudy(),
      id: "C-earlier",
      source: {
        ...validStudy.source,
        url: "https://www.instagram.com/reel/C-earlier/",
        publishedAt: "2026-07-31",
      },
    };
    const sameDate = {
      ...copyStudy(),
      id: "C-alpha",
      source: {
        ...validStudy.source,
        url: "https://www.instagram.com/reel/C-alpha/",
      },
    };

    expect(
      validateStudies([earlier, copyStudy(), sameDate]).map(({ id }) => id),
    ).toEqual(["C-alpha", "C-example_1", "C-earlier"]);
  });

  it("rejects duplicate IDs", () => {
    expect(() => validateStudies([copyStudy(), copyStudy()])).toThrow(
      "duplicate",
    );
  });
});
