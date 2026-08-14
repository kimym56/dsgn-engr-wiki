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

## [2026-08-13] review | DENG wave 1 publication decisions approved

- Change: Set the publication decision to `publish` for all nine analyzed DENG wave-1 Candidates. This approves entry into the public-reference workflow but does not create reference records or change published-record counts.
- Affected IDs: taste-is-eating-silicon-valley, web-interface-guidelines, developing-taste, pasito, vaul, family-wallet, on-taste-part-3, manage-design-projects, ux-engineer-a-terminal-career.
- Approval: The project maintainer explicitly approved all nine analyzed Candidates on 2026-08-13.

## [2026-08-13] review | DENG wave 2 expansion approved

- Change: Approved one bounded analysis wave for all 13 unique uninspected depth-2 Candidate nodes. The already analyzed `on-taste-part-3` node is excluded from reanalysis; its depth-2 edge remains provenance only.
- Affected IDs: the-rise-of-the-software-creator, pursuits-that-cant-scale, rise-of-the-silicon-valley-small-business, silicon-valley-wikipedia, arnold-bennett-wikipedia, disable-transitions-temporarily, next-themes, media-hover, will-change, safari-16-4, craft-and-beauty-the-business-value-of-form-in-function, app-dissection, the-taste-gap-ira-glass.
- Approval: The project maintainer explicitly approved expansion of all 13 pending wave-2 Candidates on 2026-08-13.

## [2026-08-13] ingest | DENG resource wave 2 completed

- Change: Completed the approved bounded inspection of 13 depth-2 Candidates. Eleven accessible destinations received English draft analyses and Korean review translations; the form-gated Stripe video and unreadable X post were recorded as inaccessible without inferred content. Verified two MDN redirects to their current canonical reference paths. Recorded 38 active wave-3/depth-3 edges from explicit related-reading, Specifications, See also, and directory-entry sections: 34 new Candidate nodes plus four provenance edges to existing Working Theorys nodes. No wave-3 destination was opened. Wikipedia citation apparatus was excluded because it supports broad encyclopedia entries rather than a curated design-engineering learning path. No publication decision changed.
- Affected IDs: the-rise-of-the-software-creator, pursuits-that-cant-scale, rise-of-the-silicon-valley-small-business, silicon-valley-wikipedia, arnold-bennett-wikipedia, disable-transitions-temporarily, next-themes, media-hover, will-change, safari-16-4, craft-and-beauty-the-business-value-of-form-in-function, app-dissection, the-taste-gap-ira-glass, status-limbo, love-the-mission-or-love-the-game, css-media-queries-level-4-hover, using-media-queries, media-at-rule, css-will-change-module-level-1, transform-css-property, translate-css-property, scale-css-property, rotate-css-property, animation-css-property, css-will-change-guide, app-dissection-neubible-ios, app-dissection-shorts-ios, app-dissection-stripe-dashboard-ios, app-dissection-pinterest-ios, app-dissection-hyperlapse-ios, app-dissection-inbox-ios, app-dissection-square-order-ios, app-dissection-android-lollipop, app-dissection-instagram-ios, app-dissection-tumblr-ios, app-dissection-carousel-ios, app-dissection-quartz-ios, app-dissection-twitter-ios, app-dissection-paper-facebook-ios, app-dissection-secret-ios, app-dissection-google-search-ios, app-dissection-sunrise-ios, app-dissection-flickr-ios, app-dissection-skype-ios, app-dissection-path-ios, app-dissection-soundcloud-ios, app-dissection-foursquare-ios.
- Approval: The project maintainer approved all pending wave-2 Candidates for one bounded expansion on 2026-08-13. Publication decisions and any wave-3 expansion remain pending human review.

## [2026-08-14] ingest | DENG wave 1 review records drafted

- Change: Added nine schema-validated local English reference records at review status for the approved DENG wave-1 Candidates. They await the explicit public-metadata gate before publication.
- Affected IDs: taste-is-eating-silicon-valley, web-interface-guidelines, developing-taste, pasito, vaul, family-wallet, on-taste-part-3, manage-design-projects, ux-engineer-a-terminal-career.
- Approval: The 2026-08-13 Candidate approval and accepted public-reference design specification authorized drafting, not publication.
