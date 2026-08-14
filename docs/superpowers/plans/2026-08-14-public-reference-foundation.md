# Public Reference Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the nine approved English DENG wave-1 references through a schema-validated, server-rendered `/en/references` index without fetching external content during requests or builds.

**Architecture:** Keep one project-owned JSON record per reference plus small Area and Collection registries. A server-only loader validates all files and relationships, pure helpers select and filter visible records, and React Server Components render query-parameter filters and external-source cards. Record metadata passes a separate human review gate before its status changes from `review` to `published`; link health remains a manual maintenance command.

**Tech Stack:** Next.js 16.3 App Router, React 19 Server Components, TypeScript 6, Node.js file-system APIs, Vitest and Testing Library, Playwright with axe, Prettier, and ESLint. Add no runtime dependency.

## Global Constraints

- Work in an isolated feature worktree created with `superpowers:using-git-worktrees`.
- Follow `superpowers:test-driven-development` for every behavior change: write one focused failing test, run it and confirm the expected failure, add the minimum implementation, then rerun it.
- Use `superpowers:verification-before-completion` before claiming a task, checkpoint, or branch complete.
- Read the relevant bundled Next.js 16 guides under `node_modules/next/dist/docs/` before modifying App Router code.
- Keep `page.tsx`, filters, results, and cards as Server Components. Do not add `"use client"`, browser storage, or a client-side data bundle.
- Do not fetch a source from page rendering, `next build`, the default `npm run check`, or record validation.
- English is the only public metadata locale in this release. Do not publish `/ko` or create Korean reference records.
- Create exactly the nine records approved in the design specification. Do not inspect wave-3 Candidates or promote wave-2 Candidates.
- Keep new records in `review` until the explicit Task 4 maintainer gate. Candidate `publication.decision: publish` does not bypass that gate.
- Preserve source identity and link each card to its canonical HTTPS URL in the current tab. Do not copy source text, artwork, screenshots, or Open Graph images.
- Treat `docs/superpowers/specs/2026-08-14-public-reference-foundation-design.md` as the approved product contract.
- Commit after each task only when its focused tests pass. Do not combine unrelated user changes into these commits.

---

## Task 1: Define and test the reference schema

**Files:**

- Create: `src/content/reference-schema.ts`
- Create: `src/content/reference-schema.test.ts`

### 1.1 Write the failing schema tests

- [ ] Create `src/content/reference-schema.test.ts` with a complete valid fixture:

```ts
import { describe, expect, it } from "vitest";
import {
  parseReferenceCatalog,
  validateReferenceCatalog,
  type ReferenceCatalogInput,
} from "./reference-schema";

const validRecord = {
  id: "developing-taste",
  title: "Developing Taste",
  url: "https://emilkowal.ski/ui/developing-taste",
  publisher: "Emil Kowalski",
  author: "Emil Kowalski",
  summary: "An original project-owned summary.",
  relevance: "An original project-owned relevance note.",
  format: "article",
  areas: ["design-engineering-foundations"],
  collections: [],
  source_language: "en",
  published: null,
  added: "2026-08-14",
  reviewed: "2026-08-14",
  status: "review",
  preview: null,
  language: "en",
  translation_of: null,
};

const validInput: ReferenceCatalogInput = {
  areas: [
    {
      id: "design-engineering-foundations",
      label: "Design Engineering Foundations",
      description: "Core perspectives on design-engineering practice.",
    },
  ],
  collections: [],
  records: [
    {
      path: "content/references/en/developing-taste.json",
      value: validRecord,
    },
  ],
};

describe("parseReferenceCatalog", () => {
  it("accepts a complete English catalog with nullable optional fields", () => {
    expect(parseReferenceCatalog(validInput)).toEqual({
      areas: validInput.areas,
      collections: [],
      records: [validRecord],
    });
  });

  it.each([
    ["id", { id: "Developing Taste" }, "id"],
    ["url", { url: "http://example.com" }, "url"],
    ["source language", { source_language: "english" }, "source_language"],
    ["added date", { added: "2026-02-30" }, "added"],
    ["format", { format: "video" }, "format"],
    ["status", { status: "approved" }, "status"],
    ["empty areas", { areas: [] }, "areas"],
    ["translation", { translation_of: "some-record" }, "translation_of"],
  ])("rejects an invalid %s", (_label, replacement, field) => {
    const input = structuredClone(validInput);
    input.records[0].value = { ...validRecord, ...replacement };

    expect(validateReferenceCatalog(input)).toEqual(
      expect.arrayContaining([
        expect.stringContaining(
          "content/references/en/developing-taste.json." + field,
        ),
      ]),
    );
  });

  it("rejects missing fields and unknown fields", () => {
    const input = structuredClone(validInput);
    const { summary: _summary, ...missingSummary } = validRecord;
    input.records = [
      {
        path: "content/references/en/missing.json",
        value: missingSummary,
      },
      {
        path: "content/references/en/unknown.json",
        value: { ...validRecord, unexpected: true },
      },
    ];

    expect(validateReferenceCatalog(input)).toEqual(
      expect.arrayContaining([
        expect.stringContaining("missing.json.summary"),
        expect.stringContaining("unknown.json.unexpected"),
      ]),
    );
  });

  it("rejects duplicate record ids, urls, and relationships", () => {
    const input = structuredClone(validInput);
    input.records = [
      validInput.records[0],
      {
        path: "content/references/en/duplicate.json",
        value: {
          ...validRecord,
          areas: [
            "design-engineering-foundations",
            "design-engineering-foundations",
          ],
        },
      },
    ];

    const errors = validateReferenceCatalog(input);
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.stringContaining("duplicate record id"),
        expect.stringContaining("duplicate canonical url"),
        expect.stringContaining("duplicate area"),
      ]),
    );
  });

  it("rejects unknown areas and collections", () => {
    const input = structuredClone(validInput);
    input.records[0].value = {
      ...validRecord,
      areas: ["unknown-area"],
      collections: ["unknown-collection"],
    };

    expect(validateReferenceCatalog(input)).toEqual(
      expect.arrayContaining([
        expect.stringContaining("unknown area"),
        expect.stringContaining("unknown collection"),
      ]),
    );
  });

  it("requires complete preview attribution and alternative text", () => {
    const input = structuredClone(validInput);
    input.records[0].value = {
      ...validRecord,
      preview: {
        src: "/previews/developing-taste.webp",
        alt: "",
        source_url: "https://example.com",
        rights: "",
      },
    };

    expect(validateReferenceCatalog(input)).toEqual(
      expect.arrayContaining([
        expect.stringContaining("preview.alt"),
        expect.stringContaining("preview.rights"),
      ]),
    );
  });
});
```

