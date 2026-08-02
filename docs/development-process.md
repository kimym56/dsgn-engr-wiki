# Development process

## Current boundary

The repository is currently documentation-only. The first development task must be based on an approved implementation plan. Until that approval, do not add an application scaffold, dependencies, runtime configuration, or production content.

## Delivery principles

1. Work in small, reviewable increments tied to a documented outcome.
2. Keep content, presentation, and content validation independently understandable.
3. Test user-visible behavior and content integrity, not implementation details alone.
4. Treat accessibility, responsive behavior, and performance as acceptance criteria.
5. Record decisions that constrain future work in `docs/decisions/`.
6. Avoid services, databases, or abstractions until a documented requirement needs them.

## Planned delivery stages

### Stage 0 — Readiness

Define the product, content model, information architecture, recommended stack, process, and roadmap. This repository currently occupies this stage.

### Stage 1 — Foundation

Create the minimal application scaffold, quality tooling, locale-aware routing, design foundations, and continuous verification defined by the implementation plan.

### Stage 2 — Content system

Implement content schemas, templates, validation, relationships, and a small reviewed sample set for each content type.

### Stage 3 — Core experience

Implement home, browse, entry, topic, and learning-path experiences. Add search only when the sample corpus demonstrates that browse navigation is insufficient.

### Stage 4 — Release quality

Complete accessibility review, cross-browser verification, performance checks, source review, production deployment, and maintenance documentation.

## Work item lifecycle

1. Define a user or editorial outcome and acceptance criteria.
2. Identify affected content, routes, components, validation rules, and tests.
3. Record a decision when the change creates a durable constraint.
4. Implement the smallest coherent slice on a focused branch.
5. Run targeted checks during development and the full quality gate before review.
6. Review user-visible behavior, accessibility, content integrity, and documentation.
7. Merge only when checks pass and follow-up work is explicitly separated.

## Planned quality gate

The application scaffold should provide commands for:

- formatting or formatting verification
- linting
- TypeScript checking
- content-schema and internal-link validation
- unit and component tests
- browser-based end-to-end and accessibility checks
- a production build

The exact command names belong to the implementation plan and scaffold. Once defined, they should be documented in the repository root and run in continuous integration.

## Testing expectations

### Content validation

Validate required metadata, unique slugs, supported content types, topic identifiers, prerequisite references, related-entry references, source structure, locale relationships, and translation freshness signals.

### Unit and component tests

Cover content parsing, relationship helpers, navigation logic, and components with meaningful state or behavior. Avoid snapshot tests that obscure the behavior being protected.

### Browser tests

Cover the principal learner journeys:

- enter through the home page and choose a content type
- find an entry through browsing
- move from a term to related knowledge and then to a skill
- follow a learning path
- switch language when a reviewed translation exists
- recover gracefully from an unknown or unpublished entry

Browser tests should assert visible behavior and remain isolated from one another.

### Accessibility review

Automated checks support, but do not replace, keyboard review, focus-order review, semantic-heading review, link-purpose review, zoom and reflow checks, and assistive-technology spot checks.

## Error-handling expectations

- Invalid content should fail locally and in continuous integration with an actionable message.
- Broken internal references should fail before deployment.
- Unknown routes should provide a useful not-found page with recovery navigation.
- Missing optional relationships should not break an otherwise valid entry.
- A missing translation should keep the canonical language available without exposing an empty locale page.
- External source failures should not prevent static content from rendering; links should remain inspectable and maintainable.

## Definition of done for a development increment

A change is done when:

- its acceptance criteria are satisfied
- relevant automated checks pass
- affected user journeys have been manually inspected at appropriate viewport sizes
- keyboard and semantic accessibility have been reviewed
- content and source links are valid
- documentation and decision records reflect durable changes
- no secrets, temporary debug behavior, or unexplained warnings remain

## Decision process

Create an architecture decision record when a choice:

- is difficult to reverse
- introduces a service or important dependency
- changes the content model or public URL structure
- affects privacy, accessibility, localization, or deployment
- establishes a convention that future contributors must follow

Use [`templates/decision-record.md`](../templates/decision-record.md) and index accepted decisions in [`docs/decisions/README.md`](decisions/README.md).
