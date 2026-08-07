# Reference collection and synthesis design

## Purpose

Create a Markdown-native workflow where a maintainer supplies web URLs, an AI verifies and organizes those sources, and knowledge compounds across the collection without copying source material or publishing unreviewed output.

The workflow adapts the useful core of [Andrej Karpathy's LLM Wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f): keep source input separate from maintained synthesis, give the AI explicit operating rules, navigate through an index, preserve an activity log, and periodically lint the knowledge base. It does not reproduce that architecture exactly.

## Goals

- Require only one absolute `http` or `https` URL per line from the maintainer.
- Limit collection to URLs supplied by the maintainer.
- Preserve submitted URLs as immutable input unless the maintainer requests cleanup.
- Produce reviewed reference records instead of copying external articles.
- Maintain source analyses and cross-source concept pages as persistent, compounding knowledge.
- Keep editorial evaluation separate from source-site design analysis.
- Make provenance, contradictions, uncertainty, and review state visible.
- Require human approval before publication or product design changes.

## Non-goals

- Search the web for additional candidates or expand the collection automatically.
- Store full third-party articles, screenshots, media, or arbitrary Open Graph images.
- Automatically publish references or apply source-site patterns to the product.
- Define the final Phase 2 record-storage format or application schema.
- Add Obsidian, embeddings, vector search, a database, a CMS, or a background ingestion service.
- Make production builds depend on external websites.

## Adapted knowledge model

The workflow uses four layers with distinct ownership.

### 1. Submitted source queue

`references/inbox.md` is the human-owned source boundary. Its `Paste URLs here` section accepts plain URLs, one per non-empty line. Blank lines are allowed; bullets, YAML fields, titles, statuses, and notes are unnecessary.

The AI reads this list but does not rewrite, reorder, remove, or append URLs unless asked. It may browse only to inspect and verify a submitted destination. It must not search for related sources or turn outbound links from a submitted page into new candidates.

### 2. Reference records

Each accepted candidate receives project-owned metadata based on [`templates/reference-record.md`](../../../templates/reference-record.md): canonical URL, attribution, original summary, design-engineering relevance, format, Areas, Collections, language, dates, status, and review notes.

Reference records are the future application's content source. The Phase 2 implementation plan will choose their concrete validated storage format. Until then, AI output remains a draft in the response or at an explicit maintainer-supplied path.

### 3. Source analyses

Each verified source may receive a durable internal analysis organized by its stable reference ID. The analysis has two clearly labeled parts:

- **Editorial evaluation** — scope fit, authority, durability, overlap, attribution, access conditions, classification, and reasons to accept or reject the reference.
- **Website design analysis** — information hierarchy, navigation, UI and interaction patterns, animation, grid, layout, typography, color roles, responsive behavior, accessibility, and reduced-motion behavior.

An analysis cites the reference ID and canonical source. It records observations and evidence without reproducing the source's substantive text, code, branding, assets, or distinctive visual identity.

### 4. Concept synthesis

AI-maintained concept pages synthesize recurring ideas across reviewed source analyses. Initial concepts may include navigation, information hierarchy, reference cards, grid and layout, typography, motion, responsive behavior, accessibility, and editorial presentation.

Each claim on a concept page identifies its supporting reference IDs, disagreements, exceptions, confidence, and relevance to DSGN ENGR Wiki. New evidence may strengthen, revise, or contradict earlier synthesis. A concept page is design research, not automatic authorization to modify the product.

## Navigation and history

Two Markdown files make the collection legible to people and AI agents.

### `references/index.md`

The index is content-oriented and read first. It catalogs:

- submitted and processed source counts
- reference records grouped by review status and Area
- source analyses with one-line summaries
- concept pages with one-line summaries and supporting-source counts
- unresolved contradictions, blocked sources, and items awaiting human review

The AI updates the index after every approved write. The index links to durable local artifacts when those paths exist and otherwise records the relevant stable ID.

### `references/log.md`

The log is chronological and append-only. Each entry uses this heading shape:

```text
## [YYYY-MM-DD] operation | subject
```

Supported operations begin with `ingest`, `review`, `synthesize`, `lint`, `archive`, and `restore`. Entries state what changed, which reference or concept IDs were affected, and who approved any publication or product-design decision. Corrections receive a new entry rather than rewriting history.

## Operating workflow

### Ingest

1. Read submitted URLs in order and preserve their original text.
2. Validate URL syntax and detect repeated submissions.
3. Open the complete submitted source when access permits.
4. Resolve and record the canonical destination without replacing the submitted URL.
5. Verify attribution, format, source language, dates, and access conditions.
6. Evaluate the resource against the project selection criteria.
7. Produce a draft reference record and separate source analysis.
8. Update existing concept pages only when the new source provides relevant evidence.
9. Update the index and append an ingest log entry after writes are approved.

### Query

The AI reads `references/index.md` first, then opens only relevant reference records, source analyses, and concept pages. Answers cite stable reference IDs and canonical external sources. Valuable new comparisons may be proposed for the synthesis layer, but they are written only after approval.

### Lint

A lint pass reports rather than silently repairing:

- invalid or duplicate submitted URLs
- duplicate canonical destinations or reference IDs
- missing attribution or canonical links
- broken local links and orphan analyses or concept pages
- unknown Area or Collection relationships
- concept claims without supporting reference IDs
- contradictions that lack an explicit note
- stale review dates and unresolved access failures
- records marked published without human approval evidence

Repairs require review when they change meaning, identity, status, or provenance. Mechanical local-link fixes may be applied when explicitly requested.

### Archive and restore

Rejected, superseded, or persistently unavailable references may be archived without deleting their history. Archived items leave normal browsing and synthesis but remain discoverable through the index and log. Restoring an item requires a new verification and review entry.

## Source-site design boundaries

- Extract principles and reasoning, not visual identity.
- Describe interaction behavior in original language rather than copying code.
- Do not download or reuse assets without separate provenance and permission review.
- Do not treat one source as proof of a global design direction.
- Prefer cross-source support for product-wide patterns; a single-source proposal requires explicit human justification.
- Record why a pattern fits DSGN ENGR Wiki's visitors, content, accessibility requirements, and information architecture.
- Test adopted patterns independently in this product rather than assuming the source implementation is correct.

## Human and AI responsibilities

### Maintainer

- supplies every candidate URL
- decides scope and classification disagreements
- approves or rejects reference records
- owns publication status and corrections
- approves initial durable synthesis and later writes that change conclusions
- decides whether a design principle may enter a product design proposal

### AI

- verifies submitted sources without expanding the queue
- drafts metadata and original editorial context
- maintains links, indexes, logs, analyses, and synthesis after approval
- flags uncertainty, contradictions, duplicates, staleness, and access failures
- keeps citations and provenance attached to claims
- never treats generated text as verified evidence

## Error handling

- Invalid or unsupported URLs are reported with their original line and a specific reason.
- Redirects retain both submitted and resolved destinations.
- Duplicate canonical destinations produce one draft and a duplicate report.
- Paywalled or authenticated sources record their access conditions.
- Inaccessible sources remain unverified and cannot be recommended from secondary descriptions.
- Conflicting metadata or evidence is preserved as a review issue rather than resolved by guessing.
- A failed external request never blocks the local application build.

## Output boundary before Phase 2

Until Phase 2 defines durable record storage, the AI returns proposed reference records, analyses, index changes, and log entries in its response. It creates or edits those artifacts only when the maintainer supplies an explicit path or requests the approved implementation. It must not invent storage directories or mark output as published.

## Acceptance criteria

- A maintainer can add candidates by pasting only raw URLs.
- The AI processes only maintainer-submitted URLs and never adds discovered candidates.
- Submitted URLs remain unchanged unless cleanup is explicitly requested.
- Reference records, source analyses, and concept synthesis have separate responsibilities.
- Index-first navigation and append-only history are defined without adding search infrastructure.
- Every synthesized claim remains traceable to stable reference IDs and canonical sources.
- Duplicate, redirected, invalid, inaccessible, contradictory, and stale sources have defined outcomes.
- Human approval gates publication, conclusion-changing synthesis, and product-design adoption.
- The workflow prohibits copying third-party content or identity.
- The design leaves final Phase 2 application storage and validation decisions open.

## Verification

Review the Markdown for valid links, ownership boundaries, and unambiguous instructions. Exercise the workflow with a fixture containing a valid URL, repeated URL, redirect, invalid URL, inaccessible URL, and two sources that disagree about a design pattern. Confirm that an AI can produce traceable drafts, propose index and log changes, flag the disagreement, and avoid adding any unsubmitted source.