- [ ] Add separate cases for duplicate Area IDs, duplicate Collection IDs, malformed registry IDs, an unknown registry field, a non-`en` metadata language, and an invalid preview `source_url`.

### 1.2 Confirm the tests fail for the missing module

- [ ] Run:

```bash
npx vitest run src/content/reference-schema.test.ts
```

- [ ] Confirm the failure is an unresolved `./reference-schema` import. Do not continue if the test passes or fails for an unrelated setup error.

### 1.3 Implement the typed validator

- [ ] Create `src/content/reference-schema.ts` with these exported contracts:

```ts
export const REFERENCE_FORMATS = [
  "article",
  "documentation",
  "tool",
  "case-study",
] as const;

export const REFERENCE_STATUSES = [
  "draft",
  "review",
  "published",
  "archived",
] as const;

export type ReferenceFormat = (typeof REFERENCE_FORMATS)[number];
export type ReferenceStatus = (typeof REFERENCE_STATUSES)[number];

export interface ReferencePreview {
  src: string;
  alt: string;
  source_url: string;
  rights: string;
}

export interface ReferenceRecord {
  id: string;
  title: string;
  url: string;
  publisher: string;
  author: string | null;
  summary: string;
  relevance: string;
  format: ReferenceFormat;
  areas: string[];
  collections: string[];
  source_language: string;
  published: string | null;
  added: string;
  reviewed: string;
  status: ReferenceStatus;
  preview: ReferencePreview | null;
  language: "en";
  translation_of: null;
}

export interface ReferenceArea {
  id: string;
  label: string;
  description: string;
}

export interface ReferenceCollection {
  id: string;
  label: string;
  description: string;
}

export interface ReferenceCatalog {
  areas: ReferenceArea[];
  collections: ReferenceCollection[];
  records: ReferenceRecord[];
}

export interface ReferenceCatalogInput {
  areas: unknown;
  collections: unknown;
  records: Array<{ path: string; value: unknown }>;
}

export function validateReferenceCatalog(
  input: ReferenceCatalogInput,
): string[];

export function parseReferenceCatalog(
  input: ReferenceCatalogInput,
): ReferenceCatalog;
```

- [ ] Implement runtime validation with small local helpers rather than adding a schema library:
  - `isPlainObject` accepts objects whose prototype is `Object.prototype` or `null`.
  - `expectExactKeys` reports every missing and unknown field.
  - `expectNonEmptyString` rejects empty and whitespace-only strings.
  - IDs match `/^[a-z0-9]+(?:-[a-z0-9]+)*$/`.
  - language codes match `/^[a-z]{2}(?:-[A-Z]{2})?$/`.
  - URLs must parse with `new URL` and use `https:`.
  - ISO dates match `YYYY-MM-DD` and round-trip through a UTC `Date` so impossible calendar dates fail.
  - `preview.src` must start with `/`; `preview.source_url` must be HTTPS; `alt` and `rights` must be non-empty.
  - Record, Area, and Collection objects reject unknown keys.
  - Duplicate IDs, URLs, Areas, and Collections are reported after per-object validation.
  - Record relationships are checked against the parsed registry identifiers.
  - English records require `source_language: "en"`, `language: "en"`, and `translation_of: null` for this release.
  - Return all discoverable errors in deterministic file/field order.
  - `parseReferenceCatalog` throws one `Error` whose message begins `Invalid reference catalog:` and contains every validation error on its own line.

### 1.4 Run focused and repository tests

- [ ] Run:

```bash
npx vitest run src/content/reference-schema.test.ts
npm run typecheck
```

- [ ] Confirm both commands pass.

### 1.5 Commit Task 1

- [ ] Commit only the schema and its tests:

```bash
git add src/content/reference-schema.ts src/content/reference-schema.test.ts
git commit -m "feat: define validated reference schema"
```

---

## Task 2: Load local content and author the nine review records

**Files:**

