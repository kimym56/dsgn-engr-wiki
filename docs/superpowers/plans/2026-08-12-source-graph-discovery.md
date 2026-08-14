# Source Graph Discovery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a validated Markdown source graph and use DENG's curated Resources section to produce a bounded first-wave analysis with preserved provenance and a reviewable next-wave queue.

**Architecture:** Candidate Markdown files are distributed graph nodes; nested discovery records are directed provenance edges. A small Node CLI validates schema and graph invariants without network access, while the index and append-only log provide the human overview. External inspection occurs only during authoring, one approved wave at a time; public Next.js pages continue to consume only separately approved reference records.

**Tech Stack:** Markdown, YAML front matter, Node.js 22.17.0, ECMAScript modules, `yaml` 2.8.1, Vitest 4.1.10, npm, existing English-canonical/Korean-review documentation workflow.

## Global Constraints

- The approved design is `docs/superpowers/specs/2026-08-12-source-graph-discovery-design.md`; its Korean file is review-only.
- Maintainer-submitted URLs remain the only root sources. Discovered URLs enter only through an approved expansion wave.
- Analyze only links intentionally presented in a Resources, References, Further reading, Recommended, or clearly equivalent section.
- Exclude navigation, people rosters, incidental prose links, social profiles, image links, ads, sponsors, footers, legal links, and account actions.
- Expansion approval and publication approval are independent; every new publication decision starts as `pending`.
- Analyze only DENG's first-level resource destinations in wave 1. Record qualifying child-resource links without inspecting those destinations.
- Store original summaries and analysis, never substantive copied text, branding, screenshots, assets, or source code.
- Do not infer inaccessible content from parent descriptions, search snippets, or social previews.
- External access is authoring-only and must never run during validation, Next.js page requests, tests, or production builds.
- English analyses are canonical. Korean files are review translations and must link to their English source.
- Preserve the append-only history of discovery edges and `references/log.md`.
- Preserve unrelated working-tree changes.

## File and responsibility map

- `docs/decisions/0003-source-graph-discovery.md` and `docs/ko/decisions/0003-source-graph-discovery.md` — accepted policy and Korean review translation.
- `docs/content-strategy.md` and `docs/ko/content-strategy.md` — candidate, expansion, and publication workflow.
- `references/AGENTS.md` — operational discovery boundaries.
- `templates/discovered-candidate.md` — canonical candidate-node structure.
- `templates/source-analysis.md` — concise discovery summary in each analysis.
- `scripts/reference-graph.mjs` — local-only candidate parser, validator, graph checks, and CLI.
- `scripts/reference-graph.test.mjs` — schema and invariant tests using temporary fixture directories.
- `references/candidates/*.md` — canonical DENG candidate nodes and later-wave leads.
- `references/analyses/sources/*.md` — English first-wave analyses.
- `references/analyses/ko/sources/*.md` — Korean review translations.
- `references/index.md` — counts, wave state, graph links, and review queue.
- `references/log.md` — append-only wave history.

---

### Task 1: Adopt the source-graph editorial contract

**Files:**

- Create: `docs/decisions/0003-source-graph-discovery.md`
- Create: `docs/ko/decisions/0003-source-graph-discovery.md`
- Create: `templates/discovered-candidate.md`
- Modify: `docs/content-strategy.md`
- Modify: `docs/ko/content-strategy.md`
- Modify: `references/AGENTS.md`
- Modify: `templates/source-analysis.md`
- Modify: `docs/decisions/README.md`
- Modify: `docs/ko/decisions/README.md`

**Interfaces:**

- Consumes: approved design terminology and lifecycle values.
- Produces: the exact authoring contract used by the validator and all later data tasks.

- [ ] **Step 1: Write the decision record and translation**

Record Context, Decision, qualifying/excluded links, wave boundaries, candidate lifecycle, separate publication decisions, failure handling, consequences, and validation. Mark it `Accepted` on `2026-08-12`. The Korean file must begin with a relative link to the English source and state that English is canonical.

- [ ] **Step 2: Add candidate and discovery policy to both content-strategy files**

