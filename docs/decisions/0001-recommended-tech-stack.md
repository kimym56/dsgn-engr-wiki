# 0001 — Recommended technology stack

- Status: **Accepted**
- Date: 2026-08-03
- Last updated: 2026-08-05
- Accepted: 2026-08-05
- Decision owners: Project maintainers

## Context

DSGN ENGR Wiki is a public, curated design-engineering reference library that is readable without authentication. Its first version needs structured local resource records, accessible browsing, strong static rendering, reliable validation, and a low-maintenance deployment path.

The repository is not yet in development. This record recommends a direction without installing packages or pinning versions. Stable versions should be selected and recorded when the implementation plan is approved.

## Recommended decision

Use:

- **Next.js App Router** for routing, layouts, metadata, static rendering, and future localization boundaries
- **React with strict TypeScript** for UI and content tooling
- **schema-validated local resource records** as the primary content source
- **local Markdown or MDX files** only where editorial pages, collection introductions, or interactive explanations benefit from authored document content
- **a small schema-validation layer** for resource metadata, areas, collections, relationships, and locale metadata
- **CSS custom properties and project-owned styles** for the visual system; introduce a styling framework only if the implementation plan demonstrates a clear advantage
- **Vitest and Testing Library** for unit and component behavior
- **Playwright Test** for browser journeys and accessibility-oriented interaction checks
- **npm** as the initial package manager, matching the surrounding portfolio projects
- **Vercel** as the initial preview and production deployment target

The initial architecture should not require a database, authentication, a headless CMS, or a hosted search service.

## Rationale

Next.js’s App Router provides file-based routing, metadata generation, static rendering, and current React server capabilities. Its official MDX integration remains useful for limited authored content without requiring MDX to represent every external reference.

Local resource records keep curation, review history, and implementation changes in one Git workflow. A validation layer can catch metadata and relationship errors before deployment. Reference, area, and collection pages can be rendered statically, while a generated local index supports browsing and lightweight search without a hosted service. Vitest supports fast focused test runs, while Playwright exercises visible behavior through a real browser.

Project-owned CSS keeps the initial design system explicit and avoids committing to an additional styling abstraction before the visual requirements are known.

## Alternatives considered

### Static-site generator

Astro or a documentation-focused generator could reduce client-side JavaScript and provide strong content primitives. This remains a viable alternative if the implementation plan shows that the product is almost entirely static and does not need React-oriented interaction patterns.

### Headless CMS from the beginning

A CMS would provide a browser-based editorial interface, but it introduces schema duplication, access control, preview integration, migration work, and service ownership before the editorial workflow is proven.

### Database-backed custom content system

A custom database model would support accounts, personalization, and complex queries, none of which are initial requirements. It would increase operational and testing burden without improving the first reference-browsing experience.

### Styling framework from the beginning

A utility or component framework could speed common layout work. It should be selected only after the visual direction and component needs are understood, because the product’s subject makes transparent design-system decisions especially valuable.

## Consequences

- Content changes will initially use Git review rather than a browser CMS.
- The resource schema, relationship validator, and generated browse index become important project-owned code.
- Reference, area, and collection pages should be statically rendered; client-side JavaScript should be limited to interactions that need it, such as filtering and language controls.
- MDX components must remain deliberately limited so editorial content stays portable and reviewable.
- Locale-aware paths should be established during the foundation stage even though Korean publishing comes later.
- Search can begin with generated indexes or a lightweight local solution and should not become a service dependency without evidence.
- External-resource records and preview assets follow [decision 0002](0002-reference-records-and-external-sources.md).
- Reconsidering the framework remains inexpensive until application development begins.

## Validation before acceptance

The first implementation plan should confirm that the recommended stack can:

1. render sample reference, area, and collection pages from local records
2. validate resource metadata and cross-record relationships during development and continuous integration
3. generate a local browse or search index without a hosted search service
4. generate locale-aware routes without publishing missing translations
5. meet accessibility and performance expectations with minimal client-side JavaScript
6. deploy preview builds without adding persistent infrastructure

If a short technical spike disproves one of these points, update or supersede this record before scaffolding the full product.

## References

- [Next.js App Router documentation](https://nextjs.org/docs/app)
- [Next.js Markdown and MDX guide](https://nextjs.org/docs/app/guides/mdx)
- [How I built my course platform](https://emilkowal.ski/ui/how-i-built-my-course-platform) — implementation case study, not normative framework guidance
- [Vitest command-line guide](https://vitest.dev/guide/cli)
- [Playwright Test documentation](https://playwright.dev/docs/api/class-test)
- [Playwright testing best practices](https://playwright.dev/docs/best-practices)