- Create: `src/content/reference-store.ts`
- Create: `src/content/reference-store.test.ts`
- Create: `src/content/reference-content.test.ts`
- Create: `content/areas/en.json`
- Create: `content/collections/en.json`
- Create: `content/references/en/taste-is-eating-silicon-valley.json`
- Create: `content/references/en/web-interface-guidelines.json`
- Create: `content/references/en/developing-taste.json`
- Create: `content/references/en/pasito.json`
- Create: `content/references/en/vaul.json`
- Create: `content/references/en/family-wallet.json`
- Create: `content/references/en/on-taste-part-3.json`
- Create: `content/references/en/manage-design-projects.json`
- Create: `content/references/en/ux-engineer-a-terminal-career.json`
- Modify: `references/index.md`
- Modify: `references/log.md`
- Modify: `package.json`

### 2.1 Write failing loader tests

- [ ] Test a temporary content root in `src/content/reference-store.test.ts`. The tests must create fixture directories with `fs.mkdtemp`, write JSON with `fs.writeFile`, and clean up that exact temporary directory in `afterEach`.
- [ ] Cover these behaviors:
  - reads `areas/en.json`, `collections/en.json`, and every `references/en/*.json` file
  - passes all file values through `parseReferenceCatalog`
  - reports the offending relative file path for malformed JSON
  - reports the offending relative file path and field for invalid content
  - sorts records by `added` descending, then `title` with `localeCompare("en")`
  - returns only `published` records publicly
  - includes `review` records only when the caller explicitly passes `includeReview: true`
  - always excludes `draft` and `archived` records

- [ ] Use this public interface in the tests:

```ts
import {
  loadReferenceCatalog,
  selectVisibleReferences,
} from "./reference-store";

const catalog = await loadReferenceCatalog(fixtureRoot);
expect(catalog.records.map(({ id }) => id)).toEqual([
  "newer-title",
  "older-title",
]);

expect(selectVisibleReferences(catalog.records)).toEqual([
  expect.objectContaining({ status: "published" }),
]);

expect(
  selectVisibleReferences(catalog.records, { includeReview: true }),
).toEqual([
  expect.objectContaining({ status: "published" }),
  expect.objectContaining({ status: "review" }),
]);
```

### 2.2 Confirm the loader tests fail

- [ ] Run:

```bash
npx vitest run src/content/reference-store.test.ts
```

- [ ] Confirm the unresolved `./reference-store` import is the expected failure.

### 2.3 Implement the filesystem loader

- [ ] Create `src/content/reference-store.ts` with:

```ts
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import {
  parseReferenceCatalog,
  type ReferenceCatalog,
  type ReferenceRecord,
} from "./reference-schema";

const DEFAULT_CONTENT_ROOT = path.join(process.cwd(), "content");

export async function loadReferenceCatalog(
  contentRoot = DEFAULT_CONTENT_ROOT,
): Promise<ReferenceCatalog>;

export function selectVisibleReferences(
  records: ReferenceRecord[],
  options?: { includeReview?: boolean },
): ReferenceRecord[];
```

- [ ] Read the two registries once, list only filenames ending in `.json` under `references/en`, sort filenames before reading, parse JSON with path-aware errors, call `parseReferenceCatalog` once, then apply the approved deterministic record sort.
- [ ] Keep this module free of `fetch`, React APIs, request state, and mutation.

### 2.4 Author the Area and Collection registries

- [ ] Create `content/areas/en.json` with exactly:

```json
[
  {
    "id": "design-engineering-foundations",
    "label": "Design Engineering Foundations",
    "description": "Core perspectives on the role, judgment, and practice of connecting design intent with implementation."
  },
  {
    "id": "interface-implementation",
    "label": "Interface Implementation",
    "description": "Component structure, state, responsive behavior, and frontend techniques that turn interface decisions into working software."
  },
  {
    "id": "interaction-and-motion",
    "label": "Interaction and Motion",
    "description": "Feedback, transitions, gestures, and temporal behavior that make interfaces understandable and responsive."
  },
  {
    "id": "design-systems-and-tokens",
    "label": "Design Systems and Tokens",
    "description": "Reusable foundations, component systems, tokens, and governance that align design and engineering."
  },
  {
    "id": "prototyping-and-tooling",
    "label": "Prototyping and Tooling",
    "description": "Tools and prototyping practices that help teams explore, communicate, and test interface ideas."
  },
  {
    "id": "accessibility-and-inclusive-design",
    "label": "Accessibility and Inclusive Design",
    "description": "Practices that make interfaces usable across abilities, input methods, preferences, and environments."
  },
  {
    "id": "collaboration-handoff-and-workflow",
    "label": "Collaboration, Handoff, and Workflow",
    "description": "Shared processes and artifacts that keep design and engineering aligned throughout delivery."
  },
  {
    "id": "frontend-quality-and-performance",
    "label": "Frontend Quality and Performance",
    "description": "Reliability, performance, and implementation quality as they affect the user experience."
  }
]
```

- [ ] Create `content/collections/en.json` as:

```json
[]
```

### 2.5 Author the nine records in review

- [ ] Create one file per record using the following approved draft metadata. Keep every `status` at `review` and every `preview` at `null`.

```json
{
  "id": "taste-is-eating-silicon-valley",
  "title": "Taste Is Eating Silicon Valley.",
  "url": "https://www.workingtheorys.com/p/taste-is-eating-silicon-valley",
  "publisher": "Working Theorys",
  "author": "Anu",
  "summary": "Anu argues that as software production becomes less scarce, product design, brand, experience, and cultural awareness become stronger differentiators.",
  "relevance": "A perspective on why implementation quality alone does not define a compelling product and why design engineers need coherent product judgment.",
  "format": "article",
  "areas": ["design-engineering-foundations"],
  "collections": [],
  "source_language": "en",
  "published": "2024-09-19",
  "added": "2026-08-14",
  "reviewed": "2026-08-14",
  "status": "review",
  "preview": null,
  "language": "en",
  "translation_of": null
}
```

```json
{
  "id": "web-interface-guidelines",
  "title": "Web Interface Guidelines",
  "url": "https://interfaces.rauno.me/",
  "publisher": "Web Interface Guidelines",
  "author": null,
  "summary": "A living checklist of interface details spanning forms, typography, motion, touch, performance, accessibility, and feedback.",
  "relevance": "Makes tacit frontend craft decisions reviewable while reminding teams to test each guideline against current browser and product context.",
  "format": "documentation",
  "areas": [
    "interface-implementation",
    "interaction-and-motion",
    "accessibility-and-inclusive-design",
    "frontend-quality-and-performance"
  ],
  "collections": [],
  "source_language": "en",
  "published": null,
  "added": "2026-08-14",
  "reviewed": "2026-08-14",
  "status": "review",
  "preview": null,
  "language": "en",
  "translation_of": null
}
```

```json
{
  "id": "developing-taste",
  "title": "Developing Taste",
  "url": "https://emilkowal.ski/ui/developing-taste",
  "publisher": "Emil Kowalski",
  "author": "Emil Kowalski",
  "summary": "Emil Kowalski presents taste as trainable through sustained exposure, explicit analysis, repeated practice, and critique.",
  "relevance": "Connects observation with implementation and feedback, offering an accessible starting loop for developing design-engineering judgment.",
  "format": "article",
  "areas": ["design-engineering-foundations"],
  "collections": [],
  "source_language": "en",
  "published": null,
  "added": "2026-08-14",
  "reviewed": "2026-08-14",
  "status": "review",
  "preview": null,
  "language": "en",
  "translation_of": null
}
```

```json
{
  "id": "pasito",
  "title": "Pasito",
  "url": "https://joshpuckett.me/pasito",
  "publisher": "Josh Puckett",
  "author": "Josh Puckett",
  "summary": "A demonstration and API reference for a React stepper with multiple orientations, autoplay, windowing, theming, and documented accessibility semantics.",
  "relevance": "Shows how a compact interaction primitive can combine live examples, usage code, customization, motion, and accessibility considerations.",
  "format": "tool",
  "areas": [
    "interface-implementation",
    "interaction-and-motion",
    "accessibility-and-inclusive-design"
  ],
  "collections": [],
  "source_language": "en",
  "published": null,
  "added": "2026-08-14",
  "reviewed": "2026-08-14",
  "status": "review",
  "preview": null,
  "language": "en",
  "translation_of": null
}
```

```json
{
  "id": "vaul",
  "title": "Vaul",
  "url": "https://vaul.emilkowal.ski/",
  "publisher": "Vaul",
  "author": null,
  "summary": "A focused landing page and demonstration for a React drawer component, with direct paths to its documentation and source.",
  "relevance": "Provides a concise example of presenting a spatial, gesture-oriented interaction while keeping implementation resources close to the demo.",
  "format": "tool",
  "areas": [
    "interface-implementation",
    "interaction-and-motion",
    "accessibility-and-inclusive-design"
  ],
  "collections": [],
  "source_language": "en",
  "published": null,
  "added": "2026-08-14",
  "reviewed": "2026-08-14",
  "status": "review",
  "preview": null,
  "language": "en",
  "translation_of": null
}
```

```json
{
  "id": "family-wallet",
  "title": "Family Wallet",
  "url": "https://www.raphaelsalaja.com/work/family-wallet",
  "publisher": "Raphael Salaja",
  "author": "Raphael Salaja",
  "summary": "A compact recreation of a multi-stage wallet-customization flow that frames component complexity as a state-modeling problem.",
  "relevance": "Offers an applied prompt for planning predictable state transitions before building a visually rich interactive component.",
  "format": "case-study",
  "areas": ["interface-implementation", "interaction-and-motion"],
  "collections": [],
  "source_language": "en",
  "published": null,
  "added": "2026-08-14",
  "reviewed": "2026-08-14",
  "status": "review",
  "preview": null,
  "language": "en",
  "translation_of": null
}
```

```json
{
  "id": "on-taste-part-3",
  "title": "On Taste, Part 3",
  "url": "https://medium.com/the-year-of-the-looking-glass/on-taste-part-3-d7d9f069f0b2",
  "publisher": "The Year of the Looking Glass",
  "author": "Julie Zhuo",
  "summary": "Julie Zhuo describes six practices for strengthening taste through observation, critique, discussion, practice, and candid feedback.",
  "relevance": "Provides a durable learning loop that crosses visual design, interaction, and implementation while remaining clearly framed as practitioner advice.",
  "format": "article",
  "areas": ["design-engineering-foundations"],
  "collections": [],
  "source_language": "en",
  "published": "2013-05-23",
  "added": "2026-08-14",
  "reviewed": "2026-08-14",
  "status": "review",
  "preview": null,
  "language": "en",
  "translation_of": null
}
```

