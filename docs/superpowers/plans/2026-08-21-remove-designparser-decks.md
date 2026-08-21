# Remove Designparser Decks Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Delete the unused HyperFrames-powered Designparser study presentation subsystem while preserving the private reel archive, Markdown digests, and recurring ingestion workflow.

**Architecture:** Remove the complete presentation slice—routes, player, composition generator, study-only data model, styles, tests, and dependencies—because no retained script imports it. Keep the extraction and digest pipeline unchanged and verify the remaining application from a clean dependency graph.

**Tech Stack:** Next.js 16.3, React 19.2, TypeScript 6, Vitest 4, Playwright 1.62, npm.

## Global Constraints

- Preserve English and Korean reel digests, study notes, private extraction artifacts, privacy protections, ingestion scripts, and `.agents/skills/designparser-digest`.
- Do not add a replacement slide, deck, video, or presentation system.
- Keep historical specifications and plans as an audit record.
- Do not touch the unrelated untracked `motion/` directory.

---

### Task 1: Delete the Designparser presentation slice

**Files:**

- Delete: `src/studies/designparser/hyperframes.ts`
- Delete: `src/studies/designparser/hyperframes.test.ts`
- Delete: `src/studies/designparser/model.ts`
- Delete: `src/studies/designparser/model.test.ts`
- Delete: `src/studies/designparser/studies.ts`
- Delete: `src/components/designparser-study-deck.tsx`
- Delete: `src/components/designparser-study-deck.test.tsx`
- Delete: `src/app/[lang]/studies/designparser/page.tsx`
- Delete: `src/app/[lang]/studies/designparser/[reelId]/page.tsx`
- Delete: `src/app/[lang]/studies/designparser/studies-pages.test.tsx`
- Delete: `e2e/designparser-studies.spec.ts`
- Modify: `src/app/globals.css:416-535,584-591`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**

- Consumes: the approved removal specification and the current import graph showing that only the presentation slice imports the study model and records.
- Produces: a wiki with no Designparser presentation routes or HyperFrames runtime, while `scripts/designparser/**`, digest Markdown, notes, and the one-shot skill remain unchanged.

- [ ] **Step 1: Record the failing baseline**

Run:

```bash
gh run view 32465967819 --repo kimym56/dsgn-engr-wiki --log-failed
```

Expected: the browser job reports two failures in `e2e/designparser-studies.spec.ts` for the removed deck's reduced-motion transform.

- [ ] **Step 2: Read the installed Next.js routing guidance**

Run:

```bash
rg -n "dynamic segment|not-found|page\.tsx" node_modules/next/dist/docs/app -g '*.md' | head -n 40
```

Expected: locate and read the App Router page/dynamic-route guidance relevant to deleting the two route files.

- [ ] **Step 3: Remove the presentation implementation and its tests**

Delete the eleven files listed above. Remove the `.study-*` CSS block from `.study-card-list` through `.study-deck hyperframes-slideshow:focus-visible`, plus the mobile-only `.study-card` and `.study-evidence` rules. Do not alter unrelated reference styles.

- [ ] **Step 4: Remove HyperFrames from the dependency graph**

Run:

```bash
npm uninstall @hyperframes/player @hyperframes/lint
```

Expected: `package.json` and `package-lock.json` no longer contain HyperFrames packages; no new dependency is added.

- [ ] **Step 5: Verify the removal boundary**

Run:

```bash
rg -n -i "hyperframes|designparser-study-deck|studies/designparser" src e2e package.json package-lock.json
test -d scripts/designparser
test -f .agents/skills/designparser-digest/SKILL.md
git check-ignore .study-cache/designparser/reels-digest.md .study-cache/designparser/reels-digest-ko.md .study-cache/designparser/notes.md .study-cache/designparser/example/source.mp4
```

Expected: the first command has no matches; both retained workflow checks succeed; Git reports every private archive path as ignored. The actual private archive remains in its existing worktree and is not copied into `main`.

- [ ] **Step 6: Run focused and full verification**

Run:

```bash
npx prettier --check package.json package-lock.json src/app/globals.css
npm run lint
npm run typecheck
npm test
npm run build
CI=1 npm run test:e2e
```

Expected: every command exits 0, the build no longer generates `/en/studies/designparser` routes, and the remaining browser suite passes.

- [ ] **Step 7: Review and commit only scoped changes**

Run:

```bash
git diff --check
git diff --stat
git status --short
git add package.json package-lock.json src/app/globals.css src/studies/designparser src/components/designparser-study-deck.tsx src/components/designparser-study-deck.test.tsx 'src/app/[lang]/studies/designparser' e2e/designparser-studies.spec.ts docs/superpowers/plans/2026-08-21-remove-designparser-decks.md
git diff --cached --name-status
git commit -m "refactor: remove Designparser study decks"
```

Expected: the staged set contains only the presentation deletion, dependency cleanup, CSS cleanup, and this plan; `motion/` is absent.
