---
name: designparser-digest
description: Fetch and process new @designparser Instagram reels and new or changed designparser.de rules, then update the private English and Korean reel digests in one shot. Use when asked to check for new Designparser content, extract reels with Whisper and scene frames, refresh reels-digest.md, or run the recurring Designparser study workflow.
---

# Designparser Digest

Run the complete workflow without intermediate approval prompts. Keep analysis factual and source-bound; do not add personal opinions.

## Workflow

1. From the repository root, run:

   ```bash
   npm run study:designparser:update -- prepare
   ```

2. Stop immediately on a nonzero exit. Report the failed stage; do not edit either digest.

3. Read only `.study-cache/designparser/pending-update.json`. Do not load either complete digest.

4. If both arrays are empty, write this exact private result and continue to finalization:

   ```json
   { "version": 1, "reels": [], "site": [] }
   ```

5. For each pending reel:

   - Use the included source metadata and Whisper segments.
   - Inspect at most six listed frames: first, last, and evenly distributed interior frames. Inspect all frames when six or fewer exist.
   - Write objective English and Korean analysis. State unsupported or uncited claims under uncertainties.
   - Keep evidence timestamps within the reel duration.
   - Translate every Whisper segment into Korean in the same order. Do not merge or split segments.

6. For each pending website rule, use only its included `rule` object. Produce one complete English appendix subject block and one Korean translation block. Preserve its rule ID, source URL, media URLs, numeric claims, caveats, and source attribution. Replace changed subjects rather than preserving history.

7. Write `.study-cache/designparser/pending-result.json` with this shape:

   ```json
   {
     "version": 1,
     "reels": [
       {
         "id": "reel-id",
         "en": {
           "title": "Objective title",
           "summary": "Source-bound summary.",
           "principles": ["Principle."],
           "applications": ["Application."],
           "uncertainties": ["Uncertainty or source limitation."],
           "evidence": [
             { "start": 0, "end": 3.2, "label": "Claim shown or spoken." }
           ]
         },
         "ko": {
           "title": "객관적인 제목",
           "summary": "출처에 근거한 요약.",
           "principles": ["원칙."],
           "applications": ["적용."],
           "uncertainties": ["불확실성 또는 출처 한계."],
           "evidence": [
             { "start": 0, "end": 3.2, "label": "보이거나 말해진 주장." }
           ],
           "transcript": ["첫 번째 Whisper 구간의 한국어 번역"]
         }
       }
     ],
     "site": [
       {
         "id": "rule-id",
         "enMarkdown": "#### Complete English subject block — `rule-id` ...",
         "koMarkdown": "#### 완전한 한국어 주제 블록 — `rule-id` ..."
       }
     ]
   }
   ```

   Include every pending ID exactly once and no other IDs. Never include source-media paths, HTML slides, or frame sections in analysis objects.

8. Run:

   ```bash
   npm run study:designparser:update -- finalize
   ```

9. Stop on any validation failure. Do not patch digests manually. On success, report new reel count, changed site-subject count, and total reel count.

## Invariants

- Treat English as canonical and Korean as its complete translation.
- Preserve private artifacts under `.study-cache/designparser/`.
- Generate no video and no HyperFrames output.
- Do not create `Slides`, `Frames`, `슬라이드`, or `프레임` sections.
- Let the finalizer control ordering, numbering, links, and atomic digest replacement.
