# Report Gallery-dl Discovery Errors

## Problem

`gallery-dl --dump-json` can exit successfully while returning an embedded type-`-1` error message. The Designparser discovery adapter currently ignores every message except type `3`, so a network failure is misreported as `gallery-dl discovery found no reels`. This hides the operational cause and makes a populated Instagram profile look empty.

## Decision

Validate parsed discovery messages for embedded gallery-dl errors before collecting reel downloads. If an error message exists, fail discovery with a concise cause derived from its error name and message. Preserve the existing nonzero-exit, interruption, malformed-output, and genuinely-empty-result behavior.

Network access remains an execution-environment permission. The repository will not add retries, alternate scrapers, or code that attempts to bypass the sandbox.

## Data Flow

1. Run `gallery-dl` with the existing profile URL, Chrome cookies, and reel-only options.
2. Validate the process exit and parse its JSON output.
3. Detect embedded type-`-1` error messages and stop with their reported cause.
4. Normalize valid type-`3` reel messages using the existing filters and ordering.
5. Report `gallery-dl discovery found no reels` only when the parsed response contains neither an embedded error nor a valid reel.

## Error Handling

Treat an embedded message as an error only when it has the gallery-dl type-`-1` shape and an object payload. Produce a bounded, non-sensitive diagnostic from string `error` and `message` fields; fall back to a generic embedded-error message if those fields are absent. Do not include media URLs or cookie data.

## Verification

- Add a focused adapter test proving a type-`-1` DNS failure reports its real cause instead of `gallery-dl discovery found no reels`.
- Retain the existing empty-array test to protect genuine empty discovery behavior.
- Run the Designparser command-adapter tests.
- Run the complete digest prepare and finalize workflow with network permission.
