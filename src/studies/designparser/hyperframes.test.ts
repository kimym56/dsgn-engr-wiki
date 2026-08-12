import { lintHyperframeHtml } from "@hyperframes/lint";
import { describe, expect, it } from "vitest";
import {
  buildHyperframesComposition,
  buildSlideshowManifest,
} from "./hyperframes";
import { validateStudy, type DesignparserStudy } from "./model";

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
      visual: {
        type: "sequence",
        items: ["Place", "Group", "Distribute", "Measure", "Adjust", "Verify"],
      },
    },
    {
      kind: "takeaway",
      eyebrow: "Takeaway",
      title: "Clear ownership creates stable layouts",
      body: "Each layout primitive should answer one spatial question.",
      visual: {
        type: "layers",
        items: ["Canvas", "Region", "Container", "Group", "Control", "Item"],
      },
    },
  ],
});

const expectedSceneIds = [
  "C-example_1-slide-1",
  "C-example_1-slide-2",
  "C-example_1-slide-3",
  "C-example_1-slide-4",
] as const;

interface TimelineCall {
  readonly method: "from" | "fromTo" | "to";
  readonly target: string;
  readonly end: number;
}

interface FakeTimeline {
  readonly paused: boolean;
  readonly calls: TimelineCall[];
  duration(): number;
  fromTo(
    target: string,
    from: Record<string, unknown>,
    to: Record<string, unknown>,
    at?: number,
  ): FakeTimeline;
  from(
    target: string,
    vars: Record<string, unknown>,
    at?: number,
  ): FakeTimeline;
  to(target: string, vars: Record<string, unknown>, at?: number): FakeTimeline;
}

function executeTimelineScripts(reducedMotion: boolean) {
  const html = buildHyperframesComposition(validStudy);
  const timelines: FakeTimeline[] = [];
  const sets: { target: string; vars: Record<string, unknown> }[] = [];
  const fakeWindow: {
    __timelines?: Record<string, FakeTimeline>;
    matchMedia: () => { matches: boolean };
  } = {
    matchMedia: () => ({ matches: reducedMotion }),
  };
  const gsap = {
    timeline({ paused }: { paused?: boolean }): FakeTimeline {
      let duration = 0;
      const calls: TimelineCall[] = [];
      const timeline: FakeTimeline = {
        paused: paused === true,
        calls,
        duration: () => duration,
        from(target, vars, at = 0) {
          const end = at + Number(vars.duration ?? 0);
          duration = Math.max(duration, end);
          calls.push({ method: "from", target, end });
          return timeline;
        },
        fromTo(target, _from, to, at = 0) {
          const end = at + Number(to.duration ?? 0);
          duration = Math.max(duration, end);
          calls.push({ method: "fromTo", target, end });
          return timeline;
        },
        to(target, vars, at = 0) {
          const end = at + Number(vars.duration ?? 0);
          duration = Math.max(duration, end);
          calls.push({ method: "to", target, end });
          return timeline;
        },
      };
      timelines.push(timeline);
      return timeline;
    },
    set(target: string, vars: Record<string, unknown>) {
      sets.push({ target, vars });
    },
  };

  for (const [, script] of html.matchAll(
    /<script(?![^>]*\bsrc=)(?![^>]*\btype=)[^>]*>([\s\S]*?)<\/script>/g,
  )) {
    Function("window", "gsap", script!)(fakeWindow, gsap);
  }

  return { registry: fakeWindow.__timelines ?? {}, sets, timelines };
}

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
    expect(html).toContain('id="C-example_1-slide-3-sequence-6"');
    expect(html).toContain('id="C-example_1-slide-4-layers-6"');
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

  it("synchronously registers one paused six-second timeline per scene", () => {
    const runtime = executeTimelineScripts(false);

    expect(Object.keys(runtime.registry)).toEqual(expectedSceneIds);
    expect(runtime.timelines).toHaveLength(4);
    expect(Object.values(runtime.registry)).toEqual(runtime.timelines);
    for (const timeline of runtime.timelines) {
      expect(timeline.paused).toBe(true);
      expect(timeline.duration()).toBe(6);
      expect(
        timeline.calls.filter(({ method }) => method === "fromTo"),
      ).toHaveLength(1);
    }
  });

  it("sets final states without entry tweens under reduced motion", () => {
    const runtime = executeTimelineScripts(true);

    expect(Object.keys(runtime.registry)).toEqual(expectedSceneIds);
    expect(Object.values(runtime.registry)).toEqual(runtime.timelines);
    expect(runtime.sets).toEqual([
      { target: "#C-example_1-slide-1-content", vars: { opacity: 1, y: 0 } },
      { target: "#C-example_1-slide-2-content", vars: { opacity: 1, y: 0 } },
      { target: "#C-example_1-slide-3-content", vars: { opacity: 1, y: 0 } },
      { target: "#C-example_1-slide-4-content", vars: { opacity: 1, y: 0 } },
    ]);
    expect(runtime.timelines).toHaveLength(4);
    for (const [index, timeline] of runtime.timelines.entries()) {
      expect(timeline.paused).toBe(true);
      expect(timeline.duration()).toBe(6);
      expect(timeline.calls).toEqual([
        {
          method: "to",
          target: `#${expectedSceneIds[index]}-clock`,
          end: 6,
        },
      ]);
    }
  });

  it("round-trips script-sensitive notes through the manifest and JSON island", () => {
    const body = 'A & B "quoted" </script><script>unsafe()</script>';
    const escapedStudy: DesignparserStudy = {
      ...validStudy,
      slides: validStudy.slides.map((slide, index) =>
        index === 0
          ? {
              ...slide,
              body,
              title: 'A & B "quoted"',
              visual: { type: "rule", statement: 'Use A & B "quoted"' },
            }
          : slide,
      ),
    };

    const manifest = buildSlideshowManifest(escapedStudy);
    const html = buildHyperframesComposition(escapedStudy);
    const island = html.match(
      /<script type="application\/hyperframes-slideshow\+json">([\s\S]*?)<\/script>/,
    )?.[1];
    const parsedHtml = new DOMParser().parseFromString(html, "text/html");

    expect(JSON.parse(manifest).slides[0].notes).toBe(body);
    expect(JSON.parse(island!).slides[0].notes).toBe(body);
    expect(manifest).not.toContain("</script>");
    expect(island).not.toContain("</script>");
    expect(html).toContain("A &amp; B &quot;quoted&quot;");
    expect(html).toContain(
      "A &amp; B &quot;quoted&quot; &lt;/script&gt;&lt;script&gt;unsafe()&lt;/script&gt;",
    );
    expect(html).toContain("Use A &amp; B &quot;quoted&quot;");
    expect(
      parsedHtml.querySelectorAll("script:not([type]):not([src])"),
    ).toHaveLength(validStudy.slides.length + 1);
  });
});
