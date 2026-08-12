---
reference_id: "developing-taste"
title: "Developing Taste"
canonical_url: "https://emilkowal.ski/ui/developing-taste"
analyzed: "2026-08-12"
status: "draft"
---

# Source analysis: Developing Taste

## Editorial evaluation

### Scope fit

Emil Kowalski presents taste as a trainable capacity rather than private preference. The article condenses improvement into three practices: sustained exposure to strong work, explicit analysis of why it succeeds, and repeated practice with critique. This is useful design-engineering guidance because it joins observation to implementation and feedback, though it is a concise essay rather than a validated training method.

### Authority and durability

The article appears on Emil Kowalski's first-party design-engineering site and reflects practitioner experience. It cites related essays, a talk, an app-analysis example, and Ira Glass's “taste gap,” but no publication or revision date is visible. The core practice loop is durable; the opening claims about software commoditization and AI are more time-bound.

### Overlap and classification

Proposed format: `article`. Proposed Areas: `design-engineering-foundations` and `product-craft`. Source language: `en`. It directly overlaps `taste-is-eating-silicon-valley` in its scarcity-to-abundance premise and `on-taste-part-3` in its practical advice. This source is the shortest and most design-engineering-specific synthesis of the three.

### Editorial recommendation

`review`. Retain as an accessible orientation piece, but attribute its three-step model to the author and pair it with examples or critique practices before treating it as a curriculum.

## Website design analysis

### Information hierarchy and navigation

The article moves from a brief market analogy to a definition of taste and then three plainly named sections. Quotation cards and numbered notes provide supporting voices; previous and next article links close the page. An author header and current course banner frame the article without changing its core sequence.

### UI, interaction, and motion

Heading links allow section jumps, and labeled buttons return readers from notes to their references. A dismissible course banner is present in the delivered markup. Runtime interaction, transition behavior, and reduced-motion support were not inspected.

### Grid, layout, and responsive behavior

The source uses a narrow, single-column article layout with short paragraphs, quotation blocks, and footnotes. The header adapts some controls at a medium breakpoint in delivered class names, but actual responsive reflow was not visually verified.

### Typography, color, and visual rhythm

Large section breaks, concise paragraphs, and isolated quotations create a calm tutorial rhythm. Inline emphasis and numbered notes distinguish claims from supporting material. Exact font, color, and contrast relationships were not visually inspected.

### Accessibility observations

The delivered markup includes labeled close and footnote-return buttons, headings, links, and a responsive viewport. Footnote return controls make the backtracking action explicit. Keyboard order, focus appearance, contrast, screen-reader reading order, and motion preferences remain untested.

### Transferable principles

- Build judgment through exposure, analysis, production, and feedback as a loop.
- Replace “good” or “bad” reactions with reasons tied to observable choices.
- Study practitioners' influences, not only their finished work.
- Expect a gap between judgment and execution while continuing to practice.

### Source-specific expression to avoid copying

Do not copy the car-versus-horse analogy, quotations, three-part wording, course banner, article layout, author branding, or visual treatments.

## Resource discovery

- Qualifying sections: the explicitly numbered footnotes.
- Candidate IDs: `craft-and-beauty-the-business-value-of-form-in-function`, `on-taste-part-3`, `app-dissection`, `the-taste-gap-ira-glass`.
- Next-wave candidates: four depth-2, wave-2 links were recorded without opening them. Three new provisional nodes use `canonical_verified: false`; `on-taste-part-3` was already canonical-verified, so its existing node received one additional discovery edge.
- Excluded link classes: the course promotion, author/home link, inline quotation destinations, heading anchors, and previous/next article navigation.

## Evidence and uncertainty

- Direct observations: complete article text, three-section structure, footnotes, navigation classes, semantics, and parent-page URLs were inspected on 2026-08-12.
- Claims requiring human confirmation: publication date, revision history, and whether the concise model adds enough beyond `on-taste-part-3` to merit separate publication.
- Access limitations: rendered visuals, keyboard behavior, responsive reflow, motion, reduced-motion behavior, and screen-reader output were not tested.
- Contradictions with existing analyses: none. The article simplifies ideas also present in `on-taste-part-3`; the overlap should be disclosed rather than treated as independent corroboration.

## Human review

- Reviewer:
- Decision:
- Review date:
- Notes:
