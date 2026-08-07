# Roadmap

This roadmap defines sequence and exit criteria rather than calendar commitments. Each development stage requires its own approved plan before implementation begins.

## Phase 0 — Project readiness

**Outcome:** The project can begin development without guessing its purpose, reference model, information architecture, external-source policy, or working process.

Included:

- product brief
- content and curation strategy
- information architecture
- development and quality process
- recommended technology decision
- reference-record and external-source decision
- initialized Git history

**Exit criterion:** The readiness documents are reviewed, contradictions are resolved, the proposed decisions are accepted or revised, and the first implementation plan is approved.

## Phase 1 — Technical foundation

**Outcome:** A minimal, deployable application shell with no unnecessary product features.

Expected scope:

- a framework and TypeScript scaffold using stable versions selected by the approved implementation plan
- locale-aware route foundation for English and future Korean metadata
- Home, References, Explore, and About navigation shell
- global design tokens and accessible page structure
- formatting, linting, type checking, testing, and build commands
- continuous integration and preview deployment

**Exit criterion:** The empty product shell builds, deploys, passes its quality gate, and documents local setup.

## Phase 2 — Reference foundation

**Outcome:** Reviewed sample records prove the curation and data model before broad collection work.

Expected scope:

- schemas for References, Areas, Collections, locales, and preview records
- validation for metadata and internal relationships
- a deliberately small set of reviewed sample references covering multiple formats and metadata states
- neutral preview fallback
- generated local browse index
- non-blocking link-health check
- editorial preview workflow using the reference template

**Exit criterion:** Editors can add a valid reference from the template, receive actionable validation errors, preview it locally, and check its external destination without making the build depend on that destination.

## Phase 3 — Core discovery experience

**Outcome:** Visitors can browse, evaluate, and open curated design-engineering resources.

Expected scope:

- Home and complete References pages
- Explore, Area, and Collection pages
- useful filters demonstrated by the sample library
- clear publisher, format, source-language, and external-link presentation
- responsive and keyboard-accessible interaction
- language switching only where reviewed translations exist

**Exit criterion:** Principal visitor journeys pass browser and accessibility review using the sample library, including missing-preview and invalid-filter states.

## Phase 4 — Curation pilot

**Outcome:** A small coherent library reveals whether selection, organization, and editorial summaries work in practice.

Expected scope:

- a deliberately limited English reference set across the initial Areas
- editorial and technical review of every published record
- at least one purposeful Collection
- search only if library testing shows a clear need
- a documented process for corrections, redirects, unavailable sources, and replacement
- lightweight feedback capture without requiring user accounts

**Exit criterion:** Test visitors can find a relevant resource, understand why it was selected, identify its publisher, and reach the original source without editorial guidance.

## Phase 5 — Public release readiness

**Outcome:** The library is maintainable and safe to publish.

Expected scope:

- production accessibility and performance review
- attribution, link, metadata, preview-provenance, and freshness checks
- cross-browser verification
- production deployment and monitoring basics
- contributor and maintenance documentation
- explicit ownership of editorial review and link-health follow-up

**Exit criterion:** The full quality gate passes in production configuration, the pilot library has completed editorial review, and ongoing curation ownership is explicit.

## Later opportunities

The following remain outside the initial release and require evidence before planning:

- Korean metadata publishing
- broader or full-text search
- automated metadata suggestions during authoring
- automated source-change monitoring
- public resource-submission workflows
- richer collection and relationship visualization
- saved resources or personalized recommendations
- optional editorial tooling or a content management system
