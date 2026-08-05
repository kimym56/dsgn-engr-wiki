# DSGN ENGR Wiki

**Design Engineering Wiki** is a planned curated reference library that brings useful design-engineering resources from across the web into one browsable, editorially reviewed platform.

## Project status

This repository is in the **readiness stage**. It contains product, content, information-architecture, and development-process documents only.

It intentionally does not contain:

- application source code
- a framework scaffold or `package.json`
- installed dependencies
- production reference records
- deployment configuration

Website development begins only after these documents are reviewed and an implementation plan is approved.

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

## Next gate

The readiness documents and decisions were reviewed and approved on 2026-08-05. The next artifact is the Phase 1 implementation plan. Phase 0 remains open until that plan is approved; creating the application scaffold is a later, separately approved step.
