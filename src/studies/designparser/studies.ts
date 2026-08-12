import { validateStudies } from "./model";

export const designparserStudies = validateStudies([
  {
    id: "Db3O3K4DdYi",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/Db3O3K4DdYi/",
      creator: "@designparser",
      publishedAt: "2026-08-10",
    },
    processedAt: "2026-08-13",
    reviewedAt: "2026-08-13",
    status: "reviewed",
    title: "Justified Text Needs More Than Alignment",
    summary:
      "A practical typography study showing why full justification must coordinate text measure and hyphenation, and how unchecked word spacing can form vertical rivers that weaken readability.",
    principles: [
      "Treat justified alignment as a spacing system, not a one-click style.",
      "Set a moderate text measure before evaluating word-space quality.",
      "Use hyphenation to distribute line breaks and prevent repeated gaps from aligning into rivers.",
      "Judge the result against the spacing controls the rendering tool actually provides.",
    ],
    applications: [
      "Audit justified paragraphs at their intended container width rather than in isolation.",
      "Enable and tune hyphenation where the platform supports it.",
      "Scan several adjacent lines for vertical whitespace channels, then adjust measure or alignment.",
      "Prefer ragged alignment when the available tool cannot control spacing well enough.",
    ],
    uncertainties: [
      "The closing phrase at 26.000–27.583 seconds is unclear and is not used as support for any claim.",
      "Scene extraction yielded only the opening state; later layout changes were not treated as independently verified visual evidence.",
    ],
    evidence: [
      {
        label: "Justification introduces a spacing problem",
        start: 0,
        end: 4,
      },
      {
        label: "Hyphenation and a moderate text measure",
        start: 4,
        end: 9,
      },
      {
        label: "Narrow measures stretch gaps",
        start: 9,
        end: 12,
      },
      {
        label: "Repeated gaps form vertical rivers",
        start: 12,
        end: 15,
      },
      {
        label: "Accessibility concern and uneven tool support",
        start: 15,
        end: 26,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Typography system",
        title: "Justification is the start of the work",
        body: "Matching both text edges changes the spacing problem; it does not solve it by itself.",
        visual: {
          type: "rule",
          statement: "Alignment choice → spacing behavior",
        },
      },
      {
        kind: "problem",
        eyebrow: "Failure mode",
        title: "The edge can look neat while the paragraph breaks",
        body: "When a short line must fill a fixed width, word spaces expand and become more visible than the text rhythm.",
        visual: {
          type: "comparison",
          before: "Ragged edge, steady word spacing",
          after: "Aligned edges, variable word spacing",
        },
      },
      {
        kind: "principle",
        eyebrow: "Text measure",
        title: "Give each line enough characters to distribute space",
        body: "A moderate measure—roughly 60–80 characters—reduces the pressure placed on every remaining gap.",
        visual: {
          type: "rule",
          statement: "Choose the measure before judging justification",
        },
      },
      {
        kind: "diagram",
        eyebrow: "Pattern formation",
        title: "Whitespace turns into a vertical signal",
        body: "One stretched line is local; similar gaps in neighboring lines connect into a river that pulls attention down the page.",
        visual: {
          type: "layers",
          items: [
            "One enlarged word gap",
            "Repeated gaps on adjacent lines",
            "A continuous vertical white channel",
          ],
        },
      },
      {
        kind: "application",
        eyebrow: "Line breaking",
        title: "Let hyphenation share the load",
        body: "Additional break opportunities reduce the amount of expansion that word spaces must absorb.",
        visual: {
          type: "comparison",
          before: "No hyphenation: gaps carry the load",
          after: "Tuned hyphenation: breaks share the load",
        },
      },
      {
        kind: "constraint",
        eyebrow: "Tool capability",
        title: "The same intent produces different control",
        body: "Dedicated publishing tools expose finer composition controls, while browser and interface-design tools offer only part of that system.",
        visual: {
          type: "layers",
          items: [
            "Publishing layout: granular control",
            "Browser layout: partial controls",
            "Interface canvas: limited controls",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Tune the paragraph, not the toggle",
        body: "Set the measure, enable sensible breaks, inspect several lines together, and keep justification only when spacing remains calm.",
        visual: {
          type: "sequence",
          items: [
            "Set measure",
            "Enable breaks",
            "Inspect gaps",
            "Choose alignment",
          ],
        },
      },
    ],
  },
]);

export function getDesignparserStudy(id: string) {
  return designparserStudies.find((study) => study.id === id);
}

export function getDesignparserStudyParams() {
  return designparserStudies.map(({ id }) => ({ reelId: id }));
}
