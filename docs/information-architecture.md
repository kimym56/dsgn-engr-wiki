# Information architecture

## Objective

The information architecture should support two complementary behaviors:

- **lookup:** scan or filter the full reference library efficiently
- **discovery:** encounter useful resources through areas and editorial collections

The architecture should remain understandable before full-text search is introduced.

## Proposed top-level navigation

1. **Home** — explains the library, highlights useful references, and provides clear starting points
2. **Explore** — supports discovery through broad areas and editorial collections
3. **References** — provides one filterable index of all curated resources
4. **About** — explains the scope, selection principles, sourcing, and curation process

The navigation is organized around visitor intent rather than exposing storage or schema details.

Search becomes a primary aid only when the number of references makes browsing and filtering inefficient. It should not be required for the initial structure to make sense.

## Page families

### Home

The home page should communicate the product promise, identify the intended audience, and offer direct starting points to browse all references or explore a design-engineering area. It may highlight a small number of recently added or editorially selected resources.

### Explore

Explore provides a guided alternative to the complete index. It groups references in two ways:

- **areas** classify resources under broad design-engineering subjects such as accessibility, design systems, or interaction
- **collections** intentionally curate a smaller set of resources around a purpose, question, or learning outcome

Areas are stable classification tools. Collections are editorial and may change as stronger references are found. Both render the same canonical reference records.

### References

References is the complete resource index. It should support filtering by area, format, source language, and other validated metadata when useful. Filtering should not create a separate taxonomy or duplicate resource data.

Each resource card should include enough information to make an informed choice before opening the source:

- title and format
- publisher and, when useful, author
- concise summary or relevance note
- areas
- source language and last substantive review date when relevant
- a clear external destination
- an approved preview image or neutral fallback

The initial experience may link directly from cards to external sources. Dedicated local reference-detail pages should be added only if testing shows that cards cannot provide enough editorial context.

### Area pages

An area page explains how the subject connects to design engineering and displays matching references. Area pages should not duplicate or own reference summaries.

### Collection pages

A collection page explains why its selection or order is useful and displays existing references. Removing a reference from a collection must not remove the reference from the main library.

### About

The About page explains the project’s scope, selection criteria, source and correction policies, language approach, and how to suggest a resource.

## Proposed URL model

Because Korean support is an explicit future requirement, locale prefixes should be part of the structure from the first implementation:

```text
/en/
/en/explore
/en/references
/en/areas/[slug]
/en/collections/[slug]
/en/about

/ko/...
```

The root route can direct visitors using an explicit language preference and a documented fallback. Use `ko` for the Korean-language locale; `kr` is a country code rather than a language identifier.

Korean routes should not be published until reviewed translations exist. A language control changes the URL, while a server-readable preference may remember the visitor’s choice. The URL remains the authoritative language state.

Slugs remain stable after publication. When a rename is unavoidable, the old URL should redirect to the new canonical URL.

Filter state may use query parameters such as `/en/references?area=accessibility`, provided filtered views remain shareable and degrade to the full index when a value is invalid.

## Relationship model

Relationships are explicit and validated:

- a reference belongs to one or more areas
- a reference may appear in zero or more collections
- an area aggregates references without owning their records
- a collection selects and optionally orders references without owning their records
- translated project metadata points to the same canonical reference identity

The implementation should validate referenced identifiers so broken relationships fail during development or build checks rather than appearing in production.

## External-navigation behavior

- Clearly distinguish links that open an external publisher.
- Preserve accessible link purpose without relying on an icon alone.
- Do not obscure, redirect through, or replace the canonical external destination for tracking convenience.
- Keep project-owned context visible even when a preview image is missing.
- If a source is archived or temporarily unavailable, provide a useful status without silently substituting a different resource.

## Navigation principles

- Keep the four top-level destinations stable and understandable.
- Preserve filters when practical while visitors move between the index and Explore.
- Provide breadcrumbs on Area and Collection pages.
- Avoid category trees deeper than necessary; prefer a flat set of Areas and explicit Collections.
- Ensure every published reference can be reached through browsing without relying on a search engine.
- Make keyboard focus, skip navigation, headings, and link purpose part of the base page structure.

## Deliberately deferred decisions

These decisions depend on validated library size and interaction design:

- the exact search or indexing approach
- exact filter controls and sorting options
- whether references need dedicated local detail pages
- whether visitors can suggest resources through a form
- whether metadata suggestions should be automated during authoring

Deferral means these features are excluded from the first scaffold, not forgotten requirements.
