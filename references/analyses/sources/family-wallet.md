---
reference_id: "family-wallet"
title: "Family Wallet"
canonical_url: "https://www.raphaelsalaja.com/work/family-wallet"
analyzed: "2026-08-12"
status: "draft"
---

# Source analysis: Family Wallet

## Editorial evaluation

### Scope fit

Raphael Salaja's May 2025 page presents a recreation of a multi-stage wallet-customization flow and argues for planning state changes before building complex components. It is relevant to design engineering because it frames interaction quality as a state-modeling problem and embeds an interactive example beside that claim. The prose is very brief, and the inaccessible open state prevents this analysis from evaluating the full sequence.

### Authority and durability

The dated page appears in the creator's own work portfolio and is first-party evidence of the demonstration and stated design rationale. It does not identify the original product source, implementation version, research basis, or testing method. Its state-simplicity principle is durable; the recreation itself is best treated as an illustrative example rather than authoritative guidance.

### Overlap and classification

Proposed format: `case-study`. Proposed Areas: `component-engineering`, `interaction-design`, and `state-management`. Proposed Collections: none. Source language: `en`. It overlaps with Pasito and Vaul as an interactive component example, while adding an explicit claim about keeping multi-stage state predictable.

### Editorial recommendation

`review`. Retain as a compact case-study lead only if human review can exercise every stage, inspect keyboard and touch behavior, and confirm that the reconstruction offers enough explanation beyond the demo.

## Website design analysis

### Information hierarchy and navigation

A breadcrumb leads to the title and date, followed by a short framing paragraph, the closed wallet example, one explanatory paragraph, and a donation appeal. The interactive object sits at the center of the article and carries most of the explanatory burden.

### UI, interaction, and motion

The initial state shows a compact wallet card with a name, amount, icon, and options control. The outer interactive `div` is focusable and declares `aria-haspopup="dialog"` and `aria-expanded="false"`; a second options element is also focusable. The multistage dialog, state transitions, motion, dismissal, and reduced-motion behavior could not be exercised.

### Grid, layout, and responsive behavior

The article is a linear reading column, with a centered 200-pixel-wide wallet demo between explanatory paragraphs. The page declares a responsive viewport, but dialog sizing, content reflow, and narrow-screen behavior were not inspected.

### Typography, color, and visual rhythm

The page gives the compact green wallet object strong visual emphasis between restrained prose blocks. Breadcrumbs and date provide quiet context before the demo. Exact typography, contrast, focus appearance, and dialog styling were not visually verified.

### Accessibility observations

Positive initial-state signals include a labeled breadcrumb, `article` and `header` structure, `aria-current` on the breadcrumb, a titled SVG icon, and explicit popup state. A notable semantic risk is that the popup trigger is a focusable `div` rather than a native button and has no visible `role="button"` in delivered markup; keyboard activation therefore needs testing. The name appears in a disabled text input, which may affect how assistive technology announces it. Focus management, Escape handling, inert background behavior, contrast, and motion remain unverified.

### Transferable principles

- Model the complete state sequence before styling a multi-stage component.
- Keep state transitions predictable and minimize independent state variables.
- Place a working example next to the principle it illustrates.
- Prefer native controls, or fully reproduce their keyboard and semantic behavior when custom elements are necessary.

### Source-specific expression to avoid copying

Do not copy the Family Wallet recreation, wallet silhouette, green palette, icon, account data, state sequence, code, or portfolio composition.

## Resource discovery

- Qualifying sections: none. No explicit Resources, References, Further reading, Recommended, footnotes, or clearly equivalent curated section was present.
- Candidate IDs: none.
- Next-wave candidates: none.
- Excluded link classes: breadcrumb navigation, the donation/support link, and page utility or portfolio navigation.

## Evidence and uncertainty

- Direct observations: complete page text, date, initial wallet state, delivered semantics, metadata, and all parent-page links were inspected on 2026-08-12.
- Claims requiring human confirmation: original inspiration and attribution, complete state model, native-key equivalence, dialog semantics, and whether the example is sufficiently substantive for publication.
- Access limitations: the wallet flow could not be opened; later states, dynamic behavior, responsive layout, motion, focus, contrast, and screen-reader output were not tested.
- Contradictions with existing analyses: none.

## Human review

- Reviewer:
- Decision:
- Review date:
- Notes:
