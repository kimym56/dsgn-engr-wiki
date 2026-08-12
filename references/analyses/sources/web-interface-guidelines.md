---
reference_id: "web-interface-guidelines"
title: "Web Interface Guidelines"
canonical_url: "https://interfaces.rauno.me/"
analyzed: "2026-08-12"
status: "draft"
---

# Source analysis: Web Interface Guidelines

## Editorial evaluation

### Scope fit

This living checklist connects small interface details to implementation choices across forms, typography, motion, touch, performance, accessibility, and product feedback. It is directly relevant to design engineering because it makes otherwise tacit craft decisions reviewable. The list is deliberately non-exhaustive and mixes broadly established practices with authorial preferences, so individual bullets should be evaluated in context rather than adopted as policy.

### Authority and durability

The document is hosted on Rauno's interface site and links to an editable public repository, but the page exposes no publication date, version, or changelog. It explicitly says that it is periodically updated and does not duplicate WAI-ARIA. Footnotes add rationale and link to supporting material, yet many bullets remain uncited. Browser and platform-specific advice can age quickly.

### Overlap and classification

Proposed format: `documentation`. Proposed Areas: `interaction-design`, `frontend-quality`, `accessibility`, and `motion`. Proposed Collections: none. Source language: `en`. It overlaps with the concrete component behavior documented by `pasito`, `vaul`, and `family-wallet`, but has broader checklist coverage and less case-specific evidence.

### Editorial recommendation

`review`. Keep it as a high-value review prompt, with an editorial note that each recommendation needs current browser, accessibility, and product-context verification.

## Website design analysis

### Information hierarchy and navigation

An introduction establishes scope, followed by seven named topical sections and a final `Footnotes` section. Heading anchors support deep linking, while the absence of a prominent global navigation keeps attention on the checklist. Lists make individual rules easy to scan but do not indicate priority or evidence strength.

### UI, interaction, and motion

The page itself is primarily a reading surface. Its content recommends immediate toggle effects, localized feedback, short interaction durations, reduced novelty for frequent actions, off-screen animation pausing, and capability-aware behavior. Those are source claims; the page's own interactive and motion behavior could not be exercised without a browser runtime.

### Grid, layout, and responsive behavior

Delivered markup places the material in one `main` region framed by decorative horizontal and vertical guide lines. The fixed line offsets imply a constrained reading measure, and a responsive viewport is declared. Actual narrow-screen reflow was not visually inspected.

### Typography, color, and visual rhythm

The composition relies on a large split title, section headings, dense bullet lists, inline code, and footnote markers. Decorative guide lines are marked `aria-hidden`, separating visual structure from content semantics. Exact typefaces, colors, and contrast were not visually verified.

### Accessibility observations

Strengths visible in the delivered markup include one main region, hierarchical headings and lists, accessible footnote relationships, labeled back-links, and decorative lines removed from the accessibility tree. The document also acknowledges WAI-ARIA rather than claiming to replace it. Some recommendations are context-sensitive—for example, disabled controls and nonstandard pointer timing—and keyboard behavior, focus visibility, contrast, and screen-reader output were not runtime-tested.

### Transferable principles

- Turn interface craft into concrete, reviewable checks.
- Connect a recommendation to its rationale and affected input mode.
- Adapt behavior to touch, hover capability, device resources, and motion needs.
- Prefer feedback near the action that produced it.
- Mark subjective or time-sensitive guidance instead of presenting every rule as universal.

### Source-specific expression to avoid copying

Do not copy the checklist wording, exact section composition, decorative grid, split title treatment, repository content, or code examples. Any adopted rule needs independent validation.

## Resource discovery

- Qualifying sections: `Footnotes`.
- Candidate IDs: `disable-transitions-temporarily`, `next-themes`, `media-hover`, `will-change`, `safari-16-4`.
- Next-wave candidates: five depth-2, wave-2 links were recorded from the footnotes only; their destinations were not opened, and all remain provisionally identified with `canonical_verified: false` and `source_language: und` until wave-2 inspection.
- Excluded link classes: WAI-ARIA and repository-edit links in the introduction, inline MDN and repository links in checklist bullets, heading anchors, footnote return links, and other local navigation.

## Evidence and uncertainty

- Direct observations: complete checklist text, section order, footnotes, delivered semantics, and parent-page link destinations were inspected on 2026-08-12.
- Claims requiring human confirmation: author attribution, maintenance cadence, evidence strength of uncited bullets, and whether any recommendation has become obsolete.
- Access limitations: no rendered interaction, keyboard, responsive, color-contrast, motion, or screen-reader test was available.
- Contradictions with existing analyses: none. Pasito's stated reduced-motion behavior provides one component-level example of a principle discussed here.

## Human review

- Reviewer:
- Decision:
- Review date:
- Notes:
