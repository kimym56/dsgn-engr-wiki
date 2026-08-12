# Designparser Reel Studies Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a resumable private Designparser reel extraction workflow and publish each human-reviewed reel as one manually navigated, non-video HyperFrames study deck inside the unlisted English Next.js study area.

**Architecture:** A Node 22 authoring CLI orchestrates authenticated `gallery-dl`, `ffmpeg`, and local Whisper while persisting resumable state only under gitignored `.study-cache/`. Reviewed English study objects are the sole committed content source; pure functions validate them and generate HyperFrames composition HTML, while a small Client Component mounts the HyperFrames player inside statically generated Next.js routes.

**Tech Stack:** Node.js 22.17 type stripping and standard library, gallery-dl, FFmpeg 8, OpenAI Whisper CLI, TypeScript 6, Vitest 4, Next.js 16.3 App Router, React 19.2, `@hyperframes/player` 0.7.107, `@hyperframes/lint` 0.7.107, Playwright 1.62, axe-core.

## Global Constraints

- Read the relevant Next.js 16.3 guides in `node_modules/next/dist/docs/` before editing application code; route `params` are promises in this version.
- The only collection target is `https://www.instagram.com/designparser/reels/`.
- Read the existing signed-in Chrome session directly; never export, print, persist, or commit cookies or browser-session data.
- Keep `.study-cache/`, downloaded media, audio, transcripts, extracted frames, and private drafts outside version control.
- English is canonical; do not enable `/ko/studies`, create Korean study content, or add a language switcher.
- Require explicit human approval before adding any reel study to committed application content.
- Create exactly one deck per reviewed reel; do not combine reels.
- Use original project-owned prose and HTML/CSS visuals; never commit source video, frames, screenshots, captions, transcript passages, branding, or copied UI.
- Use HyperFrames live slideshow mode with manual controls; do not add autoplay between slides, `hyperframes render`, MP4 generation, audio, or voiceover.
- Keep study routes absent from the header, footer, References, Explore, collections, sitemap, and `references/index.md`.
- Mark study routes `noindex, nofollow`; this is a discovery hint, not access control.
- Production builds and page requests must not contact Instagram, read Chrome, invoke `gallery-dl`, `ffmpeg`, or Whisper, or require `.study-cache/`.
- Use one scene-threshold option with default `0.32`; permit per-run calibration because reel editing styles vary.
- Preserve a visible per-stage failure rather than silently omitting or deleting a reel.

---

## File Structure

### Authoring workflow

- `scripts/designparser/domain.ts` — private manifest, discovery, stage, transcript, and draft types plus pure validation and transition functions.
- `scripts/designparser/commands.ts` — child-process runner and adapters for gallery-dl, FFmpeg, and Whisper.
- `scripts/designparser/cli.ts` — argument parsing, preflight, resumable orchestration, status output, and draft validation.
- `scripts/designparser/*.test.ts` — Node-environment tests with synthetic command results and temporary directories.

### Reviewed content and presentation

- `src/studies/designparser/model.ts` — reviewed study types, runtime validation, and lookup helpers.
- `src/studies/designparser/studies.ts` — approved English study objects only.
- `src/studies/designparser/hyperframes.ts` — escaped HyperFrames manifest and composition HTML generation.
- `src/components/designparser-study-deck.tsx` — client-only mounting boundary for HyperFrames custom elements.
- `src/app/[lang]/studies/designparser/page.tsx` — unlisted reviewed-study index.
- `src/app/[lang]/studies/designparser/[reelId]/page.tsx` — static study detail and deck route.
- `src/app/globals.css` — study layout and responsive player containment.
- `e2e/designparser-studies.spec.ts` — real browser, manual navigation, metadata, reduced-motion, and accessibility coverage.

No generated composition files are written to `public/`: the Server Component creates sanitized composition and manifest strings from reviewed data and passes only those strings into the isolated client player.

---

### Task 1: Pin the toolchain and protect private artifacts

**Files:**

- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `tsconfig.json`
- Modify: `vitest.config.mts`
- Modify: `.gitignore`
- Modify: `README.md`
- Create: `scripts/designparser/private-files.test.ts`

**Interfaces:**

- Produces: `npm run study:designparser -- preflight|discover|extract|status|validate-drafts` for the authoring CLI.
- Produces: Vitest discovery for `scripts/**/*.test.ts` under the Node environment annotation.
- Produces: exact HyperFrames player and lint packages used by later tasks.

- [ ] **Step 1: Add a failing privacy regression test**

Create `scripts/designparser/private-files.test.ts`:

```ts
// @vitest-environment node

import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

describe("private Designparser study artifacts", () => {
  it("keeps the complete working cache and credential exports untracked", () => {
    const ignored = execFileSync(
      "git",
      [
        "check-ignore",
        ".study-cache/designparser/reels/example/source.mp4",
        ".study-cache/designparser/reels/example/audio.wav",
        ".study-cache/designparser/reels/example/transcript.json",
        ".study-cache/designparser/reels/example/frames/000001.250.jpg",
        "cookies-instagram.txt",
        "instagram-session.json",
      ],
      { encoding: "utf8" },
    );

    expect(ignored.trim().split("\n")).toHaveLength(6);
    expect(
      execFileSync("git", ["ls-files", ".study-cache"], {
        encoding: "utf8",
      }).trim(),
    ).toBe("");
  });
});
```

- [ ] **Step 2: Run the test and verify it is not discovered yet**

Run:

```bash
npm test -- scripts/designparser/private-files.test.ts
```

Expected: Vitest reports that no matching test file is included because the current config only scans `src/`.

- [ ] **Step 3: Add exact dependencies and scripts**

Run:

```bash
npm install @hyperframes/player@0.7.107
npm install --save-dev @hyperframes/lint@0.7.107
```

Add these scripts to `package.json`:

```json
{
  "study:designparser": "node --experimental-strip-types scripts/designparser/cli.ts"
}
```

Do not install the `hyperframes` rendering CLI; the player and HTML linter cover the live-deck requirement without bringing in the video renderer.

- [ ] **Step 4: Enable typed Node scripts and their tests**

Add `"allowImportingTsExtensions": true` to `compilerOptions` in `tsconfig.json`.

Change the Vitest include list to:

```ts
include: ["src/**/*.test.{ts,tsx}", "scripts/**/*.test.ts"],
```

Every test under `scripts/` begins with `// @vitest-environment node`; application tests keep the existing jsdom default.

- [ ] **Step 5: Ignore every private working artifact**

Append to `.gitignore`:

```gitignore
# Private Designparser study extraction
.study-cache/
cookies*.txt
instagram-session*
```

- [ ] **Step 6: Document local prerequisites without managing them in application code**

Add a `Designparser study authoring` section to `README.md` with:

````markdown
### Designparser study authoring

Private extraction runs only on the maintainer's Mac. It requires a signed-in
Chrome Instagram session plus these local commands:

```bash
brew install gallery-dl openai-whisper
```

FFmpeg is also required. Verify the environment without downloading media:

```bash
npm run study:designparser -- preflight
```

All source media, transcripts, frames, and drafts stay under gitignored
`.study-cache/`. Never export Chrome cookies into the repository. No study is
added to the wiki until its English synthesis is reviewed and approved.
````

- [ ] **Step 7: Run the focused and repository checks**

Run:

```bash
npm test -- scripts/designparser/private-files.test.ts
npm run typecheck
npm run format:check
```

Expected: all three commands pass.

- [ ] **Step 8: Commit the toolchain boundary**

```bash
git add package.json package-lock.json tsconfig.json vitest.config.mts .gitignore README.md scripts/designparser/private-files.test.ts
git commit -m "build: prepare private reel study tooling"
```

---

### Task 2: Model resumable extraction state

**Files:**

- Create: `scripts/designparser/domain.ts`
- Create: `scripts/designparser/domain.test.ts`

**Interfaces:**

- Produces: `Manifest`, `ReelRecord`, `StageName`, `StageState`, `DiscoveredReel`, and `Transcript` types.
- Produces: `emptyManifest(now)`, `readManifest(path)`, `writeManifest(path, manifest)`, `parseManifest(value)`, `reconcileDiscovery(manifest, reels, now)`, `setStage(record, stage, status, now, error?)`, `stageOutputExists(cacheRoot, record, stage)`, `normalizeWhisperTranscript(value)`, and `validatePrivateDraft(value)`.
- Consumes: no external commands or application code.

- [ ] **Step 1: Write failing manifest and transcript tests**

Create `scripts/designparser/domain.test.ts` with Node environment and these cases:

```ts
// @vitest-environment node

import { describe, expect, it } from "vitest";
import {
  emptyManifest,
  normalizeWhisperTranscript,
  reconcileDiscovery,
  setStage,
} from "./domain.ts";

const discovered = {
  id: "C-example_1",
  url: "https://www.instagram.com/reel/C-example_1/",
  publishedAt: "2026-08-01T12:00:00.000Z",
};

describe("Designparser extraction domain", () => {
  it("adds a newly discovered reel without replacing completed work", () => {
    const initial = reconcileDiscovery(
      emptyManifest("2026-08-12T00:00:00.000Z"),
      [discovered],
      "2026-08-12T00:01:00.000Z",
    );
    const complete = setStage(
      initial.reels[discovered.id],
      "download",
      "complete",
      "2026-08-12T00:02:00.000Z",
    );
    const rerun = reconcileDiscovery(
      { ...initial, reels: { [discovered.id]: complete } },
      [discovered],
      "2026-08-12T00:03:00.000Z",
    );

    expect(rerun.reels[discovered.id].stages.download.status).toBe("complete");
  });

  it("normalizes Whisper segments and rejects overlapping timestamps", () => {
    expect(
      normalizeWhisperTranscript({
        language: "en",
        text: "First. Second.",
        segments: [
          { start: 0, end: 1.25, text: " First. " },
          { start: 1.25, end: 2.5, text: " Second. " },
        ],
      }).segments,
    ).toEqual([
      { start: 0, end: 1.25, text: "First." },
      { start: 1.25, end: 2.5, text: "Second." },
    ]);

    expect(() =>
      normalizeWhisperTranscript({
        language: "en",
        text: "bad",
        segments: [
          { start: 0, end: 2, text: "one" },
          { start: 1, end: 3, text: "two" },
        ],
      }),
    ).toThrow("overlaps the previous segment");
  });
});
```

- [ ] **Step 2: Run the test and verify the missing module failure**

Run:

```bash
npm test -- scripts/designparser/domain.test.ts
```

Expected: FAIL because `scripts/designparser/domain.ts` does not exist.

- [ ] **Step 3: Implement the minimum stable domain**

Define these exact state shapes in `domain.ts`:

```ts
export const PROFILE_URL = "https://www.instagram.com/designparser/reels/";
export const STAGES = [
  "download",
  "audio",
  "transcript",
  "frames",
  "draft",
] as const;
export type StageName = (typeof STAGES)[number];
export type StageStatus = "pending" | "running" | "complete" | "failed";

export interface StageState {
  status: StageStatus;
  updatedAt: string;
  error?: string;
}

export interface ReelRecord {
  id: string;
  url: string;
  observedAt: string;
  publishedAt?: string;
  stages: Record<StageName, StageState>;
}

export interface Manifest {
  schemaVersion: 1;
  profile: typeof PROFILE_URL;
  discovery: {
    status: "never" | "running" | "complete" | "failed";
    updatedAt: string;
    error?: string;
  };
  reels: Record<string, ReelRecord>;
}
```

Use plain object and array checks in `parseManifest`; reject unknown schema versions, wrong profile URLs, invalid shortcode IDs, noncanonical reel URLs, and invalid stage states with messages that name the failing field. Use `structuredClone` before transitions so pure functions never mutate caller state.

