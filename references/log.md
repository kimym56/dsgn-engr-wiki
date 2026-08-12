# Reference activity log

Append new entries in chronological order. Never rewrite an earlier entry; record corrections in a new entry.

Each entry heading must use `## [YYYY-MM-DD] operation | subject`. Supported operations begin with `ingest`, `review`, `synthesize`, `lint`, `archive`, and `restore`.

Every durable operation must include `Change`, `Affected IDs`, and `Approval` fields, using `none` when a field has no applicable value.

## [2026-08-07] review | Reference workflow initialized

- Change: Created the approved Markdown collection workflow.
- Affected IDs: none.
- Approval: project maintainer approved the design specification.

## [2026-08-10] ingest | Initial reference inbox seeded

- Change: Recorded 18 maintainer-supplied URLs in their original order.
- Affected IDs: none.
- Approval: The maintainer supplied the URLs and explicitly requested their transcription.

## [2026-08-11] ingest | Batch 1 source analyses drafted

- Change: Added five draft source analyses and recorded processing outcomes for inbox lines 1, 2, 4, 5, and 6.
- Affected IDs: designparser-design-rules-cheatsheet, deng-design-engineering-directory, emil-kowalski, devouring-details, emil-course-platform.
- Approval: The maintainer approved the Batch 1 draft writes on 2026-08-11.

## [2026-08-11] review | Korean Batch 1 analysis translations added

- Change: Added Korean review translations for the five Batch 1 source analyses and linked them from the reference index.
- Affected IDs: designparser-design-rules-cheatsheet, deng-design-engineering-directory, emil-kowalski, devouring-details, emil-course-platform.
- Approval: The maintainer approved Korean review-aid translations while keeping the English analyses canonical.

## [2026-08-12] ingest | DENG resource wave 1 completed

- Change: Completed the bounded DENG `Resources` wave: 15 active wave-1/depth-1 edges reached 14 unique Candidate nodes, all terminal (9 analyzed; 5 inaccessible; 0 non-terminal). Added 9 English draft analyses and 9 Korean review translations. Recorded 14 active wave-2/depth-2 edges to 14 Candidate nodes; 13 unique uninspected nodes across 13 edges remain pending for a later expansion, while the additional `developing-taste` → `on-taste-part-3` edge retains provenance for an already analyzed node. The DENG duplicate destination is two distinct edges to `web-interface-guidelines`; its conflicting card labels remain preserved in the node. No redirect outcomes were recorded. The five inaccessible YouTube Candidates lack complete captions or transcripts; no substantive analysis was inferred from metadata. No publication decision changed.
- Affected IDs: taste-is-eating-silicon-valley, web-interface-guidelines, developing-taste, pasito, vaul, family-wallet, on-taste-part-3, manage-design-projects, ux-engineer-a-terminal-career, the-rise-of-design-engineering, the-easy-way-to-design-top-tier-websites, designing-data-intensive-applications-chapters-1-and-2, how-this-designer-learned-code-and-became-a-design-engineer, how-to-accelerate-your-design-career-with-ai, the-rise-of-the-software-creator, pursuits-that-cant-scale, rise-of-the-silicon-valley-small-business, silicon-valley-wikipedia, arnold-bennett-wikipedia, disable-transitions-temporarily, next-themes, media-hover, will-change, safari-16-4, craft-and-beauty-the-business-value-of-form-in-function, app-dissection, the-taste-gap-ira-glass.
- Approval: The maintainer approved the bounded DENG expansion and the analysis/translation draft writes. Publication remains pending; a new explicit approval is required before expanding wave 2.
