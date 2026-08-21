# Designparser One-Shot Digest Design

## Goal

Provide one repository-local Codex skill invocation that discovers new Instagram reels and Designparser website rules, extracts new reel media with Whisper and scene frames, writes objective English and Korean analyses, and updates both private digests atomically.

## Architecture

Keep deterministic work in TypeScript and editorial judgment in a thin skill. A `prepare` command reuses the existing resumable reel extractor, snapshots `https://designparser.de/data/rules.json`, compares it with the accepted private snapshot, and writes a delta-only review bundle. The skill reads only those new or changed records, writes bilingual structured results, and calls `finalize`.

`finalize` validates every pending result, renders transcript text from the cached Whisper segments, merges website subjects, sorts reels oldest-to-newest, renumbers links and anchors, and replaces both digest files together only after all checks pass. It then promotes the website snapshot to accepted state. Failed extraction or incomplete analysis leaves both digests unchanged while preserving reusable cache artifacts.

## Token and Privacy Constraints

- Load only pending reel metadata, Whisper segments, representative scene frames, and changed website rules.
- Do not load or regenerate existing analysis text.
- Keep media, transcripts, snapshots, pending bundles, and results under `.study-cache/designparser/`.
- Never copy Chrome cookies or private source media into tracked files.
- Do not create Slides or Frames sections in either digest.
- Generate no videos.

## Interface

The repository-local `designparser-digest` skill runs:

1. `npm run study:designparser:update -- prepare`
2. Review the reported delta and create its bilingual result file.
3. `npm run study:designparser:update -- finalize`
4. Report counts and any failure.

The skill does not pause for per-item approval. If any stage fails, it stops before digest mutation.

## Verification

Tests cover first-run website bootstrapping, changed/new-item detection, incomplete-result rejection, canonical reel ordering and renumbering, bilingual parity, prohibited section rejection, and atomic promotion. Existing Designparser CLI tests remain green.
