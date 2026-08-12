---
reference_id: "on-taste-part-3"
title: "On Taste, Part 3"
canonical_url: "https://medium.com/the-year-of-the-looking-glass/on-taste-part-3-d7d9f069f0b2"
analyzed: "2026-08-12"
status: "draft"
---

> 이 문서는 [영문 원본](../../sources/on-taste-part-3.md)의 한국어 검토용 번역본입니다. 영문 원본을 기준 분석으로 사용합니다.

# 자료 분석: On Taste, Part 3

## 편집 평가

### 범위 적합성

Julie Zhuo의 2013년 에세이는 taste를 여섯 가지 실천으로 기르는 기술이라고 주장한다. 품질을 판단할 수 있다고 받아들이기, 존경받는 실무자를 찾기, 그들의 가치에 몰입하기, 선택을 비평하기, 토론으로 판단을 보정하기, 솔직한 피드백과 함께 craft를 연습하기다. 시각, 인터랙션, 구현 작업을 아우르는 반복 가능한 학습 loop를 설명하므로 디자인 엔지니어링 기초에 적합하다. 이 글은 경험적 조언이지 실증적 근거가 아니며 품질에 일반적 척도가 있다는 도입 전제에는 비판적 맥락이 필요하다.

### 권위와 지속 가능성

전체 글은 Julie Zhuo의 저작으로 표시되고 2013년 5월 23일 자이며 Medium의 The Year of the Looking Glass에 게시되었다. 저자의 실무 관점과 명시적인 순서가 조언을 이해하기 쉽게 하지만, 사례와 수사적 유머는 체계적 근거라기보다 개인적 뒷받침이다. 관찰–비평–연습 loop라는 핵심은 잘 유지되었다. Medium의 direct CLI route는 Cloudflare 차단을 반환했지만 direct web reader는 snippet이나 2차 출처 없이 전체 본문을 노출했다.

### 중복 및 분류

제안 형식: `article`. 제안 Area: `design-engineering-foundations`, `critique`, `product-craft`. 출처 언어: `en`. 이 글의 여러 아이디어를 인용하고 압축한 `developing-taste`와 상당히 중복된다. 이 글이 더 완전한 1차 표현이며, `taste-is-eating-silicon-valley`는 같은 훈련 순서가 아니라 이후의 시장 근거를 제공한다.

### 편집 권고

`review`. 여섯 단계가 객관적인 측정 체계가 아니라 개인적 framework라는 주석과 명확한 귀속을 붙여 오래가는 실무 지침으로 유지한다.

## 웹사이트 디자인 분석

### 정보 계층과 탐색

Medium은 publication과 author context, 여섯 번호 섹션에 대응하는 목차, 제목, 부제, byline, 날짜, 읽기 시간, 본문, series link, publisher·author·footer chrome을 제시한다. 번호 구조는 글을 훑기 쉽게 하지만 platform action과 promotion navigation이 본문과 주의를 두고 경쟁한다.

### UI, 인터랙션 및 모션

페이지는 sign-in, search, listen, share, author, publication, in-page section link를 노출한다. 런타임 브라우저를 사용할 수 없어 sticky behavior, audio control, menu, focus state, motion, reduced-motion behavior는 검사하지 않았다.

### 그리드, 레이아웃 및 반응형 동작

추출된 페이지는 article 앞의 간결한 in-page outline과 단일 장문 열로 구성된다. 렌더링된 column width, image behavior, breakpoint reflow, mobile chrome은 시각적으로 확인하지 않았다.

### 타이포그래피, 색상 및 시각적 리듬

번호가 매겨진 subheading이 article rhythm을 만들고 각 단계 아래에 중간 길이 문단과 짧은 결론이 이어진다. Publisher와 platform metadata가 에세이를 둘러싼다. 정확한 font, hierarchy size, color, contrast는 시각적으로 검사하지 않았다.

### 접근성 관찰

텍스트 추출은 제목과 여섯 섹션 outline의 의미 있는 link text를 보존한다. Platform은 문서에 search, sign-in, listen control도 노출한다. Keyboard order, focus treatment, 렌더링된 DOM의 heading semantics, image alternative, audio accessibility, contrast, motion support는 테스트하지 않았다.

### 전이 가능한 원칙

- 판단을 deliberate practice로 강화되는 기술로 다룬다.
- 선호 레이블에서 멈추지 말고 제작자의 결정을 분석한다.
- 다른 사람과 구체적으로 토론해 개인적 판단을 보정한다.
- 밑바탕 craft를 연습해 제약과 실패를 이해한다.
- 작업을 바꿀 수 있을 때 솔직한 피드백을 구한다.

### 복제하지 않아야 할 출처 고유 표현

여섯 단계의 문구, 농담, Ratatouille framing, 사례, Medium publication chrome, 저자 정체성, article composition을 복사하지 않는다.

## 자료 발견

- 적격 섹션: 없음. 명시적인 Resources, References, Further reading, Recommended, footnotes 또는 의미상 명확히 동등한 선별 섹션이 없었다.
- 후보 ID: 없음.
- 다음 웨이브 후보: 없음.
- 제외한 링크 유형: inline reference와 example, Part 1·Part 2 series navigation, in-page table-of-contents link, author·publication profile, social link, listen·share action, app, Medium footer 또는 utility navigation.

## 근거와 불확실성

- 직접 관찰: 2026-08-12에 direct web reader로 전체 article body, author, date, section outline, conclusion, series navigation, 표시된 모든 page link를 검사했다.
- 사람의 확인이 필요한 주장: 일반 척도 전제에 반론이 필요한지, `developing-taste`와의 중복에도 두 자료를 모두 공개할 가치가 있는지.
- 접근 제한: direct CLI retrieval은 Cloudflare에 차단되었다. Web reader는 전체 article을 보여주었지만 렌더링된 visual, responsive, keyboard, audio, motion, contrast, screen-reader behavior는 검사하지 않았다.
- 기존 분석과의 모순: 없음. `developing-taste`는 이 글을 명시적으로 인용하는 이후의 짧은 종합본이다.

## 사람 검토

- 검토자:
- 결정:
- 검토일:
- 메모:
