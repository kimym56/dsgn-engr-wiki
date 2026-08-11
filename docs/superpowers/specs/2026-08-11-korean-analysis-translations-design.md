# Korean source-analysis translations design

Date: 2026-08-11

## Summary

Add Korean review translations for the five Batch 1 source analyses without changing the English analyses' canonical role, editorial recommendations, evidence, or publication state. The translations help the maintainer review draft analyses; they are not published Korean reference metadata and do not authorize product-design adoption.

## Goals

- Make every Batch 1 source analysis readable in Korean.
- Keep each Korean file visibly linked to its canonical English analysis.
- Preserve source claims, editorial judgments, uncertainties, and unresolved human decisions without adding new conclusions.
- Make the translations discoverable from the reference index and activity log.
- Establish a folder convention that can later accommodate Korean concept-synthesis translations.

## Non-goals

- Do not translate or create reference records.
- Do not publish Korean metadata or enable Korean application routes.
- Do not change English source analyses, human-review decisions, counts, reference status, or concept synthesis.
- Do not add evidence, inspect sources again, or infer missing visual, runtime, responsive, motion, or accessibility behavior.
- Do not create product UI, language controls, or localization infrastructure.

## Directory structure

Use a locale layer inside the analysis domain:

```text
references/analyses/
├── sources/
│   ├── deng-design-engineering-directory.md
│   ├── designparser-design-rules-cheatsheet.md
│   ├── devouring-details.md
│   ├── emil-course-platform.md
│   └── emil-kowalski.md
└── ko/
    └── sources/
        ├── deng-design-engineering-directory.md
        ├── designparser-design-rules-cheatsheet.md
        ├── devouring-details.md
        ├── emil-course-platform.md
        └── emil-kowalski.md
```

`references/analyses/ko/sources/` is preferred over `references/ko/analyses/sources/` because the files remain part of the analysis system. It is preferred over `references/analyses/sources/ko/` because a future `references/analyses/ko/concepts/` directory can use the same locale layer without repeating locale folders under every analysis type.

## Translation contract

Each Korean file must:

1. Use the same filename as its canonical English analysis.
2. Preserve the English frontmatter values exactly: `reference_id`, external-resource `title`, `canonical_url`, `analyzed`, and `status`.
3. Add this translated-document notice immediately after frontmatter, using the correct relative link:

   ```markdown
   > 이 문서는 [영문 원본](../../sources/emil-course-platform.md)의 한국어 검토용 번역본입니다. 영문 원본을 기준 분석으로 사용합니다.
   ```

   The example uses `emil-course-platform.md`; every other translation substitutes its own unchanged filename.

4. Translate every analysis heading and all project-owned prose into natural Korean.
5. Preserve external titles, proper names, URLs, reference IDs, Area IDs, format values, code identifiers, and recommendation/status tokens such as `review` and `draft` when translation could weaken identity or machine readability.
6. Preserve the distinction among direct observations, source-reported claims, editorial judgment, uncertainty, and human decisions.
7. Keep the Human review fields blank.
8. Add no claim, evidence, recommendation, approval, or product-adoption conclusion that is absent from the English original.

The Korean files are review aids. Their existence does not satisfy the content-strategy requirement for reviewed Korean reference metadata because no reference record is being translated or published.

## Index and history

Update `references/index.md` without changing workflow counts:

- Keep `Source analyses: 5` because there are five canonical source analyses, not ten independent analyses.
- Keep the existing canonical English links unchanged.
- Add a `### Korean review translations` subsection under `## Source analyses` with links to the five Korean files.
- Do not move any item out of `Awaiting human review` or resolve any issue.

Append one entry to `references/log.md`:

```markdown
## [2026-08-11] review | Korean Batch 1 analysis translations added

- Change: Added Korean review translations for the five Batch 1 source analyses and linked them from the reference index.
- Affected IDs: designparser-design-rules-cheatsheet, deng-design-engineering-directory, emil-kowalski, devouring-details, emil-course-platform.
- Approval: The maintainer approved Korean review-aid translations while keeping the English analyses canonical.
```

Use the existing `review` operation because these translations support editorial review and do not ingest new evidence or create published metadata.

## Validation

Verification must confirm:

- exactly five Korean files exist and each has a same-named English source;
- every Korean notice resolves to the correct English file;
- frontmatter values match each English source exactly;
- all source-analysis template sections are represented in Korean;
- Human review fields remain blank;
- English analyses and `references/inbox.md` are unchanged;
- index links resolve and workflow counts remain unchanged;
- the log change is append-only;
- formatting checks and the full test suite pass.

## Review boundary

Human approval of this design authorizes faithful Korean review translations and their index/log entries only. It does not approve the underlying sources, their publication, any concept synthesis, or any product UI pattern.
