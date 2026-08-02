# Roadmap

This roadmap defines sequence and exit criteria rather than calendar commitments. Each development stage requires its own approved plan before implementation begins.

## Phase 0 — Project readiness

**Outcome:** The project can begin development without guessing its purpose, content model, information architecture, or working process.

Included:

- product brief
- content strategy and templates
- information architecture
- development and quality process
- recommended technology decision
- initialized Git history

**Exit criterion:** The readiness documents are reviewed, contradictions are resolved, and the first implementation plan is approved.

## Phase 1 — Technical foundation

**Outcome:** A minimal, deployable application shell with no unnecessary product features.

Expected scope:

- Next.js and TypeScript scaffold using stable versions available at implementation time
- locale-aware route foundation for English and future Korean content
- global design tokens and accessible page shell
- formatting, linting, type checking, testing, and build commands
- continuous integration and preview deployment

**Exit criterion:** The empty product shell builds, deploys, passes its quality gate, and documents local setup.

## Phase 2 — Content foundation

**Outcome:** Reviewed sample entries prove the content model before broad content production.

Expected scope:

- schemas for terms, knowledge, skills, topics, and learning paths
- validation for metadata and internal relationships
- one reviewed sample entry for each primary content type
- source rendering and last-reviewed metadata
- editorial preview workflow

**Exit criterion:** Editors can add a valid entry from a template, receive actionable validation errors, and preview connected content locally.

## Phase 3 — Core learning experience

**Outcome:** Learners can browse, read, and move through connected content.

Expected scope:

- home and browse pages
- term, knowledge, and skill entry pages
- topic pages and an initial learning path
- breadcrumbs and related-entry navigation
- responsive and keyboard-accessible interaction

**Exit criterion:** The principal learner journeys pass browser and accessibility review using the sample corpus.

## Phase 4 — Content pilot and discovery

**Outcome:** A small coherent corpus reveals whether navigation and terminology work in practice.

Expected scope:

- a deliberately limited English content set across the initial topic families
- editorial and technical review of every published entry
- search only if corpus testing shows a clear need
- feedback capture without requiring user accounts

**Exit criterion:** Test readers can find, understand, and connect relevant entries without editorial guidance.

## Phase 5 — Public release readiness

**Outcome:** The site is maintainable and safe to publish.

Expected scope:

- production accessibility and performance review
- source, link, metadata, and content freshness checks
- cross-browser verification
- production deployment and monitoring basics
- contributor and maintenance documentation

**Exit criterion:** The full quality gate passes in production configuration and ownership of content maintenance is explicit.

## Later opportunities

The following remain outside the initial release and require evidence before planning:

- Korean translation publishing
- richer search and relationship visualization
- community contribution workflows
- saved learning progress
- automated source-change monitoring
- optional editorial tooling or a content management system