```json
{
  "id": "manage-design-projects",
  "title": "Manage design projects",
  "url": "https://linear.app/method/manage-design-projects",
  "publisher": "Linear",
  "author": null,
  "summary": "Linear describes how its team moves design work from problem verification and open exploration into focused feedback, task decomposition, and continuous engineering collaboration.",
  "relevance": "Treats handoff as shared project context rather than a final transfer and offers concrete ways to represent uncertain design work.",
  "format": "article",
  "areas": ["collaboration-handoff-and-workflow"],
  "collections": [],
  "source_language": "en",
  "published": null,
  "added": "2026-08-14",
  "reviewed": "2026-08-14",
  "status": "review",
  "preview": null,
  "language": "en",
  "translation_of": null
}
```

```json
{
  "id": "ux-engineer-a-terminal-career",
  "title": "UX Engineer, a terminal career",
  "url": "https://blog.damato.design/posts/terminal-career/",
  "publisher": "D'Amato Design",
  "author": "Donnie D'Amato",
  "summary": "Donnie D'Amato uses personal career experience to examine why hybrid UX engineering roles can lack suitable management, expectations, interviews, and advancement paths.",
  "relevance": "Expands design-engineering discussion beyond craft into the organizational support and career structures needed to sustain boundary-spanning work.",
  "format": "article",
  "areas": [
    "design-engineering-foundations",
    "design-systems-and-tokens",
    "collaboration-handoff-and-workflow"
  ],
  "collections": [],
  "source_language": "en",
  "published": null,
  "added": "2026-08-14",
  "reviewed": "2026-08-14",
  "status": "review",
  "preview": null,
  "language": "en",
  "translation_of": null
}
```

### 2.6 Add a real-content validation test and command

- [ ] Create `src/content/reference-content.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { loadReferenceCatalog } from "./reference-store";

describe("reference content", () => {
  it("loads the approved English foundation set in review", async () => {
    const catalog = await loadReferenceCatalog();

    expect(catalog.areas).toHaveLength(8);
    expect(catalog.collections).toEqual([]);
    expect(catalog.records).toHaveLength(9);
    expect(new Set(catalog.records.map(({ status }) => status))).toEqual(
      new Set(["review"]),
    );
  });
});
```

- [ ] Change `package.json` scripts to:

```json
{
  "references:graph:check": "node scripts/reference-graph.mjs references/candidates",
  "references:records:check": "vitest run src/content/reference-content.test.ts",
  "references:check": "npm run references:graph:check && npm run references:records:check"
}
```

Keep the existing `check` script unchanged so it still begins with `npm run references:check`.

### 2.7 Record the review-stage workflow state

- [ ] Update `references/index.md` while the records are still in review:
  - Draft records: 0
  - Records in review: 9
  - Published records: 0
  - add all nine rows to the Review table with their primary public Area and record path
  - replace the wave-1 “records have not yet been created” note with a note that the nine review records now await the explicit public-metadata gate
- [ ] Append, never rewrite, an `ingest | DENG wave 1 review records drafted` entry to `references/log.md` with Change, all nine Affected IDs, and the Candidate/design-spec approval that authorized drafting but not publication.

### 2.8 Verify and commit Task 2

- [ ] Run:

```bash
npx vitest run src/content/reference-schema.test.ts src/content/reference-store.test.ts src/content/reference-content.test.ts
npm run references:check
npm run typecheck
```

- [ ] Confirm all commands pass and no source URL was requested.
- [ ] Commit:

```bash
git add package.json src/content content references/index.md references/log.md
git commit -m "feat: add reviewed reference records"
```

---

## Task 3: Build the server-rendered References index

**Files:**

- Create: `src/content/reference-filters.ts`
- Create: `src/content/reference-filters.test.ts`
- Create: `src/components/reference-card.tsx`
- Create: `src/components/reference-index.tsx`
- Create: `src/components/reference-index.test.tsx`
- Modify: `src/app/[lang]/references/page.tsx`
- Modify: `src/app/[lang]/page-shells.test.tsx`
- Modify: `src/app/[lang]/explore/page.tsx`
- Modify: `src/i18n/dictionaries/types.ts`
- Modify: `src/i18n/dictionaries/en.ts`
- Modify: `src/app/globals.css`

### 3.1 Read the bundled Next.js guidance

- [ ] Read these exact bundled guides:
  - `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`
  - `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
  - `node_modules/next/dist/docs/01-app/02-guides/testing/vitest.md`
  - `node_modules/next/dist/docs/01-app/02-guides/testing/playwright.md`
  - `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/page.md`
- [ ] Record in the implementation notes that Next.js 16 supplies `params` and `searchParams` as promises and that reading `searchParams` makes the route request-rendered.

### 3.2 Write failing filter tests

- [ ] Create `src/content/reference-filters.test.ts` with small typed fixtures and tests for:
  - no query returns every visible record
  - valid Area filter
  - valid Format filter
  - valid Area and Format intersection
  - unknown Area or unknown Format discards the complete filter state and returns every visible record
  - valid filters with no matches return an empty array
  - repeated query values use only the first string

- [ ] Use this exact public contract:

```ts
export interface ReferenceFilterState {
  area: string | null;
  format: ReferenceFormat | null;
  hasInvalidValue: boolean;
}

