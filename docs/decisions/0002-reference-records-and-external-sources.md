# 0002 — Reference records and external-source handling

- Status: **Accepted**
- Date: 2026-08-05
- Accepted: 2026-08-05
- Decision owners: Project maintainers

## Context

DSGN ENGR Wiki primarily curates useful design-engineering resources published elsewhere on the web. The product needs enough project-owned context to help visitors judge and discover a resource without copying or depending on the source’s full content.

External pages can change, redirect, disappear, omit useful metadata, or provide unsuitable preview images. Fetching them during page requests or production builds would make the site’s availability depend on unrelated publishers. A durable policy is therefore needed for resource data, attribution, previews, and link maintenance.

## Decision

### Resource records

Store every curated resource as a schema-validated local record. The implementation plan will select the concrete file format, but the schema must support:

- a stable project-owned identifier
- title and canonical external URL
- publisher and, when useful, author
- project-owned summary or explanation of why the resource matters
- resource format and one or more design-engineering areas
- optional collection relationships
- source language
- status, date added, and last substantive review date
- optional original publication date
- optional preview-image record with provenance and alternative text

The project-owned record is the source used to render the site. Reference pages link visitors to the original publisher; they do not mirror the source’s article, video, or other substantive body content.

### Authoring and validation

Editors capture and approve metadata when adding or reviewing a resource. Builds validate required fields, identifiers, URLs, areas, collection relationships, locale relationships, and preview-image records from local data.

Do not scrape source pages during public page requests. Do not require live source or Open Graph requests for a production build to succeed. An optional authoring tool may suggest metadata later, but an editor must review the stored result before publication.

### Link health

Check external links through a separate manual or scheduled maintenance process. A check should report redirects, persistent failures, and review dates with actionable output. A transient external failure must not invalidate an otherwise valid local record or block static rendering.

Editors decide whether to update, archive, replace, or temporarily retain a failing resource. The public experience should preserve project-owned context and provide a useful fallback when an external destination is unavailable.

### Preview images

Use a project-owned neutral fallback when a reference has no approved preview image.

Do not hotlink arbitrary Open Graph images by default. A source-provided image may be used only after editorial review confirms that its provenance, use, dimensions, and reliability are appropriate. When a suitable image can be stored locally with appropriate permission, prefer the reviewed local asset. Preview failures must not hide the title, publisher, summary, or destination link.

## Alternatives considered

### One Markdown or MDX document per reference

This would make every reference easy to annotate with long-form content, but most references are structured metadata plus a concise editorial note. Requiring a document per resource adds authoring and compilation complexity without improving the initial browsing experience. Markdown or MDX remains available for editorial pages and collection introductions.

### Runtime metadata and Open Graph scraping

Live scraping could keep some metadata current automatically, but it would add latency, inconsistent results, security controls, rate limits, and a runtime dependency on source sites. It also cannot replace editorial judgment about titles, summaries, or previews.

### Automatic remote-image hotlinking

Rendering any discovered Open Graph image would reduce manual work, but arbitrary images may change, disappear, track visitors, have unsuitable dimensions, or lack appropriate provenance. A reviewed image or neutral fallback is more reliable.

### Database or CMS records

A database or CMS could support browser-based editing and automatic ingestion. The initial project does not need accounts, real-time updates, or complex queries, so the operational and migration cost is not justified before the curation workflow is proven.

## Consequences

- The site can render deterministically from version-controlled data without contacting source websites.
- Editors own summaries, classifications, attribution, and review dates.
- Metadata and links can become stale, so link health and substantive review are ongoing maintenance responsibilities.
- Adding a resource requires more editorial work than accepting scraped metadata automatically.
- Browse and search indexes can be generated locally from the same validated records.
- Preview design must work well with a neutral fallback and cannot assume every resource has artwork.
- Future ingestion automation must remain an authoring aid rather than an unreviewed publishing pipeline.

## Validation

Before accepting this decision, the first implementation plan or technical spike should demonstrate that the system can:

1. validate and render a complete sample resource record
2. render useful cards and pages when optional author, publication date, or preview-image data is missing
3. reject malformed URLs, duplicate identifiers, and unknown area or collection references with actionable errors
4. generate browse and search data without fetching external pages
5. report a redirect and an unavailable source through a non-blocking link-health check
6. preserve attribution and a working destination link without reproducing substantive third-party content
7. display a neutral fallback when an external preview is missing or fails

## References

- [How I built my course platform](https://emilkowal.ski/ui/how-i-built-my-course-platform) — the manually curated Vault is the closest case-study analogue
- [Next.js Image component documentation](https://nextjs.org/docs/app/api-reference/components/image)
- [Next.js Markdown and MDX guide](https://nextjs.org/docs/app/guides/mdx)
