---
reference_id: "emil-course-platform"
title: "How I built my course platform"
canonical_url: "https://emilkowal.ski/ui/how-i-built-my-course-platform"
analyzed: "2026-08-11"
status: "draft"
---

# Source analysis: How I built my course platform

## Editorial evaluation

### Scope fit

A first-person case study connecting learning goals with content modeling, interface structure, embedded exercises, implementation choices, service selection, and feedback workflow.

### Authority and durability

This is a primary first-person account by Emil Kowalski. Durable design reasoning should be separated from time-sensitive framework and vendor details.

### Overlap and classification

The accepted technical-stack ADR already cites this article as the closest case-study analogue; that citation does not itself approve reference publication. Proposed format: `article`. Proposed Areas: `interface-implementation`, `prototyping-and-tooling`, `collaboration-handoff-and-workflow`, and `frontend-quality-and-performance`. Source language: `en`. Collections: none.

### Editorial recommendation

`review`. This is the strongest Batch 1 candidate, with a freshness note for stack and vendor details.

## Website design analysis

### Information hierarchy and navigation

The article progresses through motivation, design evolution, stack, subsystems such as authentication, MDX, components, media, pricing, feedback, resources, code playground, and promotion, followed by future work.

### UI, interaction, and motion

The author describes embedded demos and exercises, code editing and preview, a save/format shortcut, a feedback form, and a media player. These behavioral claims were not executed or visually verified.

### Grid, layout, and responsive behavior

The author describes a centered lesson evolving to a wider main region with persistent lesson navigation and a mobile drawer. These layout and responsive claims were not visually verified.

### Typography, color, and visual rhythm

The article describes CSS custom properties used for a color scale; typography, color, and visual rhythm were not visually inspected.

### Accessibility observations

Keyboard, focus, screen-reader, contrast, caption, responsive, performance, and reduced-motion quality remain unverified.

### Transferable principles

- Let content requirements reshape layout.
- Colocate practice and explanation.
- Reduce setup and context switching.
- Combine prose with custom interactions.
- Use semantic variables.
- Use proven primitives and independently verify them.
- Buy commodity operations.
- Collect contextual feedback.
- Model curated resources as editorial data.
- Distinguish durable reasoning from stack details.

### Source-specific expression to avoid copying

Do not copy course identity, logo, palette, fonts, exact layout, copy, demos, code, media, screenshots, cards, or vendor configuration.

## Evidence and uncertainty

- Direct observations: Submitted article content and author-described behavior only.
- Claims requiring human confirmation: Freshness of stack and vendor details; all visual, runtime, accessibility, responsive, performance, and reduced-motion behavior.
- Access limitations: Visual/runtime/accessibility inspection was unavailable.
- Contradictions with existing analyses: The accepted ADR citation is an analogue, not approval for reference publication.

## Human review

- Reviewer:
- Decision:
- Review date:
- Notes:
