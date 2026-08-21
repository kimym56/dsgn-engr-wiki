# Designparser reel studies design

Date: 2026-08-12

## Summary

Create a repeatable, maintainer-run workflow that discovers the public reels on the authenticated `designparser` Instagram profile, downloads private working copies, transcribes them locally with Whisper, extracts scene-change keyframes, and turns reviewed learning into one original interactive HyperFrames slideshow per reel inside the Next.js wiki.

English is canonical. The route and content model reserve a path for reviewed Korean translations later. Raw reels, audio, transcripts, extracted frames, browser data, and unreviewed generated drafts never enter version control. The committed wiki contains attribution, project-owned synthesis, and original explanatory visuals rather than a mirror of the source material.

## Goals

- Enumerate all public reels returned by the authenticated `designparser` reels feed, following pagination until the feed is exhausted.
- Make later runs incremental and resumable so newly published reels can be added without reprocessing completed work.
- Transcribe downloaded reel audio locally with Whisper and preserve timestamped segments for private verification.
- Extract scene-change keyframes for private visual analysis.
- Require human review before any study record or deck is written into the wiki.
- Create one manually navigated English deck per reviewed reel.
- Embed native HyperFrames slideshow behavior in unlisted Next.js study routes.
- Preserve clear source attribution while expressing every summary, principle, diagram, and application example in project-owned language and visuals.
- Reserve an explicit relationship for future reviewed Korean translations without publishing Korean routes now.

## Non-goals

- Do not copy, republish, or expose the creator's reel files, audio, transcript, captions, frames, screenshots, branding, visual identity, or substantive wording.
- Do not automatically publish AI-generated summaries or decks.
- Do not combine multiple reels into one deck in the first version.
- Do not generate, render, store, or publish MP4 output from HyperFrames.
- Do not add the study area to the site header, footer, References, Explore, collections, sitemap, or public reference index.
- Do not treat an unlisted URL as access control. Anyone who knows a deployed study URL can open it.
- Do not add accounts, a database, a CMS, background jobs, cloud transcription, embeddings, vector search, or automatic Korean translation.
- Do not bypass authentication challenges, rate limits, removed content, private content, or platform access controls.

## Source and authorization boundary

The only collection target is the maintainer-supplied profile:

```text
https://www.instagram.com/designparser/reels/
```

The importer runs manually on the maintainer's Mac and may read the existing signed-in Chrome session for Instagram cookies. It must never print, export, copy into the project, or commit cookie values, passwords, browser databases, or a reusable session file.

Use an authenticated extractor that supports Instagram's `reels` profile feed and browser-cookie input. The initial implementation should prefer `gallery-dl` configured with:

- the exact `designparser` profile URL;
- `include: reels` so ordinary posts, stories, highlights, tagged media, avatar, and profile assets are excluded;
- Chrome as the cookie source;
- conservative request pacing; and
- no maximum post count, so pagination continues until exhaustion.

The workflow processes only media the authenticated account can normally view. A login challenge, consent screen, rate limit, unavailable reel, removed reel, or private-content boundary stops or records the affected operation; the importer must not evade it. Platform behavior is external and unstable, so authenticated discovery is an explicitly replaceable adapter rather than part of the study model.

For this project, “all reels” means every reel ID returned by a successful, fully paginated authenticated enumeration at the time of the run. It does not promise access to deleted, removed, geographically restricted, age-restricted, or otherwise unavailable material.

## Architecture

The workflow has three boundaries:

1. **Private extraction** discovers reels, downloads media, extracts audio and frames, and runs Whisper inside a gitignored cache.
2. **Human-reviewed synthesis** converts private evidence into an original English study draft and requires explicit maintainer approval.
3. **Wiki presentation** validates committed study data and displays one native HyperFrames slideshow at an unlisted locale-prefixed route.

The extraction pipeline is an authoring tool, not a production runtime dependency. Public page requests and production builds never contact Instagram, invoke Whisper or `ffmpeg`, read Chrome, or require the private cache. The application renders deterministically from reviewed, version-controlled study records and deck compositions.

## Private working cache

Use a repository-local cache root so the workflow is discoverable while its content remains excluded:

```text
.study-cache/
└── designparser/
    ├── manifest.json
    └── reels/
        └── <reel-id>/
            ├── source.json
            ├── source.mp4
            ├── audio.wav
            ├── transcript.json
            ├── transcript.txt
            ├── frames/
            │   └── <timestamp>.jpg
            └── draft.json
```

`.study-cache/` must be ignored as a whole. Tests use synthetic fixtures outside that directory and must not require real source files.