export function parseReferenceFilters(
  searchParams: Record<string, string | string[] | undefined>,
  catalog: Pick<ReferenceCatalog, "areas">,
): ReferenceFilterState;

export function filterReferences(
  records: ReferenceRecord[],
  filters: ReferenceFilterState,
): ReferenceRecord[];
```

- [ ] Run `npx vitest run src/content/reference-filters.test.ts` and confirm the missing-module failure.

### 3.3 Implement the pure filtering helpers

- [ ] In `parseReferenceFilters`, accept only an Area ID present in the registry and one of `REFERENCE_FORMATS`.
- [ ] If either supplied value is unknown, return `{ area: null, format: null, hasInvalidValue: true }`.
- [ ] In `filterReferences`, return the input order unchanged except for filtering; do not sort in the UI layer.
- [ ] Run the focused test and confirm it passes.

### 3.4 Write failing component tests

- [ ] Create `src/components/reference-index.test.tsx`. Render the synchronous `ReferenceIndex` with typed record and registry fixtures and verify:
  - the count uses `aria-live="polite"`
  - a card renders format, title, publisher, optional author, summary, relevance, Area labels, source language, and reviewed date
  - the title and explicit `Visit original source` links both use the canonical URL
  - the links have no `target="_blank"`
  - absent author and published date create no empty labels
  - `preview: null` renders the neutral project treatment
  - filter controls have accessible labels, retain selected valid values, submit by GET, and provide a clear link to `/en/references`
  - review preview renders a visible non-production banner
  - valid zero-result input renders the no-results message and clear action

- [ ] Define the component contract in the test:

```tsx
<ReferenceIndex
  lang="en"
  records={records}
  areas={areas}
  filters={{ area: null, format: null, hasInvalidValue: false }}
  isReviewPreview={false}
  dictionary={dictionary}
