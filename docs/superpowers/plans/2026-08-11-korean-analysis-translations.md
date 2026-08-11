# Korean Source-Analysis Translations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add faithful Korean review translations for the five canonical English Batch 1 source analyses and make them discoverable without changing editorial state or publication scope.

**Architecture:** Keep English analyses canonical under `references/analyses/sources/` and add same-named Korean review aids under `references/analyses/ko/sources/`. Each Korean file preserves English frontmatter and claims, adds a canonical-source notice, and translates only project-owned prose; the index lists translations separately while the log records the approved review-aid operation.

**Tech Stack:** Markdown, Git, shell verification with `rg`/`diff`/`test`, Node.js 22.17.0, Vitest

## Global Constraints

- Canonical English analyses under `references/analyses/sources/` remain unchanged.
- Korean translations live only under `references/analyses/ko/sources/` and use the same filenames as their English sources.
- Preserve `reference_id`, `title`, `canonical_url`, `analyzed`, and `status` frontmatter values exactly in every pair.
- Add a Korean review-translation notice after frontmatter linking through `../../sources/` to the file's unchanged filename.
- Translate headings and project-owned prose into natural Korean while preserving external titles, proper names, URLs, reference IDs, Area IDs, format values, code identifiers, and machine-readable recommendation/status tokens.
- Preserve direct observations, source-reported claims, editorial judgment, uncertainty, access limitations, and unresolved human decisions without adding evidence or changing conclusions.
- Keep Human review fields blank.
- Do not create reference records, concept pages, Korean application routes, language controls, localization infrastructure, or product UI changes.
- Keep workflow counts unchanged: the five Korean files are translations of five canonical analyses, not additional analyses.
- Do not resolve any awaiting-review item or issue and do not modify `references/inbox.md`.

---

### Task 1: Establish the Korean analysis convention with the course-platform translation

**Files:**
- Create: `references/analyses/ko/sources/emil-course-platform.md`
- Read: `references/analyses/sources/emil-course-platform.md`
- Test: `references/analyses/ko/sources/emil-course-platform.md`

**Interfaces:**
- Consumes: the canonical English analysis and `docs/superpowers/specs/2026-08-11-korean-analysis-translations-design.md`.
- Produces: the directory convention, notice, and Korean heading vocabulary reused by later tasks.

- [ ] **Step 1: Confirm source exists and target does not**

```bash
test -f references/analyses/sources/emil-course-platform.md
test ! -e references/analyses/ko/sources/emil-course-platform.md
```

Expected: both commands exit 0. Read the English file completely.

- [ ] **Step 2: Create the complete Korean translation**

Preserve the English frontmatter exactly and add:

```markdown
> 이 문서는 [영문 원본](../../sources/emil-course-platform.md)의 한국어 검토용 번역본입니다. 영문 원본을 기준 분석으로 사용합니다.
```

Use this exact heading vocabulary:

```markdown
# 자료 분석: How I built my course platform
## 편집 평가
### 범위 적합성
### 권위와 지속 가능성
### 중복 및 분류
### 편집 권고
## 웹사이트 디자인 분석
### 정보 계층과 탐색
### UI, 인터랙션 및 모션
### 그리드, 레이아웃 및 반응형 동작
### 타이포그래피, 색상 및 시각적 리듬
### 접근성 관찰
### 전이 가능한 원칙
### 복제하지 않아야 할 출처 고유 표현
## 근거와 불확실성
## 사람 검토
```

Translate every paragraph and list in source order. Preserve `Emil Kowalski`, `How I built my course platform`, `MDX`, vendor/framework names, Area IDs, `article`, `en`, `review`, and `draft`. Keep Human review blank as `검토자:`, `결정:`, `검토일:`, and `메모:`.

- [ ] **Step 3: Verify structure and canonical immutability**

```bash
rg -n '^> 이 문서는 \[영문 원본\]\(\.\./\.\./sources/emil-course-platform\.md\)' references/analyses/ko/sources/emil-course-platform.md
rg -n '^## (편집 평가|웹사이트 디자인 분석|근거와 불확실성|사람 검토)$' references/analyses/ko/sources/emil-course-platform.md
git diff --exit-code HEAD -- references/analyses/sources/emil-course-platform.md references/inbox.md
git diff --check
```

Expected: one notice, four level-two sections, no English/inbox changes, and no whitespace errors.

- [ ] **Step 4: Run tests and commit**

```bash
PATH=/Users/yongminkim/.nvm/versions/node/v22.17.0/bin:/usr/bin:/bin npm test
git add references/analyses/ko/sources/emil-course-platform.md
git commit -m "docs: translate course platform analysis"
```

Expected: 4 test files and 9 tests pass before commit.

---

### Task 2: Translate Devouring Details and Designparser

**Files:**
- Create: `references/analyses/ko/sources/devouring-details.md`
- Create: `references/analyses/ko/sources/designparser-design-rules-cheatsheet.md`
- Read: `references/analyses/sources/devouring-details.md`
- Read: `references/analyses/sources/designparser-design-rules-cheatsheet.md`

**Interfaces:**
- Consumes: Task 1 heading vocabulary and the two same-named English analyses.
- Produces: Korean review translations for the paid reference manual and rule-lookup tool.

- [ ] **Step 1: Read both canonical analyses and confirm targets are new**

```bash
test -f references/analyses/sources/devouring-details.md
test -f references/analyses/sources/designparser-design-rules-cheatsheet.md
test ! -e references/analyses/ko/sources/devouring-details.md
test ! -e references/analyses/ko/sources/designparser-design-rules-cheatsheet.md
```

Expected: all commands exit 0.

- [ ] **Step 2: Translate `devouring-details.md` completely**

Add the same notice pattern linking to `../../sources/devouring-details.md` and use Task 1 headings. Preserve `Devouring Details`, `Rauno`, `Vercel`, `Browser Company`, `Arc`, `React`, USD 249, Area IDs, `course`, `en`, `review`, and `draft`. Preserve the distinction between public observations, source-reported behavior, and paid material that was not inspected.

- [ ] **Step 3: Translate `designparser-design-rules-cheatsheet.md` completely**

Add the notice linking to `../../sources/designparser-design-rules-cheatsheet.md` and use Task 1 headings. Preserve `Design Rules Cheatsheet`, `designparser`, Area IDs, `tool`, `en`, `review`, and `draft`. Preserve that individual rules, evidence quality, and sourcing were not assessed.

- [ ] **Step 4: Verify, test, and commit**

```bash
for file in devouring-details.md designparser-design-rules-cheatsheet.md; do test -f "references/analyses/ko/sources/$file"; rg -q '^## 편집 평가$' "references/analyses/ko/sources/$file"; rg -q '^## 사람 검토$' "references/analyses/ko/sources/$file"; done
git diff --exit-code HEAD -- references/analyses/sources references/inbox.md
git diff --check
PATH=/Users/yongminkim/.nvm/versions/node/v22.17.0/bin:/usr/bin:/bin npm test
git add references/analyses/ko/sources/devouring-details.md references/analyses/ko/sources/designparser-design-rules-cheatsheet.md
git commit -m "docs: translate design reference analyses"
```

Expected: structure checks, immutability check, diff check, and 9 tests pass before commit.

---

### Task 3: Translate DENG and Emil Kowalski

**Files:**
- Create: `references/analyses/ko/sources/deng-design-engineering-directory.md`
- Create: `references/analyses/ko/sources/emil-kowalski.md`
- Read: `references/analyses/sources/deng-design-engineering-directory.md`
- Read: `references/analyses/sources/emil-kowalski.md`

**Interfaces:**
- Consumes: Task 1 heading vocabulary and the two same-named English analyses.
- Produces: Korean review translations for the secondary directory and author-context website.

- [ ] **Step 1: Read both canonical analyses and confirm targets are new**

```bash
test -f references/analyses/sources/deng-design-engineering-directory.md
test -f references/analyses/sources/emil-kowalski.md
test ! -e references/analyses/ko/sources/deng-design-engineering-directory.md
test ! -e references/analyses/ko/sources/emil-kowalski.md
```

Expected: all commands exit 0.

- [ ] **Step 2: Translate `deng-design-engineering-directory.md` completely**

Add the notice linking to `../../sources/deng-design-engineering-directory.md` and use Task 1 headings. Preserve `deng — Design Engineering`, `deng`, Area IDs, `directory`, `en`, `review`, and `draft`. Keep `directory` explicitly proposed and pending human policy confirmation; outbound entries remain unapproved.

- [ ] **Step 3: Translate `emil-kowalski.md` completely**

Add the notice linking to `../../sources/emil-kowalski.md` and use Task 1 headings. Preserve `Emil Kowalski`, Area IDs, `website`, `en`, `review`, and `draft`. Preserve the recommendation to use the homepage as provenance/context rather than a standalone published reference, pending human confirmation.

- [ ] **Step 4: Verify, test, and commit**

```bash
for file in deng-design-engineering-directory.md emil-kowalski.md; do test -f "references/analyses/ko/sources/$file"; rg -q '^## 편집 평가$' "references/analyses/ko/sources/$file"; rg -q '^## 사람 검토$' "references/analyses/ko/sources/$file"; done
git diff --exit-code HEAD -- references/analyses/sources references/inbox.md
git diff --check
PATH=/Users/yongminkim/.nvm/versions/node/v22.17.0/bin:/usr/bin:/bin npm test
git add references/analyses/ko/sources/deng-design-engineering-directory.md references/analyses/ko/sources/emil-kowalski.md
git commit -m "docs: translate directory and author analyses"
```

Expected: structure checks, immutability check, diff check, and 9 tests pass before commit.

---

### Task 4: Index, log, and verify all Korean translations

**Files:**
- Modify: `references/index.md`
- Modify: `references/log.md`
- Verify: five English files and five Korean files

**Interfaces:**
- Consumes: all five Korean translations from Tasks 1–3.
- Produces: discoverable review links and append-only provenance without changing canonical counts or decisions.

- [ ] **Step 1: Add Korean review links to the index**

After the existing five English links under `## Source analyses`, add exactly:

```markdown
### Korean review translations

- [designparser-design-rules-cheatsheet](analyses/ko/sources/designparser-design-rules-cheatsheet.md)
- [deng-design-engineering-directory](analyses/ko/sources/deng-design-engineering-directory.md)
- [emil-kowalski](analyses/ko/sources/emil-kowalski.md)
- [devouring-details](analyses/ko/sources/devouring-details.md)
- [emil-course-platform](analyses/ko/sources/emil-course-platform.md)
```

Do not change workflow counts, awaiting-review entries, record tables, concept synthesis, or issues.

- [ ] **Step 2: Append the approved log entry**

Append exactly:

```markdown
## [2026-08-11] review | Korean Batch 1 analysis translations added

- Change: Added Korean review translations for the five Batch 1 source analyses and linked them from the reference index.
- Affected IDs: designparser-design-rules-cheatsheet, deng-design-engineering-directory, emil-kowalski, devouring-details, emil-course-platform.
- Approval: The maintainer approved Korean review-aid translations while keeping the English analyses canonical.
```

Do not rewrite existing log entries.

- [ ] **Step 3: Verify pairs, headings, notices, links, counts, and history**

```bash
test "$(find references/analyses/ko/sources -maxdepth 1 -type f -name '*.md' | wc -l | tr -d ' ')" = "5"
for file in references/analyses/ko/sources/*.md; do name="${file##*/}"; test -f "references/analyses/sources/$name"; rg -q "\.\./\.\./sources/$name" "$file"; for heading in '## 편집 평가' '### 범위 적합성' '### 권위와 지속 가능성' '### 중복 및 분류' '### 편집 권고' '## 웹사이트 디자인 분석' '### 정보 계층과 탐색' '### UI, 인터랙션 및 모션' '### 그리드, 레이아웃 및 반응형 동작' '### 타이포그래피, 색상 및 시각적 리듬' '### 접근성 관찰' '### 전이 가능한 원칙' '### 복제하지 않아야 할 출처 고유 표현' '## 근거와 불확실성' '## 사람 검토'; do rg -Fq "$heading" "$file" || exit 1; done; done
rg -n 'Submitted URLs: 18|Processed submissions: 5|Source analyses: 5|Concept syntheses: 0' references/index.md
git diff --exit-code HEAD -- references/inbox.md references/analyses/sources
git diff --check
```

Expected: exactly five pairs and notices validate; every heading is present; four counts remain unchanged; canonical files and inbox are unchanged; diff check exits 0.

- [ ] **Step 4: Perform translation-fidelity review**

Review every same-named pair side by side. Confirm all frontmatter values match, every English paragraph/list has a Korean counterpart in the same section, identities and machine-readable tokens remain unchanged, limitations remain explicit, Human review fields are blank, and no Korean file adds approval, evidence, or product guidance.

- [ ] **Step 5: Run final tests and commit index/history**

```bash
PATH=/Users/yongminkim/.nvm/versions/node/v22.17.0/bin:/usr/bin:/bin npm test
git status --short
git diff --check
git add references/index.md references/log.md
git commit -m "docs: index Korean analysis translations"
```

Expected: 4 test files and 9 tests pass; only index and log are staged for this commit; diff check exits 0.

- [ ] **Step 6: Request whole-branch review**

Request review against `docs/superpowers/specs/2026-08-11-korean-analysis-translations-design.md`. Review translation fidelity, evidence boundaries, English immutability, counts, link resolution, append-only history, and exact branch scope. Fix and re-verify all Critical or Important findings before integration.
