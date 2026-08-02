# 0001 — Recommended technology stack

- Status: **Proposed**
- Date: 2026-08-03
- Decision owners: Project maintainers

## Context

DSGN ENGR Wiki is expected to be content-heavy, primarily public, and readable without authentication. Its first version needs structured local content, accessible navigation, strong static rendering, reliable validation, and a low-maintenance deployment path.

The repository is not yet in development. This record recommends a direction without installing packages or pinning versions. Stable versions should be selected and recorded when the implementation plan is approved.

## Recommended decision

Use:

- **Next.js App Router** for routing, layouts, metadata, static rendering, and future localization boundaries
- **React with strict TypeScript** for UI and content tooling
- **local Markdown or MDX files** as the initial content source
- **a small schema-validation layer** for frontmatter, relationships, and locale metadata
- **CSS custom properties and project-owned styles** for the visual system; introduce a styling framework only if the implementation plan demonstrates a clear advantage
- **Vitest and Testing Library** for unit and component behavior
- **Playwright Test** for browser journeys and accessibility-oriented interaction checks
- **npm** as the initial package manager, matching the surrounding portfolio projects
- **Vercel** as the initial preview and production deployment target

The initial architecture should not require a database, authentication, a headless CMS, or a hosted search service.

## Rationale

Next.js’s App Router provides file-based routing and current React server capabilities. Its official MDX integration supports local Markdown and MDX content, which fits a version-controlled editorial workflow without introducing a CMS prematurely.

Local content keeps review, history, and implementation changes in one Git workflow. A validation layer can catch metadata and relationship errors before deployment. Vitest supports fast focused test runs, while Playwright exercises visible behavior through a real browser.

Project-owned CSS keeps the initial design system explicit and avoids committing to an additional styling abstraction before the visual requirements are known.

## Alternatives considered

### Static-site generator

Astro or a documentation-focused generator could reduce client-side JavaScript and provide strong content primitives. This remains a viable alternative if the implementation plan shows that the product is almost entirely static and does not need React-oriented interaction patterns.

### Headless CMS from the beginning

A CMS would provide a browser-based editorial interface, but it introduces schema duplication, access control, preview integration, migration work, and service ownership before the editorial workflow is proven.

### Database-backed custom content system

A custom database model would support accounts, personalization, and complex queries, none of which are initial requirements. It would increase operational and testing burden without improving the first learning experience.

### Styling framework from the beginning

A utility or component framework could speed common layout work. It should be selected only after the visual direction and component needs are understood, because the product’s subject makes transparent design-system decisions especially valuable.

## Consequences

- Content changes will initially use Git review rather than a browser CMS.
- The content schema and relationship validator become important project-owned code.
- MDX components must remain deliberately limited so content stays portable and reviewable.
- Locale-aware paths should be established during the foundation stage even though Korean publishing comes later.
- Search can begin with generated indexes or a lightweight local solution and should not become a service dependency without evidence.
- Reconsidering the framework remains inexpensive until application development begins.

## Validation before acceptance

The first implementation plan should confirm that the recommended stack can:

1. render each proposed content type from local files
2. validate metadata and cross-entry relationships during development and continuous integration
3. generate locale-aware routes without publishing missing translations
4. meet accessibility and performance expectations with minimal client-side JavaScript
5. deploy preview builds without adding persistent infrastructure

If a short technical spike disproves one of these points, update or supersede this record before scaffolding the full product.

## References

- [Next.js App Router documentation](https://nextjs.org/docs/app)
- [Next.js Markdown and MDX guide](https://nextjs.org/docs/app/guides/mdx)
- [Vitest command-line guide](https://vitest.dev/guide/cli)
- [Playwright Test documentation](https://playwright.dev/docs/api/class-test)
- [Playwright testing best practices](https://playwright.dev/docs/best-practices)