/>
```

- [ ] Run `npx vitest run src/components/reference-index.test.tsx` and confirm the missing-component failure.

### 3.5 Add English dictionary contracts

- [ ] Replace the old References empty-state copy with typed strings for:

```ts
references: {
  count: (count: number) => string;
  areaFilter: string;
  formatFilter: string;
  allAreas: string;
  allFormats: string;
  applyFilters: string;
  clearFilters: string;
  noResults: string;
  previewBanner: string;
  neutralPreview: string;
  relevance: string;
  sourceLanguage: string;
  reviewed: string;
  visitSource: string;
  formats: Record<ReferenceFormat, string>;
}
```

- [ ] Use concise English copy:
  - page description: `Reviewed design-engineering resources with original summaries and direct links to their canonical sources.`
  - count: singular `1 reference` and plural `N references`
  - filters: `Area`, `Format`, `All areas`, `All formats`, `Apply filters`, `Clear filters`
  - no results: `No reviewed references match these filters.`
  - banner: `Editorial preview: review records are visible in this development build.`
  - neutral preview: `Project-reviewed reference`
  - labels: `Why it matters`, `Source language`, `Reviewed`
  - action: `Visit original source`
  - formats: `Article`, `Documentation`, `Tool`, `Case study`

### 3.6 Implement the Server Components

- [ ] Create `src/components/reference-card.tsx` as a synchronous component. Use semantic `article`, heading, description paragraphs, definition-list metadata where appropriate, Area list, and two understandable links.
- [ ] Create `src/components/reference-index.tsx` as a synchronous component that owns the result count, GET filter form, optional preview banner, grid, and no-results state.
- [ ] Keep all visual labels in the supplied dictionary. Do not import the global English dictionary directly into either component.
- [ ] Use `<time dateTime={record.reviewed}>` for review dates.
- [ ] Render the neutral preview as text/decorative geometry with `aria-hidden` details; do not add an image request.
- [ ] Keep filter controls native. Do not add JavaScript state or hidden browser persistence.

### 3.7 Connect the route

- [ ] Update `src/app/[lang]/references/page.tsx` to:

```tsx
type ReferencesPageProps = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ReferencesPage({
  params,
  searchParams,
}: ReferencesPageProps) {
  const [{ lang }, query, catalog] = await Promise.all([
    params,
    searchParams,
    loadReferenceCatalog(),
  ]);
  const dictionary = await loadDictionary(lang);
  const isReviewPreview =
    process.env.NODE_ENV === "development" &&
    firstValue(query.preview) === "review";
  const visible = selectVisibleReferences(catalog.records, {
    includeReview: isReviewPreview,
  });
  const filters = parseReferenceFilters(query, catalog);
  const records = filterReferences(visible, filters);

  return (
    <section className="shell page-lead">
      <p className="eyebrow">{dictionary.pages.references.eyebrow}</p>
      <h1>{dictionary.pages.references.title}</h1>
      <p className="lede">{dictionary.pages.references.description}</p>
      <ReferenceIndex
        lang={lang}
        records={records}
        areas={catalog.areas}
        filters={filters}
        isReviewPreview={isReviewPreview}
        dictionary={dictionary.references}
      />
    </section>
  );
}
```

- [ ] Keep or introduce a tiny local `firstValue` helper that returns the first string from a string or array. Do not expose `preview` through the public filter API.
- [ ] Update `src/app/[lang]/page-shells.test.tsx` for the promised `searchParams` prop and assert that production/test mode does not expose review records for `?preview=review`.
- [ ] Update Explore's temporary copy and link so it truthfully directs users to `/en/references` without promising Area or Collection pages.

### 3.8 Add responsive styling

- [ ] Extend `src/app/globals.css` using the existing tokens and visual language:
  - compact filter row that wraps without horizontal overflow
  - one-column cards on narrow screens and two columns only when content remains readable
  - visible keyboard focus for selects, buttons, clear links, title links, and source links
  - neutral preview treatment that does not imply source ownership
  - metadata and Area pills with sufficient contrast
  - no hover-only information
  - respect existing `prefers-reduced-motion` behavior; do not add new animation

### 3.9 Verify and commit Task 3

- [ ] Run:

```bash
npx vitest run src/content/reference-filters.test.ts src/components/reference-index.test.tsx "src/app/[lang]/page-shells.test.tsx"
npm run lint
npm run typecheck
npm run build
```

- [ ] Confirm the build succeeds without network access and the review preview is development-only.
- [ ] Commit:

```bash
git add src
git commit -m "feat: render the public reference index"
```

---

## Task 4: Run the editorial gate and publish the approved records

**Files:**

- Modify: `content/references/en/*.json`
- Modify: `src/content/reference-content.test.ts`
- Modify: `references/candidates/taste-is-eating-silicon-valley.md`
- Modify: `references/candidates/web-interface-guidelines.md`
- Modify: `references/candidates/developing-taste.md`
- Modify: `references/candidates/pasito.md`
- Modify: `references/candidates/vaul.md`
- Modify: `references/candidates/family-wallet.md`
- Modify: `references/candidates/on-taste-part-3.md`
- Modify: `references/candidates/manage-design-projects.md`
- Modify: `references/candidates/ux-engineer-a-terminal-career.md`
- Modify: `references/index.md`
- Modify: `references/log.md`

### 4.1 Start the development preview

- [ ] Run `npm run dev` and open `/en/references?preview=review`.
- [ ] Verify all nine cards render and the editorial-preview banner is visible.
- [ ] Check desktop and mobile widths, keyboard traversal, focus visibility, link destinations, missing-date handling, and filter combinations.

### 4.2 Present the explicit metadata checkpoint

- [ ] Present the maintainer with all nine records in a compact review table containing:
  - title and canonical URL
  - publisher and author
  - summary
  - relevance
  - format
  - Areas
  - published, added, and reviewed dates

- [ ] Stop implementation at this point. Ask for explicit approval or corrections. Do not change any `status` to `published` based only on the earlier Candidate approval or design-spec approval.

### 4.3 Apply requested metadata corrections

- [ ] Apply only the corrections the maintainer requests.
- [ ] If a correction changes a factual attribution, date, or canonical URL, verify it against the existing English analysis and Candidate first. Browse the source only if the local evidence is insufficient and the maintainer authorizes the expanded verification.
- [ ] Update `reviewed` to the correction date for substantively changed records.
- [ ] Run `npm run references:check` and re-present changed fields if the correction is material.

### 4.4 Publish only after explicit approval

- [ ] After approval, change all nine `status` values from `review` to `published`.
- [ ] Update `src/content/reference-content.test.ts` to expect nine published records and zero review records:

```ts
expect(catalog.records).toHaveLength(9);
expect(catalog.records.every(({ status }) => status === "published")).toBe(
  true,
);
expect(selectVisibleReferences(catalog.records)).toHaveLength(9);
```

- [ ] Add a short note to each Candidate's existing `publication.notes` that its public record was created, reviewed, and published at `content/references/en/<id>.json`. Do not change its discovery lifecycle or create a second publication decision.
- [ ] Update `references/index.md`:
  - Draft records: 0
  - Records in review: 0
  - Published records: 9
  - move all nine rows from the Review table to the Published table without changing their IDs, primary Areas, or record paths
  - replace the wave-1 review-gate note with a completion note
  - remove the resolved “Create and validate reference records” issue
- [ ] Append, never rewrite, a `review | DENG wave 1 public records published` entry to `references/log.md` with Change, all nine Affected IDs, and the maintainer's explicit approval date.

### 4.5 Verify and commit Task 4

- [ ] Run:

```bash
npm run references:check
npx vitest run src/content src/components/reference-index.test.tsx "src/app/[lang]/page-shells.test.tsx"
npm run typecheck
```

- [ ] Open `/en/references` without the preview parameter and confirm all nine approved records render.
- [ ] Commit:

```bash
git add content src/content/reference-content.test.ts references
git commit -m "feat: publish first reference set"
```

---

## Task 5: Add bounded manual link-health maintenance

**Files:**

- Create: `scripts/reference-link-health.mjs`
- Create: `scripts/reference-link-health.test.mjs`
- Modify: `package.json`
- Modify: `README.md`

### 5.1 Write failing link-health tests

- [ ] Create `scripts/reference-link-health.test.mjs` using Vitest and injected fake `fetchImpl` functions. Cover:
  - 2xx response reports `healthy`
  - one or more 3xx responses report `redirect` and the final resolved destination
  - a redirect loop or more than five hops reports `unavailable`
  - HEAD 405 retries once with GET
  - timeout or abort reports `unavailable` without throwing away other results
  - network error reports `unavailable` with the error message
  - concurrency never exceeds four in-flight requests
  - process exit code is nonzero only when one or more destinations are unavailable

- [ ] Test this exported interface:

```js
export async function checkReferenceUrl(
  record,
  { fetchImpl = fetch, timeoutMs = 10000 } = {},
) {}

export async function checkReferenceLinks(
  records,
  { fetchImpl = fetch, timeoutMs = 10000, concurrency = 4 } = {},
) {}
```

- [ ] Run `npx vitest run scripts/reference-link-health.test.mjs` and confirm the missing-module failure.

### 5.2 Implement the manual command

- [ ] Implement `scripts/reference-link-health.mjs` with Node's built-in `fetch` and `AbortSignal.timeout`.
- [ ] Read `content/references/en/*.json` only after `references:records:check` has validated them.
- [ ] Send HEAD with `redirect: "manual"`, retry GET only for 405 or 501, and never download response bodies.
- [ ] Resolve relative `Location` headers with `new URL(location, currentUrl)`, follow at most five hops, and keep a Set of visited URLs so loops terminate.
- [ ] Print one deterministic line per record:

```text
HEALTHY  developing-taste  200  https://emilkowal.ski/ui/developing-taste
REDIRECT media-hover  301  https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/hover
UNAVAILABLE example  timeout  https://example.com/
```

- [ ] Print totals and set `process.exitCode = 1` when any record is unavailable. Do not mutate a record.

### 5.3 Add the opt-in script and documentation

- [ ] Add:

```json
{
  "references:links": "npm run references:records:check && node scripts/reference-link-health.mjs"
}
```

- [ ] Do not add `references:links` to `check`, `build`, a page, or a test that contacts the network.
- [ ] Add a short `Reference maintenance` section to `README.md` documenting:
  - `content/references/en/<id>.json` authoring
  - `npm run references:check` for local schema/graph validation
  - `npm run references:links` as optional network maintenance
  - external failures never block the application build

### 5.4 Verify and commit Task 5

- [ ] Run:

```bash
npx vitest run scripts/reference-link-health.test.mjs
npm run references:check
npm run check
```

- [ ] Confirm `npm run check` performs no network request.
- [ ] Run `npm run references:links` separately and record its report as maintenance evidence; a remote failure is a finding, not an implementation-test failure.
- [ ] Commit:

```bash
git add scripts/reference-link-health.mjs scripts/reference-link-health.test.mjs package.json README.md
git commit -m "chore: add reference link health check"
```

---

## Task 6: Complete browser coverage and repository verification

**Files:**

- Modify: `e2e/foundation.spec.ts`
- Modify: `docs/ko/superpowers/plans/2026-08-05-phase-1-technical-foundation.md`
- Modify: `docs/superpowers/plans/2026-08-11-korean-analysis-translations.md`
- Modify: `docs/superpowers/plans/2026-08-12-source-graph-discovery.md`

### 6.1 Add failing browser assertions

- [ ] Extend `e2e/foundation.spec.ts` with production-server tests that:
  - visit `/en/references` and find nine reference cards
  - verify the heading, result count, filter labels, and `Visit original source` links
  - verify the `developing-taste` link points to its canonical URL and has no `target="_blank"`
  - visit `/en/references?area=interaction-and-motion&format=tool` and find only `Pasito` and `Vaul`
  - visit `/en/references?area=unknown` and recover to all nine records
  - visit `/en/references?area=prototyping-and-tooling` and see the valid no-results state and clear link
  - visit `/en/references?preview=review` in the production server and see no preview banner
  - run axe against `/en/references`
  - check narrow mobile viewport for no horizontal document overflow
  - use Tab to confirm the filter controls and first card links receive visible focus

- [ ] Run the focused Playwright test and confirm at least one new assertion fails before any test-only selector or accessibility adjustment is added.

### 6.2 Make the minimum testability corrections

- [ ] Prefer semantic role/name locators. Add `data-testid` only if no stable semantic locator exists.
- [ ] Fix only genuine accessibility, semantics, or responsive issues exposed by the tests. Do not redesign the approved visual system in this task.

### 6.3 Normalize the three pre-existing formatting warnings

- [ ] Run Prettier on only:

```bash
npx prettier --write docs/ko/superpowers/plans/2026-08-05-phase-1-technical-foundation.md docs/superpowers/plans/2026-08-11-korean-analysis-translations.md docs/superpowers/plans/2026-08-12-source-graph-discovery.md
```

- [ ] Inspect the diff and confirm it is formatting-only. Do not translate, rewrite, or change requirements in these historical plans.

### 6.4 Run the complete verification ladder

- [ ] Run in this order:

```bash
npm run references:check
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

- [ ] Confirm every command exits zero.
- [ ] Confirm build output and application requests contain no external source fetches.
- [ ] Confirm `git status --short` lists only intentional changes.
- [ ] Review the full diff against every completion criterion in the approved design.

### 6.5 Request code review and finish the branch

- [ ] Use `superpowers:requesting-code-review` for the completed branch.
- [ ] Resolve any verified High or Medium findings with focused tests and rerun the complete verification ladder.
- [ ] Commit Task 6:

```bash
git add e2e/foundation.spec.ts docs/ko/superpowers/plans/2026-08-05-phase-1-technical-foundation.md docs/superpowers/plans/2026-08-11-korean-analysis-translations.md docs/superpowers/plans/2026-08-12-source-graph-discovery.md
git commit -m "test: verify public reference experience"
```

- [ ] Use `superpowers:finishing-a-development-branch` to present the verified merge, PR, keep, or discard options. Do not merge or push without the maintainer's chosen option.
