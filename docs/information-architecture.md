# Information architecture

## Objective

The information architecture should support two complementary behaviors:

- **reference:** quickly understand a specific term or concept
- **learning:** move through connected entries in a useful sequence

The architecture should remain understandable before full-text search is introduced.

## Proposed top-level navigation

1. **Home** — explains the wiki and provides clear starting points
2. **Terms** — alphabetical and topic-based vocabulary browsing
3. **Knowledge** — conceptual articles grouped by topic
4. **Skills** — practical learning units grouped by outcome and difficulty
5. **Topics** — cross-content collections such as accessibility or design systems
6. **Learning paths** — curated sequences assembled from existing entries
7. **About** — scope, editorial principles, sourcing, and contribution process

Search becomes a primary navigation aid when content volume makes browsing alone inefficient. It should not be required for the initial structure to make sense.

## Page families

### Home

The home page should communicate the product promise, identify the intended learner, and offer three direct starting points: understand a term, explore knowledge, or learn a skill.

### Browse pages

Terms, knowledge, and skills each receive a browse page with filters appropriate to the content type. Topic and difficulty filters should use the shared metadata model instead of duplicating category logic.

### Entry pages

Every entry page should include:

- title, type, summary, and last substantive review date
- the entry’s primary content
- prerequisites when applicable
- related terms, knowledge, and skills
- sources or further reading
- translation relationship when another language is available

### Topic pages

A topic page collects entries from all three content types and explains how the topic connects to design engineering. Topic pages should not duplicate the full entry content.

### Learning paths

A learning path orders existing entries around a learner outcome. It may explain why the sequence matters, but it should link to canonical entries rather than copy them.

## Proposed URL model

Because Korean support is an explicit future requirement, locale prefixes should be part of the structure from the first implementation:

```text
/en/
/en/terms/[slug]
/en/knowledge/[slug]
/en/skills/[slug]
/en/topics/[slug]
/en/learn/[slug]
/en/about

/ko/...
```

The root route can direct visitors to the English site during the English-only stage. Korean routes should not be published until reviewed translations exist.

Slugs remain stable after publication. When a rename is unavoidable, the old URL should redirect to the new canonical URL.

## Relationship model

Relationships are explicit rather than inferred only from matching tags:

- a term may link to knowledge that explains it
- knowledge may link to skills that apply it
- a skill may declare prerequisite terms or knowledge
- entries may link laterally to closely related entries of the same type
- topics aggregate entries without becoming prerequisites
- learning paths order entries without owning their content

The implementation should validate referenced identifiers so broken relationships fail during development or build checks rather than appearing in production.

## Navigation principles

- Keep content type visible so learners know whether they are reading a definition, explanation, or procedure.
- Preserve context when moving between related entries.
- Provide breadcrumbs on nested pages.
- Avoid category trees deeper than necessary; prefer explicit relationships and topic collections.
- Ensure every published entry can be reached through browsing without relying on search engines.
- Make keyboard focus, skip navigation, headings, and link purpose part of the base page structure.

## Deliberately deferred decisions

These decisions belong in the implementation plan because they depend on validated content volume and interaction design:

- the search engine or indexing approach
- exact filter controls and sorting options
- the visual treatment of relationship maps
- whether learning paths display progress without requiring user accounts

Deferral means these features are excluded from the first scaffold, not forgotten requirements.
