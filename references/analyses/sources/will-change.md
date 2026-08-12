---
reference_id: "will-change"
title: "will-change CSS property"
canonical_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/will-change"
analyzed: "2026-08-13"
status: "draft"
---

# Source analysis: will-change CSS property

## Editorial evaluation

### Scope fit

MDN documents `will-change` as a rendering hint and repeatedly warns against speculative or broad use. This is highly relevant to animation performance: measure a real problem, scope the hint narrowly, apply it shortly before change, and remove it afterward.

### Authority and durability

MDN is a maintained secondary reference linked to the normative CSS Will Change specification and compatibility data. The encountered legacy URL redirected to MDN's canonical property page. The API is stable, but performance effects remain browser- and workload-dependent.

### Overlap and classification

Proposed format: `technical reference`. Proposed Areas: `motion`, `performance`, `frontend-engineering`. It provides standards-backed caution for animation advice in `web-interface-guidelines`.

### Editorial recommendation

`publish` after human review. Its most valuable contribution is the warning that a performance hint can consume memory and worsen performance when overused.

## Website design analysis

### Information hierarchy and navigation

The page starts with availability and definition, then syntax, detailed warnings, examples, formal definition, specification, compatibility, and related material. Warnings appear before copyable examples, which reduces misuse.

### UI, interaction, and motion

Search, navigation, code examples, compatibility disclosure, and contribution actions are exposed. No live animation or interaction states were exercised.

### Grid, layout, and responsive behavior

The reference uses a linear article within broad MDN site navigation. Table and code overflow at narrow widths were not tested.

### Typography, color, and visual rhythm

Warning blocks, code, definition tables, and concise headings establish strong technical rhythm. Exact visual contrast was not audited.

### Accessibility observations

Semantic sections, warnings, code, and tables support structured reading. Focus, compatibility-table navigation, and mobile behavior remain unverified. Performance changes should also be tested on low-resource devices, not inferred from desktop behavior.

### Transferable principles

- Optimize only after observing a performance problem.
- Apply rendering hints narrowly and temporarily.
- Test memory, compositing, and stacking-context side effects.
- Put misuse warnings before examples.
- Remove optimization state when the change is complete.

### Source-specific expression to avoid copying

Do not copy MDN prose, examples, tables, site navigation, or branding.

## Resource discovery

- Qualifying sections: `Specifications` and `See also`.
- Recorded wave-3 Candidates: `css-will-change-module-level-1`, `transform-css-property`, `translate-css-property`, `scale-css-property`, `rotate-css-property`, `animation-css-property`, and `css-will-change-guide`.
- Only the parent-page links were recorded; no destination was opened.
- Global MDN navigation, footer, contributor utilities, and inline definition links were excluded.

## Evidence and uncertainty

- Directly observed on 2026-08-13: redirect, canonical title/path, warnings, examples, formal syntax, specification, compatibility section, related links, and modification date.
- Actual gains or regressions require profiling in the target interface and browser set.
- Exact rendered accessibility and runtime behavior were not tested.

## Human review

- Reviewer:
- Decision:
- Review date:
- Notes:
