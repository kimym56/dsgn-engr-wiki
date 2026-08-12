# 0003 — Source-graph discovery

- Status: **Accepted**
- Date: 2026-08-12
- Accepted: 2026-08-12
- Decision owners: Project maintainers

## Context

The reference workflow previously ended at maintainer-submitted URLs. This kept ingestion controlled, but it discarded deliberately curated research paths that an inspected source exposes. The project needs to preserve those paths without treating a parent source's authority, quality, or publication status as approval for its links.

The existing local-record policy remains in force: approved local reference records are the public source of truth, external access is an authoring concern, and production builds must not depend on live publishers.

## Decision

### Candidate nodes and discovery edges

Use a controlled source graph for approved discovery work. A **Candidate** is an internal Markdown record for one canonical URL discovered through a qualifying resource section; it is a research lead, not a published reference. A **Discovery edge** is a directed relationship from a parent source to that candidate. Each edge records its parent ID and URL, section label, original link text, encountered URL, discovery date, wave, depth, and whether it was present at the last check.

Canonical URL is the primary deduplication key. A newly found canonical destination creates one candidate node; an existing destination receives a distinct new provenance edge when needed. Repeated identical edges are reported but not duplicated. A rescan may set an absent edge to `active: false`, but must retain its history. A candidate may have several incoming edges and does not inherit any parent authority, classification, or approval.

### Qualifying and excluded links

Only links deliberately presented as learning or research material qualify for automatic discovery. Qualifying contexts include sections labeled `Resources`, `References`, `Further reading`, `Recommended`, or a clearly equivalent label. Section meaning takes priority over a literal heading match.

Do not automatically discover links in global or local navigation, author and practitioner rosters, incidental article prose, social profiles, image-search or image-credit links, advertisements, sponsors, affiliates, partners, footer or legal content, or login, account, and utility actions. An ambiguous section is reported for human judgment rather than analyzed automatically.

### Waves and approvals

An **Expansion approval** is human permission to inspect and analyze the next wave of candidates. It does not approve an item for publication. Approving a parent source starts one bounded wave: inspect the complete available parent source, capture every qualifying first-level link in source order, and analyze every accessible first-level candidate.

Qualifying links found inside first-level candidates are recorded as candidates for the next wave, but their destinations are not inspected or analyzed until another expansion approval. The current wave ends only when every captured first-level candidate has a terminal result: analyzed, inaccessible, rejected by a human, or linked to an existing canonical node. A canonical URL already present in the current ancestry path is not revisited; its relationship is recorded as a cycle-safe edge.

A **Publication approval** is a separate human decision permitting an analyzed candidate to enter the existing public-reference workflow. Publication decisions are `pending`, `publish`, `context-only`, `reject`, or `revisit`; only a human may select a value other than `pending`. A `publish` decision does not make a candidate file public by itself.

### Candidate lifecycle and analysis translation

Candidate lifecycle states are `discovered`, `analyzing`, `analyzed`, `inaccessible`, and `rejected`. `duplicate` is a processing result, not a lifecycle state. A candidate rejected before or during analysis is `rejected`; a publication-level `reject` can apply to an already analyzed candidate without changing that lifecycle state.

Every completed English source analysis receives a Korean review translation. These translations are internal review artifacts; published Korean reference translations still begin only after the corresponding English reference record reaches `published` status.

### Failure handling

Handle failures per candidate so one source does not fail a wave:

- Preserve invalid-link context in the wave report and log, report the syntax or scheme problem, and do not create a candidate or fetch it.
- Retain redirect evidence while storing the canonical destination.
- For authentication, paywalls, crawl restrictions, and rate limits, respect access controls and analyze only directly verifiable material; slow or stop access when required.
- Retain unavailable destinations as `inaccessible` and do not infer their contents from snippets, previews, or parent descriptions.
- Preserve completed results when a batch partially fails, and report remaining candidates without rolling back valid work.
- Retain changed or removed links as historical inactive edges after verification.

External failure never becomes an application build failure.

## Alternatives considered

### Continue accepting only maintainer-submitted URLs

This has the smallest operational surface, but loses curated resource paths and forces maintainers to manually reproduce links already identified by an inspected source.

### Recursively crawl every outbound link

This would be difficult to review, would mix incidental and curated links, and could grow without a clear stopping point. It also risks treating third-party linkage as endorsement.

### Publish discovered candidates automatically

Automated publication would blur research leads with approved references and would bypass the editorial judgment required by the existing local-reference policy.

## Consequences

- Maintainers retain control of root-source submission, expansion, and publication decisions.
- Candidate records preserve provenance and useful research paths without appearing as public references by default.
- Discovery work gains bounded operational responsibilities: canonicalization, edge history, wave reporting, and per-candidate failure handling.
- English analysis remains canonical; Korean analysis translations support internal review before publication decisions.
- The public application and production build remain independent of live external access.

## Validation

The implementation must verify that candidate files contain the required fields and known values; IDs, canonical URLs, analysis paths, and translation paths agree; one canonical URL produces one node while distinct provenance edges remain intact; and qualifying sections exclude navigation, rosters, social, advertising, and footer links.

It must also verify first-level wave stopping, actionable invalid/redirected/inaccessible/restricted/duplicate results, correctly linked Korean review translations, agreement between index and log counts, human-only publication, and no live external request in validation or production builds.

## References

- [0002 — Reference records and external-source handling](0002-reference-records-and-external-sources.md)
- [Source graph discovery design](../superpowers/specs/2026-08-12-source-graph-discovery-design.md)
