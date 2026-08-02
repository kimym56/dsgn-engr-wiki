# Content strategy

## Purpose

The content system should help a learner move from unfamiliar vocabulary to connected understanding and then to practical ability.

The editorial sequence is:

```text
Term → Knowledge → Skill
```

This is a learning relationship, not a requirement that every entry has all three links.

## Content types

### Term entry

A term entry includes:

- a one-sentence definition
- a plain-language explanation
- where the term appears in product work
- common confusion or misuse
- related knowledge and skills
- sources when the definition depends on a standard or external authority

### Knowledge entry

A knowledge entry includes:

- the question or concept being explained
- why it matters to design engineering
- a structured explanation
- trade-offs, limits, or competing approaches
- examples or diagrams when they improve understanding
- related terms and skills
- sources and further reading

### Skill entry

A skill entry includes:

- the outcome a learner should achieve
- prerequisites
- tools or environment assumptions
- guided steps
- checkpoints or acceptance criteria
- common failure modes
- related terms and knowledge
- sources when the procedure depends on an external specification or tool

## Shared metadata model

Every entry should carry the following fields when the content system is implemented:

| Field | Purpose |
| --- | --- |
| `title` | Human-readable entry name |
| `slug` | Stable URL identifier |
| `type` | `term`, `knowledge`, or `skill` |
| `summary` | Short description used in lists and search |
| `topics` | One or more topic-family identifiers |
| `difficulty` | `foundation`, `intermediate`, or `advanced` when meaningful |
| `prerequisites` | Entries a learner should understand first |
| `related` | Explicitly related entries |
| `sources` | References supporting the entry |
| `status` | `draft`, `review`, or `published` |
| `updated` | Date of the latest substantive review |
| `language` | Source language of the entry |
| `translation_of` | Canonical entry identifier for translations |

Term entries may omit `difficulty` and `prerequisites` when those fields add no value.

## Source policy

Use sources in this order of preference:

1. official standards and specifications
2. official product or framework documentation
3. peer-reviewed research or established reference works
4. first-party engineering and design documentation
5. respected practitioner material, clearly identified as experience or opinion

Do not cite search-result summaries, unattributed reposts, or AI-generated text as evidence. Links should point to the most direct available source.

When sources disagree, describe the disagreement and avoid presenting one interpretation as settled fact. Time-sensitive entries should record the last substantive review date.

## Editorial voice

- Write for an intelligent learner who may know only one side of design engineering.
- Define specialist language before relying on it.
- Prefer concrete examples over abstract claims.
- Explain trade-offs instead of prescribing one universal method.
- Avoid promotional language and unsupported statements such as “best” or “industry standard.”
- Use consistent English terminology so Korean translations have a stable source.

## English and Korean workflow

English is the canonical source language for the initial release.

Korean translation begins after an English entry reaches `published` status. Each translation:

- references the canonical English entry through `translation_of`
- preserves code, API names, and established English terms where translation would create ambiguity
- may add a short Korean explanation for an English term, but may not change the underlying claim
- returns to review when the canonical English entry changes substantively

Translation freshness must be visible to editors even if the first public release exposes only English content.

## Editorial workflow

1. **Propose** — confirm the entry fills a real gap and does not duplicate an existing entry.
2. **Outline** — select the content type, learning goal, related entries, and likely sources.
3. **Draft** — write from the matching template.
4. **Verify** — check claims against direct sources and test procedural instructions.
5. **Review** — assess clarity, technical accuracy, accessibility, metadata, and links.
6. **Publish** — change the status only after required checks pass.
7. **Maintain** — revisit entries when sources, standards, or linked content change.

## Content quality checklist

An entry is publishable when:

- its title and summary accurately describe the content
- its type and topics are correct
- the explanation matches the intended audience
- examples and instructions have been checked
- claims have direct, relevant sources
- related links are meaningful and reciprocal where appropriate
- headings and link text remain understandable out of context
- no untranslated or temporary editorial notes remain
- the entry has an owner for final review, even if drafting involved AI assistance
