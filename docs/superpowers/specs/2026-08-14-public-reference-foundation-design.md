---
title: Public reference foundation design
date: 2026-08-14
status: approved-design
---

# Public reference foundation design

## Purpose

Turn the nine DENG wave-1 Candidates already approved for the public-reference workflow into the first schema-validated local reference set and expose the approved records through the English References index.

This work proves the public record model with real editorial content. It does not expand the discovery graph, publish Korean metadata, copy external content, or add local reference-detail pages.

## Approved release boundary

- Publish English project-owned metadata only.
- Keep Korean source-analysis translations as internal review aids.
- Keep `/ko` unpublished.
- Create records for exactly these nine approved Candidates:
  - `taste-is-eating-silicon-valley`
  - `web-interface-guidelines`
  - `developing-taste`
  - `pasito`
  - `vaul`
  - `family-wallet`
  - `on-taste-part-3`
  - `manage-design-projects`
  - `ux-engineer-a-terminal-career`
- Link public cards directly to each canonical external source in the same browser tab.
- Defer local reference-detail pages.
- Do not inspect or analyze any wave-3 Candidate.
- Do not fetch external sources during requests or production builds.

## Storage architecture

### Reference records

Store one JSON document per English reference:

```text
content/references/en/<reference-id>.json
```

Each document is editorial data, not application code. The record schema contains:

| Field             | Requirement                                                    |
| ----------------- | -------------------------------------------------------------- |
| `id`              | Required stable lowercase kebab-case identifier                |
| `title`           | Required verified resource title                               |
| `url`             | Required canonical absolute HTTPS URL                          |
| `publisher`       | Required source organization or publication                    |
| `author`          | Optional author string or `null`                               |
| `summary`         | Required concise, original description of the source           |
| `relevance`       | Required original explanation of its design-engineering value  |
| `format`          | Required controlled format identifier                          |
| `areas`           | Required non-empty list of valid Area identifiers              |
| `collections`     | Required list of valid Collection identifiers; initially empty |
| `source_language` | Required source-language code; `en` for this set               |
| `published`       | Optional original publication date or `null`                   |
| `added`           | Required date the public record entered this workflow          |
| `reviewed`        | Required latest substantive editorial review date              |
| `status`          | Required `draft`, `review`, `published`, or `archived` state   |
| `preview`         | Optional approved preview object or `null`; initially `null`   |
| `language`        | Required project-metadata locale; `en` for this release        |
| `translation_of`  | `null` for canonical English records                           |

The initial controlled formats are `article`, `documentation`, `tool`, and `case-study`, covering all nine approved resources without speculative formats.

### Area registry

Store the English Area registry at:

```text
content/areas/en.json
```

Use the eight Areas already approved in the product brief:

- `design-engineering-foundations`
- `interface-implementation`
- `interaction-and-motion`
- `design-systems-and-tokens`
- `prototyping-and-tooling`
- `accessibility-and-inclusive-design`
- `collaboration-handoff-and-workflow`
- `frontend-quality-and-performance`

Each Area has an identifier, English label, and concise description. The record-authoring checkpoint maps the analyses' more granular proposed labels onto this stable public registry rather than silently creating new Areas.

### Collection registry

Store an initially empty English Collection registry at:

```text
content/collections/en.json
```

The empty registry proves relationship validation without inventing a collection before an editorial purpose and ordering have been approved.

## Validation and loading

A server-only content module reads the local JSON files and returns validated, typed records. Validation runs before any record is rendered and reports the precise file and field for each failure.

Validation rejects:

- missing or unknown fields
- malformed IDs, language codes, URLs, or ISO dates
- duplicate IDs or canonical URLs
- unsupported formats or statuses
- empty Area lists
- duplicate Area or Collection relationships within a record
- unknown Area or Collection identifiers
- English records with a non-`en` metadata language or non-null `translation_of`
- preview data that lacks required provenance and alternative text

Optional `author`, `published`, and `preview` values may be `null`. Empty Collections are valid. Archived and review records remain valid editorial data but are excluded from the public index.

The loader performs no network requests. Independent source health never determines whether local records can render.

## Public References experience

### Page structure

`/en/references` becomes a server-rendered index with:

1. the existing page eyebrow, title, and revised description
2. the number of matching published references
3. Area and Format filters
4. a responsive list or grid of reference cards
5. a useful no-results state when a valid filter combination has no matches

The old “first reviewed reference set is being prepared” empty state is removed.

For editorial inspection, a development-only `?preview=review` parameter includes `review` records and displays a clear preview banner. Production ignores this parameter, so unpublished metadata cannot leak through a copied URL.

### Filtering

Filters use shareable query parameters:

```text
/en/references?area=interaction-and-motion&format=article
```

Filtering is computed on the server from validated records. No client component or browser storage is required. An unknown Area or Format value degrades to the complete index, matching the approved information architecture. A clear action restores `/en/references`.

### Cards

Every card shows enough project-owned context to support a decision before leaving:

- neutral project-owned format treatment
- format label
- title
- publisher and optional author
- summary
- relevance note
- Area labels
- source language
- substantive review date
- clearly worded external-source link

Cards use no source artwork or arbitrary Open Graph image. The external link uses the canonical URL, remains understandable without an icon, and opens in the current tab. The whole card is not made into one oversized link; the title and explicit call to action provide clear link targets.

### Explore copy

Explore remains outside this implementation. Its temporary copy changes only enough to truthfully direct visitors to the now-published References index. Area and Collection pages remain deferred.

## Editorial workflow and human gate

1. Draft the nine JSON records from their verified Candidate and English source-analysis files.
2. Set every new record to `review`.
3. Validate the records and render them through the development-only review preview for editorial inspection.
4. Present all nine titles, attribution, summaries, relevance notes, formats, Areas, and dates to the maintainer.
5. Apply requested corrections.
6. Only after explicit maintainer approval, change the nine record statuses to `published`.
7. Update the Candidate/index/log records to document completion of the public-reference workflow.

Candidate-level `publication.decision: publish` authorized entry into this workflow; it does not substitute for review of the newly written public metadata.

## Link health

Add a manual maintenance command that reads the validated canonical URLs and reports:

- healthy destination
- redirect and resolved destination
- unavailable or timed-out destination

The command uses bounded timeouts and produces actionable per-record output. It is never called by page rendering, `next build`, or the default repository quality gate. External failure therefore cannot break the public application.

## Error handling

- Invalid local content fails validation with file-and-field context before rendering.
- Invalid filter values fall back to the full published index.
- Valid filters with no matches show a no-results explanation and clear action.
- Missing optional attribution or publication dates do not leave empty visual placeholders.
- Missing previews always render the neutral project fallback.
- Review and archived records never leak into the public list.
- External health failures remain maintenance findings and do not mutate records automatically.

## Testing strategy

Implementation follows test-driven development.

### Record validation tests

- accepts a complete valid record
- accepts `null` optional fields and an empty Collections list
- rejects malformed IDs, URLs, language codes, and dates
- rejects missing and unknown fields
- rejects duplicate IDs and canonical URLs
- rejects unsupported formats and statuses
- rejects empty or unknown Area relationships
- rejects unknown Collection relationships
- rejects invalid locale and translation relationships
- rejects incomplete preview provenance

### Loading and filtering tests

- returns only `published` records for the public index
- preserves a deterministic editorial order
- filters by Area, Format, and their intersection
- falls back to all records for an unknown filter
- returns an empty result for a valid combination with no matches

### Page and component tests

- replaces the old empty state with the published count and cards
- presents title, attribution, summary, relevance, metadata, and Area labels
- links to the canonical source with descriptive external-link text
- omits optional author and publication-date UI cleanly
- renders the neutral preview treatment
- exposes filter labels and a clear action accessibly
- presents a useful valid-no-results state

### Browser and quality verification

- keyboard navigation and visible focus through filters and card links
- responsive layout at mobile and desktop widths
- automated accessibility check of the References page
- confirmation that the production build performs no external content fetch
- record validation, formatting, linting, type checking, unit tests, browser tests, and production build pass

Three pre-existing formatting-only warnings in earlier plan documents will be normalized without changing their meaning so the repository-wide quality command can pass.

## Performance and implementation constraints

- Keep the page and cards as React Server Components.
- Do not ship filter state or reference data as a client-side bundle.
- Read and validate local data once per server/build execution rather than once per card.
- Avoid new runtime dependencies unless the implementation plan proves the standard library and existing toolchain insufficient.
- Do not add search, pagination, animation systems, a CMS, a database, accounts, saved state, or personalization.

## Completion criteria

The feature is complete when:

- all nine approved records have passed the explicit metadata review gate and use `published`
- all records validate against local registries
- `/en/references` renders and filters the nine records without network access
- every card preserves source identity and links to the canonical publisher
- review or archived records are absent from the public index
- the review preview works only in development and cannot expose review records in production
- missing optional fields and previews degrade cleanly
- link health can be checked independently without blocking application work
- the reference index and activity log reflect the published records
- the complete repository quality gate passes

## Deferred work

- Korean public record translations and `/ko` routes
- local reference-detail pages
- Area and Collection pages
- the first editorial Collection
- search and pagination
- automated source-change monitoring
- public submissions or editor accounts
- wave-3 expansion
