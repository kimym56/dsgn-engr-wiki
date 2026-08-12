# Reference collection instructions

These rules apply to this directory and its descendants. Root repository instructions still apply.

## Ownership boundaries

- The maintainer owns `inbox.md` and supplies every root-source URL.
- Never rewrite, reorder, remove, or annotate submitted URL lines unless the maintainer explicitly asks for cleanup.
- Add an outbound Candidate only after a maintainer has granted Expansion approval for its parent source and only when the link passes the qualifying-section policy.
- Expansion approval permits one bounded analysis wave; record qualifying child links for a later wave, but do not inspect or analyze their destinations without another Expansion approval.
- Canonical URL is the primary deduplication key. Add distinct provenance edges to an existing Candidate, report identical edges without duplicating them, and retain inactive-edge history when a rescan no longer finds a link.
- Keep an unavailable destination as `inaccessible` and do not infer its content from snippets, previews, or parent descriptions.
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

## Expand an approved source wave

1. Confirm the maintainer's Expansion approval and capture the access date.
2. Inspect the complete available parent source and identify only qualifying curated-resource sections: `Resources`, `References`, `Further reading`, `Recommended`, or a clearly equivalent section by meaning.
3. Exclude global or local navigation, author and practitioner rosters, incidental prose links, social profiles, image-search or image-credit links, advertisements, sponsors, affiliates, partners, footer or legal links, and login, account, or utility actions. Report ambiguous sections for human judgment.
4. Preserve section label and displayed link text, resolve redirects and canonical destinations, and create or update Candidate records under `candidates/<candidate-id>.md` with their discovery edges.
5. Analyze accessible first-level Candidates only. Record qualifying links found inside those analyses as the next wave; do not inspect or analyze them in this wave.
6. Create the English draft analysis and Korean review translation for each completed analysis. Publication approval remains separate and human-owned.
7. Record invalid, redirected, inaccessible, restricted, duplicate, and partial-batch outcomes in the index and append-only log. External failures never block the application build.

## Approved write locations

- Source analyses: `analyses/sources/<reference-id>.md`
- Candidates: `candidates/<candidate-id>.md`
- Korean review translations: `analyses/ko/sources/<candidate-id>.md`
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
