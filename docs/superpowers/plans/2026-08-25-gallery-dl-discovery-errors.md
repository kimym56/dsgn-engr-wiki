# Gallery-dl Discovery Errors Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Report embedded gallery-dl discovery failures accurately while preserving valid reel discovery and genuine empty-result handling.

**Architecture:** Extend the existing `discoverReels` adapter at the JSON trust boundary. Inspect type-`-1` messages before reel normalization, sanitize and bound the diagnostic, and keep all existing type-`3` collection behavior unchanged.

**Tech Stack:** TypeScript, Node.js 22.17.0, Vitest 4.1.10

## Global Constraints

- Do not add dependencies, retries, alternate scrapers, or sandbox-bypass behavior.
- Do not expose media URLs, signed query strings, or cookie data in errors.
- Preserve nonzero-exit, interruption, malformed-output, and genuinely-empty-result behavior.

---

### Task 1: Detect Embedded Discovery Errors

**Files:**

- Modify: `scripts/designparser/commands.ts:114-163`
- Test: `scripts/designparser/commands.test.ts:103-122`

**Interfaces:**

- Consumes: parsed gallery-dl messages returned by `JSON.parse(result.stdout)`.
- Produces: existing `discoverReels(runner?: CommandRunner): Promise<DiscoveredReel[]>`, now rejecting type-`-1` gallery-dl responses with a concise diagnostic.

- [ ] **Step 1: Write the failing regression test**

Add this assertion to the malformed, challenged, and empty response test before the empty-array assertion:

```ts
await expect(
  discoverReels(
    runner({
      code: 0,
      stdout: JSON.stringify([
        [
          -1,
          {
            error: "HttpError",
            message:
              "NameResolutionError:\nCookie: sessionid=one; ig_did=two\nAuthorization: Bearer bearer-secret\nFailed to resolve HTTP://www.instagram.com/private?token=secret sessionid=super-secret",
          },
        ],
      ]),
      stderr: "",
    }),
  ),
).rejects.toThrow(
  /^gallery-dl discovery error: HttpError: NameResolutionError: Cookie=\[REDACTED\] Authorization=\[REDACTED\] Failed to resolve \[URL\] sessionid=\[REDACTED\]$/,
);
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```bash
nvm exec 22.17.0 npm test -- scripts/designparser/commands.test.ts
```

Expected: FAIL because the adapter currently reports `gallery-dl discovery found no reels`.

- [ ] **Step 3: Implement bounded embedded-error reporting**

Add these helpers near `hasInterruption`:

```ts
function sanitizedDiagnostic(value: unknown) {
  if (typeof value !== "string") return "";
  return value
    .replace(
      /\b(set-cookie|cookie|authorization)\s*[:=][^\r\n]*/gi,
      "$1=[REDACTED]",
    )
    .replace(/[\u0000-\u001f\u007f-\u009f]+/g, " ")
    .replace(/\bhttps?:\/\/\S+/gi, "[URL]")
    .replace(
      /\b(cookie|cookies|session(?:id)?|csrftoken|token|auth(?:orization)?|password|passwd|secret)\s*[:=]\s*[^\s,;]+/gi,
      "$1=[REDACTED]",
    )
    .replace(/\s+/g, " ")
    .trim();
}

function embeddedDiscoveryError(messages: unknown[]) {
  for (const message of messages) {
    if (!Array.isArray(message) || message[0] !== -1 || !isObject(message[1]))
      continue;
    const payload = message[1];
    const rawName = sanitizedDiagnostic(payload.error);
    const name = /^[A-Za-z][A-Za-z0-9_.-]{0,63}$/.test(rawName) ? rawName : "";
    const detail = sanitizedDiagnostic(payload.message);
    const cause = [name, detail].filter(Boolean).join(": ").slice(0, 240);
    return cause
      ? `gallery-dl discovery error: ${cause}`
      : "gallery-dl discovery error";
  }
}
```

After validating that `messages` is an array and before collecting reels, add:

```ts
const embeddedError = embeddedDiscoveryError(messages);
if (embeddedError) throw new Error(embeddedError);
```

- [ ] **Step 4: Run focused and repository verification**

Run:

```bash
nvm exec 22.17.0 npm test -- scripts/designparser/commands.test.ts
nvm exec 22.17.0 npm run typecheck
nvm exec 22.17.0 npm run format:check -- scripts/designparser/commands.ts scripts/designparser/commands.test.ts
```

Expected: all commands pass.

- [ ] **Step 5: Run the complete digest workflow with network access**

From the main worktree containing the ignored private `.study-cache/designparser/reels-digest.md` and `.study-cache/designparser/reels-digest-ko.md` files, run `npm run study:designparser:update -- prepare` using Node 22.17.0 and network access. If preparation succeeds, follow `.agents/skills/designparser-digest/SKILL.md` exactly through pending analysis and `finalize`; otherwise stop without editing either digest.

- [ ] **Step 6: Commit the implementation**

```bash
git add scripts/designparser/commands.ts scripts/designparser/commands.test.ts docs/superpowers/plans/2026-08-25-gallery-dl-discovery-errors.md docs/ko/superpowers/plans/2026-08-25-gallery-dl-discovery-errors.md
git commit -m "fix: report gallery discovery errors"
```
