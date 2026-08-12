# Source Graph Discovery Design

- Status: Approved design
- Date: 2026-08-12
- Initial root source: `deng-design-engineering-directory`

## Context

The current reference workflow stops at maintainer-submitted URLs. It explicitly prevents outbound links from becoming candidates, even when an analyzed source intentionally presents a resource list. That keeps ingestion controlled, but it also prevents the collection from preserving and following useful research paths.

The collection needs a controlled source graph. A source may lead to additional candidates, but a link must preserve its provenance and must not inherit trust or publication approval from its parent. Expansion and publication remain separate human decisions.

## Goals

- Represent references and discovered candidates as a navigable directed graph.
- Automatically analyze the first level of deliberately curated resource links after a maintainer approves expansion of a parent source.
- Record, but do not analyze, resource links discovered by that first-level batch until the next expansion approval.
- Preserve why, where, and when every candidate was discovered.
- Deduplicate destinations without losing multiple discovery paths.
- Keep all generated analyses and translations as internal drafts until human review.
- Keep external fetching out of the public application runtime and production build.

## Non-goals

- Crawling every external link on a page.
- Recursively analyzing links without a wave approval.
- Treating inclusion in a third-party resource list as project endorsement.
- Automatically publishing references or changing product UI.
- Building a general-purpose crawler, queue service, database, or CMS in the initial implementation.
- Mirroring third-party articles, descriptions, screenshots, assets, or code.

## Terms

### Source node

An existing submitted or discovered source that has a stable project ID. A source analysis under `references/analyses/sources/` is the durable analytical artifact for the node.

### Candidate node

An internal Markdown record under `references/candidates/` for a canonical URL discovered through a qualifying resource section. A candidate is a research lead, not a published reference.

### Discovery edge

A directed relationship from a parent source to a candidate. The edge records the section and link context that caused the discovery. One candidate may have several incoming edges.

### Wave

A bounded expansion operation. Approving a parent source starts one wave that analyzes its qualifying first-level candidates. Qualifying links found inside those candidates are recorded for a later wave and are not analyzed during the current wave.

### Expansion approval

Human permission to inspect and analyze the next wave of candidates. It does not approve any item for publication.

### Publication approval

A separate human decision that permits an analyzed candidate to become a public reference record.

## Architecture

The collection uses distributed Markdown nodes with a central human-readable index:

```text
Parent source analysis
        |
        | discovery edge
        v
Candidate node --------> source analysis
        |                       |
        |                       +--> Korean review translation
        |
        +--> publication decision (human-owned)
```

The artifacts have separate responsibilities:

- `references/candidates/<candidate-id>.md` stores canonical identity, lifecycle state, provenance edges, analysis relationships, and the publication decision.
- `references/analyses/sources/<candidate-id>.md` stores original editorial and website analysis.
- `references/analyses/ko/sources/<candidate-id>.md` stores the Korean review translation and points back to the English analysis.
- `references/index.md` summarizes pending waves, processing counts, review queues, and graph navigation.
- `references/log.md` preserves append-only operational and approval history.
- `templates/discovered-candidate.md` defines the candidate format.

The public application continues to render only approved reference records. Candidate nodes, draft analyses, and review translations are authoring data and are not public content by default.

## Candidate data model

Each candidate file uses YAML front matter for machine-readable fields and a short Markdown review section when human notes are needed.

Required candidate fields:

```yaml
id: stable-candidate-id
title: Verifiable source title
title_source: destination
canonical_url: https://example.com/resource
canonical_verified: true
source_language: en
status: discovered
first_discovered: YYYY-MM-DD
last_checked: YYYY-MM-DD
analysis_path: null
translation_path: null
discoveries:
  - parent_id: parent-source-id
    parent_url: https://example.com/parent
    section: Resources
    link_text: Original link text
    encountered_url: https://example.com/original-link
    discovered: YYYY-MM-DD
    wave: 1
    depth: 1
    active: true
publication:
  decision: pending
  reviewer: null
  reviewed: null
  notes: null
```

