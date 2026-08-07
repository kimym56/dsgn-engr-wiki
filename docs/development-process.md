# Development process

## Current boundary

The repository is currently documentation-only. The first development task must be based on an approved implementation plan. Until that approval, do not add an application scaffold, dependencies, runtime configuration, or production reference records.

## Delivery principles

1. Work in small, reviewable increments tied to a documented visitor or editorial outcome.
2. Keep resource data, presentation, validation, and maintenance tooling independently understandable.
3. Render public pages deterministically from reviewed local data.
4. Test user-visible behavior and resource integrity, not implementation details alone.
5. Treat accessibility, responsive behavior, and performance as acceptance criteria.
6. Record decisions that constrain future work in `docs/decisions/`.
7. Avoid services, databases, runtime scraping, or abstractions until a documented requirement needs them.

## Planned delivery stages

### Stage 0 — Readiness

Define the product, reference model, information architecture, recommended stack, external-source policy, process, and roadmap. This repository currently occupies this stage.

### Stage 1 — Foundation

Create the minimal application scaffold, quality tooling, locale-aware routing, design foundations, and continuous verification defined by the implementation plan.

### Stage 2 — Reference system

Implement resource, Area, and Collection schemas; validation; local index generation; the authoring template; neutral preview fallback; and a small reviewed sample set.

### Stage 3 — Core discovery experience

Implement Home, References, Explore, Area, Collection, and About pages. Add filtering needed by the sample library. Add search only when testing shows that browsing and filtering are insufficient.

### Stage 4 — Release quality

Complete accessibility review, cross-browser verification, performance checks, source and attribution review, link-health workflow, production deployment, and maintenance documentation.

## Work item lifecycle

1. Define a visitor or editorial outcome and acceptance criteria.
2. Identify affected records, routes, components, validation rules, indexes, and tests.
3. Record a decision when the change creates a durable constraint.
4. Implement the smallest coherent slice on a focused branch.
5. Run targeted checks during development and the full quality gate before review.
6. Review user-visible behavior, accessibility, resource integrity, attribution, and documentation.
7. Merge only when checks pass and follow-up work is explicitly separated.

## Planned quality gate

The application scaffold should provide commands for:

- formatting or formatting verification
- linting
- TypeScript checking
- resource-schema and internal-relationship validation
- local browse or search index generation
- unit and component tests
- browser-based end-to-end and accessibility checks
- a production build

The exact command names belong to the implementation plan and scaffold. Once defined, they should be documented in the repository root and run in continuous integration.

External link-health checks are part of maintenance but should remain separate from the deterministic production build. A temporary third-party outage must not prevent deployment of valid local records.

## Testing expectations

### Resource validation

Validate required metadata, unique identifiers, URL syntax, supported formats, Area identifiers, Collection relationships, status values, dates, locale relationships, translation freshness signals, and preview-image records.

### Unit and component tests

Cover record parsing, validation errors, filtering, index generation, relationship helpers, locale selection, external-link presentation, and preview fallbacks. Avoid snapshot tests that obscure the behavior being protected.

### Browser tests

Cover the principal visitor journeys:

- enter through Home and browse the complete reference index
- filter references by Area or format and recover from an invalid filter
- discover references through an Area
- open an editorial Collection
- identify an external destination before following it
- switch language when reviewed project metadata exists
- browse a resource whose optional author or preview image is missing
- recover gracefully from an unknown or unpublished Area or Collection

Browser tests should assert visible behavior and remain isolated from one another. Tests must not depend on external publishers being online.

### Link-health checks

A separate maintenance check should report redirects, persistent failures, and the affected record identifier. It should distinguish transient failures from repeated failures and should not edit or archive records automatically.

### Accessibility review

Automated checks support, but do not replace, keyboard review, focus-order review, semantic-heading review, external-link-purpose review, zoom and reflow checks, and assistive-technology spot checks.

## Error-handling expectations

- Invalid local records should fail development and continuous integration with an actionable message.
- Broken Area, Collection, or translation relationships should fail before deployment.
- Invalid filter values should recover to a useful index rather than an empty or broken page.
- Unknown routes should provide a useful not-found page with recovery navigation.
- Missing optional metadata or previews should not break an otherwise valid reference.
- A missing translation should keep the canonical language available without exposing an empty locale page.
- External source failures should not prevent static pages from rendering.

## Definition of done for a development increment

A change is done when:

- its acceptance criteria are satisfied
- relevant automated checks pass
- affected visitor and editorial journeys have been manually inspected at appropriate viewport sizes
- keyboard and semantic accessibility have been reviewed
- local records, internal relationships, attribution, and preview provenance are valid
- external-link behavior has been checked without making build success depend on source availability
- documentation and decision records reflect durable changes
- no secrets, temporary debug behavior, or unexplained warnings remain

## Decision process

Create an architecture decision record when a choice:

- is difficult to reverse
- introduces a service or important dependency
- changes the resource schema, public URL structure, or external-source policy
- affects privacy, accessibility, localization, copyright risk, or deployment
- establishes a convention that future contributors must follow

Use [`templates/decision-record.md`](../templates/decision-record.md) and index accepted decisions in [`docs/decisions/README.md`](decisions/README.md).
