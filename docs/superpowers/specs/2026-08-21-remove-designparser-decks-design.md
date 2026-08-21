# Remove Designparser Decks

## Decision

Remove the unused HyperFrames-powered Designparser study presentation subsystem from the Next.js wiki. The private reel knowledge archive and recurring ingestion workflow remain the source of truth.

## Remove

- HyperFrames runtime and lint dependencies.
- HyperFrames composition generation and tests.
- The client-side study-deck player and tests.
- The unlisted Designparser study index and detail routes.
- Browser tests that exercise those routes.
- CSS used only by the removed study pages and deck player.
- Study records and validation code only when no retained ingestion or digest workflow imports them.

## Preserve

- English and Korean reel digests.
- Study notes.
- Downloaded private source media, Whisper transcripts, extracted scene frames, and their privacy protections.
- Instagram and designparser.de discovery, extraction, transcription, frame extraction, and digest-update scripts.
- The one-shot `designparser-digest` skill.
- Historical specifications and plans, which remain an audit record of the earlier approach.

## Resulting Flow

The recurring workflow discovers new material, stores private extraction artifacts, and updates the English and Korean Markdown digests. It no longer produces interactive slide data, Next.js study routes, motion graphics, or HyperFrames compositions.

## Verification

- Search the active application and package manifests for remaining HyperFrames or deck references.
- Run formatting, linting, type checking, unit tests, the production build, and the remaining browser tests.
- Confirm the reel digests and ingestion scripts remain present.
- Confirm private media and extraction artifacts remain excluded from Git.
