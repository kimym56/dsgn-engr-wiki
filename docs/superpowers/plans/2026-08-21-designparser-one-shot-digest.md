# Designparser One-Shot Digest Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:test-driven-development while implementing this plan task-by-task.

**Goal:** Add a repository-local one-shot skill backed by a deterministic, resumable update command.

**Architecture:** Extend the existing private Designparser workflow without adding dependencies. Preparation produces a delta-only private bundle; finalization validates bilingual agent output and atomically merges it into both digests.

**Tech Stack:** Node.js 22, TypeScript, Vitest, existing gallery-dl/FFmpeg/Whisper adapters.

## Global Constraints

- Preserve existing uncommitted frame-extraction work.
- Keep all fetched content and analyses in `.study-cache/designparser/`.
- Stop before digest mutation on any failure.
- Sort reels oldest-to-newest and regenerate numbering.
- Do not render Slides or Frames sections.

### Task 1: Delta preparation

**Files:** Create `scripts/designparser/update.ts` and `scripts/designparser/update.test.ts`; modify `package.json`.

- [ ] Write a failing test proving preparation reports only reels absent from both digests and only new or hash-changed website rules.
- [ ] Run the focused test and confirm the expected missing-feature failure.
- [ ] Implement preparation with existing `runCli`, built-in `fetch`, stable JSON hashing, and private snapshot files.
- [ ] Run the focused test and confirm it passes.

### Task 2: Atomic finalization

**Files:** Modify `scripts/designparser/update.ts` and `scripts/designparser/update.test.ts`.

- [ ] Write failing tests for incomplete bilingual results and canonical merge behavior.
- [ ] Confirm both tests fail for the intended reasons.
- [ ] Implement result validation, deterministic rendering, sorting/renumbering, website merging, and atomic two-file promotion.
- [ ] Run focused tests and confirm they pass.

### Task 3: Repository-local skill

**Files:** Create `.agents/skills/designparser-digest/SKILL.md` and `.agents/skills/designparser-digest/agents/openai.yaml`.

- [ ] Initialize the skill with the official skill scaffolder.
- [ ] Replace the template with concise one-shot instructions that load only the pending delta.
- [ ] Validate the skill folder.

### Task 4: Verification

- [ ] Run Designparser update, CLI, command, domain, and privacy tests.
- [ ] Run typecheck, lint, and format checks for changed tracked files.
- [ ] Confirm the existing unrelated worktree changes remain preserved.
