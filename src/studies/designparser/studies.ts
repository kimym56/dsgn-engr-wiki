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
]);

export function getDesignparserStudy(id: string) {
  return designparserStudies.find((study) => study.id === id);
}

export function getDesignparserStudyParams() {
  return designparserStudies.map(({ id }) => ({ reelId: id }));
}
