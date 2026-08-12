---
reference_id: "on-taste-part-3"
title: "On Taste, Part 3"
canonical_url: "https://medium.com/the-year-of-the-looking-glass/on-taste-part-3-d7d9f069f0b2"
analyzed: "2026-08-12"
status: "draft"
---

# Source analysis: On Taste, Part 3

## Editorial evaluation

### Scope fit

Julie Zhuo's 2013 essay argues that taste is a skill developed through six practices: accepting that quality can be judged, identifying respected practitioners, immersing oneself in their values, critiquing choices, calibrating judgment through discussion, and practicing the craft with candid feedback. It fits design-engineering foundations because it describes a repeatable learning loop that crosses visual, interaction, and implementation work. The essay is experiential advice, not empirical evidence, and its opening premise about a general scale of quality deserves critical framing.

### Authority and durability

The complete article is attributed to Julie Zhuo, dated May 23, 2013, and published in The Year of the Looking Glass on Medium. The author's practitioner perspective and explicit sequence make the advice legible, while examples and rhetorical humor are personal rather than systematic support. The core observation–critique–practice loop has aged well. Medium's direct CLI route returned a Cloudflare block, but the direct web reader exposed the full article without requiring a snippet or secondary source.

### Overlap and classification

Proposed format: `article`. Proposed Areas: `design-engineering-foundations`, `critique`, and `product-craft`. Source language: `en`. It substantially overlaps with `developing-taste`, which cites and compresses several of its ideas. This article is the more complete primary expression; `taste-is-eating-silicon-valley` contributes a later market rationale rather than the same training sequence.

### Editorial recommendation

`review`. Retain as durable practitioner guidance, with clear attribution and a note that the six steps are a personal framework rather than an objective measurement system.

## Website design analysis

### Information hierarchy and navigation

Medium presents publication and author context, a table of contents matching the six numbered sections, title, subtitle, byline, date, reading time, body, series links, and publisher/author/footer chrome. The numbered structure makes the essay easy to scan, but platform actions and promotional navigation compete with the article.

### UI, interaction, and motion

The page exposes sign-in, search, listen, share, author, publication, and in-page section links. No runtime browser was available, so sticky behavior, audio controls, menus, focus states, motion, and reduced-motion behavior were not inspected.

### Grid, layout, and responsive behavior

The extracted page is organized as a single long-form column with a compact in-page outline before the article. Rendered column width, image behavior, breakpoint reflow, and mobile chrome were not visually verified.

### Typography, color, and visual rhythm

Numbered subheads establish the article's rhythm, with moderate-length paragraphs beneath each step and a short conclusion. Publisher and platform metadata surround the essay. Exact fonts, hierarchy sizes, color, and contrast were not visually inspected.

### Accessibility observations

The text extraction preserves headings and meaningful link text for the six-section outline. The platform also exposes search, sign-in, and listen controls in the document. Keyboard order, focus treatment, heading semantics in rendered DOM, image alternatives, audio accessibility, contrast, and motion support were not tested.

### Transferable principles

- Treat judgment as a skill strengthened by deliberate practice.
- Analyze creators' decisions instead of stopping at preference labels.
- Calibrate private judgment through specific discussion with others.
- Practice the underlying craft to understand constraints and failure.
- Seek candid feedback while the work can still change.

### Source-specific expression to avoid copying

Do not copy the six-step wording, jokes, Ratatouille framing, examples, Medium publication chrome, author identity, or article composition.

## Resource discovery

- Qualifying sections: none. No explicit Resources, References, Further reading, Recommended, footnotes, or clearly equivalent curated section was present.
- Candidate IDs: none.
- Next-wave candidates: none.
- Excluded link classes: inline references and examples, Part 1/Part 2 series navigation, in-page table-of-contents links, author/publication profiles, social links, listen/share actions, apps, and Medium footer or utility navigation.

## Evidence and uncertainty

- Direct observations: the complete article body, author, date, section outline, conclusion, series navigation, and all displayed page links were inspected through the direct web reader on 2026-08-12.
- Claims requiring human confirmation: whether the general-scale premise needs counterpoint and whether the overlap with `developing-taste` warrants publishing both.
- Access limitations: direct CLI retrieval was blocked by Cloudflare; the web reader showed the complete article, but rendered visual, responsive, keyboard, audio, motion, contrast, and screen-reader behavior was not inspected.
- Contradictions with existing analyses: none. `developing-taste` is a later, shorter synthesis that explicitly cites this article.

## Human review

- Reviewer:
- Decision:
- Review date:
- Notes:
