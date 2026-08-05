# Product brief

## Product

**DSGN ENGR Wiki** is a curated reference library for design engineering. It collects useful resources published across the web, adds concise editorial context, and organizes them so designers and developers can discover relevant material in one place.

It is not a search engine, a mirror of third-party content, or a complete design-engineering course. The product helps people decide what is worth opening and then sends them to the original publisher.

## Primary audience

The first version serves:

- product and interaction designers developing implementation literacy
- frontend developers strengthening their visual, interaction, and design-system judgment
- design engineers looking for reliable references across both disciplines

Experienced practitioners may also use the library, but specialist research workflows do not drive the first release.

## User problem

Useful design-engineering material is fragmented across standards, product documentation, articles, videos, conference talks, tools, repositories, and individual practitioners’ sites. General web search often removes editorial context, mixes introductory and advanced material, and makes it difficult to judge whether a resource is relevant before opening it.

## Product promise

A visitor should be able to:

1. browse a reviewed set of design-engineering references in one place
2. understand why a resource may be useful before opening it
3. narrow resources by area and format
4. discover purposeful editorial collections
5. identify the original publisher and follow the canonical source
6. see when the project last reviewed a resource

## Core content model

### References

A reference is a project-owned metadata record pointing to an external resource. It includes a title, canonical URL, publisher, concise summary, resource format, relevant areas, review status, and dates. Optional fields may include author, original publication date, collection relationships, and an approved preview image.

The reference record does not reproduce the external resource’s substantive content.

### Areas

Areas are stable subject classifications used to browse the library. A reference may belong to more than one area.

Initial areas are:

- design-engineering foundations
- interface implementation
- interaction and motion
- design systems and tokens
- prototyping and tooling
- accessibility and inclusive design
- collaboration, handoff, and workflow
- frontend quality and performance as they affect user experience

### Collections

Collections are smaller editorial selections organized around a purpose, question, or learning outcome. Unlike areas, collections are intentionally curated and may change as stronger references are found.

Examples might include “Starting Design Engineering,” “Essential Accessibility References,” or “Understanding Interface Motion.”

## Product principles

1. **Curate instead of copying.** Add useful context and link to the original publisher rather than reproducing third-party work.
2. **Quality over volume.** A smaller reviewed library is more valuable than a large unexamined link directory.
3. **Explain the selection.** Every published reference should make clear why it belongs in the library.
4. **Preserve source identity.** Show the publisher, canonical destination, and relevant attribution clearly.
5. **Keep discovery understandable.** Areas and collections should help visitors browse without requiring search.
6. **Design for accessibility from the start.** Accessibility applies to the product interface as well as the resources being curated.
7. **Make freshness visible.** Record review dates and maintain a clear process for redirects, unavailable sources, and stale metadata.
8. **Prepare for translation without weakening the English source.** English project-owned metadata remains canonical; Korean translations preserve meaning and link to the same external resource.

## Non-goals for the first public version

- hosting or mirroring complete third-party articles, videos, or courses
- automatically publishing scraped or AI-generated resource records without editorial review
- community accounts, comments, reactions, or open editing
- personalized recommendations or saved progress
- a headless CMS or database
- exhaustive coverage of every design or frontend resource
- original long-form courses or a live coding environment
- native mobile applications

## Success criteria for the first public version

The first public version is ready when:

- every published reference follows the approved metadata schema
- every reference has a working canonical destination, clear publisher attribution, and a project-owned summary
- visitors can browse all references and narrow them by area and format
- Areas and Collections provide useful discovery paths without duplicating source content
- missing preview images degrade to an accessible neutral fallback
- core pages work with keyboard navigation and assistive technology
- the site remains understandable on mobile and desktop
- content validation, automated tests, and the production build pass consistently
- the repository explains how to propose, review, translate, maintain, archive, and publish references

Numeric traffic or library-size targets should be set only after the first implementation plan defines a realistic launch collection.