Candidate lifecycle states are:

- `discovered`: captured and eligible for an approved analysis wave.
- `analyzing`: analysis has started but is not complete.
- `analyzed`: a draft source analysis exists.
- `inaccessible`: the destination could not be inspected sufficiently.
- `rejected`: a human decided that the candidate should not advance.

`rejected` is reserved for a candidate stopped before or during analysis because it is outside scope or unsafe to process. A publication-level `reject` may be applied to an already analyzed candidate without changing its analysis lifecycle state.

`duplicate` is a processing result rather than a candidate lifecycle state. When canonicalization finds an existing node, the workflow adds a new discovery edge to that node and reports the attempted duplicate. It does not create a second candidate.

Publication decisions are independent of analysis status:

- `pending`
- `publish`
- `context-only`
- `reject`
- `revisit`

Only a human may set a decision other than `pending`. A `publish` decision authorizes creation or promotion of a public reference record through the existing editorial workflow; it does not make the candidate file itself public.

Discovery depth and wave belong to each edge rather than to the candidate as a whole. The same canonical candidate may be reached from different parents at different depths.

`title_source` is either `destination` or `parent-link`. `canonical_verified` is `false` when a reachable canonical declaration or redirect chain could not be verified; in that case, `canonical_url` contains the normalized encountered destination as a provisional identity. These fields prevent parent link text and provisional URLs from being mistaken for destination-verified metadata.

## Qualifying link policy

Outbound discovery is limited to links deliberately presented by the source as learning or research material. Qualifying contexts include sections labeled `Resources`, `References`, `Further reading`, `Recommended`, or a clearly equivalent label.

The following do not qualify:

- global or local navigation
- author and practitioner rosters
- incidental links in article prose
- social profiles
- image-search or image-credit links
- advertisements, sponsors, affiliates, or partners
- footer and legal links
- login, account, or utility actions

Section meaning takes priority over a literal heading match. If the intent is ambiguous, the link is reported for human judgment instead of being analyzed automatically.

## Discovery and analysis flow

1. A maintainer selects a source and grants expansion approval.
2. The workflow captures an access date and inspects the complete available parent source.
3. It identifies qualifying curated-resource sections and extracts every qualifying link in source order.
4. It preserves the displayed link text and section label, then resolves redirects and canonical destinations.
5. For a new canonical destination, it creates one candidate node with a discovery edge from the parent.
6. For an existing destination, it appends a distinct discovery edge when the provenance is new. Repeated identical edges are reported but not duplicated.
7. It automatically analyzes every accessible first-level candidate in the approved wave.
8. It creates an English draft source analysis and a Korean review translation for each completed analysis.
9. It records qualifying resource links found inside those child sources as `discovered` candidates for the next wave. It does not inspect or analyze those destinations in the current wave.
10. It updates the index and append-only log with results and review questions.
11. It presents the completed wave for human review. Publication decisions remain pending until explicitly supplied by a maintainer.

The workflow may process first-level candidates in manageable operational batches, but the wave is not considered complete until every captured first-level candidate has a terminal result for that wave: analyzed, inaccessible, rejected by a human, or linked to an existing canonical node.

## Provenance and graph rules

- Every discovery edge records the parent ID and URL, section label, original link text, discovery date, wave, depth, and whether the edge was present at the last check.
- A candidate does not inherit the authority, quality, classification, or approval state of its parent.
- Canonical URL is the primary deduplication key. Redirect evidence and originally encountered URLs remain in the operational report or review notes.
- Multiple parents may point to one canonical candidate node.
- A canonical URL already visited in the current ancestry path is not revisited; the relationship is recorded as a cycle-safe edge.
- A rescan may set `active: false` when a link is no longer present, but it must not erase the historical edge.
- Analyses cite direct observations separately from parent descriptions and project synthesis.
- Parent-provided descriptions may help locate a candidate, but they are not evidence about an inaccessible destination.