`setStage` must permit retries from `failed` or stale `running`, preserve completed upstream stages, clear an old error on success, and reject marking a stage complete before every preceding stage is complete.

`normalizeWhisperTranscript` accepts only `language: "en"`, finite nonnegative timestamps, nonempty trimmed segment text, monotonically nonoverlapping segments, and a nonempty full transcript.

- [ ] **Step 4: Add atomic manifest persistence and output checks**

Implement:

```ts
export async function writeManifest(path: string, manifest: Manifest) {
  const temporary = `${path}.tmp`;
  await fs.writeFile(temporary, `${JSON.stringify(manifest, null, 2)}\n`);
  await fs.rename(temporary, path);
}
```

Map completed stages to these exact files:

```ts
const STAGE_OUTPUTS = {
  download: ["source.json", "source.mp4"],
  audio: ["audio.wav"],
  transcript: ["transcript.json", "transcript.txt"],
  frames: ["frames"],
  draft: ["draft.json"],
} satisfies Record<StageName, readonly string[]>;
```

For `frames`, require a directory containing at least one `.jpg`. A recorded `complete` stage whose output is missing is treated as retryable, not silently trusted.

- [ ] **Step 5: Define and validate the private draft contract**

Use this private-only shape:

```ts
export interface PrivateDraft {
  reelId: string;
  status: "needs-review";
  title: string;
  summary: string;
  principles: string[];
  applications: string[];
  uncertainties: string[];
  evidence: Array<{ label: string; start: number; end: number }>;
  slides: Array<{
    kind:
      | "source"
      | "problem"
      | "principle"
      | "diagram"
      | "application"
      | "constraint"
      | "takeaway";
    eyebrow: string;
    title: string;
    body: string;
    visual:
      | { type: "sequence"; items: string[] }
      | { type: "comparison"; before: string; after: string }
      | { type: "layers"; items: string[] }
      | { type: "rule"; statement: string };
  }>;
}
```

Require 4–8 slides, at least one principle, one application, and one evidence range. Reject transcript text fields, frame paths, HTML, and source-media paths.

- [ ] **Step 6: Run the domain suite**

Run:

```bash
npm test -- scripts/designparser/domain.test.ts
npm run typecheck
```

Expected: PASS.

- [ ] **Step 7: Commit the extraction domain**

```bash
git add scripts/designparser/domain.ts scripts/designparser/domain.test.ts
git commit -m "feat: model resumable reel extraction"
```

---

### Task 3: Add authenticated Instagram discovery and download adapters

**Files:**

- Create: `scripts/designparser/commands.ts`
- Create: `scripts/designparser/commands.test.ts`

**Interfaces:**

- Consumes: `DiscoveredReel` and `PROFILE_URL` from `domain.ts`.
- Produces: `CommandRunner`, `runCommand`, `checkExecutable`, `discoverReels`, and `downloadReel`.
- Does not expose or persist Chrome cookie values.

- [ ] **Step 1: Write failing gallery-dl parser tests**

Create a fake `CommandRunner` that returns this gallery-dl message array:

```ts
const galleryOutput = JSON.stringify([
  [2, { username: "designparser" }],
  [
    3,
    "https://scontent.example/video.mp4",
    {
      post_shortcode: "C-example_1",
      post_id: "123456789",
      post_url: "https://www.instagram.com/p/C-example_1/",
      username: "designparser",
      date: "2026-08-01 12:00:00",
      video_url: "https://scontent.example/video.mp4",
      extension: "mp4",
    },
  ],
  [
    3,
    "https://scontent.example/cover.jpg",
    { post_shortcode: "C-example_1", extension: "jpg" },
  ],
]);
```

Assert that `discoverReels(fakeRunner)` returns exactly:

```ts
[
  {
    id: "C-example_1",
    url: "https://www.instagram.com/reel/C-example_1/",
    publishedAt: "2026-08-01T12:00:00.000Z",
  },
];
```

Also assert that a nonzero gallery-dl exit rejects the complete discovery even if stdout contains one parseable reel.

- [ ] **Step 2: Run the focused test and verify it fails**

```bash
npm test -- scripts/designparser/commands.test.ts
```

Expected: FAIL because the adapter module is missing.

- [ ] **Step 3: Implement a child-process runner with injectable behavior**

Use `spawn` from `node:child_process`, argument arrays rather than shell strings, captured UTF-8 stdout/stderr, and this result:

```ts
export interface CommandResult {
  code: number;
  stdout: string;
  stderr: string;
}

export type CommandRunner = (
  command: string,
  args: readonly string[],
  options?: { cwd?: string },
) => Promise<CommandResult>;
```

Reject signal termination and spawn errors with the executable name. Do not echo full Chrome or gallery-dl diagnostic output into committed files.

- [ ] **Step 4: Implement fully paginated discovery**

Invoke exactly:

```ts
[
  "--cookies-from-browser",
  "chrome/.instagram.com",
  "--sleep-request",
  "6.0-12.0",
  "--no-colors",
  "-o",
  "extractor.instagram.include=reels",
  "--dump-json",
  PROFILE_URL,
];
```

`--dump-json` runs gallery-dl's complete extractor; no range or maximum-post option is allowed. Parse message type `3` only when metadata includes a nonempty `video_url`, `username === "designparser"`, and a valid `post_shortcode`. Deduplicate by shortcode and sort by `publishedAt` descending, then by ID.

Mark discovery complete only when gallery-dl exits `0`, the top-level JSON is valid, and at least one Designparser reel is present. Any nonzero exit, login challenge, rate limit, malformed output, or zero-result response is a failed discovery, never a complete empty snapshot.

- [ ] **Step 5: Implement isolated one-reel download**

For canonical reel URL and a newly created reel directory, invoke:

```ts
[
  "--cookies-from-browser",
  "chrome/.instagram.com",
  "--sleep-request",
  "6.0-12.0",
  "--no-colors",
  "-o",
  "extractor.instagram.videos=merged",
  "--filter",
  "video_url",
  "--directory",
  reelDirectory,
  "--filename",
  "downloaded-{num}.{extension}",
  "--write-metadata",
  reel.url,
];
```

After success, require exactly one downloaded `.mp4`, rename it to `source.mp4`, select its matching metadata JSON, sanitize it to `id`, `url`, `creator`, `publishedAt`, `duration`, `width`, and `height`, write that object as `source.json`, and remove gallery-dl's unsanitized metadata derivative. Fail rather than guessing when no video or multiple videos are returned.

- [ ] **Step 6: Run adapter tests and type checking**

```bash
npm test -- scripts/designparser/commands.test.ts
npm run typecheck
```

Expected: PASS, with no live network or Chrome access.

- [ ] **Step 7: Commit the authenticated source adapter**

```bash
git add scripts/designparser/commands.ts scripts/designparser/commands.test.ts
git commit -m "feat: discover authenticated Designparser reels"
```

---

### Task 4: Add FFmpeg, Whisper, and scene-frame processing

**Files:**

- Modify: `scripts/designparser/commands.ts`
- Modify: `scripts/designparser/commands.test.ts`

**Interfaces:**

- Produces: `extractAudio`, `transcribeAudio`, and `extractSceneFrames`.
- Consumes: the injected `CommandRunner` and one private reel directory.
- Produces: `audio.wav`, normalized `transcript.json`, `transcript.txt`, and timestamp-named JPEG files.

- [ ] **Step 1: Add failing exact-command tests**

Assert that the adapters call these commands without a shell:

```text
ffmpeg -nostdin -hide_banner -loglevel error -y -i source.mp4 -vn -ac 1 -ar 16000 -c:a pcm_s16le audio.wav
whisper audio.wav --language en --task transcribe --model small.en --output_format json --output_dir /tmp/designparser-test/C-example_1
ffmpeg -nostdin -hide_banner -loglevel info -y -i source.mp4 -vf select='eq(n,0)+gt(scene,0.32)',showinfo -fps_mode vfr frames/%06d.jpg
```

The test runner writes a synthetic Whisper JSON result and three frame files, while FFmpeg stderr contains:

```text
[Parsed_showinfo_1] n:0 pts:0 pts_time:0
[Parsed_showinfo_1] n:1 pts:375 pts_time:12.5
[Parsed_showinfo_1] n:2 pts:930 pts_time:31
```

Assert final frame names are `000000.000.jpg`, `000012.500.jpg`, and `000031.000.jpg`.

- [ ] **Step 2: Run the focused tests and verify the new cases fail**

```bash
npm test -- scripts/designparser/commands.test.ts
```

Expected: FAIL because the media adapters are not exported.

- [ ] **Step 3: Implement audio extraction**

Use absolute input and output paths, require `source.mp4` before invoking FFmpeg, and require a nonempty `audio.wav` after exit `0`. A failed command leaves the original video untouched.

- [ ] **Step 4: Implement local English Whisper transcription**

Run the exact command from Step 1. Whisper writes `audio.json`; parse it through `normalizeWhisperTranscript`, atomically write normalized `transcript.json`, derive `transcript.txt` by joining trimmed segment text with newlines, then remove `audio.json`. Never invoke a network transcription API.

- [ ] **Step 5: Implement scene-change frame extraction**

Validate the threshold as a finite number strictly between `0` and `1`. Create a fresh `frames/` directory, parse every `showinfo` `pts_time`, require the timestamp count to equal the written JPEG count, and atomically rename sequential files to six-digit-second plus three-digit-millisecond names. Keep the first frame through `eq(n,0)` even when no scene cut is detected.

- [ ] **Step 6: Run the media suite**

```bash
npm test -- scripts/designparser/commands.test.ts
npm run typecheck
```

Expected: PASS.

- [ ] **Step 7: Commit local media processing**

```bash
git add scripts/designparser/commands.ts scripts/designparser/commands.test.ts
git commit -m "feat: process reel transcripts and scene frames"
```

---

### Task 5: Orchestrate preflight, discovery, extraction, resume, and status

**Files:**

- Create: `scripts/designparser/cli.ts`
- Create: `scripts/designparser/cli.test.ts`
- Modify: `README.md`

**Interfaces:**

- Consumes: manifest functions from `domain.ts` and command adapters from `commands.ts`.
- Produces commands: `preflight`, `discover`, `extract`, `status`, and `validate-drafts`.
- Produces options: `extract --limit 1`, `extract --reel ID`, and `extract --scene-threshold 0.32`.

- [ ] **Step 1: Write failing orchestration tests**

With injected clock, filesystem root, and adapters, verify:

- `preflight` rejects a target other than the constant profile and reports missing `gallery-dl`, `ffmpeg`, or `whisper` before discovery;
- `discover` writes `discovery.status: "complete"` only after a complete result;
- `extract --limit 1` processes exactly the newest pending reel;
- a transcript failure marks only `transcript` failed and leaves `download` and `audio` complete;
- rerunning retries the failed stage without repeating valid outputs;
- a stale `running` stage retries safely;
- `status` reports discovered, extracted, failed, and draft-ready totals; and
- `validate-drafts` names every invalid `draft.json` without modifying the draft and marks each valid draft stage complete in the manifest.

- [ ] **Step 2: Run the CLI tests and verify the missing module failure**

```bash
npm test -- scripts/designparser/cli.test.ts
```

Expected: FAIL because `cli.ts` is missing.

- [ ] **Step 3: Implement strict argument parsing**

Accept only:

```text
preflight
discover
extract [--limit 1] [--reel ID] [--scene-threshold NUMBER]
status [--json]
validate-drafts
```

Reject duplicate options, unknown commands, `--limit` values other than `1`, invalid reel IDs, and invalid thresholds with usage text and nonzero exit status. `extract --reel` and `--limit 1` are mutually exclusive.

- [ ] **Step 4: Implement preflight and cache initialization**

Use `process.cwd()` as repository root and exact paths:

```ts
const cacheRoot = path.join(repositoryRoot, ".study-cache", "designparser");
const manifestPath = path.join(cacheRoot, "manifest.json");
```

Preflight checks `gallery-dl`, `ffmpeg`, `whisper`, a writable cache root, `git check-ignore .study-cache/designparser/probe`, and the exact Node major version `22`. It may allow gallery-dl to test Chrome cookies only during `discover`; it never exports them.

- [ ] **Step 5: Implement resumable sequential orchestration**

Before each stage, atomically record `running`. On success, verify output then record `complete`. On failure, record `failed` with the executable and concise cause, continue to the next discovered reel when safe, and exit nonzero after the batch if any reel failed.

Run reels sequentially so authenticated requests remain conservatively paced. `extract` performs discovery first unless the manifest already has a complete discovery from the same invocation; a failed discovery prevents treating the manifest as a complete current snapshot but does not delete older reel records.

After `frames` completes, leave `draft` as `pending`; original synthesis is performed by the reviewing agent in Task 9, not by a rule-based copier. `validate-drafts` validates each existing draft without rewriting it and changes that reel's manifest stage to `complete` only when the complete private schema passes.

- [ ] **Step 6: Document exact operation commands**

Extend `README.md` with:

```bash
npm run study:designparser -- preflight
npm run study:designparser -- discover
npm run study:designparser -- extract --limit 1
npm run study:designparser -- extract
npm run study:designparser -- status
npm run study:designparser -- validate-drafts
```

State that `extract` can take substantial time, Ctrl-C is safe after the current child process exits, rerunning resumes, and successful extraction does not approve wiki publication.

- [ ] **Step 7: Run the complete authoring suite**

```bash
npm test -- scripts/designparser
npm run typecheck
npm run lint
```

Expected: PASS without live Instagram access.

- [ ] **Step 8: Commit the resumable CLI**

```bash
git add scripts/designparser/cli.ts scripts/designparser/cli.test.ts README.md
git commit -m "feat: orchestrate resumable reel extraction"
```

---

### Task 6: Define reviewed study content independently from private evidence

**Files:**

- Create: `src/studies/designparser/model.ts`
- Create: `src/studies/designparser/model.test.ts`
- Create: `src/studies/designparser/studies.ts`

**Interfaces:**

- Produces: `StudySlide`, `DesignparserStudy`, `validateStudy`, `validateStudies`, `designparserStudies`, `getDesignparserStudy(id)`, and `getDesignparserStudyParams()`.
- Consumes: no private cache paths and no external source at build time.
- Produces an initially empty reviewed collection; Task 9 adds real approved content.

- [ ] **Step 1: Write failing reviewed-content tests**

Use this complete synthetic test record only inside `model.test.ts`:

```ts
const validStudy = {
  id: "C-example_1",
  locale: "en",
  source: {
    url: "https://www.instagram.com/reel/C-example_1/",
    creator: "@designparser",
    publishedAt: "2026-08-01",
  },
  processedAt: "2026-08-12",
  reviewedAt: "2026-08-12",
  status: "reviewed",
  title: "Separate alignment from distribution",
  summary: "A study of choosing one layout responsibility at a time.",
  principles: ["Use one mechanism for each spatial responsibility."],
  applications: ["Separate group placement from spacing within the group."],
  uncertainties: [],
  evidence: [{ label: "Main explanation", start: 2.5, end: 12.25 }],
  slides: [
    {
      kind: "source",
      eyebrow: "Designparser study",
      title: "Alignment has two jobs",
      body: "Treat placement and internal spacing as separate decisions.",
      visual: { type: "rule", statement: "One mechanism, one responsibility" },
    },
    {
      kind: "problem",
      eyebrow: "Problem",
      title: "One rule is asked to do too much",
      body: "Mixed responsibilities make responsive behavior hard to predict.",
      visual: { type: "comparison", before: "Mixed", after: "Separated" },
    },
    {
      kind: "principle",
      eyebrow: "Principle",
      title: "Separate the decisions",
      body: "Place the group first, then distribute its children.",
      visual: { type: "sequence", items: ["Place", "Distribute", "Verify"] },
    },
    {
      kind: "takeaway",
      eyebrow: "Takeaway",
      title: "Clear ownership creates stable layouts",
      body: "Each layout primitive should answer one spatial question.",
      visual: { type: "layers", items: ["Container", "Group", "Item"] },
    },
  ],
} as const;
```

Assert it passes. Assert failures for copied transcript fields, `.study-cache` paths, `<video>`, fewer than four slides, more than eight slides, duplicate IDs, wrong creator, wrong host, non-`reviewed` status, `locale: "ko"`, a `translationOf` value on English content, and overlapping evidence timestamps.

- [ ] **Step 2: Run the model test and verify it fails**

```bash
npm test -- src/studies/designparser/model.test.ts
```

Expected: FAIL because the model module is missing.

- [ ] **Step 3: Implement the reviewed study schema**

Use the same slide `kind` and controlled `visual` union as `PrivateDraft`. Keep an optional `translationOf` field in the type for the future locale relationship, but reject it while `locale` is `en`; no Korean record is accepted in this plan. Permit only plain strings; reject `<`, `>`, `data:`, `blob:`, `file:`, `.study-cache`, media extensions, `transcript`, `caption`, and `screenshot` in committed content values or paths. Require 4–8 slides, a first `source` slide, a final `takeaway` slide, and nondecreasing editorial order using `source → problem → principle → diagram → application → constraint → takeaway`; repeated middle kinds are allowed. Also require finite ordered evidence ranges, ISO calendar dates, exact creator `@designparser`, a canonical `/reel/ID/` URL matching `id`, `locale: "en"`, and `status: "reviewed"`.

Validation returns a narrowed frozen object rather than mutating input. The module must have no `fs`, child-process, environment-variable, or network access.

- [ ] **Step 4: Add deterministic collection lookup**

Create `studies.ts`:

```ts
import { validateStudies } from "./model";

export const designparserStudies = validateStudies([]);

export function getDesignparserStudy(id: string) {
  return designparserStudies.find((study) => study.id === id);
}

export function getDesignparserStudyParams() {
  return designparserStudies.map(({ id }) => ({ reelId: id }));
}
```

Sort the validated collection newest publication date first, then ID. Reject duplicates rather than allowing the later record to win.

- [ ] **Step 5: Run model and application checks**

```bash
npm test -- src/studies/designparser/model.test.ts
npm run typecheck
npm run lint
```

Expected: PASS with an empty reviewed collection.

- [ ] **Step 6: Commit the reviewed-content boundary**

```bash
git add src/studies/designparser/model.ts src/studies/designparser/model.test.ts src/studies/designparser/studies.ts
git commit -m "feat: validate reviewed reel studies"
```

---

### Task 7: Generate original HyperFrames compositions without video rendering

**Files:**

- Create: `src/studies/designparser/hyperframes.ts`
- Create: `src/studies/designparser/hyperframes.test.ts`

**Interfaces:**

- Consumes: one validated `DesignparserStudy`.
- Produces: `buildSlideshowManifest(study): string` and `buildHyperframesComposition(study): string`.
- Uses: `lintHyperframeHtml` from `@hyperframes/lint` in tests only.

- [ ] **Step 1: Write failing composition tests**

Using the valid synthetic study from Task 6, assert:

```ts
const manifest = JSON.parse(buildSlideshowManifest(validStudy));
expect(manifest.slides).toHaveLength(4);
expect(manifest.slides[0].sceneId).toBe("C-example_1-slide-1");

const html = buildHyperframesComposition(validStudy);
expect(html).toContain('data-composition-id="C-example_1-slide-1"');
expect(html).toContain('type="application/hyperframes-slideshow+json"');
expect(html).toContain("prefers-reduced-motion: reduce");
expect(html).not.toMatch(
  /<video|<audio|\.mp4|\.study-cache|Instagram transcript/i,
);
expect((await lintHyperframeHtml(html)).errorCount).toBe(0);
```

Add an escaping test with `A & B "quoted"` and assert the prose appears escaped rather than parsed as markup.

- [ ] **Step 2: Run the focused tests and verify the missing module failure**

```bash
npm test -- src/studies/designparser/hyperframes.test.ts
```

Expected: FAIL because the generator module is missing.

- [ ] **Step 3: Implement deterministic manifest generation**

Each slide receives a scene ID `${study.id}-slide-${index + 1}`, a six-second window, and concise project-owned speaker notes derived from its body. Return JSON with only a top-level `slides` array; do not add branches, media, autoplay, or fragment reveals in the first version.

- [ ] **Step 4: Implement one escaped visual grammar**

Generate a complete `<!doctype html>` document at `1920×1080` with:

- top-level scene compositions, no master-root composition;
- one claim per slide;
- CSS renderers for `rule`, `comparison`, `sequence`, and `layers` visuals;
- no remote images, media, source frames, or Designparser branding;
- a neutral project palette distinct from Instagram and Designparser;
- a pinned GSAP script URL `https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js`;
- one paused finite timeline per scene registered synchronously on `window.__timelines[sceneId]`;
- short opacity/translate entry motion; and
- a `matchMedia("(prefers-reduced-motion: reduce)")` branch that sets every element to its final visible state without tweening.

Place the same slideshow JSON island inside the composition so HyperFrames lint can validate scene relationships. Never call `play()`, use infinite repeats, wall-clock animation, randomness, `requestAnimationFrame`, or rendering APIs.

- [ ] **Step 5: Run HyperFrames lint over every synthetic visual variant**

Create one study fixture whose four slides exercise all four visual types. Assert zero lint errors, exactly four registered timeline keys, unique HTML IDs, finite six-second scenes, and no banned media/source tokens.

- [ ] **Step 6: Run generator checks**

```bash
npm test -- src/studies/designparser/hyperframes.test.ts
npm run typecheck
npm run lint
```

Expected: PASS.

- [ ] **Step 7: Commit composition generation**

```bash
git add src/studies/designparser/hyperframes.ts src/studies/designparser/hyperframes.test.ts
git commit -m "feat: generate interactive HyperFrames study decks"
```

---

### Task 8: Embed study decks in unlisted Next.js routes

**Files:**

- Create: `src/components/designparser-study-deck.tsx`
- Create: `src/components/designparser-study-deck.test.tsx`
- Create: `src/app/[lang]/studies/designparser/page.tsx`
- Create: `src/app/[lang]/studies/designparser/[reelId]/page.tsx`
- Create: `src/app/[lang]/studies/designparser/studies-pages.test.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**

- Consumes: reviewed collection and pure composition/manifest strings.
- Produces: `/en/studies/designparser` and `/en/studies/designparser/[reelId]`.
- Produces: client component props `{ label: string; composition: string; manifest: string }`.

- [ ] **Step 1: Re-read the installed framework guides required by `AGENTS.md`**

Read completely:

```bash
cat node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/dynamic-routes.md
cat node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-static-params.md
cat node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md
cat node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md
```

Carry forward the documented Next.js 16.3 contracts: `params` is a promise, metadata exports remain in Server Components, and client code is isolated below a narrow `"use client"` boundary.

- [ ] **Step 2: Write failing player-mount tests**

Mock `@hyperframes/player` and `@hyperframes/player/slideshow` as side-effect modules. Render `DesignparserStudyDeck`, flush effects, and assert its host contains:

```html
<hyperframes-slideshow tabindex="0" aria-label="Alignment study slides">
  <hyperframes-player
    interactive
    width="1920"
    height="1080"
  ></hyperframes-player>
  <script type="application/hyperframes-slideshow+json">
    ...
  </script>