The cache manifest records the exact profile, discovery time, reel IDs, canonical reel URLs, observed source metadata, and per-stage state. Each stage is one of `pending`, `running`, `complete`, or `failed`, with a timestamp and a concise error when failed. A stale `running` state from an interrupted process is safe to retry.

The cache is private working material, not durable project knowledge. Deleting it loses extraction progress but must not break the wiki or its build. Rerunning the importer reconstructs it from currently accessible source material.

## Extraction pipeline

The maintainer runs one local command with an optional single-reel smoke-test mode. The command executes these stages in order:

1. **Preflight** — verify the exact target handle, required local executables, writable cache, and that `.study-cache/` is ignored.
2. **Discover** — enumerate the authenticated reels feed through all available pages and normalize each result to a stable reel ID and canonical reel URL.
3. **Reconcile** — add newly observed IDs to the private manifest, retain earlier records, and skip stages already marked complete with their expected output present.
4. **Download** — save the source video and minimal observed metadata for one reel at a time.
5. **Extract audio** — use `ffmpeg` to produce Whisper-compatible mono audio without altering the source file.
6. **Transcribe** — run local Whisper in English transcription mode and store timestamped JSON plus a readable text derivative.
7. **Extract frames** — use `ffmpeg` scene-change detection to save keyframes with timestamp-based filenames. The first version uses one documented threshold shared by all reels; calibration is allowed through one command option because source editing styles vary.
8. **Draft** — prepare private candidate notes containing a summary, principles, evidence timestamps, uncertainties, suggested original visuals, and a 4–8 slide outline.
9. **Review** — stop before committed writes and present the draft, transcript corrections, proposed files, source attribution, and deck outline to the maintainer.
10. **Publish approved study** — only after explicit approval, write the sanitized English study record and its HyperFrames composition, then run validation.

The default batch operation may extract every discovered reel, but approval remains per study or per explicitly named reviewed batch. Extraction approval does not imply publication approval.

## Transcript and evidence handling

Whisper runs locally; no audio or transcript is sent to a cloud transcription API. The transcript language is English for the first version. Timestamped segments remain private evidence used to verify project-written claims.

The private draft may link notes to transcript timestamps and frame timestamps. The committed study record may retain concise timestamp references such as `00:12–00:18` for editorial traceability, but it must not contain the corresponding copied passage or frame. Human corrections to names, technical terms, and obvious recognition errors are recorded in the private draft before synthesis.

If Whisper cannot establish a reliable reading, the reel stays in `needs-review` editorial state inside the private draft even when the transcription command technically completed. The system must not convert uncertain words into confident claims.

## Committed study model

Each approved English reel study has a stable ID derived from the Instagram reel shortcode or media ID and stores:

- `id`;
- `locale: en`;
- optional future `translationOf` relationship;
- canonical Instagram reel URL;
- creator handle and display attribution;
- original publication date when observable;
- processing and substantive review dates;
- project-owned title and concise summary;
- project-owned key principles;
- project-owned practical applications;
- constraints, counterexamples, or uncertainty notes;
- private-evidence timestamp references without copied transcript text;
- ordered slide metadata; and
- editorial status.

Only `reviewed` studies are routable. Draft synthesis stays in the private cache. A committed study never refers to a private cache path and remains valid when `.study-cache/` is absent.

English is the canonical study language. Future Korean content must use the same stable reel ID, declare `locale: ko`, point to the English record through `translationOf`, and receive separate human review. The first implementation does not enable `/ko/studies` or expose a language switcher.

## Deck contract

Each reviewed reel owns exactly one HyperFrames slideshow composition. The expected deck contains 4–8 slides, selected from this editorial sequence:

1. topic and source attribution;
2. design problem;
3. core principle;
4. original explanatory diagram or abstract interface model;
5. practical application;
6. constraint or counterexample; and
7. takeaway.

The sequence is guidance, not a requirement to pad every deck to seven slides. Every slide carries one claim and one useful visual. All visual assets are original project-owned HTML/CSS shapes, typography, diagrams, or abstractions. Source screenshots, extracted frames, copied UI, brand styling, captions, and footage are forbidden in the committed deck.

The deck uses HyperFrames' live slideshow mode and embeddable player rather than its renderer. It must provide:

- visible previous and next controls;
- Left/Right Arrow navigation;
- a visible current-slide and total-slide indicator;
- a meaningful slide heading and accessible control names;
- brief entry motion when a slide becomes active;
- deterministic finite GSAP timelines registered through the HyperFrames composition contract;
- responsive containment inside the wiki page; and
- a `prefers-reduced-motion: reduce` treatment that removes nonessential movement while preserving all content and navigation.

There is no autoplay between slides. A user action may replay or advance a finite entry animation, but navigation remains manual. Do not add audio, voiceover, source video, an export button, a render script, or a `hyperframes render` command. HyperFrames itself documents slideshows as live navigable decks rather than linear MP4s; the project preserves that boundary.

## Next.js routes and discovery

Add these English routes:

```text
/en/studies/designparser
/en/studies/designparser/<reel-id>
```

The index lists reviewed Designparser studies only. Individual pages show project-owned context, clear creator attribution, the canonical external reel link, the embedded deck, and any concise uncertainty note needed to interpret the study.

The study routes are intentionally unlisted drafts:

- no header or footer navigation link;
- no References or Explore relationship;
- no entry in `references/index.md`;
- no sitemap entry;
- page metadata requests `noindex, nofollow`; and
- no implication that the deck is endorsed by or affiliated with Designparser.

The routes remain accessible to anyone who knows their deployed URLs. If actual privacy is later required, authentication or deployment exclusion needs a separate design.

## Failure and resume behavior

Failures are isolated by reel and stage:

- Missing executable or unreadable Chrome authentication fails preflight before collection begins.
- Authentication, challenge, or rate-limit responses stop discovery without treating a partial listing as complete.
- A failure downloading one known reel records that reel's error and may allow other already discovered reels to continue.
- Audio, Whisper, or frame extraction failure records the failed stage and preserves completed upstream artifacts for retry.
- Empty or implausible transcription requires review and cannot produce an approved study automatically.
- A missing private cache never breaks an existing wiki route or production build.
- A malformed or incomplete committed study fails local validation and the build.
- A HyperFrames composition contract or runtime error fails deck validation before the study is considered complete.

The importer does not silently delete manifest entries when reels disappear. It records the later access failure so the maintainer can decide whether to retain, revise, or remove the corresponding study.

## Validation and testing

### Importer checks

- Unit tests cover discovery-result normalization, stable reel IDs, duplicate suppression, manifest parsing, stage transitions, stale-run recovery, output-presence checks, and transcript timestamp normalization.
- Synthetic command fixtures cover successful extraction and failures from each external executable without accessing Instagram.
- A repository check proves `.study-cache/`, common reel media formats, extracted audio, transcript derivatives, frames, cookie exports, and browser-session artifacts are ignored or rejected from commits.
- One explicitly selected reel is processed end to end as a manual smoke test before the full profile batch.
- A completed full enumeration reports the discovered total, completed extraction total, and every explicit failure; silent omissions are not accepted as success.

### Content and deck checks

- Schema validation rejects missing attribution, non-Instagram canonical URLs, unsupported locales, unknown translation relationships, copied-media paths, invalid slide order, and routable records without `reviewed` status.
- Component tests verify attribution, external source link, slide count, initial state, previous/next behavior, keyboard navigation, boundary-disabled controls, and progress state.
- Reduced-motion tests verify that content and navigation remain available with entry motion disabled.
- HyperFrames lint and runtime checks validate the composition contract without rendering an MP4.
- Browser tests cover the index and one representative deck on mobile and desktop, including keyboard operation and automated accessibility checks.
- The existing format, lint, typecheck, unit, build, and end-to-end gates continue to pass.

## Acceptance criteria

The first version is complete when:

1. A maintainer can run one documented command that authenticates from Chrome, fully enumerates the current `designparser` reels feed, and resumes safely after interruption.
2. One-reel smoke testing and the full extraction pipeline create only gitignored local media, Whisper transcripts, frames, and draft notes.
3. Every discovered reel ends the run with either completed private extraction or a visible per-stage failure.
4. No study or deck is committed without explicit human review.
5. Each reviewed reel has one English study record and one native HyperFrames slideshow at its stable unlisted Next.js route.
6. The deck is manually navigable, accessible, reduced-motion aware, and made entirely from original project-owned prose and visuals.
7. No MP4 renderer or generated video output is present.
8. Production builds and page requests operate without Instagram, Chrome, Whisper, `ffmpeg`, or the private cache.

## Review boundary

Approval of this design authorizes an implementation plan for the local extraction workflow, reviewed study model, unlisted Next.js routes, and non-rendering HyperFrames slideshow integration. It does not authorize copying source material, publishing unreviewed synthesis, making the study routes discoverable in the public reference library, enabling Korean content, or expanding collection beyond the exact maintainer-supplied Designparser profile.
