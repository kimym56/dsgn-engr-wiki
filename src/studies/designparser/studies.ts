import { validateStudies } from "./model";

export const designparserStudies = validateStudies([
  {
    id: "Db-9Ty2jbe6",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/Db-9Ty2jbe6/",
      creator: "@designparser",
      publishedAt: "2026-08-13",
    },
    processedAt: "2026-08-16",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Familiarity Breeds Liking",
    summary:
      "A psychology-of-exposure study explaining how repetition alone can nudge preference through processing fluency, with the caveats that the cited pooled correlation is small and its underlying study is never named.",
    principles: [
      "Repeated exposure to a neutral stimulus can, by itself, nudge preference toward it without any persuasion or argument.",
      "The proposed mechanism is processing fluency: the mind interprets the ease of recognizing a repeated thing as liking it.",
      "Unfamiliarity acts as a penalty, so a single first exposure understates how something will be received once audiences have seen it repeatedly.",
    ],
    applications: [
      "Expect early reactions to a new logo or interface to run colder than post-exposure reactions, and delay final judgment until viewers have seen it several times.",
      "Expose test participants to a design more than once before collecting preference ratings, so fluency has a chance to build.",
      "Plan repeated, spaced exposures for unfamiliar work rather than betting its success on a single debut impression.",
    ],
    uncertainties: [
      "The pooled figure of 208 experiments with a correlation of 0.26 is presented without naming the underlying study or authors, so treat the number as unverified until traced to a source.",
      "The reel's blanket statement that repetition alone shifts preference is softened here to a nudge, because a correlation of 0.26 describes a small effect and the fluency mechanism is asserted rather than demonstrated.",
      "Only one still frame was available; it confirms two abstract shapes with the repeated one emphasized, but the exposure sequence unfolds over time and cannot be verified from a single image, and the closing tagline was resolved contextually from a speech-recognition misspelling.",
    ],
    evidence: [
      {
        start: 0,
        end: 3.54,
        label:
          "A setup is posed with two unfamiliar shapes, one repeated many times",
      },
      {
        start: 3.54,
        end: 10.14,
        label:
          "Repetition alone is said to shift preference by increasing fluency that the mind reads as liking",
      },
      {
        start: 10.14,
        end: 17.36,
        label:
          "A pooled body of experiments is cited with a small correlation, and unfamiliar things are said to be judged less favorably",
      },
      {
        start: 17.36,
        end: 22.32,
        label:
          "The effect is named as mere exposure and the reel closes with the account sign-off",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Exposure effect",
        title: "One shape, shown 25 times, gets liked more",
        body: "The reel stages a choice between two unfamiliar shapes separated only by how often one was viewed, then names the resulting preference shift.",
        visual: {
          type: "comparison",
          before: "Two equally strange shapes",
          after: "The seen one feels better",
        },
      },
      {
        kind: "problem",
        eyebrow: "First impressions",
        title: "Unfamiliar designs start with a penalty",
        body: "Audiences judge what they have never seen more harshly, so a single first exposure is a biased sample of how something will eventually be received.",
        visual: {
          type: "layers",
          items: ["Novelty penalty", "No fluency yet", "Harsher judgment"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Fluency mechanism",
        title: "Ease of processing gets read as liking",
        body: "Each repeat makes a stimulus cheaper to process, and the mind mistakes that ease for affection, a small but measurable nudge.",
        visual: {
          type: "rule",
          statement: "Fluency reads as liking",
        },
      },
      {
        kind: "application",
        eyebrow: "Testing rhythm",
        title: "Measure preference after repeated looks",
        body: "Expose testers to the design several times before collecting ratings, and give unfamiliar work spaced repetition instead of a one-shot debut.",
        visual: {
          type: "sequence",
          items: [
            "Introduce the design",
            "Repeat across sessions",
            "Let fluency build",
            "Then collect preference",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Familiarity effect",
        title: "Repetition quietly tips the scales",
        body: "The exposure effect will not rescue weak work, but audiences do warm to what they keep seeing, so discount first-impression verdicts accordingly.",
        visual: {
          type: "rule",
          statement: "First dislike may just be unfamiliarity",
        },
      },
    ],
  },
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
  {
    id: "Dbs7vRJjYT8",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/Dbs7vRJjYT8/",
      creator: "@designparser",
      publishedAt: "2026-08-06",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Choose Numeral Spacing by Job",
    summary:
      "A typography study separating proportional figures for natural reading from tabular figures for stable numeric columns, prices, and changing values.",
    principles: [
      "Numeral spacing is a functional choice, not a universal font default.",
      "Use equal-width figures when vertical alignment must remain stable.",
      "Keep proportional figures where reading flow matters more than column structure.",
    ],
    applications: [
      "Enable tabular figures in prices, ledgers, scoreboards, and timers.",
      "Check the actual font feature instead of assuming equal-width digits are active.",
      "Use proportional figures in prose and isolated numbers.",
    ],
    uncertainties: [
      "Scene extraction yielded only the opening numeral comparison; later examples were not independently captured as scene images.",
    ],
    evidence: [
      {
        label: "Numeral systems serve different spacing needs",
        start: 0,
        end: 3.2,
      },
      {
        label: "Aligned columns motivated equal-width figures",
        start: 3.2,
        end: 7.28,
      },
      {
        label: "Proportional and tabular widths contrasted",
        start: 7.28,
        end: 11.52,
      },
      {
        label: "Default settings can break alignment",
        start: 11.52,
        end: 15.76,
      },
      {
        label: "Use tabular selectively",
        start: 15.76,
        end: 19.68,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Numeral systems",
        title: "Digits can share a style without sharing a width",
        body: "A typeface may offer both naturally spaced numerals and a fixed-width set for structured data.",
        visual: {
          type: "comparison",
          before: "Natural digit widths",
          after: "One width for every digit",
        },
      },
      {
        kind: "problem",
        eyebrow: "Alignment drift",
        title: "Changing values expose uneven columns",
        body: "When digit widths vary inside a table or timer, neighboring rows and states no longer hold the same visual anchors.",
        visual: {
          type: "layers",
          items: [
            "Variable digit widths",
            "Moving column edges",
            "Harder comparison",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Functional typography",
        title: "Match the figure style to the reading task",
        body: "Fixed-width figures optimize alignment; proportional figures optimize the texture of ordinary reading.",
        visual: {
          type: "rule",
          statement: "Data alignment → tabular; reading flow → proportional",
        },
      },
      {
        kind: "application",
        eyebrow: "Implementation check",
        title: "Verify the feature where numbers must line up",
        body: "Turn on tabular figures deliberately for prices, columns, counters, and clocks rather than trusting the default.",
        visual: {
          type: "sequence",
          items: [
            "Identify aligned values",
            "Enable tabular figures",
            "Test changing digits",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Alignment is a local requirement",
        body: "Use equal-width digits only where stable comparison earns the extra spacing.",
        visual: {
          type: "rule",
          statement: "Choose numeral width by context",
        },
      },
    ],
  },
  {
    id: "DblNQgTqI53",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DblNQgTqI53/",
      creator: "@designparser",
      publishedAt: "2026-08-03",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Shape Cues Decide Figure and Ground",
    summary:
      "A perception study showing how a shared boundary can support two readings and how convexity can push one region forward even when size and symmetry are controlled.",
    principles: [
      "Foreground perception emerges from competing visual cues.",
      "A shared edge can belong perceptually to either adjacent region.",
      "Convex regions often claim figure status when other cues are balanced.",
    ],
    applications: [
      "Test icons and marks in both positive and negative space.",
      "Use convexity intentionally when one region should read as the object.",
      "Reduce cue conflicts when a reversible figure is not the goal.",
    ],
    uncertainties: [
      "The final naming phrase extends beyond the measured container duration; only the portion within 20.351 seconds is cited.",
      "Scene extraction yielded only the opening reversible figure.",
    ],
    evidence: [
      {
        label: "A shared edge supports competing figures",
        start: 0,
        end: 4.08,
      },
      {
        label: "Perceived foreground can flip",
        start: 4.08,
        end: 7.6,
      },
      {
        label: "Convexity isolated from size and symmetry",
        start: 7.6,
        end: 11.12,
      },
      {
        label: "Convexity can outweigh symmetry",
        start: 11.12,
        end: 15.28,
      },
      {
        label: "Figure-ground process named",
        start: 15.28,
        end: 20.35,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Visual perception",
        title: "One boundary can describe two possible objects",
        body: "Adjacent regions share geometry, but perception assigns the edge to whichever region becomes the figure.",
        visual: {
          type: "comparison",
          before: "Light region as figure",
          after: "Dark region as figure",
        },
      },
      {
        kind: "problem",
        eyebrow: "Ambiguous ownership",
        title: "Equal area does not guarantee equal attention",
        body: "Even balanced regions can alternate between object and background when their shape cues compete.",
        visual: {
          type: "layers",
          items: [
            "Shared contour",
            "Competing regions",
            "One perceived foreground",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Convexity cue",
        title: "Outward-bulging shapes tend to come forward",
        body: "When size and symmetry are held steady, convexity can become the stronger signal for figure assignment.",
        visual: {
          type: "rule",
          statement: "Balanced cues + convexity → stronger figure claim",
        },
      },
      {
        kind: "application",
        eyebrow: "Mark design",
        title: "Audit both the object and the leftover space",
        body: "Invert the mark, switch fills, and check whether unintended regions seize attention.",
        visual: {
          type: "sequence",
          items: [
            "View positive",
            "Invert regions",
            "Compare figure stability",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Design the edge for both sides",
        body: "A contour is never owned by one region alone; manage the cues that decide which side reads first.",
        visual: {
          type: "rule",
          statement: "Control boundary ownership through shape cues",
        },
      },
    ],
  },
  {
    id: "Dba6gx0K3tj",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/Dba6gx0K3tj/",
      creator: "@designparser",
      publishedAt: "2026-07-30",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Numeral Forms Should Match Text Rhythm",
    summary:
      "A typography study contrasting lining figures with old-style figures and assigning each system to the reading contexts where its vertical rhythm works best.",
    principles: [
      "Numeral height and alignment change the texture of a line of type.",
      "Old-style figures echo lowercase ascenders and descenders.",
      "Lining figures support display settings and structured data.",
    ],
    applications: [
      "Use old-style figures in body copy and footnotes when available.",
      "Use lining figures in tables, headlines, and uppercase settings.",
      "Review numeral features alongside case, size, and content role.",
    ],
    uncertainties: [
      "Scene extraction yielded only the opening baseline comparison; later contexts were not independently captured as scene images.",
    ],
    evidence: [
      {
        label: "Some old-style numerals descend",
        start: 0,
        end: 2.8,
      },
      {
        label: "Software commonly defaults to lining figures",
        start: 2.8,
        end: 8.24,
      },
      {
        label: "Old-style figures vary around x-height",
        start: 8.24,
        end: 18,
      },
      {
        label: "Body-text use",
        start: 18,
        end: 20.64,
      },
      {
        label: "Display and table use",
        start: 20.64,
        end: 23.92,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Numeral anatomy",
        title: "Digits can participate in lowercase rhythm",
        body: "Old-style figures vary above and below the x-height instead of occupying one uniform capital-height band.",
        visual: {
          type: "layers",
          items: ["Ascender zone", "x-height zone", "Descender zone"],
        },
      },
      {
        kind: "problem",
        eyebrow: "Default mismatch",
        title: "Uniform-height digits can interrupt prose",
        body: "Lining figures create a strong horizontal bar that may feel louder than surrounding lowercase text.",
        visual: {
          type: "comparison",
          before: "Lowercase rhythm",
          after: "Capital-height numeral block",
        },
      },
      {
        kind: "principle",
        eyebrow: "Contextual forms",
        title: "Choose vertical rhythm before choosing a numeral set",
        body: "Old-style figures blend with running text, while lining figures reinforce display and tabular structure.",
        visual: {
          type: "rule",
          statement: "Text texture → old-style; display structure → lining",
        },
      },
      {
        kind: "application",
        eyebrow: "Editorial system",
        title: "Assign numeral styles by content role",
        body: "Map prose and notes to old-style figures, then reserve lining figures for tables, headlines, and all-caps labels.",
        visual: {
          type: "sequence",
          items: [
            "Classify context",
            "Select numeral style",
            "Check line rhythm",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Numerals belong to the typographic voice",
        body: "Treat figure style as part of hierarchy and reading rhythm, not as a hidden font detail.",
        visual: {
          type: "rule",
          statement: "Match numeral anatomy to its neighboring text",
        },
      },
    ],
  },
  {
    id: "DbTMQEZK_mk",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DbTMQEZK_mk/",
      creator: "@designparser",
      publishedAt: "2026-07-27",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Uppercase Needs Deliberate Tracking",
    summary:
      "A typography study explaining why all-caps text forms a dense visual band and how modest added letter spacing can restore differentiation and readability.",
    principles: [
      "Uppercase removes the vertical variation that helps word shapes separate.",
      "Tracking should compensate for the density of sustained capitals.",
      "Spacing adjustments should be measured and tested, not applied mechanically.",
    ],
    applications: [
      "Start all-caps labels around 0.05–0.12em and tune by typeface and size.",
      "Compare uppercase labels at the actual viewing size.",
      "Avoid carrying uppercase tracking values into lowercase text.",
    ],
    uncertainties: [
      "Scene extraction yielded only the opening untracked uppercase state.",
    ],
    evidence: [
      {
        label: "Uppercase often needs added spacing",
        start: 0,
        end: 3.44,
      },
      {
        label: "Loss of ascender and descender variation",
        start: 3.44,
        end: 8.28,
      },
      {
        label: "Suggested em-based tracking range",
        start: 8.28,
        end: 12.88,
      },
      {
        label: "Uppercase reading is slower",
        start: 12.88,
        end: 16.58,
      },
      {
        label: "Tracking used for readability",
        start: 16.58,
        end: 18.72,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "All-caps typography",
        title: "Capital letters compress into one visual band",
        body: "Without ascenders and descenders, sustained uppercase has less vertical variation to help letters and words separate.",
        visual: {
          type: "comparison",
          before: "Mixed-case contour",
          after: "Uniform capital band",
        },
      },
      {
        kind: "problem",
        eyebrow: "Density",
        title: "Default spacing can make capitals merge",
        body: "Tight uppercase runs reduce the gaps that distinguish neighboring letterforms and slow recognition.",
        visual: {
          type: "layers",
          items: ["Uniform height", "Tight sidebearings", "Dense word shape"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Compensation",
        title: "Add space where shape variation disappeared",
        body: "A modest tracking increase restores separation without turning the label into disconnected characters.",
        visual: {
          type: "rule",
          statement: "Less vertical variation → more horizontal breathing room",
        },
      },
      {
        kind: "application",
        eyebrow: "Starting range",
        title: "Tune an em-based value in context",
        body: "Use roughly 0.05–0.12em as a starting window, then judge the actual face, size, and viewing condition.",
        visual: {
          type: "sequence",
          items: ["Set 0.05em", "Compare density", "Increase only as needed"],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Track caps for recognition, not decoration",
        body: "Uppercase spacing earns its place when it clarifies individual forms and stabilizes the word shape.",
        visual: {
          type: "rule",
          statement: "Readable capitals need controlled separation",
        },
      },
    ],
  },
  {
    id: "DbI4g2RqXeU",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DbI4g2RqXeU/",
      creator: "@designparser",
      publishedAt: "2026-07-23",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Choose em or rem by Ownership",
    summary:
      "A CSS sizing study separating component-relative scaling with em from root-relative sizing with rem, especially when elements are nested.",
    principles: [
      "An em value inherits its scale from the element context.",
      "Nested em sizing can compound across component levels.",
      "A rem value stays anchored to the root type scale.",
    ],
    applications: [
      "Use rem for page-level type sizes that should remain globally stable.",
      "Use em when spacing or type should scale with a component.",
      "Test nested components to expose accidental compounding.",
    ],
    uncertainties: [
      "Speech recognition renders the short unit name ambiguously; the inspected opening visual confirms the comparison is em versus rem.",
      "Only that opening comparison was captured as a scene image.",
    ],
    evidence: [
      {
        label: "Nested em sizing grows",
        start: 0,
        end: 2.56,
      },
      {
        label: "em follows computed parent size",
        start: 2.56,
        end: 8,
      },
      {
        label: "rem follows the root size",
        start: 8,
        end: 10.88,
      },
      {
        label: "Compounded and stable outcomes compared",
        start: 10.88,
        end: 14.88,
      },
      {
        label: "Root stability versus element scaling",
        start: 14.88,
        end: 18,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Relative CSS units",
        title: "Both units are relative, but to different owners",
        body: "em belongs to the current element context; rem belongs to the document root.",
        visual: {
          type: "comparison",
          before: "em → element context",
          after: "rem → root context",
        },
      },
      {
        kind: "problem",
        eyebrow: "Nested scaling",
        title: "Local multipliers can compound silently",
        body: "When an em-sized child sits inside an em-sized parent, each level multiplies the size it inherits.",
        visual: {
          type: "sequence",
          items: [
            "Parent scales",
            "Child inherits",
            "Next layer multiplies again",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Stable reference",
        title: "Use the root when nesting should not change size",
        body: "rem bypasses component-depth multiplication and keeps the value tied to one global baseline.",
        visual: {
          type: "rule",
          statement: "Stable across nesting → rem",
        },
      },
      {
        kind: "application",
        eyebrow: "Ownership test",
        title: "Ask what should control the scale",
        body: "Choose em for component-relative relationships and rem for sizes owned by the page-wide type system.",
        visual: {
          type: "comparison",
          before: "Component owns scale",
          after: "Root owns scale",
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Relative units need an explicit reference",
        body: "Pick em or rem by the intended scaling boundary, then verify the deepest realistic nesting.",
        visual: {
          type: "sequence",
          items: ["Name the owner", "Choose the unit", "Test nesting"],
        },
      },
    ],
  },
  {
    id: "DbDvA52jYS-",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DbDvA52jYS-/",
      creator: "@designparser",
      publishedAt: "2026-07-21",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Paper Series Form a Nested System",
    summary:
      "A format-system study distinguishing A-series content sheets, C-series envelopes, and B-series outer formats, then showing how their geometric relationship supports predictable fitting and folding.",
    principles: [
      "Paper, envelope, and outer-shell formats are separate coordinated roles.",
      "C-series sizes bridge adjacent A- and B-series formats through a geometric relationship.",
      "Repeated A-series folding maps predictably to smaller C-series envelopes.",
    ],
    applications: [
      "Specify an A format for content and the corresponding C format for its envelope.",
      "Use B formats when an outer cover or shell must contain the A format.",
      "Plan folded mail pieces by counting A-series folds before selecting the C envelope.",
    ],
    uncertainties: [
      "The final tagline segment extends beyond the measured media duration and is excluded from evidence.",
      "Scene extraction yielded only the opening A4-envelope misconception.",
    ],
    evidence: [
      {
        label: "A series represents content formats",
        start: 0,
        end: 5.04,
      },
      {
        label: "C envelopes and B outer formats",
        start: 5.76,
        end: 12.72,
      },
      {
        label: "C series bridges A and B",
        start: 13.36,
        end: 16.8,
      },
      {
        label: "Folding maps A formats to smaller C envelopes",
        start: 17.6,
        end: 22.16,
      },
      {
        label: "Content, envelope, and shell roles",
        start: 22.16,
        end: 24,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "ISO format families",
        title: "A4 names a sheet, not an envelope",
        body: "The familiar A series describes content formats such as letters, notebooks, and postcards.",
        visual: {
          type: "rule",
          statement: "A series = content",
        },
      },
      {
        kind: "problem",
        eyebrow: "Role confusion",
        title: "Matching numbers do not mean matching format families",
        body: "Treating A, B, and C as interchangeable labels obscures which object must fit inside which.",
        visual: {
          type: "layers",
          items: ["Content sheet", "Envelope", "Outer shell"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Coordinated geometry",
        title: "C formats sit between content and shell",
        body: "The envelope series is geometrically positioned between the corresponding A and B sizes to make containment predictable.",
        visual: {
          type: "layers",
          items: ["A: inner content", "C: middle envelope", "B: outer format"],
        },
      },
      {
        kind: "application",
        eyebrow: "Fold mapping",
        title: "Count folds to choose the envelope",
        body: "An A4 sheet fits C4 unfolded, C5 after one fold, and C6 after two folds.",
        visual: {
          type: "sequence",
          items: ["A4 unfolded → C4", "One fold → C5", "Two folds → C6"],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Specify the role before the size",
        body: "Choose the family—content, envelope, or shell—then select the coordinated number and fold state.",
        visual: {
          type: "sequence",
          items: ["Name the object", "Count folds", "Select the family"],
        },
      },
    ],
  },
  {
    id: "Da23BpVjXce",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/Da23BpVjXce/",
      creator: "@designparser",
      publishedAt: "2026-07-16",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Invert Logos Optically, Not Mechanically",
    summary:
      "An optical-correction study showing why identical light and dark logo geometry can appear unequal and why the light version may need a subtle reduction.",
    principles: [
      "Equal geometry does not guarantee equal perceived weight.",
      "Bright and dark edges produce different apparent widths.",
      "Inverted marks should be judged optically in their final contexts.",
    ],
    applications: [
      "Compare positive and reversed logos side by side at delivery size.",
      "Reduce the light version slightly when it appears heavier.",
      "Store optical variants explicitly rather than scaling ad hoc in each use.",
    ],
    uncertainties: [
      "The final tagline segment extends beyond the measured media duration and is excluded from evidence.",
      "Scene extraction yielded only the opening same-geometry comparison.",
    ],
    evidence: [
      {
        label: "Light logo appears heavier despite equal geometry",
        start: 0,
        end: 4.48,
      },
      {
        label: "Edges are perceived as transition zones",
        start: 4.48,
        end: 12,
      },
      {
        label: "Bright and dark edges receive unequal processing",
        start: 12,
        end: 18.08,
      },
      {
        label: "Reduce the reversed light version",
        start: 18.08,
        end: 21.12,
      },
      {
        label: "Irradiation illusion identified",
        start: 21.12,
        end: 23.04,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Optical correction",
        title: "The same outline can carry different visual weight",
        body: "A light mark on a dark field often appears thicker than the identical dark mark on a light field.",
        visual: {
          type: "comparison",
          before: "Dark mark on light",
          after: "Light mark on dark",
        },
      },
      {
        kind: "problem",
        eyebrow: "Perceptual mismatch",
        title: "Mechanical inversion preserves pixels, not appearance",
        body: "Reusing one outline for both polarities can make the reversed version feel swollen.",
        visual: {
          type: "rule",
          statement: "Same geometry ≠ same perceived weight",
        },
      },
      {
        kind: "principle",
        eyebrow: "Irradiation",
        title: "Light spreads across the perceived edge",
        body: "Vision treats bright and dark boundaries differently, so bright contours can occupy more apparent area.",
        visual: {
          type: "layers",
          items: ["Geometric edge", "Perceived transition", "Apparent width"],
        },
      },
      {
        kind: "application",
        eyebrow: "Logo variants",
        title: "Make a controlled reversed master",
        body: "Compare both polarities at target size and trim the light version until their visual weights agree.",
        visual: {
          type: "sequence",
          items: [
            "Invert",
            "Compare at size",
            "Reduce light variant",
            "Verify",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Optical equality may require geometric inequality",
        body: "Preserve the logo's perceived weight across backgrounds, even when that means maintaining two outlines.",
        visual: {
          type: "rule",
          statement: "Tune for perception, then document the variant",
        },
      },
    ],
  },
  {
    id: "DavIo74DaTK",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DavIo74DaTK/",
      creator: "@designparser",
      publishedAt: "2026-07-13",
    },
    processedAt: "2026-08-16",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Halve the Sheet, Keep the Shape",
    summary:
      "A paper-format study showing how a single governing ratio near 1.4142 keeps the A-series self-similar when halved and lets derived facts be computed by arithmetic, though its historical dates and exact sheet weight are asserted without cited sources.",
    principles: [
      "A format family governed by one constant ratio keeps every derived size similar to its parent when halved or doubled.",
      "Anchoring the master format to a fixed physical area makes dimensions and weight of every smaller format predictable by calculation.",
      "Standardizing a geometric insight into a published spec is what turns neat math into interoperable practice across countries and print workflows.",
    ],
    applications: [
      "Derive an entire size range by repeatedly halving one master sheet instead of specifying each size independently.",
      "Tie the largest format in the system to an absolute physical quantity so all smaller formats inherit predictable dimensions.",
      "Compute dependent properties such as sheet weight from area ratios and paper grade rather than measuring each item.",
    ],
    uncertainties: [
      "The dates 1786, 1922, and 1975, the one-square-meter area of the master format, and the five-gram weight of a sheet at eighty-gram stock are all stated without citing a study or standard, so treat them as unverified.",
      "The claim that only one ratio can preserve the shape is presented through a compressed derivation, and the exact-weight figure is softened here to a nominal calculation since manufacturing tolerances are never addressed.",
      "Only one still frame was available; it confirms a grid-paper background with a labeled halved-sheet graphic, but the ratio equation, the timeline dates, and the weight example could not be visually verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 6.64,
        label:
          "A halved sheet is posed as keeping its shape and the ratio setup begins",
      },
      {
        start: 6.64,
        end: 14.4,
        label:
          "Solving for the preserved ratio yields 1.4142 with an origin date of 1786",
      },
      {
        start: 14.96,
        end: 22.24,
        label:
          "Standardization in 1922, international adoption in 1975, and the master format defined by area",
      },
      {
        start: 22.24,
        end: 28.64,
        label:
          "Sheet weight is computed from paper grade, closing with the account sign-off",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Paper geometry",
        title: "A halved sheet should stay the same shape",
        body: "The reel opens on a sheet cut down to half and asks which proportion lets a page keep its silhouette after the cut, framing paper size as a designed system rather than an accident.",
        visual: {
          type: "comparison",
          before: "Arbitrary rectangle halves into a lopsided shape",
          after: "Governed ratio halves into the same silhouette",
        },
      },
      {
        kind: "problem",
        eyebrow: "Ad hoc sizes",
        title: "Sizes picked one by one break scaling and estimating",
        body: "When each format is chosen independently, halving distorts proportions and quantities like sheet weight stop being computable from the format alone.",
        visual: {
          type: "layers",
          items: [
            "Independent size lists",
            "Distortion on halving",
            "Uncomputable side effects",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Governing ratio",
        title: "One constant keeps the whole family similar",
        body: "Setting the long side to roughly 1.4142 times the short side means every halved or doubled sheet lands on the same proportion, so a single rule quietly governs every size in the series.",
        visual: {
          type: "rule",
          statement: "Fix the ratio once; every size inherits it",
        },
      },
      {
        kind: "application",
        eyebrow: "Format system",
        title: "Anchor a master sheet and halve downward",
        body: "Define the largest format by a fixed area, derive every smaller format by successive halving, and read properties such as weight straight from the area ratios.",
        visual: {
          type: "sequence",
          items: [
            "Define master sheet by area",
            "Halve to the next size",
            "Repeat across the series",
            "Read weight from area ratio",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "System constant",
        title: "A well-chosen constant does the bookkeeping for you",
        body: "The same proportion that survives cutting also makes area, and anything priced or weighed per area, predictable without measuring each piece.",
        visual: {
          type: "rule",
          statement: "Choose constants that keep working downstream",
        },
      },
    ],
  },
  {
    id: "Dak1dINjZlT",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/Dak1dINjZlT/",
      creator: "@designparser",
      publishedAt: "2026-07-09",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Size Type by Viewing Angle",
    summary:
      "A legibility study replacing fixed physical character sizes with a viewing-angle calculation that scales across distance and medium.",
    principles: [
      "Physical size alone cannot predict legibility without viewing distance.",
      "Angular size connects character height to the observer's eye.",
      "One viewing-angle target can guide many media and distances.",
    ],
    applications: [
      "Define target viewing distance before selecting character height.",
      "Express the legibility target in arcminutes and solve for physical size.",
      "Recalculate signage, screens, labels, and displays for their real environments.",
    ],
    uncertainties: [
      "The segment describing the worked example is terse; the draft retains only the stated distance, angular target, and resulting character height.",
      "Scene extraction yielded only the title card rather than the worked calculation.",
    ],
    evidence: [
      {
        label: "A fixed size fails at another distance",
        start: 0,
        end: 2.64,
      },
      {
        label: "Millimeter rules omit viewing distance",
        start: 2.64,
        end: 6.04,
      },
      {
        label: "Worked angular-size example",
        start: 6.04,
        end: 11.4,
      },
      {
        label: "Method generalizes across media",
        start: 11.4,
        end: 15,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Legibility geometry",
        title: "A character size has no meaning without distance",
        body: "The same physical letter occupies a smaller part of vision as the observer moves away.",
        visual: {
          type: "comparison",
          before: "Near: larger visual angle",
          after: "Far: smaller visual angle",
        },
      },
      {
        kind: "problem",
        eyebrow: "Fixed-size rule",
        title: "Millimeters ignore the viewing setup",
        body: "A universal character height can work nearby and fail at longer distances because the eye receives a different angle.",
        visual: {
          type: "rule",
          statement: "Physical size alone cannot guarantee legibility",
        },
      },
      {
        kind: "principle",
        eyebrow: "Angular target",
        title: "Design the angle the character occupies",
        body: "Connect viewing distance and character height through an arcminute target rather than treating them as separate inputs.",
        visual: {
          type: "layers",
          items: [
            "Observer",
            "Viewing distance",
            "Character height",
            "Visual angle",
          ],
        },
      },
      {
        kind: "application",
        eyebrow: "Worked sizing",
        title: "Solve height from distance and target angle",
        body: "At 60 centimeters, a 20-arcminute target corresponds to about 3.5 millimeters of character height.",
        visual: {
          type: "sequence",
          items: ["Set distance", "Set arcminutes", "Calculate height"],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Scale legibility with the observer",
        body: "Use one angular requirement to translate readable type across signs, screens, labels, and other media.",
        visual: {
          type: "rule",
          statement: "Distance + angular target → character height",
        },
      },
    ],
  },
  {
    id: "DadHXpOKA2N",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DadHXpOKA2N/",
      creator: "@designparser",
      publishedAt: "2026-07-06",
    },
    processedAt: "2026-08-16",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Wind Up Before You Reveal",
    summary:
      "A motion-design study of anticipation, in which a small opposing movement before each meaningful reveal directs attention and keeps transitions from feeling abrupt, though the claim about cognitive cost is asserted without a cited source.",
    principles: [
      "Effective motion separates preparation from revelation: a short wind-up beat precedes the payoff.",
      "A small movement opposite to the coming action can direct the viewer's attention to the exact place the action will occur.",
      "Signaling what is about to happen lets the audience expect the event, which reads as smoother than reacting to a surprise change.",
    ],
    applications: [
      "Precede each meaningful reveal with a short beat of preparatory motion, such as a control compressing slightly ahead of its expansion.",
      "Use a counter movement opposite to the main direction of travel to mark where the action will land.",
      "Review animations with the wind-up removed to check whether the reveal still feels abrupt by comparison.",
    ],
    uncertainties: [
      "The claim that motion without a preparatory beat is cognitively heavier is stated without citing any study or measurement, so the cognitive-cost wording is unverified.",
      "The reel presents the counter movement as reliably capturing attention, softened here to a directional cue because no supporting evidence is offered.",
      "Only one still frame was available; it confirms a static wind-up graphic with a compressing shape and label, but the actual counter movement is a time-based effect that a single image cannot verify.",
    ],
    evidence: [
      {
        start: 0,
        end: 2.56,
        label: "Animation is framed as preparation before revelation",
      },
      {
        start: 2.56,
        end: 6.48,
        label:
          "A counter movement is described as directing attention to the upcoming action",
      },
      {
        start: 6.48,
        end: 12.48,
        label:
          "Skipping the beat is said to feel abrupt and heavier, and a beat before reveals is prescribed",
      },
      {
        start: 12.48,
        end: 17.36,
        label:
          "Anticipation is characterized as a cue that precedes the action itself, ending with the sign-off",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Motion design",
        title: "Good motion prepares before it reveals",
        body: "The reel demonstrates a classic animation idea: the moment before the movement does the work of telling viewers where to look.",
        visual: {
          type: "comparison",
          before: "Reveal lands cold",
          after: "Wind-up cues the reveal",
        },
      },
      {
        kind: "problem",
        eyebrow: "Cold reveals",
        title: "Skipping the wind-up makes motion feel abrupt",
        body: "When an element jumps straight to its changed state, the viewer gets no signal of where to look, so the change registers as sudden and effortful.",
        visual: {
          type: "layers",
          items: ["No attention cue", "Sudden change", "Effortful reading"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Anticipation beat",
        title: "Signal the action ahead of its arrival",
        body: "A short preparatory beat, often a movement opposite to the coming one, marks the place and direction of the next event so the reveal is expected rather than surprising.",
        visual: {
          type: "rule",
          statement: "Prepare, then reveal",
        },
      },
      {
        kind: "application",
        eyebrow: "Beat planning",
        title: "Give every significant reveal a wind-up",
        body: "Give each significant state change a small wind-up, then test the result by deleting that beat and feeling the difference.",
        visual: {
          type: "sequence",
          items: [
            "Spot the meaningful reveal",
            "Add an opposing wind-up beat",
            "Run the reveal",
            "Delete the beat to compare",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Attention first",
        title: "Direct attention to where the action will land",
        body: "Anticipation is attention management: one beat of setup buys the viewer's gaze so the payoff reads instantly.",
        visual: {
          type: "rule",
          statement: "One beat of setup buys the reveal",
        },
      },
    ],
  },
  {
    id: "DaS34qvq4Ti",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DaS34qvq4Ti/",
      creator: "@designparser",
      publishedAt: "2026-07-02",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Visual Angle Makes Scale Contextual",
    summary:
      "A cross-media sizing study showing that perceived size changes with viewing distance, so logo and type dimensions should be specified by angular presence rather than one physical measurement.",
    principles: [
      "The eye responds to angular size rather than physical dimensions alone.",
      "Increasing distance reduces the apparent size of an unchanged object.",
      "Cross-media consistency requires different physical sizes for different viewing setups.",
    ],
    applications: [
      "Document expected viewing distance for each brand or signage placement.",
      "Use arcminutes to compare perceived scale across media.",
      "Resize marks for environmental context instead of copying one dimension everywhere.",
    ],
    uncertainties: [
      "Scene extraction yielded only the opening distance diagram.",
    ],
    evidence: [
      {
        label: "Angular size governs readability",
        start: 0,
        end: 3.16,
      },
      {
        label: "A nearby design can disappear at distance",
        start: 3.16,
        end: 6.96,
      },
      {
        label: "The eye responds to angle",
        start: 6.96,
        end: 9.52,
      },
      {
        label: "Distance changes apparent size",
        start: 9.52,
        end: 13.4,
      },
      {
        label: "Media scaling and arcminute measure",
        start: 13.4,
        end: 18.12,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Perceived scale",
        title: "The eye measures an angle, not a ruler",
        body: "An object's visual presence depends on both its physical size and its distance from the observer.",
        visual: {
          type: "layers",
          items: ["Object size", "Viewing distance", "Angular size"],
        },
      },
      {
        kind: "problem",
        eyebrow: "Cross-media mismatch",
        title: "One dimension cannot survive every context",
        body: "A mark that reads clearly nearby can become negligible across a room or street without changing its measured size.",
        visual: {
          type: "comparison",
          before: "Close viewing",
          after: "Distant viewing",
        },
      },
      {
        kind: "principle",
        eyebrow: "Distance relationship",
        title: "Apparent size shrinks as distance grows",
        body: "Doubling viewing distance roughly halves the angle occupied by the same object.",
        visual: {
          type: "rule",
          statement: "2× distance → about ½ visual angle",
        },
      },
      {
        kind: "application",
        eyebrow: "Brand deployment",
        title: "Set scale for each viewing environment",
        body: "Specify distance and target arcminutes for packaging, screens, signage, and environmental graphics.",
        visual: {
          type: "sequence",
          items: [
            "Measure distance",
            "Choose target angle",
            "Calculate physical size",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Consistency is perceptual, not dimensional",
        body: "Change the physical size so the intended visual presence remains stable across contexts.",
        visual: {
          type: "rule",
          statement: "Match angular presence across media",
        },
      },
    ],
  },
  {
    id: "DaNzsAZKbw4",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DaNzsAZKbw4/",
      creator: "@designparser",
      publishedAt: "2026-06-30",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Pair Images and Labels for Stronger Recall",
    summary:
      "A learning-design study showing how a relevant image plus an integrated label can create both visual and conceptual memory routes.",
    principles: [
      "Pictures can leave a stronger memory trace than prose alone.",
      "Meaningful visuals support both image-based and concept-based encoding.",
      "Labels work best when placed with the visual they explain.",
    ],
    applications: [
      "Turn abstract explanations into simple meaningful diagrams.",
      "Place labels directly on or beside the relevant visual region.",
      "Use imagery to reinforce the concept rather than decorate the page.",
    ],
    uncertainties: [
      "The cited large-scale recognition statistic is retained as a source claim and was not independently verified in this task.",
      "Scene extraction yielded only the opening prose-only state.",
    ],
    evidence: [
      {
        label: "Diagram recall contrasted with paragraph recall",
        start: 0,
        end: 3.6,
      },
      {
        label: "Integrated labels and dual encoding",
        start: 3.6,
        end: 7.36,
      },
      {
        label: "Picture and concept memory routes",
        start: 7.36,
        end: 12.32,
      },
      {
        label: "Single-view recognition claim",
        start: 12.32,
        end: 14.64,
      },
      {
        label: "Picture superiority effect named",
        start: 15.28,
        end: 18.64,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Learning design",
        title: "A diagram can outlast its paragraph",
        body: "A meaningful visual gives memory a shape to retain after the explanatory prose fades.",
        visual: {
          type: "comparison",
          before: "Paragraph only",
          after: "Concept diagram",
        },
      },
      {
        kind: "problem",
        eyebrow: "Single-channel explanation",
        title: "Text alone asks one representation to do all the work",
        body: "Readers must build the structure mentally when the relationship is described but never shown.",
        visual: {
          type: "sequence",
          items: ["Read prose", "Infer structure", "Try to retain it"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Dual encoding",
        title: "Connect a picture route to a concept route",
        body: "A relevant image can be remembered as a visual form and as the idea it represents.",
        visual: {
          type: "layers",
          items: ["Visual form", "Concept label", "Linked memory"],
        },
      },
      {
        kind: "application",
        eyebrow: "Integrated labeling",
        title: "Put the name where the relationship is visible",
        body: "Place concise labels next to the parts they explain so readers do not have to reconcile a distant legend.",
        visual: {
          type: "comparison",
          before: "Remote legend",
          after: "Label beside the feature",
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Use visuals to carry meaning twice",
        body: "Build a simple diagram, integrate its labels, and make every visual element reinforce the concept.",
        visual: {
          type: "sequence",
          items: [
            "Select the concept",
            "Draw the relationship",
            "Attach labels",
          ],
        },
      },
    ],
  },
  {
    id: "DaAzSdbqC3M",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DaAzSdbqC3M/",
      creator: "@designparser",
      publishedAt: "2026-06-25",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Ligatures Resolve Specific Letter Collisions",
    summary:
      "A typography study showing how fi and fl ligatures replace awkward overlaps with purpose-built combined glyphs, and why designers should verify font-feature settings instead of assuming they are active.",
    principles: [
      "Ligatures solve recurring shape collisions between particular letter pairs.",
      "A combined glyph should improve rhythm without obscuring the underlying letters.",
      "OpenType behavior varies by font and design tool, so the rendered result must be checked.",
    ],
    applications: [
      "Inspect words containing fi and fl at the intended size and weight.",
      "Enable standard ligatures when separate glyphs create visible collisions.",
      "Confirm the setting in the tool’s typography controls and compare before and after.",
    ],
    uncertainties: [
      "Speech recognition renders the opening letter names phonetically; the inspected opening visual confirms the examples are fi and fl.",
      "Scene extraction yielded only the opening letter-pair state; later combined forms were not independently captured.",
    ],
    evidence: [
      {
        label: "Separate fi and fl shapes create crowding",
        start: 0,
        end: 6.64,
      },
      {
        label: "A ligature replaces the pair with one designed glyph",
        start: 6.64,
        end: 12,
      },
      {
        label: "Metal type precedent carried into digital fonts",
        start: 12,
        end: 16.16,
      },
      {
        label: "Tool settings can disable the feature",
        start: 16.16,
        end: 20.4,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Letter fitting",
        title: "Some pairs need a shape made for the collision",
        body: "The ascender and dot in fi, and the adjacent tall forms in fl, can crowd when they remain separate glyphs.",
        visual: {
          type: "comparison",
          before: "Separate letterforms",
          after: "Purpose-built pair",
        },
      },
      {
        kind: "problem",
        eyebrow: "Local interference",
        title: "Kerning alone may not resolve overlapping details",
        body: "Moving two letters apart can weaken the word rhythm while leaving their most awkward features visually unrelated.",
        visual: {
          type: "layers",
          items: [
            "Conflicting contours",
            "Extra corrective space",
            "Broken word rhythm",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Ligature logic",
        title: "Replace the collision, not the letters",
        body: "A standard ligature redraws a recurring pair as one coordinated glyph while preserving the word’s reading.",
        visual: {
          type: "rule",
          statement: "Recurring shape conflict → designed combined glyph",
        },
      },
      {
        kind: "application",
        eyebrow: "Font features",
        title: "Check what the actual tool renders",
        body: "Compare fi and fl with standard ligatures on and off at the final type size, weight, and export path.",
        visual: {
          type: "sequence",
          items: [
            "Find collision",
            "Toggle feature",
            "Compare rhythm",
            "Verify output",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Use ligatures as local typographic repairs",
        body: "Keep them when they remove a real collision and leave the word clear.",
        visual: {
          type: "rule",
          statement: "Better fit without lost recognition",
        },
      },
    ],
  },
  {
    id: "DZ7pILjqneU",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DZ7pILjqneU/",
      creator: "@designparser",
      publishedAt: "2026-06-23",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Match Icon Strokes to the Typeface",
    summary:
      "A visual-system study proposing that outline icons feel more coherent beside text when their stroke weight is calibrated against the font’s visible stem rather than accepted from an icon-set default.",
    principles: [
      "Icon weight and type weight are separate systems that need optical coordination.",
      "A font’s visible vertical stem offers a practical reference for outline icon strokes.",
      "Measured alignment is a starting point; final judgment still belongs at the intended size.",
    ],
    applications: [
      "Measure a representative vertical stem in an uppercase H or N at the production size.",
      "Set the outline icon stroke near that measured value, then inspect the pair together.",
      "Repeat the check when font size, weight, rendering scale, or icon family changes.",
    ],
    uncertainties: [
      "The stated 4.8-pixel result belongs to the demonstrated 62-pixel example and is not a universal font-to-icon ratio.",
      "Scene extraction captured only the opening icon-stroke state, not the later measurement.",
    ],
    evidence: [
      {
        label: "Default icon stroke and text size do not automatically align",
        start: 0,
        end: 6,
      },
      {
        label: "A capital stem provides a measurable reference",
        start: 6,
        end: 12,
      },
      {
        label: "The measured value is applied to the icon stroke",
        start: 12,
        end: 16.96,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Icon and type",
        title: "Two visual weights need one calibration point",
        body: "An outline icon can share a nominal size with text and still feel much lighter or heavier.",
        visual: {
          type: "comparison",
          before: "Preset icon stroke",
          after: "Stroke matched to type",
        },
      },
      {
        kind: "problem",
        eyebrow: "Default mismatch",
        title: "Package defaults do not know your typeface",
        body: "Icon libraries ship with fixed stroke choices, while letter stems change with font, weight, size, and rendering.",
        visual: {
          type: "layers",
          items: ["Icon-set default", "Typeface stem", "Visible mismatch"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Reference measure",
        title: "Use a sturdy capital stem as the baseline",
        body: "A vertical stem in H or N supplies a concrete starting value for an outline stroke beside the text.",
        visual: {
          type: "rule",
          statement: "Typeface stem → candidate icon stroke",
        },
      },
      {
        kind: "application",
        eyebrow: "Calibration loop",
        title: "Measure, apply, then judge the pair",
        body: "Match the stroke numerically, inspect it optically at final scale, and adjust only when the rendered relationship calls for it.",
        visual: {
          type: "sequence",
          items: [
            "Set final type",
            "Measure stem",
            "Apply stroke",
            "Inspect together",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Coordinate icon weight with the text it serves",
        body: "Treat the typeface as the local reference, not the icon library’s default.",
        visual: {
          type: "rule",
          statement: "One interface → one perceived weight system",
        },
      },
    ],
  },
  {
    id: "DZ5DTXQNTFs",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DZ5DTXQNTFs/",
      creator: "@designparser",
      publishedAt: "2026-06-22",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Spacing Is Judged in Context",
    summary:
      "A perception study using the Ebbinghaus illusion to show that identical shapes can appear different when their neighbors change, making optical spacing a contextual judgment rather than a purely geometric one.",
    principles: [
      "Perceived size depends partly on surrounding scale and distance.",
      "Equal measurements do not guarantee equal visual weight.",
      "Optical correction should be evaluated inside the final composition.",
    ],
    applications: [
      "Review repeated shapes with their actual neighbors rather than on an empty canvas.",
      "Use geometric values as a baseline, then correct obvious perceptual imbalance.",
      "Test spacing across component variants whose surrounding elements change size.",
    ],
    uncertainties: [
      "The cited research magnitude is indistinct in speech recognition and is omitted from the study.",
      "Only the opening equal-circle state was captured; the changing neighbor configurations were not independently captured.",
    ],
    evidence: [
      {
        label: "Identical circles appear different beside different neighbors",
        start: 0,
        end: 6,
      },
      {
        label: "The eye compares objects with their surroundings",
        start: 6,
        end: 11.84,
      },
      {
        label: "The illusion motivates contextual spacing checks",
        start: 11.84,
        end: 17.52,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Context effect",
        title: "The same circle can carry a different visual size",
        body: "Changing the surrounding shapes changes how a fixed center shape is perceived.",
        visual: {
          type: "comparison",
          before: "Small surrounding forms",
          after: "Large surrounding forms",
        },
      },
      {
        kind: "problem",
        eyebrow: "Geometric equality",
        title: "A ruler cannot see the neighbors",
        body: "Two equal dimensions can feel unequal once nearby scale and spacing alter the comparison.",
        visual: {
          type: "layers",
          items: [
            "Equal geometry",
            "Different context",
            "Different perception",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Optical judgment",
        title: "Evaluate relationships, not isolated objects",
        body: "The useful unit is the visible composition: object, neighbors, gap, and emphasis together.",
        visual: {
          type: "rule",
          statement: "Measured equality + context → perceived balance",
        },
      },
      {
        kind: "application",
        eyebrow: "Design review",
        title: "Test every state where the neighborhood changes",
        body: "Compare components in realistic groups, then make small optical corrections where equal values stop looking balanced.",
        visual: {
          type: "sequence",
          items: [
            "Set equal values",
            "Place real neighbors",
            "Compare states",
            "Correct optically",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Start with geometry and finish with perception",
        body: "Keep equal measurements only when they also produce a stable visual relationship.",
        visual: {
          type: "rule",
          statement: "Context decides whether equality looks equal",
        },
      },
    ],
  },
  {
    id: "DZxXsnYqKwP",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DZxXsnYqKwP/",
      creator: "@designparser",
      publishedAt: "2026-06-19",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Directional Cues Distort Perceived Length",
    summary:
      "A perception study using the Müller-Lyer illusion to show how endpoint direction can make equal lines feel unequal, with implications for optical spacing and alignment.",
    principles: [
      "Perceived length includes the directional cues attached to an edge.",
      "Knowing two dimensions are equal does not remove the visual effect.",
      "Optical alignment may need correction when surrounding geometry points inward or outward.",
    ],
    applications: [
      "Compare icons and controls with different terminal shapes at final size.",
      "Check whether arrows, chevrons, or angled caps shift an apparent edge.",
      "Apply small optical offsets only after testing equal geometry in context.",
    ],
    uncertainties: [
      "The stated experimental magnitude is presented without study conditions, so it is not treated as a universal correction value.",
      "Scene extraction captured the equal bare lines but not the later arrow configurations.",
    ],
    evidence: [
      {
        label: "Two lines begin with equal length",
        start: 0,
        end: 2,
      },
      {
        label: "Arrow direction changes apparent length",
        start: 2,
        end: 8,
      },
      {
        label: "The illusion persists despite knowing the geometry",
        start: 8,
        end: 14,
      },
      {
        label: "Perceptual inequality can affect spacing decisions",
        start: 14,
        end: 18,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Müller-Lyer effect",
        title: "Equal lines can inherit different apparent endpoints",
        body: "Angled marks around a line change where the eye seems to place its beginning and end.",
        visual: {
          type: "comparison",
          before: "Terminals point inward",
          after: "Terminals point outward",
        },
      },
      {
        kind: "problem",
        eyebrow: "False equality",
        title: "The coordinate can be right while the edge feels wrong",
        body: "Matching line lengths numerically does not neutralize the directional pull of their surrounding shapes.",
        visual: {
          type: "layers",
          items: [
            "Equal coordinates",
            "Opposing terminal cues",
            "Unequal apparent length",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Optical endpoint",
        title: "Read the whole contour as the eye reads it",
        body: "Alignment decisions should account for the line plus the geometry that frames its endpoints.",
        visual: {
          type: "rule",
          statement: "Endpoint cue changes perceived extent",
        },
      },
      {
        kind: "application",
        eyebrow: "Interface geometry",
        title: "Check arrows and chevrons beside neutral shapes",
        body: "Set equal bounds first, compare at production size, and introduce only the offset needed to restore balance.",
        visual: {
          type: "sequence",
          items: [
            "Match bounds",
            "Add terminal shapes",
            "Inspect apparent edges",
            "Offset if needed",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Optical alignment can differ from coordinate alignment",
        body: "Use measurements to establish consistency, then verify the perceived endpoints.",
        visual: {
          type: "rule",
          statement: "Equal dimensions still require a visual check",
        },
      },
    ],
  },
  {
    id: "DZprG4lNnca",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DZprG4lNnca/",
      creator: "@designparser",
      publishedAt: "2026-06-16",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Conflicting Signals Slow Recognition",
    summary:
      "An interface-semantics study connecting the Stroop effect to mixed status cues: when color, icon, and text disagree, users must resolve the conflict before acting.",
    principles: [
      "Status cues should reinforce one meaning across words, color, and symbols.",
      "Readable text can dominate a contradictory decorative signal.",
      "Consistency reduces interpretation work at moments that already demand attention.",
    ],
    applications: [
      "Pair success language with success color and iconography.",
      "Audit warnings, buttons, and validation states for semantic contradictions.",
      "Use labels or supporting text so color is not the only carrier of meaning.",
    ],
    uncertainties: [
      "The cited 100–200 millisecond delay is presented without test conditions and is treated as an illustration, not a universal latency.",
      "Only the opening conflicting status state was captured as a scene image.",
    ],
    evidence: [
      {
        label: "A success icon conflicts with an error message",
        start: 0,
        end: 3.76,
      },
      {
        label: "Competing cues communicate opposite actions",
        start: 3.76,
        end: 7.92,
      },
      {
        label: "Reading forces resolution of the conflict",
        start: 7.92,
        end: 14.96,
      },
      {
        label: "The same issue applies across interface signals",
        start: 14.96,
        end: 20.32,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Semantic conflict",
        title: "A green check cannot rescue red error copy",
        body: "When symbol, color, and wording point in different directions, the state becomes a decoding task.",
        visual: {
          type: "comparison",
          before: "Check icon says success",
          after: "Message says failure",
        },
      },
      {
        kind: "problem",
        eyebrow: "Competing cues",
        title: "The user must decide which signal to trust",
        body: "Contradictory status channels add hesitation exactly where the interface should make the next action clear.",
        visual: {
          type: "layers",
          items: ["Icon meaning", "Color meaning", "Text meaning", "Conflict"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Stroop effect",
        title: "Make every channel support the same interpretation",
        body: "Words, colors, and symbols should converge on one state instead of asking attention to suppress a contradiction.",
        visual: {
          type: "rule",
          statement: "One state → one semantic direction",
        },
      },
      {
        kind: "application",
        eyebrow: "State audit",
        title: "Read the interface as a bundle of signals",
        body: "For each button, warning, and result, compare the label, icon, color, and available action before release.",
        visual: {
          type: "sequence",
          items: [
            "Name state",
            "Check wording",
            "Check symbol",
            "Check color",
            "Verify action",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Consistency is processing speed",
        body: "Align the meaning of every visible cue so recognition can lead directly to action.",
        visual: {
          type: "rule",
          statement: "Reinforced meaning beats decorative convention",
        },
      },
    ],
  },
  {
    id: "DZXrgcONJ7m",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DZXrgcONJ7m/",
      creator: "@designparser",
      publishedAt: "2026-06-09",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Color Values Do Not Predict Color Appearance",
    summary:
      "A color-system study showing that identical encoded values can appear different in different contexts, and distinguishing RGB coordinates from perceptually oriented color models.",
    principles: [
      "Color appearance depends on its surrounding field, not only its stored coordinates.",
      "Equal numeric steps in RGB do not imply equal perceptual steps.",
      "Perceptually oriented spaces are useful when visual difference matters more than device encoding.",
    ],
    applications: [
      "Review semantic colors on every background and state where they will appear.",
      "Compare colors by perceived difference as well as by RGB values.",
      "Use a perceptual color space when generating scales or measuring visual distance.",
    ],
    uncertainties: [
      "Speech recognition renders the named perceptual model as “CLAB”; the technical context strongly suggests CIELAB, but the scene frames do not independently show the term.",
      "The second extracted frame is a blank transition and provides no additional color example.",
    ],
    evidence: [
      {
        label: "One encoded color appears different across backgrounds",
        start: 0,
        end: 6.56,
      },
      {
        label: "Human sensitivity is not uniform across RGB channels",
        start: 7.12,
        end: 14.72,
      },
      {
        label: "Encoding and perceptual modeling serve different jobs",
        start: 15.36,
        end: 20.32,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Color context",
        title: "A hex value stays fixed while its appearance moves",
        body: "Surrounding color changes the comparison the eye makes, even when the swatch coordinates are identical.",
        visual: {
          type: "comparison",
          before: "Same value on one field",
          after: "Same value on another field",
        },
      },
      {
        kind: "problem",
        eyebrow: "Numeric confidence",
        title: "Equal channel steps are not equal visual steps",
        body: "RGB records device-oriented coordinates, but those numbers do not mirror human sensitivity uniformly.",
        visual: {
          type: "layers",
          items: [
            "Stored channel values",
            "Viewing context",
            "Perceived result",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Perceptual space",
        title: "Choose a model that matches the decision",
        body: "Use RGB to encode display color and a perceptually oriented model when comparing or generating visible differences.",
        visual: {
          type: "comparison",
          before: "Encode a display color",
          after: "Model perceived distance",
        },
      },
      {
        kind: "application",
        eyebrow: "System testing",
        title: "Validate tokens on their real backgrounds",
        body: "Check each semantic color across light, dark, tinted, disabled, and interactive states before accepting the numeric scale.",
        visual: {
          type: "sequence",
          items: [
            "Set token",
            "Place on contexts",
            "Compare appearance",
            "Adjust system",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Color coordinates are inputs, not guarantees",
        body: "Judge a color by the relationship users will actually see.",
        visual: {
          type: "rule",
          statement: "Same number can produce a different appearance",
        },
      },
    ],
  },
  {
    id: "DZKsPxdtw2Z",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DZKsPxdtw2Z/",
      creator: "@designparser",
      publishedAt: "2026-06-04",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Modular Grids Coordinate Two Dimensions",
    summary:
      "A layout-system study explaining how columns and horizontal flow lines combine into reusable modules that can organize position, size, rhythm, and span.",
    principles: [
      "Columns establish horizontal organization; flow lines establish vertical rhythm.",
      "Their intersections form modules that can be filled, skipped, or combined.",
      "A modular grid coordinates both placement and proportion across a system.",
    ],
    applications: [
      "Define columns and horizontal divisions before placing recurring content.",
      "Use shared module boundaries to size and align related elements.",
      "Allow components to span cells deliberately while retaining the underlying rhythm.",
    ],
    uncertainties: [
      "Scene extraction yielded only the initial blank layout field; later grid construction was not independently captured.",
    ],
    evidence: [
      {
        label: "Column and modular grids serve different roles",
        start: 0,
        end: 3.92,
      },
      {
        label: "Columns and flow lines combine into a matrix",
        start: 3.92,
        end: 8,
      },
      {
        label: "Rows and columns define position and size",
        start: 8,
        end: 14.24,
      },
      {
        label: "Cells can be filled, skipped, or spanned",
        start: 14.24,
        end: 17.68,
      },
      {
        label: "The system applies across editorial and interface layouts",
        start: 17.68,
        end: 21.4,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Grid anatomy",
        title: "Columns organize; modules add proportion",
        body: "Adding horizontal divisions to columns turns a one-direction layout guide into a two-dimensional matrix.",
        visual: {
          type: "layers",
          items: ["Columns", "Horizontal flow lines", "Modular matrix"],
        },
      },
      {
        kind: "problem",
        eyebrow: "Partial structure",
        title: "Columns alone do not coordinate vertical decisions",
        body: "Elements can share left and right anchors while their heights and vertical positions drift without a second rhythm.",
        visual: {
          type: "comparison",
          before: "Aligned horizontally",
          after: "Aligned in two dimensions",
        },
      },
      {
        kind: "principle",
        eyebrow: "Cell logic",
        title: "Every intersection creates a reusable unit",
        body: "Modules provide consistent boundaries that can control where content begins, how large it becomes, and what it spans.",
        visual: {
          type: "rule",
          statement: "Column × flow line → module",
        },
      },
      {
        kind: "application",
        eyebrow: "Composition",
        title: "Fill, skip, and span without losing the system",
        body: "Place content across one or more cells while keeping its edges tied to shared module lines.",
        visual: {
          type: "sequence",
          items: [
            "Set columns",
            "Set flow lines",
            "Choose cells",
            "Span deliberately",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Use modular grids when size and position must coordinate",
        body: "Build a matrix when the layout needs repeatable relationships in both directions.",
        visual: {
          type: "rule",
          statement: "Two axes create one compositional system",
        },
      },
    ],
  },
  {
    id: "DZII6OzNbN4",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DZII6OzNbN4/",
      creator: "@designparser",
      publishedAt: "2026-06-03",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Crop Limbs Away From Joints",
    summary:
      "An image-composition study proposing that crops feel less accidental when frame edges fall along a limb segment rather than directly through a visible joint.",
    principles: [
      "Cropping at a joint can make a body feel abruptly severed.",
      "A crop placed along the limb gives the eye continuity on both sides of the edge.",
      "Joint avoidance is an optical heuristic that must yield to pose, gesture, and editorial intent.",
    ],
    applications: [
      "Identify visible knees, elbows, wrists, ankles, hips, shoulders, and the neck before cropping.",
      "Move the frame edge away from a joint and into a clearer limb segment.",
      "Review the crop at delivery size and across responsive aspect ratios.",
    ],
    uncertainties: [
      "The proposed 10% clearance is presented as a heuristic, not a universal anatomical or compositional rule.",
      "Scene extraction captured only the opening crop demonstration; later joint examples were not independently captured.",
    ],
    evidence: [
      {
        label: "Format changes can force accidental joint crops",
        start: 0,
        end: 5.92,
      },
      {
        label: "The proposed clearance moves the edge away from joints",
        start: 5.92,
        end: 11.84,
      },
      {
        label: "Common body joints form caution zones",
        start: 11.84,
        end: 19.04,
      },
      {
        label: "Place the edge along a limb segment",
        start: 19.04,
        end: 23.36,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Image framing",
        title: "A crop edge becomes part of the pose",
        body: "Where the frame cuts a body changes whether the composition feels intentional or abruptly truncated.",
        visual: {
          type: "comparison",
          before: "Edge crosses a joint",
          after: "Edge crosses a limb segment",
        },
      },
      {
        kind: "problem",
        eyebrow: "Accidental cut",
        title: "Joints amplify the feeling of amputation",
        body: "Knees, elbows, wrists, and other articulation points already mark separation, so cropping there intensifies the break.",
        visual: {
          type: "layers",
          items: ["Visible joint", "Frame edge", "Abrupt termination"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Caution zone",
        title: "Give the joint room inside or outside the frame",
        body: "Move the crop far enough onto the adjacent limb that the edge reads as framing rather than as a severed connection.",
        visual: {
          type: "rule",
          statement: "Avoid the joint; crop along the segment",
        },
      },
      {
        kind: "application",
        eyebrow: "Responsive crops",
        title: "Check every aspect ratio independently",
        body: "A safe desktop crop can land on a joint in portrait or thumbnail variants, so review each generated frame.",
        visual: {
          type: "sequence",
          items: ["Mark joints", "Set crop", "Check edge", "Repeat by ratio"],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Treat joints as crop-warning zones",
        body: "Use the heuristic to find awkward cuts, then judge the final pose and composition.",
        visual: {
          type: "rule",
          statement: "Preserve bodily continuity at the frame edge",
        },
      },
    ],
  },
  {
    id: "DZFmFROqSER",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DZFmFROqSER/",
      creator: "@designparser",
      publishedAt: "2026-06-02",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Dark Interfaces Need Optical Type Checks",
    summary:
      "A typography study arguing that bright text on dark backgrounds can appear optically different from dark text on light, so weight, size, spacing, and contrast should be re-evaluated rather than copied unchanged.",
    principles: [
      "Reversing foreground and background changes the perceived edge of letterforms.",
      "Thin strokes and tight spacing can lose clarity in dark interfaces.",
      "Accessibility contrast and optical compensation are related checks, not substitutes for each other.",
    ],
    applications: [
      "Compare the same text style in light and dark themes at actual device scale.",
      "Adjust weight, size, or tracking only where the dark rendering loses clarity.",
      "Verify contrast for each role and state after optical adjustments.",
    ],
    uncertainties: [
      "The stated adoption rate, tracking range, and contrast target are presented without platform or study conditions; they are treated as prompts for testing rather than universal settings.",
      "Scene extraction captured only the opening light-background type example, not the later dark rendering.",
    ],
    evidence: [
      {
        label: "Dark-mode use motivates a separate design check",
        start: 0,
        end: 4.24,
      },
      {
        label: "Bright-on-dark rendering can alter apparent strokes",
        start: 4.8,
        end: 8,
      },
      {
        label: "Size, weight, and tracking are proposed compensation levers",
        start: 8.72,
        end: 13.2,
      },
      {
        label: "Contrast remains an independent requirement",
        start: 13.2,
        end: 17.04,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Theme inversion",
        title: "Reversing contrast changes how type appears",
        body: "A style tuned as dark text on light can feel thinner, tighter, or less stable when rendered bright on dark.",
        visual: {
          type: "comparison",
          before: "Dark text on light",
          after: "Light text on dark",
        },
      },
      {
        kind: "problem",
        eyebrow: "Optical loss",
        title: "Copied tokens can collapse in the dark theme",
        body: "Fine strokes and narrow counters may lose definition even when the nominal type values remain identical.",
        visual: {
          type: "layers",
          items: [
            "Same type token",
            "Reversed luminance",
            "Different apparent edge",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Separate evaluation",
        title: "Treat dark typography as its own rendered state",
        body: "Weight, size, spacing, and contrast should be checked together in the real theme and device context.",
        visual: {
          type: "rule",
          statement: "Same token does not guarantee same readability",
        },
      },
      {
        kind: "application",
        eyebrow: "Theme QA",
        title: "Change only what the rendered comparison justifies",
        body: "Test paired screens, adjust the weakest roles, then recheck hierarchy and contrast across interaction states.",
        visual: {
          type: "sequence",
          items: [
            "Render both themes",
            "Inspect weak strokes",
            "Tune selectively",
            "Recheck contrast",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Design the dark state instead of inverting it",
        body: "Use the light theme as a reference, not as an unquestioned specification.",
        visual: {
          type: "rule",
          statement: "Optical equivalence may require different values",
        },
      },
    ],
  },
  {
    id: "DY4yHscKzb4",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DY4yHscKzb4/",
      creator: "@designparser",
      publishedAt: "2026-05-28",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Balance Padding by Perceived Enclosure",
    summary:
      "A component-spacing study explaining why equal horizontal and vertical padding can feel uneven, and proposing wider horizontal space for compact controls whose reading direction is horizontal.",
    principles: [
      "Vertical space can read as stronger enclosure than the same horizontal distance.",
      "Compact controls follow a horizontal reading flow that often benefits from wider side padding.",
      "Padding ratios are optical heuristics tied to component type, not universal container rules.",
    ],
    applications: [
      "Start buttons, tags, and chips with more horizontal than vertical padding.",
      "Compare the control at its real label length, type size, and border treatment.",
      "Evaluate cards and large containers separately instead of inheriting the compact-control ratio.",
    ],
    uncertainties: [
      "The proposed two-to-one horizontal ratio is a contextual starting point for compact controls, not a universal spacing formula.",
      "Scene extraction yielded only the opening button state; alternative ratios were not independently captured.",
    ],
    evidence: [
      {
        label: "Equal padding can appear unequal",
        start: 0,
        end: 2.08,
      },
      {
        label:
          "Vertical space reads as enclosure while horizontal space follows flow",
        start: 2.08,
        end: 7.32,
      },
      {
        label: "Enclosure can feel visually stronger",
        start: 7.32,
        end: 9.08,
      },
      {
        label: "A wider horizontal ratio is proposed for compact controls",
        start: 9.08,
        end: 15.28,
      },
      {
        label: "Perception should decide the final balance",
        start: 15.28,
        end: 17.8,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Component spacing",
        title: "Equal padding does not always look balanced",
        body: "The same numeric inset on every side can make a compact control feel vertically heavy or horizontally cramped.",
        visual: {
          type: "comparison",
          before: "Equal inset on all sides",
          after: "Wider horizontal inset",
        },
      },
      {
        kind: "problem",
        eyebrow: "Different readings",
        title:
          "Vertical space encloses while horizontal space carries the label",
        body: "A control’s height defines its containment, but its width supports the left-to-right flow of the content.",
        visual: {
          type: "layers",
          items: [
            "Vertical enclosure",
            "Horizontal reading flow",
            "Perceived imbalance",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Optical ratio",
        title: "Give compact controls more room along the reading axis",
        body: "Buttons, tags, and chips often settle when side padding exceeds top and bottom padding.",
        visual: {
          type: "rule",
          statement: "Horizontal flow → wider side padding",
        },
      },
      {
        kind: "application",
        eyebrow: "Component tuning",
        title: "Test the ratio with real labels and borders",
        body: "Begin with a wider horizontal inset, then compare short and long labels across sizes before fixing the token.",
        visual: {
          type: "sequence",
          items: [
            "Set vertical inset",
            "Add wider sides",
            "Test label lengths",
            "Tune optically",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Use ratios as starts, not laws",
        body: "Let component role and perceived enclosure determine the final padding.",
        visual: {
          type: "rule",
          statement: "Geometry proposes; perception decides",
        },
      },
    ],
  },
  {
    id: "DYzoJ3LKzFd",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DYzoJ3LKzFd/",
      creator: "@designparser",
      publishedAt: "2026-05-26",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Use Real Small Caps or Skip Them",
    summary:
      "A typography study distinguishing purpose-drawn small capitals from mechanically reduced uppercase letters, whose thinner strokes can break the surrounding text color.",
    principles: [
      "True small caps are drawn to harmonize with lowercase text, not merely scaled from full capitals.",
      "Mechanical scaling reduces both height and stroke weight, creating a visibly weaker texture.",
      "Small-cap styling depends on an actual font feature and should be verified before use.",
    ],
    applications: [
      "Check whether the selected font includes purpose-drawn small capitals.",
      "Compare small caps with neighboring lowercase at the final size and weight.",
      "Switch fonts or choose another emphasis treatment when the feature is absent.",
    ],
    uncertainties: [
      "The stated 70% synthesis behavior is tool-dependent and is not treated as a universal scaling rule.",
      "The broad claim about how many fonts lack small capitals is not independently quantified.",
      "Scene extraction captured only the opening mixed-case comparison; later feature checks were not independently captured.",
    ],
    evidence: [
      {
        label: "Software can synthesize small caps from reduced capitals",
        start: 0,
        end: 5.2,
      },
      {
        label: "Scaling also weakens the capital strokes",
        start: 5.2,
        end: 10.96,
      },
      {
        label: "The designer must verify the font feature",
        start: 10.96,
        end: 15.36,
      },
      {
        label: "Absent small capitals require another choice",
        start: 15.36,
        end: 19.28,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Small-cap typography",
        title: "Reduced capitals are not purpose-drawn small caps",
        body: "A software-generated substitute shrinks the full-capital shape without rebuilding its weight and proportions for text.",
        visual: {
          type: "comparison",
          before: "Scaled uppercase",
          after: "Designed small capital",
        },
      },
      {
        kind: "problem",
        eyebrow: "Uneven text color",
        title: "Height falls, and stroke strength falls with it",
        body: "Mechanically reduced capitals can look pale beside lowercase because every contour becomes thinner.",
        visual: {
          type: "layers",
          items: [
            "Full capital shape",
            "Uniform reduction",
            "Weaker stroke texture",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Font capability",
        title: "The feature must exist in the typeface",
        body: "Real small capitals are an authored set whose height, spacing, and stroke weight are coordinated with the family.",
        visual: {
          type: "rule",
          statement: "Purpose-drawn glyphs → consistent text color",
        },
      },
      {
        kind: "application",
        eyebrow: "Typography check",
        title: "Inspect the font before assigning the style",
        body: "Turn on the available feature, compare it in context, and reject a synthetic result that visibly thins out.",
        visual: {
          type: "sequence",
          items: [
            "Check font feature",
            "Render in context",
            "Compare stroke color",
            "Keep or replace",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "No real small caps means no small-cap shortcut",
        body: "Choose another font or another form of emphasis instead of accepting a weak simulation.",
        visual: {
          type: "rule",
          statement: "Authentic feature or deliberate alternative",
        },
      },
    ],
  },
  {
    id: "DYxAcxGqIvp",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DYxAcxGqIvp/",
      creator: "@designparser",
      publishedAt: "2026-05-25",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Scale Corner Radius With Component Character",
    summary:
      "A component-style study treating corner radius as a proportional signal: sharper corners can feel precise, moderate rounding neutral, and pill shapes overtly soft or playful.",
    principles: [
      "Corner radius communicates tone through its relationship to component size.",
      "A fixed radius can feel inconsistent when applied across very different dimensions.",
      "Radius bands are visual heuristics, not semantic guarantees.",
    ],
    applications: [
      "Define radius tokens relative to the component families they serve.",
      "Compare sharp, moderate, rounded, and pill variants at production size.",
      "Test whether a radius remains coherent across buttons, cards, fields, and responsive sizes.",
    ],
    uncertainties: [
      "The percentage bands and personality labels are subjective style heuristics without stated study conditions.",
      "A 50% value does not produce the same geometry for every box shape or rendering system.",
      "Only the opening rectangular state was captured; the later radius progression was not independently captured.",
    ],
    evidence: [
      {
        label: "Radius is framed as a proportional personality cue",
        start: 0,
        end: 6.16,
      },
      {
        label: "Lower and moderate bands are assigned different tones",
        start: 6.16,
        end: 12.8,
      },
      {
        label: "Larger rounding and pill forms signal increasing softness",
        start: 13.44,
        end: 22.48,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Shape language",
        title: "Corner radius changes how a component speaks",
        body: "The same rectangle can feel technical, neutral, friendly, or playful as its corners move from sharp to fully rounded.",
        visual: {
          type: "sequence",
          items: ["Sharp", "Moderate", "Rounded", "Pill"],
        },
      },
      {
        kind: "problem",
        eyebrow: "Token mismatch",
        title: "One fixed radius drifts across component sizes",
        body: "A value that reads softly on a small control can become barely visible on a large surface.",
        visual: {
          type: "comparison",
          before: "Same radius everywhere",
          after: "Radius scaled by component",
        },
      },
      {
        kind: "principle",
        eyebrow: "Proportional cue",
        title: "Judge rounding as a share of the shape",
        body: "Evaluate corner curvature against width, height, border weight, and the rest of the system rather than as an isolated number.",
        visual: {
          type: "rule",
          statement: "Radius ÷ component scale → perceived character",
        },
      },
      {
        kind: "application",
        eyebrow: "System calibration",
        title: "Build a small family, then test the transitions",
        body: "Compare representative controls and surfaces across the intended radius levels before naming the tokens.",
        visual: {
          type: "sequence",
          items: [
            "Choose component set",
            "Apply radius levels",
            "Compare character",
            "Name tokens",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Use radius to reinforce a tone, not manufacture one",
        body: "Let proportional rounding support the broader type, color, spacing, and interaction language.",
        visual: {
          type: "rule",
          statement: "Consistent character comes from the whole system",
        },
      },
    ],
  },
  {
    id: "DYmrv0PqtvV",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DYmrv0PqtvV/",
      creator: "@designparser",
      publishedAt: "2026-05-21",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Shapes Carry Sound Expectations",
    summary:
      "A naming study based on the bouba–kiki effect: rounded and angular contours tend to evoke different sound qualities before a viewer knows what a name means.",
    principles: [
      "Visual contour can bias how an unfamiliar word is expected to sound.",
      "Rounded forms often pair with softer sounds, while angular forms often pair with sharper sounds.",
      "Sound–shape correspondence is a tendency to test, not a deterministic naming law.",
    ],
    applications: [
      "Compare candidate names against the contour language of a brand or product.",
      "Use rounded and angular visual territories to probe whether a name feels congruent.",
      "Validate associations with the intended audience rather than assuming universal agreement.",
    ],
    uncertainties: [
      "The stated prevalence, cross-cultural universality, and infant-age claims are presented without study details and are not treated as universal facts.",
      "Scene extraction captured the rounded and angular examples but not later participant or research evidence.",
    ],
    evidence: [
      {
        label: "Rounded and angular forms invite different invented names",
        start: 0,
        end: 3.96,
      },
      {
        label: "The association appears without prior word knowledge",
        start: 3.96,
        end: 5.64,
      },
      {
        label: "Broad prevalence claims are introduced",
        start: 5.64,
        end: 13.08,
      },
      {
        label: "Shape is linked to sound expectation",
        start: 13.08,
        end: 18.32,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Bouba–kiki effect",
        title: "A contour can suggest how a word should sound",
        body: "People often match a soft invented name to a rounded shape and a clipped name to an angular one.",
        visual: {
          type: "comparison",
          before: "Rounded contour / soft sound",
          after: "Angular contour / sharp sound",
        },
      },
      {
        kind: "problem",
        eyebrow: "Naming in isolation",
        title: "A word and a visual identity can pull apart",
        body: "An unfamiliar name may imply one sensory quality while the product shapes and marks imply another.",
        visual: {
          type: "layers",
          items: ["Name sound", "Visual contour", "Perceived mismatch"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Crossmodal cue",
        title: "Treat sound and shape as one expectation system",
        body: "Phonetic rhythm and contour character can reinforce each other before literal meaning takes over.",
        visual: {
          type: "rule",
          statement: "Sound quality ↔ contour quality",
        },
      },
      {
        kind: "application",
        eyebrow: "Concept testing",
        title: "Pair names with contrasting shape territories",
        body: "Show rounded and angular directions, ask for unprompted associations, and look for stable patterns in the target audience.",
        visual: {
          type: "sequence",
          items: [
            "Select names",
            "Build shape contrasts",
            "Test associations",
            "Refine pairing",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Use the effect as a hypothesis, not a verdict",
        body: "Let sound–shape fit guide exploration, then validate it with the people and context that matter.",
        visual: {
          type: "rule",
          statement: "Association suggests; audience evidence decides",
        },
      },
    ],
  },
  {
    id: "DYhiRDcqEnX",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DYhiRDcqEnX/",
      creator: "@designparser",
      publishedAt: "2026-05-19",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Adapt Color Tokens Across Themes",
    summary:
      "A color-system study showing why one encoded color can feel more saturated or lose contrast on a darker background, motivating theme-specific chroma and tone adjustments while preserving hue.",
    principles: [
      "Identical color coordinates can produce different appearances across light and dark surroundings.",
      "Hue continuity does not require identical chroma and tone values.",
      "Theme adaptation should protect both perceptual character and contrast.",
    ],
    applications: [
      "Compare each semantic color on its real light and dark backgrounds.",
      "Hold the intended hue relationship while testing lower chroma and lighter tone in dark mode.",
      "Measure contrast again after every perceptual adjustment.",
    ],
    uncertainties: [
      "The suggested 20–30% chroma reduction is a contextual starting range, not a universal dark-mode conversion.",
      "The phrase “contrast collapses” does not specify the tested colors, backgrounds, or contrast method.",
      "Only the opening light-versus-dark comparison was captured; the adjusted result was not independently captured.",
    ],
    evidence: [
      {
        label: "The same encoded color appears different across modes",
        start: 0,
        end: 5.36,
      },
      {
        label: "Chroma reduction and tone lift are proposed for dark mode",
        start: 5.36,
        end: 12,
      },
      {
        label:
          "The adjusted token preserves hue while changing appearance controls",
        start: 12,
        end: 16.24,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Theme color",
        title: "One hex value does not create one visual result",
        body: "A shared token can appear stronger on a dark field and weaker in contrast even though its stored coordinates do not change.",
        visual: {
          type: "comparison",
          before: "Same value on light",
          after: "Same value on dark",
        },
      },
      {
        kind: "problem",
        eyebrow: "Literal reuse",
        title: "Copied coordinates can break perceptual continuity",
        body: "Dark surroundings alter saturation and contrast relationships, so identical numbers may stop serving the same role.",
        visual: {
          type: "layers",
          items: [
            "Shared encoded value",
            "Changed background",
            "Changed appearance",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Controlled adaptation",
        title: "Preserve identity while adjusting chroma and tone",
        body: "Keep the color family recognizable, then tune intensity and lightness for the new surrounding field.",
        visual: {
          type: "rule",
          statement: "Stable hue + adapted chroma and tone",
        },
      },
      {
        kind: "application",
        eyebrow: "Token pairing",
        title: "Design light and dark values side by side",
        body: "Place both theme tokens in representative states, compare their visual role, and verify contrast after each change.",
        visual: {
          type: "sequence",
          items: [
            "Set semantic role",
            "Compare themes",
            "Tune appearance",
            "Verify contrast",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Theme parity is perceptual, not numeric",
        body: "Use different coordinates when they are required to preserve the same visible intent.",
        visual: {
          type: "rule",
          statement: "Match the role, not the raw value",
        },
      },
    ],
  },
  {
    id: "DYe8mXVq4r4",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DYe8mXVq4r4/",
      creator: "@designparser",
      publishedAt: "2026-05-18",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Balance Page Margins as a Spread",
    summary:
      "A page-layout study describing a traditional 1:1:2:2 margin relationship and an optically raised text block, so facing pages read as a balanced spread rather than two isolated centered rectangles.",
    principles: [
      "Inner, top, outer, and bottom margins form a proportional system.",
      "Facing-page balance depends on the combined inner margins as well as each page edge.",
      "Optical centering can place a text block slightly above geometric center.",
    ],
    applications: [
      "Design facing pages together before tuning individual margins.",
      "Use a base unit to compare gutter, head, fore-edge, and foot relationships.",
      "Raise the text block only after evaluating the full spread at reading size.",
    ],
    uncertainties: [
      "The historical continuity claim is not accompanied by specific manuscripts or sources.",
      "The 1:1:2:2 proportions and 5–10% upward correction are presented as one compositional canon, not universal page-layout rules.",
      "Scene extraction captured only the opening margin diagram; later diagonal construction was not independently captured.",
    ],
    evidence: [
      {
        label: "A 1:1:2:2 margin relationship is introduced",
        start: 0,
        end: 3.88,
      },
      {
        label: "Diagonal construction is linked to historical page practice",
        start: 3.88,
        end: 9.72,
      },
      {
        label: "Facing inner margins balance the outer margin",
        start: 9.72,
        end: 14.88,
      },
      {
        label: "The text block sits above geometric center",
        start: 14.88,
        end: 20.32,
      },
      {
        label: "A modest upward shift is proposed",
        start: 20.32,
        end: 22.28,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Page canon",
        title: "Margins become a system when the book opens",
        body: "The gutter, head, fore-edge, and foot can share a base ratio that balances each page with its facing partner.",
        visual: {
          type: "layers",
          items: ["Gutter 1", "Head 1", "Fore-edge 2", "Foot 2"],
        },
      },
      {
        kind: "problem",
        eyebrow: "Isolated centering",
        title: "A centered rectangle can feel low and disconnected",
        body: "Geometric centering ignores the visual weight of the foot margin and the combined interior of a spread.",
        visual: {
          type: "comparison",
          before: "Page centered alone",
          after: "Spread balanced together",
        },
      },
      {
        kind: "principle",
        eyebrow: "Spread proportion",
        title: "Treat two inner margins as one shared interval",
        body: "When the book is open, the paired gutters participate in the same rhythm as the outer margins.",
        visual: {
          type: "rule",
          statement: "Two facing gutters → one central spacing relationship",
        },
      },
      {
        kind: "application",
        eyebrow: "Optical placement",
        title: "Set the ratio, then judge vertical position",
        body: "Build the margin system first and test a slight upward shift only if the text block still reads low.",
        visual: {
          type: "sequence",
          items: [
            "Choose base unit",
            "Build facing margins",
            "Place text block",
            "Adjust optically",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Compose the spread, not just the page",
        body: "Use proportional margins to create a stable reading field across both pages.",
        visual: {
          type: "rule",
          statement: "Facing relationships define page balance",
        },
      },
    ],
  },
  {
    id: "DYUpz17qlvT",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DYUpz17qlvT/",
      creator: "@designparser",
      publishedAt: "2026-05-14",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Build Weight Hierarchy With Visible Steps",
    summary:
      "A typography-system study arguing that adjacent numeric font weights may look too similar for hierarchy, so roles should be selected by perceptible contrast rather than by consecutive labels.",
    principles: [
      "Font-weight numbers name positions on an axis; they do not guarantee equal perceptual intervals.",
      "A hierarchy needs visible contrast between neighboring roles.",
      "Fewer well-separated weights can create a clearer system than many subtle steps.",
    ],
    applications: [
      "Render candidate text roles together in the actual typeface.",
      "Compare regular, emphasis, and display weights at production sizes.",
      "Remove intermediate weights that do not create a distinct visual role.",
    ],
    uncertainties: [
      "The proposed 200-unit spacing is a heuristic; numeric weight intervals vary visibly across font families and variable-font axes.",
      "The opening frame shows the available weight ladder but not the later three-role comparison.",
    ],
    evidence: [
      {
        label: "A nearby weight step is described as too weak for hierarchy",
        start: 0,
        end: 4.8,
      },
      {
        label: "Wider numeric separation is proposed",
        start: 5.44,
        end: 13.52,
      },
      {
        label: "A three-step 400, 600, 800 system is suggested",
        start: 13.52,
        end: 17.68,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Type hierarchy",
        title: "A numeric step is not automatically a visible step",
        body: "Moving from one named font weight to the next may change the file value more than the perceived role.",
        visual: {
          type: "comparison",
          before: "Adjacent weight labels",
          after: "Clearly separated roles",
        },
      },
      {
        kind: "problem",
        eyebrow: "Muddy emphasis",
        title: "Too many nearby weights flatten the system",
        body: "When regular, medium, and semibold look almost alike, readers cannot reliably infer which role matters more.",
        visual: {
          type: "layers",
          items: [
            "Several weight tokens",
            "Small visible differences",
            "Unclear hierarchy",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Perceptual interval",
        title: "Choose weights by contrast in the actual family",
        body: "The useful gap is the one that produces a distinct reading level at the intended size and rendering.",
        visual: {
          type: "rule",
          statement: "Visible role change matters more than axis arithmetic",
        },
      },
      {
        kind: "application",
        eyebrow: "Token audit",
        title: "Put every hierarchy role on one test page",
        body: "Compare the candidates together, keep the few that separate cleanly, and retest across small and large text.",
        visual: {
          type: "sequence",
          items: [
            "Render roles",
            "Compare contrast",
            "Remove duplicates",
            "Test sizes",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Use the smallest weight set that reads clearly",
        body: "Let perceptual separation define the hierarchy instead of filling every available axis stop.",
        visual: {
          type: "rule",
          statement: "Distinct roles beat dense weight ladders",
        },
      },
    ],
  },
  {
    id: "DYPghJ_KSek",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DYPghJ_KSek/",
      creator: "@designparser",
      publishedAt: "2026-05-12",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Compare Font Payloads in Production",
    summary:
      "A web-typography study correcting the assumption that variable fonts are always smaller: their efficiency depends on how many styles and axes are needed, how each build is subset, and what the final payload contains.",
    principles: [
      "A variable font consolidates multiple styles, but consolidation alone does not guarantee a smaller transfer.",
      "Variable delivery becomes more competitive as one file replaces several required static styles.",
      "Axes, compression, subsetting, family design, and actual usage determine the result.",
    ],
    applications: [
      "List the exact styles and character sets each page needs.",
      "Build equivalent static and variable subsets with the same production scope.",
      "Compare final transferred font payloads rather than source files or marketing claims.",
    ],
    uncertainties: [
      "Speech recognition garbles the webfont format name near the end; the opening visual confirms a variable webfont example, but no file-size comparison is shown.",
      "Scene extraction captured only the opening variable-font asset state.",
    ],
    evidence: [
      {
        label: "Variable fonts are not inherently smaller",
        start: 0,
        end: 2.4,
      },
      {
        label: "Static delivery uses separate style resources",
        start: 2.4,
        end: 8.52,
      },
      {
        label: "Variable delivery combines style variation",
        start: 8.52,
        end: 14.6,
      },
      {
        label: "Axes, compression, subsetting, and family affect efficiency",
        start: 14.6,
        end: 19.16,
      },
      {
        label: "Production payloads must be compared directly",
        start: 19.16,
        end: 25.72,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Webfont delivery",
        title: "One variable resource is not automatically the lightest option",
        body: "Combining styles can reduce requests and duplication, but the final transfer still depends on what the resource contains.",
        visual: {
          type: "comparison",
          before: "Several static styles",
          after: "One variable family",
        },
      },
      {
        kind: "problem",
        eyebrow: "File-count shortcut",
        title: "Fewer resources can still carry more unused capability",
        body: "A broad variable build may include axes or character coverage that a narrowly subset static set does not need.",
        visual: {
          type: "layers",
          items: [
            "Style coverage",
            "Axis coverage",
            "Character subset",
            "Compressed payload",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Equivalent scope",
        title: "Compare like-for-like production builds",
        body: "Both options should represent the same styles, scripts, features, and delivery conditions before size is judged.",
        visual: {
          type: "rule",
          statement: "Equal requirements → meaningful payload comparison",
        },
      },
      {
        kind: "application",
        eyebrow: "Delivery test",
        title: "Measure the resources the browser actually receives",
        body: "Subset both strategies, enable production compression, and compare transferred bytes for representative pages.",
        visual: {
          type: "sequence",
          items: [
            "Define requirements",
            "Build both options",
            "Compress and subset",
            "Measure transfer",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Choose variable fonts for the system, not the slogan",
        body: "Use the format that best balances needed flexibility, payload, rendering, and maintenance.",
        visual: {
          type: "rule",
          statement: "Production evidence decides efficiency",
        },
      },
    ],
  },
  {
    id: "DYM6HkmK8r1",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DYM6HkmK8r1/",
      creator: "@designparser",
      publishedAt: "2026-05-11",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Give the Layout a Clear Entry Point",
    summary:
      "A visual-hierarchy study explaining how one dominant anchor and a supporting alignment axis can tell the eye where to begin and how to move through a composition.",
    principles: [
      "A clear anchor reduces the search required to enter a layout.",
      "Size or contrast can establish dominance without explicit instruction.",
      "Alignment turns the anchor into an orientation system for related elements.",
    ],
    applications: [
      "Identify the first element a viewer should notice on each key layout.",
      "Strengthen that element through size, contrast, position, or a deliberate combination.",
      "Align secondary content to a visible axis that extends the anchor’s logic.",
    ],
    uncertainties: [
      "The speed claim is presented without study conditions and is not used as a measurable performance guarantee.",
      "The one-anchor rule is a simplification for focused compositions; complex interfaces can support multiple coordinated entry points.",
      "Only the opening low-hierarchy poster state was captured; later anchor and axis changes were not independently captured.",
    ],
    evidence: [
      {
        label: "A layout without an anchor lacks an entry point",
        start: 0,
        end: 3.8,
      },
      {
        label: "Visual search adds effort",
        start: 3.8,
        end: 6.28,
      },
      {
        label: "Dominance by size or contrast establishes an anchor",
        start: 6.28,
        end: 13.96,
      },
      {
        label: "Axial alignment stabilizes orientation",
        start: 13.96,
        end: 18.44,
      },
      {
        label: "Breaking the anchor relationship weakens hierarchy",
        start: 18.44,
        end: 20.22,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Visual hierarchy",
        title: "Every focused layout needs somewhere to begin",
        body: "Without a dominant element, the eye must search across equally weighted content before it can form a reading path.",
        visual: {
          type: "comparison",
          before: "Many equal signals",
          after: "One clear anchor",
        },
      },
      {
        kind: "problem",
        eyebrow: "Entry cost",
        title: "No anchor turns scanning into guesswork",
        body: "When nothing leads, viewers spend attention deciding where the composition starts instead of understanding it.",
        visual: {
          type: "layers",
          items: ["Equal emphasis", "Uncertain entry", "Slow orientation"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Anchor and axis",
        title: "Dominance starts the path; alignment continues it",
        body: "A strong element captures attention, and a shared edge or axis organizes the content that follows.",
        visual: {
          type: "rule",
          statement: "Anchor → axis → reading path",
        },
      },
      {
        kind: "application",
        eyebrow: "Hierarchy audit",
        title: "Name the first look and test the next two",
        body: "Choose the intended entry point, strengthen it, and verify that secondary elements connect through a stable alignment.",
        visual: {
          type: "sequence",
          items: [
            "Choose entry",
            "Create dominance",
            "Set axis",
            "Trace reading path",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "One strong beginning can organize the whole",
        body: "Build hierarchy around an intentional anchor and let alignment carry its influence.",
        visual: {
          type: "rule",
          statement: "Clear entry creates coherent orientation",
        },
      },
    ],
  },
  {
    id: "DYCqzklq_cg",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DYCqzklq_cg/",
      creator: "@designparser",
      publishedAt: "2026-05-07",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Define Logo Clear Space From a Stable Unit",
    summary:
      "A brand-system study proposing that logo clear space be expressed as a repeatable unit—such as cap height—so surrounding content cannot crowd the mark.",
    principles: [
      "Clear space protects recognition by separating a logo from competing elements.",
      "A unit derived from the mark or wordmark scales with the logo.",
      "The exclusion zone must be explicit enough for different placements and formats.",
    ],
    applications: [
      "Choose a stable internal measure such as cap height as the base unit.",
      "Specify the factor and show the resulting boundary on every side.",
      "Test the rule against nearby type, imagery, edges, and partner marks.",
    ],
    uncertainties: [
      "The factor applied to the base unit is not specified and must be chosen for the actual mark.",
      "Cap height is one example; symbols without a wordmark may require a different stable measure.",
      "Scene extraction captured only the opening logo state, not the measured exclusion zone.",
    ],
    evidence: [
      {
        label: "Crowded placement is identified as the problem",
        start: 0,
        end: 4.24,
      },
      {
        label: "Adjacent elements reduce clarity and motivate a base unit",
        start: 4.24,
        end: 8.4,
      },
      {
        label: "Clear space is defined as a scaled unit",
        start: 8.4,
        end: 12,
      },
      {
        label: "The unit is applied around every side",
        start: 12,
        end: 15.52,
      },
      {
        label: "The exclusion zone remains empty",
        start: 15.52,
        end: 20,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Brand protection",
        title: "A logo needs a boundary that travels with it",
        body: "Clear space gives the mark enough separation to remain recognizable across changing layouts.",
        visual: {
          type: "layers",
          items: ["Logo", "Measured boundary", "Surrounding content"],
        },
      },
      {
        kind: "problem",
        eyebrow: "Visual crowding",
        title: "Nearby elements compete with the mark",
        body: "Type, images, borders, and partner logos can reduce clarity when they enter the logo’s immediate field.",
        visual: {
          type: "comparison",
          before: "Crowded placement",
          after: "Protected placement",
        },
      },
      {
        kind: "principle",
        eyebrow: "Scalable unit",
        title: "Derive the boundary from a stable part of the identity",
        body: "An internal measure such as cap height scales with the wordmark and avoids a fixed distance that fails at new sizes.",
        visual: {
          type: "rule",
          statement: "Internal unit × factor → clear-space boundary",
        },
      },
      {
        kind: "application",
        eyebrow: "Usage rule",
        title: "Show the exclusion zone, not just the number",
        body: "Document the base unit, factor, and boundary on all four sides with realistic collision examples.",
        visual: {
          type: "sequence",
          items: [
            "Select unit",
            "Choose factor",
            "Draw boundary",
            "Test intrusions",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Nothing enters the defined field",
        body: "Make the clear-space rule measurable, scalable, and easy to audit in every placement.",
        visual: {
          type: "rule",
          statement: "Protected space preserves recognition",
        },
      },
    ],
  },
  {
    id: "DX9dIX7K0Zh",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DX9dIX7K0Zh/",
      creator: "@designparser",
      publishedAt: "2026-05-05",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Use Easing to Express Physical Intent",
    summary:
      "A motion-design study contrasting constant-speed interpolation with easing, showing how acceleration and deceleration help interface changes align with familiar motion expectations.",
    principles: [
      "Natural motion usually changes speed rather than moving linearly from start to finish.",
      "An easing curve communicates how an object departs, travels, and settles.",
      "The appropriate curve depends on the interaction’s direction, distance, and purpose.",
    ],
    applications: [
      "Use constant-speed motion only when mechanical uniformity is intentional.",
      "Test hover growth and other short state changes with a gentle settling curve.",
      "Compare curves at production distance and duration instead of judging names alone.",
    ],
    uncertainties: [
      "The broad claim that ease-out feels natural is treated as a short settling-motion example, not a universal curve choice.",
      "Scene extraction captured only the opening dot state; the ball and button motion examples were not independently captured.",
    ],
    evidence: [
      {
        label: "A thrown object changes speed around its peak",
        start: 0,
        end: 5.6,
      },
      {
        label: "Constant-speed interface growth can feel mechanical",
        start: 6.16,
        end: 11.68,
      },
      {
        label: "Experience creates expectations for motion curves",
        start: 11.68,
        end: 17.44,
      },
      {
        label: "Easing changes the perceived character of the interaction",
        start: 17.44,
        end: 25.04,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Motion perception",
        title: "Speed over time gives movement its character",
        body: "Two animations can share distance and duration yet feel different because one accelerates and settles while the other stays constant.",
        visual: {
          type: "comparison",
          before: "Constant speed",
          after: "Changing speed",
        },
      },
      {
        kind: "problem",
        eyebrow: "Linear default",
        title: "Uniform interpolation exposes the mechanism",
        body: "A control that changes at one unvarying rate can feel detached from the motion patterns people already know.",
        visual: {
          type: "layers",
          items: ["State change", "Constant velocity", "Mechanical impression"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Easing curve",
        title: "Shape the departure and arrival deliberately",
        body: "Acceleration and deceleration determine whether motion feels immediate, energetic, restrained, or settled.",
        visual: {
          type: "rule",
          statement: "Velocity curve → perceived motion intent",
        },
      },
      {
        kind: "application",
        eyebrow: "Interaction tuning",
        title: "Compare curves in the real transition",
        body: "Test the actual distance, duration, and trigger, then choose the curve that supports how the element should enter or settle.",
        visual: {
          type: "sequence",
          items: [
            "Name motion intent",
            "Set duration",
            "Compare curves",
            "Observe settling",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Easing should explain the movement",
        body: "Choose a curve because it clarifies the interaction, not because it is the default preset.",
        visual: {
          type: "rule",
          statement: "Motion intent selects the curve",
        },
      },
    ],
  },
  {
    id: "DX7K6G1KUQ4",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DX7K6G1KUQ4/",
      creator: "@designparser",
      publishedAt: "2026-05-04",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Let Recognition Guide Logo Emphasis",
    summary:
      "A brand-system study explaining how the balance between wordmark and symbol can evolve: names support early recognition, while established symbols can lead once repeated exposure gives them meaning.",
    principles: [
      "A new or less familiar identity benefits from keeping its name prominent.",
      "A symbol acquires meaning through consistent association and repeated use.",
      "A mature identity still needs multiple logo variants for different contexts.",
    ],
    applications: [
      "Use a wordmark-led or combined lockup when audiences still need the name.",
      "Track recognition before allowing a symbol-only variant to lead.",
      "Define context rules for full, compact, and symbol-only logo formats.",
    ],
    uncertainties: [
      "Recognition is treated qualitatively; no measurement method or threshold for changing logo formats is provided.",
      "Scene extraction captured only the opening statement, not the later lockup variants.",
    ],
    evidence: [
      {
        label: "Logo format is linked to recognition",
        start: 0,
        end: 2.44,
      },
      {
        label: "At low recognition the name carries the identity",
        start: 2.44,
        end: 7.04,
      },
      {
        label: "Repetition gives the symbol meaning",
        start: 7.04,
        end: 9.88,
      },
      {
        label: "At high recognition the symbol can lead",
        start: 9.88,
        end: 14.72,
      },
      {
        label: "Established systems retain contextual variants",
        start: 14.72,
        end: 19.48,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Identity recognition",
        title: "Logo emphasis can change as familiarity grows",
        body: "The wordmark explains who the brand is; the symbol becomes useful only after audiences learn that association.",
        visual: {
          type: "sequence",
          items: [
            "Name leads",
            "Pair repeats",
            "Symbol gains meaning",
            "Variants emerge",
          ],
        },
      },
      {
        kind: "problem",
        eyebrow: "Premature shorthand",
        title: "An unknown symbol cannot identify itself",
        body: "Removing the name too early asks audiences to recognize a mark before repetition has built the link.",
        visual: {
          type: "comparison",
          before: "Symbol without learned meaning",
          after: "Name and symbol together",
        },
      },
      {
        kind: "principle",
        eyebrow: "Recognition stage",
        title: "Let the more informative element lead",
        body: "Use the name while it carries recognition, then increase symbol independence as real familiarity develops.",
        visual: {
          type: "rule",
          statement: "Lower recognition → stronger wordmark presence",
        },
      },
      {
        kind: "application",
        eyebrow: "Variant system",
        title: "Specify formats by context, not prestige",
        body: "Define full, compact, and symbol-only options with clear rules for space, audience familiarity, and communication goal.",
        visual: {
          type: "layers",
          items: ["Full lockup", "Compact lockup", "Symbol-only variant"],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Earn the shorthand before relying on it",
        body: "A symbol can lead when recognition supports it, while the broader system keeps the name available where needed.",
        visual: {
          type: "rule",
          statement: "Familiarity determines emphasis",
        },
      },
    ],
  },
  {
    id: "DXwoxRRqdSt",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DXwoxRRqdSt/",
      creator: "@designparser",
      publishedAt: "2026-04-30",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Choose Aspect Ratio for the Story",
    summary:
      "A framing study showing how wide, classic, vertical, and square formats redistribute attention between subject and environment, making aspect ratio an editorial decision rather than a neutral container.",
    principles: [
      "A wider frame gives more room for environmental context.",
      "A narrower or vertical frame can strengthen subject dominance and directness.",
      "A square frame reduces directional bias and can support balanced compositions.",
    ],
    applications: [
      "Choose the frame according to whether subject, environment, intimacy, or balance should lead.",
      "Compose within the final ratio instead of relying on a late crop.",
      "Test alternate delivery ratios for changes in context, scale, and visual hierarchy.",
    ],
    uncertainties: [
      "Speech recognition fragments the first wide-screen ratio; the study therefore preserves the wide-format principle without asserting that exact value.",
      "The emotional labels assigned to ratios are compositional heuristics and depend on subject placement, lens, crop, and motion.",
      "The referenced film example and later formats were not independently captured in the single opening frame.",
    ],
    evidence: [
      {
        label: "Format is introduced as a perceptual choice",
        start: 0,
        end: 2.96,
      },
      {
        label: "Wide framing distributes attention into the environment",
        start: 2.96,
        end: 11.12,
      },
      {
        label: "A classic frame encourages central subject focus",
        start: 11.12,
        end: 17.84,
      },
      {
        label: "Vertical framing reduces horizontal context",
        start: 17.84,
        end: 24.96,
      },
      {
        label: "Square framing supports even balance",
        start: 24.96,
        end: 31.76,
      },
      {
        label: "Format can communicate structural meaning",
        start: 31.76,
        end: 38.4,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Frame semantics",
        title: "The container changes what the viewer notices",
        body: "Aspect ratio decides how much space surrounds the subject and which direction carries the composition.",
        visual: {
          type: "sequence",
          items: [
            "Wide context",
            "Classic focus",
            "Vertical intimacy",
            "Square balance",
          ],
        },
      },
      {
        kind: "problem",
        eyebrow: "Neutral-frame myth",
        title: "A late crop can rewrite the visual hierarchy",
        body: "Removing horizontal or vertical context changes whether the environment, person, or overall balance dominates.",
        visual: {
          type: "comparison",
          before: "Compose once, crop later",
          after: "Compose for each ratio",
        },
      },
      {
        kind: "principle",
        eyebrow: "Editorial priority",
        title: "Match the axis to what should lead",
        body: "Use breadth when the world matters, vertical compression when the subject should dominate, and symmetry when balance is central.",
        visual: {
          type: "rule",
          statement: "Story priority → frame geometry",
        },
      },
      {
        kind: "application",
        eyebrow: "Multi-format delivery",
        title: "Recompose rather than merely resize",
        body: "Check focal position, negative space, scale, and supporting details separately in every required ratio.",
        visual: {
          type: "sequence",
          items: [
            "Name priority",
            "Select ratio",
            "Compose subject",
            "Verify alternate crops",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Format is part of the message",
        body: "Choose and compose the frame with the same intent used for type, color, and pacing.",
        visual: {
          type: "rule",
          statement: "The frame directs attention",
        },
      },
    ],
  },
  {
    id: "DXrccYxinsd",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DXrccYxinsd/",
      creator: "@designparser",
      publishedAt: "2026-04-28",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Reduce Simultaneous Choices or Chunk Them",
    summary:
      "An information-design study connecting working-memory limits to option sets: when many items must be compared at once, grouping or reducing them can lower cognitive load without hiding navigable information.",
    principles: [
      "Working memory handles only a small number of active chunks at once.",
      "Rehearsal and meaningful grouping can expand what functions as one chunk.",
      "Comparison sets and scan-based navigation place different demands on memory.",
    ],
    applications: [
      "Keep pricing plans, key metrics, and simultaneous filters focused on a few distinct choices.",
      "Group related items under meaningful labels instead of presenting one flat set.",
      "Test whether users must compare all options at once or can scan and select progressively.",
    ],
    uncertainties: [
      "The four-plus-or-minus-one capacity is a research-based baseline, not a universal interface limit.",
      "Capacity varies with familiarity, rehearsal, chunk quality, and task design.",
      "Only the opening count state was captured; later comparison and grouping examples were not independently captured.",
    ],
    evidence: [
      {
        label: "A seven-option set is proposed for reduction",
        start: 0,
        end: 3.44,
      },
      {
        label: "Earlier items can fade during sequential reading",
        start: 3.44,
        end: 7.44,
      },
      {
        label: "Working memory is described as holding roughly four chunks",
        start: 7.44,
        end: 12.96,
      },
      {
        label: "Historical estimates and chunking are distinguished",
        start: 12.96,
        end: 21.12,
      },
      {
        label: "The limit matters when options compete simultaneously",
        start: 21.12,
        end: 27.92,
      },
      {
        label: "Chunking changes load without removing information",
        start: 27.92,
        end: 33.92,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Working memory",
        title: "Seven visible choices can still exceed active comparison",
        body: "A viewer may see the whole set yet lose earlier details while evaluating the later items.",
        visual: {
          type: "comparison",
          before: "Seven competing options",
          after: "Four meaningful chunks",
        },
      },
      {
        kind: "problem",
        eyebrow: "Displacement",
        title: "Flat sets make each new item compete with the last",
        body: "When every option needs simultaneous comparison, later details can displace the criteria attached to earlier ones.",
        visual: {
          type: "layers",
          items: [
            "Many equal items",
            "Limited active memory",
            "Lost comparisons",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Chunking",
        title: "Organize information around meaningful units",
        body: "A coherent group can function as one chunk, reducing load without pretending that all interfaces need a hard item cap.",
        visual: {
          type: "rule",
          statement: "Related items → one usable chunk",
        },
      },
      {
        kind: "application",
        eyebrow: "Task distinction",
        title: "Limit comparison sets, structure scan sets",
        body: "Reduce plans and competing metrics, while grouping navigation or filters that users can inspect progressively.",
        visual: {
          type: "sequence",
          items: [
            "Identify task",
            "Find simultaneous choices",
            "Reduce or group",
            "Test recall",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Design for the comparison the user must hold",
        body: "Use fewer active choices and stronger chunks when the task depends on remembering relationships.",
        visual: {
          type: "rule",
          statement: "Cognitive load follows the task, not the raw count",
        },
      },
    ],
  },
  {
    id: "DXpQN6Xircl",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DXpQN6Xircl/",
      creator: "@designparser",
      publishedAt: "2026-04-27",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Do Not Encode Status With Color Alone",
    summary:
      "An accessibility study distinguishing luminance contrast from color distinguishability: a palette can pass contrast checks yet fail when red–green differences are the only way to read status, series, or errors.",
    principles: [
      "Luminance contrast and hue distinguishability test different properties.",
      "Color-vision differences can collapse distinctions between colors that otherwise meet contrast targets.",
      "Critical meaning needs a redundant cue beyond color.",
    ],
    applications: [
      "Pair status colors with labels, icons, patterns, shapes, or line styles.",
      "Simulate common red–green color-vision conditions during design review.",
      "Test charts, errors, and state systems without color to confirm that meaning survives.",
    ],
    uncertainties: [
      "The global prevalence and sex-linked percentages are presented without a cited population source and are not used as design thresholds.",
      "The genetic explanation is simplified and does not cover the full range of color-vision variation.",
      "Only the opening two-color chart state was captured; later simulations were not independently captured.",
    ],
    evidence: [
      {
        label: "A contrast-passing palette can remain inaccessible",
        start: 0,
        end: 4.8,
      },
      {
        label: "Color-vision prevalence is introduced",
        start: 4.8,
        end: 11.16,
      },
      {
        label: "Red and green can become difficult to distinguish",
        start: 11.16,
        end: 17.36,
      },
      {
        label: "Luminance contrast does not measure hue distinguishability",
        start: 17.36,
        end: 22.68,
      },
      {
        label: "Red–green simulations are recommended",
        start: 22.68,
        end: 26.6,
      },
      {
        label: "Meaning must not depend on color alone",
        start: 26.6,
        end: 33.4,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Accessible color",
        title: "Passing contrast does not prove two states differ",
        body: "Two colors may each contrast with the background while remaining hard to tell apart from one another.",
        visual: {
          type: "comparison",
          before: "Contrast passes",
          after: "State distinction fails",
        },
      },
      {
        kind: "problem",
        eyebrow: "Single-channel meaning",
        title: "Hue-only systems lose information when colors converge",
        body: "Charts, errors, and statuses break when the category exists only in the red–green difference.",
        visual: {
          type: "layers",
          items: [
            "Color-coded meaning",
            "Reduced hue distinction",
            "Missing information",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Redundant encoding",
        title: "Give every important state another visible cue",
        body: "Text, icon shape, pattern, position, or line style should preserve the distinction even without hue.",
        visual: {
          type: "rule",
          statement: "Color + independent cue → resilient meaning",
        },
      },
      {
        kind: "application",
        eyebrow: "Accessibility audit",
        title: "Test the system in color and without it",
        body: "Simulate common color-vision conditions, remove color mentally or literally, and verify that every category remains identifiable.",
        visual: {
          type: "sequence",
          items: [
            "Check luminance",
            "Simulate vision",
            "Remove color cue",
            "Verify meaning",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Contrast is necessary, not sufficient",
        body: "Measure luminance and protect distinguishability with redundant signals.",
        visual: {
          type: "rule",
          statement: "Accessible status survives hue loss",
        },
      },
    ],
  },
  {
    id: "DXemNG5Cm-X",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DXemNG5Cm-X/",
      creator: "@designparser",
      publishedAt: "2026-04-23",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Choose Process or Spot Color by Tolerance",
    summary:
      "A print-production study contrasting CMYK process builds with premixed spot ink: use process color for flexible reproduction and specify a spot system when a brand color requires tighter matching.",
    principles: [
      "CMYK produces color from overprinted halftone components.",
      "A spot color uses a premixed ink rather than reconstructing the target from process channels.",
      "The right method depends on acceptable variation, production method, and budget.",
    ],
    applications: [
      "Define which brand colors require tight physical matching.",
      "Specify a spot ink for critical limited-color work when the printer supports it.",
      "Use calibrated CMYK builds for flexible jobs and approve physical proofs on the actual stock.",
    ],
    uncertainties: [
      "Spot ink is described as exact, but appearance still varies with substrate, coating, ink batch, press conditions, and viewing light.",
      "The recommendation does not address digital presses, extended-gamut printing, cost, or mixed spot-and-process jobs.",
      "Scene extraction captured only the opening red swatch; printed comparisons were not independently captured.",
    ],
    evidence: [
      {
        label: "Process printing is challenged for strict logo matching",
        start: 0,
        end: 3.04,
      },
      {
        label: "CMYK relies on optically mixed halftone dots",
        start: 3.04,
        end: 8.08,
      },
      {
        label: "Spot color uses a premixed solid ink",
        start: 8.08,
        end: 12,
      },
      {
        label: "Process builds approximate the target",
        start: 12,
        end: 15.2,
      },
      {
        label: "Tolerance determines spot versus process choice",
        start: 15.2,
        end: 20.24,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Print color",
        title: "A brand swatch can be built or premixed",
        body: "Process printing combines channel dots on paper, while spot printing lays down a specified ink mixture.",
        visual: {
          type: "comparison",
          before: "CMYK process build",
          after: "Premixed spot ink",
        },
      },
      {
        kind: "problem",
        eyebrow: "Matching tolerance",
        title: "A close process build may not satisfy a critical color",
        body: "Halftone screens, substrate, and press conditions can shift the physical result away from a reference swatch.",
        visual: {
          type: "layers",
          items: ["Channel percentages", "Press and stock", "Observed color"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Production choice",
        title: "Match the method to the allowed variation",
        body: "Reserve spot ink for colors whose consistency justifies the production constraints; use process color where flexibility matters more.",
        visual: {
          type: "rule",
          statement: "Tighter tolerance → stronger case for spot ink",
        },
      },
      {
        kind: "application",
        eyebrow: "Proofing",
        title: "Approve the color in the real print conditions",
        body: "Document both spot and process specifications, test on intended stock, and judge a physical proof under controlled light.",
        visual: {
          type: "sequence",
          items: [
            "Set tolerance",
            "Choose method",
            "Print on stock",
            "Approve proof",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Color specification is a production decision",
        body: "Choose spot or process from matching needs, materials, scale, and cost—not from format loyalty.",
        visual: {
          type: "rule",
          statement: "Required consistency determines the ink system",
        },
      },
    ],
  },
  {
    id: "DXZahpwiiqv",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DXZahpwiiqv/",
      creator: "@designparser",
      publishedAt: "2026-04-21",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Center Icons by Visual Mass",
    summary:
      "An icon-system study explaining why geometric centering can still look off: asymmetrical shapes and different silhouettes distribute visual mass unevenly, requiring optical alignment within a shared box.",
    principles: [
      "Bounding-box center and perceived center are not always the same.",
      "Shape mass can make a mathematically centered icon appear high, low, large, or small.",
      "Optical correction should be judged across the icon set at final size.",
    ],
    applications: [
      "Start with geometric centering, then compare silhouettes in identical boxes.",
      "Shift asymmetric icons until their visual mass aligns with neighboring symbols.",
      "Adjust apparent scale as well as position when circles and squares feel unequal.",
    ],
    uncertainties: [
      "No universal offset is provided because the correction depends on silhouette, stroke, size, and surrounding icons.",
      "Only the opening triangle state was captured; the circle and square comparison was not independently captured.",
    ],
    evidence: [
      {
        label: "Geometric and visual centers are distinguished",
        start: 0,
        end: 4.4,
      },
      {
        label: "A centered triangle carries mass near its base",
        start: 4.4,
        end: 14.4,
      },
      {
        label: "Equal boxes can produce unequal apparent size",
        start: 14.4,
        end: 19.12,
      },
      {
        label: "Icons should align by optical center",
        start: 19.12,
        end: 23.92,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Icon alignment",
        title: "The box can be centered while the shape feels low",
        body: "A triangle concentrates more area near its base, so coordinate equality does not guarantee visual balance.",
        visual: {
          type: "comparison",
          before: "Geometric center",
          after: "Optical center",
        },
      },
      {
        kind: "problem",
        eyebrow: "Uneven silhouettes",
        title: "Shared bounds hide different distributions of mass",
        body: "Triangles, circles, and squares occupy and weight the same box differently.",
        visual: {
          type: "layers",
          items: [
            "Equal bounding box",
            "Different silhouette",
            "Different perceived center",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Optical correction",
        title: "Align what the eye experiences",
        body: "Use geometric centering as the baseline, then adjust position and apparent scale until neighboring icons feel stable.",
        visual: {
          type: "rule",
          statement: "Coordinate center + optical correction",
        },
      },
      {
        kind: "application",
        eyebrow: "System review",
        title: "Judge icons as a family, not one at a time",
        body: "Place representative shapes in identical containers at production size and compare their apparent center and scale.",
        visual: {
          type: "sequence",
          items: [
            "Normalize boxes",
            "Compare silhouettes",
            "Shift and scale",
            "Review as set",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Consistency can require unequal coordinates",
        body: "Small optical offsets are valid when they produce a more even icon system.",
        visual: {
          type: "rule",
          statement: "Perceived alignment is the final criterion",
        },
      },
    ],
  },
  {
    id: "DXXI9MZipyC",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DXXI9MZipyC/",
      creator: "@designparser",
      publishedAt: "2026-04-20",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Distinctiveness Works by Contrast",
    summary:
      "A visual-hierarchy study based on the von Restorff effect: one item becomes memorable by differing from its peers, but multiple competing exceptions weaken the advantage.",
    principles: [
      "An isolated visual difference attracts attention within a uniform set.",
      "Distinctiveness is relational; the surrounding sameness creates the effect.",
      "Adding more exceptions reduces the clarity of the original emphasis.",
    ],
    applications: [
      "Reserve the strongest contrast treatment for the single highest-priority action or fact.",
      "Keep neighboring items visually consistent so the exception remains legible.",
      "Audit pages for competing badges, colors, scales, and motion that dilute emphasis.",
    ],
    uncertainties: [
      "The recall improvement is described without an effect size, task, or study condition.",
      "Distinctiveness can attract attention without guaranteeing comprehension, relevance, or ethical prioritization.",
      "Only the opening uniform-item state was captured; the isolated-item progression was not independently captured.",
    ],
    evidence: [
      {
        label: "One element captures attention before deliberate choice",
        start: 0,
        end: 4.2,
      },
      {
        label: "The von Restorff effect is introduced",
        start: 4.2,
        end: 5.72,
      },
      {
        label: "One isolated item is linked to stronger recall",
        start: 5.72,
        end: 8.92,
      },
      {
        label: "A second exception weakens the advantage",
        start: 8.92,
        end: 14.24,
      },
      {
        label: "Difference from the set creates distinctiveness",
        start: 14.24,
        end: 17.76,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Von Restorff effect",
        title: "One exception gains power from a consistent field",
        body: "A single item that differs in color, size, or shape becomes easier to notice because its peers establish a stable pattern.",
        visual: {
          type: "comparison",
          before: "Uniform set",
          after: "One distinct item",
        },
      },
      {
        kind: "problem",
        eyebrow: "Competing emphasis",
        title: "Two exceptions stop feeling exceptional",
        body: "When several elements demand the same special treatment, the contrast hierarchy collapses into another pattern.",
        visual: {
          type: "layers",
          items: ["First exception", "Second exception", "Diluted distinction"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Relational contrast",
        title: "The surrounding sameness does the work",
        body: "A highlight is effective only relative to the visual rules that the rest of the set follows.",
        visual: {
          type: "rule",
          statement: "Consistent field + one difference → emphasis",
        },
      },
      {
        kind: "application",
        eyebrow: "Priority audit",
        title: "Spend the strongest contrast once",
        body: "Choose the most important action or fact, simplify its neighbors, and remove decorative competitors.",
        visual: {
          type: "sequence",
          items: [
            "Rank priorities",
            "Normalize peers",
            "Isolate one item",
            "Test recall",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Emphasis is scarce by design",
        body: "Protect one meaningful exception instead of highlighting everything.",
        visual: {
          type: "rule",
          statement: "One clear difference beats many loud signals",
        },
      },
    ],
  },
  {
    id: "DXMqS0rCtLL",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DXMqS0rCtLL/",
      creator: "@designparser",
      publishedAt: "2026-04-16",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Use Column Counts That Divide the Layout",
    summary:
      "A grid-system study explaining why twelve columns are flexible on wide screens: twelve divides evenly into halves, thirds, and quarters, while simpler breakpoint grids can reduce complexity on smaller screens.",
    principles: [
      "A useful column count supports the span patterns the layout actually needs.",
      "Twelve columns divide evenly into two, three, four, and six-part arrangements.",
      "Responsive grids can use fewer columns where available width and composition are simpler.",
    ],
    applications: [
      "List required content spans before selecting a grid count.",
      "Use twelve columns when halves, thirds, and quarters must coexist.",
      "Reduce the grid at narrower breakpoints while preserving alignment relationships.",
    ],
    uncertainties: [
      "The statement that twelve “misses nothing” is rhetorical; twelve does not support every possible division and is not universally optimal.",
      "The fixed 12/8/4 breakpoint sequence is a common pattern, not a requirement for every interface.",
      "The historical attribution and later responsive grids were not independently captured in the opening frame.",
    ],
    evidence: [
      {
        label: "A twelve-column grid is introduced as a proportion system",
        start: 0,
        end: 5,
      },
      {
        label: "Twelve is divisible by two, three, and four",
        start: 5,
        end: 9,
      },
      {
        label: "The system is linked to typographic and framework practice",
        start: 9,
        end: 12,
      },
      {
        label: "Alternative counts lose some common divisions",
        start: 12,
        end: 17,
      },
      {
        label: "Fewer columns are proposed at narrower breakpoints",
        start: 17,
        end: 20,
      },
      {
        label: "More divisions provide finer placement control",
        start: 20,
        end: 23,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Grid arithmetic",
        title: "Twelve supports several common span patterns",
        body: "A twelve-column field can form halves, thirds, quarters, and sixths without fractional columns.",
        visual: {
          type: "sequence",
          items: ["2 spans", "3 spans", "4 spans", "6 spans"],
        },
      },
      {
        kind: "problem",
        eyebrow: "Wrong divisibility",
        title: "A column count can fight the content structure",
        body: "If the grid cannot divide into the arrangements a page needs, components require awkward offsets or inconsistent spans.",
        visual: {
          type: "comparison",
          before: "Count chosen by habit",
          after: "Count chosen by spans",
        },
      },
      {
        kind: "principle",
        eyebrow: "Layout requirements",
        title: "Select the smallest grid that supports the system",
        body: "More columns add placement options, but they also add decisions; flexibility should answer real compositions.",
        visual: {
          type: "rule",
          statement: "Required divisions → column count",
        },
      },
      {
        kind: "application",
        eyebrow: "Responsive simplification",
        title: "Reduce decisions as the viewport narrows",
        body: "Use a denser grid on wide screens and fewer columns where content stacks, while keeping shared edges coherent.",
        visual: {
          type: "sequence",
          items: [
            "Map desktop spans",
            "Choose count",
            "Simplify breakpoint grid",
            "Verify alignment",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Divisibility is a tool, not a tradition",
        body: "Use twelve when its factors help, and choose another count when the layout asks for something else.",
        visual: {
          type: "rule",
          statement: "Grid math follows content structure",
        },
      },
    ],
  },
  {
    id: "DXHaZyACi2H",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DXHaZyACi2H/",
      creator: "@designparser",
      publishedAt: "2026-04-14",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Keep At-a-Glance Groups Small",
    summary:
      "A perception study on subitizing: people can recognize very small quantities without deliberate counting, while larger sets trigger a slower scan, affecting icon groups and compact status displays.",
    principles: [
      "Small quantities can be recognized as a pattern rather than counted one by one.",
      "As groups grow, enumeration shifts toward serial scanning.",
      "At-a-glance interfaces should use grouping and hierarchy instead of relying on dense raw counts.",
    ],
    applications: [
      "Keep critical icon groups and status clusters small when instant recognition matters.",
      "Chunk larger sets into labeled groups or summarize them with a number.",
      "Test glanceable displays under real viewing time, size, spacing, and familiarity.",
    ],
    uncertainties: [
      "The exact quantity boundary, 40–100 millisecond range, and eight-times slowdown are presented without experimental conditions.",
      "Performance varies with arrangement, spacing, familiarity, attention, and whether items form recognizable patterns.",
      "Only the opening single-item state was captured; the four- and seven-item comparisons were not independently captured.",
    ],
    evidence: [
      {
        label: "Very small quantities are described as immediately recognized",
        start: 0,
        end: 5.12,
      },
      {
        label: "A seven-item set requires counting or scanning",
        start: 5.12,
        end: 12.08,
      },
      {
        label: "Timing differences are introduced",
        start: 12.08,
        end: 18.48,
      },
      {
        label: "The effect is framed as pre-attentive processing",
        start: 18.48,
        end: 24.08,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Subitizing",
        title: "A tiny set can register before counting begins",
        body: "Small, well-arranged quantities are often perceived as a whole pattern rather than enumerated item by item.",
        visual: {
          type: "comparison",
          before: "Four-item pattern",
          after: "Seven-item scan",
        },
      },
      {
        kind: "problem",
        eyebrow: "Dense glance target",
        title: "More items change recognition into a search path",
        body: "A compact group can stop being instantly legible once the eye must visit each element in sequence.",
        visual: {
          type: "layers",
          items: ["Larger item count", "Serial scan", "Slower recognition"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Pattern capacity",
        title: "Protect the small set that must read instantly",
        body: "Use a few distinct signals for urgent recognition and move supporting detail into grouped or progressive views.",
        visual: {
          type: "rule",
          statement: "Instant recognition favors small coherent groups",
        },
      },
      {
        kind: "application",
        eyebrow: "Information display",
        title: "Summarize before adding another icon",
        body: "Group related items, show an aggregate count, or reveal details on demand when the visible set becomes dense.",
        visual: {
          type: "sequence",
          items: [
            "Identify glance task",
            "Limit visible items",
            "Group remainder",
            "Test recognition",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Design the pattern, not just the count",
        body: "Keep urgent groups small and structure larger quantities for deliberate scanning.",
        visual: {
          type: "rule",
          statement: "Small sets glance; larger sets need organization",
        },
      },
    ],
  },
  {
    id: "DXE11vvCj1m",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DXE11vvCj1m/",
      creator: "@designparser",
      publishedAt: "2026-04-13",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Use Pie Charts Only for Simple Shares",
    summary:
      "A data-visualization study explaining why angle comparison becomes difficult as pie slices multiply, recommending a shared-baseline bar chart when precise comparison or many categories matter.",
    principles: [
      "People compare aligned lengths more accurately than separated angles.",
      "Each additional pie slice increases comparison and labeling difficulty.",
      "Three-dimensional treatment distorts the geometry used to judge share.",
    ],
    applications: [
      "Reserve pie charts for a few clearly different parts of one whole.",
      "Use bars when categories are numerous, close in value, or require ranking.",
      "Keep a shared zero baseline when accurate magnitude comparison is the goal.",
    ],
    uncertainties: [
      "The five-slice maximum is a practical heuristic, not a universal empirical cutoff.",
      "The claim of consistent research is not accompanied by specific studies or task conditions.",
      "Scene extraction captured only the opening many-slice pie, not the later bar-chart alternative.",
    ],
    evidence: [
      {
        label: "Pie charts are introduced as error-prone",
        start: 0,
        end: 2,
      },
      {
        label: "Angle comparison is identified as difficult",
        start: 2,
        end: 4,
      },
      {
        label: "Additional segments increase the problem",
        start: 4,
        end: 8,
      },
      {
        label: "Few slices and no 3D are proposed",
        start: 8,
        end: 11,
      },
      {
        label: "Bars are recommended for larger category sets",
        start: 11,
        end: 16,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Chart choice",
        title: "A pie asks the eye to compare angles",
        body: "Part-to-whole structure is visible, but precise differences become harder to judge across separate wedges.",
        visual: {
          type: "comparison",
          before: "Many pie slices",
          after: "Aligned bar lengths",
        },
      },
      {
        kind: "problem",
        eyebrow: "Segment overload",
        title: "Every extra slice adds another angle and label",
        body: "Small or similar wedges force repeated visual estimation while reducing space for clear annotation.",
        visual: {
          type: "layers",
          items: ["More categories", "Smaller angles", "Harder comparison"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Perceptual scale",
        title: "Use a common baseline for close values",
        body: "Bars align lengths against one axis, making ranking and magnitude differences easier to inspect.",
        visual: {
          type: "rule",
          statement: "Precise comparison → aligned lengths",
        },
      },
      {
        kind: "application",
        eyebrow: "Decision rule",
        title: "Keep the pie for simple part-to-whole stories",
        body: "Use a few distinct shares without perspective effects; switch to bars when categories multiply or precision matters.",
        visual: {
          type: "sequence",
          items: [
            "Name question",
            "Count categories",
            "Assess value gaps",
            "Choose pie or bar",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Chart form follows the comparison task",
        body: "Choose pie for a simple whole and bars for accurate category comparison.",
        visual: {
          type: "rule",
          statement: "Simple shares use angles; comparisons use lengths",
        },
      },
    ],
  },
  {
    id: "DW9GTY-iv2B",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DW9GTY-iv2B/",
      creator: "@designparser",
      publishedAt: "2026-04-10",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Typography Can Signal Human Presence",
    summary:
      "A communication study contrasting mechanically uniform type with handwriting, whose baseline, pressure, and shape variation can make a short message feel more personal.",
    principles: [
      "Typographic regularity and handwritten variation send different social signals.",
      "Small irregularities can suggest effort, individuality, and a human source.",
      "Expressive form should support the message without sacrificing readability.",
    ],
    applications: [
      "Consider handwriting for personal notes, acknowledgments, and moments of direct human contact.",
      "Use a consistent typeface when clarity, repeatability, or institutional tone should lead.",
      "Test expressive lettering at delivery size and provide clear text where legibility is critical.",
    ],
    uncertainties: [
      "The claim of “better results” does not define an outcome, audience, or comparison method.",
      "The idea that personality overrides content is rhetorical; message meaning and readability remain consequential.",
      "Only the opening typed-versus-handwritten thank-you comparison was captured.",
    ],
    evidence: [
      {
        label: "Less polished typography is linked to a different outcome",
        start: 0,
        end: 2.5,
      },
      {
        label: "Printed text is described as uniform",
        start: 2.5,
        end: 6.6,
      },
      {
        label: "Handwriting carries baseline and pressure variation",
        start: 6.6,
        end: 10.1,
      },
      {
        label: "Imperfection is framed as a personality signal",
        start: 10.1,
        end: 14.3,
      },
      {
        label: "Identical words can communicate a different tone",
        start: 14.3,
        end: 16.5,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Social typography",
        title: "The same words can imply a different sender",
        body: "Uniform type reads as reproducible, while handwriting carries visible traces of an individual gesture.",
        visual: {
          type: "comparison",
          before: "Mechanically uniform note",
          after: "Handwritten note",
        },
      },
      {
        kind: "problem",
        eyebrow: "Signal mismatch",
        title: "Polish can remove the human cue a moment needs",
        body: "A perfectly consistent message may feel distant when the communication is meant to express personal attention.",
        visual: {
          type: "layers",
          items: [
            "Uniform form",
            "Low personal variation",
            "Institutional tone",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Controlled irregularity",
        title: "Variation can communicate effort and presence",
        body: "Changes in baseline, pressure, and letter shape add a human signal before the words are fully read.",
        visual: {
          type: "rule",
          statement: "Visible gesture → perceived personal presence",
        },
      },
      {
        kind: "application",
        eyebrow: "Tone choice",
        title: "Match the writing mode to the relationship",
        body: "Use handwriting where human acknowledgment matters, and use type where consistency and fast reading carry more value.",
        visual: {
          type: "sequence",
          items: [
            "Name desired tone",
            "Choose writing mode",
            "Check legibility",
            "Test response",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Expression is part of the message",
        body: "Choose uniformity or variation deliberately, then keep the content clear enough to do its job.",
        visual: {
          type: "rule",
          statement: "Form signals who is speaking",
        },
      },
    ],
  },
  {
    id: "DW38gZ4Cko7",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DW38gZ4Cko7/",
      creator: "@designparser",
      publishedAt: "2026-04-08",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Treat the Golden Ratio as a Starting Point",
    summary:
      "A proportion study separating the mathematical definition of the golden ratio from claims that it guarantees beauty, arguing that designers should test it as one guideline rather than retrofit it as proof.",
    principles: [
      "The golden ratio describes a specific mathematical relationship, not an automatic aesthetic outcome.",
      "A proportional system can create consistency without being uniquely optimal.",
      "Post-hoc overlays do not demonstrate that a design was generated from the ratio.",
    ],
    applications: [
      "Use the golden ratio as one candidate when exploring scale or composition.",
      "Compare it with simpler ratios and judge the actual content in context.",
      "Document the proportions used during design instead of adding a persuasive overlay afterward.",
    ],
    uncertainties: [
      "The claims about public preference and historical adherence are not accompanied by named studies or artifacts.",
      "The opening frame confirms the familiar rectangle-and-spiral construction but not how it was used in any historical design.",
    ],
    evidence: [
      {
        label: "The golden ratio is introduced as overstated",
        start: 0,
        end: 2.44,
      },
      {
        label:
          "Rectangles and a spiral illustrate the mathematical construction",
        start: 2.44,
        end: 9.2,
      },
      {
        label: "A constant is distinguished from a law of beauty",
        start: 9.2,
        end: 15.6,
      },
      {
        label: "Consistent public preference is questioned",
        start: 15.6,
        end: 19.8,
      },
      {
        label: "Historical and post-hoc usage claims are challenged",
        start: 19.8,
        end: 24.6,
      },
      {
        label: "The ratio is retained as a guideline",
        start: 24.6,
        end: 25.88,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Proportion system",
        title: "A mathematical ratio is not an aesthetic guarantee",
        body: "Phi defines a repeatable relationship between dimensions, but the formula cannot judge content, context, or visual purpose.",
        visual: {
          type: "comparison",
          before: "Mathematical consistency",
          after: "Perceived quality",
        },
      },
      {
        kind: "problem",
        eyebrow: "Proof by overlay",
        title: "A spiral added later can explain anything",
        body: "Retrofitted diagrams create an appearance of intent without showing that the composition actually began from that rule.",
        visual: {
          type: "layers",
          items: [
            "Finished composition",
            "Added ratio overlay",
            "Implied causality",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Design evidence",
        title: "Use proportion as a constraint to test",
        body: "A ratio earns its place when it organizes real elements better than the available alternatives.",
        visual: {
          type: "rule",
          statement: "Guideline + comparison → informed choice",
        },
      },
      {
        kind: "application",
        eyebrow: "Exploration",
        title: "Compare phi with simpler structures",
        body: "Build variations using halves, thirds, modular steps, and the golden ratio, then evaluate hierarchy and fit.",
        visual: {
          type: "sequence",
          items: [
            "Choose candidates",
            "Compose variants",
            "Test content",
            "Keep best structure",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Let the ratio guide, never certify",
        body: "Use the golden ratio when it helps the composition—not as proof that the result must be beautiful.",
        visual: {
          type: "rule",
          statement: "Proportion supports judgment; it does not replace it",
        },
      },
    ],
  },
  {
    id: "DWyyT8QDadE",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DWyyT8QDadE/",
      creator: "@designparser",
      publishedAt: "2026-04-06",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Design the Peak and the Ending Deliberately",
    summary:
      "An experience-design study using the peak-end rule to show why a memorable high point and a strong final moment can shape retrospective judgment of a longer journey.",
    principles: [
      "People often summarize an experience through its most intense moment and its ending.",
      "A polished ending can disproportionately influence how the overall journey is remembered.",
      "Peak and ending deserve deliberate design, but they cannot excuse avoidable friction elsewhere.",
    ],
    applications: [
      "Map the emotional high point and final step of onboarding, checkout, or service recovery.",
      "Remove critical usability barriers across the whole journey before polishing memorable moments.",
      "End with clear closure, confirmation, and an appropriate next action.",
    ],
    uncertainties: [
      "The five-star example is illustrative and does not establish that a strong ending will overcome severe friction in every context.",
      "The instruction to stop designing everything is rhetorical; baseline usability, accessibility, and trust still apply throughout.",
      "Only the opening experience-over-time axis was captured; later peak and ending states were not independently captured.",
    ],
    evidence: [
      {
        label: "The experience is framed as uneven",
        start: 0,
        end: 4.4,
      },
      {
        label: "A clean final screen is linked to a positive review",
        start: 4.4,
        end: 7.68,
      },
      {
        label: "Memory is described as favoring two moments",
        start: 7.68,
        end: 10.8,
      },
      {
        label: "The peak-end rule is named",
        start: 10.8,
        end: 11.92,
      },
      {
        label: "Peak and ending are prioritized for design",
        start: 11.92,
        end: 14,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Peak-end rule",
        title: "Memory compresses a journey into decisive moments",
        body: "Retrospective judgment can lean heavily on the strongest point and the final state rather than averaging every minute.",
        visual: {
          type: "layers",
          items: ["Full journey", "Peak moment", "Ending moment"],
        },
      },
      {
        kind: "problem",
        eyebrow: "Uniform effort",
        title: "Polishing every step equally can miss what lasts",
        body: "Teams may distribute effort across screens without identifying the moments that dominate memory and trust.",
        visual: {
          type: "comparison",
          before: "Equal polish everywhere",
          after: "Usable journey with designed peak and end",
        },
      },
      {
        kind: "principle",
        eyebrow: "Memory structure",
        title: "Make the high point meaningful and the ending conclusive",
        body: "The peak should deliver real value, while the final step should confirm success and remove uncertainty.",
        visual: {
          type: "rule",
          statement: "Meaningful peak + clear ending → stronger memory",
        },
      },
      {
        kind: "application",
        eyebrow: "Journey map",
        title: "Find the moments that shape the retelling",
        body: "Fix blocking friction first, then identify the emotional high and design the final confirmation as a deliberate pair.",
        visual: {
          type: "sequence",
          items: [
            "Map journey",
            "Remove blockers",
            "Strengthen peak",
            "Close clearly",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title:
          "Design what users will remember without neglecting what they endure",
        body: "Use the peak and ending as priorities inside a journey that remains sound from start to finish.",
        visual: {
          type: "rule",
          statement: "Memorable moments sit on a usable foundation",
        },
      },
    ],
  },
  {
    id: "DWwU3Y7iqNY",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DWwU3Y7iqNY/",
      creator: "@designparser",
      publishedAt: "2026-04-05",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Manage Color Between Screen and Print",
    summary:
      "A color-production study explaining why the same encoded color can shift between emitted-light displays and ink-on-paper output, and how ICC profiles support a managed translation.",
    principles: [
      "Displays create color with emitted light, while print depends on reflected light from ink and paper.",
      "Identical numeric values do not guarantee identical appearance across devices and media.",
      "Color profiles describe device behavior so conversions can be made intentionally.",
    ],
    applications: [
      "Assign the correct source profile before exporting artwork.",
      "Use the printer, paper, and output profile supplied for the production condition.",
      "Soft-proof on a calibrated display and approve a physical proof for critical colors.",
    ],
    uncertainties: [
      "The promise that profile assignment makes screen and print identical is too strong; profiles improve predictability but cannot remove gamut, substrate, lighting, or device differences.",
      "The opening image shows a same-value blue comparison but not the profile-assignment workflow.",
    ],
    evidence: [
      {
        label: "One encoded color appears different in print",
        start: 0,
        end: 2.16,
      },
      {
        label: "Display emission and print absorption are contrasted",
        start: 2.16,
        end: 4.76,
      },
      {
        label: "A blue example is described as losing intensity",
        start: 4.76,
        end: 6.2,
      },
      {
        label: "ICC profiles are introduced as translation tools",
        start: 6.2,
        end: 9.88,
      },
      {
        label: "Profile assignment is linked to output prediction",
        start: 9.88,
        end: 11.28,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Color media",
        title: "Screen light and printed ink build color differently",
        body: "A display emits colored light; a printed surface filters reflected light through ink and paper.",
        visual: {
          type: "comparison",
          before: "Emitted RGB light",
          after: "Reflected printed color",
        },
      },
      {
        kind: "problem",
        eyebrow: "Same-value fallacy",
        title: "Matching numbers can produce mismatched appearances",
        body: "Device gamut, paper, ink, and viewing light alter what the eye receives even when a swatch begins from one specification.",
        visual: {
          type: "layers",
          items: ["Source values", "Device and medium", "Observed result"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Color management",
        title: "Profiles make the conversion explicit",
        body: "An ICC-managed workflow describes the source and destination so software can translate colors within known limits.",
        visual: {
          type: "rule",
          statement: "Source profile → conversion → output profile",
        },
      },
      {
        kind: "application",
        eyebrow: "Proofing loop",
        title: "Predict digitally and verify physically",
        body: "Assign profiles, soft-proof on a calibrated display, then approve a production proof on the intended stock.",
        visual: {
          type: "sequence",
          items: [
            "Assign source",
            "Choose output profile",
            "Soft-proof",
            "Approve print",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Color matching is managed, not automatic",
        body: "Use profiles to reduce surprises and physical proofs to decide whether the result is acceptable.",
        visual: {
          type: "rule",
          statement: "Profiles predict; proofs confirm",
        },
      },
    ],
  },
  {
    id: "DWrLcyhDVdB",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DWrLcyhDVdB/",
      creator: "@designparser",
      publishedAt: "2026-04-03",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Subtraction Can Create Shelf Distinction",
    summary:
      "A packaging study using a restrained skincare label to show how removing category clichés can create contrast, while a clear reading axis, limited palette, and generous space preserve functional information.",
    principles: [
      "Distinctiveness can come from omitting the signals a category repeats.",
      "Reduction works when the remaining information is organized and legible.",
      "Negative space and restrained color can turn functional hierarchy into a recognizable identity.",
    ],
    applications: [
      "Inventory the visual conventions that make competitors look interchangeable.",
      "Remove nonessential decoration while preserving product name, use, quantity, and required information.",
      "Build one dominant reading axis and test the pared-back package on a realistic shelf.",
    ],
    uncertainties: [
      "The stated contrast ratio and whitespace percentage are presented as informal measurements, not audited specifications.",
      "The company-value claim does not establish that label subtraction caused commercial success.",
      "The category comparison and shelf focal-point effect were not independently captured beyond the opening product example.",
    ],
    evidence: [
      {
        label: "Subtraction is introduced as the design strategy",
        start: 0,
        end: 5.36,
      },
      {
        label: "Removing category codes creates difference from the shelf",
        start: 5.36,
        end: 10.96,
      },
      {
        label: "A single reading axis and limited palette organize information",
        start: 11.6,
        end: 16.4,
      },
      {
        label: "Contrast, type, and whitespace support the reduced label",
        start: 16.4,
        end: 21.68,
      },
      {
        label: "A commercial outcome is claimed",
        start: 21.68,
        end: 24.56,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Packaging contrast",
        title: "Absence can become the strongest category signal",
        body: "A restrained label stands apart when neighboring packages rely on decoration, aspirational naming, and repeated visual codes.",
        visual: {
          type: "comparison",
          before: "Category signal overload",
          after: "Functional restraint",
        },
      },
      {
        kind: "problem",
        eyebrow: "Subtractive risk",
        title: "Removing everything can also remove usefulness",
        body: "Minimalism fails when essential product information, hierarchy, or legibility disappears with the decoration.",
        visual: {
          type: "layers",
          items: [
            "Remove conventions",
            "Preserve information",
            "Rebuild hierarchy",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Functional reduction",
        title: "Let structure carry the identity",
        body: "One reading axis, a limited palette, clear contrast, and generous space can make ordinary information distinctive.",
        visual: {
          type: "rule",
          statement: "Less decoration + stronger information order",
        },
      },
      {
        kind: "application",
        eyebrow: "Shelf test",
        title: "Subtract against the real competitive field",
        body: "Identify category clichés, remove only what is nonessential, and compare recognition and clarity at shelf distance.",
        visual: {
          type: "sequence",
          items: [
            "Audit category",
            "Remove clichés",
            "Organize facts",
            "Test on shelf",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Minimalism earns attention when information stays useful",
        body: "Use subtraction to reveal a clearer product signal, not merely to make the package emptier.",
        visual: {
          type: "rule",
          statement: "Restraint works through organized essentials",
        },
      },
    ],
  },
  {
    id: "DWmCBkrip_W",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DWmCBkrip_W/",
      creator: "@designparser",
      publishedAt: "2026-04-01",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Emphasis Needs Quiet Around It",
    summary:
      "A typography study explaining bold emphasis as a relative signal: one contrasting phrase can stand out, but repeated bolding compresses the difference until the page establishes a new normal.",
    principles: [
      "Bold weight creates emphasis through contrast with surrounding text.",
      "The more elements share the treatment, the less distinctive each one becomes.",
      "Hierarchy depends on the ratio between emphasized and ordinary content.",
    ],
    applications: [
      "Reserve bold text for the few phrases that change comprehension or action.",
      "Keep surrounding prose typographically quiet enough to preserve the contrast.",
      "Audit pages with many bold fragments and replace some with structure, labels, or spacing.",
    ],
    uncertainties: [
      "The stated recall increase and eventual zero advantage are presented without study details and are not treated as universal effect sizes.",
      "Only the opening multi-highlight state was captured; the one-, four-, and ten-emphasis progression was not independently captured.",
    ],
    evidence: [
      {
        label: "Bold is challenged as automatic emphasis",
        start: 0,
        end: 1.88,
      },
      {
        label: "One bold item is linked to a recall advantage",
        start: 1.88,
        end: 5.88,
      },
      {
        label: "Additional bold items compress contrast",
        start: 5.88,
        end: 8.76,
      },
      {
        label: "Heavy repetition becomes the new baseline",
        start: 8.76,
        end: 13.52,
      },
      {
        label: "Emphasis is framed as a relational ratio",
        start: 13.52,
        end: 17.52,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Typographic emphasis",
        title: "Bold works because most text is not bold",
        body: "Weight creates a local difference that directs attention only while the surrounding field remains quieter.",
        visual: {
          type: "comparison",
          before: "One bold phrase",
          after: "Many bold phrases",
        },
      },
      {
        kind: "problem",
        eyebrow: "Contrast compression",
        title: "Repeated emphasis resets the baseline",
        body: "When many fragments carry the same strong weight, readers stop treating any one of them as exceptional.",
        visual: {
          type: "layers",
          items: [
            "More bold items",
            "Less relative difference",
            "Flattened hierarchy",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Signal ratio",
        title: "Emphasis is a relationship, not a font setting",
        body: "The strength of a bold phrase depends on how rarely the treatment appears and what the ordinary text establishes.",
        visual: {
          type: "rule",
          statement: "Sparse signal + quiet field → emphasis",
        },
      },
      {
        kind: "application",
        eyebrow: "Content audit",
        title: "Bold only what changes the reading path",
        body: "Rank the intended takeaways, keep the essential few, and use spacing or headings for the rest.",
        visual: {
          type: "sequence",
          items: [
            "Rank messages",
            "Select key phrases",
            "Remove excess bold",
            "Retest scan",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Silence gives the signal its strength",
        body: "Protect emphasis by limiting it to content that truly deserves interruption.",
        visual: {
          type: "rule",
          statement: "If everything speaks loudly, nothing leads",
        },
      },
    ],
  },
  {
    id: "DWg4lUpimGM",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DWg4lUpimGM/",
      creator: "@designparser",
      publishedAt: "2026-03-30",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Balance Visual Weight, Not Symmetry",
    summary:
      "A composition study showing how asymmetrical layouts can feel stable when dark forms, light space, position, and scale counterbalance one another.",
    principles: [
      "Visual balance depends on perceived weight rather than mirrored geometry.",
      "Darker or denser forms can feel heavier than equally sized light forms.",
      "Negative space participates in the composition instead of acting as an empty remainder.",
    ],
    applications: [
      "Reduce a composition to its major masses and compare their visual pull.",
      "Use position, scale, tone, and surrounding space to counter a dominant element.",
      "Remove elements one at a time to discover which relationships actually stabilize the frame.",
    ],
    uncertainties: [
      "The opening frame is nearly blank and does not independently capture the later dark-shape and corner-space relationships.",
      "Perceived balance varies with content, viewing scale, cultural reading direction, and surrounding context.",
    ],
    evidence: [
      {
        label: "Asymmetry is distinguished from instability",
        start: 0,
        end: 2.16,
      },
      {
        label: "An isolated shape is described as unstable",
        start: 2.16,
        end: 4.04,
      },
      {
        label: "Dark tone carries additional visual weight",
        start: 4.04,
        end: 5.96,
      },
      {
        label: "Negative space contributes to balance",
        start: 5.96,
        end: 8.64,
      },
      {
        label: "Removing a participating mass collapses the frame",
        start: 8.64,
        end: 11,
      },
      {
        label: "Visual balance is separated from drawn geometry",
        start: 11,
        end: 14.6,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Asymmetrical balance",
        title: "Unequal shapes can produce an equal visual pull",
        body: "A composition can feel stable without mirroring when its masses counter one another across the frame.",
        visual: {
          type: "comparison",
          before: "Geometric symmetry",
          after: "Perceptual balance",
        },
      },
      {
        kind: "problem",
        eyebrow: "Single-metric layout",
        title: "Size alone cannot predict visual weight",
        body: "Tone, density, position, and open space change how strongly each region pulls attention.",
        visual: {
          type: "layers",
          items: [
            "Shape size",
            "Tone and density",
            "Position",
            "Negative space",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Counterweight",
        title: "Treat empty regions as active masses",
        body: "A bright or open corner can balance a smaller dark form because both affect the directional field.",
        visual: {
          type: "rule",
          statement: "All occupied and open regions carry weight",
        },
      },
      {
        kind: "application",
        eyebrow: "Balance test",
        title: "Simplify the frame and test each relationship",
        body: "View the major masses, remove one at a time, and adjust position or scale where the visual center drifts.",
        visual: {
          type: "sequence",
          items: [
            "Map masses",
            "Estimate pull",
            "Remove elements",
            "Rebalance frame",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "The eye balances more than geometry",
        body: "Compose tone, space, and position together until the whole frame settles.",
        visual: {
          type: "rule",
          statement: "Perceived weight defines stability",
        },
      },
    ],
  },
  {
    id: "DWeMxLJiuxk",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DWeMxLJiuxk/",
      creator: "@designparser",
      publishedAt: "2026-03-29",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Use Whitespace to Encode Relationships",
    summary:
      "A layout study distinguishing active whitespace from leftover space: deliberate gaps group related elements, separate unrelated ones, and create hierarchy before color or weight is considered.",
    principles: [
      "Proximity makes nearby elements read as a group.",
      "Different spacing above and below an element can reveal its ownership.",
      "Active whitespace directs scanning; passive whitespace is merely what remains.",
    ],
    applications: [
      "Use smaller gaps within a content group and larger gaps between groups.",
      "Audit heading spacing to ensure each heading sits closer to the content it labels.",
      "Test hierarchy in grayscale to see whether spacing alone preserves the structure.",
    ],
    uncertainties: [
      "The claim that proximity overrides color and weight is directional rather than absolute; competing cues can still alter grouping.",
      "The measurable scanning-speed claim is presented without task or study details.",
      "The opening frame captures a proximity comparison but not the later active-versus-passive progression.",
    ],
    evidence: [
      {
        label: "Whitespace becomes visible when it is removed",
        start: 0,
        end: 2.34,
      },
      {
        label: "One spacing change separates two layouts",
        start: 2.34,
        end: 4.04,
      },
      {
        label: "Heading gaps create ownership",
        start: 4.04,
        end: 6.34,
      },
      {
        label: "Proximity groups related elements",
        start: 6.34,
        end: 9.88,
      },
      {
        label: "Active whitespace creates hierarchy",
        start: 9.88,
        end: 15.68,
      },
      {
        label: "Active and passive space are distinguished",
        start: 15.68,
        end: 18.02,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Proximity",
        title: "Spacing tells the eye what belongs together",
        body: "A heading reads with the content below when the inner gap is smaller than the space separating the next group.",
        visual: {
          type: "comparison",
          before: "Equal gaps",
          after: "Grouped gaps",
        },
      },
      {
        kind: "problem",
        eyebrow: "Passive remainder",
        title: "Unused space does not automatically create hierarchy",
        body: "A layout can contain plenty of blank area while its local relationships remain ambiguous.",
        visual: {
          type: "layers",
          items: ["Available blank area", "Unstructured gaps", "Weak grouping"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Active whitespace",
        title: "Give every gap a relational job",
        body: "Use distance to bind related content, separate sections, and indicate the reading sequence.",
        visual: {
          type: "rule",
          statement: "Smaller within-group gap; larger between-group gap",
        },
      },
      {
        kind: "application",
        eyebrow: "Spacing audit",
        title: "Read the layout with color and weight removed",
        body: "Reduce the interface to neutral blocks and check whether proximity still reveals headings, groups, and order.",
        visual: {
          type: "sequence",
          items: [
            "Neutralize styling",
            "Inspect groups",
            "Adjust gaps",
            "Restore hierarchy",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Whitespace ranks by relationship",
        body: "Treat spacing as structure, not as the area left after elements are placed.",
        visual: {
          type: "rule",
          statement: "Active space explains the layout",
        },
      },
    ],
  },
  {
    id: "DWZJjNDCoYw",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DWZJjNDCoYw/",
      creator: "@designparser",
      publishedAt: "2026-03-27",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Make the Product Form Carry the Mission",
    summary:
      "A packaging case study of Tony’s Chocolonely, where irregular chocolate segments and category-breaking color turn the physical product and wrapper into expressions of the brand’s fairness message.",
    principles: [
      "A product can embody a brand idea through its physical structure, not only through copy.",
      "Breaking a category color convention can create a strong shelf signal.",
      "A mission-led design is stronger when form, story, and packaging reinforce the same idea.",
    ],
    applications: [
      "Identify whether the product geometry can demonstrate the brand’s central tension or promise.",
      "Map each unusual visual decision to a specific piece of the narrative.",
      "Test category-breaking colors for distinctiveness, recognition, and accessibility.",
    ],
    uncertainties: [
      "The claimed geographic mapping, cocoa-production share, and category color convention are not independently sourced in the study.",
      "The design-to-business or design-to-impact relationship is not quantified.",
      "Only the opening packaged-bar state was captured; the irregular pieces and map relationship were not independently captured.",
    ],
    evidence: [
      {
        label: "The package rejects photography and decoration",
        start: 0,
        end: 3.84,
      },
      {
        label: "Unequal pieces represent unequal cocoa income",
        start: 3.84,
        end: 6.88,
      },
      {
        label: "The bar is linked to a geographic cocoa story",
        start: 7.52,
        end: 12.96,
      },
      {
        label: "Red breaks a stated category color convention",
        start: 13.6,
        end: 16.24,
      },
      {
        label: "The color is framed as an alarm signal",
        start: 16.24,
        end: 19.36,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Mission-led packaging",
        title: "The chocolate itself can tell the inequality story",
        body: "Irregular segments turn a brand claim about unequal value distribution into a physical interaction.",
        visual: {
          type: "comparison",
          before: "Equal product grid",
          after: "Unequal product segments",
        },
      },
      {
        kind: "problem",
        eyebrow: "Decorative purpose",
        title: "A mission disappears when it lives only in marketing copy",
        body: "Photography and category styling can make a values-led product look interchangeable before the story is read.",
        visual: {
          type: "layers",
          items: [
            "Category conventions",
            "Mission statement",
            "Weak connection",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Embodied narrative",
        title: "Align form, color, and story around one tension",
        body: "Product geometry demonstrates the issue, while an unexpected wrapper color signals that the category should be questioned.",
        visual: {
          type: "rule",
          statement: "Product form + shelf signal → visible mission",
        },
      },
      {
        kind: "application",
        eyebrow: "Design translation",
        title: "Find a truthful physical expression of the message",
        body: "Connect a real product behavior or structure to the brand idea, then support it with a distinct but usable package system.",
        visual: {
          type: "sequence",
          items: [
            "Name mission",
            "Find physical metaphor",
            "Break relevant convention",
            "Test comprehension",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Let the product prove what the brand says",
        body: "A mission becomes more credible when people can see or experience it in the designed object.",
        visual: {
          type: "rule",
          statement: "Meaning is strongest when form participates",
        },
      },
    ],
  },
  {
    id: "DWUJxh3Cqd7",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DWUJxh3Cqd7/",
      creator: "@designparser",
      publishedAt: "2026-03-25",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Tune Tracking for Type Size and Role",
    summary:
      "A typography study explaining that letter spacing should change with scale and use: small text may benefit from more room, while display text often needs tighter optical relationships.",
    principles: [
      "One tracking value cannot serve every type size and role.",
      "Small text can need additional spacing to preserve letter separation.",
      "Large display text exposes gaps more strongly and may need tighter fitting.",
    ],
    applications: [
      "Set tracking separately for body, label, heading, and display styles.",
      "Review small text at actual device size and display text at its real viewing distance.",
      "Adjust spacing for the chosen typeface, weight, case, and rendering environment.",
    ],
    uncertainties: [
      "The directional advice is a starting tendency, not a universal rule for every typeface or script.",
      "The claim about peripheral readability is not accompanied by measurement conditions.",
      "Only the opening widely tracked display example was captured; small-text and tighter-display comparisons were not independently captured.",
    ],
    evidence: [
      {
        label: "Uniform tracking is identified as the problem",
        start: 0,
        end: 3.76,
      },
      {
        label: "Small text is associated with slightly wider spacing",
        start: 3.76,
        end: 6.44,
      },
      {
        label: "Display text is associated with tighter spacing",
        start: 6.44,
        end: 8.68,
      },
      {
        label: "Letter spacing is linked to peripheral readability",
        start: 8.68,
        end: 11.08,
      },
      {
        label: "Optimal spacing changes with type size",
        start: 11.08,
        end: 14.84,
      },
      {
        label: "Type and overall design also affect the choice",
        start: 14.84,
        end: 17.16,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Letter spacing",
        title: "Tracking changes as type changes scale",
        body: "A spacing value that keeps small letters distinct can make a large headline look disconnected.",
        visual: {
          type: "comparison",
          before: "Small text with breathing room",
          after: "Display text optically tightened",
        },
      },
      {
        kind: "problem",
        eyebrow: "Universal token",
        title: "One tracking rule creates opposite failures",
        body: "Small text can close up while large text reveals distracting gaps when both inherit the same setting.",
        visual: {
          type: "layers",
          items: [
            "Shared tracking value",
            "Different type sizes",
            "Different visible spacing",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Optical scale",
        title: "Judge the interval at the size it will be read",
        body: "Letterforms, weight, case, and rendering determine whether a style needs more or less space.",
        visual: {
          type: "rule",
          statement: "Type size and role → tracking decision",
        },
      },
      {
        kind: "application",
        eyebrow: "Type tokens",
        title: "Calibrate spacing for each semantic style",
        body: "Tune body, labels, headings, and display text separately, then review them together as one hierarchy.",
        visual: {
          type: "sequence",
          items: [
            "Set type roles",
            "Render actual sizes",
            "Adjust tracking",
            "Review system",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Tracking belongs to the style, not the project",
        body: "Assign spacing where type size, face, and function meet instead of relying on one global value.",
        visual: {
          type: "rule",
          statement: "Every type role earns its own spacing check",
        },
      },
    ],
  },
  {
    id: "DWO2JTUimTR",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DWO2JTUimTR/",
      creator: "@designparser",
      publishedAt: "2026-03-23",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Comparisons Can Steer Tier Choice",
    summary:
      "A pricing-interface study of the decoy effect: adding an inferior nearby option can change how a target tier is evaluated, even when the target itself has not changed.",
    principles: [
      "People evaluate an option relative to the alternatives placed beside it.",
      "An asymmetrically inferior tier can make a neighboring tier appear more valuable.",
      "Choice architecture should clarify real trade-offs rather than manufacture a misleading comparison.",
    ],
    applications: [
      "Audit pricing tiers for options that exist only to manipulate preference.",
      "Give every offered plan a defensible audience, feature set, and value.",
      "Test comprehension and informed choice, not only conversion to the target tier.",
    ],
    uncertainties: [
      "The 50%, 71%, and near-zero selection figures are presented as an illustrative scenario without experiment details.",
      "The study describes a potentially manipulative pattern; it is not evidence that a decoy is ethical or suitable for real pricing.",
      "Only the opening Basic-and-Pro comparison was captured; the third tier and changed selections were not independently captured.",
    ],
    evidence: [
      {
        label: "Two plans begin without a clear winner",
        start: 0,
        end: 7.2,
      },
      {
        label: "An inferior higher-priced third tier is added",
        start: 7.2,
        end: 10,
      },
      {
        label: "Preference shifts toward the neighboring target plan",
        start: 10,
        end: 13.84,
      },
      {
        label: "The decoy effect is named",
        start: 13.84,
        end: 16,
      },
      {
        label: "The third plan changes comparison rather than serving demand",
        start: 16,
        end: 18.48,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Choice architecture",
        title: "A third option can change the meaning of the first two",
        body: "Plans are judged relative to their neighbors, so an added tier can shift preference without changing the target offer.",
        visual: {
          type: "sequence",
          items: [
            "Two-way choice",
            "Add inferior neighbor",
            "Target gains relative value",
          ],
        },
      },
      {
        kind: "problem",
        eyebrow: "Manipulated comparison",
        title: "A plan can exist only to make another look better",
        body: "An option that is worse on both price and value creates an artificial reference rather than a meaningful customer fit.",
        visual: {
          type: "comparison",
          before: "Independent trade-offs",
          after: "Asymmetric decoy",
        },
      },
      {
        kind: "principle",
        eyebrow: "Relative judgment",
        title: "Every neighboring tier participates in the decision",
        body: "Price, features, and ordering create a comparison frame that can guide attention before users calculate absolute value.",
        visual: {
          type: "rule",
          statement: "Offer set → perceived value",
        },
      },
      {
        kind: "application",
        eyebrow: "Ethical tier design",
        title: "Make each option useful to a real audience",
        body: "Define a credible job for every plan, state trade-offs plainly, and measure whether people understand the choice.",
        visual: {
          type: "sequence",
          items: [
            "Name audience",
            "Check dominance",
            "Explain trade-offs",
            "Test comprehension",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Use comparison to clarify, not trap",
        body: "A pricing table should help users select the right fit without inventing a disposable option.",
        visual: {
          type: "rule",
          statement: "Legitimate choices earn trust",
        },
      },
    ],
  },
  {
    id: "DWMOIpSjUrR",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DWMOIpSjUrR/",
      creator: "@designparser",
      publishedAt: "2026-03-22",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "A Palette Is a System of Color Relationships",
    summary:
      "A color-perception study showing how the same gray can appear different on warm and cool backgrounds, making simultaneous contrast a system-level concern rather than a swatch-level property.",
    principles: [
      "Color is perceived relative to its surrounding colors.",
      "Warm and cool backgrounds can shift the apparent character of an unchanged neutral.",
      "A palette must be evaluated in the combinations and proportions where it will appear.",
    ],
    applications: [
      "Review neutral and semantic tokens on every background they use.",
      "Build palette documentation around pairings and roles, not isolated swatch rows.",
      "Test adjacent colors at production size and in representative lighting.",
    ],
    uncertainties: [
      "The historical attribution and 1839 date are not independently verified in this study.",
      "Only the opening single-value state was captured; the warm-versus-cool background comparison was not independently captured.",
    ],
    evidence: [
      {
        label: "One encoded value produces two perceptions",
        start: 0,
        end: 2.32,
      },
      {
        label: "Color is read through contrast rather than in isolation",
        start: 2.32,
        end: 5.6,
      },
      {
        label: "Warm and cool surrounds shift the same gray",
        start: 5.6,
        end: 8.48,
      },
      {
        label: "A historical description of the effect is cited",
        start: 9.04,
        end: 13.12,
      },
      {
        label: "Palette design is framed as relational",
        start: 13.12,
        end: 17.76,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Simultaneous contrast",
        title: "The same gray changes when its neighbors change",
        body: "A neutral inherits a warmer or cooler appearance from the field against which the eye compares it.",
        visual: {
          type: "comparison",
          before: "Gray on warm field",
          after: "Gray on cool field",
        },
      },
      {
        kind: "problem",
        eyebrow: "Isolated swatches",
        title: "A token list hides the relationships users see",
        body: "Approving colors one by one misses how adjacent backgrounds and accents alter their apparent hue and value.",
        visual: {
          type: "layers",
          items: ["Stored token", "Surrounding field", "Perceived color"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Relational palette",
        title: "Evaluate colors as pairs, roles, and proportions",
        body: "The useful design object is not the swatch alone but the system of combinations in which it operates.",
        visual: {
          type: "rule",
          statement: "Color + context → appearance",
        },
      },
      {
        kind: "application",
        eyebrow: "Token testing",
        title: "Place every token in its real neighborhood",
        body: "Compare text, surface, border, and accent roles across themes and states before accepting the palette.",
        visual: {
          type: "sequence",
          items: [
            "Assign roles",
            "Build pairings",
            "Test contexts",
            "Adjust relationships",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Color values do not travel alone",
        body: "Design the relationship that reaches the eye, not only the code stored in the system.",
        visual: {
          type: "rule",
          statement: "A palette is a network, not a list",
        },
      },
    ],
  },
  {
    id: "DWHKvRwih0A",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DWHKvRwih0A/",
      creator: "@designparser",
      publishedAt: "2026-03-20",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Odd Groups Can Create a Visual Center",
    summary:
      "A composition study proposing that groups of three or five can establish a dominant center and a stable hierarchy, while pairs may close too evenly and large groups begin to read as a crowd.",
    principles: [
      "Two similar elements can form a closed pair without a clear leader.",
      "An odd group can create a middle or dominant relationship that anchors attention.",
      "Once a set becomes dense, viewers may perceive texture or crowding instead of individual hierarchy.",
    ],
    applications: [
      "Compare two-, three-, and five-element arrangements for editorial and product compositions.",
      "Use scale, position, or contrast to clarify which item leads inside the group.",
      "Switch from item-level hierarchy to grouping or pattern when the set becomes dense.",
    ],
    uncertainties: [
      "The claims that three and five always hold and that the effect disappears above nine are presented without task or study conditions.",
      "Calling the behavior perceptual physics overstates a contextual composition heuristic.",
      "Only the opening two-element state was captured; odd and crowded variants were not independently captured.",
    ],
    evidence: [
      {
        label: "A two-element pair lacks a clear winner",
        start: 0,
        end: 4.64,
      },
      {
        label: "The closed pair lets attention move on",
        start: 4.64,
        end: 6.08,
      },
      {
        label: "A third element creates a center",
        start: 6.08,
        end: 10.92,
      },
      {
        label: "Dominance is linked to stronger attention",
        start: 10.92,
        end: 15.48,
      },
      {
        label: "Three and five are contrasted with a large crowd",
        start: 15.48,
        end: 21.2,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Group composition",
        title: "A pair can close before hierarchy begins",
        body: "Two comparable elements often read as one balanced unit, leaving neither as an obvious entry point.",
        visual: {
          type: "comparison",
          before: "Two equal elements",
          after: "Three with a center",
        },
      },
      {
        kind: "problem",
        eyebrow: "No leader",
        title: "Symmetry can flatten the reading order",
        body: "When both sides carry equal weight, attention may register the pair and move on without settling.",
        visual: {
          type: "layers",
          items: ["Equal pair", "Closed relationship", "No dominant entry"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Odd grouping",
        title: "A third element can create an anchor",
        body: "An odd arrangement offers a center or asymmetry around which the other items can organize.",
        visual: {
          type: "rule",
          statement: "Odd group + clear dominance → visual anchor",
        },
      },
      {
        kind: "application",
        eyebrow: "Scale test",
        title: "Choose an item group or a pattern deliberately",
        body: "Use small odd groups for item-level hierarchy, then group or simplify once quantity begins to read as texture.",
        visual: {
          type: "sequence",
          items: [
            "Set group size",
            "Choose leader",
            "Test balance",
            "Simplify crowd",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Use odd counts when they improve the composition",
        body: "Let the desired center and reading order determine the group rather than treating three or five as laws.",
        visual: {
          type: "rule",
          statement: "Hierarchy decides the count",
        },
      },
    ],
  },
  {
    id: "DV_zfOkio9m",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DV_zfOkio9m/",
      creator: "@designparser",
      publishedAt: "2026-03-17",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Color Depends on Its Viewing System",
    summary:
      "A color-management study linking contextual perception with screen-to-print differences: identical source data can be interpreted differently under new lighting, media, and output standards.",
    principles: [
      "Color appearance depends on surrounding light and visual context.",
      "RGB display color is emitted, while printed color is produced by reflected light from ink and paper.",
      "Profiles and print standards define conversions; they do not make unlike media physically identical.",
    ],
    applications: [
      "Evaluate color in the environment and medium where it will be used.",
      "Convert through the correct source and output profiles for print production.",
      "Use standardized viewing and physical proofs for colors that matter.",
    ],
    uncertainties: [
      "The dress example demonstrates ambiguous illumination, but it is an analogy rather than direct proof of every screen-to-print shift.",
      "The phrase “same hex” is technically incomplete across RGB and print because an RGB code requires a color space and conversion.",
      "Only the opening dress image was captured; profile conversion and paper results were not independently captured.",
    ],
    evidence: [
      {
        label: "An ambiguous dress introduces contextual color",
        start: 0,
        end: 4.2,
      },
      {
        label: "Lighting and context alter perception",
        start: 4.2,
        end: 7.16,
      },
      {
        label: "Screen design shifts when reproduced on paper",
        start: 7.16,
        end: 11.12,
      },
      {
        label: "Emission and reflected ink are distinguished",
        start: 11.12,
        end: 17.48,
      },
      {
        label: "Profiles and standards manage print conversion",
        start: 17.48,
        end: 22.92,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Color context",
        title: "Pixels do not determine appearance by themselves",
        body: "The eye interprets a color through assumed lighting and nearby cues, so identical image data can support different readings.",
        visual: {
          type: "layers",
          items: ["Pixel values", "Lighting assumption", "Perceived color"],
        },
      },
      {
        kind: "problem",
        eyebrow: "Cross-media translation",
        title: "Screen and paper are different color systems",
        body: "Displays emit light, while print reflects it through ink and substrate, creating different gamuts and viewing conditions.",
        visual: {
          type: "comparison",
          before: "Emitted display color",
          after: "Reflected printed color",
        },
      },
      {
        kind: "principle",
        eyebrow: "Managed conversion",
        title: "Describe both endpoints before translating",
        body: "Source profiles, output profiles, and print standards make the conversion intentional and repeatable within physical limits.",
        visual: {
          type: "rule",
          statement: "Defined source → controlled conversion → defined output",
        },
      },
      {
        kind: "application",
        eyebrow: "Production proof",
        title: "Judge the result in the destination medium",
        body: "Soft-proof under a managed display setup, then approve a physical sample under standardized light.",
        visual: {
          type: "sequence",
          items: [
            "Assign profiles",
            "Convert output",
            "Soft-proof",
            "Inspect print",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Color is a result, not just a value",
        body: "Specify the viewing system and verify the final medium whenever appearance matters.",
        visual: {
          type: "rule",
          statement: "Context and medium complete the color",
        },
      },
    ],
  },
  {
    id: "DV9TABeCs_A",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DV9TABeCs_A/",
      creator: "@designparser",
      publishedAt: "2026-03-16",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Give Color Temperature a Clear Dominant Role",
    summary:
      "A palette-composition study using warm and cool color as depth cues, proposing a dominant–supporting–accent ratio so foreground and background signals do not compete equally.",
    principles: [
      "Warm colors often appear to advance while cool colors often appear to recede.",
      "Equal warm and cool coverage can produce competing depth cues.",
      "A dominant, supporting, and accent distribution can clarify visual hierarchy.",
    ],
    applications: [
      "Choose whether warm or cool color should establish the primary field.",
      "Assign a supporting family and reserve the smallest share for accent.",
      "Test the palette with actual content rather than applying a ratio mechanically.",
    ],
    uncertainties: [
      "The neuroscience framing and claim that equal temperature coverage creates irresolvable conflict are not supported by study conditions.",
      "The 60–30–10 split is a familiar composition heuristic, not a universal perceptual law.",
      "Only the opening separated warm-and-cool fields were captured; the proposed ratio was not independently captured.",
    ],
    evidence: [
      {
        label: "Equal warm and cool shares are introduced",
        start: 0,
        end: 3.32,
      },
      {
        label: "The balance is reframed as competing signals",
        start: 3.32,
        end: 5.28,
      },
      {
        label: "Warm and cool are treated as depth cues",
        start: 5.28,
        end: 10.68,
      },
      {
        label: "Equal coverage is said to weaken depth resolution",
        start: 10.68,
        end: 14.72,
      },
      {
        label: "One family is proposed as dominant",
        start: 14.72,
        end: 17.96,
      },
      {
        label: "A 60–30–10 hierarchy is suggested",
        start: 17.96,
        end: 20.76,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Temperature hierarchy",
        title: "Warm and cool colors can imply different depth planes",
        body: "Warm color often advances visually while cool color recedes, giving temperature a role in spatial organization.",
        visual: {
          type: "comparison",
          before: "Warm foreground cue",
          after: "Cool background cue",
        },
      },
      {
        kind: "problem",
        eyebrow: "Equal competition",
        title: "A split palette can leave two fields fighting to lead",
        body: "When warm and cool occupy comparable weight, neither depth signal establishes a stable hierarchy.",
        visual: {
          type: "layers",
          items: [
            "Equal warm share",
            "Equal cool share",
            "Competing depth cues",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Dominant system",
        title: "Choose one temperature to establish the field",
        body: "Let one family dominate, another support, and a smaller accent create focus without dividing the composition evenly.",
        visual: {
          type: "rule",
          statement: "Dominant → support → accent",
        },
      },
      {
        kind: "application",
        eyebrow: "Palette test",
        title: "Use ratios as a draft, then compose with content",
        body: "Assign roles, place real text and imagery, and adjust the distribution until hierarchy and contrast are clear.",
        visual: {
          type: "sequence",
          items: [
            "Choose temperature lead",
            "Assign support",
            "Place accent",
            "Test composition",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Balance does not require equal area",
        body: "A stable palette can use unequal proportions to make depth and emphasis easier to read.",
        visual: {
          type: "rule",
          statement: "Clear roles create balance",
        },
      },
    ],
  },
  {
    id: "DV1HZEqCs4x",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DV1HZEqCs4x/",
      creator: "@designparser",
      publishedAt: "2026-03-13",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Break Shelf Patterns With Material and Ingredient Cues",
    summary:
      "A packaging case study describing a matte snack redesign that contrasts with glossy competitors while using ingredient-linked colors, texture, and a product-shaped logo treatment to strengthen provenance.",
    principles: [
      "Material finish can create distinctiveness when a category shares one surface convention.",
      "Ingredient-linked color can organize variants while keeping the master brand coherent.",
      "Texture and product cues can communicate origin more directly than generic decoration.",
    ],
    applications: [
      "Audit competitor finish, color, imagery, and hierarchy at real shelf distance.",
      "Choose one category convention to break while preserving fast brand and flavor recognition.",
      "Connect variant colors and textures to truthful ingredient or sourcing cues.",
    ],
    uncertainties: [
      "The claims of category dominance, competitor glossiness, and the 2025 redesign scope are not independently verified.",
      "The stated buyer-awareness percentage is presented without survey details.",
      "Only the opening empty-line state was captured; the matte packs, wood texture, flavor colors, and potato stamp were not independently captured.",
    ],
    evidence: [
      {
        label: "A dominant brand is said to disappear in a uniform shelf field",
        start: 0,
        end: 6.4,
      },
      {
        label: "A matte finish and variant ingredient colors create difference",
        start: 6.4,
        end: 10,
      },
      {
        label: "Wood texture introduces a farming cue",
        start: 10,
        end: 12.64,
      },
      {
        label: "A product-awareness statistic motivates provenance",
        start: 12.64,
        end: 17.04,
      },
      {
        label: "The logo treatment uses a real potato cue",
        start: 17.04,
        end: 20.24,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Shelf distinction",
        title: "A surface finish can interrupt a glossy category",
        body: "Moving from a common shine to a matte pack changes the material signal before shoppers read the copy.",
        visual: {
          type: "comparison",
          before: "Glossy category field",
          after: "Matte focal package",
        },
      },
      {
        kind: "problem",
        eyebrow: "Familiarity without focus",
        title: "A known brand can still blend into repeated shelf codes",
        body: "Shared finish, color behavior, and imagery reduce the visual difference between neighboring products.",
        visual: {
          type: "layers",
          items: [
            "Repeated conventions",
            "Distributed attention",
            "Weak focal package",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Coherent break",
        title: "Change one convention and reinforce the product truth",
        body: "Distinct finish attracts attention while ingredient colors, texture, and provenance cues explain what the product is.",
        visual: {
          type: "rule",
          statement: "Pattern break + truthful cue → useful distinction",
        },
      },
      {
        kind: "application",
        eyebrow: "Range system",
        title: "Differentiate flavors without losing the master brand",
        body: "Hold logo and layout structure steady, then vary colors and ingredient signals in a controlled family.",
        visual: {
          type: "sequence",
          items: [
            "Audit shelf",
            "Choose pattern break",
            "Map variant cues",
            "Test recognition",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Make the interruption relevant",
        body: "Shelf distinction lasts when the unusual material or visual cue also strengthens product understanding.",
        visual: {
          type: "rule",
          statement: "Noticeability should carry meaning",
        },
      },
    ],
  },
  {
    id: "DVylM32CrYN",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DVylM32CrYN/",
      creator: "@designparser",
      publishedAt: "2026-03-12",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Extend Artwork Beyond the Trim",
    summary:
      "A print-production study explaining bleed as artwork extended past the final cut line, preventing unintended white edges when printing and trimming vary within normal tolerances.",
    principles: [
      "Trim is the intended finished edge, not a guaranteed exact cut position.",
      "Bleed gives background artwork extra coverage beyond that edge.",
      "The required bleed amount comes from the printer and die-line specification.",
    ],
    applications: [
      "Extend colors and images that touch an edge beyond the trim line.",
      "Keep critical text and marks inside the documented safe area.",
      "Confirm bleed, trim, and safety requirements with the production vendor before export.",
    ],
    uncertainties: [
      "No bleed amount is specified because the correct value depends on the printer, process, format, and die line.",
      "Only the opening trim-and-artwork diagram was captured; later tolerance movement was not independently captured.",
    ],
    evidence: [
      {
        label: "Missing bleed creates white edges and waste",
        start: 0,
        end: 3.68,
      },
      {
        label: "Artwork without bleed stops at the cut line",
        start: 3.68,
        end: 6.64,
      },
      {
        label: "Artwork should extend beyond trim",
        start: 6.64,
        end: 9,
      },
      {
        label: "The extension absorbs press and cutting tolerance",
        start: 9,
        end: 11.04,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Print setup",
        title: "The cut line is a target, not a pixel-perfect boundary",
        body: "Small shifts in printing and trimming can expose unprinted stock when edge artwork stops exactly at trim.",
        visual: {
          type: "layers",
          items: ["Safe area", "Trim line", "Bleed area"],
        },
      },
      {
        kind: "problem",
        eyebrow: "Edge failure",
        title: "Artwork ending at trim leaves no tolerance",
        body: "A slight outward cut can reveal a white sliver or force the piece to be rejected.",
        visual: {
          type: "comparison",
          before: "Artwork stops at trim",
          after: "Artwork extends past trim",
        },
      },
      {
        kind: "principle",
        eyebrow: "Bleed coverage",
        title: "Carry edge artwork beyond the finished size",
        body: "The extra printed area ensures that normal cut variation still lands inside continuous color or imagery.",
        visual: {
          type: "rule",
          statement: "Edge artwork → extend through bleed",
        },
      },
      {
        kind: "application",
        eyebrow: "Preflight",
        title: "Use the production specification, not a guessed default",
        body: "Confirm bleed and safety distances, extend backgrounds, keep critical content inward, and inspect the export.",
        visual: {
          type: "sequence",
          items: [
            "Get die line",
            "Extend artwork",
            "Check safe area",
            "Preflight export",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Bleed protects the edge; safety protects the content",
        body: "Design for the real tolerance between printed artwork and the final cut.",
        visual: {
          type: "rule",
          statement: "Plan beyond trim and inside safety",
        },
      },
    ],
  },
  {
    id: "DVtihFXCrK1",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DVtihFXCrK1/",
      creator: "@designparser",
      publishedAt: "2026-03-10",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Do Not Confuse a Default With Intent",
    summary:
      "An interaction-design study explaining that preselected choices often reflect convenience or inertia, so meaningful preference—especially consent—should be inferred from an explicit user action.",
    principles: [
      "Defaults reduce effort and therefore increase passive acceptance.",
      "A preselected state does not prove that the user considered or preferred it.",
      "Consequential choices need clear information and an affirmative action.",
    ],
    applications: [
      "Leave consent and other consequential options unselected until the user acts.",
      "Record the interaction that expresses a choice rather than assuming intent from page load.",
      "Use neutral defaults where a default is necessary and make alternatives equally understandable.",
    ],
    uncertainties: [
      "The cognitive-load and acceptance claims are directional and are not accompanied by effect sizes or task conditions.",
      "The opening frame shows a checked consent control, but later user actions or alternative states were not independently captured.",
    ],
    evidence: [
      {
        label: "Preselection is separated from user intent",
        start: 0,
        end: 2.34,
      },
      {
        label: "Defaults create a path of least resistance",
        start: 2.34,
        end: 4.68,
      },
      {
        label: "Reduced cognitive effort is proposed as the mechanism",
        start: 4.68,
        end: 7.3,
      },
      {
        label: "Defaults increase passive acceptance",
        start: 7.3,
        end: 9.34,
      },
      {
        label: "Intent should be inferred from action",
        start: 9.34,
        end: 11.52,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Default effect",
        title: "A checked box can reflect inertia, not preference",
        body: "Preselection removes a decision step, so acceptance may occur without deliberate evaluation.",
        visual: {
          type: "comparison",
          before: "Preselected state",
          after: "Explicit user choice",
        },
      },
      {
        kind: "problem",
        eyebrow: "False intent",
        title: "Convenience can masquerade as agreement",
        body: "Treating a default as evidence of preference overstates what the user actually communicated.",
        visual: {
          type: "layers",
          items: [
            "Default state",
            "Low-friction continuation",
            "Assumed intent",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Affirmative action",
        title: "Consequential choices should begin neutral",
        body: "When privacy, payment, or commitment is involved, the interface should wait for an informed action.",
        visual: {
          type: "rule",
          statement: "No action ≠ expressed intent",
        },
      },
      {
        kind: "application",
        eyebrow: "Choice design",
        title: "Make selection visible and reversible",
        body: "Present understandable alternatives, require an intentional control change, and retain a clear way to revisit it.",
        visual: {
          type: "sequence",
          items: [
            "Explain choice",
            "Start neutral",
            "Capture action",
            "Allow revision",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Read intent from what users do",
        body: "Defaults can simplify routine setup, but they should not manufacture agreement.",
        visual: {
          type: "rule",
          statement: "Explicit action carries the signal",
        },
      },
    ],
  },
  {
    id: "DVqxz6GigrQ",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DVqxz6GigrQ/",
      creator: "@designparser",
      publishedAt: "2026-03-09",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Center Controls by Perception",
    summary:
      "A component-alignment study showing why mathematical centering can still look low, and proposing a small optical offset when type, shape, or surrounding space shifts the perceived center.",
    principles: [
      "Geometric center is a useful baseline, not always the final visual position.",
      "Letterforms and surrounding shape distribute visual mass unevenly.",
      "Optical correction should be determined in context at the final size.",
    ],
    applications: [
      "Center the control geometrically before judging it.",
      "Compare the label or icon inside the actual button shape and state.",
      "Apply a small offset only when repeated side-by-side tests show a consistent imbalance.",
    ],
    uncertainties: [
      "The proposed 2–6% shift is a contextual range, not a universal button-centering formula.",
      "The direction and amount depend on the font, label, icon, control height, and rendering.",
      "Only the opening button state was captured; the shifted comparison was not independently captured.",
    ],
    evidence: [
      {
        label: "Geometric centering is challenged",
        start: 0,
        end: 1.64,
      },
      {
        label: "A 50% coordinate midpoint is identified",
        start: 1.64,
        end: 3.84,
      },
      {
        label: "The centered content is perceived as low",
        start: 3.84,
        end: 5.72,
      },
      {
        label: "A small shift is proposed",
        start: 5.72,
        end: 8.48,
      },
      {
        label: "Optical center is framed as a perceptual correction",
        start: 8.48,
        end: 13.68,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Optical alignment",
        title: "A centered label can still appear low",
        body: "The visual mass of capital letters and the surrounding control can pull perception away from the coordinate midpoint.",
        visual: {
          type: "comparison",
          before: "Geometric midpoint",
          after: "Optically corrected position",
        },
      },
      {
        kind: "problem",
        eyebrow: "Coordinate confidence",
        title: "Fifty percent cannot evaluate the visible shape",
        body: "Layout math centers boxes, while the eye responds to the uneven contours and empty space inside them.",
        visual: {
          type: "layers",
          items: ["Centered text box", "Uneven glyph mass", "Perceived offset"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Measured correction",
        title: "Start geometric and adjust only with evidence",
        body: "A small nudge is appropriate when the same imbalance persists across realistic size, state, and comparison tests.",
        visual: {
          type: "rule",
          statement: "Geometric baseline + contextual optical offset",
        },
      },
      {
        kind: "application",
        eyebrow: "Component QA",
        title: "Compare states and neighboring controls together",
        body: "Inspect the button at production scale, toggle the offset, and verify that focus, loading, and icon variants stay aligned.",
        visual: {
          type: "sequence",
          items: [
            "Center boxes",
            "Render real label",
            "Compare offset",
            "Check all states",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Use unequal coordinates to achieve equal appearance",
        body: "Keep the mathematical center unless a small, repeatable correction clearly improves balance.",
        visual: {
          type: "rule",
          statement: "Perception decides the final position",
        },
      },
    ],
  },
  {
    id: "DVjurJsCvnO",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DVjurJsCvnO/",
      creator: "@designparser",
      publishedAt: "2026-03-06",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Create One Clear Shelf Signal",
    summary:
      "A packaging comparison arguing that a focused hierarchy, strong whitespace, large type contrast, limited color, and category-breaking illustration can outperform a pack with many competing focal points.",
    principles: [
      "Too many focal points divide attention and weaken the reading path.",
      "Whitespace and strong type-scale contrast can create a clear vertical hierarchy.",
      "A distinctive illustration style can interrupt a category dominated by generic product imagery.",
    ],
    applications: [
      "Reduce a package to the first, second, and third things shoppers should notice.",
      "Use whitespace and scale to connect those elements in one reading direction.",
      "Replace generic imagery only when a more distinctive visual still communicates product type.",
    ],
    uncertainties: [
      "The claim that the older brand loses on shelf is not accompanied by sales, attention, or recognition data.",
      "The description of one package as multicolor noise is a subjective critique rather than a measured result.",
      "Only the opening Alpro package was captured; the Oatly comparison and reading-flow changes were not independently captured.",
    ],
    evidence: [
      {
        label: "An older brand is described as losing shelf attention",
        start: 0,
        end: 3.64,
      },
      {
        label: "Many focal points are contrasted with one focus",
        start: 3.64,
        end: 8,
      },
      {
        label: "Whitespace creates a vertical reading flow",
        start: 8,
        end: 10.36,
      },
      {
        label: "Type scale and limited contrast create a strong signal",
        start: 10.36,
        end: 16.4,
      },
      {
        label: "Generic imagery is contrasted with illustration",
        start: 16.4,
        end: 20.44,
      },
      {
        label: "Category interruption is identified as the pattern",
        start: 20.44,
        end: 22.32,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Shelf hierarchy",
        title: "A package needs one obvious way in",
        body: "When logo, claims, badges, imagery, and color all compete, none becomes a reliable first read.",
        visual: {
          type: "comparison",
          before: "Many focal points",
          after: "One dominant signal",
        },
      },
      {
        kind: "problem",
        eyebrow: "Distributed attention",
        title: "More information can produce less recognition",
        body: "Competing scales and colors fragment the reading path before shoppers identify the brand or product.",
        visual: {
          type: "layers",
          items: [
            "Multiple highlights",
            "Broken reading flow",
            "Weak shelf signal",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Focused contrast",
        title: "Use whitespace to connect a deliberate hierarchy",
        body: "A limited palette and extreme but controlled type-scale differences can establish one vertical sequence.",
        visual: {
          type: "rule",
          statement: "One focus → one reading path",
        },
      },
      {
        kind: "application",
        eyebrow: "Category interruption",
        title: "Break a convention without hiding the product",
        body: "Test distinctive illustration or typography against category imagery while keeping brand, variant, and use quickly legible.",
        visual: {
          type: "sequence",
          items: [
            "Rank information",
            "Simplify signals",
            "Choose pattern break",
            "Test at shelf distance",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Focus creates the interruption",
        body: "A clear hierarchy stands out because the package knows what should lead.",
        visual: {
          type: "rule",
          statement: "Reduce competition to strengthen recognition",
        },
      },
    ],
  },
  {
    id: "DVglxsBiqbW",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DVglxsBiqbW/",
      creator: "@designparser",
      publishedAt: "2026-03-05",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Manage Gamut Before Print",
    summary:
      "A color-production study explaining why an on-screen color can lose intensity in print: displays emit additive RGB light, while print relies on light reflected through subtractive CMYK inks with a different reproducible gamut.",
    principles: [
      "A color value is interpreted through the output medium that reproduces it.",
      "Emissive RGB and reflective CMYK create color through different physical processes.",
      "A color inside a display gamut may sit outside the gamut available to a chosen printer, ink, and paper combination.",
    ],
    applications: [
      "Choose a print-aware color workflow before approving brand or campaign colors.",
      "Soft-proof critical colors against the intended print condition and substrate.",
      "Use physical proofs when exact reproduction matters more than screen appearance.",
    ],
    uncertainties: [
      "The source treats RGB and CMYK as broad categories; actual gamuts vary by display, profile, ink set, press, and paper.",
      "The statement that print is always narrower is a useful production warning rather than a universal comparison of every device and process.",
      "Only the opening RGB color example was captured, so later production examples were not independently captured.",
    ],
    evidence: [
      {
        label: "Screen and print use different color models",
        start: 0,
        end: 4.56,
      },
      {
        label: "RGB combines emitted light",
        start: 4.56,
        end: 7.96,
      },
      {
        label: "CMYK controls reflected light with ink",
        start: 7.96,
        end: 11.88,
      },
      {
        label: "The reproducible ranges do not fully overlap",
        start: 11.88,
        end: 14.72,
      },
      {
        label: "Production planning should account for gamut",
        start: 14.72,
        end: 16.2,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Color production",
        title: "One color can change when the medium changes",
        body: "A display creates color with light, while a printed surface returns ambient light through ink and paper.",
        visual: {
          type: "comparison",
          before: "Emitted RGB light",
          after: "Reflected CMYK color",
        },
      },
      {
        kind: "problem",
        eyebrow: "Gamut mismatch",
        title: "A vivid screen choice may not have a print equivalent",
        body: "When a selected color falls outside the target print condition, conversion must move it to a reproducible alternative.",
        visual: {
          type: "layers",
          items: ["Screen gamut", "Print gamut", "Nearest printable result"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Medium matters",
        title: "Color is a system outcome, not a detached code",
        body: "Profiles, devices, inks, and substrates all shape the color that a viewer finally sees.",
        visual: {
          type: "rule",
          statement: "Value + medium + profile → appearance",
        },
      },
      {
        kind: "application",
        eyebrow: "Print workflow",
        title: "Proof against the real production condition",
        body: "Convert with the intended profile, check critical colors, and request a physical proof for high-stakes work.",
        visual: {
          type: "sequence",
          items: ["Select profile", "Soft-proof", "Adjust", "Physical proof"],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Design color for its destination",
        body: "Treat screen appearance as a preview, not a guarantee of printed output.",
        visual: {
          type: "rule",
          statement: "Approve in the target medium",
        },
      },
    ],
  },
  {
    id: "DVd_sDyCqck",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DVd_sDyCqck/",
      creator: "@designparser",
      publishedAt: "2026-03-04",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Design for Attention, Not Mere Visibility",
    summary:
      "A perception study distinguishing physical visibility from conscious notice: an interface element can be present in the visual field yet missed when attention is committed elsewhere.",
    principles: [
      "Being inside the viewport does not guarantee that an element enters conscious awareness.",
      "Fixation and attention are related but not identical; a user can look near something without processing it.",
      "Similarity, proximity, and task relevance influence whether a secondary element is noticed.",
    ],
    applications: [
      "Place consequential feedback close to the action or object that created it.",
      "Use a distinct visual change when users must notice a new state.",
      "Test critical notices during realistic tasks rather than asking whether they are technically visible.",
    ],
    uncertainties: [
      "The source compresses complex attention research into a short design heuristic; noticeability also depends on timing, motion, expectation, and user goals.",
      "Similarity and proximity do not guarantee awareness and should not replace usability testing.",
      "The captured opening scene is visually blank, so the spoken examples were not independently captured.",
    ],
    evidence: [
      {
        label: "Visible elements can still go unnoticed",
        start: 0,
        end: 2.64,
      },
      {
        label: "Fixation and attention are distinguished",
        start: 2.64,
        end: 5.76,
      },
      {
        label: "Attention filters what reaches awareness",
        start: 5.76,
        end: 11,
      },
      {
        label: "Design cues can improve the chance of notice",
        start: 11,
        end: 15,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Selective attention",
        title: "On-screen does not mean noticed",
        body: "Users filter the visual field around the task they are trying to complete.",
        visual: {
          type: "comparison",
          before: "Element is present",
          after: "Element enters awareness",
        },
      },
      {
        kind: "problem",
        eyebrow: "Attention gap",
        title: "A critical message can sit outside the user's task focus",
        body: "Technical visibility is a weak safeguard when the notice is distant, expected to be static, or visually similar to its surroundings.",
        visual: {
          type: "layers",
          items: ["Visual field", "Task focus", "Conscious notice"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Contextual salience",
        title: "Connect a signal to the action that makes it relevant",
        body: "Proximity and meaningful contrast help users associate feedback with the event they are already attending to.",
        visual: {
          type: "rule",
          statement: "Relevant cue + timely placement → stronger notice",
        },
      },
      {
        kind: "application",
        eyebrow: "Critical feedback",
        title: "Put state changes where the decision happens",
        body: "Anchor validation, status, and risk messages near their controls, then verify notice during a realistic flow.",
        visual: {
          type: "sequence",
          items: [
            "User acts",
            "State changes",
            "Local cue appears",
            "User confirms",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Design the path to attention",
        body: "For essential information, test whether people notice and understand it—not merely whether it exists.",
        visual: {
          type: "rule",
          statement: "Presence ≠ perception",
        },
      },
    ],
  },
  {
    id: "DVZPniSikfS",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DVZPniSikfS/",
      creator: "@designparser",
      publishedAt: "2026-03-02",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Use Luminance Contrast Thresholds Correctly",
    summary:
      "An accessibility study explaining that common WCAG contrast ratios are computed from relative luminance rather than intuitive hue difference, then applied through thresholds that depend on the kind and size of content.",
    principles: [
      "Perceived color difference is not a reliable substitute for a measured contrast ratio.",
      "WCAG contrast calculations compare relative luminance values on a defined scale.",
      "The applicable minimum depends on whether the target is text, large text, or a qualifying graphical or interface boundary.",
    ],
    applications: [
      "Check contrast with a standards-aware tool instead of judging by hue alone.",
      "Classify each target correctly before choosing a threshold.",
      "Test all interactive states, not only the default palette.",
    ],
    uncertainties: [
      "The exact applicability of 7:1, 4.5:1, and 3:1 depends on WCAG conformance level, text size and weight, component state, and the specific success criterion.",
      "A 3:1 requirement does not automatically apply to every pixel or every interface element; standards review is needed for each implementation.",
      "Only the opening contrast example was captured, so later calculations and threshold examples were not independently captured.",
    ],
    evidence: [
      {
        label: "Hue difference alone can mislead",
        start: 0,
        end: 4.88,
      },
      {
        label: "Relative luminance underlies the ratio",
        start: 4.88,
        end: 10,
      },
      {
        label: "Text thresholds vary by conformance and size",
        start: 10,
        end: 14.96,
      },
      {
        label: "Non-text cases require correct classification",
        start: 14.96,
        end: 19.8,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Accessible contrast",
        title: "Contrast is measured through luminance, not hue names",
        body: "Two colors can look categorically different yet still produce insufficient light-dark separation.",
        visual: {
          type: "comparison",
          before: "Different hues",
          after: "Measured luminance ratio",
        },
      },
      {
        kind: "problem",
        eyebrow: "Visual guesswork",
        title: "A vivid palette can still hide text or controls",
        body: "Colorfulness and saturation do not establish whether adjacent elements meet the relevant contrast requirement.",
        visual: {
          type: "layers",
          items: ["Foreground", "Background", "Relative luminance", "Ratio"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Contextual threshold",
        title: "Measure first, then apply the right criterion",
        body: "The ratio is only half the decision; the target's role, size, weight, and conformance goal determine how it is evaluated.",
        visual: {
          type: "rule",
          statement: "Measured ratio + target class → evaluation",
        },
      },
      {
        kind: "application",
        eyebrow: "State audit",
        title: "Check the full component lifecycle",
        body: "Verify default, hover, focus, selected, disabled, error, and adjacent-state boundaries with a standards-aware checker.",
        visual: {
          type: "sequence",
          items: [
            "Classify target",
            "Measure pair",
            "Check criterion",
            "Repeat states",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Do not infer compliance from appearance",
        body: "Use the defined luminance calculation and confirm which requirement actually governs the element.",
        visual: {
          type: "rule",
          statement: "Measure, classify, verify",
        },
      },
    ],
  },
  {
    id: "DVRr80kCkYA",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DVRr80kCkYA/",
      creator: "@designparser",
      publishedAt: "2026-02-27",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Separate Typeface, Font, and Family",
    summary:
      "A typography terminology study separating the visual design system of a typeface from the font resources that implement particular styles and weights, while showing why everyday digital usage often blurs the terms.",
    principles: [
      "A typeface names a coherent letterform design, not a single weight file.",
      "A font is a usable implementation of that design in a particular format, style, or variable range.",
      "A type family groups related styles so an interface can select consistent variants.",
    ],
    applications: [
      "Name typography tokens by family, role, weight, and style rather than by ambiguous shorthand.",
      "Load only the font resources or variable ranges the product actually uses.",
      "Document fallback behavior so the intended typeface system degrades predictably.",
    ],
    uncertainties: [
      "Typography terminology varies by historical period, vendor, and technical context; font is commonly used for both a design and its digital resource.",
      "Variable fonts can contain many axes in one resource, making a one-file-one-style explanation incomplete.",
      "Only the opening family declaration was captured, so later distinctions were not independently captured.",
    ],
    evidence: [
      {
        label: "Everyday usage blurs the terms",
        start: 0,
        end: 3.52,
      },
      {
        label: "The design is separated from its implementation",
        start: 3.52,
        end: 7.12,
      },
      {
        label: "A family groups related variants",
        start: 7.12,
        end: 10.24,
      },
      {
        label: "Weights and styles are selected within the system",
        start: 10.24,
        end: 14.72,
      },
      {
        label: "Precise naming improves communication",
        start: 14.72,
        end: 16.04,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Typography language",
        title: "The design and the resource are related, not identical",
        body: "A typeface defines a visual system; fonts make that system usable in software and production.",
        visual: {
          type: "layers",
          items: [
            "Typeface design",
            "Family",
            "Font resources",
            "Rendered text",
          ],
        },
      },
      {
        kind: "problem",
        eyebrow: "Ambiguous handoff",
        title: "One word can hide several implementation choices",
        body: "A request for a font may leave family, weight, style, format, and fallback unspecified.",
        visual: {
          type: "comparison",
          before: "Use the font",
          after: "Name family, role, weight, style",
        },
      },
      {
        kind: "principle",
        eyebrow: "System vocabulary",
        title: "Name each layer at the level where it changes",
        body: "Keep the visual identity of the typeface separate from the assets and parameters used to render it.",
        visual: {
          type: "rule",
          statement: "Design system ≠ delivery resource",
        },
      },
      {
        kind: "application",
        eyebrow: "Product tokens",
        title: "Make typography choices explicit",
        body: "Define semantic roles, map them to family and variation settings, and document the fallback chain.",
        visual: {
          type: "sequence",
          items: ["Role", "Family", "Weight/style", "Resource", "Fallback"],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Use precise terms when precision affects the build",
        body: "Casual overlap is harmless until it obscures which design or resource a team must ship.",
        visual: {
          type: "rule",
          statement: "Name the layer you mean",
        },
      },
    ],
  },
  {
    id: "DVOiVYpivR6",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DVOiVYpivR6/",
      creator: "@designparser",
      publishedAt: "2026-02-26",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Avoid Full Justification When Spacing Breaks",
    summary:
      "A responsive-typography study showing how full justification can stretch word spacing unpredictably as line length changes, reducing reading comfort even when the text block looks geometrically tidy.",
    principles: [
      "Full justification redistributes horizontal space across each line.",
      "Narrow or changing measures can create irregular gaps and distracting visual channels.",
      "A stable ragged edge often preserves more consistent word spacing in responsive interfaces.",
    ],
    applications: [
      "Default long-form interface copy to start alignment unless the layout has strong typographic controls.",
      "Test text blocks across content lengths, breakpoints, zoom levels, and language variants.",
      "If justification is required, manage measure, hyphenation, line breaking, and spacing together.",
    ],
    uncertainties: [
      "The source's blanket claim that justified text fails WCAG is too broad; WCAG guidance and success criteria should be checked for the applicable version and context.",
      "Well-composed justification can work in controlled editorial settings with suitable measure, hyphenation, and line-breaking support.",
      "Only the opening spacing example was captured, so later responsive comparisons were not independently captured.",
    ],
    evidence: [
      {
        label: "A compliance claim introduces the concern",
        start: 0,
        end: 2.76,
      },
      {
        label: "Justification stretches space to fill a line",
        start: 2.76,
        end: 7.72,
      },
      {
        label: "Responsive widths make the gaps unstable",
        start: 7.72,
        end: 11.68,
      },
      {
        label: "Start alignment keeps spacing more consistent",
        start: 11.68,
        end: 15.44,
      },
      {
        label: "Reading comfort is the practical test",
        start: 15.44,
        end: 18.04,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Responsive typography",
        title: "A straight edge can conceal unstable spacing",
        body: "Full justification makes both edges align by changing the spaces within each line.",
        visual: {
          type: "comparison",
          before: "Even outer edges",
          after: "Uneven inner gaps",
        },
      },
      {
        kind: "problem",
        eyebrow: "Variable measure",
        title: "Every breakpoint recomputes the texture",
        body: "As containers narrow or copy changes, expanded gaps can interrupt grouping and produce distracting channels through a paragraph.",
        visual: {
          type: "layers",
          items: [
            "Container width",
            "Line breaks",
            "Word spacing",
            "Reading rhythm",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Reading rhythm",
        title: "Consistent spacing matters more than a perfect edge",
        body: "Start-aligned text accepts a ragged boundary so the spaces between words can remain steadier.",
        visual: {
          type: "rule",
          statement: "Stable word spacing outweighs geometric neatness",
        },
      },
      {
        kind: "application",
        eyebrow: "Stress test",
        title: "Judge text across real layout conditions",
        body: "Review long and short copy at each breakpoint, with zoom, localization, and user-selected text sizing.",
        visual: {
          type: "sequence",
          items: ["Vary copy", "Resize", "Zoom", "Localize", "Read"],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Choose alignment for readable spacing",
        body: "Use full justification only when the composition system can control the gaps it creates.",
        visual: {
          type: "rule",
          statement: "Control the texture, not only the edge",
        },
      },
    ],
  },
  {
    id: "DVJpP8eipki",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DVJpP8eipki/",
      creator: "@designparser",
      publishedAt: "2026-02-24",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Use Grids as Anchors, Not Hierarchy",
    summary:
      "A composition study reframing the rule of thirds as a set of useful placement anchors rather than a biological law, with hierarchy still determined by content, contrast, and the viewer's reading context.",
    principles: [
      "A grid supplies alignment opportunities; it does not decide what deserves attention.",
      "Common scan patterns are influenced by reading direction, culture, task, and content rather than fixed biology alone.",
      "Hierarchy emerges from the interaction of placement, scale, contrast, and sequence.",
    ],
    applications: [
      "Use third-line intersections as candidate anchors, then test whether the intended subject actually leads.",
      "Adapt the entry point and reading path for locale and content direction.",
      "Break the grid deliberately when another placement communicates priority more clearly.",
    ],
    uncertainties: [
      "The source's top-left and bottom-right attention claims are directional heuristics, not universal biological facts.",
      "Reading direction, culture, task, imagery, motion, and prior expectation can all change a scan path.",
      "Only the opening thirds grid was captured, so later anchor examples were not independently captured.",
    ],
    evidence: [
      {
        label: "The familiar thirds grid is introduced",
        start: 0,
        end: 3.66,
      },
      {
        label: "A biological explanation is proposed",
        start: 3.66,
        end: 7.16,
      },
      {
        label: "Entry and terminal anchors are assigned",
        start: 7.16,
        end: 10.8,
      },
      {
        label: "The grid is reframed as a placement aid",
        start: 10.8,
        end: 14.18,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Composition grids",
        title: "The rule of thirds offers anchors, not answers",
        body: "Its lines and intersections are a practical starting structure for arranging a frame.",
        visual: {
          type: "layers",
          items: ["Frame", "Third lines", "Candidate anchors", "Content"],
        },
      },
      {
        kind: "problem",
        eyebrow: "False certainty",
        title: "A grid cannot guarantee the viewer's route",
        body: "Attention changes with language direction, task, subject matter, contrast, motion, and learned conventions.",
        visual: {
          type: "comparison",
          before: "Fixed universal path",
          after: "Context-dependent path",
        },
      },
      {
        kind: "principle",
        eyebrow: "Designed hierarchy",
        title: "Placement works with every other visual signal",
        body: "An intersection becomes meaningful only when scale, contrast, content, and surrounding space support the intended priority.",
        visual: {
          type: "rule",
          statement: "Anchor × contrast × content → hierarchy",
        },
      },
      {
        kind: "application",
        eyebrow: "Composition test",
        title: "Start on the grid, then test the actual path",
        body: "Place the primary subject, inspect first fixation and sequence, and move or break alignment when the story requires it.",
        visual: {
          type: "sequence",
          items: ["Choose anchor", "Add hierarchy", "Test scan", "Adjust"],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Let the grid support the message",
        body: "Treat thirds as compositional scaffolding, not a law of perception.",
        visual: {
          type: "rule",
          statement: "Grid guides; content leads",
        },
      },
    ],
  },
  {
    id: "DVHLrdDipEl",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DVHLrdDipEl/",
      creator: "@designparser",
      publishedAt: "2026-02-23",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Balance Icon-and-Text Padding Optically",
    summary:
      "A control-layout study showing why equal outer padding can look unbalanced when an icon and its internal gap occupy one side of a label, and proposing a relationship-aware starting adjustment.",
    principles: [
      "Equal measured padding does not always produce equal perceived space.",
      "The icon-to-label gap participates in the visual mass on the icon side of a control.",
      "Optical balance should be checked after the control's internal relationships are assembled.",
    ],
    applications: [
      "Begin with a spacing relationship that accounts for the internal icon gap, then inspect the result.",
      "Test icons with different bounding boxes, stroke weights, and optical centers.",
      "Keep hit-target size and accessibility requirements independent from the visual adjustment.",
    ],
    uncertainties: [
      "Subtracting the icon-label gap from one outer inset is a contextual heuristic, not a universal formula.",
      "Icon geometry, text metrics, control width, directionality, and platform conventions can require a different adjustment.",
      "Only the opening symmetric-padding example was captured, so the corrected state was not independently captured.",
    ],
    evidence: [
      {
        label: "Equal insets appear visually unequal",
        start: 0,
        end: 3.66,
      },
      {
        label: "The internal icon gap adds perceived space",
        start: 3.66,
        end: 6.92,
      },
      {
        label: "A subtraction relationship is proposed",
        start: 6.92,
        end: 9.56,
      },
      {
        label: "Optical balance is the intended outcome",
        start: 9.56,
        end: 12.56,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Control geometry",
        title: "Equal insets can feel unequal",
        body: "An icon, its gap, and the label create an asymmetric internal composition inside a button.",
        visual: {
          type: "comparison",
          before: "Equal numeric padding",
          after: "Unequal perceived space",
        },
      },
      {
        kind: "problem",
        eyebrow: "Hidden interval",
        title: "The icon-side gap compounds the outer space",
        body: "Users perceive the relationship among all visible elements, not only the distance from content bounds to the container.",
        visual: {
          type: "layers",
          items: ["Outer inset", "Icon", "Inner gap", "Label", "Outer inset"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Optical correction",
        title: "Balance the assembled control",
        body: "Use the gap-aware relationship as a starting point, then adjust for the icon's actual optical shape.",
        visual: {
          type: "rule",
          statement: "Measure relationships, then judge balance",
        },
      },
      {
        kind: "application",
        eyebrow: "Component QA",
        title: "Test more than one ideal icon",
        body: "Check filled, outlined, narrow, wide, and bidirectional variants while preserving the required touch target.",
        visual: {
          type: "sequence",
          items: [
            "Set gap",
            "Adjust inset",
            "Swap icons",
            "Check direction",
            "Verify target",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Numeric symmetry is only the first draft",
        body: "Finalize padding against the control's visible mass and interaction requirements.",
        visual: {
          type: "rule",
          statement: "Optical balance follows the whole composition",
        },
      },
    ],
  },
  {
    id: "DU_f4IeCix7",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DU_f4IeCix7/",
      creator: "@designparser",
      publishedAt: "2026-02-20",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Build Spacing Hierarchy With a Scale",
    summary:
      "A typography-spacing study arguing that equal or mechanically linear gaps weaken hierarchy, and proposing a ratio-based scale as one way to make separation grow with level and emphasis.",
    principles: [
      "Spacing communicates grouping and rank alongside type size and weight.",
      "Equal gaps can make distinct hierarchy levels feel unrelated or flat.",
      "A reusable scale creates intentional relationships, but its ratio is a design choice rather than a perceptual constant.",
    ],
    applications: [
      "Define semantic spacing tokens for heading-to-heading and heading-to-body relationships.",
      "Try a modest modular ratio, then test the resulting rhythm in real layouts.",
      "Tune the scale for density, typography, viewport, and content instead of applying it mechanically.",
    ],
    uncertainties: [
      "The source's claim about logarithmic spacing perception is presented without research details and should be treated as a heuristic.",
      "A 1.25 ratio is one possible modular scale, not a validated universal value.",
      "Only the opening equal-gap hierarchy was captured, so later scale examples were not independently captured.",
    ],
    evidence: [
      {
        label: "Equal gaps flatten heading relationships",
        start: 0,
        end: 4.28,
      },
      {
        label: "Linear increments are challenged",
        start: 4.28,
        end: 9.32,
      },
      {
        label: "A modular ratio is proposed",
        start: 9.32,
        end: 13.52,
      },
      {
        label: "The ratio is applied across levels",
        start: 13.52,
        end: 18.32,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Vertical rhythm",
        title: "Equal gaps can erase hierarchy",
        body: "When every heading interval is identical, spacing stops explaining which levels belong together.",
        visual: {
          type: "comparison",
          before: "Uniform gaps",
          after: "Ranked gaps",
        },
      },
      {
        kind: "problem",
        eyebrow: "Flat relationships",
        title: "Type size changes while the surrounding rhythm stays still",
        body: "A fixed interval can feel too large for a minor heading and too small for a major section break.",
        visual: {
          type: "layers",
          items: ["Heading rank", "Type scale", "Spacing scale", "Grouping"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Relational scale",
        title: "Let separation grow with structural distance",
        body: "A modular ratio can produce repeatable differences while leaving room for optical tuning.",
        visual: {
          type: "rule",
          statement: "More structural distance → more separation",
        },
      },
      {
        kind: "application",
        eyebrow: "Token system",
        title: "Map spacing to semantic relationships",
        body: "Create tokens for adjacent text levels, section boundaries, and content blocks, then test them across responsive contexts.",
        visual: {
          type: "sequence",
          items: [
            "Choose base",
            "Try ratio",
            "Map roles",
            "Test pages",
            "Tune",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Use a scale to start the rhythm, not finish it",
        body: "Consistent relationships help, but the layout still needs visual judgment.",
        visual: {
          type: "rule",
          statement: "Systematic does not mean automatic",
        },
      },
    ],
  },
  {
    id: "DU6hZs7jRA1",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DU6hZs7jRA1/",
      creator: "@designparser",
      publishedAt: "2026-02-18",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Distinguish Luminance From Color-Space Lightness",
    summary:
      "A color-measurement study separating photometric luminance from a lightness coordinate in a color model, showing why two colors with the same nominal lightness value can still differ greatly in emitted or reflected light.",
    principles: [
      "Luminance describes a weighted physical-light quantity, while lightness is a coordinate defined by a particular color model.",
      "Equal numeric lightness in one model does not imply equal relative luminance.",
      "Contrast and accessibility decisions require the measurement defined by the applicable standard.",
    ],
    applications: [
      "Do not use an HSL lightness value as a proxy for WCAG relative luminance.",
      "Use standards-aware tools to calculate contrast from the rendered color pair.",
      "Choose perceptually oriented spaces for palette operations only after understanding what their lightness axis models.",
    ],
    uncertainties: [
      "The source combines general lightness terminology with an HSL example; different color spaces define lightness or tone differently.",
      "The stated numeric luminance difference is not independently reproduced here and depends on the exact colors and transfer-function assumptions.",
      "The closing characterization of lightness is internally inconsistent with the earlier perception framing, so this study limits the claim to a measurement distinction.",
      "Only the opening equal-HSL-lightness example was captured, so later numeric comparisons were not independently captured.",
    ],
    evidence: [
      {
        label: "Physical luminance and modeled lightness are separated",
        start: 0,
        end: 4,
      },
      {
        label: "Equal nominal lightness colors are compared",
        start: 4,
        end: 9,
      },
      {
        label: "A large luminance difference is claimed",
        start: 9,
        end: 14,
      },
      {
        label: "The distinction is summarized with an unresolved inconsistency",
        start: 14,
        end: 16,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Color measurement",
        title: "A lightness number does not directly measure light",
        body: "Model coordinates and photometric measurements describe different properties, even when both sound like brightness.",
        visual: {
          type: "comparison",
          before: "Color-space lightness",
          after: "Relative luminance",
        },
      },
      {
        kind: "problem",
        eyebrow: "False equivalence",
        title: "Matching one coordinate can hide a large luminance gap",
        body: "Hue contributions and the color model's geometry can produce equal lightness values without equal light output.",
        visual: {
          type: "layers",
          items: [
            "Color coordinates",
            "Transfer function",
            "Luminance weighting",
            "Rendered result",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Use the defined measure",
        title: "Match the metric to the decision",
        body: "Palette generation, perceptual adjustment, and standards contrast checks may each call for a different calculation.",
        visual: {
          type: "rule",
          statement: "Question → color space → measurement",
        },
      },
      {
        kind: "application",
        eyebrow: "Contrast workflow",
        title: "Calculate from the rendered foreground and background",
        body: "Use the applicable relative-luminance formula and verify the resulting ratio for the target content type.",
        visual: {
          type: "sequence",
          items: [
            "Render colors",
            "Compute luminance",
            "Calculate ratio",
            "Check criterion",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Do not substitute a familiar color slider for a standard",
        body: "A lightness coordinate is useful within its model, but it is not automatically the right accessibility metric.",
        visual: {
          type: "rule",
          statement: "Same label ≠ same quantity",
        },
      },
    ],
  },
  {
    id: "DU3vm-UjR-B",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DU3vm-UjR-B/",
      creator: "@designparser",
      publishedAt: "2026-02-17",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Compose With Multiple Sources of Visual Weight",
    summary:
      "A hierarchy study treating visual weight as the combined effect of size, contrast, saturation, shape, density, and isolation, then using those variables to create a deliberate scan path through an interface.",
    principles: [
      "Visual weight emerges from several interacting cues rather than one property.",
      "Isolation can increase salience by giving an element a distinct region of space.",
      "Hierarchy is strongest when multiple cues support the same intended reading order.",
    ],
    applications: [
      "Rank interface elements by task priority before assigning visual emphasis.",
      "Use the fewest weight cues needed to make the primary action lead.",
      "Reduce competing contrast, saturation, or isolation when too many elements demand first attention.",
    ],
    uncertainties: [
      "The source presents visual-weight factors qualitatively and does not supply a validated formula for combining them.",
      "Salience and scan order also depend on content, expectation, culture, task, and interaction state.",
      "Speech recognition produced only two broad timing blocks, and only the opening pricing-card composition was captured.",
    ],
    evidence: [
      {
        label: "Several cues contribute to perceived weight",
        start: 0,
        end: 7.68,
      },
      {
        label: "Isolation strengthens emphasis and guides scanning",
        start: 8.4,
        end: 12.72,
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Visual hierarchy",
        title: "Weight is an interaction of cues",
        body: "Size, contrast, saturation, shape, density, and surrounding space all affect which element leads.",
        visual: {
          type: "layers",
          items: ["Size", "Contrast", "Color", "Shape", "Isolation"],
        },
      },
      {
        kind: "problem",
        eyebrow: "Competing emphasis",
        title: "When every cue is loud, the scan path disappears",
        body: "Multiple oversized, saturated, high-contrast elements force users to resolve priority for themselves.",
        visual: {
          type: "comparison",
          before: "Many equal magnets",
          after: "One clear lead",
        },
      },
      {
        kind: "principle",
        eyebrow: "Aligned signals",
        title: "Combine cues around task priority",
        body: "The primary element can lead through a small set of reinforcing signals while secondary content remains available without competing.",
        visual: {
          type: "rule",
          statement: "Task priority → coordinated visual weight",
        },
      },
      {
        kind: "application",
        eyebrow: "Hierarchy audit",
        title: "Tune the page from first glance to next action",
        body: "Blur or squint at the layout, identify the first few anchors, and remove emphasis that conflicts with the intended sequence.",
        visual: {
          type: "sequence",
          items: [
            "Rank tasks",
            "Assign cues",
            "Check first glance",
            "Reduce competition",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Spend visual weight where attention should go",
        body: "Hierarchy becomes deliberate when emphasis follows the user's next useful decision.",
        visual: {
          type: "rule",
          statement: "Emphasis is a limited budget",
        },
      },
    ],
  },
  {
    id: "DUtPYGCjdbv",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DUtPYGCjdbv/",
      creator: "@designparser",
      publishedAt: "2026-02-13",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Set Text Measure for Reading",
    summary:
      "A typography study treating line length as a reading-system variable: overly wide measures make return sweeps harder, while a moderate measure supports a stable reading rhythm.",
    principles: [
      "Line length affects both within-line reading and the return to the next line.",
      "A useful measure must be tested with the actual typeface, size, leading, language, and device.",
    ],
    applications: [
      "Set a target measure for long-form text, then test it at responsive widths.",
      "Use readable line breaks and heading structure to reduce return-sweep effort.",
    ],
    uncertainties: [
      "The stated 50–75 and 66-character figures are heuristics, not universal thresholds.",
      "Only the opening text-block illustration was frame-verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 3.6,
        label: "Line length introduces the readability concern",
      },
      {
        start: 3.6,
        end: 7.44,
        label: "Wide measures complicate return sweeps",
      },
      {
        start: 7.44,
        end: 16.4,
        label: "A moderate character measure is proposed",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Design study",
        title: "Line length changes the reading task",
        body: "A typography study treating line length as a reading-system variable: overly wide measures make return sweeps harder, while a moderate measure supports a stable reading rhythm.",
        visual: {
          type: "comparison",
          before: "Source claim",
          after: "Context-aware interpretation",
        },
      },
      {
        kind: "problem",
        eyebrow: "Failure mode",
        title: "A wide line makes the next starting point harder to find",
        body: "Line length affects both within-line reading and the return to the next line.",
        visual: {
          type: "layers",
          items: ["Interface context", "User goal", "Visible cue"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Working principle",
        title: "Choose measure in the actual text system",
        body: "A useful measure must be tested with the actual typeface, size, leading, language, and device.",
        visual: {
          type: "rule",
          statement: "Context determines the appropriate design choice",
        },
      },
      {
        kind: "application",
        eyebrow: "Applied practice",
        title: "Test measure across responsive conditions",
        body: "Set a target measure for long-form text, then test it at responsive widths.",
        visual: {
          type: "sequence",
          items: [
            "Identify task",
            "Choose structure",
            "Test context",
            "Refine",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Test the pattern in the real task",
        body: "Use readable line breaks and heading structure to reduce return-sweep effort.",
        visual: {
          type: "rule",
          statement: "Useful structure follows user intent",
        },
      },
    ],
  },
  {
    id: "DUq6b_ADWMz",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DUq6b_ADWMz/",
      creator: "@designparser",
      publishedAt: "2026-02-12",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Put Critical Messages in the Content Flow",
    summary:
      "An interface-attention study warning that banner-like placement can be filtered out during task scanning, so consequential information should be integrated with the decision it affects.",
    principles: [
      "Users can learn to ignore visually conventional banner regions.",
      "A message is more likely to be considered when it appears where its consequence is understood.",
    ],
    applications: [
      "Place critical feedback beside the action or content it changes.",
      "Use interruption patterns sparingly and verify notice in task testing.",
    ],
    uncertainties: [
      "Banner blindness varies by audience, task, design, and message relevance.",
      "Only the opening banner-heavy page was frame-verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 4,
        label: "Banner-like regions are introduced as easy to ignore",
      },
      {
        start: 4,
        end: 10,
        label: "Scanning patterns are proposed as the mechanism",
      },
      {
        start: 10,
        end: 15,
        label: "Integration with content flow is recommended",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Design study",
        title: "A banner can be present and still be skipped",
        body: "An interface-attention study warning that banner-like placement can be filtered out during task scanning, so consequential information should be integrated with the decision it affects.",
        visual: {
          type: "comparison",
          before: "Source claim",
          after: "Context-aware interpretation",
        },
      },
      {
        kind: "problem",
        eyebrow: "Failure mode",
        title: "Conventional placement can become a learned blind spot",
        body: "Users can learn to ignore visually conventional banner regions.",
        visual: {
          type: "layers",
          items: ["Interface context", "User goal", "Visible cue"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Working principle",
        title: "Connect notice to task context",
        body: "A message is more likely to be considered when it appears where its consequence is understood.",
        visual: {
          type: "rule",
          statement: "Context determines the appropriate design choice",
        },
      },
      {
        kind: "application",
        eyebrow: "Applied practice",
        title: "Place critical feedback where the decision occurs",
        body: "Place critical feedback beside the action or content it changes.",
        visual: {
          type: "sequence",
          items: [
            "Identify task",
            "Choose structure",
            "Test context",
            "Refine",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Test the pattern in the real task",
        body: "Use interruption patterns sparingly and verify notice in task testing.",
        visual: {
          type: "rule",
          statement: "Useful structure follows user intent",
        },
      },
    ],
  },
  {
    id: "DUlt_3gDV9X",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DUlt_3gDV9X/",
      creator: "@designparser",
      publishedAt: "2026-02-10",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Design the Center Without Treating It as a Law",
    summary:
      "A layout study treating central placement as a useful attention baseline while rejecting the source’s stronger biological certainty and preserving edge space for supporting controls.",
    principles: [
      "Central placement can help establish a primary focal area.",
      "Hierarchy still depends on task, content, contrast, reading direction, and surrounding layout.",
    ],
    applications: [
      "Reserve the center for the page’s primary decision when that supports the task.",
      "Move utilities to secondary regions without making them hard to find.",
    ],
    uncertainties: [
      "The source’s hardwired center-bias claim is overbroad and not supported here.",
      "Only the opening centered-page illustration was frame-verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 4,
        label: "The source makes a biological center-bias claim",
      },
      {
        start: 4,
        end: 8,
        label: "Center and edge roles are proposed",
      },
      {
        start: 8,
        end: 12,
        label: "The center is linked to conversion",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Design study",
        title: "The center is a strong layout option, not a rule",
        body: "A layout study treating central placement as a useful attention baseline while rejecting the source’s stronger biological certainty and preserving edge space for supporting controls.",
        visual: {
          type: "comparison",
          before: "Source claim",
          after: "Context-aware interpretation",
        },
      },
      {
        kind: "problem",
        eyebrow: "Failure mode",
        title: "A central focal area can crowd supporting work",
        body: "Central placement can help establish a primary focal area.",
        visual: {
          type: "layers",
          items: ["Interface context", "User goal", "Visible cue"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Working principle",
        title: "Assign visual priority before choosing a region",
        body: "Hierarchy still depends on task, content, contrast, reading direction, and surrounding layout.",
        visual: {
          type: "rule",
          statement: "Context determines the appropriate design choice",
        },
      },
      {
        kind: "application",
        eyebrow: "Applied practice",
        title: "Use center and edges according to task importance",
        body: "Reserve the center for the page’s primary decision when that supports the task.",
        visual: {
          type: "sequence",
          items: [
            "Identify task",
            "Choose structure",
            "Test context",
            "Refine",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Test the pattern in the real task",
        body: "Move utilities to secondary regions without making them hard to find.",
        visual: {
          type: "rule",
          statement: "Useful structure follows user intent",
        },
      },
    ],
  },
  {
    id: "DUje_dlDakf",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DUje_dlDakf/",
      creator: "@designparser",
      publishedAt: "2026-02-09",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Use Color Cues With Context and Care",
    summary:
      "A color-communication study showing how repeated color associations can guide attention and expectation, while recognizing that meanings are cultural, contextual, and not a license to manipulate.",
    principles: [
      "Color can signal urgency, calm, attention, or category through learned associations.",
      "Repeated use matters more than isolated color choice, but meaning varies across context and culture.",
    ],
    applications: [
      "Use color to reinforce a clear action or status meaning.",
      "Pair color with text, icons, and accessible contrast rather than relying on association alone.",
    ],
    uncertainties: [
      "The source assigns overly broad emotional meanings to red, blue, and yellow.",
      "Claims about appetite, sales, finance, and technology are examples rather than universal effects.",
      "Only the opening color-swatch composition was frame-verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 3.04,
        label: "Color is framed as an influence on emotion",
      },
      {
        start: 3.04,
        end: 16,
        label: "Several common associations are proposed",
      },
      {
        start: 16,
        end: 20.48,
        label: "Repetition and culture qualify the claim",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Design study",
        title: "Color can guide interpretation without deciding it",
        body: "A color-communication study showing how repeated color associations can guide attention and expectation, while recognizing that meanings are cultural, contextual, and not a license to manipulate.",
        visual: {
          type: "comparison",
          before: "Source claim",
          after: "Context-aware interpretation",
        },
      },
      {
        kind: "problem",
        eyebrow: "Failure mode",
        title: "A familiar cue can become a shortcut or stereotype",
        body: "Color can signal urgency, calm, attention, or category through learned associations.",
        visual: {
          type: "layers",
          items: ["Interface context", "User goal", "Visible cue"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Working principle",
        title: "Build meaning through consistent accessible signals",
        body: "Repeated use matters more than isolated color choice, but meaning varies across context and culture.",
        visual: {
          type: "rule",
          statement: "Context determines the appropriate design choice",
        },
      },
      {
        kind: "application",
        eyebrow: "Applied practice",
        title: "Use color with labels, contrast, and cultural testing",
        body: "Use color to reinforce a clear action or status meaning.",
        visual: {
          type: "sequence",
          items: [
            "Identify task",
            "Choose structure",
            "Test context",
            "Refine",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Test the pattern in the real task",
        body: "Pair color with text, icons, and accessible contrast rather than relying on association alone.",
        visual: {
          type: "rule",
          statement: "Useful structure follows user intent",
        },
      },
    ],
  },
  {
    id: "DUbdEXgjRc5",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DUbdEXgjRc5/",
      creator: "@designparser",
      publishedAt: "2026-02-06",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Align Icons by Visible Shape",
    summary:
      "An optical-alignment study showing why an icon’s bounding box can be a weak guide and why visible shape, neighboring text, and component context should determine the final position.",
    principles: [
      "Geometric centering can look wrong when visible icon mass is uneven.",
      "Optical adjustments should be tested against the actual icon and text rather than treated as a fixed offset.",
    ],
    applications: [
      "Start with layout alignment, then compare visible mass at the delivery size.",
      "Test varied icon silhouettes and keep touch-target geometry independent from optical correction.",
    ],
    uncertainties: [
      "The source’s cap-height and 0.1–0.2 em values are contextual heuristics, not universal rules.",
      "Only the opening icon-and-label example was frame-verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 3.68,
        label: "Geometric centering is challenged",
      },
      {
        start: 3.68,
        end: 8.08,
        label: "Visible-shape alignment and an offset are proposed",
      },
      {
        start: 8.64,
        end: 14.4,
        label: "Optical balance is preferred over layout math",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Design study",
        title: "An icon box can be centered while its shape feels off",
        body: "An optical-alignment study showing why an icon’s bounding box can be a weak guide and why visible shape, neighboring text, and component context should determine the final position.",
        visual: {
          type: "comparison",
          before: "Source claim",
          after: "Context-aware interpretation",
        },
      },
      {
        kind: "problem",
        eyebrow: "Failure mode",
        title: "Bounding boxes hide visual mass",
        body: "Geometric centering can look wrong when visible icon mass is uneven.",
        visual: {
          type: "layers",
          items: ["Interface context", "User goal", "Visible cue"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Working principle",
        title: "Judge alignment in the assembled component",
        body: "Optical adjustments should be tested against the actual icon and text rather than treated as a fixed offset.",
        visual: {
          type: "rule",
          statement: "Context determines the appropriate design choice",
        },
      },
      {
        kind: "application",
        eyebrow: "Applied practice",
        title: "Test visible balance across real icons",
        body: "Start with layout alignment, then compare visible mass at the delivery size.",
        visual: {
          type: "sequence",
          items: [
            "Identify task",
            "Choose structure",
            "Test context",
            "Refine",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Test the pattern in the real task",
        body: "Test varied icon silhouettes and keep touch-target geometry independent from optical correction.",
        visual: {
          type: "rule",
          statement: "Useful structure follows user intent",
        },
      },
    ],
  },
  {
    id: "DUY2FxrDR3a",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DUY2FxrDR3a/",
      creator: "@designparser",
      publishedAt: "2026-02-05",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Reduce List Overload With Meaningful Grouping",
    summary:
      "A selection-interface study showing how long identical rows can create overload and proposing grouping, recognizable cues, and adequately sized targets to support scanning and choice.",
    principles: [
      "Grouping can reduce the effort required to scan a long set of options.",
      "Recognizable labels and cues should support, not replace, clear information structure.",
    ],
    applications: [
      "Chunk options by a decision-relevant category.",
      "Use adequate target sizes and test dense lists with real content and assistive technology.",
    ],
    uncertainties: [
      "The source’s dual-coding and speed claims are not supported with study conditions.",
      "Cards are not automatically better than rows; structure depends on the task and density.",
      "Only the opening category-list interface was frame-verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 3.52,
        label: "Identical rows are linked to overload",
      },
      {
        start: 3.52,
        end: 6.96,
        label: "Grouping and cards are proposed",
      },
      {
        start: 6.96,
        end: 11.92,
        label: "Targets and density are discussed",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Design study",
        title: "A long list can make categories hard to compare",
        body: "A selection-interface study showing how long identical rows can create overload and proposing grouping, recognizable cues, and adequately sized targets to support scanning and choice.",
        visual: {
          type: "comparison",
          before: "Source claim",
          after: "Context-aware interpretation",
        },
      },
      {
        kind: "problem",
        eyebrow: "Failure mode",
        title: "Uniform rows can hide useful grouping",
        body: "Grouping can reduce the effort required to scan a long set of options.",
        visual: {
          type: "layers",
          items: ["Interface context", "User goal", "Visible cue"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Working principle",
        title: "Group choices around the decision",
        body: "Recognizable labels and cues should support, not replace, clear information structure.",
        visual: {
          type: "rule",
          statement: "Context determines the appropriate design choice",
        },
      },
      {
        kind: "application",
        eyebrow: "Applied practice",
        title: "Use structure and targets to lower scanning effort",
        body: "Chunk options by a decision-relevant category.",
        visual: {
          type: "sequence",
          items: [
            "Identify task",
            "Choose structure",
            "Test context",
            "Refine",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Test the pattern in the real task",
        body: "Use adequate target sizes and test dense lists with real content and assistive technology.",
        visual: {
          type: "rule",
          statement: "Useful structure follows user intent",
        },
      },
    ],
  },
  {
    id: "DUUCoF4DUST",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DUUCoF4DUST/",
      creator: "@designparser",
      publishedAt: "2026-02-03",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Make Lists Scannable and Rows Actionable",
    summary:
      "A list-design study connecting left-edge anchors, full-row targets, clear navigation cues, and restrained separation to faster scanning without treating a single attention percentage or height as universal.",
    principles: [
      "Consistent left-side anchors can support rapid scanning in left-to-right layouts.",
      "A whole-row target can reduce pointing effort when the row has one clear destination.",
    ],
    applications: [
      "Make the row action clear and preserve keyboard and screen-reader semantics.",
      "Use either spacing or dividers when they clarify grouping, then test density with real items.",
    ],
    uncertainties: [
      "The 80% attention figure and 44-pixel target value are not universally applicable.",
      "Left-edge guidance depends on directionality and locale.",
      "Only the opening location-list interface was frame-verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 5.12,
        label: "List scanning and left-side anchors are introduced",
      },
      {
        start: 5.12,
        end: 10.64,
        label: "Whole-row targets and target size are proposed",
      },
      {
        start: 10.64,
        end: 18.24,
        label: "Navigation cues and separation are discussed",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Design study",
        title: "Scanning begins with stable anchors",
        body: "A list-design study connecting left-edge anchors, full-row targets, clear navigation cues, and restrained separation to faster scanning without treating a single attention percentage or height as universal.",
        visual: {
          type: "comparison",
          before: "Source claim",
          after: "Context-aware interpretation",
        },
      },
      {
        kind: "problem",
        eyebrow: "Failure mode",
        title: "Small fragmented targets slow list interaction",
        body: "Consistent left-side anchors can support rapid scanning in left-to-right layouts.",
        visual: {
          type: "layers",
          items: ["Interface context", "User goal", "Visible cue"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Working principle",
        title: "Make one row express one destination",
        body: "A whole-row target can reduce pointing effort when the row has one clear destination.",
        visual: {
          type: "rule",
          statement: "Context determines the appropriate design choice",
        },
      },
      {
        kind: "application",
        eyebrow: "Applied practice",
        title: "Use clear targets and restrained separation",
        body: "Make the row action clear and preserve keyboard and screen-reader semantics.",
        visual: {
          type: "sequence",
          items: [
            "Identify task",
            "Choose structure",
            "Test context",
            "Refine",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Test the pattern in the real task",
        body: "Use either spacing or dividers when they clarify grouping, then test density with real items.",
        visual: {
          type: "rule",
          statement: "Useful structure follows user intent",
        },
      },
    ],
  },
  {
    id: "DURV7BBDUBj",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DURV7BBDUBj/",
      creator: "@designparser",
      publishedAt: "2026-02-02",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Balance Icon Families by Optical Mass",
    summary:
      "An icon-system study explaining that equal boxes do not guarantee equal perceived weight, so live-area, stroke, and shape adjustments should be checked as a family at the sizes where they ship.",
    principles: [
      "Circles, squares, strokes, and corners create different apparent masses inside equal boxes.",
      "Optical balancing is a family-level comparison rather than a single geometric rule.",
    ],
    applications: [
      "Define a consistent canvas and live area, then compare silhouettes at small sizes.",
      "Use blur or distance checks as a supplement to detailed visual review.",
    ],
    uncertainties: [
      "The source’s fixed 24, 20, and 2-pixel values are examples, not universal metrics.",
      "Only the opening title state was frame-verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 5.76,
        label: "Canvas and trim dimensions are introduced",
      },
      {
        start: 5.76,
        end: 12.48,
        label: "Visual weight and blur comparison are proposed",
      },
      {
        start: 12.48,
        end: 20.08,
        label: "Stroke and alignment guidance is offered",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Design study",
        title: "Equal icon boxes can carry unequal visual mass",
        body: "An icon-system study explaining that equal boxes do not guarantee equal perceived weight, so live-area, stroke, and shape adjustments should be checked as a family at the sizes where they ship.",
        visual: {
          type: "comparison",
          before: "Source claim",
          after: "Context-aware interpretation",
        },
      },
      {
        kind: "problem",
        eyebrow: "Failure mode",
        title: "Shape differences make geometric consistency feel uneven",
        body: "Circles, squares, strokes, and corners create different apparent masses inside equal boxes.",
        visual: {
          type: "layers",
          items: ["Interface context", "User goal", "Visible cue"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Working principle",
        title: "Balance a family at the size it ships",
        body: "Optical balancing is a family-level comparison rather than a single geometric rule.",
        visual: {
          type: "rule",
          statement: "Context determines the appropriate design choice",
        },
      },
      {
        kind: "application",
        eyebrow: "Applied practice",
        title: "Compare silhouettes before finalizing geometry",
        body: "Define a consistent canvas and live area, then compare silhouettes at small sizes.",
        visual: {
          type: "sequence",
          items: [
            "Identify task",
            "Choose structure",
            "Test context",
            "Refine",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Test the pattern in the real task",
        body: "Use blur or distance checks as a supplement to detailed visual review.",
        visual: {
          type: "rule",
          statement: "Useful structure follows user intent",
        },
      },
    ],
  },
  {
    id: "DUJHCrbjULb",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DUJHCrbjULb/",
      creator: "@designparser",
      publishedAt: "2026-01-30",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Give Each Card One Primary Job",
    summary:
      "A card-design study advocating a focused topic, clear hierarchy, predictable placement of key information and actions, and a whole-card target only when the card represents one destination.",
    principles: [
      "Cards become harder to scan when multiple unrelated topics compete inside one container.",
      "Consistent hierarchy and action placement support comparison across a collection.",
    ],
    applications: [
      "Use concise descriptions and make the card’s primary action unambiguous.",
      "Choose padding, gaps, and dividers for the structure they clarify, then preserve accessible interaction semantics.",
    ],
    uncertainties: [
      "The source’s three-line maximum and universal whole-card rule are contextual heuristics.",
      "Only the opening multi-card example was frame-verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 5,
        label: "One card and concise description are proposed",
      },
      {
        start: 5,
        end: 11,
        label: "Hierarchy and placement guide scanning",
      },
      {
        start: 11,
        end: 18,
        label: "Spacing and whole-card actions are discussed",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Design study",
        title: "A card needs one dominant subject",
        body: "A card-design study advocating a focused topic, clear hierarchy, predictable placement of key information and actions, and a whole-card target only when the card represents one destination.",
        visual: {
          type: "comparison",
          before: "Source claim",
          after: "Context-aware interpretation",
        },
      },
      {
        kind: "problem",
        eyebrow: "Failure mode",
        title: "Mixed goals create clutter and ambiguous actions",
        body: "Cards become harder to scan when multiple unrelated topics compete inside one container.",
        visual: {
          type: "layers",
          items: ["Interface context", "User goal", "Visible cue"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Working principle",
        title: "Establish a repeatable information hierarchy",
        body: "Consistent hierarchy and action placement support comparison across a collection.",
        visual: {
          type: "rule",
          statement: "Context determines the appropriate design choice",
        },
      },
      {
        kind: "application",
        eyebrow: "Applied practice",
        title: "Use a whole-card target only for one destination",
        body: "Use concise descriptions and make the card’s primary action unambiguous.",
        visual: {
          type: "sequence",
          items: [
            "Identify task",
            "Choose structure",
            "Test context",
            "Refine",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Test the pattern in the real task",
        body: "Choose padding, gaps, and dividers for the structure they clarify, then preserve accessible interaction semantics.",
        visual: {
          type: "rule",
          statement: "Useful structure follows user intent",
        },
      },
    ],
  },
  {
    id: "DUHM5DHDcJs",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DUHM5DHDcJs/",
      creator: "@designparser",
      publishedAt: "2026-01-29",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Make Progress Indicators Explain State",
    summary:
      "A feedback study distinguishing active, paused, and complete states in progress indicators, then recommending timely appearance, useful labels, and visual proportions that support rather than exaggerate expectation.",
    principles: [
      "Motion and static position can communicate different process states.",
      "A progress value is credible only when it represents meaningful work and is paired with understandable status.",
    ],
    applications: [
      "Show progress when waiting is material and communicate state changes explicitly.",
      "Use numeric or descriptive feedback when it improves prediction, and test the indicator with actual wait times.",
    ],
    uncertainties: [
      "The one-second, 4–8 pixel, and 80% values are heuristics rather than universal standards.",
      "Only the opening progress-bar state was frame-verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 4.72,
        label: "Motion and static progress states are distinguished",
      },
      {
        start: 4.72,
        end: 8,
        label: "Timing and numeric feedback are proposed",
      },
      {
        start: 8,
        end: 14.24,
        label: "Thickness and motivational threshold claims are made",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Design study",
        title: "A bar must describe process state, not merely decorate waiting",
        body: "A feedback study distinguishing active, paused, and complete states in progress indicators, then recommending timely appearance, useful labels, and visual proportions that support rather than exaggerate expectation.",
        visual: {
          type: "comparison",
          before: "Source claim",
          after: "Context-aware interpretation",
        },
      },
      {
        kind: "problem",
        eyebrow: "Failure mode",
        title: "Ambiguous motion can make status hard to interpret",
        body: "Motion and static position can communicate different process states.",
        visual: {
          type: "layers",
          items: ["Interface context", "User goal", "Visible cue"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Working principle",
        title: "Pair progress with meaningful state and timing",
        body: "A progress value is credible only when it represents meaningful work and is paired with understandable status.",
        visual: {
          type: "rule",
          statement: "Context determines the appropriate design choice",
        },
      },
      {
        kind: "application",
        eyebrow: "Applied practice",
        title: "Use feedback that helps people predict the wait",
        body: "Show progress when waiting is material and communicate state changes explicitly.",
        visual: {
          type: "sequence",
          items: [
            "Identify task",
            "Choose structure",
            "Test context",
            "Refine",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "Test the pattern in the real task",
        body: "Use numeric or descriptive feedback when it improves prediction, and test the indicator with actual wait times.",
        visual: {
          type: "rule",
          statement: "Useful structure follows user intent",
        },
      },
    ],
  },
  {
    id: "DUB_PzfDcpN",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DUB_PzfDcpN/",
      creator: "@designparser",
      publishedAt: "2026-01-27",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Separate Navigation from Action",
    summary:
      "A mobile-navigation study separating persistent destinations from a prominent creation action, while using labels, one active state, and reachable placement to make the current location and available action unambiguous.",
    principles: [
      "Tabs communicate location among peer destinations, while a floating action button communicates a distinct high-priority action.",
      "Labels and a single active treatment reduce the interpretation required from icons alone.",
      "Reachability depends on device, posture, handedness, and the rest of the interface rather than one universal thumb zone.",
    ],
    applications: [
      "Rank the primary destinations before deciding how many belong in the persistent tab bar.",
      "Give each tab a clear label, reserve one active state for the current destination, and visually separate the primary action.",
      "Test bottom controls on representative devices with one-handed and assistive-technology use.",
    ],
    uncertainties: [
      "Three to five tabs is a common heuristic, not a fixed limit for every information architecture.",
      "The source's thumb-zone guidance does not account for device size, handedness, posture, or accessibility needs.",
      "Only the opening navigation bar with labeled and unlabeled icon examples was frame-verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 3.52,
        label: "Navigation confusion and a tab-count heuristic are introduced",
      },
      {
        start: 3.52,
        end: 6.88,
        label: "Labels and reachable placement are recommended",
      },
      {
        start: 6.88,
        end: 11.52,
        label: "Active state, primary action, and location roles are separated",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Navigation study",
        title: "A bottom bar must explain both place and possibility",
        body: "Persistent destinations and the primary action become easier to understand when they do not compete for the same visual role.",
        visual: {
          type: "comparison",
          before: "Six equal icon controls",
          after: "Labeled destinations plus one distinct action",
        },
      },
      {
        kind: "problem",
        eyebrow: "Failure mode",
        title: "Icons alone turn navigation into recall",
        body: "Too many peers, missing labels, and competing highlights make people decode the bar before moving through it.",
        visual: {
          type: "layers",
          items: ["Too many peers", "Missing labels", "Competing active cues"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Role clarity",
        title: "Let tabs answer where and the action button answer what now",
        body: "One control family represents location; the other represents the most important immediate action.",
        visual: {
          type: "rule",
          statement: "Tabs = location; primary button = action",
        },
      },
      {
        kind: "application",
        eyebrow: "Bar audit",
        title: "Build the bar from destination priority",
        body: "Choose the persistent destinations first, label them, mark one current location, then place the distinct action within tested reach.",
        visual: {
          type: "sequence",
          items: [
            "Rank destinations",
            "Label icons",
            "Mark one active tab",
            "Test action reach",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Working rule",
        title: "A calm tab bar gives every control one job",
        body: "Keep destination choice, current location, and the primary action visually distinct even when they share the same edge of the screen.",
        visual: {
          type: "rule",
          statement: "One destination set + one distinct action",
        },
      },
    ],
  },
  {
    id: "DT_OIgPDMEc",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DT_OIgPDMEc/",
      creator: "@designparser",
      publishedAt: "2026-01-26",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Pair Typefaces Through Shared Structure",
    summary:
      "A font-pairing study balancing shared proportions and rhythm with enough stylistic contrast to assign clear roles, using x-height, stroke character, spacing, and family relationships as concrete comparison points.",
    principles: [
      "A stable pairing combines structural compatibility with a visible difference in role or voice.",
      "X-height, apparent weight, spacing, and texture should be compared in the actual sizes and content where the pair will appear.",
      "Related families can simplify coordination, but contrast still needs to be intentionally assigned.",
    ],
    applications: [
      "Set the same sample text in both candidates and compare lowercase scale, density, stroke color, and spacing.",
      "Assign one face to sustained reading and the other to a specific display or accent role.",
      "Test the pair across headings, paragraphs, labels, and numerals before adopting it as a system.",
    ],
    uncertainties: [
      "The spoken record appears to render 'sans serif' as 'sound serif' in several places; the draft uses the visually and contextually supported category name.",
      "Genre pairings such as serif with sans serif or script with sans serif are examples, not formulas for harmony.",
      "The claim that superfamilies work best is contextual; closely related styles can also lack useful contrast.",
      "Only the opening Comic Sans and Didot pairing was frame-verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 4.8,
        label: "Pairing harmony is defined as common ground plus difference",
      },
      {
        start: 4.8,
        end: 9.44,
        label: "X-height, stroke weight, and spacing are proposed as checks",
      },
      {
        start: 9.44,
        end: 22.24,
        label: "Several contrasting genre pairings and roles are described",
      },
      {
        start: 22.24,
        end: 24.48,
        label: "Shared metrics in related families are recommended",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Type pairing",
        title: "Harmony needs common ground and a visible difference",
        body: "Two typefaces can coordinate through proportion and rhythm while still speaking with distinct voices.",
        visual: {
          type: "comparison",
          before: "Unrelated scale and texture",
          after: "Shared rhythm, distinct roles",
        },
      },
      {
        kind: "problem",
        eyebrow: "Mismatch",
        title: "Two attractive faces can still argue on the page",
        body: "Conflicting lowercase scale, density, or spacing makes the reader experience the pair as accidental rather than coordinated.",
        visual: {
          type: "layers",
          items: [
            "Lowercase scale",
            "Stroke color",
            "Spacing rhythm",
            "Assigned role",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Compatibility",
        title: "Match structure before judging style labels",
        body: "Compare x-height, apparent weight, texture, and spacing in context; then decide whether the remaining contrast serves the hierarchy.",
        visual: {
          type: "rule",
          statement: "Compatible metrics + purposeful contrast = useful pair",
        },
      },
      {
        kind: "application",
        eyebrow: "Pairing proof",
        title: "Test both faces in the roles they will own",
        body: "A heading and paragraph specimen reveals relationships that separate font previews hide.",
        visual: {
          type: "sequence",
          items: [
            "Set shared text",
            "Normalize size",
            "Assign roles",
            "Compare full hierarchy",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Pairing rule",
        title:
          "Let one relationship stabilize the pair and one difference explain it",
        body: "A successful pairing is neither identical nor random: its common structure holds the system together while contrast clarifies use.",
        visual: {
          type: "rule",
          statement: "Share the rhythm; separate the voice",
        },
      },
    ],
  },
  {
    id: "DT8h80fjelp",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DT8h80fjelp/",
      creator: "@designparser",
      publishedAt: "2026-01-25",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Choose Type for the Intended Voice",
    summary:
      "A typography study treating serif, sans-serif, script, and display forms as signals shaped by convention, then turning those broad associations into a contextual selection process rather than fixed emotional guarantees.",
    principles: [
      "Letterform structure and repeated cultural use contribute to the voice readers perceive.",
      "Broad type categories contain substantial variation, so the actual family matters more than the category label alone.",
      "Credibility comes from alignment among content, audience, medium, and typographic behavior.",
    ],
    applications: [
      "Describe the intended voice in specific terms before browsing typefaces.",
      "Compare representative families using real headlines, paragraphs, labels, and names.",
      "Validate tone and legibility with the intended audience instead of relying only on genre associations.",
    ],
    uncertainties: [
      "Claims that serif, sans-serif, script, and display categories trigger specific emotions are broad associations rather than universal responses.",
      "Perception varies with family design, language, culture, content, and prior exposure.",
      "Only the opening brain-and-type statement was frame-verified; the later category examples were not independently captured.",
    ],
    evidence: [
      {
        start: 0,
        end: 5.64,
        label: "Serif forms are associated with authority and trust",
      },
      {
        start: 5.64,
        end: 9.96,
        label: "Sans-serif forms are associated with innovation and clarity",
      },
      {
        start: 9.96,
        end: 15.56,
        label:
          "Script and display forms are assigned personality and impact roles",
      },
      {
        start: 15.56,
        end: 17.72,
        label: "A poor match is linked to lost credibility",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Typographic voice",
        title: "Letterforms arrive with learned associations",
        body: "Readers interpret shape, contrast, rhythm, and familiarity together when they form an impression of a typeface.",
        visual: {
          type: "layers",
          items: [
            "Letterform shape",
            "Cultural convention",
            "Content context",
            "Reader experience",
          ],
        },
      },
      {
        kind: "problem",
        eyebrow: "Category shortcut",
        title: "A genre label cannot predict a reader's response",
        body: "Two serif families can carry different voices, and the same family can read differently across language, scale, and subject.",
        visual: {
          type: "comparison",
          before: "Serif means trustworthy",
          after: "This family fits this message",
        },
      },
      {
        kind: "principle",
        eyebrow: "Contextual fit",
        title: "Select the family, not the stereotype",
        body: "Treat category associations as hypotheses, then inspect the actual design against the intended voice and reading conditions.",
        visual: {
          type: "rule",
          statement: "Form + context + audience determine perceived voice",
        },
      },
      {
        kind: "application",
        eyebrow: "Voice test",
        title: "Compare real words before naming an emotional effect",
        body: "Use production content and representative readers to evaluate whether tone and legibility work together.",
        visual: {
          type: "sequence",
          items: [
            "Name intended voice",
            "Choose varied families",
            "Set real content",
            "Ask representative readers",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Selection rule",
        title: "Typography earns credibility when its voice fits its message",
        body: "Use conventions as a starting vocabulary, then let the actual family, content, and audience decide the choice.",
        visual: {
          type: "rule",
          statement: "Choose by demonstrated fit, not category mythology",
        },
      },
    ],
  },
  {
    id: "DT3rY5ajS4U",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DT3rY5ajS4U/",
      creator: "@designparser",
      publishedAt: "2026-01-23",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Give Buttons a Coherent Physical Profile",
    summary:
      "A depth study distinguishing flat, surface-level, raised, highly elevated, and inset button treatments, with edge lighting establishing the physical profile and shadows supporting that profile afterward.",
    principles: [
      "Edge highlights and occlusion cues establish whether a control sits on, above, or below a surface.",
      "A coherent light direction must govern highlights, inset edges, and cast shadows together.",
      "Depth should clarify interaction state or hierarchy rather than decorate every control.",
    ],
    applications: [
      "Define a small set of button profiles tied to interaction roles and states.",
      "Draw top and bottom edge behavior from one light model before adding a cast shadow.",
      "Compare default, hover, pressed, and disabled states on the actual background and at delivery size.",
    ],
    uncertainties: [
      "The five named profiles are one useful taxonomy, not a universal component-state model.",
      "The source does not distinguish how depth cues should change across dark themes, materials, or accessibility modes.",
      "The opening frame verifies three blue button depth treatments, not every later profile.",
    ],
    evidence: [
      {
        start: 0,
        end: 6,
        label: "Button confusion and flat treatment are introduced",
      },
      {
        start: 6,
        end: 12,
        label: "Surface, raised, and high-elevation profiles are distinguished",
      },
      {
        start: 12,
        end: 16,
        label: "Inset lighting and lower-edge glow are described",
      },
      {
        start: 16,
        end: 20,
        label: "Edges are prioritized before shadows",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Button depth",
        title: "A control's edges tell the surface story first",
        body: "Highlights, occlusion, and cast shadow combine to place a button on, above, or inside its surrounding plane.",
        visual: {
          type: "comparison",
          before: "Same fill, arbitrary shadow",
          after: "Profile-led edges and shadow",
        },
      },
      {
        kind: "problem",
        eyebrow: "False depth",
        title: "A shadow cannot repair contradictory edges",
        body: "If top and bottom cues imply different light directions, the button reads as a stack of effects instead of one object.",
        visual: {
          type: "layers",
          items: [
            "Surface plane",
            "Top-edge light",
            "Bottom occlusion",
            "Cast shadow",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Physical profile",
        title: "Choose the elevation relationship before styling the shadow",
        body: "Flat, raised, and inset controls need different edge logic because they occupy different positions relative to the surface.",
        visual: {
          type: "rule",
          statement: "Surface relationship → edge behavior → shadow",
        },
      },
      {
        kind: "application",
        eyebrow: "State construction",
        title: "Build one light model across the full button set",
        body: "Start with the plane, define the profile for each state, then tune shadow and contrast on the final background.",
        visual: {
          type: "sequence",
          items: [
            "Set light direction",
            "Choose surface relation",
            "Draw edge cues",
            "Add supporting shadow",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Depth rule",
        title: "Edges establish elevation; shadows only confirm it",
        body: "Make the control's contact with the surface legible before using blur and opacity to reinforce distance.",
        visual: {
          type: "rule",
          statement: "Profile first, shadow second",
        },
      },
    ],
  },
  {
    id: "DT0gnIsjSnp",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DT0gnIsjSnp/",
      creator: "@designparser",
      publishedAt: "2026-01-22",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Build Shadows as an Elevation System",
    summary:
      "A shadow-system study using blur and opacity to express distance and intensity, then combining broad separation and tight contact cues so a small set of elevation tokens reads consistently.",
    principles: [
      "Blur, offset, spread, and opacity work together; no single value describes elevation by itself.",
      "A broad soft component can suggest separation while a tighter contact component anchors the object to its surface.",
      "A useful elevation scale contains only as many levels as the interface can reliably distinguish.",
    ],
    applications: [
      "Define shadow tokens from semantic elevation roles rather than isolated visual samples.",
      "Use one light direction and tune both separation and contact components on each production background.",
      "Compare adjacent levels at delivery size and remove values that do not create a perceptible role change.",
    ],
    uncertainties: [
      "Five elevation levels is a heuristic rather than a necessary count.",
      "The spoken labels for the primary and ambient components are ambiguous; the draft preserves the observable functions of broad separation and tight contact instead of asserting those names.",
      "Only the opening stack of five shadowed blue tiles was frame-verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 5.52,
        label: "Blur and opacity are assigned distance and intensity roles",
      },
      {
        start: 5.52,
        end: 11.52,
        label:
          "A five-level scale and a two-component construction are proposed",
      },
      {
        start: 12.24,
        end: 16.16,
        label: "A tighter contact component is described",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Shadow hierarchy",
        title: "A shadow scale must show meaningful changes in distance",
        body: "Elevation becomes systematic when each token represents a distinct relationship between object, surface, and light.",
        visual: {
          type: "layers",
          items: [
            "Surface",
            "Contact cue",
            "Separation cue",
            "Elevated object",
          ],
        },
      },
      {
        kind: "problem",
        eyebrow: "Token drift",
        title: "Unrelated blur and opacity values create decorative noise",
        body: "When adjacent levels do not share a light model or visible progression, the shadow scale stops communicating hierarchy.",
        visual: {
          type: "comparison",
          before: "Five unrelated effects",
          after: "Five ordered surface distances",
        },
      },
      {
        kind: "principle",
        eyebrow: "Two functions",
        title: "Separate contact from atmospheric distance",
        body: "A tight component anchors the object while a broader component carries the sense of separation.",
        visual: {
          type: "rule",
          statement: "Tight contact + broad separation = legible elevation",
        },
      },
      {
        kind: "application",
        eyebrow: "Token construction",
        title: "Tune adjacent elevations as one family",
        body: "Assign semantic levels, build both shadow components, then compare the entire ladder on every supported surface.",
        visual: {
          type: "sequence",
          items: [
            "Name elevation roles",
            "Set light direction",
            "Tune two components",
            "Remove indistinct levels",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "System rule",
        title:
          "Keep only shadow levels that communicate a different surface relationship",
        body: "A smaller perceptible ladder is more useful than a dense scale whose neighboring tokens look interchangeable.",
        visual: {
          type: "rule",
          statement: "Distinct elevation role or no new token",
        },
      },
    ],
  },
  {
    id: "DTv9DGRjafS",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DTv9DGRjafS/",
      creator: "@designparser",
      publishedAt: "2026-01-20",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Make Depth Follow One Light Model",
    summary:
      "A compact depth study arguing that a consistent overhead light, coherent edge cues, supporting shadows, and surface-aware tuning make elevated interface elements feel related rather than artificially pasted on.",
    principles: [
      "Every highlight, edge, and cast shadow should agree on the light direction.",
      "Edges establish the object's elevation relationship before the shadow reinforces it.",
      "The same elevation needs different shadow tuning on light, dark, textured, and colored surfaces.",
    ],
    applications: [
      "Declare a light direction for the component system and audit conflicting edge cues.",
      "Establish the object's surface contact before adjusting shadow blur, offset, and opacity.",
      "Test elevation tokens on every supported background instead of copying one shadow unchanged.",
    ],
    uncertainties: [
      "A single overhead light is a simplifying convention, not a physical requirement for every visual style.",
      "The source does not specify how material, color, contrast, or motion changes the depth model.",
      "The opening frame verifies two blue button treatments, not the later surface adaptations.",
    ],
    evidence: [
      {
        start: 0,
        end: 3.12,
        label:
          "Artificial depth and an overhead light convention are introduced",
      },
      {
        start: 3.12,
        end: 5.84,
        label: "Edges are placed before supporting shadows",
      },
      {
        start: 5.84,
        end: 7.6,
        label: "Shadow treatment is adapted to the surface",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Depth model",
        title: "Depth feels coherent when every cue shares one light",
        body: "Highlights, edges, and shadows should describe the same object-surface relationship instead of behaving as separate effects.",
        visual: {
          type: "comparison",
          before: "Conflicting edge and shadow",
          after: "One light, one elevation story",
        },
      },
      {
        kind: "problem",
        eyebrow: "Pasted-on effect",
        title: "A borrowed shadow ignores the surface beneath it",
        body: "The same blur and opacity can disappear on one background and become too forceful on another.",
        visual: {
          type: "layers",
          items: [
            "Surface color",
            "Object edge",
            "Contact zone",
            "Cast shadow",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Cue order",
        title: "Define the edge relationship before tuning the cast shadow",
        body: "The object's boundaries establish elevation; the shadow adds distance and direction without contradicting them.",
        visual: {
          type: "rule",
          statement: "Shared light direction across edge, contact, and shadow",
        },
      },
      {
        kind: "application",
        eyebrow: "Surface audit",
        title: "Retune elevation on every supported background",
        body: "Keep the semantic level stable while adapting contrast, blur, and opacity to the actual surface.",
        visual: {
          type: "sequence",
          items: [
            "Declare light",
            "Set edge cues",
            "Add shadow",
            "Compare surfaces",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Depth rule",
        title:
          "One elevation token can vary visually while preserving its role",
        body: "Adapt the rendering to the surface, but keep its light direction and hierarchy relationship consistent.",
        visual: {
          type: "rule",
          statement: "Stable role, surface-aware rendering",
        },
      },
    ],
  },
  {
    id: "DTtZBNYDZOC",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DTtZBNYDZOC/",
      creator: "@designparser",
      publishedAt: "2026-01-19",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Design Component Relationships Before Pages",
    summary:
      "An atomic-design study reframing interface work as relationships among elements, small component groups, and larger systems, while keeping pages as necessary contexts for validating how those relationships behave together.",
    principles: [
      "Reusable systems emerge from explicit relationships among smaller parts, not from isolated components alone.",
      "Each level of composition should add a meaningful behavior or content relationship.",
      "Pages remain essential integration contexts even when the system is authored from smaller units.",
    ],
    applications: [
      "Inventory repeated elements and identify which combinations carry a stable shared purpose.",
      "Document the inputs, spacing, states, and behaviors that bind parts into a reusable component.",
      "Validate components inside representative pages so local reuse does not create global inconsistency.",
    ],
    uncertainties: [
      "The chemistry metaphor simplifies component systems and does not describe data flow, behavior, ownership, or responsive context.",
      "The instruction to stop designing pages is rhetorical; pages are still required for integration and task validation.",
      "Only the opening crossed-out page composition was frame-verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 3.56,
        label: "Page-first design is contrasted with relationship-first design",
      },
      {
        start: 3.56,
        end: 7.04,
        label:
          "The atomic-design chemistry metaphor and elements are introduced",
      },
      {
        start: 7.04,
        end: 10.16,
        label:
          "Connections and systems are mapped to larger composition levels",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Atomic design",
        title: "A system begins with relationships, not finished screens",
        body: "Elements become useful system parts only when their shared purpose, states, and composition rules are explicit.",
        visual: {
          type: "sequence",
          items: [
            "Element",
            "Component group",
            "Reusable section",
            "Page context",
          ],
        },
      },
      {
        kind: "problem",
        eyebrow: "Page duplication",
        title: "Screen-by-screen work can hide repeated decisions",
        body: "The same input, card, or navigation relationship is redesigned locally when its reusable contract has not been named.",
        visual: {
          type: "comparison",
          before: "Three pages, three local patterns",
          after: "One pattern, three tested contexts",
        },
      },
      {
        kind: "principle",
        eyebrow: "Composition contract",
        title: "Every level must add a relationship",
        body: "A group deserves to become a component when its parts share purpose, state, layout, or behavior that should travel together.",
        visual: {
          type: "rule",
          statement: "Reusable boundary = shared purpose + shared behavior",
        },
      },
      {
        kind: "application",
        eyebrow: "System extraction",
        title: "Move from repeated decisions to tested components",
        body: "Inventory recurring parts, define their relationships, then prove them in representative page contexts.",
        visual: {
          type: "sequence",
          items: [
            "Find repetition",
            "Name relationships",
            "Define component contract",
            "Validate in pages",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "System rule",
        title:
          "Reusable systems grow from tested connections, not isolated atoms",
        body: "Keep the small parts composable, but judge their success in the larger tasks and layouts they must support.",
        visual: {
          type: "rule",
          statement: "Compose small; validate whole",
        },
      },
    ],
  },
  {
    id: "DTq2LqNjdSJ",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DTq2LqNjdSJ/",
      creator: "@designparser",
      publishedAt: "2026-01-18",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Coordinate Spacing and Type on a Shared Rhythm",
    summary:
      "A spacing-system study using an eight-unit rhythm for larger intervals, a four-unit subdivision for finer adjustments, and a coordinated text baseline so layout gaps and typography do not drift into unrelated value sets.",
    principles: [
      "A small shared interval set makes spacing relationships easier to recognize and maintain.",
      "A finer subdivision can support compact details without abandoning the larger rhythm.",
      "Text line-height and placement should be coordinated with spacing tokens rather than forced onto a grid mechanically.",
    ],
    applications: [
      "Inventory current spacing values and map recurring roles to a compact token scale.",
      "Use the larger interval for structural gaps and the smaller subdivision only where density requires it.",
      "Test line-heights and vertical alignment with real typefaces, sizes, languages, and responsive widths.",
    ],
    uncertainties: [
      "Eight- and four-unit intervals are practical conventions, not universal requirements.",
      "The phrase 'eight-point baseline' does not explain how type size, line-height, or font metrics are reconciled.",
      "Only the opening irregular five-unit spacing example was frame-verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 4.96,
        label: "Eight-unit rhythm and four-unit detail are proposed",
      },
      {
        start: 4.96,
        end: 8.48,
        label: "Random values are contrasted with a consistent grid",
      },
      {
        start: 9.04,
        end: 12.8,
        label: "Typography is added to the baseline discussion",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Spacing rhythm",
        title: "A spacing scale turns isolated gaps into relationships",
        body: "Structural and detailed intervals become easier to compare when they derive from a compact shared rhythm.",
        visual: {
          type: "comparison",
          before: "5, 11, 19, 27",
          after: "4, 8, 16, 24",
        },
      },
      {
        kind: "problem",
        eyebrow: "Value drift",
        title: "Random gaps make similar relationships look unrelated",
        body: "When every component invents spacing locally, density and hierarchy become difficult to predict or maintain.",
        visual: {
          type: "layers",
          items: [
            "Local values",
            "Inconsistent rhythm",
            "Unclear hierarchy",
            "Maintenance drift",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Two scales",
        title: "Use a structural rhythm and a deliberate subdivision",
        body: "Larger gaps can follow an eight-unit cadence while four-unit steps handle compact detail without creating a second unrelated system.",
        visual: {
          type: "rule",
          statement: "Structural interval 8; detail subdivision 4",
        },
      },
      {
        kind: "application",
        eyebrow: "Token migration",
        title: "Map roles before replacing every value",
        body: "Group current gaps by purpose, assign the nearest useful token, then check typography and responsive layouts for optical exceptions.",
        visual: {
          type: "sequence",
          items: [
            "Inventory gaps",
            "Group by role",
            "Assign tokens",
            "Check type rhythm",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Spacing rule",
        title:
          "A grid should reduce arbitrary choices without erasing optical judgment",
        body: "Let shared intervals carry the system, then document the few contextual exceptions that make real content align well.",
        visual: {
          type: "rule",
          statement: "Shared rhythm by default; explicit exception by evidence",
        },
      },
    ],
  },
  {
    id: "DTm1dltDW0M",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DTm1dltDW0M/",
      creator: "@designparser",
      publishedAt: "2026-01-17",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Treat User Patience as a Recoverable Resource",
    summary:
      "A user-experience study using a goodwill-reservoir metaphor to show how hidden costs, unclear errors, and format confusion consume patience, while clear paths and immediate feedback can rebuild confidence over time.",
    principles: [
      "Trust is cumulative: repeated small obstacles can matter as much as one obvious failure.",
      "Costs, requirements, and recovery paths should be visible before people commit effort.",
      "Timely feedback restores confidence only when it accurately explains what happened and what comes next.",
    ],
    applications: [
      "Audit a task for surprises, ambiguous errors, format requirements, and delayed confirmation.",
      "Reveal material constraints before submission and make recovery instructions specific to the failed field or action.",
      "Confirm consequential actions promptly and measure whether people can recover without restarting.",
    ],
    uncertainties: [
      "The goodwill reservoir is a design metaphor, not a directly measured or uniformly sized psychological resource.",
      "The source does not distinguish temporary frustration from lasting trust or provide conditions for the refill claim.",
      "Only the opening goodwill-reservoir title state was frame-verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 5.68,
        label:
          "Limited patience and cumulative bad interactions are introduced",
      },
      {
        start: 5.68,
        end: 10.88,
        label: "Hidden costs, unclear errors, and format confusion are named",
      },
      {
        start: 11.52,
        end: 15.76,
        label: "Clear paths and immediate feedback are framed as restorative",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Trust over time",
        title:
          "Every interaction changes the next interaction's starting point",
        body: "People carry the effects of surprises, unclear recovery, and reliable feedback forward through a product relationship.",
        visual: {
          type: "layers",
          items: [
            "Prior experience",
            "Current obstacle",
            "Recovery quality",
            "Next-task confidence",
          ],
        },
      },
      {
        kind: "problem",
        eyebrow: "Trust drain",
        title: "Small hidden obstacles accumulate",
        body: "A surprise cost, vague error, or unexplained format rule forces people to spend effort they could not plan for.",
        visual: {
          type: "sequence",
          items: [
            "Hidden requirement",
            "Failed attempt",
            "Unclear recovery",
            "Lower confidence",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Repair",
        title: "Clarity restores agency before it restores trust",
        body: "Useful feedback names the result, explains the next step, and lets the person recover without discarding completed work.",
        visual: {
          type: "rule",
          statement: "Explain result + preserve progress + provide next step",
        },
      },
      {
        kind: "application",
        eyebrow: "Task audit",
        title: "Find every surprise between intent and completion",
        body: "Trace the real task, expose requirements early, write specific recovery guidance, and verify that confirmation arrives on time.",
        visual: {
          type: "sequence",
          items: [
            "Trace task",
            "Expose constraints",
            "Repair errors",
            "Confirm outcome",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Trust rule",
        title: "Do not ask people to repay the cost of an interface mistake",
        body: "Preserve their work, make the recovery path explicit, and let accurate feedback rebuild confidence one interaction at a time.",
        visual: {
          type: "rule",
          statement: "Interface-caused failure should have low-cost recovery",
        },
      },
    ],
  },
  {
    id: "DTiN7GXDeRX",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DTiN7GXDeRX/",
      creator: "@designparser",
      publishedAt: "2026-01-15",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-14",
    status: "reviewed",
    title: "Use Saturation to Encode Attention Priority",
    summary:
      "A color-hierarchy study reserving low-saturation colors for supporting surfaces, stronger colors for interactive states, and the most intense accents for scarce high-priority moments, while treating the proposed percentages as contextual rather than universal.",
    principles: [
      "When many colors are equally intense, they compete instead of expressing priority.",
      "Supporting surfaces, interactive controls, and brand accents need distinct attention roles rather than one saturation level.",
      "Saturation cannot replace contrast, state redundancy, semantic consistency, or accessibility testing.",
    ],
    applications: [
      "Inventory colors by semantic role and identify where high intensity is currently overused.",
      "Establish restrained supporting colors before assigning stronger interaction and accent colors.",
      "Test every state for contrast, non-color cues, theme behavior, and sustained visual comfort.",
    ],
    uncertainties: [
      "The proposed percentage ranges do not name a color model, overlap substantially, and are not portable as direct token values.",
      "The claim that high saturation tires the eyes is not accompanied by duration, viewing conditions, or audience evidence.",
      "Only the opening cyan square was frame-verified; the neutral, interface, and accent comparisons were not independently captured.",
    ],
    evidence: [
      {
        start: 0,
        end: 5,
        label: "Equal saturation is linked to competing attention",
      },
      {
        start: 5,
        end: 13,
        label: "Different saturation ranges are proposed for three roles",
      },
      {
        start: 13,
        end: 16,
        label: "High saturation is linked to attention and fatigue",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Color hierarchy",
        title: "Intensity is an attention budget",
        body: "A palette becomes easier to scan when supporting, interactive, and accent roles do not all demand equal attention.",
        visual: {
          type: "comparison",
          before: "Five equally intense colors",
          after: "Support, interaction, accent ladder",
        },
      },
      {
        kind: "problem",
        eyebrow: "Color competition",
        title: "Equal intensity flattens semantic priority",
        body: "If background, control, status, and brand color all shout, the interface cannot use color to direct attention.",
        visual: {
          type: "layers",
          items: [
            "Supporting surface",
            "Interactive control",
            "Current state",
            "Scarce accent",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Role ladder",
        title: "Reserve stronger chroma for fewer, clearer moments",
        body: "Low-intensity support creates room for interaction and accent colors to become noticeable without competing everywhere.",
        visual: {
          type: "rule",
          statement: "Frequency decreases as attention intensity increases",
        },
      },
      {
        kind: "application",
        eyebrow: "Palette audit",
        title: "Assign semantic roles before tuning saturation",
        body: "Classify each token, remove unnecessary intensity, then verify contrast and non-color state cues in every theme.",
        visual: {
          type: "sequence",
          items: [
            "Inventory tokens",
            "Assign roles",
            "Reduce competition",
            "Verify states",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Palette rule",
        title:
          "An accent stays meaningful only when the rest of the system leaves it room",
        body: "Use intense color sparingly and deliberately, then support its meaning with contrast, labels, and state structure.",
        visual: {
          type: "rule",
          statement: "Scarce intensity creates useful emphasis",
        },
      },
    ],
  },
  {
    id: "DTgbgtsDWtG",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DTgbgtsDWtG/",
      creator: "@designparser",
      publishedAt: "2026-01-14",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Make Links Findable and Predictive",
    summary:
      "A link-design study combining a persistent visual affordance, descriptive destination text, and complete interaction states so people can find links without relying on color and understand where each link will take them.",
    principles: [
      "Link styling should remain distinguishable without color perception or hover interaction.",
      "A useful label predicts the destination or result instead of naming the gesture.",
      "Default, hover, visited, focus, and active treatments should preserve recognition while communicating state.",
    ],
    applications: [
      "Audit body links in grayscale and with keyboard navigation to confirm that color is not the only cue.",
      "Replace generic phrases with labels that still make sense when read out of surrounding context.",
      "Specify and test every supported link state without removing the visible focus indicator.",
    ],
    uncertainties: [
      "An underline is a strong conventional affordance, but persistent underlining is not the only accessible treatment in every navigation or component context.",
      "The five-state list does not explain how touch-only devices or previously visited sensitive destinations should be handled.",
      "The opening text block was frame-verified, but its intended invisible-link example could not be distinguished independently in the still image.",
    ],
    evidence: [
      {
        start: 0,
        end: 5.76,
        label: "Underlining is proposed and color-only links are rejected",
      },
      {
        start: 5.76,
        end: 9.92,
        label: "Generic and destination-predictive labels are contrasted",
      },
      {
        start: 9.92,
        end: 14.72,
        label: "Five interaction states are enumerated",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Link affordance",
        title: "A link should look interactive before hover",
        body: "People need a durable cue that distinguishes navigation from surrounding prose across mouse, touch, keyboard, and color perception.",
        visual: {
          type: "comparison",
          before: "Blue text with no other cue",
          after: "Descriptive text with persistent affordance",
        },
      },
      {
        kind: "problem",
        eyebrow: "Invisible navigation",
        title: "Color and 'click here' hide different parts of the decision",
        body: "Color-only styling can hide clickability, while a generic label hides the destination even after the link is found.",
        visual: {
          type: "layers",
          items: ["Weak affordance", "Generic wording", "Unknown destination"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Predictive link",
        title: "Show both interaction and destination",
        body: "A visible affordance answers whether text is actionable; a descriptive label answers what navigation will do.",
        visual: {
          type: "rule",
          statement: "Affordance + destination label = predictable link",
        },
      },
      {
        kind: "application",
        eyebrow: "State audit",
        title: "Design the whole link lifecycle",
        body: "Check recognition and contrast in every state, with special attention to keyboard focus and visited-state privacy.",
        visual: {
          type: "sequence",
          items: ["Default", "Hover", "Visited", "Focus", "Active"],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Link rule",
        title:
          "A successful link is findable and predictable before activation",
        body: "Do not make people discover clickability by accident or infer a destination from nearby prose.",
        visual: {
          type: "rule",
          statement: "Find it, understand it, then follow it",
        },
      },
    ],
  },
  {
    id: "DTdj46ojXaO",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DTdj46ojXaO/",
      creator: "@designparser",
      publishedAt: "2026-01-13",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Give Each Screen One Clear Primary Action",
    summary:
      "An action-hierarchy study distinguishing one committing primary action from secondary choices, placing the decision where the task is ready for it, and defining normal, hover, focus, active, and disabled states.",
    principles: [
      "A primary action should express the main commitment for the current task state.",
      "Secondary actions remain available without competing visually with the main next step.",
      "Placement and state styling communicate when an action becomes relevant and whether it is available.",
    ],
    applications: [
      "Name the main commitment on each task screen and demote alternatives that are not equally important.",
      "Place the action after the information required to make the decision rather than before it.",
      "Define keyboard-visible focus and distinguish hover, active, and disabled states without relying on color alone.",
    ],
    uncertainties: [
      "One primary action per screen is a hierarchy heuristic; complex tools can contain multiple coordinated work regions.",
      "The statement that the primary action commits and the secondary action offers choice does not cover destructive, reversible, or multi-step actions.",
      "Only the opening isolated primary button was frame-verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 7.04,
        label: "One primary commitment is distinguished from secondary choice",
      },
      {
        start: 7.04,
        end: 12.08,
        label: "Action placement is tied to the end of the decision flow",
      },
      {
        start: 12.08,
        end: 17.92,
        label: "Five button states are enumerated",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Action hierarchy",
        title: "The primary button should name the screen's commitment",
        body: "One clearly prioritized next step reduces competition while secondary actions preserve legitimate alternatives.",
        visual: {
          type: "comparison",
          before: "Three equal actions",
          after: "One commitment plus two alternatives",
        },
      },
      {
        kind: "problem",
        eyebrow: "Competing next steps",
        title: "Equal emphasis makes every choice look mandatory",
        body: "When all actions carry primary styling, the interface stops explaining which choice advances the task.",
        visual: {
          type: "layers",
          items: ["Main commitment", "Alternative path", "Cancel or defer"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Decision timing",
        title: "Offer commitment after the information it depends on",
        body: "Position reinforces hierarchy when the primary action follows the inputs or review needed to make a sound decision.",
        visual: {
          type: "rule",
          statement:
            "Required information → informed decision → primary action",
        },
      },
      {
        kind: "application",
        eyebrow: "Action system",
        title: "Define priority and state together",
        body: "A clear action role still needs visible feedback across pointer, keyboard, press, and unavailable conditions.",
        visual: {
          type: "sequence",
          items: [
            "Name commitment",
            "Rank alternatives",
            "Place after inputs",
            "Specify five states",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Action rule",
        title: "Primary styling is a promise about the next consequential step",
        body: "Use it once the task has one clear commitment, and let secondary styling carry the remaining choices.",
        visual: {
          type: "rule",
          statement: "One task commitment receives primary emphasis",
        },
      },
    ],
  },
  {
    id: "DTbW_Xdjd-0",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DTbW_Xdjd-0/",
      creator: "@designparser",
      publishedAt: "2026-01-12",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Keep Links and Buttons Semantically Distinct",
    summary:
      "An interaction-semantics study reserving buttons for in-place actions and links for navigation, then combining one clear primary action, adequately sized targets, and destination-predictive link labels.",
    principles: [
      "A button changes the current interface or submits an action; a link moves to another resource or location.",
      "Visual hierarchy should not erase native semantics, keyboard behavior, or expected browser affordances.",
      "Target size and descriptive labels support accurate activation and informed navigation.",
    ],
    applications: [
      "Audit controls by outcome: use a button for state change and a link for navigation.",
      "Preserve native elements and behaviors instead of styling one semantic role to impersonate another.",
      "Test target spacing and rewrite link labels so they predict their destination out of context.",
    ],
    uncertainties: [
      "One primary button is a hierarchy heuristic rather than a universal limit.",
      "The 44-pixel target is common touch guidance, but applicable accessibility requirements and input conditions vary.",
      "The only generated scene image was blank, so none of the later control examples was frame-verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 4.72,
        label: "Buttons are assigned actions and links are assigned navigation",
      },
      {
        start: 4.72,
        end: 8.8,
        label: "One primary action is proposed to reduce competition",
      },
      {
        start: 8.8,
        end: 12.4,
        label: "A target-size heuristic is introduced",
      },
      {
        start: 12.4,
        end: 16.4,
        label: "Link labels are required to predict their destinations",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Control semantics",
        title: "Appearance should not disguise what a control does",
        body: "Links and buttons can share visual weight without exchanging their navigation and action semantics.",
        visual: {
          type: "comparison",
          before: "Link styled as submit action",
          after: "Navigation link beside action button",
        },
      },
      {
        kind: "problem",
        eyebrow: "Role collision",
        title: "One visual style can hide two different outcomes",
        body: "When navigation and state change look and behave alike, keyboard and browser expectations become harder to predict.",
        visual: {
          type: "layers",
          items: [
            "Visual treatment",
            "Native semantics",
            "Expected outcome",
            "Input behavior",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Outcome first",
        title: "Choose the element from the result of activation",
        body: "Navigation remains a link; submitting, toggling, opening, or changing state remains a button.",
        visual: {
          type: "rule",
          statement: "New location = link; in-place action = button",
        },
      },
      {
        kind: "application",
        eyebrow: "Control audit",
        title: "Verify semantics, hierarchy, target, and label",
        body: "A correct element still needs clear priority, adequate activation space, and wording that predicts its result.",
        visual: {
          type: "sequence",
          items: [
            "Name outcome",
            "Choose native element",
            "Set hierarchy",
            "Test target and label",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Semantic rule",
        title: "Let behavior, not decoration, decide between link and button",
        body: "Style the hierarchy after choosing the element whose semantics match the control's real outcome.",
        visual: {
          type: "rule",
          statement: "Correct behavior comes before visual resemblance",
        },
      },
    ],
  },
  {
    id: "DTYzq7Ajfex",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DTYzq7Ajfex/",
      creator: "@designparser",
      publishedAt: "2026-01-11",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Answer Form Questions Before Submission",
    summary:
      "A form-design study treating each field as a set of user questions about purpose, format, and requirement, then answering those questions with clear labels, appropriate formatting help, timely validation, and specific recovery guidance.",
    principles: [
      "A field should communicate what information is needed, whether it is required, and which formats are accepted.",
      "Formatting assistance should reduce correction work without changing data unexpectedly.",
      "Validation is useful when it is timely, specific, accessible, and does not interrupt incomplete input.",
    ],
    applications: [
      "Write persistent labels and concise requirement or format guidance before relying on placeholders.",
      "Use input types and formatting assistance that preserve what the person entered.",
      "Associate errors with their fields, explain recovery, preserve progress, and announce updates accessibly.",
    ],
    uncertainties: [
      "The claim that every field loses customers or imposes a mental tax is rhetorical and is not quantified.",
      "Real-time validation can create noise or premature errors if it runs before input is complete.",
      "The only generated scene image was blank, so the proposed form treatments were not frame-verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 7.6,
        label: "Fields are framed as questions about format and requirement",
      },
      {
        start: 7.6,
        end: 12.36,
        label:
          "Anticipation, formatting assistance, and clear labels are proposed",
      },
      {
        start: 12.36,
        end: 14.84,
        label: "Error messages and real-time validation are recommended",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Form clarity",
        title: "Every field creates a small information contract",
        body: "The interface asks for data; in return it must explain purpose, requirement, accepted format, and recovery.",
        visual: {
          type: "layers",
          items: [
            "Field purpose",
            "Requirement",
            "Accepted format",
            "Recovery path",
          ],
        },
      },
      {
        kind: "problem",
        eyebrow: "Hidden requirements",
        title: "Unanswered questions surface as submission errors",
        body: "A vague label and undisclosed format force people to discover the field's rules only after their attempt fails.",
        visual: {
          type: "sequence",
          items: [
            "Guess format",
            "Submit",
            "Receive vague error",
            "Repeat work",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Anticipatory guidance",
        title: "Explain the rule at the point of input",
        body: "Persistent labels and concise guidance prevent errors more reliably than correction messages alone.",
        visual: {
          type: "rule",
          statement: "Label + requirement + format before submission",
        },
      },
      {
        kind: "application",
        eyebrow: "Field flow",
        title: "Support entry, validation, and recovery as one sequence",
        body: "Preserve the person's data while providing formatting help and an accessible, field-specific route out of errors.",
        visual: {
          type: "sequence",
          items: [
            "Explain input",
            "Assist format",
            "Validate at useful time",
            "Preserve and recover",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Form rule",
        title: "A field should reveal its rules before enforcing them",
        body: "Make correct entry understandable up front and make every remaining error specific, recoverable, and accessible.",
        visual: {
          type: "rule",
          statement: "Prevent surprise; preserve progress",
        },
      },
    ],
  },
  {
    id: "DTV_ZbzjSFq",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DTV_ZbzjSFq/",
      creator: "@designparser",
      publishedAt: "2026-01-10",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Add Anchors to Long Horizontal Scan Paths",
    summary:
      "A scan-path study comparing repeated horizontal markers with a more open layout, proposing that regular anchors can help readers keep their place across aligned content while recognizing that excess rules can add clutter.",
    principles: [
      "Repeated alignment anchors can help the eye track across related values or text at regular intervals.",
      "Markers are useful when they clarify row correspondence, not merely because the layout has open space.",
      "The right amount of structure depends on content density, reading direction, line length, and task.",
    ],
    applications: [
      "Identify where readers must carry their position horizontally across columns or repeated rows.",
      "Compare whitespace, subtle row markers, and stronger rules at the real density and width.",
      "Remove separators that do not improve row tracking or group recognition.",
    ],
    uncertainties: [
      "The source does not define the tested content, participants, or measurement behind the effort claim.",
      "More horizontal markers can also create visual noise, especially when alignment and spacing already provide adequate anchors.",
      "The opening A/B text-column comparison was frame-verified, but the later marker treatment was not independently captured.",
    ],
    evidence: [
      {
        start: 0,
        end: 4,
        label: "Two scan-path options and horizontal markers are introduced",
      },
      {
        start: 4,
        end: 6,
        label: "Regular markers are described as optical anchors",
      },
      {
        start: 6,
        end: 11,
        label: "Fewer reference points are linked to greater tracking effort",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Scan path",
        title: "A long horizontal read needs places to reorient",
        body: "Regular anchors can help readers preserve row position when related content spans distance or multiple columns.",
        visual: {
          type: "comparison",
          before: "Open rows across wide columns",
          after: "Subtle recurring row anchors",
        },
      },
      {
        kind: "problem",
        eyebrow: "Tracking loss",
        title: "A sparse layout can leave the eye without correspondence cues",
        body: "When horizontal distance grows, whitespace alone may not show which values or passages belong on the same row.",
        visual: {
          type: "layers",
          items: [
            "Left entry point",
            "Horizontal distance",
            "Column change",
            "Right-side value",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Measured structure",
        title: "Use markers only where correspondence needs help",
        body: "Alignment, spacing, or rules can each anchor a row; the lightest cue that preserves tracking is sufficient.",
        visual: {
          type: "rule",
          statement: "Add structure until row correspondence is clear",
        },
      },
      {
        kind: "application",
        eyebrow: "A/B scan test",
        title: "Compare anchors at production width and density",
        body: "Ask readers to locate and compare values, then observe tracking errors rather than judging separator style alone.",
        visual: {
          type: "sequence",
          items: [
            "Choose comparison task",
            "Set real width",
            "Vary anchor strength",
            "Observe row errors",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Scan rule",
        title: "The best marker is the lightest one that keeps the row intact",
        body: "Provide enough reference to maintain position without turning every interval into a competing line.",
        visual: {
          type: "rule",
          statement: "Preserve correspondence without adding a grid cage",
        },
      },
    ],
  },
  {
    id: "DTTpgNsDWMr",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DTTpgNsDWMr/",
      creator: "@designparser",
      publishedAt: "2026-01-09",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Use Negative Space to Reveal Structure",
    summary:
      "A layout study treating negative space as an active grouping and contrast tool that separates chunks, clarifies hierarchy, and prevents dense content from collapsing into one undifferentiated field.",
    principles: [
      "Space between elements communicates grouping, separation, and priority before detailed content is read.",
      "Contrast can come from distance and density as well as color, size, and weight.",
      "Useful negative space is relational: its amount depends on content, viewport, task, and neighboring intervals.",
    ],
    applications: [
      "Group related content with smaller internal gaps and separate major sections with larger intervals.",
      "Compare the page at scanning distance before tuning individual decorative details.",
      "Test density across responsive widths so added space does not disconnect labels, controls, or related content.",
    ],
    uncertainties: [
      "The claim that negative space reduces cognitive load is not accompanied by a task, audience, or measurement.",
      "More empty area is not automatically clearer; excessive separation can weaken relationships and increase scrolling.",
      "Only the opening focal-dot and contrast statement was frame-verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 4,
        label: "Contrast seeking and a cognitive-load claim are introduced",
      },
      {
        start: 4,
        end: 8,
        label: "Chunking and pre-semantic contrast are proposed",
      },
      {
        start: 8,
        end: 12,
        label: "Crowding is contrasted with structural negative space",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Negative space",
        title: "Empty intervals are part of the information structure",
        body: "Space determines which elements read as a chunk and where one region gives way to another.",
        visual: {
          type: "comparison",
          before: "Equal gaps throughout",
          after: "Tight groups, generous section breaks",
        },
      },
      {
        kind: "problem",
        eyebrow: "Density collapse",
        title: "Crowding erases boundaries between ideas",
        body: "When every interval is small, headings, content, and actions merge into a field with no obvious scanning order.",
        visual: {
          type: "layers",
          items: [
            "Heading",
            "Content chunk",
            "Action group",
            "Section boundary",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Relational contrast",
        title: "Use space changes to encode relationship changes",
        body: "Smaller gaps bind related items; larger gaps mark a stronger boundary in the hierarchy.",
        visual: {
          type: "rule",
          statement: "Closer means related; farther means a new group",
        },
      },
      {
        kind: "application",
        eyebrow: "Spacing pass",
        title: "Set groups before polishing components",
        body: "Identify content relationships, assign internal and external gaps, then test the resulting scan path across widths.",
        visual: {
          type: "sequence",
          items: [
            "Map relationships",
            "Bind each chunk",
            "Separate sections",
            "Test responsive density",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Space rule",
        title: "Negative space is useful when it makes a relationship legible",
        body: "Judge an interval by the grouping and hierarchy it communicates, not by how empty the composition appears.",
        visual: {
          type: "rule",
          statement: "Every gap should clarify a boundary or a bond",
        },
      },
    ],
  },
  {
    id: "DTQcm3EDUSP",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DTQcm3EDUSP/",
      creator: "@designparser",
      publishedAt: "2026-01-08",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Encode Grouping Through Proximity",
    summary:
      "A proximity study showing how smaller gaps can bind related items and larger gaps can separate groups, turning spacing variation into an explicit hierarchy instead of distributing every element evenly.",
    principles: [
      "People often interpret nearby elements as related before reading their details.",
      "Internal gaps should be smaller than the gap that separates one group from the next.",
      "Proximity works with alignment, containment, labels, and semantics rather than replacing them.",
    ],
    applications: [
      "List the intended groups before assigning spacing values to individual elements.",
      "Use a clear ratio between within-group and between-group gaps, then inspect it at responsive sizes.",
      "Check that proximity does not accidentally bind unrelated controls or separate labels from their targets.",
    ],
    uncertainties: [
      "Proximity can suggest a group but does not prove semantic relation or accessible reading order.",
      "The spoken phrase 'very spacing' appears to mean 'vary spacing'; the draft uses the contextually supported wording.",
      "The opening arrangement of blue circles and squares was frame-verified as two proximity groups.",
    ],
    evidence: [
      {
        start: 0,
        end: 4,
        label: "Two perceived groups are attributed to proximity",
      },
      {
        start: 4,
        end: 8,
        label: "Small and equal gaps are contrasted",
      },
      {
        start: 8,
        end: 10,
        label: "Spacing variation is proposed as a structural signal",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Gestalt proximity",
        title: "Spacing can make two groups before labels do",
        body: "The distance among elements creates an immediate hypothesis about which items belong together.",
        visual: {
          type: "comparison",
          before: "Eight shapes with equal gaps",
          after: "Two clusters with a larger divide",
        },
      },
      {
        kind: "problem",
        eyebrow: "Flat spacing",
        title: "Equal gaps erase the boundary between groups",
        body: "When every interval has the same strength, the layout cannot show whether items form pairs, sets, or separate sections.",
        visual: {
          type: "layers",
          items: ["Item", "Within-group gap", "Group boundary", "Next group"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Gap hierarchy",
        title: "Make the internal gap visibly smaller than the external gap",
        body: "A consistent difference between those intervals turns proximity into a repeatable grouping signal.",
        visual: {
          type: "rule",
          statement: "Within-group gap is smaller than between-group gap",
        },
      },
      {
        kind: "application",
        eyebrow: "Grouping audit",
        title: "Name the groups before choosing the numbers",
        body: "Map semantics and reading order, assign a gap ratio, then test whether the intended clusters remain clear at each breakpoint.",
        visual: {
          type: "sequence",
          items: [
            "Name groups",
            "Set internal gap",
            "Set larger boundary",
            "Verify reading order",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Grouping rule",
        title: "Use distance differences to make relationships visible",
        body: "Spacing becomes structure when it consistently binds related items and separates unrelated sets.",
        visual: {
          type: "rule",
          statement: "Bind inside; separate outside",
        },
      },
    ],
  },
  {
    id: "DTOWZeljUhF",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DTOWZeljUhF/",
      creator: "@designparser",
      publishedAt: "2026-01-07",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Match Typefaces by Perceived Scale",
    summary:
      "A typography study explaining why equal numeric font sizes can look unequal when x-heights differ, and recommending optical comparison of lowercase scale while also checking weight, width, line-height, and the actual role of each face.",
    principles: [
      "Numeric font size describes the em box, not the perceived size of lowercase letters.",
      "X-height strongly influences apparent scale, but cap height, width, weight, and spacing also contribute.",
      "Optical matching should be performed in the production roles and sizes rather than as an isolated specimen exercise.",
    ],
    applications: [
      "Set shared lowercase and uppercase samples in both faces at the intended starting sizes.",
      "Adjust size or role until the text blocks carry the intended visual relationship rather than identical numbers.",
      "Recheck line-height, baseline alignment, density, and responsive behavior after optical adjustment.",
    ],
    uncertainties: [
      "The statement that x-height dictates scale is too absolute; several typographic dimensions affect perceived size.",
      "Ignoring numeric size entirely can create line-box and layout problems even when letters look aligned.",
      "The opening Inter sample labeled 16 pixels was frame-verified; the contrasting face was not independently captured.",
    ],
    evidence: [
      {
        start: 0,
        end: 3.52,
        label: "Equal pixel sizes are contrasted and x-height is introduced",
      },
      {
        start: 3.52,
        end: 6.08,
        label: "X-height is linked to apparent scale",
      },
      {
        start: 6.8,
        end: 8.88,
        label: "Optical letter matching is prioritized over numeric equality",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Perceived type scale",
        title: "Equal font-size values can produce unequal lowercase text",
        body: "The em box stays numeric while each typeface distributes its visible letterforms differently inside it.",
        visual: {
          type: "comparison",
          before: "16 px face with low x-height",
          after: "16 px face with high x-height",
        },
      },
      {
        kind: "problem",
        eyebrow: "Numeric matching",
        title: "Shared numbers can destabilize a mixed-type hierarchy",
        body: "Two faces assigned the same size may carry different apparent scale, density, and line-box behavior.",
        visual: {
          type: "layers",
          items: ["Em box", "X-height", "Cap height", "Stroke density"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Optical relationship",
        title: "Match the role people see, then verify the metrics they do not",
        body: "Use lowercase scale as a primary visual check without ignoring line-height, baselines, or layout dimensions.",
        visual: {
          type: "rule",
          statement: "Perceived scale first; line-box consequences still count",
        },
      },
      {
        kind: "application",
        eyebrow: "Typeface calibration",
        title: "Compare shared text in its final hierarchy",
        body: "Adjust the faces together, then validate headings, body copy, labels, and mixed lines rather than one word alone.",
        visual: {
          type: "sequence",
          items: [
            "Set shared sample",
            "Compare lowercase scale",
            "Adjust role or size",
            "Verify line metrics",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Scale rule",
        title: "Font size is an input; perceived scale is the visual result",
        body: "Coordinate both so mixed typefaces look intentionally related and still behave predictably in layout.",
        visual: {
          type: "rule",
          statement: "Match visible letters, then check invisible boxes",
        },
      },
    ],
  },
  {
    id: "DTLoF7GjT2V",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DTLoF7GjT2V/",
      creator: "@designparser",
      publishedAt: "2026-01-06",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Reserve All Caps for Brief, Distinct Labels",
    summary:
      "A readability study cautioning against long all-capital passages because uniform uppercase texture can slow scanning, while retaining capitals for short labels where brevity, spacing, and context keep recognition clear.",
    principles: [
      "Mixed-case text provides ascender, descender, and word-shape variation that can support rapid scanning.",
      "All capitals can work for short labels but become harder to sustain as word count and line length grow.",
      "Case choice should be tested with the actual typeface, size, tracking, language, and reading task.",
    ],
    applications: [
      "Convert long instructions, descriptions, and body passages to sentence or title case.",
      "Keep uppercase labels concise and tune tracking without treating letter spacing as a complete readability fix.",
      "Test acronyms, localization, assistive output, and reading speed with representative users.",
    ],
    uncertainties: [
      "The claim that all capitals doubles reading time is not supported with study conditions and is not treated as a measured constant.",
      "The word-outline explanation is a simplification of reading, which also uses letter features, context, familiarity, and language.",
      "The opening mixed-case 'slowed down' example was frame-verified; the later uppercase comparison was not independently captured.",
    ],
    evidence: [
      {
        start: 0,
        end: 3.2,
        label: "A slowdown is attributed to all-capital text",
      },
      {
        start: 3.2,
        end: 7.2,
        label: "Word outlines and uppercase uniformity are contrasted",
      },
      {
        start: 7.2,
        end: 10.88,
        label: "A reading-time claim and short-label exception are proposed",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Case and scanning",
        title: "Uppercase changes the texture of a passage",
        body: "Removing mixed-case variation can make longer text blocks more uniform and more demanding to scan.",
        visual: {
          type: "comparison",
          before: "READ THIS LONG INSTRUCTION",
          after: "Read this long instruction",
        },
      },
      {
        kind: "problem",
        eyebrow: "Uniform texture",
        title: "A display treatment becomes tiring when it carries body work",
        body: "All capitals can flatten word-shape variation across sentences, paragraphs, and repeated interface guidance.",
        visual: {
          type: "layers",
          items: [
            "Uniform cap height",
            "Long line",
            "Repeated labels",
            "Sustained reading",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Length boundary",
        title: "Match case treatment to reading duration",
        body: "Brief labels can support uppercase emphasis; sustained text benefits from the variation and familiarity of mixed case.",
        visual: {
          type: "rule",
          statement:
            "Short label may use caps; continuous reading uses mixed case",
        },
      },
      {
        kind: "application",
        eyebrow: "Case audit",
        title: "Find where emphasis has become a reading burden",
        body: "Separate true labels from instructions and descriptions, then test the remaining uppercase tokens in context.",
        visual: {
          type: "sequence",
          items: [
            "Classify text role",
            "Convert long passages",
            "Tune short labels",
            "Test language and size",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Case rule",
        title: "Use all caps as a brief signal, not a default reading voice",
        body: "Reserve its uniform emphasis for compact labels and let mixed case carry longer meaning.",
        visual: {
          type: "rule",
          statement:
            "The longer the read, the stronger the case for mixed case",
        },
      },
    ],
  },
  {
    id: "DTHIOQLCM3W",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DTHIOQLCM3W/",
      creator: "@designparser",
      publishedAt: "2026-01-05",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Size the Hit Area, Not the Icon",
    summary:
      "A touch-target study arguing that the invisible hit area rather than the visible icon decides tapping accuracy and needs a minimum size, with its threshold asserted without a cited source.",
    principles: [
      "Tapping accuracy is governed by the invisible hit area rather than the size of the visible icon.",
      "A fingertip makes contact across a patch of the screen, so touch input behaves as an area rather than a point.",
      "A control smaller than a stated minimum is a predictable source of tapping mistakes.",
    ],
    applications: [
      "Set every tappable element's hit area to meet the platform minimum, extending it beyond the artwork when the artwork must stay small.",
      "Audit touch interfaces by measuring hit areas instead of judging readiness from how large the icons look.",
      "Trace failed taps during testing back to their hit areas and enlarge those regions before adjusting any visuals.",
    ],
    uncertainties: [
      "The reel asserts that targets under 44 units fail and that most tap errors begin with undersized targets, but cites no study, guideline, or failure rate for either claim.",
      "The absolute wording that undersized targets always fail was softened into a minimum-size guideline, since real accuracy also depends on spacing, placement, and device.",
      "The opening grid scene showing a labeled small square target with an offset tap marker was frame-verified; its label read 32 units while the spoken threshold is 44 units, and no later scenes were available to inspect.",
    ],
    evidence: [
      {
        start: 0,
        end: 4,
        label:
          "Undersized targets are blamed for most tap errors and a 44-unit minimum is stated",
      },
      {
        start: 4,
        end: 8,
        label:
          "Touch is described as contact across an area, and hit areas are ranked above visible icons",
      },
      {
        start: 8,
        end: 11.35,
        label:
          "Invisible hit-area size is credited with controlling tapping accuracy as the reel closes",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Touch ergonomics",
        title: "Tap targets are sized for fingers, not eyes",
        body: "The reel opens on a small labeled square being missed by a nearby tap marker, framing undersized controls as the starting point of touch errors.",
        visual: {
          type: "comparison",
          before: "Icon-sized hit area",
          after: "Finger-sized hit area",
        },
      },
      {
        kind: "problem",
        eyebrow: "Invisible failure",
        title: "A crisp icon can still be an easy target to miss",
        body: "When the touchable region matches the drawn artwork, the interface honors what looks good over what fingers can reliably hit, so visual polish hides an interaction problem.",
        visual: {
          type: "layers",
          items: [
            "Visible icon",
            "Invisible hit area",
            "Fingertip contact patch",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Hit area first",
        title: "The invisible region decides whether taps land",
        body: "Accuracy follows the touchable area that the finger actually meets, and that region can be enlarged independently of the artwork the eye sees.",
        visual: {
          type: "rule",
          statement: "Size the hit area, then draw the icon",
        },
      },
      {
        kind: "application",
        eyebrow: "Target audit",
        title: "Measure hit areas before polishing icons",
        body: "Treat the minimum target size as a floor for every control, and verify it by measuring the invisible region rather than the glyph.",
        visual: {
          type: "sequence",
          items: [
            "List every tappable control",
            "Measure each hit area",
            "Raise undersized targets to the minimum",
            "Retest tapping on device",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Tap rule",
        title: "Design where the finger lands, not where the eye rests",
        body: "Give fingers a region generous enough to hit on the first try, because viewers forgive plain icons far more readily than missed taps.",
        visual: {
          type: "rule",
          statement: "Fingers touch areas, so size the area",
        },
      },
    ],
  },
  {
    id: "DTJRlcpjRDL",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DTJRlcpjRDL/",
      creator: "@designparser",
      publishedAt: "2026-01-05",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Match Loading Feedback to Delay and Content",
    summary:
      "A loading-state study contrasting blank screens with structured feedback, recommending that indicators match expected delay and content shape while treating specific speed-perception and decision-time percentages as unverified context-dependent claims.",
    principles: [
      "A loading state should confirm that work is happening and preserve enough context to explain what is coming.",
      "Skeletons are most useful for predictable content structures; spinners, retained content, or progress indicators fit different waits.",
      "Loading feedback should avoid false precision, distracting motion, layout shift, and inaccessible announcements.",
    ],
    applications: [
      "Measure actual wait distributions before choosing or delaying a loading indicator.",
      "Use a skeleton only when its blocks meaningfully resemble the incoming content and preserve final dimensions.",
      "Keep prior content when possible, expose determinate progress when known, and provide accessible status without repeated announcements.",
    ],
    uncertainties: [
      "The 53-percent perceived-speed claim and three-second decision threshold are presented without study design or context.",
      "Skeletons do not inherently improve perceived performance and can make short waits feel longer or imply inaccurate structure.",
      "The opening phone with a blank loading surface and small spinner was frame-verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 1.6,
        label: "Blank loading surfaces are described as feeling slow",
      },
      {
        start: 1.6,
        end: 6.88,
        label: "Skeleton speed and decision-time claims are introduced",
      },
      {
        start: 6.88,
        end: 8.4,
        label: "Loading feedback is matched to expected duration",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Loading feedback",
        title: "A blank surface hides both progress and destination",
        body: "Useful loading feedback confirms activity and preserves a model of the content or task that will replace it.",
        visual: {
          type: "comparison",
          before: "Blank phone surface",
          after: "Stable content-shaped placeholders",
        },
      },
      {
        kind: "problem",
        eyebrow: "Unexplained wait",
        title: "One indicator cannot explain every delay",
        body: "A spinner, skeleton, retained view, and progress bar communicate different knowledge about duration and incoming structure.",
        visual: {
          type: "layers",
          items: [
            "Expected delay",
            "Known progress",
            "Content predictability",
            "Current context",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Feedback fit",
        title: "Choose the state from what the system actually knows",
        body: "Known progress can be reported; predictable layout can be reserved; uncertain short work may need only restrained activity feedback.",
        visual: {
          type: "rule",
          statement:
            "Delay + progress knowledge + content shape determine feedback",
        },
      },
      {
        kind: "application",
        eyebrow: "Loading matrix",
        title: "Measure the wait before designing its placeholder",
        body: "Map real durations and content stability, then verify layout shift, motion, status semantics, and perceived continuity.",
        visual: {
          type: "sequence",
          items: [
            "Measure duration",
            "Classify content shape",
            "Choose feedback",
            "Verify continuity",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Loading rule",
        title:
          "Loading feedback should reveal only what the system can honestly promise",
        body: "Preserve context, match the incoming structure when it is known, and avoid indicators that imply false progress or certainty.",
        visual: {
          type: "rule",
          statement: "Honest feedback for the measured wait",
        },
      },
    ],
  },
  {
    id: "DTENv8nDVxp",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DTENv8nDVxp/",
      creator: "@designparser",
      publishedAt: "2026-01-03",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Chunk Data to Respect Working Memory",
    summary:
      "A cognitive-load study of Miller's law that recommends grouping scattered dashboard data into chunks so working memory absorbs groups instead of counting values, while the seven-item capacity is quoted without a citation.",
    principles: [
      "Working memory holds only a small number of chunks at once, so information beyond that limit tends to be dropped.",
      "Presenting many scattered values on one screen overloads memory, while grouping related values creates chunks that fit within it.",
      "Chunked organization lets people absorb groups as units instead of counting individual data points.",
    ],
    applications: [
      "Group related metrics into labeled clusters before adding another chart to a data screen.",
      "Keep the number of top-level value groups on one screen small enough to grasp at a glance.",
      "Review dashboards by asking whether a viewer can absorb each group as a unit rather than reading every number.",
    ],
    uncertainties: [
      "The seven-chunk capacity is stated without citing Miller's original paper or any replication, and later memory research debates the exact number, so the figure is unverified.",
      "The opening claim that viewers' brains simply ignore extra charts is framed as certain; the principles here treat the limit as a tendency that attention and expertise can shift.",
      "The single frame showing a small declining line chart with an engagement axis and a dashed threshold line was frame-verified, but the contrasting grouped-dashboard example exists only in the narration.",
    ],
    evidence: [
      {
        start: 0,
        end: 5.2,
        label:
          "Miller's law is invoked with a seven-chunk working memory limit after two charts go unnoticed",
      },
      {
        start: 5.84,
        end: 10.16,
        label:
          "Passing the limit is said to cut processing, and scattered data is blamed for overload",
      },
      {
        start: 10.16,
        end: 14.88,
        label:
          "Grouped dashboards are credited with creating chunks that beat counting",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Cognitive limit",
        title: "Working memory keeps only a few chunks at once",
        body: "Invoking Miller's law, the reel claims attention silently drops whole charts once a screen asks memory to hold more than its chunk limit.",
        visual: {
          type: "comparison",
          before: "A wall of separate values",
          after: "A few labeled groups",
        },
      },
      {
        kind: "problem",
        eyebrow: "Scattered data",
        title: "Loose numbers force viewers to count",
        body: "When metrics sit ungrouped, working memory must track each value separately, and the reel says performance falls away past the limit.",
        visual: {
          type: "layers",
          items: ["Many loose values", "No group structure", "Memory overload"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Chunking principle",
        title: "Groups become the units memory actually holds",
        body: "Chunking packages several values into one perceptual unit, letting a grouped dashboard be absorbed instead of counted.",
        visual: {
          type: "rule",
          statement: "If the viewer must count, it is not chunked",
        },
      },
      {
        kind: "application",
        eyebrow: "Dashboard grouping",
        title: "Cluster metrics into labeled chunks",
        body: "Organize the screen so related measures sit together under shared labels, keeping the number of top-level groups small enough to grasp at a glance.",
        visual: {
          type: "sequence",
          items: [
            "Inventory the screen's values",
            "Group by the question they answer",
            "Label each group",
            "Trim or fold orphan metrics",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Memory rule",
        title: "Structure the screen so memory can hold it",
        body: "The defensive move against overload is grouping, not shrinking text or thinning color, because structure changes what counts as one item.",
        visual: {
          type: "rule",
          statement: "Group first so nobody has to count",
        },
      },
    ],
  },
  {
    id: "DTBpHxkjRLt",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DTBpHxkjRLt/",
      creator: "@designparser",
      publishedAt: "2026-01-02",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Grouping Rules Decide What Belongs Together",
    summary:
      "A Gestalt-perception study cataloging the grouping rules of proximity, similarity, common region, connectedness, continuity, closure, and figure-ground separation as the basis for predicting what viewers see as related, delivered as one-line definitions without demonstrations.",
    principles: [
      "Perception is rule-governed, so which elements read as related can be designed rather than left to chance.",
      "Spatial closeness, shared appearance, and shared enclosure each create perceived groups among elements.",
      "Connections and continuity link elements across distance, while viewers complete partial forms and separate figures from their background.",
    ],
    applications: [
      "Place related controls close together and push unrelated ones apart so spacing matches the intended structure.",
      "Reinforce belonging with matching appearance and enclosing containers where spacing alone is not enough.",
      "Squint-test layouts for accidental groups formed by stray connectors or unintended alignment before shipping.",
    ],
    uncertainties: [
      "The reel presents each rule as a fixed law of perception; the principles here describe them as strong tendencies that context, attention, and learned conventions can modify.",
      "The opening grid of labeled principle rows was frame-verified, including proximity, similarity, common region, connectedness, continuity, closure, and figure-ground; the closing phrase was heard as 'Parched' and resolved contextually to the account's 'parsed' sign-off.",
      "Each rule is compressed to a single spoken phrase with no worked example, so any visual demonstrations beyond the opening grid were not frame-verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 3.36,
        label:
          "Perception is framed as rule-governed and proximity is credited with grouping meaning",
      },
      {
        start: 3.36,
        end: 7.36,
        label:
          "Similarity and shared regions are said to reinforce relation and belonging",
      },
      {
        start: 7.36,
        end: 11.04,
        label:
          "Connections are said to override distance while continuity guides the eye",
      },
      {
        start: 11.04,
        end: 14.56,
        label: "Closure and figure-ground separation complete the rule set",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Gestalt catalog",
        title: "Perception groups elements by predictable rules",
        body: "The reel runs through a catalog of grouping rules, arguing that what viewers see as together is decided by spacing, appearance, enclosure, and connection.",
        visual: {
          type: "sequence",
          items: [
            "Place elements close together",
            "Match their appearance",
            "Enclose them in a region",
            "Connect them with lines",
          ],
        },
      },
      {
        kind: "problem",
        eyebrow: "Accidental groups",
        title: "Unmanaged spacing creates groups nobody designed",
        body: "Elements left at arbitrary distances or joined by stray connectors still form perceived groups, so the layout communicates relationships the designer never chose.",
        visual: {
          type: "layers",
          items: [
            "Arbitrary spacing",
            "Stray connectors",
            "Unintended grouping",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Grouping logic",
        title: "Closeness, likeness, and enclosure define the groups",
        body: "Proximity suggests a group, similarity reinforces it, and a shared region confirms belonging, while connections can bind items that distance alone would separate.",
        visual: {
          type: "rule",
          statement: "Distance suggests, enclosure confirms",
        },
      },
      {
        kind: "application",
        eyebrow: "Layout audit",
        title: "Squint-test screens for unintended groups",
        body: "Step back until labels blur and check whether the visible clusters match the intended structure, then adjust spacing, enclosure, and connectors until they do.",
        visual: {
          type: "comparison",
          before: "Evenly scattered controls",
          after: "Task-clustered controls",
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Perception rule",
        title: "Design the grouping, not just the elements",
        body: "Viewers perceive wholes before parts, so the relationships among elements deserve as much deliberate design as the elements themselves.",
        visual: {
          type: "rule",
          statement: "Viewers see groups before they see items",
        },
      },
    ],
  },
  {
    id: "DS_KRfxiFKW",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DS_KRfxiFKW/",
      creator: "@designparser",
      publishedAt: "2026-01-01",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Seven Levers That Steer Interface Attention",
    summary:
      "A visual-fundamentals study listing seven controlling principles, from hierarchy and contrast through repetition and emphasis, as the levers that direct attention on an interface, offered as a rapid catalog without worked examples or cited evidence.",
    principles: [
      "Attention flow on an interface should be set deliberately through hierarchy and emphasis.",
      "Visibility depends on contrast, and perceived order comes from alignment and balanced weight distribution.",
      "Whitespace protects focus while repetition builds unity across the experience.",
    ],
    applications: [
      "Establish a single primary focal point per screen before making any other styling decision.",
      "Raise contrast where visibility matters most and distribute visual weight so no region of the layout feels lopsided.",
      "Apply consistent alignment grids and repeated patterns, using whitespace to isolate what matters most.",
    ],
    uncertainties: [
      "The reel claims exactly seven principles control interfaces but names no source, example, or counter-case for the count or the coverage, so the list is unverified.",
      "The strong verb 'control' was softened to steering or shaping attention, since the narration does not show that applying the list guarantees a working interface.",
      "The single frame listing the titled principles was frame-verified, but no worked interface examples were available, so the practical effect of each principle was not frame-verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 4.24,
        label:
          "Seven principles are said to control interfaces, with hierarchy directing attention and contrast creating visibility",
      },
      {
        start: 4.24,
        end: 9.76,
        label:
          "Balance, whitespace, and alignment are assigned their effects on weight, focus, and order",
      },
      {
        start: 9.76,
        end: 15.56,
        label: "Repetition is tied to unity and emphasis to priority",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Design fundamentals",
        title: "Seven principles steer how interfaces read",
        body: "The reel lists hierarchy, contrast, balance, whitespace, alignment, repetition, and emphasis as the controls behind an interface's readability, one principle per beat.",
        visual: {
          type: "layers",
          items: [
            "Attention: hierarchy and emphasis",
            "Visibility: contrast",
            "Order: alignment and balance",
            "Calm: whitespace and repetition",
          ],
        },
      },
      {
        kind: "problem",
        eyebrow: "Unstructured screen",
        title: "Without hierarchy everything shouts at once",
        body: "When no element ranks above another, contrast and emphasis get spent everywhere, leaving the viewer to guess where to look first.",
        visual: {
          type: "comparison",
          before: "Every element styled equally",
          after: "One clear focal point",
        },
      },
      {
        kind: "principle",
        eyebrow: "Attention first",
        title: "Hierarchy chooses the winner, contrast makes it visible",
        body: "Deciding what matters most and separating it visually does the work that balance, alignment, whitespace, repetition, and emphasis then support.",
        visual: {
          type: "rule",
          statement: "Direct the eye first, then decorate",
        },
      },
      {
        kind: "application",
        eyebrow: "Screen audit",
        title: "Run one screen through all seven controls",
        body: "Rank elements, push contrast where the top item needs it, align and balance the rest, protect it with whitespace, and repeat the system across screens.",
        visual: {
          type: "sequence",
          items: [
            "Rank elements by importance",
            "Add contrast to the top item",
            "Align and balance the rest",
            "Protect focus with whitespace",
            "Repeat the system across screens",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Fundamentals rule",
        title: "Attention is designed, never defaulted",
        body: "The seven controls only help when a clear priority exists first, so decide the ranking before any styling decision.",
        visual: {
          type: "rule",
          statement: "Decide the ranking before the styling",
        },
      },
    ],
  },
  {
    id: "DS6Q5tWiC6c",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DS6Q5tWiC6c/",
      creator: "@designparser",
      publishedAt: "2025-12-31",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Build Hierarchy in Grayscale Before Color",
    summary:
      "A layout-structure study arguing that stripping color exposes the real hierarchy, that a limited run of gray steps should carry it, and that accent color deserves only a small share of the canvas, though its numeric guidance is offered without cited sources.",
    principles: [
      "Grayscale is the structural skeleton of an interface, so a design should survive with color removed.",
      "A gray scale is most usable as a chosen subset rather than every available step.",
      "Accent color is a finishing dose, not the primary carrier of hierarchy.",
    ],
    applications: [
      "Desaturate a layout periodically and repair any element that loses its place once color is gone.",
      "Pick four to six steps from a 100 to 900 gray scale and design hierarchy with that subset alone.",
      "Ration chromatic color to a small percentage of the composition and let grays handle readability and spacing.",
    ],
    uncertainties: [
      "The numeric prescriptions, four to six gray steps and two to ten percent color, are stated without a cited study or source, so both figures are unverified.",
      "The reel implies any interface collapses without structure checks; I softened this to a periodic audit practice since it presents no evidence about failure rates.",
      "The opening title card telling viewers to remove all color was frame-verified, but the only generated scene image was that single still, so the gray scale, the tint options, and the percentage figure were not frame-verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 2.56,
        label:
          "Removing all color is said to break the interface and expose its structure",
      },
      {
        start: 2.56,
        end: 7.68,
        label:
          "A 100 to 900 grayscale is proposed as the structure, using four to six steps",
      },
      {
        start: 7.68,
        end: 12.48,
        label:
          "Gray is credited with controlling hierarchy, readability, and spacing, pure or with accent",
      },
      {
        start: 12.48,
        end: 14.08,
        label: "Color is rationed to two to ten percent of the composition",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Gray first",
        title: "Color removal is proposed as a structure test",
        body: "The account's method treats grayscale as the honest view of an interface: if the layout fails without hue, the hierarchy was never really there.",
        visual: {
          type: "comparison",
          before: "Full-color layout hiding weak structure",
          after: "Grayscale layout exposing the skeleton",
        },
      },
      {
        kind: "problem",
        eyebrow: "Hue overload",
        title: "Color gets asked to do the structure's job",
        body: "When contrast, order, and grouping all depend on hue, the interface reads fine right up until the color is unavailable or ignored.",
        visual: {
          type: "layers",
          items: [
            "Contrast by hue only",
            "Order without a gray plan",
            "Grouping that fades in grayscale",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Subset scale",
        title:
          "A limited gray run carries hierarchy better than the full scale",
        body: "Choosing a handful of steps from the 100 to 900 range forces deliberate separation between levels instead of endless near-identical grays.",
        visual: {
          type: "sequence",
          items: [
            "Start at a 100 to 900 scale",
            "Keep four to six steps",
            "Map each step to a hierarchy level",
            "Check spacing and readability",
          ],
        },
      },
      {
        kind: "application",
        eyebrow: "Color ration",
        title: "Spend a small share of the canvas on accent color",
        body: "Let grays do the quiet work of readability and spacing, then add pure or tinted accents in a deliberately small proportion so they stay loud.",
        visual: {
          type: "rule",
          statement: "Two to ten percent color, the rest earned by gray",
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Gray skeleton",
        title: "Structure that survives desaturation is real structure",
        body: "An interface whose hierarchy holds in grayscale needs color only for emphasis, which is exactly what color is best at.",
        visual: {
          type: "rule",
          statement: "Earn hierarchy in gray, spend color on emphasis",
        },
      },
    ],
  },
  {
    id: "DS8PMNeDc9f",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DS8PMNeDc9f/",
      creator: "@designparser",
      publishedAt: "2025-12-31",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Split Color Into Primitives and Semantics",
    summary:
      "A design-token study separating raw primitive colors from the semantic roles that reference them so one alias change propagates to every linked surface, though it presents Figma's two-tier setup as an ideal without covering governance or scale limits.",
    principles: [
      "Raw palette values and the roles they play belong in separate layers of the color system.",
      "Components should consume semantic role names instead of pointing at raw palette values.",
      "Centralized references allow one semantic edit to keep every linked surface consistent.",
    ],
    applications: [
      "Build a numbered primitive scale, such as a blue series, and treat those values as untouchable raw material.",
      "Alias purpose names like a primary button background to a primitive so value and intent stay decoupled.",
      "When a brand color shifts, edit the semantic reference once and verify every dependent surface follows before minting new tokens.",
    ],
    uncertainties: [
      "The claim that a single semantic edit propagates to every linked color immediately is asserted without a cited source or benchmark, so the immediacy is unverified.",
      "The reel frames a two-tier model as complete; I softened it because mature systems often add component-level tokens and governance rules it never mentions.",
      "The opening title card naming the two color systems was frame-verified, but the only generated scene image was that single still, so the button-token example and the live update were not frame-verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 2.08,
        label: "Figma's palette is said to run on two color systems",
      },
      {
        start: 2.08,
        end: 7.04,
        label:
          "Primitives are defined as raw values and semantics as references to them",
      },
      {
        start: 7.04,
        end: 10.64,
        label:
          "A primary button background is given as a semantic pointing to a named primitive",
      },
      {
        start: 10.64,
        end: 13.84,
        label:
          "Editing one semantic is claimed to update every linked color at once",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Token layers",
        title: "Figma's palette is built on two tiers",
        body: "The account's breakdown treats color as a two-part architecture: a numbered scale of raw values and a set of named references that point into it.",
        visual: {
          type: "comparison",
          before: "One flat list of raw color values",
          after: "Primitives referenced by semantic roles",
        },
      },
      {
        kind: "problem",
        eyebrow: "Fragile palettes",
        title: "Direct color values make every change manual",
        body: "When screens bind to raw values, updating a brand color means hunting down each usage, and nothing guarantees the replacements stay consistent.",
        visual: {
          type: "layers",
          items: [
            "Raw values scattered",
            "No named intent",
            "Manual find-and-replace",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Two layers",
        title: "Primitives store values and semantics store intent",
        body: "The primitive tier declares what the colors are, while the semantic tier declares what they are for, keeping appearance decisions separate from usage decisions.",
        visual: {
          type: "rule",
          statement: "Name the job, not the raw value",
        },
      },
      {
        kind: "application",
        eyebrow: "Token workflow",
        title: "Bind components to roles, then edit the role",
        body: "Point a button's background at a semantic token so that when the palette shifts, the reference is revised once and dependent surfaces follow.",
        visual: {
          type: "sequence",
          items: [
            "Define the primitive scale",
            "Alias semantic role names",
            "Bind components to roles",
            "Edit one role to update all",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Parsed color",
        title: "References make a palette self-maintaining",
        body: "A referenced system replaces guesswork with structure: values are declared once, and intent sits in a layer where it can change safely.",
        visual: {
          type: "rule",
          statement: "Change the reference, not every value",
        },
      },
    ],
  },
  {
    id: "DS2505ujeUW",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DS2505ujeUW/",
      creator: "@designparser",
      publishedAt: "2025-12-29",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Match the Scan Pattern to the Content Load",
    summary:
      "A page-layout study recommending the Z-pattern for sparse, action-oriented pages, with logo and main action at the top right and proof plus a final action closing the bottom right, while reserving the F-pattern for text-heavy pages, though it presents the eye-movement claims without cited research.",
    principles: [
      "Layout should follow a known scanning path rather than hoping attention lands in the right places.",
      "Sparse, action-oriented pages suit a diagonal Z path; dense reading pages suit an F-shaped sweep.",
      "Key milestones along the scan deserve the corners of the composition.",
    ],
    applications: [
      "Place the logo top left and the primary call to action top right on a low-content landing page.",
      "Reserve the middle horizontal of the Z for proof, and close with the final action at the bottom right.",
      "Choose the pattern by content density: audit whether the page is built for skimming to an action or for reading text.",
    ],
    uncertainties: [
      "The assertion that the eye literally follows the Z is offered without a cited eye-tracking source, so the scanning claim is unverified.",
      "The reel presents the two patterns as a complete rule set; I softened it to guidance because it gives no thresholds for when a page counts as low-content or text-heavy.",
      "The opening title card recommending the Z-pattern for less content was frame-verified, but the only generated scene image was that single still, so the corner placement diagram and the F-pattern comparison were not frame-verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 5.72,
        label:
          "Low-content pages are matched to the Z-pattern with logo and main action on the top row",
      },
      {
        start: 5.72,
        end: 10.72,
        label:
          "Proof is placed mid-page and the final action at the bottom right of the Z",
      },
      {
        start: 10.72,
        end: 15.52,
        label:
          "The F-pattern is assigned to text-heavy pages and the Z-pattern to action pages",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Scan paths",
        title: "Two patterns are offered for two kinds of pages",
        body: "The account contrasts a diagonal scan for sparse pages built around an action with a horizontal sweep for pages dominated by text.",
        visual: {
          type: "comparison",
          before: "F-pattern sweep across dense text",
          after: "Z-pattern diagonal across sparse layout",
        },
      },
      {
        kind: "problem",
        eyebrow: "Random placement",
        title: "Actions placed off the scan path get skipped",
        body: "When a key button sits where attention does not naturally travel, the page depends on luck instead of layout to deliver the conversion.",
        visual: {
          type: "layers",
          items: [
            "Unanchored logo",
            "Floating proof block",
            "Orphaned final action",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Pattern choice",
        title: "Pick the scan pattern by what the page is for",
        body: "A page meant to be skimmed toward an action earns the Z path, while a page meant to be read earns the F shape.",
        visual: {
          type: "rule",
          statement: "Z for action, F for reading",
        },
      },
      {
        kind: "application",
        eyebrow: "Z layout",
        title: "Anchor the four beats of the diagonal",
        body: "On a sparse page, set the logo top left, the primary action top right, proof along the middle, and the closing action at the bottom right.",
        visual: {
          type: "sequence",
          items: [
            "Logo top left",
            "Main action top right",
            "Proof across the middle",
            "final action in the bottom-right corner",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Guided eye",
        title: "Design the route before decorating the stops",
        body: "Decide which scanning path the content density implies, then place each milestone where that path already delivers attention.",
        visual: {
          type: "rule",
          statement: "Place priorities where the eye already lands",
        },
      },
    ],
  },
  {
    id: "DS0ULD5DQgV",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DS0ULD5DQgV/",
      creator: "@designparser",
      publishedAt: "2025-12-28",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Front-Load for F-Shaped Scanning",
    summary:
      "A page-scanning study teaching that visitors skim along an F-shaped path, give their first attention to the top left, and skip layouts where every element carries equal weight, so key content should be front-loaded — with the caveat that the eye-tracking claims are asserted without a cited source.",
    principles: [
      "Page layouts should be composed for scanning, because visitors tend to skim in quick passes rather than read word by word.",
      "A layout that gives every element equal visual weight produces no fixation point, so nothing holds attention.",
      "The earliest attention concentrates in the top-left region, so leading content decides whether the rest gets seen.",
    ],
    applications: [
      "Place the primary message and keywords in the first lines of a section instead of burying them mid-page.",
      "Arrange headings and leads along the top and left edges where the horizontal and vertical sweeps occur.",
      "Break uniformly weighted layouts with deliberate size, weight, or color contrast so one element clearly dominates.",
    ],
    uncertainties: [
      "The F-shaped path of two horizontal and one vertical sweep and the top-left attention claim are presented as settled eye-tracking findings with no study or source named, so they remain unverified.",
      "The absolutist phrasing about users not reading was softened to a tendency to skim, since reading and scanning usually coexist and the reel cites no evidence for the absolute form.",
      "The opening title card with a highlighted phrase about users not reading was frame-verified, but the single captured frame showed no F-pattern diagram or heat map, so those visuals were not frame-verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 5.28,
        label:
          "Scanning in an F-shaped path of two horizontal and one vertical sweep is described as the norm",
      },
      {
        start: 5.28,
        end: 8.88,
        label:
          "Eye-tracking heat maps are invoked to argue that uniform visual weight leaves nothing standing out",
      },
      {
        start: 9.52,
        end: 13.32,
        label:
          "Attention is placed at the top left and front-loading is prescribed as the remedy for being skipped",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Reading behavior",
        title: "Most visitors scan instead of read",
        body: "The reel opens by rejecting the imagined careful reader: real attention moves across a page in fast sweeps, so the layout itself has to carry the message.",
        visual: {
          type: "comparison",
          before: "Assumed: line-by-line reading",
          after: "Actual: F-shaped scanning sweeps",
        },
      },
      {
        kind: "problem",
        eyebrow: "Flat layouts",
        title: "Equal weight makes everything invisible",
        body: "When a page treats every block as equally important, attention spreads thin across it and no element earns a lasting fixation.",
        visual: {
          type: "layers",
          items: [
            "Uniform sizing everywhere",
            "Attention spread thin",
            "No element retained",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Scan path",
        title: "The top left gets the first look",
        body: "The F-shaped path begins with two horizontal sweeps near the top and one vertical run down the left side, making the upper left the most reliably seen space on the page.",
        visual: {
          type: "rule",
          statement: "Two horizontal sweeps, then one vertical run",
        },
      },
      {
        kind: "application",
        eyebrow: "Front-load content",
        title: "Put the conclusion first",
        body: "Front-load each section with its key point so a skimmer who only catches the top and the left edge still receives the core message.",
        visual: {
          type: "sequence",
          items: [
            "Lead with the key point",
            "Stack supporting points down the left",
            "Add contrast so one element dominates",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Scanning rule",
        title: "Design for the skimmer or be skipped",
        body: "A page that rewards scanning gets its message across; one that assumes full reading loses visitors who never slow down.",
        visual: {
          type: "rule",
          statement: "Front-load the message where the eyes land",
        },
      },
    ],
  },
  {
    id: "DSyBj3QDbfl",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DSyBj3QDbfl/",
      creator: "@designparser",
      publishedAt: "2025-12-27",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Bigger, Closer, Faster Targets",
    summary:
      "A target-sizing study teaching that acquisition time follows Fitts's Law of size and distance, so enlarging controls, anchoring menus to screen edges, and placing mobile actions in the thumb zone all speed use — with the caveat that the speed and error claims are asserted without a cited study.",
    principles: [
      "The time to reach a control depends on its size and its distance from the pointer, a relationship known as Fitts's Law.",
      "Bigger and closer targets are acquired faster and mis-clicked less, which the reel compresses into bigger, closer, safer.",
      "Screen edges and comfortable thumb reach amplify effective target size, since a pointer stops at an edge and a thumb owns the lower mobile region.",
    ],
    applications: [
      "Enlarge primary actions and move them nearer the pointer's typical position before adding visual emphasis.",
      "Anchor menu bars and edge controls to the physical screen edge so overshooting cannot miss.",
      "Position mobile primary actions, such as floating action buttons, inside the natural thumb arc rather than at far corners.",
    ],
    uncertainties: [
      "The law's spoken name was misrecognized and contextually resolved to Fitts's Law, and the spoken reference to floating action buttons was resolved from a shortened form; both resolutions shape how the claims are worded.",
      "The claims that larger targets produce measurably faster clicks and fewer errors are asserted without a cited study, and the screen-edge effect was softened from a claim of infinite target size to effectively unbounded along the edge direction.",
      "The opening phone mockup with the oversized button and the later generic large button were frame-verified, but the menu-bar and thumb-zone examples were not visible in the two captured frames.",
    ],
    evidence: [
      {
        start: 0,
        end: 4.88,
        label:
          "An oversized button prompts the question, and a reach-time law tied to size and distance is introduced",
      },
      {
        start: 4.88,
        end: 7.84,
        label:
          "A steering-wheel analogy compresses the law into bigger, closer, safer",
      },
      {
        start: 8.48,
        end: 12.88,
        label:
          "Large targets are credited with faster clicks and fewer errors, and screen-edge menus are cited",
      },
      {
        start: 13.44,
        end: 19.84,
        label:
          "Edge menus are described as unbounded targets, and thumb-zone placement is applied to mobile actions",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Target size",
        title: "An oversized button is a decision, not a mistake",
        body: "The reel opens on a phone screen whose back control is deliberately oversized and asks why, framing size as an ergonomic choice rather than a styling preference.",
        visual: {
          type: "comparison",
          before: "Tiny far button: slow, missable",
          after: "Large near target: quick, sure",
        },
      },
      {
        kind: "problem",
        eyebrow: "Missed clicks",
        title: "Small distant controls tax every tap",
        body: "When targets are small or far, each acquisition takes longer and fails more often, and that cost repeats on every interaction.",
        visual: {
          type: "layers",
          items: [
            "Undersized target",
            "Long travel distance",
            "Errors and retries",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Fitts's Law",
        title: "Reach time follows size and distance",
        body: "Modeled on physical controls like steering wheels, acquisition speed improves as a target grows or moves closer, and the reel applies that logic to screens.",
        visual: {
          type: "rule",
          statement: "Bigger, closer, faster, safer",
        },
      },
      {
        kind: "application",
        eyebrow: "Edge and thumb",
        title: "Amplify targets with edges and thumb zones",
        body: "Pin controls to screen edges where the pointer stops and cannot overshoot, and keep mobile actions inside the region a thumb reaches comfortably.",
        visual: {
          type: "sequence",
          items: [
            "Enlarge the primary action",
            "Dock menus to the screen edge",
            "Place mobile actions in the thumb arc",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Sizing logic",
        title: "Size targets by physics, not taste",
        body: "Control size and placement should follow predictable movement behavior instead of visual preference, which is what separates reasoning from guessing.",
        visual: {
          type: "rule",
          statement: "Size for the hand, not the eye",
        },
      },
    ],
  },
  {
    id: "DSyBpx9jeCH",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DSyBpx9jeCH/",
      creator: "@designparser",
      publishedAt: "2025-12-27",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Design for Habits Formed Elsewhere",
    summary:
      "An interface-familiarity study teaching that visitors bring interaction habits from the other products where they spend most of their time, so known patterns reduce cognitive load while novel navigation drives drop-offs — with the caveat that the time-share statistic is uncited and the no-explanation ideal is softened.",
    principles: [
      "Users arrive expecting a product to behave like the other products they already use, a convention known as Jakob's Law.",
      "Time spent elsewhere trains habits, so unfamiliar navigation and logic force extra thinking that converts directly into drop-offs.",
      "Reusing recognized patterns lowers cognitive load until an interface feels familiar rather than needing explanation.",
    ],
    applications: [
      "Handle navigation, search, and checkout with established platform conventions before inventing custom alternatives.",
      "Spend any novelty budget on differentiating features, not on re-teaching basic interactions.",
      "Treat a need for instructions as a signal to replace a custom pattern with one users already recognize.",
    ],
    uncertainties: [
      "The spoken percentage of time users spend on other products is asserted without a cited study, so the figure is unverified, and the law's misrecognized spoken name was contextually resolved to Jakob's Law.",
      "The claim that good design explains nothing was softened, because feeling familiar reduces the need for explanation rather than eliminating it, and genuinely novel products still need onboarding.",
      "The opening title card with a highlighted phrase about user expectations was frame-verified, but the single captured frame contained no product comparisons or interface examples, so the later claims were not frame-verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 3.92,
        label:
          "The expectation that a site behaves like its peers is named as a design law",
      },
      {
        start: 3.92,
        end: 6.32,
        label:
          "A near-total share of time spent on other products is asserted as the source of those habits",
      },
      {
        start: 6.32,
        end: 11.44,
        label:
          "Unfamiliar navigation and logic are linked to extra mental effort and lost users",
      },
      {
        start: 11.44,
        end: 16.72,
        label:
          "Known patterns are prescribed to cut cognitive load until the interface feels familiar without explanation",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Familiarity law",
        title: "Habits form on other people's products",
        body: "The reel grounds itself in a UX law: visitors spend most of their product time elsewhere, so the habits they bring to your site were trained on other sites.",
        visual: {
          type: "sequence",
          items: [
            "Habits trained on other products",
            "Same habits applied to your product",
            "Friction when they mismatch",
          ],
        },
      },
      {
        kind: "problem",
        eyebrow: "Novelty cost",
        title: "New logic buys confusion, not delight",
        body: "Unfamiliar navigation and new interaction logic make people think through basics they never chose to relearn, and every extra thought pushes more of them out.",
        visual: {
          type: "comparison",
          before: "Known pattern: instant transfer",
          after: "Novel logic: pause, decode, leave",
        },
      },
      {
        kind: "principle",
        eyebrow: "Cognitive load",
        title: "Known patterns do the remembering for you",
        body: "When an interface matches stored patterns, users spend no effort decoding it; convention absorbs the thinking that a custom design would charge to the user.",
        visual: {
          type: "rule",
          statement: "Familiarity is a feature, not laziness",
        },
      },
      {
        kind: "application",
        eyebrow: "Convention first",
        title: "Default to patterns users already know",
        body: "Cover navigation, search, and checkout with established conventions, and reserve any departure from convention for the parts that genuinely differentiate the product.",
        visual: {
          type: "layers",
          items: [
            "Conventional navigation",
            "Recognized controls",
            "Familiar mental model",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Zero explanation",
        title: "If you have to explain it, redesign it",
        body: "The reel's closing ideal is an interface that needs no explanation because it matches what people already know; treat instruction copy as a symptom rather than a fix.",
        visual: {
          type: "rule",
          statement: "Feels familiar, explains nothing",
        },
      },
    ],
  },
  {
    id: "DSst4K-Db6c",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DSst4K-Db6c/",
      creator: "@designparser",
      publishedAt: "2025-12-25",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Lock Spacing to an 8-Point Grid",
    summary:
      "A spacing-system study replacing guesswork with an 8-point grid whose multiples are credited with consistent rhythm, crisp rendering, and scalable layouts, though those outcomes are asserted without a cited source and describe one discipline rather than the only valid sizing approach.",
    principles: [
      "Spacing values should come from a fixed system instead of case-by-case guesses, so layout decisions stay consistent across a whole product.",
      "Restricting spacing to multiples of a single base unit produces an even rhythm because every gap shares a common factor.",
      "Keeping dimensions and gaps on one grid preserves proportional relationships as a layout scales up or down.",
    ],
    applications: [
      "Define a spacing scale of 8, 16, 24, 32, and 40 and draw all margins, padding, and gaps exclusively from it.",
      "When an off-system value seems necessary, multiply or divide by 8 and snap the result back to the nearest allowed value.",
      "Audit finished screens by confirming that every gap and component dimension sits on the grid before shipping.",
    ],
    uncertainties: [
      "The claims that a multiple-of-8 system scales perfectly and eliminates blurry pixels are made without a cited source, and crisp rendering depends on device pixel density as much as spacing values, so I presented them as intended benefits rather than guaranteed outcomes.",
      "The instruction that every value must be a multiple of 8 was softened into a discipline choice, since many working systems add a 4-point half-step for fine control.",
      "Only one opening still image was available; it verifies the grid topic and headline styling, but the demonstrated value ladder from 8 through 40 is spoken rather than shown in that frame, and the speech was normalized into just two long spans, which limits the evidence ranges to two.",
    ],
    evidence: [
      {
        start: 0,
        end: 4.8,
        label:
          "Guessing spacing is rejected and an 8-point grid of multiples is introduced",
      },
      {
        start: 4.8,
        end: 14,
        label:
          "The 8-to-40 value ladder is enumerated and credited with scaling, crisp pixels, and consistent rhythm",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Spacing system",
        title: "Stop guessing spacing values",
        body: "This lesson proposes the 8-point grid: a fixed ladder of spacing values in which every margin, pad, and gap is a multiple of one shared base unit.",
        visual: {
          type: "sequence",
          items: ["8", "16", "24", "32", "40"],
        },
      },
      {
        kind: "problem",
        eyebrow: "Arbitrary gaps",
        title: "Guesswork quietly breaks layout rhythm",
        body: "When each gap is chosen by feel, near-identical values accumulate into visible inconsistency, and nothing keeps large screens related to small ones.",
        visual: {
          type: "comparison",
          before: "Gaps chosen by eye, each slightly different",
          after: "Gaps snapped to shared multiples of 8",
        },
      },
      {
        kind: "principle",
        eyebrow: "Shared base unit",
        title: "One base unit keeps a layout in rhythm",
        body: "Because every allowed value shares the factor 8, spacing relationships stay proportional, and doubling or halving a value keeps the design on the same system.",
        visual: {
          type: "layers",
          items: [
            "Base unit of 8",
            "All values are multiples",
            "Even rhythm across screens",
            "Predictable scaling",
          ],
        },
      },
      {
        kind: "application",
        eyebrow: "Token set",
        title: "Snap every spacing decision to the grid",
        body: "Turn the multiples into named spacing tokens, use only those tokens in designs and code, and correct any off-grid value back to the nearest multiple.",
        visual: {
          type: "rule",
          statement: "If it is spacing, it is a multiple of 8",
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Grid discipline",
        title: "A grid turns spacing opinions into decisions",
        body: "The 8-point system removes recurring micro-decisions, so a team spends its attention on layout structure rather than on arguing over pixel gaps.",
        visual: {
          type: "rule",
          statement: "Multiply by 8, then stop deliberating",
        },
      },
    ],
  },
  {
    id: "DSsuIVMDViM",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DSsuIVMDViM/",
      creator: "@designparser",
      publishedAt: "2025-12-25",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Match Font Weight to Purpose",
    summary:
      "A font-weight study mapping the 100-900 type scale to distinct communicative roles, keeping running text near weight 400 and warning that ultra-thin weights lose legibility at small sizes, though the nine-step scale and one-role-per-weight assignments are presented as convention without a cited source.",
    principles: [
      "Typeface weight is a primary hierarchy device, signaling what leads and what supports before size or color is considered.",
      "Each step on the weight scale earns its place by serving a distinct role, from decorative lightness through emphatic heaviness.",
      "Very light weights trade legibility for delicacy at small sizes, so sustained reading should stay near the regular 400 weight.",
    ],
    applications: [
      "Give every weight in a project a named job, such as thin for decoration, regular for body copy, medium for emphasis, bold for headings, and black for high-impact statements.",
      "Hold running text at or near weight 400 and reserve thin and light cuts for large display sizes.",
      "Review each weight choice against its assigned role so decorative preference never overrides the text's function.",
    ],
    uncertainties: [
      "The nine-weight, 100-900 scale and the instruction to use 400 for readability are stated without a cited source; many type families offer fewer steps or named weights, so the count is a convention rather than a fact.",
      "The reel assigns exactly one purpose to each weight, which I softened into default role mappings, since real projects may shift roles depending on the family, size, and context.",
      "The single available still image is the opening title card on a grid background; it confirms the font-weight topic, but the individual weight demonstrations from thin to black described in the audio could not be visually verified.",
    ],
    evidence: [
      {
        start: 0,
        end: 5,
        label:
          "Weight is framed as a hierarchy tool and the nine-step 100-900 scale is introduced",
      },
      {
        start: 5,
        end: 13.08,
        label:
          "Six weights are each matched to a purpose, from decoration up to impact",
      },
      {
        start: 13.08,
        end: 16.8,
        label:
          "Thin weights are rejected for small text and 400 is recommended for readability",
      },
      {
        start: 16.8,
        end: 19.28,
        label: "Closing guidance to match each weight choice to its purpose",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Type hierarchy",
        title: "Font weight is a hierarchy tool",
        body: "This lesson treats the weight axis of a type family as a system of nine steps, from 100 to 900, that creates structure on a page before any other styling is applied.",
        visual: {
          type: "sequence",
          items: ["Thin 100", "Regular 400", "Bold 700", "Black 900"],
        },
      },
      {
        kind: "problem",
        eyebrow: "Weight misuse",
        title: "Delicate type can quietly fail readers",
        body: "A thin cut may look elegant, but at small sizes its strokes become hard to resolve, and a layout that ignores weight roles flattens hierarchy into decoration.",
        visual: {
          type: "comparison",
          before: "Small text set in thin weight",
          after: "Same text held at regular 400",
        },
      },
      {
        kind: "principle",
        eyebrow: "Weight roles",
        title: "Every weight step should carry a job",
        body: "The scale communicates only when each step is reserved for a role, so lightness reads as elegance, regular as reading weight, and the heavy end as impact.",
        visual: {
          type: "layers",
          items: [
            "Decoration: thin and light",
            "Body: regular",
            "Emphasis: medium",
            "Headings and impact: bold to black",
          ],
        },
      },
      {
        kind: "application",
        eyebrow: "Weight system",
        title: "Assign weights by purpose, not taste",
        body: "Decide up front which weights the project will use, keep sustained reading near 400, and step up through medium and bold as content demands emphasis.",
        visual: {
          type: "sequence",
          items: [
            "Name each weight's job",
            "Keep body copy near 400",
            "Reserve thin cuts for large sizes",
            "Audit the final hierarchy",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Weight rule",
        title: "Weight is meaning, so spend it deliberately",
        body: "A weight system succeeds when each choice reflects the text's purpose rather than momentary preference, keeping hierarchy legible at every size.",
        visual: {
          type: "rule",
          statement: "One weight, one job",
        },
      },
    ],
  },
  {
    id: "DSm--D1DWfo",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DSm--D1DWfo/",
      creator: "@designparser",
      publishedAt: "2025-12-23",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Structure Layouts With the Right Grid",
    summary:
      "A layout-grid study cataloging four structural systems, from the single-column manuscript grid to hierarchical grids that bend structure around priority, while treating the reel's framing of grids as the backbone of controlled order as design doctrine rather than a tested conclusion.",
    principles: [
      "A layout grid is the load-bearing structure of a composition, decided before any decorative styling is applied.",
      "Grid choice should follow content complexity, running from a single column for focused reading to modules for intricate interfaces.",
      "Departing from the grid sparingly can direct attention, provided an underlying order still governs the whole composition.",
    ],
    applications: [
      "Select one of the four grid types at project start based on how focused, flexible, or complex the content is.",
      "Use a one-column manuscript grid for long-form reading and a modular grid of rows and columns when many recurring components must align.",
      "Reserve deliberate grid breaks for the elements that deserve the most attention, so the departure itself signals importance.",
    ],
    uncertainties: [
      "Column grids are called the standard for flexibility and modular grids the engine of complex interfaces; both characterizations are asserted without examples or sources, so I present them as typical use cases rather than proven rankings.",
      "The advice to stop guessing and the invitation to break the grid were both softened, since abandoning intuition entirely is impractical and grid breaks only communicate meaning when the underlying structure is otherwise consistent.",
      "Two still images were inspected: the opening frame confirms the grid-types title card, and a later frame confirms a hierarchical-grid label around the grid-break discussion, but the manuscript, column, and modular demonstrations could not be visually verified from the available frames.",
    ],
    evidence: [
      {
        start: 0,
        end: 4.5,
        label:
          "Grids are framed as a layout's hidden structure and structuring is preferred to guessing",
      },
      {
        start: 4.5,
        end: 11.2,
        label:
          "Manuscript and column grids are described for focus and flexibility",
      },
      {
        start: 11.2,
        end: 20.4,
        label:
          "Modular grids are tied to complex interfaces and hierarchical grids to prioritizing what matters",
      },
      {
        start: 20.4,
        end: 23.6,
        label:
          "Design is characterized as controlled order rather than decoration, ending with a call to choose a grid",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Layout structure",
        title: "Grids are the bones of a layout",
        body: "This survey presents four grid systems as the hidden skeleton that holds a composition together, positioned as a decision that precedes all surface styling.",
        visual: {
          type: "layers",
          items: [
            "Manuscript grid",
            "Column grid",
            "Modular grid",
            "Hierarchical grid",
          ],
        },
      },
      {
        kind: "problem",
        eyebrow: "Unstructured layout",
        title: "Placement by feel produces decoration, not design",
        body: "When every element is positioned by eye, the result may look busy while lacking any governing order that ties screens and pages together.",
        visual: {
          type: "comparison",
          before: "Elements scattered by intuition",
          after: "Elements seated on a shared structure",
        },
      },
      {
        kind: "principle",
        eyebrow: "Grid selection",
        title: "Match the grid to the content's complexity",
        body: "Simple reading favors a single column, varied content favors columns, dense interfaces favor modules, and content with clear priorities favors a hierarchy-shaped grid.",
        visual: {
          type: "sequence",
          items: [
            "Manuscript: one column of focus",
            "Column: zones of flexibility",
            "Modular: rows plus columns",
            "Hierarchical: shaped by priority",
          ],
        },
      },
      {
        kind: "application",
        eyebrow: "Grid choice",
        title: "Choose the structure first, then decorate",
        body: "Decide the grid type before visual work begins, seat components onto it, and let the structure carry alignment so styling decisions stay superficial rather than structural.",
        visual: {
          type: "rule",
          statement: "Structure first, decoration second",
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Controlled order",
        title: "Design is controlled order, not ornament",
        body: "A grid converts arrangement into a repeatable decision system, and a deliberate break from it reads as emphasis precisely because order governs everything else.",
        visual: {
          type: "rule",
          statement: "Pick the grid before anything else",
        },
      },
    ],
  },
  {
    id: "DSlSHpzjT6j",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DSlSHpzjT6j/",
      creator: "@designparser",
      publishedAt: "2025-12-22",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Cut Options to Speed Decisions",
    summary:
      "A decision-design study applying Hick's law to interface choice density, arguing that trimming a large action set to a few options shortens decision time, while its specific second estimates are unsourced and its always-faster conclusion is softened to a general speed advantage.",
    principles: [
      "The time it takes to choose grows as the number of presented options grows, a relationship the reel attributes to Hick's law.",
      "Surfacing every available action at once burdens people with scanning and comparing work that the interface should absorb.",
      "Screens communicate best when they present a small set of high-value actions rather than an exhaustive menu.",
    ],
    applications: [
      "Reduce primary screens to the few actions most people need, and move the remainder into secondary levels or progressive disclosure.",
      "Group related options so that people compare a handful of grouped choices instead of one long undifferentiated list.",
      "Time real users choosing among actions on key screens, and treat hesitation as a signal that the visible option set is too large.",
    ],
    uncertainties: [
      "The figures that twenty buttons take six seconds and three buttons take under one are given without a cited study, and the spoken law name was contextually normalized to Hick's law; the underlying model describes logarithmic growth under controlled conditions, so the specific counts are treated as illustrative rather than measured.",
      "The closing claim that fewer options are always faster was softened, because decision speed also depends on labeling, grouping, and familiarity, and cutting choices can hide capability that some people need.",
      "One still image was inspected; it shows a dark comparison card contrasting a twenty-button panel with a three-button panel, which supports the numeric argument visually, but no frames were available for the later advice about simplifying screens.",
    ],
    evidence: [
      {
        start: 0,
        end: 2.48,
        label:
          "Slow reactions to excessive choice are attributed to Hick's law",
      },
      {
        start: 2.48,
        end: 6.72,
        label:
          "Processing times of six seconds for twenty buttons and under one second for three buttons are compared",
      },
      {
        start: 6.72,
        end: 11.2,
        label:
          "Viewers are urged to stop overwhelming users and keep interfaces simple, concluding that fewer options act faster",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Decision speed",
        title: "Too many options slow people down",
        body: "This lesson attributes hesitation in busy interfaces to Hick's law, contrasting a cluttered twenty-button panel with a focused three-button one.",
        visual: {
          type: "comparison",
          before: "Twenty buttons, long scanning time",
          after: "Three buttons, near-instant choice",
        },
      },
      {
        kind: "problem",
        eyebrow: "Choice overload",
        title: "Every added option taxes the chooser",
        body: "Each extra action must be noticed, read, and weighed against the others, and that cumulative comparison work surfaces as hesitation before anyone acts.",
        visual: {
          type: "layers",
          items: [
            "Perceive every option",
            "Compare alternatives",
            "Commit to one action",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Hick's law",
        title: "Decision time rises with choice count",
        body: "The reel's timing comparison illustrates the named principle: reaction lengthens as options multiply, so the size of the visible action set is itself a design cost.",
        visual: {
          type: "rule",
          statement: "Fewer choices, faster decisions",
        },
      },
      {
        kind: "application",
        eyebrow: "Fewer actions",
        title: "Curate the visible action set",
        body: "Inventory the actions a screen offers, promote only the essential ones to the first layer, and tuck the rest behind grouping or progressive disclosure.",
        visual: {
          type: "sequence",
          items: [
            "List every available action",
            "Mark the essential few",
            "Demote the remainder",
            "Reveal extras on demand",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Simplicity rule",
        title: "Show less so people move faster",
        body: "Simplicity here means curating choices rather than removing capability, letting depth in navigation replace breadth on a single screen.",
        visual: {
          type: "rule",
          statement: "Depth over breadth on primary screens",
        },
      },
    ],
  },
  {
    id: "DSizaLwCC-N",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DSizaLwCC-N/",
      creator: "@designparser",
      publishedAt: "2025-12-21",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Convincing Glass UI Copies Real Optics",
    summary:
      "A glass-effect study explaining how a Figma material uses angle, light, refraction, depth, dispersion, and frost to mimic real optical behavior so translucent interfaces read as physical material, though its Apple spending figure is uncited and its stated parameter count does not match the effects it names.",
    principles: [
      "Glass realism comes from simulating optical physics rather than from flat translucency alone.",
      "Each parameter should carry one physical job: angle sets light direction, light sharpens edges, refraction bends the backdrop, depth adds thickness, dispersion splits the spectrum, and frost supplies blur.",
      "Mimicking how the physical world treats glass, the approach the reel attributes to Apple, is what helps a digital material feel believable.",
    ],
    applications: [
      "Set the light angle first so edge highlights and background distortion share one consistent direction.",
      "Keep dispersion and frost separate in your tuning so spectrum splitting is controlled independently from overall softness.",
      "Adjust depth together with refraction so the backdrop bends as though the layer had real thickness.",
    ],
    uncertainties: [
      "The claims that Apple spent millions studying refraction and that the effect exposes exactly five parameters are asserted without cited sources, and the narration then names six distinct effects, so both the spending figure and the parameter count are treated as unverified.",
      "The closing promise that mastering these settings makes an interface feel real is softened in these notes to a contribution toward believability, since perceived realism also depends on context, motion, and device performance.",
      "Frame verification: both available stills were inspected and show a rounded frosted panel over a colorful gradient with numbered callouts, which supports the glass-parameter demonstration; the individual parameter values and the spoken Apple claim could not be read from the stills.",
    ],
    evidence: [
      {
        start: 0,
        end: 4.24,
        label: "Apple's refraction research is invoked as the hook",
      },
      {
        start: 4.24,
        end: 9.6,
        label:
          "The Figma glass material and its parameter count are introduced, starting with angle",
      },
      {
        start: 9.6,
        end: 15.6,
        label: "Light, refraction, and depth are each given a physical role",
      },
      {
        start: 15.6,
        end: 22.56,
        label:
          "Dispersion and frost are defined, and physical mimicry is framed as the goal",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Glass study",
        title: "Apple's refraction work inspired a learnable material",
        body: "The reel opens by crediting years of Apple's optical research, then argues the same physical behavior is now adjustable through named parameters in a design tool.",
        visual: {
          type: "comparison",
          before: "Flat translucent overlay",
          after: "Physically simulated glass",
        },
      },
      {
        kind: "problem",
        eyebrow: "Fake glass",
        title: "Translucency without optics reads as a gray smear",
        body: "A simple see-through panel ignores how light, thickness, and bending shape real glass, so the result looks pasted on rather than like a material.",
        visual: {
          type: "layers",
          items: [
            "Missing light direction",
            "No background bending",
            "Blur standing in for optics",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Optical roles",
        title: "Give every glass parameter one physical job",
        body: "When angle, light, refraction, depth, dispersion, and frost each model a single phenomenon, tuning one property no longer breaks the illusion created by the others.",
        visual: {
          type: "sequence",
          items: [
            "Angle steers light",
            "Light sharpens edges",
            "Refraction bends backdrop",
            "Depth adds thickness",
            "Dispersion and frost finish",
          ],
        },
      },
      {
        kind: "application",
        eyebrow: "Tuning order",
        title: "Build the glass effect from light to blur",
        body: "Establish direction first, add edge response and bending, give the layer thickness, then resolve color splitting and softness so the stack stays coherent.",
        visual: {
          type: "rule",
          statement: "Direction, then edges, then bending, then thickness",
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Physical truth",
        title: "Believable glass borrows its rules from the real world",
        body: "The reel's advice is to study how physical optics behave and reproduce those behaviors, because familiarity with real materials is what makes an interface feel tangible.",
        visual: {
          type: "comparison",
          before: "Decorative transparency",
          after: "Optics people already believe",
        },
      },
    ],
  },
  {
    id: "DSizm3VCCid",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DSizm3VCCid/",
      creator: "@designparser",
      publishedAt: "2025-12-21",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Give Border Radius a System, Not Guesswork",
    summary:
      "A border-radius study combining a defined brand character, a single base unit, proportional sizing, and nested-corner arithmetic so corner rounding follows rules and tokens rather than arbitrary values, though its percentage guidance is offered without cited evidence.",
    principles: [
      "Corner curvature should express a defined brand character and derive from one base unit rather than arbitrary numbers.",
      "Radius size should track element height, and small components should keep their curve smaller than their inner padding.",
      "Nested corners obey a fixed relationship: the inner curve is smaller than the outer curve by exactly the padding between them, and a component's function determines its curve.",
    ],
    applications: [
      "Choose the brand's rounding character first, then generate every radius value from a shared base unit.",
      "Check nested surfaces with the inner-plus-padding arithmetic so container and child corners stay in relationship.",
      "Cap radii on small components below their padding and record the finished scale as design tokens.",
    ],
    uncertainties: [
      "The proportional band of roughly 15 to 25 percent of element height is asserted without a cited study or benchmark, so it is treated here as a heuristic rather than a verified optimum.",
      "The claim that the system is complete only once tokenized is softened in these notes; documentation supports consistency but does not by itself guarantee it.",
      "Frame verification: the sole available still shows only a neutral grid backdrop with no readable on-screen text or diagrams, so none of the spoken numbers or rules could be confirmed visually.",
    ],
    evidence: [
      {
        start: 0,
        end: 5,
        label:
          "Hook promises a radius formula and the first step of defining the brand",
      },
      {
        start: 5,
        end: 13,
        label:
          "Base-unit instruction and proportional-height guidance with percentages",
      },
      {
        start: 13,
        end: 19.5,
        label: "Golden-rules list opens with nested-corner arithmetic",
      },
      {
        start: 19.5,
        end: 27.88,
        label:
          "Function-driven curves, small-component radius cap, and token documentation",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Radius system",
        title: "Corner rounding can run on rules instead of instinct",
        body: "The reel argues that curvature is a system-level decision: brand character, a base unit, and proportion decide the values so no radius is picked at random.",
        visual: {
          type: "comparison",
          before: "Radii chosen per element by feel",
          after: "One base unit scaled by explicit rules",
        },
      },
      {
        kind: "problem",
        eyebrow: "Random corners",
        title: "Unsystematic radii make surfaces feel unrelated",
        body: "When every corner is a one-off, components stop reading as parts of one product and nested shapes drift out of relationship.",
        visual: {
          type: "layers",
          items: ["Arbitrary values", "Broken nesting", "Undocumented scale"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Nesting math",
        title: "Subtract the padding to get the inner corner",
        body: "For nested corners this equation keeps child and container curves aligned, while the component's function, not taste, sets how round it should be.",
        visual: {
          type: "rule",
          statement: "Outer corner minus padding sets the inner corner",
        },
      },
      {
        kind: "application",
        eyebrow: "Token workflow",
        title: "Derive every radius from brand, unit, and proportion",
        body: "Start with the brand's curve character, set a base unit, size radii against element height, cap small components below their padding, then publish the scale as tokens.",
        visual: {
          type: "sequence",
          items: [
            "Define brand curve",
            "Set base unit",
            "Size by height ratio",
            "Cap small components",
            "Publish tokens",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Curve discipline",
        title: "A radius system is remembered rules plus tokens",
        body: "Rules make rounding predictable and teachable; tokenized documentation keeps the whole team applying the same curves.",
        visual: {
          type: "rule",
          statement: "Brand, unit, proportion, then tokens",
        },
      },
    ],
  },
  {
    id: "DSdb2loDfCN",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DSdb2loDfCN/",
      creator: "@designparser",
      publishedAt: "2025-12-19",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Tune Line Height to Text Role and Column Width",
    summary:
      "A line-height study explaining the font-size-times-multiplier calculation and pairing ratio bands with text roles and column widths so vertical spacing supports comfortable reading, though its numeric guidelines arrive without cited sources.",
    principles: [
      "Line height should be computed as font size times a chosen multiplier, with the surplus distributed evenly above and below each line.",
      "The multiplier should follow the text's role: roomier for body and small text, tighter for large headings.",
      "Column width should influence leading, with wide measures around 60 to 75 characters keeping looser spacing and narrow measures tightening instead.",
    ],
    applications: [
      "Compute leading explicitly, for example 16 pixels at a multiplier of 1.5 yielding 24 pixels, and confirm the eight surplus pixels split evenly between the top and bottom of the line.",
      "Start from role-based bands of roughly 1.5 to 1.6 for body text, 1.1 to 1.2 for headings, and 1.6 to 1.7 for small text, then adjust for the typeface.",
      "Check the measure before finalizing: wide columns stay in the 1.5 to 1.6 range while columns under about 50 characters tighten toward 1.3 to 1.4.",
    ],
    uncertainties: [
      "All numeric guidance, including the ratio bands per role and the 60-to-75 and under-50 character thresholds, is stated without a cited study or source, so it is treated as practical heuristics rather than validated optima.",
      "The opening claim that poor spacing ruins readability and the closing promise of leveling up are hyperbole softened here to a strong influence on reading comfort, and the final word was resolved contextually as typography after an apparent speech-recognition slip.",
      "Frame verification: the sole available still was inspected and shows two stacked text lines with vertical arrows marking the gap between them, which supports the line-height demonstration; the later ratio bands and column-width rules had no corresponding visuals to check.",
    ],
    evidence: [
      {
        start: 0,
        end: 5.52,
        label:
          "Spacing is blamed for poor readability and line height is defined",
      },
      {
        start: 5.52,
        end: 15.04,
        label:
          "The multiplier math is demonstrated with 16 pixels at 1.5 and an even split",
      },
      {
        start: 15.04,
        end: 24.52,
        label:
          "Ratio bands are assigned to body text, headings, and small text",
      },
      {
        start: 24.52,
        end: 35.08,
        label: "Leading is matched to column width and the lesson closes",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Leading basics",
        title: "Line height is a calculation, not a guess",
        body: "The reel defines leading as the vertical room between lines and insists it come from multiplying font size by a deliberate multiplier.",
        visual: {
          type: "comparison",
          before: "Leading chosen by eye",
          after: "Leading derived from font size",
        },
      },
      {
        kind: "problem",
        eyebrow: "Spacing failures",
        title: "One lazy multiplier cannot serve every role",
        body: "A single global ratio squeezes headings while letting small text float loose, and it ignores how wide the column is.",
        visual: {
          type: "layers",
          items: [
            "One global ratio",
            "Mismatched text roles",
            "Ignored column width",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Leading math",
        title: "Multiply the font size, then split the remainder",
        body: "Size times multiplier gives the line box, and whatever exceeds the glyphs should divide evenly between the space above and below each line.",
        visual: {
          type: "rule",
          statement: "Line height = font size × multiplier",
        },
      },
      {
        kind: "application",
        eyebrow: "Ratio selection",
        title: "Pick the band from role, then adjust for measure",
        body: "Assign looser bands to body and small text, tighter ones to headings, and tighten further only when the column runs narrow.",
        visual: {
          type: "sequence",
          items: [
            "Identify the text role",
            "Check column width",
            "Multiply size by the band",
            "Verify even spacing",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Vertical rhythm",
        title: "Readable spacing follows the text, not a default",
        body: "Let what the text is and how wide it runs decide its leading, and re-check the choice whenever role or measure changes.",
        visual: {
          type: "rule",
          statement: "Role and measure set the multiplier",
        },
      },
    ],
  },
  {
    id: "DSbA3f4jQ0M",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DSbA3f4jQ0M/",
      creator: "@designparser",
      publishedAt: "2025-12-18",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Build Hierarchy With Nonlinear Type Scales",
    summary:
      "A type-scale study arguing that evenly stepped sizes erase hierarchy, contrasting stable ratio-based growth with expressive Fibonacci-style growth and matching each to interface or editorial content, while its hierarchy and method-fit claims go untested by any cited evidence.",
    principles: [
      "Type sizes that grow by equal steps deliver uniform spacing and bigger text rather than a readable ranking of information.",
      "Widening the gap between steps as sizes increase makes hierarchy the output of a deliberate system instead of an accident.",
      "The growth method should follow the content: a fixed ratio suits stable interface systems, while Fibonacci-style addition suits dramatic editorial and hero typography.",
    ],
    applications: [
      "Replace evenly spaced size steps with a progression whose intervals expand as the sizes get larger.",
      "Adopt a modular ratio for product interfaces and save Fibonacci-based scales for editorial spreads and hero statements.",
      "Compare candidate scales side by side in a type-scale generator and choose based on how the real content reads.",
    ],
    uncertainties: [
      "The claim that linear scaling destroys hierarchy, along with the pairing of each method with a specific use case, is practitioner assertion offered without user research or cited examples.",
      "The two methods are framed as a strict split between stable and dramatic, which the principles soften because hybrid progressions and custom ratios are common in real systems.",
      "The only still available is the series hook card naming typography failure with one orange-accented word on a grid background, so the garbled opening term was resolved contextually to typography, and none of the described scale examples could be verified visually.",
    ],
    evidence: [
      {
        start: 0,
        end: 6.04,
        label:
          "Linear scaling is diagnosed as uniform spacing without hierarchy",
      },
      {
        start: 6.04,
        end: 12.68,
        label:
          "Nonlinear growth with widening gaps is credited as systematic hierarchy",
      },
      {
        start: 12.68,
        end: 19.44,
        label:
          "Modular ratio and Fibonacci methods are introduced with opposing characters",
      },
      {
        start: 19.44,
        end: 26.54,
        label:
          "Method selection by context and scale comparison tools are recommended",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Type scale study",
        title: "Linear size steps flatten hierarchy",
        body: "Evenly spaced sizes make every jump feel identical, so text simply gets bigger without gaining rank. A deliberate growth pattern separates levels at a glance.",
        visual: {
          type: "comparison",
          before: "Sizes spaced by equal steps",
          after: "Intervals that widen as sizes grow",
        },
      },
      {
        kind: "problem",
        eyebrow: "Even spacing",
        title: "Uniform gaps read as size change, not hierarchy",
        body: "When steps stay constant, headings and body copy differ only in magnitude. Nothing in the system signals which level matters more.",
        visual: {
          type: "layers",
          items: ["Equal steps", "Even-looking gaps", "Magnitude without rank"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Systematic hierarchy",
        title: "Grow the gaps deliberately as type gets larger",
        body: "Hierarchy should come from a defined progression rather than ad hoc sizing choices. Widening intervals give larger text proportionally more separation.",
        visual: {
          type: "rule",
          statement: "Wider steps at larger sizes = hierarchy by system",
        },
      },
      {
        kind: "application",
        eyebrow: "Choosing a method",
        title: "Match the scale method to the content",
        body: "A modular ratio keeps interface typography predictable, while Fibonacci-style growth suits expressive editorial moments. Testing both against real content exposes which fits.",
        visual: {
          type: "sequence",
          items: [
            "Set a base size",
            "Try a modular ratio",
            "Try Fibonacci growth",
            "Compare with real content",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Scale rule",
        title: "Let the content decide the scale",
        body: "No single progression wins by default; the material being set should choose between stability and drama. A scale exists to rank information, not just to resize it.",
        visual: {
          type: "rule",
          statement: "A type scale ranks content; it does not just resize it",
        },
      },
    ],
  },
  {
    id: "DSYeolGiNXL",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DSYeolGiNXL/",
      creator: "@designparser",
      publishedAt: "2025-12-17",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Build Color Ramps on a Single Hue",
    summary:
      "A color-system study arguing that scattered code picks produce look-alike but unrelated values, and showing how to build a numbered single-hue ramp anchored by text and background extremes and finished with a human contrast check, though its claim about designer habits goes uncited.",
    principles: [
      "Hand-picked color values can look similar while sharing no systematic relationship.",
      "A usable palette is a numbered ramp from one hue, anchored by its darkest step for text and its lightest step for backgrounds.",
      "Step numbers alone do not prove quality; perceived contrast has to be confirmed by eye.",
    ],
    applications: [
      "Start from one base color at the middle of the scale, then define the darkest and lightest steps before anything else.",
      "Derive the remaining numbered steps by changing lightness and saturation while holding the hue constant.",
      "Treat the finished ramp as a draft and manually check text-on-background pairings instead of trusting the step numbers.",
    ],
    uncertainties: [
      "The claim that most designers work from unrelated color values is stated without any cited survey, research, or examples.",
      "Hue-saturation-lightness is presented as the fix for palette coherence, which the principles soften into one organizing model, since it does not by itself guarantee perceptual evenness across steps.",
      "The only still available is the series hook card naming color failure with one orange-accented word on a grid background, so no swatch ramps, numbered steps, or tool views could be verified visually.",
    ],
    evidence: [
      {
        start: 0,
        end: 8.32,
        label:
          "Scattered color values are diagnosed as similar-looking but unrelated",
      },
      {
        start: 8.32,
        end: 13.04,
        label:
          "Hue, saturation, and lightness are proposed as the organizing model",
      },
      {
        start: 13.04,
        end: 22.24,
        label:
          "A base color plus darkest and lightest anchors define the ramp while hue stays fixed",
      },
      {
        start: 22.24,
        end: 29.36,
        label:
          "Remaining steps are filled and contrast is judged by eye rather than by numbers",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Color scale study",
        title: "Hex picks alone do not make a palette",
        body: "Two similar blues can sit side by side yet belong to no shared system. Working from a scale instead of isolated values keeps every color related.",
        visual: {
          type: "comparison",
          before: "Look-alike blues from separate codes",
          after: "One hue ramp from darkest to lightest",
        },
      },
      {
        kind: "problem",
        eyebrow: "Unrelated colors",
        title: "Similar-looking values can hide missing relationships",
        body: "Matching appearance suggests a family that does not exist. Without a shared hue and ordered steps, the palette cannot support consistent text and surface roles.",
        visual: {
          type: "layers",
          items: ["Look-alike hues", "No shared hue", "No ordered steps"],
        },
      },
      {
        kind: "principle",
        eyebrow: "Single-hue ramp",
        title: "Anchor the extremes, then hold the hue steady",
        body: "Fixing the darkest and lightest steps first assigns the ramp its text and background roles. Intermediate colors then vary only in lightness and saturation.",
        visual: {
          type: "sequence",
          items: [
            "Anchor one base step",
            "Set darkest step for text",
            "Set lightest step for surfaces",
            "Hold hue, vary lightness",
          ],
        },
      },
      {
        kind: "application",
        eyebrow: "Fill and check",
        title: "Number the steps, then judge contrast by eye",
        body: "Populating the middle numbers completes the system on paper, but readability is decided by looking. Pair candidates for text and backgrounds and verify the result manually.",
        visual: {
          type: "rule",
          statement: "Numbers organize the ramp; eyes approve it",
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Palette rule",
        title: "Reach for a scale before adding another color",
        body: "Growing a palette should mean extending an ordered hue family rather than collecting stray values. The model provides structure, and the eye makes the final call.",
        visual: {
          type: "comparison",
          before: "One more stray color value",
          after: "One more step on the ramp",
        },
      },
    ],
  },
  {
    id: "DSU-n5rjcrz",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DSU-n5rjcrz/",
      creator: "@designparser",
      publishedAt: "2025-12-16",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Choose Near Black Over Pure Black",
    summary:
      "A dark-surface study arguing that pure black backgrounds create harsh on-screen contrast while near-black tones feel calmer and more professional, while conceding that luxury brands use pure black deliberately for impact, with the eye-strain and industry-usage claims left unverified.",
    principles: [
      "Pure black backgrounds on screens create harsh contrast that is said to strain the eyes over long viewing sessions.",
      "Because real surfaces and shadows are never perfectly black, mainstream digital products soften their blacks.",
      "Pure black remains a valid deliberate choice when a brand wants maximum contrast and a luxurious, authoritative impression.",
    ],
    applications: [
      "Set default interface and reading surfaces to near-black values for a calmer, more refined feel.",
      "Reserve pure black for brand moments where maximum impact matters more than viewing comfort.",
      "Make the impact-versus-comfort choice explicit for each dark surface instead of defaulting to either extreme.",
    ],
    uncertainties: [
      "The eye-strain and industry-avoidance claims are stated without cited research or measurements, and the brand examples were not independently checked against those products' current palettes.",
      "The opening framing that pure black ruins designs is hyperbole that the reel itself walks back by naming brands that use it on purpose, so the principles present a trade-off rather than a ban.",
      "The only still available is the series hook card naming black as the failing topic with one orange-accented word on a grid background, so no black-value comparisons or product examples could be verified visually.",
    ],
    evidence: [
      {
        start: 0,
        end: 6.8,
        label:
          "Pure black is blamed for harsh on-screen contrast and eye strain",
      },
      {
        start: 6.8,
        end: 14.96,
        label:
          "Real surfaces never being perfectly black is given as the reason products soften it",
      },
      {
        start: 14.96,
        end: 22.96,
        label:
          "Deliberate pure-black use is credited to brands seeking luxury and authority",
      },
      {
        start: 22.96,
        end: 29.28,
        label:
          "The impact-versus-comfort trade-off resolves in favor of near black",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Dark surface study",
        title: "Pure black behaves differently on screens",
        body: "The blackest possible value maximizes contrast against light text, which can read as harsh over time. Slightly lifted blacks keep depth while easing the edge.",
        visual: {
          type: "comparison",
          before: "Pure black surface under light text",
          after: "Near-black surface under light text",
        },
      },
      {
        kind: "problem",
        eyebrow: "Harsh contrast",
        title: "Maximum black can tax the eyes over long sessions",
        body: "The strongest possible edge between text and background demands more of viewers the longer they read. Interfaces meant for extended use pay a comfort cost for it.",
        visual: {
          type: "layers",
          items: [
            "Pure black surface",
            "Bright text layer",
            "Harsh edge contrast",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Real-world reference",
        title: "Nothing in nature is perfectly black",
        body: "Physical surfaces and shadows always carry some color, which is why softened blacks tend to look more natural on screens. Mainstream consumer products lean on that softened range.",
        visual: {
          type: "rule",
          statement: "If shadows hold color, so should your blacks",
        },
      },
      {
        kind: "application",
        eyebrow: "Deliberate extremes",
        title: "Save pure black for impact, use near black for comfort",
        body: "Working surfaces benefit from lifted blacks, while brand-defining moments can exploit the punch of the pure value. The choice should be explicit for every dark surface.",
        visual: {
          type: "sequence",
          items: [
            "Audit your darkest values",
            "Lift working surfaces",
            "Reserve pure black for brand moments",
            "State the trade-off",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Black balance",
        title: "Near black reads calm, pure black reads loud",
        body: "Each direction buys something: comfort and refinement on one side, impact and authority on the other. Let the brand's priority, not habit, set the value.",
        visual: {
          type: "rule",
          statement: "Comfort by default, impact by decision",
        },
      },
    ],
  },
  {
    id: "DSSQ2tvjSw1",
    locale: "en",
    source: {
      url: "https://www.instagram.com/reel/DSSQ2tvjSw1/",
      creator: "@designparser",
      publishedAt: "2025-12-15",
    },
    processedAt: "2026-08-12",
    reviewedAt: "2026-08-16",
    status: "reviewed",
    title: "Balance Color With the 60-30-10 Rule",
    summary:
      "A color-proportion study that assigns one dominant neutral share, a smaller secondary brand share, and a scarce accent kept for key actions, with the caveat that its fixed percentages and its big-brand examples are asserted rather than demonstrated.",
    principles: [
      "One neutral color should own most of a composition so the layout keeps calm, open space.",
      "A secondary color at a smaller share can carry brand identity and support hierarchy without taking over.",
      "An accent color steers attention exactly because it is scarce and tied to the few actions that matter most.",
    ],
    applications: [
      "Split the palette into roughly six parts neutral, three parts secondary brand color, and one part accent before polishing individual screens.",
      "Keep the accent color off decoration and spend it on primary calls to action and other critical interactions.",
      "When a screen feels cluttered, measure how much area each color occupies and pull competing colors back into the dominant neutral field.",
    ],
    uncertainties: [
      "The fixed 60, 30, and 10 percentages are given as a recipe with no cited study or measurement, so the split is an unverified heuristic rather than a proven optimum.",
      "The claim that the named streaming and travel platforms follow this split is asserted without shown examples, and two absolutisms were softened: accent color was framed as best kept scarce rather than forbidden elsewhere, and skipping the rule was treated as a risk of clutter rather than a guarantee of amateur-looking work.",
      "Frame check: the two available stills show an abstract gridded background and two blue blocks sized for the secondary and accent shares; the dominant neutral share and any real product examples could not be confirmed in the images.",
    ],
    evidence: [
      {
        start: 0,
        end: 6.8,
        label:
          "Cluttered layouts are diagnosed and a 60-30-10 split is urged, name-checking major consumer apps",
      },
      {
        start: 6.8,
        end: 13.84,
        label: "The dominant neutral share is introduced as calm, open space",
      },
      {
        start: 14.56,
        end: 29.04,
        label:
          "The secondary and accent shares are assigned hierarchy and action roles",
      },
      {
        start: 29.04,
        end: 35.92,
        label:
          "Skipping the split is blamed for wandering attention and an amateur feel",
      },
    ],
    slides: [
      {
        kind: "source",
        eyebrow: "Color proportion",
        title: "A classic split gives every color a distinct job",
        body: "The reel recommends dividing color into one large neutral majority, a mid-sized brand share, and a small accent, attributing the habit to well-known consumer apps.",
        visual: {
          type: "comparison",
          before: "Many colors at equal weight",
          after: "Unequal 60, 30, and 10 shares",
        },
      },
      {
        kind: "problem",
        eyebrow: "Chaotic palette",
        title: "Without a dominant share, attention has no entry point",
        body: "When colors compete at similar strength, the eye wanders and the work can read as untrained rather than intentional.",
        visual: {
          type: "layers",
          items: [
            "Competing hues",
            "No dominant field",
            "No marked focal action",
          ],
        },
      },
      {
        kind: "principle",
        eyebrow: "Unequal shares",
        title: "Size each color share for the job it performs",
        body: "The neutral majority keeps the field calm, the secondary share carries brand and hierarchy, and the scarce accent marks the most important actions.",
        visual: {
          type: "rule",
          statement: "Neutral calms, secondary brands, accent directs",
        },
      },
      {
        kind: "application",
        eyebrow: "Palette budget",
        title: "Budget color in parts before polishing details",
        body: "Assign the big share to a neutral base, give brand color the middle share, then spend the small accent only where you want a click or decision.",
        visual: {
          type: "sequence",
          items: [
            "Block the neutral field",
            "Layer brand color at the middle share",
            "Spend the accent on key actions",
            "Squint-test where the eye lands first",
          ],
        },
      },
      {
        kind: "takeaway",
        eyebrow: "Accent scarcity",
        title: "The smallest share does the biggest attention job",
        body: "An accent works because it is rare; spreading it across decoration erases the signal that guides people to act.",
        visual: {
          type: "rule",
          statement: "Six parts calm, three parts brand, one part action",
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
