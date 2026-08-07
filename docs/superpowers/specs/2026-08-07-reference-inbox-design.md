# Reference inbox design

## Purpose

Create one low-friction Markdown inbox where a maintainer can paste raw web URLs and an AI can process them consistently without guessing the editorial or design workflow.

The inbox begins the reference workflow. It does not replace the detailed reference record, editorial review, or later schema validation.

## Goals

- Require only one absolute `http` or `https` URL per line from the maintainer.
- Make the AI processing contract explicit and local to the inbox.
- Preserve submitted URLs and their order unless the maintainer asks for edits.
- Direct AI-generated metadata into the existing reference-record structure.
- Keep editorial evaluation separate from source-site design analysis.
- Require human approval before publication or product design changes.

## Non-goals

- Automatically scrape or publish references.
- Define the final Phase 2 storage format or validation schema.
- Track processing state inside the submitted URL list.
- Copy third-party branding, assets, source code, text, or distinctive visual identity.
- Make production builds depend on external websites.

## File and input contract

Add `references/inbox.md` with two primary sections:

1. `AI processing contract` describes how an AI must interpret and process the file.
2. `Paste URLs here` is the maintainer-owned input area.

The input area accepts plain URLs, one per non-empty line. Blank lines are allowed. Markdown bullets, YAML fields, titles, statuses, and notes are not required. A URL remains an unreviewed candidate until the editorial workflow approves its reference record.

The AI must preserve the submitted text and ordering. It may identify duplicate or non-canonical destinations in its output, but it must not silently rewrite or remove the inbox entries.

## AI processing contract

When asked to process the inbox, the AI must:

1. Read every absolute URL under `Paste URLs here` in order.
2. Ignore blank lines and instructional text outside that section.
3. Treat duplicate submissions as one candidate while reporting every duplicate occurrence.
4. Open the complete source when access permits; never evaluate a source from only a search snippet or social preview.
5. Identify the canonical destination, publisher, author when useful, format, source language, and relevant dates without changing the submitted URL.
6. Evaluate whether the source fits the project selection criteria before recommending publication.
7. Draft project-owned metadata using [`templates/reference-record.md`](../../../templates/reference-record.md) rather than copying the publisher's summary or substantive content.
8. Report uncertainty, redirects, paywalls, authentication requirements, blocked access, missing attribution, and unavailable sources instead of guessing.
9. Leave every draft at `status: draft` until a person completes editorial review.
10. Never modify the inbox unless the maintainer explicitly requests cleanup.

## Two separate evaluations

Each processed source produces two conceptually separate evaluations.

### Editorial reference evaluation

This evaluation determines whether the resource belongs in DSGN ENGR Wiki. It covers relevance to design engineering, durability, authority, overlap with stronger references, attribution, access conditions, summary accuracy, and classification.

Its structured draft follows `templates/reference-record.md` and the accepted external-source policy. The source remains external; the project stores only reviewed metadata and original editorial context.

### Source-site design analysis

This evaluation studies the source website as design evidence. It may cover:

- information hierarchy and navigation
- UI and interaction patterns
- animation and motion behavior
- grid, spacing, density, and responsive layout
- typography, color roles, and visual rhythm
- accessibility and reduced-motion behavior
- useful patterns, unsuitable patterns, and the reasoning behind both

The analysis must distinguish transferable principles from source-specific expression. Applying any principle to DSGN ENGR Wiki requires a later cross-source comparison and an approved product design. No single source website should determine the product's global visual identity.

## Output boundary

Until Phase 2 defines the record-storage implementation, the AI returns the editorial draft and design analysis in its response. It creates or edits output files only when the maintainer supplies an explicit path or asks for a specific file. It must not invent a storage directory, mark a reference as published, or append generated analysis to the inbox.

## Error handling

- Invalid or unsupported URLs are reported with their original line and a specific reason.
- Redirects are recorded with both the submitted and resolved destinations.
- Duplicate canonical destinations are reported rather than drafted twice.
- Inaccessible sources remain unverified and cannot be recommended for publication based on secondary descriptions alone.
- Conflicting metadata is surfaced for human review.
- A failed external request never blocks the local application build.

## Workflow

1. A maintainer pastes raw URLs into `references/inbox.md`.
2. A maintainer asks an AI to process some or all inbox entries.
3. The AI verifies each complete source and produces a draft editorial record plus a separate design analysis.
4. A person reviews the editorial record and decides whether to revise, reject, or publish it.
5. Design observations accumulate across multiple approved sources.
6. A later design proposal may adapt well-supported principles to the product after explicit approval.

## Acceptance criteria

- A maintainer can add candidates by pasting only raw URLs.
- The file tells an AI exactly which text is input and which rules govern processing.
- Submitted URLs remain unchanged unless cleanup is explicitly requested.
- Duplicate, redirected, invalid, inaccessible, and ambiguous sources have defined outcomes.
- Draft metadata points to the existing detailed template and remains subject to human review.
- Editorial relevance and website-design analysis cannot be mistaken for each other.
- The contract prohibits copying third-party identity or automatically applying patterns to the product.
- The design does not choose or constrain the future Phase 2 record-storage implementation.

## Verification

Review the Markdown for valid links and unambiguous instructions. Test the contract manually with a small fixture containing a valid URL, duplicate URL, redirect, invalid URL, and inaccessible URL. The inbox itself needs no application runtime or new dependency.
