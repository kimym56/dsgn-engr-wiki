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
