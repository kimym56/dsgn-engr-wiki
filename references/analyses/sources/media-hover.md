---
reference_id: "media-hover"
title: "hover CSS media feature"
canonical_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/hover"
analyzed: "2026-08-13"
status: "draft"
---

# Source analysis: hover CSS media feature

## Editorial evaluation

### Scope fit

MDN explains how the `hover` media feature detects whether a user's primary input can conveniently hover. This is foundational for interaction engineering: hover enhancement must not be the only path to information or action, and capability is more reliable than assuming device class.

### Authority and durability

MDN is a maintained secondary reference, and the page links the normative Media Queries specification plus browser compatibility data. The encountered legacy path redirected to MDN's current canonical reference path. Compatibility data and page wording can change; the underlying feature is widely implemented.

### Overlap and classification

Proposed format: `technical reference`. Proposed Areas: `interaction-engineering`, `responsive-design`, `accessibility`. It gives standards context to the hover guidance in `web-interface-guidelines`.

### Editorial recommendation

`publish` after human review. It is concise, authoritative enough for practical use, and should be paired with the stronger product rule that essential behavior cannot depend on hover.

## Website design analysis

### Information hierarchy and navigation

A status banner, definition, in-page contents, syntax, example, specification, compatibility, and related reading create a predictable reference hierarchy.

### UI, interaction, and motion

The page provides search, navigation, compatibility disclosure, code examples, and contribution actions. Runtime behavior was not exercised.

### Grid, layout, and responsive behavior

A documentation column sits within a large MDN navigation system. The article itself stays linear; responsive navigation was not tested.

### Typography, color, and visual rhythm

Code, definition terms, status labeling, and compact sections make the page scannable. Exact contrast and code-token colors were not visually audited.

### Accessibility observations

Headings, code, tables, and descriptive labels provide useful semantics. Browser-compatibility tables, focus states, and small-screen navigation need runtime verification. The content itself encourages capability-sensitive interaction.

### Transferable principles

- Gate hover-only embellishment by actual hover capability.
- Keep essential content and actions available without hover.
- Pair a concise definition with a runnable example.
- Put specification and compatibility evidence next to implementation guidance.

### Source-specific expression to avoid copying

Do not copy MDN prose, code examples, compatibility tables, navigation, or branding.

## Resource discovery

- Qualifying sections: `Specifications` and `See also`.
- Recorded wave-3 Candidates: `css-media-queries-level-4-hover`, `using-media-queries`, and `media-at-rule`.
- Only link labels and URLs on this parent page were captured; no destination was opened.
- Global MDN navigation, footer, contributor links, and incidental inline links were excluded.

## Evidence and uncertainty

- Directly observed on 2026-08-13: redirect, canonical title/path, definition, syntax, example, specification entry, compatibility section, related links, and modification date.
- Browser support remains a live dataset and should be rechecked when implementing.
- Exact rendered accessibility and interactive behavior were not tested.

## Human review

- Reviewer:
- Decision:
- Review date:
- Notes:
