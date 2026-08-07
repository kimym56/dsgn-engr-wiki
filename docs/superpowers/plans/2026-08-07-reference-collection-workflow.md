# Reference Collection Workflow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Markdown-native, human-seeded reference collection workflow with an AI operating contract, raw URL inbox, index, append-only log, and reusable source-analysis and concept-synthesis templates.

**Architecture:** A scoped `references/AGENTS.md` defines how AI agents may read, verify, propose, and maintain reference knowledge. Human-supplied URLs remain unchanged in `references/inbox.md`; approved internal knowledge is navigated through `references/index.md`, recorded in `references/log.md`, and shaped by reusable templates without choosing the Phase 2 application record format.

**Tech Stack:** Markdown, Git, repository-scoped `AGENTS.md` instructions, existing Prettier and Vitest quality commands; no new runtime dependency.

## Global Constraints

- Process only absolute `http` or `https` URLs supplied by the maintainer under `references/inbox.md` → `Paste URLs here`.
- The AI may browse to verify a submitted destination but must not search for or add related candidates.
- Preserve submitted URL text and order unless the maintainer explicitly requests cleanup.
- Do not store full third-party articles, screenshots, media, arbitrary Open Graph images, branding, assets, code, or distinctive visual identity.
- Do not publish reference records, change durable synthesis conclusions, or propose product adoption as approved without explicit human approval.
- Keep editorial evaluation, source-site design analysis, and cross-source concept synthesis separate.
- Keep every claim traceable to stable reference IDs and canonical external sources.
- Do not define the Phase 2 application record format, validation schema, database, CMS, embeddings, vector search, or background ingestion.
- External access failures must never block the local application build.
- Use Node.js 22.17.0 and npm 10 for repository verification.

---

## File Structure

| Path                             | Responsibility                                                                                                        |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `references/AGENTS.md`           | Scoped AI operating contract for intake, verification, proposals, approved writes, query, lint, archive, and restore. |
| `references/inbox.md`            | Human-owned raw URL queue; one URL per line and no AI-maintained status fields.                                       |
| `references/index.md`            | Index-first catalog of record statuses, analyses, syntheses, and unresolved review issues.                            |
| `references/log.md`              | Append-only chronological record of approved workflow operations.                                                     |
| `templates/source-analysis.md`   | Reusable structure separating editorial evaluation from website design analysis.                                      |
| `templates/concept-synthesis.md` | Reusable structure for evidence-backed, cross-source design concept synthesis.                                        |
| `README.md`                      | Human-facing entry point explaining where to paste URLs and how approval works.                                       |

Approved source analyses will later use `references/analyses/sources/<reference-id>.md`, and approved concept pages will later use `references/analyses/concepts/<concept-id>.md`. Do not create those directories until the first analysis is approved. Reference-record storage remains a Phase 2 decision.

---

### Task 1: Add analysis and synthesis templates

**Files:**

- Create: `templates/source-analysis.md`
- Create: `templates/concept-synthesis.md`

**Interfaces:**

- Consumes: stable reference IDs and canonical URLs from proposed records shaped by `templates/reference-record.md`.
- Produces: the required headings and provenance fields consumed by `references/AGENTS.md` and cataloged by `references/index.md`.

- [ ] **Step 1: Run the template existence check and verify it fails**

Run:

```bash
test -f templates/source-analysis.md && test -f templates/concept-synthesis.md
```

Expected: exit code `1` because neither workflow template exists.

- [ ] **Step 2: Create the source-analysis template**

Create `templates/source-analysis.md` with exactly:

```markdown
---
reference_id: "stable-reference-id"
title: "Resource title"
canonical_url: "https://example.com/canonical-resource"
analyzed: "YYYY-MM-DD"
status: "draft"
---

# Source analysis: Resource title

## Editorial evaluation

### Scope fit

Explain how the complete source does or does not contribute durable design-engineering knowledge.

### Authority and durability

Record the publisher, author when useful, evidence quality, likely durability, and access conditions.

### Overlap and classification

Identify overlap with existing references and propose Areas, Collections, format, and source language.

### Editorial recommendation

Recommend `review`, `reject`, or `archive`, with reasons. Human approval is still required.

## Website design analysis

### Information hierarchy and navigation

Describe observable structure, orientation cues, and content-priority decisions.

### UI, interaction, and motion

Describe interaction behavior, animation purpose, timing characteristics, and reduced-motion behavior without copying implementation code.

### Grid, layout, and responsive behavior

Describe columns, alignment, spacing, density, breakpoints, and content reflow using original language.

### Typography, color, and visual rhythm

Describe functional roles and relationships rather than copying brand tokens or exact styling.

### Accessibility observations

Record directly observable strengths, risks, keyboard behavior, focus treatment, semantics, contrast concerns, and motion concerns.

### Transferable principles

List principles that may be compared across sources. Do not approve them for product use here.

### Source-specific expression to avoid copying

Identify branding, assets, code, compositions, or distinctive identity that must remain source-specific.

## Evidence and uncertainty

- Direct observations:
- Claims requiring human confirmation:
- Access limitations:
- Contradictions with existing analyses:

## Human review

- Reviewer:
- Decision:
- Review date:
- Notes:
```

- [ ] **Step 3: Create the concept-synthesis template**

Create `templates/concept-synthesis.md` with exactly:

```markdown
---
concept_id: "stable-concept-id"
title: "Concept title"
supporting_references: []
reviewed: "YYYY-MM-DD"
status: "draft"
confidence: "low | medium | high"
---

# Concept: Concept title

## Current synthesis

State the best current cross-source conclusion in original project language.

## Supporting evidence

| Reference ID | Canonical source | Observation | Contribution |
| ------------ | ---------------- | ----------- | ------------ |

## Disagreements and exceptions

Record conflicting evidence, contextual differences, and unresolved uncertainty instead of forcing consensus.

## Relevance to DSGN ENGR Wiki

Explain how the concept relates to this project's visitors, content, information architecture, and accessibility requirements.

## Adoption boundary

State what could be explored in a future product design and what remains source-specific. This section never authorizes implementation.

## Evidence gaps

List questions that require more maintainer-supplied sources or direct human review. Do not search for new candidates.

## Human review

- Reviewer:
- Decision:
- Review date:
- Notes:
```

- [ ] **Step 4: Run structural and formatting checks**

Run:

```bash
rg -n '^## Editorial evaluation$|^## Website design analysis$|^## Evidence and uncertainty$|^## Human review$' templates/source-analysis.md
rg -n '^## Current synthesis$|^## Supporting evidence$|^## Disagreements and exceptions$|^## Adoption boundary$|^## Human review$' templates/concept-synthesis.md
PATH=/Users/yongminkim/.nvm/versions/node/v22.17.0/bin:$PATH npm exec prettier -- --check templates/source-analysis.md templates/concept-synthesis.md
```

Expected: every required heading is printed, and Prettier reports that both files use its code style.

- [ ] **Step 5: Commit the templates**

```bash
git add templates/source-analysis.md templates/concept-synthesis.md
git commit -m "docs: add reference analysis templates"
```

---

### Task 2: Seed index-first navigation and append-only history

**Files:**

- Create: `references/index.md`
- Create: `references/log.md`

**Interfaces:**

- Consumes: future stable reference IDs, source-analysis paths, concept IDs, review statuses, and approval evidence.
- Produces: the first-read catalog and parseable chronological history required by the scoped AI contract.

- [ ] **Step 1: Run the navigation-file existence check and verify it fails**

Run:

```bash
test -f references/index.md && test -f references/log.md
```

Expected: exit code `1` because the `references/` directory and both files do not exist.

- [ ] **Step 2: Create the reference workflow directory**

Run:

```bash
mkdir -p references
```

Expected: `references/` exists and is empty.

- [ ] **Step 3: Create the initial index**

Create `references/index.md` with exactly:

```markdown
# Reference index

Read this file first when querying or maintaining the reference collection. Counts and links change only after approved writes.

## Workflow status

- Submitted URLs: 0
- Processed submissions: 0
- Draft records: 0
- Records in review: 0
- Published records: 0
- Archived records: 0
- Source analyses: 0
- Concept syntheses: 0

## Awaiting human review

None.

## Reference records

### Draft

None.

### Review

None.

### Published

None.

### Archived

None.

## Source analyses

None.

## Concept syntheses

None.

## Issues requiring review

None.
```

- [ ] **Step 4: Create the append-only log**

Create `references/log.md` with exactly:

```markdown
# Reference activity log

Append new entries in chronological order. Never rewrite an earlier entry; record corrections in a new entry.

Each entry heading must use `## [YYYY-MM-DD] operation | subject`. Supported operations begin with `ingest`, `review`, `synthesize`, `lint`, `archive`, and `restore`.

## [2026-08-07] review | Reference workflow initialized

- Change: Created the approved Markdown collection workflow.
- Affected IDs: none.
- Approval: project maintainer approved the design specification.
```

- [ ] **Step 5: Run structural and formatting checks**

Run:

```bash
rg -n '^## Workflow status$|^## Awaiting human review$|^## Reference records$|^## Source analyses$|^## Concept syntheses$|^## Issues requiring review$' references/index.md
rg -n '^## \[[0-9]{4}-[0-9]{2}-[0-9]{2}\] (ingest|review|synthesize|lint|archive|restore) \| ' references/log.md
PATH=/Users/yongminkim/.nvm/versions/node/v22.17.0/bin:$PATH npm exec prettier -- --check references/index.md references/log.md
```

Expected: all index headings and the initialization log entry are printed, and Prettier passes both files.

- [ ] **Step 6: Commit the navigation artifacts**

```bash
git add references/index.md references/log.md
git commit -m "docs: seed reference index and log"
```

---

### Task 3: Add the scoped AI contract and raw URL inbox

**Files:**

- Create: `references/AGENTS.md`
- Create: `references/inbox.md`

**Interfaces:**

- Consumes: `references/index.md`, `references/log.md`, `templates/reference-record.md`, `templates/source-analysis.md`, and `templates/concept-synthesis.md`.
- Produces: the `## Paste URLs here` input boundary and operating rules used by any AI processing the directory.

- [ ] **Step 1: Run the intake-file existence check and verify it fails**

Run:

```bash
test -f references/AGENTS.md && test -f references/inbox.md
```

Expected: exit code `1` because neither intake file exists.

- [ ] **Step 2: Create the scoped AI operating contract**

Create `references/AGENTS.md` with exactly:

```markdown
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
4. Read the project content strategy and external-source decision before drafting editorial metadata.

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

1. Submitted URL and line number
2. Processing result: `draft`, `duplicate`, `invalid`, `inaccessible`, `rejected`, or `needs-review`
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

Archive without deleting history. Keep archived items discoverable through `index.md` and `log.md`. Restore only after a new verification and human review.

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
```

- [ ] **Step 3: Create the raw URL inbox**

Create `references/inbox.md` with exactly:

```markdown
# Reference inbox

Paste one absolute `http` or `https` URL per line under `Paste URLs here`. Titles, bullets, notes, and statuses are not required.

This list is human-owned input. AI agents must not add, rewrite, reorder, remove, or annotate entries unless explicitly asked.

## Paste URLs here
```

- [ ] **Step 4: Run contract and formatting checks**

Run:

```bash
rg -n '^## Paste URLs here$' references/inbox.md
rg -n '^## Ownership boundaries$|^## Read order$|^## Ingest a submitted URL$|^## Proposal response order$|^## Query$|^## Lint$|^## Archive and restore$|^## Failure handling$' references/AGENTS.md
rg -n 'Never add a URL|must not add, rewrite, reorder, remove, or annotate' references/AGENTS.md references/inbox.md
PATH=/Users/yongminkim/.nvm/versions/node/v22.17.0/bin:$PATH npm exec prettier -- --check references/AGENTS.md references/inbox.md
```

Expected: the input boundary, every operation heading, and both no-discovery/no-mutation rules are printed; Prettier passes.

- [ ] **Step 5: Audit the contract against the required fixture outcomes**

Use this review fixture without writing it into `references/inbox.md`:

```text
line 1: valid absolute URL
line 2: the same URL repeated
line 3: URL that redirects to a canonical destination
line 4: value without an http/https URL scheme
line 5: absolute URL whose source cannot be accessed
line 6: second reviewed source that conflicts with a design claim from line 1
```

Expected contract outcomes:

```text
line 1 -> one draft record and source analysis
line 2 -> duplicate report, no second draft
line 3 -> preserve submitted URL and report resolved canonical URL
line 4 -> invalid with a scheme-specific reason
line 5 -> inaccessible and unverified, with no secondary-source inference
line 6 -> separate draft plus a proposed contradiction note
discovered outbound URLs -> never added or processed
durable writes -> proposed for human approval before editing
```

- [ ] **Step 6: Commit the intake contract**

```bash
git add references/AGENTS.md references/inbox.md
git commit -m "docs: add AI reference intake contract"
```

---

### Task 4: Document the human workflow and run the full gate

**Files:**

- Modify: `README.md`

**Interfaces:**

- Consumes: the completed `references/` workflow and existing project status documentation.
- Produces: a human-facing link to the inbox, AI instructions, index, log, templates, and approved design specification.

- [ ] **Step 1: Run the README link check and verify it fails**

Run:

```bash
rg -n 'references/inbox.md|references/AGENTS.md|references/index.md|references/log.md' README.md
```

Expected: exit code `1` because the README does not yet describe the workflow.

- [ ] **Step 2: Add the reference collection section**

Insert this section after the paragraph ending with `templates/` and before `## Local development`:

```markdown
## Reference collection workflow

To propose sources, paste one absolute web URL per line into [`references/inbox.md`](references/inbox.md). Do not add titles, metadata, or statuses; the URL list remains human-owned input.

AI agents follow the scoped rules in [`references/AGENTS.md`](references/AGENTS.md): they may verify submitted destinations but cannot search for or add related sources. Proposed reference records remain drafts until human review. Approved internal analyses and cross-source concepts are cataloged through [`references/index.md`](references/index.md), with chronological operations preserved in [`references/log.md`](references/log.md).

Authoring structures live in [`templates/`](templates/), and the approved workflow design is documented in [`docs/superpowers/specs/2026-08-07-reference-inbox-design.md`](docs/superpowers/specs/2026-08-07-reference-inbox-design.md).
```

- [ ] **Step 3: Run all documentation and project checks**

Run:

```bash
PATH=/Users/yongminkim/.nvm/versions/node/v22.17.0/bin:$PATH npm run format:check
PATH=/Users/yongminkim/.nvm/versions/node/v22.17.0/bin:$PATH npm test
git diff --check
```

Expected:

```text
Prettier: all matched files use Prettier code style
Vitest: 4 test files passed, 9 tests passed
git diff --check: no output and exit code 0
```

- [ ] **Step 4: Verify the workflow links and source boundary**

Run:

```bash
test -f references/AGENTS.md
test -f references/inbox.md
test -f references/index.md
test -f references/log.md
test -f templates/reference-record.md
test -f templates/source-analysis.md
test -f templates/concept-synthesis.md
rg -n 'references/inbox.md|references/AGENTS.md|references/index.md|references/log.md' README.md
rg -n 'must not search for related sources|never adds discovered candidates' docs/superpowers/specs/2026-08-07-reference-inbox-design.md
rg -n 'Never add a URL' references/AGENTS.md
```

Expected: every file check exits `0`, README prints all four workflow links, and the separate spec and AI-contract searches both print the URL-only collection rule.

- [ ] **Step 5: Review the final change scope**

Run:

```bash
git status --short
git diff --stat
git diff -- README.md references templates/source-analysis.md templates/concept-synthesis.md
```

Expected: only the README and approved Markdown workflow files are changed; no source code, package metadata, generated files, or application record format is added.

- [ ] **Step 6: Commit the human-facing documentation**

```bash
git add README.md
git commit -m "docs: document reference collection workflow"
```

- [ ] **Step 7: Verify the branch is clean and show its commits**

Run:

```bash
git status --short
git log --oneline --decorate origin/main..HEAD
```

Expected: `git status --short` prints nothing, and the log includes the design commits plus the four implementation commits from this plan.

---

## Post-implementation handoff

This plan creates the collection system but intentionally does not process reference content. After the branch is reviewed and the maintainer pastes URLs into `references/inbox.md`, process those submitted URLs through a separately approved ingestion run. Phase 2 will later select and validate the application-facing reference-record format.
