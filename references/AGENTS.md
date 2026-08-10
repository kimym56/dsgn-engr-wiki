# Reference collection instructions

These rules apply to this directory and its descendants. Root repository instructions still apply.

## Ownership boundaries

- The maintainer owns `inbox.md` and supplies every candidate URL.
- Never add a URL, follow an outbound link as a candidate, or search for related sources.
- Never rewrite, reorder, remove, or annotate submitted URL lines unless the maintainer explicitly asks for cleanup.
- AI-generated material is a proposal until the maintainer approves the write.
- Only a human may approve publication, conclusion-changing synthesis, or product-design adoption.

## Read order

1. Read `index.md` to locate durable knowledge and unresolved review work.
2. Read only the relevant submitted URLs, records, analyses, or concepts.
3. Read `log.md` when recent operations or approval history matter.
4. Read [`../docs/content-strategy.md`](../docs/content-strategy.md) and [`../docs/decisions/0002-reference-records-and-external-sources.md`](../docs/decisions/0002-reference-records-and-external-sources.md) before drafting editorial metadata.

## Ingest a submitted URL

1. Read URLs only from `inbox.md` under `## Paste URLs here`, in written order.
2. Preserve the submitted text even when a redirect or different canonical destination is found.
3. Validate the URL and report repeated submissions.
4. Inspect the complete submitted source when access permits; never rely on a search snippet or social preview.
5. Verify canonical URL, publisher, author when useful, format, source language, dates, attribution, and access conditions.
6. Evaluate selection fit before recommending a reference.
7. Draft metadata from `../templates/reference-record.md` and keep `status: draft`.
8. Draft separate analysis from `../templates/source-analysis.md`.
9. Propose relevant updates to existing concept pages; do not create or change durable synthesis before approval.
10. Present proposed file paths, index changes, and a log entry for approval before writing.

## Approved write locations

- Source analyses: `analyses/sources/<reference-id>.md`
- Concept syntheses: `analyses/concepts/<concept-id>.md`
- Reference records: no default path until Phase 2 defines validated storage
- Catalog: `index.md`
- History: `log.md`

Use stable lowercase kebab-case IDs. Do not create analysis directories until the first corresponding write is approved.

## Proposal response order

The processing results are proposals, not human-controlled record statuses.

1. Submitted URL and line number
2. Processing result: `draft`, `duplicate`, `invalid`, `inaccessible`, `reject-recommended`, or `needs-review`
3. Canonical destination and redirect evidence
4. Draft reference record
5. Draft source analysis
6. Proposed concept changes with supporting reference IDs
7. Proposed index and append-only log changes
8. Explicit questions requiring human judgment

## Query

- Read `index.md` first and open only relevant artifacts.
- Cite stable reference IDs and canonical external sources.
- Distinguish source claims, project editorial judgment, and AI synthesis.
- Propose valuable new synthesis for review instead of silently writing it.

## Lint

Report invalid or repeated submissions, duplicate canonical URLs or IDs, missing attribution, broken local links, orphan analyses, unknown relationships, unsupported synthesis claims, undocumented contradictions, stale reviews, unresolved access failures, and publication without approval evidence.

Do not silently repair meaning, identity, status, or provenance. Apply mechanical local-link fixes only when explicitly requested.

## Archive and restore

Archived items leave normal browsing and active synthesis without deleting their history. Keep them discoverable through `index.md` and `log.md`. Request approval before updates that change synthesis conclusions. Restore only after a new verification, human review, and log entry; restored evidence requires new approval before any conclusion-changing synthesis update.

## Content and design safety

- Write original summaries and analysis; do not copy substantive third-party text.
- Do not store or reuse source branding, assets, screenshots, code, media, or arbitrary preview images.
- Extract principles and reasoning, not visual identity.
- A single source does not justify a global product pattern without explicit human reasoning.
- Test approved product patterns independently for this project's content, responsive behavior, keyboard use, accessibility, and reduced motion.

## Failure handling

- Invalid URL: preserve the line and report a specific syntax or scheme problem.
- Redirect: report submitted and resolved destinations.
- Duplicate canonical destination: produce one draft and identify every duplicate line.
- Paywall or authentication: record the access condition.
- Inaccessible source: keep it unverified and do not infer from secondary descriptions.
- Conflicting evidence: preserve the disagreement as a review issue.
- External failure: never make it part of the application build gate.