## Failure handling

Failures are isolated per candidate so that one source cannot fail the entire wave.

- **Invalid URL:** preserve the discovery context in the wave report and append-only log, report the syntax or scheme problem, and do not create a candidate node or fetch it.
- **Redirect:** store the canonical destination and retain redirect evidence.
- **Duplicate destination:** add new provenance to the existing node and report the duplicate result.
- **Authentication or paywall:** record the access condition and analyze only what can be directly verified without bypassing access controls.
- **Crawl restriction or rate limit:** respect the restriction, slow or stop access, and mark the candidate incomplete or inaccessible.
- **Unavailable source:** retain the candidate as `inaccessible`; do not infer its contents from snippets, previews, or the parent page.
- **Ambiguous resource section:** exclude it from automatic analysis and raise a human-review question.
- **Partial batch failure:** preserve completed nodes and report remaining candidates without rolling back valid work.
- **Changed or removed link:** retain the historical edge and mark it inactive after verification.

External failure never becomes an application build failure.

## Initial DENG wave

The first use of the workflow expands `deng-design-engineering-directory`.

As inspected on 2026-08-12, the [DENG page](https://deng.theedgar.dev/) separates a practitioner roster under `Design Engineers` from learning links under `Resources`. Only links in the `Resources` section qualify for the initial wave. The practitioner roster, navigation, Google image links, and unrelated page chrome are excluded.

The initial wave will:

1. capture all qualifying DENG resource links visible at the recorded access time
2. create or update canonical candidate nodes
3. analyze every accessible first-level destination
4. create Korean review translations for completed analyses
5. record qualifying resource links discovered in those destinations as the pending next wave
6. update `references/index.md` and `references/log.md`
7. stop before any second-level destination is inspected or analyzed

No product UI, layout, or public reference data changes are part of this wave.

## Policy changes

`references/AGENTS.md` will replace its blanket ban on following outbound links with the qualifying-link and wave rules in this design. Maintainer-submitted URLs remain the only way to introduce root sources. Discovered candidates may enter only through an approved expansion wave.

`docs/content-strategy.md` will document candidates as internal discovery material and distinguish expansion approval from publication approval.

A new decision record will adopt graph-based discovery without changing the core guarantees of decision 0002: local approved records remain the public source of truth, external access remains an authoring concern, and builds never depend on live publishers.

Existing source-analysis instructions will gain a discovery summary that links to candidate nodes and identifies the pending next wave without duplicating the full graph metadata.

## Validation

The initial implementation must verify:

1. candidate files contain every required field and only known lifecycle, metadata-source, verification, and publication values
2. candidate IDs, canonical URLs, analysis paths, and translation paths are internally consistent
3. canonical destinations produce one node even when several parents or encountered URLs point to them
4. distinct discovery edges are preserved without identical-edge duplication
5. qualifying resource sections are accepted while navigation, people rosters, social links, advertisements, and footer links are excluded
6. analysis stops after the approved first level and records deeper candidates without inspecting them
7. invalid, redirected, inaccessible, restricted, and duplicate destinations receive actionable results
8. every completed English analysis has a correctly linked Korean review translation
9. the index and log agree with candidate and analysis counts
10. no candidate or draft analysis is treated as a published reference without a human `publish` decision and the existing publication workflow
11. no validation or production build requires a live external request

Validation may combine fixture-based automated checks for the Markdown schema and graph invariants with a manual review of the DENG extraction boundary. Dedicated crawling infrastructure is deferred unless repeated waves demonstrate a concrete need.

## Expected outcome

The collection will no longer terminate at a single analyzed page. It will preserve a reviewable path from a root source through its curated resources and onward into later discovery waves, while maintaining clear provenance, bounded traversal, original analysis, and human publication control.