</hyperframes-slideshow>
```

Assert the player receives the exact composition through `srcdoc`, the script receives the exact manifest through `textContent`, and unmount removes the custom-element subtree.

- [ ] **Step 3: Run the component test and verify it fails**

```bash
npm test -- src/components/designparser-study-deck.test.tsx
```

Expected: FAIL because the client component is missing.

- [ ] **Step 4: Implement the narrow client boundary**

In a `useEffect`, dynamically import both HyperFrames player entrypoints, create the two custom elements and JSON script through DOM methods, set `tabIndex = 0`, accessible label, `interactive`, `width`, `height`, and `srcdoc`, then replace the host contents once. Cancel and remove contents during cleanup. Do not render third-party HTML with React `dangerouslySetInnerHTML`; only the already escaped project-owned composition goes into the isolated player `srcdoc`.

- [ ] **Step 5: Write failing Server Component route tests**

Test the index against an empty collection and a mocked reviewed collection. Test the detail page with the synthetic study and assert:

- the page heading and original summary render;
- `@designparser` and the canonical external URL render;
- evidence timestamps render without transcript text;
- the generated deck client boundary receives strings;
- unknown reel IDs call `notFound`; and
- metadata includes `robots: { index: false, follow: false }`.

- [ ] **Step 6: Implement the unlisted index route**

The page validates `lang === "en"`, exports static metadata with `noindex, nofollow`, and lists only `designparserStudies`. When the array is empty, state that no reviewed studies are available. Use direct localized paths such as `/en/studies/designparser/${study.id}` without extending the public `RouteSegment` navigation union.

- [ ] **Step 7: Implement the static detail route**

Use:

```ts
export const dynamicParams = false;

