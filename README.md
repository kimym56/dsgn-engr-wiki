# DSGN ENGR Wiki

**Design Engineering Wiki** is a planned curated reference library that brings useful design-engineering resources from across the web into one browsable, editorially reviewed platform.

## Project status

Phase 1, the **technical foundation**, is implemented. The repository contains a deployable Next.js shell with locale-prefixed English routes, project-owned design tokens, automated checks, and continuous integration.

It intentionally does not contain:

- production reference records or content schemas
- populated Areas or Collections
- filters, search, or a language switcher
- a database, authentication, CMS, or hosted search service

Those capabilities begin with separately approved Phase 2 and Phase 3 plans.

## Naming

- Display name: **DSGN ENGR Wiki**
- Full name: **Design Engineering Wiki**
- Repository name: `dsgn-engr-wiki`
- Optional visual shorthand: `DSGN/ENGR`
- Working description: “A curated library of design-engineering references.”

## Audience and language

The first audience is designers, frontend developers, and design engineers looking for reliable material across design and implementation. English is the canonical language for the first release. The metadata and URL model reserve a clear path for Korean translations later.

## Readiness documents

Read the documents in this order:

1. [`docs/product-brief.md`](docs/product-brief.md) — purpose, audience, scope, principles, and success criteria
2. [`docs/content-strategy.md`](docs/content-strategy.md) — selection, metadata, attribution, maintenance, and translation workflow
3. [`docs/information-architecture.md`](docs/information-architecture.md) — proposed navigation, page families, URLs, and relationships
4. [`docs/development-process.md`](docs/development-process.md) — future delivery workflow, quality gates, and definition of done
5. [`docs/roadmap.md`](docs/roadmap.md) — phased path from readiness to first public release
6. [`docs/decisions/0001-recommended-tech-stack.md`](docs/decisions/0001-recommended-tech-stack.md) — recommended stack, documented but not installed
7. [`docs/decisions/0002-reference-records-and-external-sources.md`](docs/decisions/0002-reference-records-and-external-sources.md) — proposed resource data, attribution, link-health, and preview policy

Korean review translations live in [`docs/ko/`](docs/ko/). English remains the canonical language for project decisions and content.

Reusable reference-authoring and decision templates live in [`templates/`](templates/).

## Reference collection workflow

To propose sources, paste one absolute web URL per line into [`references/inbox.md`](references/inbox.md). Do not add titles, metadata, or statuses; the URL list remains human-owned input.

AI agents follow the scoped rules in [`references/AGENTS.md`](references/AGENTS.md): they may verify submitted destinations but cannot search for or add related sources. Proposed reference records remain drafts until human review. Approved internal analyses and cross-source concepts are cataloged through [`references/index.md`](references/index.md), with chronological operations preserved in [`references/log.md`](references/log.md).

Authoring structures live in [`templates/`](templates/), and the approved workflow design is documented in [`docs/superpowers/specs/2026-08-07-reference-inbox-design.md`](docs/superpowers/specs/2026-08-07-reference-inbox-design.md).

## Local development

Requirements:

- Node.js 22.17.0 (`nvm use` reads `.nvmrc`)
- npm 10

Install and run:

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`; the root redirects to `/en`.

## Quality commands

- `npm run format:check` — verify formatting
- `npm run lint` — run ESLint with zero warnings
- `npm run typecheck` — run strict TypeScript checking
- `npm test` — run unit and component tests
- `npm run test:e2e` — run Chromium browser and automated accessibility checks against an existing production build
- `npm run build` — create the production build
- `npm run check` — run the deterministic non-browser quality gate

Run `npm run build` before `npm run test:e2e`. External link-health checks are intentionally separate from these commands and will be introduced with the reference system.

### Designparser study authoring

Private extraction runs only on the maintainer's Mac. It requires a signed-in
Chrome Instagram session plus these local commands:

```bash
brew install gallery-dl openai-whisper
```

FFmpeg is also required. Verify the environment without downloading media:

```bash
npm run study:designparser -- preflight
```

All source media, transcripts, frames, and drafts stay under gitignored
`.study-cache/`. Never export Chrome cookies into the repository. No study is
added to the wiki until its English synthesis is reviewed and approved.

## Application routes

- `/` redirects to `/en`
- `/en` — Home
- `/en/references` — References shell
- `/en/explore` — Explore shell
- `/en/about` — About

Korean uses the reserved locale code `ko`, but no `/ko` pages or language control are published until reviewed translations exist.

## Next gate

The next artifact is the Phase 2 Reference Foundation implementation plan. It will define the local record format, schemas, validation, sample references, preview fallback, generated browse index, and non-blocking link-health workflow before those features are implemented.
