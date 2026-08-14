<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Documentation translations

- When creating or substantively updating a canonical English document under `docs/`, create or update its Korean review translation at `docs/ko/<same-relative-path>` in the same task.
- Delegate the translation to a `gpt-5.6-sol` subagent with `reasoning_effort: low`. Do not silently substitute a different model or reasoning effort; if that configuration is unavailable, report the blocker instead of producing an unrequested fallback translation.
- Keep the English document canonical. Add a prominent note near the beginning of the Korean file that links to the English original with a verified relative path and states that the English version is authoritative.
- Preserve headings, lists, tables, code blocks, file paths, URLs, identifiers, field names, enum values, and established technical terms. Translate prose faithfully without adding, removing, or changing requirements.
- The main agent must independently verify the Korean file's backlink, structural parity, technical tokens, and formatting before committing it with the English document.
- This rule applies to documentation under `docs/`. Reference-analysis translations continue to follow `references/AGENTS.md` and their existing `references/analyses/ko/` workflow.
