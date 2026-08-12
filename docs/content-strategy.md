# Content strategy

## Purpose

The content system should help visitors discover worthwhile design-engineering resources and understand why each one may be relevant before leaving for the original source.

The editorial sequence is:

```text
Discover → Evaluate → Visit the source
```

The project adds selection, organization, and context. It does not replace the external work being referenced.

## Content objects

### Reference record

A reference record includes:

- the resource title and canonical URL
- publisher and, when useful, author
- a concise project-owned summary
- a short explanation of why the resource matters to design engineering
- resource format and one or more areas
- optional collection relationships
- source language, status, date added, and last substantive review date
- optional original publication date
- an approved preview image or the project’s neutral fallback

### Area

An area is a stable subject classification shared across references. An area page briefly explains its connection to design engineering and displays matching resources without copying their summaries into a separate content system.

### Collection

A collection is an editorial selection built from existing references around a purpose, question, or learning outcome. It may explain why the selection or order matters, but it points to the same canonical reference records.

### Editorial pages

Home, About, selection-policy, and collection-introduction content may use Markdown or MDX when document structure is helpful. Interactive MDX components should remain exceptional rather than becoming the default content format.

### Candidate

A Candidate is an internal Markdown record for a canonical URL discovered through a qualifying resource section. It is a research lead with provenance, lifecycle state, analysis relationships, and a human-owned publication decision; it is not a published reference record.

### Discovery edge

A Discovery edge is the directed relationship from a parent source to a Candidate. It preserves the parent, qualifying section, original link text, encountered URL, discovery date, wave, depth, and active-history state. Several parents may discover the same canonical Candidate without creating duplicate candidate nodes.

### Expansion approval

Expansion approval is a human decision that permits inspection and analysis of one bounded next wave of qualifying Candidates. It never grants publication approval. Qualifying links discovered inside that wave are recorded for a later wave and are not inspected or analyzed until another expansion approval.

### Publication approval

Publication approval is a separate human decision that permits an analyzed Candidate to enter the existing public-reference workflow. Until that decision is `publish` and the existing workflow is complete, Candidates and their draft analyses remain internal authoring material.

## Reference metadata model

Every reference should carry the following fields when the content system is implemented:

| Field             | Purpose                                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------------------------- |
| `id`              | Stable project-owned identifier                                                                                 |
| `title`           | Resource title as published or editorially normalized without changing its meaning                              |
| `url`             | Canonical external destination                                                                                  |
| `publisher`       | Organization or site responsible for the resource                                                               |
| `author`          | Individual author when available and useful                                                                     |
| `summary`         | Concise project-owned description for cards and search                                                          |
| `relevance`       | Why the resource matters to design engineering                                                                  |
| `format`          | Controlled value such as `article`, `documentation`, `video`, `talk`, `tool`, `course`, `book`, or `repository` |
| `areas`           | One or more stable area identifiers                                                                             |
| `collections`     | Optional collection identifiers                                                                                 |
| `source_language` | Language of the external resource                                                                               |
| `published`       | Original publication date when known and meaningful                                                             |
| `added`           | Date the project added the reference                                                                            |
| `reviewed`        | Date of the latest substantive editorial review                                                                 |
| `status`          | `draft`, `review`, `published`, or `archived`                                                                   |
| `preview`         | Optional approved image record and provenance                                                                   |
| `language`        | Language of the project-owned metadata                                                                          |
| `translation_of`  | Canonical reference identifier for translated metadata                                                          |

The implementation plan may refine field names or storage format, but it should preserve these responsibilities.

## Selection criteria

A resource is a strong candidate when it:

- directly connects design intent with implementation, systems, interaction, accessibility, tooling, or frontend quality
- contains durable insight, a useful example, or authoritative guidance
- has an identifiable publisher or author and a stable canonical destination
- adds meaningful coverage rather than duplicating a stronger existing reference
- can be summarized accurately without reproducing its substantive content
- is usable by the intended audience or clearly labeled when advanced

Exclude resources that are primarily promotional, misleading, unattributed, inaccessible without a justifiable reason, or too shallow to add value beyond a search-result snippet.

## Source and attribution policy

- Link to the most direct canonical source available.
- Display the publisher and author when known.
- Write original summaries; do not copy abstracts, descriptions, transcripts, or substantial passages.
- Quote only when necessary, keep quotations short, and attribute them directly.
- Do not treat search-result summaries, reposts, or AI-generated text as evidence.
- Preserve established product, API, and technical names.
- When a source changes ownership, redirects, or disappears, record the review outcome before updating or archiving it.

## Preview-image policy

Use the project-owned neutral fallback unless a preview image has passed editorial review. Do not hotlink arbitrary Open Graph images automatically. Record image provenance and alternative text, and ensure a missing image never hides the title, publisher, summary, or destination link.

The full external-source decision is documented in [`docs/decisions/0002-reference-records-and-external-sources.md`](decisions/0002-reference-records-and-external-sources.md).

## Editorial voice

- Write concise, factual summaries for an intelligent reader who may know only one side of design engineering.
- Explain specific value instead of using promotional language such as “must-read,” “best,” or “industry standard.”
- Distinguish what the source claims from the project’s editorial judgment.
- Prefer concrete descriptions over broad praise.
- Use consistent English terminology so Korean translations have a stable source.

## English and Korean workflow

English is the canonical language for project-owned metadata in the initial release. The external resource may be in any explicitly recorded source language.

Every completed English source analysis receives a Korean translation for internal review, even when its Candidate has not been approved for publication. The Korean analysis translation links back to its canonical English analysis and does not make either artifact public.

Published Korean reference translations begin only after an English reference record reaches `published` status. Each published-reference translation:

- references the canonical English record through `translation_of`
- points to the same external destination unless a reviewed Korean edition exists
- preserves code, API names, publication names, and established English terms where translation would create ambiguity
- translates the project-owned summary and relevance note without changing their claims
- returns to review when the canonical English metadata changes substantively

Translation freshness must be visible to editors even if the first public release exposes only English metadata.

## Editorial workflow

1. **Propose** — confirm that the resource fits the scope and is not a weaker duplicate.
2. **Evaluate** — inspect the complete source, publisher, relevance, durability, and access conditions.
3. **Capture** — create a record from [`templates/reference-record.md`](../templates/reference-record.md).
4. **Verify** — confirm the canonical URL, attribution, metadata, summary accuracy, and preview provenance.
5. **Review** — assess selection quality, editorial clarity, accessibility, classification, and links.
6. **Publish** — change the status only after required checks pass.
7. **Maintain** — revisit redirects, failures, stale metadata, and substantive source changes.
8. **Archive or replace** — preserve editorial history while removing unsuitable resources from normal browsing.

## Content quality checklist

A reference is publishable when:

- its title, destination, publisher, and author information are accurate
- its summary and relevance note are original, concise, and faithful to the source
- its format, areas, and collections are correct
- the source has been inspected rather than judged from a search snippet alone
- the destination is canonical and currently reachable, or an exception is documented
- preview-image provenance is approved or the neutral fallback is used
- link text and card content remain understandable out of context
- translated metadata, if present, points to the correct canonical record
- no temporary editorial notes remain
- a person owns final editorial review even when AI assisted discovery or drafting