Define `Candidate`, `Discovery edge`, `Expansion approval`, and `Publication approval`. State that analysis translations are created for internal review even though published reference translations still begin only after publication.

- [ ] **Step 3: Replace the blanket outbound-link prohibition**

Keep maintainer ownership of `references/inbox.md`, but allow outbound candidates only when a maintainer has approved expansion and the links pass the qualifying-section policy. Add wave stopping, canonical deduplication, inactive-edge history, and inaccessible-source rules.

- [ ] **Step 4: Create the exact candidate template**

Use every front-matter property from the approved design: `id`, `title`, `title_source`, `canonical_url`, `canonical_verified`, `source_language`, `status`, `first_discovered`, `last_checked`, `analysis_path`, `translation_path`, nested `discoveries`, and nested `publication`. Add review notes below the front matter; do not add speculative fields.

- [ ] **Step 5: Add a discovery summary to the source-analysis template**

Add `## Resource discovery` with `Qualifying sections`, `Candidate IDs`, `Next-wave candidates`, and `Excluded link classes`. Keep graph-edge details in candidate files rather than duplicating them.

- [ ] **Step 6: Verify documentation consistency**

Run:

```bash
rg -n "Never add a URL|Never .*follow an outbound" references docs templates
rg -n "Expansion approval|Publication approval|확장 승인|게시 승인" references docs templates
npm run format:check
```

Expected: no blanket prohibition remains; both approval concepts appear in English and Korean; formatting passes.

- [ ] **Step 7: Commit**

```bash
git add docs/decisions docs/ko/decisions docs/content-strategy.md docs/ko/content-strategy.md references/AGENTS.md templates/discovered-candidate.md templates/source-analysis.md
git commit -m "docs: adopt source graph discovery policy"
```

### Task 2: Add offline graph validation

**Files:**

- Create: `scripts/reference-graph.mjs`
- Create: `scripts/reference-graph.test.mjs`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**

- Consumes: candidate schema from `templates/discovered-candidate.md`.
- Produces: `parseCandidateFile(path)`, `validateCandidate(candidate, path)`, `validateGraph(candidates)`, `loadCandidates(directory)`, and CLI exit status; `npm run references:check`.

- [ ] **Step 1: Install the exact YAML parser and add the script entry**

Run `npm install --save-dev yaml@2.8.1`. Add `"references:check": "node scripts/reference-graph.mjs references/candidates"` and include it before the existing application checks in `check`.

- [ ] **Step 2: Write failing schema tests**

Test a valid node plus missing fields, unknown lifecycle values, non-HTTPS URLs, inconsistent analysis paths, invalid publication values, empty discoveries, and malformed YAML. Assert messages include the candidate path and exact failing property.

- [ ] **Step 3: Run the focused test and confirm failure**

Run `npm test -- scripts/reference-graph.test.mjs`. Expected: FAIL because `scripts/reference-graph.mjs` does not exist.

- [ ] **Step 4: Implement parsing and candidate validation**

Parse front matter only between the first two `---` delimiters with `yaml.parse`. Export the five named interfaces. Accept only the design's enum values, ISO `YYYY-MM-DD` dates, absolute HTTPS URLs, safe relative Markdown paths or `null`, non-empty discoveries, Boolean verification/activity fields, and depth/wave integers greater than zero.

- [ ] **Step 5: Write failing graph-invariant tests**

Cover duplicate IDs, duplicate canonical URLs, repeated identical edges, unknown parents, self-links, analysis/translation files that do not exist, and valid multiple-parent edges. Use temporary fixture directories; never modify `references/` in a test.

- [ ] **Step 6: Implement graph and file checks**

`validateGraph` returns all errors rather than stopping at the first. Parent IDs may resolve to either candidate IDs or English source-analysis `reference_id` values. A missing `references/candidates` directory is valid and reports zero candidates so the new command can land before data.

- [ ] **Step 7: Implement the CLI and verify**

The CLI prints `Reference graph valid: N candidates` on success. On failure it prints one actionable error per line to stderr and exits 1. Run:

```bash
npm test -- scripts/reference-graph.test.mjs
npm run references:check
npm run check
```

Expected: all pass; the empty collection reports zero candidates; no command accesses the network.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json scripts/reference-graph.mjs scripts/reference-graph.test.mjs
git commit -m "feat: validate reference source graphs"
```

### Task 3: Capture DENG wave 1 candidate nodes

**Files:**

- Create: `references/candidates/*.md` for every unique canonical resource destination on the DENG page at access time.
- Modify: `references/analyses/sources/deng-design-engineering-directory.md`
- Modify: `references/analyses/ko/sources/deng-design-engineering-directory.md`

**Interfaces:**

- Consumes: candidate template, validator, and approved DENG expansion scope.
- Produces: canonical first-wave nodes with `discovered` status and DENG provenance edges; an exact candidate-ID list for Tasks 4 and 5.

- [ ] **Step 1: Capture the DENG Resources section**

Inspect `https://deng.theedgar.dev/` completely. Record access date `2026-08-12`, source order, category label when exposed, link text, and encountered URL. Exclude the Design Engineers roster, navigation, Google image links, and page chrome.

- [ ] **Step 2: Resolve canonical identity and deduplicate**

Resolve each qualifying link once. Create one kebab-case candidate file per unique canonical destination. If two visible cards resolve to one destination, store two distinct DENG discovery edges only when their link context differs. Use `title_source: parent-link` and `canonical_verified: false` when destination metadata cannot be verified.

- [ ] **Step 3: Create candidate nodes**

Set all nodes to `status: discovered`, `analysis_path: null`, `translation_path: null`, and `publication.decision: pending`. Every DENG edge uses parent ID `deng-design-engineering-directory`, section `Resources`, wave `1`, depth `1`, and `active: true`.

- [ ] **Step 4: Update the DENG analyses**

Replace the old statement that outbound entries were not candidates. Add the exact first-wave candidate IDs, excluded link classes, and the fact that child links will become the pending next wave. Apply the same factual change to the Korean review translation without changing its canonical role.

- [ ] **Step 5: Validate and commit**

Run `npm run references:check` and `npm run format:check`. Expected: all candidate nodes validate, canonical URLs are unique, and all parent IDs resolve. Then commit:

```bash
git add references/candidates references/analyses/sources/deng-design-engineering-directory.md references/analyses/ko/sources/deng-design-engineering-directory.md
git commit -m "data: capture DENG resource candidates"
```

### Task 4: Analyze the first half of DENG wave 1

**Files:**

- Modify: the first half of DENG candidate files in source order.
- Create: matching English files under `references/analyses/sources/`.
- Create: matching Korean files under `references/analyses/ko/sources/`.
- Create: additional `references/candidates/*.md` only for qualifying next-wave links discovered in these sources.

**Interfaces:**

- Consumes: Task 3's ordered candidate list.
- Produces: completed draft analyses and translations plus uninspected depth-2 candidate nodes.

- [ ] **Step 1: Select a deterministic batch**

Use the first `ceil(total / 2)` candidates in DENG source order. Record the chosen IDs before browsing so retries cannot silently change batch membership.

- [ ] **Step 2: Inspect and analyze each accessible destination**

Verify canonical URL, title, publisher/author when useful, dates, source language, access conditions, scope, authority, overlap, UI/UX, interaction, motion, layout, accessibility, transferable principles, and source-specific expression. Write original English analyses from `templates/source-analysis.md`.

- [ ] **Step 3: Record but do not inspect next-wave links**

Extract only qualifying resource/reference/recommended-reading sections from each child. Create or update depth-2 candidates with `status: discovered`, the child as `parent_id`, wave `2`, depth `2`, and null analysis paths. Do not open these URLs. Deduplicate by normalized encountered URL provisionally; a future approved wave verifies canonical identity.

- [ ] **Step 4: Handle inaccessible candidates honestly**

Set `status: inaccessible`, retain provisional identity and provenance, keep analysis paths null, and document the access failure. Do not create a substantive analysis from snippets or DENG's description.

- [ ] **Step 5: Translate completed analyses**

Create one Korean review translation for each completed English analysis. Preserve IDs, URLs, code terms, claims, uncertainty, and resource-discovery lists; link to the English source at the top.

- [ ] **Step 6: Update node relationships and verify**

For completed items set `status: analyzed`, `analysis_path`, and `translation_path`. Run `npm run references:check`, `npm run format:check`, and manually compare English/Korean headings and candidate IDs.

- [ ] **Step 7: Commit**

```bash
git add references/candidates references/analyses/sources references/analyses/ko/sources
git commit -m "data: analyze first DENG resource batch"
```

### Task 5: Complete DENG wave 1

**Files:**

- Modify: all remaining first-level DENG candidate files.
- Create: their English analyses under `references/analyses/sources/`.
- Create: their Korean translations under `references/analyses/ko/sources/`.
- Create or modify: deduplicated next-wave nodes under `references/candidates/`.

**Interfaces:**

- Consumes: remaining ordered Task 3 nodes and Task 4's graph.
- Produces: a terminal wave result for every DENG first-level candidate.

- [ ] **Step 1: Analyze remaining accessible candidates**

For every remaining first-level node, inspect the complete accessible destination and verify its canonical URL, title, publisher or author when useful, dates, language, and access conditions. Write an original English analysis covering scope, authority, overlap, information hierarchy, UI and interaction, motion, layout, accessibility, transferable principles, source-specific expression, direct observations, uncertainty, and contradictions. Do not reproduce substantive source text or infer claims from DENG's description.

- [ ] **Step 2: Merge next-wave provenance**

When a canonical or provisionally normalized destination already exists, append a distinct discovery edge instead of creating another node. Preserve every parent path and reject identical-edge duplication.

- [ ] **Step 3: Translate completed analyses and update node states**

Create the Korean review files, link them to the English analyses, and set exact analysis/translation paths. Mark failures `inaccessible`; leave every publication decision `pending`.

- [ ] **Step 4: Verify the complete wave**

Run:

```bash
npm run references:check
npm run format:check
```

Manually confirm every depth-1 DENG node is `analyzed` or `inaccessible`, every analyzed node has both language files, and every depth-2 node remains `discovered` with null analysis paths.

- [ ] **Step 5: Commit**

```bash
git add references/candidates references/analyses/sources references/analyses/ko/sources
git commit -m "data: complete DENG resource wave"
```

### Task 6: Publish the internal wave report and final verification

**Files:**

- Modify: `references/index.md`
- Modify: `references/log.md`

**Interfaces:**

- Consumes: the validated complete candidate graph and analyses.
- Produces: the human review queue and append-only audit entry; no public product publication.

- [ ] **Step 1: Recompute and update index counts**

Add candidate counts by lifecycle, wave-1 totals and terminal results, next-wave pending count, links to every new English analysis and Korean translation, inaccessible items, and publication-review issues. Do not count candidates as draft or published reference records.

- [ ] **Step 2: Add graph navigation**

Add a DENG wave section linking the root analysis to ordered first-level candidates and a next-wave section grouped by parent. Keep the index readable; link to node files rather than duplicating edge metadata.

- [ ] **Step 3: Append the wave log entry**

Append `## [2026-08-12] ingest | DENG resource wave 1 completed` with exact Change, Affected IDs, and Approval. Record analyzed, inaccessible, duplicate, redirect, and next-wave counts. Do not edit earlier entries.

- [ ] **Step 4: Run full verification**

Run:

```bash
npm run references:check
npm run check
git diff --check
git status --short
```

Expected: graph and application checks pass; no live external request occurs; only intended index/log changes remain uncommitted.

- [ ] **Step 5: Commit**

```bash
git add references/index.md references/log.md
git commit -m "docs: index DENG source graph wave"
```

- [ ] **Step 6: Prepare the review handoff**

Report the exact first-wave results, failures, redirects, deduplications, and next-wave candidates. Ask separately for publication decisions and permission to expand wave 2; do not infer either approval.
