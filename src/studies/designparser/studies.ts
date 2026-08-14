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
]);

export function getDesignparserStudy(id: string) {
  return designparserStudies.find((study) => study.id === id);
}

export function getDesignparserStudyParams() {
  return designparserStudies.map(({ id }) => ({ reelId: id }));
}