export function generateStaticParams() {
  return getDesignparserStudyParams();
}
```

Await `params`, reject non-English locale or unknown ID with `notFound()`, generate title/description plus `robots: { index: false, follow: false }`, build composition and manifest on the server, and pass only serializable strings into the client deck.

- [ ] **Step 8: Add responsive study styles**

Add focused classes for study index cards, detail metadata, evidence chips, and a deck frame with `aspect-ratio: 16 / 9`, `overflow: hidden`, a dark fallback surface, and a width bounded by the existing shell. Give the custom elements `display: block; position: relative; width: 100%; height: 100%`. Preserve visible focus and existing mobile behavior; do not restyle global navigation.

- [ ] **Step 9: Run route, component, and build checks**

```bash
npm test -- src/components/designparser-study-deck.test.tsx src/app/[lang]/studies/designparser/studies-pages.test.tsx
npm run typecheck
npm run lint
npm run build
```

Expected: PASS. The build contacts no external source and succeeds with an empty reviewed collection.

- [ ] **Step 10: Commit the unlisted study surface**

```bash
git add src/components/designparser-study-deck.tsx src/components/designparser-study-deck.test.tsx src/app/[lang]/studies/designparser src/app/globals.css
git commit -m "feat: add unlisted Designparser study decks"
```

---

### Task 9: Extract the real profile and prepare human-reviewed English studies

**Files:**

- Private only: `.study-cache/designparser/**`
- Modify after approval: `src/studies/designparser/studies.ts`

**Interfaces:**

- Consumes: the authenticated Chrome session and local extraction CLI.
- Produces: one private extraction result per discovered reel, then one approved `DesignparserStudy` object per reviewed reel.
- Human gate: no `studies.ts` edit occurs before the maintainer approves the explicitly named study or batch.

- [ ] **Step 1: Verify local executables and authentication boundary**

Run:

```bash
npm run study:designparser -- preflight
```

If `gallery-dl` or `whisper` is missing, install the documented Homebrew formula and rerun preflight. Do not export browser cookies. Expected: Node, gallery-dl, FFmpeg, Whisper, writable cache, and gitignore checks pass.

- [ ] **Step 2: Discover the complete current reels feed**

```bash
npm run study:designparser -- discover
npm run study:designparser -- status
```

Expected: discovery completes with a nonzero reel count and prints the exact discovered total. A challenge, rate limit, or partial nonzero gallery-dl exit is a failure and must be resolved through normal sign-in or waiting, not bypassed.

- [ ] **Step 3: Process one smoke-test reel end to end**

```bash
npm run study:designparser -- extract --limit 1
npm run study:designparser -- status
```

Expected: the newest pending reel has `download`, `audio`, `transcript`, and `frames` complete; `draft` remains pending. Inspect `source.json`, listen only when transcript correction requires it, read the complete transcript, and view every scene frame.

- [ ] **Step 4: Create and validate the smoke-test private draft**

Use the concrete reel ID printed by `status` to open that reel's directory under `.study-cache/designparser/reels/`, then write its `draft.json` using the exact `PrivateDraft` schema. This file remains ignored. Every claim must cite a timestamp range, every slide must use original wording and one controlled original visual, and uncertainties must preserve unclear transcription rather than guessing.

Run:

```bash
npm run study:designparser -- validate-drafts
```

Expected: the smoke draft passes and its manifest `draft` stage becomes complete only after successful validation.

- [ ] **Step 5: Present the smoke study for explicit human approval**

Present, in this order:

1. reel ID and canonical URL;
2. project-owned summary;
3. principles and applications;
4. uncertainty notes;
5. evidence timestamp ranges;
6. complete 4–8 slide outline and visual types; and
7. confirmation that no copied transcript, frame, or source asset will be committed.

Stop. If revisions are requested, update only the private draft and rerun `validate-drafts`. Proceed to committed content only after approval.

- [ ] **Step 6: Add the approved smoke study to committed content**

Convert the approved private draft into one `DesignparserStudy` object in `studies.ts`. Add accurate `source.publishedAt`, `processedAt`, and the actual approval date as `reviewedAt`; set `status: "reviewed"`. Retain evidence timestamps but no transcript text or private paths.

Run:

```bash
npm test -- src/studies/designparser/model.test.ts src/studies/designparser/hyperframes.test.ts
npm run build
```

Expected: the new static route is generated and the composition has zero HyperFrames lint errors.

- [ ] **Step 7: Extract every remaining discovered reel**

```bash
npm run study:designparser -- extract
npm run study:designparser -- status --json
```

Expected: each discovered reel has either the first four stages complete or an explicit failed stage. Retry ordinary transient failures by rerunning; do not remove inaccessible reel records or claim complete coverage while failures are hidden.

- [ ] **Step 8: Draft the remaining studies in explicit review batches**

For every extraction-complete reel, read the complete transcript, visually inspect all scene frames, correct obvious recognition errors privately, and create a valid `draft.json`. Group drafts into clearly named batches of at most ten reel IDs so the maintainer can meaningfully review them. Run `validate-drafts`, then present each batch using the seven-field order from Step 5.

Stop after each batch. Apply requested revisions privately. Only an explicitly approved named batch may be copied into `studies.ts`.

- [ ] **Step 9: Add every approved batch to `studies.ts`**

For each approved draft, create exactly one reviewed English record and one 4–8-slide deck definition. Keep all summaries and visuals original, preserve uncertainty, and exclude raw evidence. Validate after every batch:

```bash
npm test -- src/studies/designparser/model.test.ts src/studies/designparser/hyperframes.test.ts
npm run typecheck
npm run build
```

Expected: every approved record passes, every route builds, and no extraction command runs during build.

- [ ] **Step 10: Prove profile coverage before committing content**

Compare `status --json` with `designparserStudies` and report three explicit sets:

- discovered and approved;
- discovered but awaiting review; and
- discovered with extraction failure.

Success requires no silently absent ID. The first release may retain visible awaiting-review or failed sets, but it cannot describe them as reviewed decks.

- [ ] **Step 11: Commit approved content only**

```bash
git add src/studies/designparser/studies.ts
git diff --cached --name-only
git commit -m "content: add reviewed Designparser reel studies"
```

Expected before commit: the staged name list contains only `src/studies/designparser/studies.ts`; `.study-cache/` and credential artifacts are absent.

---

### Task 10: Verify manual decks, reduced motion, discovery isolation, and full quality

**Files:**

- Create: `e2e/designparser-studies.spec.ts`
- Modify if an evidence-backed defect is found: files from Tasks 6–8 only

**Interfaces:**

- Consumes: at least one approved record from Task 9.
- Produces: browser proof that the live HyperFrames deck—not an MP4—works on desktop and mobile.

- [ ] **Step 1: Write the failing end-to-end tests**

Import `designparserStudies` and select its first record; fail immediately if none exists. Test:

```ts
test("a reviewed study is unlisted but directly usable", async ({ page }) => {
  const study = designparserStudies[0];
  await page.goto(`/en/studies/designparser/${study.id}`);

  await expect(
    page.getByRole("heading", { level: 1, name: study.title }),
  ).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex.*nofollow|nofollow.*noindex/,
  );
  await expect(
    page.getByRole("link", { name: /Open original reel/i }),
  ).toHaveAttribute("href", study.source.url);

  await expect(
    page.getByLabel(`Slide 1 of ${study.slides.length}`),
  ).toBeVisible();
  await page.getByRole("button", { name: "Next slide" }).click();
  await expect(
    page.getByLabel(`Slide 2 of ${study.slides.length}`),
  ).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByLabel(`Slide 3 of ${study.slides.length}`),
  ).toBeVisible();
});
```

Also test that the four-link primary navigation remains unchanged, `/en/references` and `/en/explore` contain no study link, unknown reel IDs return the not-found page, mobile has no horizontal overflow, and axe reports no detectable violations outside the isolated composition iframe.

- [ ] **Step 2: Add a reduced-motion browser case**

Use `page.emulateMedia({ reducedMotion: "reduce" })`, open the same study, enter the composition frame, and assert the first slide heading is visible at its final opacity while previous/next controls and ArrowRight navigation still work. Inspect the composition for absence of `<video>` and `<audio>`.

- [ ] **Step 3: Build and run the browser suite**

```bash
npm run build
npm run test:e2e -- e2e/designparser-studies.spec.ts
```

Expected: desktop and mobile Chromium pass.

- [ ] **Step 4: Run private-artifact and composition audits**

```bash
npm test -- scripts/designparser/private-files.test.ts src/studies/designparser/model.test.ts src/studies/designparser/hyperframes.test.ts
git ls-files | rg '(\.study-cache|cookies.*\.txt|instagram-session|source\.mp4|audio\.wav|transcript\.(json|txt)|frames/.+\.jpg)' && exit 1 || true
rg -n 'hyperframes render|<video|<audio|\.mp4' src/studies src/app/'[lang]'/studies src/components/designparser-study-deck.tsx
```

Expected: tests pass, the tracked-sensitive-file search prints nothing, and the source audit prints nothing.

- [ ] **Step 5: Run the complete deterministic quality gate**

```bash
npm run check
npm run test:e2e
git diff --check
git status --short
```

Expected: all checks pass and only the intended E2E file or evidence-backed fixes are uncommitted.

- [ ] **Step 6: Commit final browser coverage**

```bash
git add e2e/designparser-studies.spec.ts
git commit -m "test: verify interactive reel study decks"
```

- [ ] **Step 7: Record the final handoff facts**

Report:

- discovered reel count;
- completed extraction count;
- approved deck count;
- awaiting-review IDs;
- failed extraction IDs and stages;
- exact quality commands and results;
- confirmation that raw media, transcripts, frames, cookies, and MP4 output are untracked; and
- the unlisted index URL `/en/studies/designparser`.

Do not describe awaiting-review or failed reels as completed decks.
