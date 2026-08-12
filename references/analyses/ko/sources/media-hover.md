---
reference_id: "media-hover"
title: "hover CSS media feature"
canonical_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/hover"
analyzed: "2026-08-13"
status: "draft"
---

> 이 문서는 [영문 원본](../../sources/media-hover.md)의 한국어 검토용 번역본입니다. 영문 원본을 기준 분석으로 사용합니다.

# 자료 분석: hover CSS media feature

## 편집 평가

### 범위 적합성

MDN은 사용자의 주 입력 장치가 편리하게 hover할 수 있는지 `hover` media feature로 감지하는 방법을 설명한다. hover 보강이 정보나 액션의 유일한 경로가 되어서는 안 되며 장치 종류를 추정하는 것보다 capability를 확인해야 한다는 인터랙션 엔지니어링의 기초 자료다.

### 권위와 지속 가능성

MDN은 유지보수되는 2차 참고자료이며 규범적 Media Queries 명세와 브라우저 호환 데이터를 연결한다. 기존 URL은 현재 정규 경로로 redirect됐다. 호환 데이터와 문구는 바뀔 수 있지만 기능은 널리 구현돼 있다.

### 중복 및 분류

제안 형식: `technical reference`. 제안 Area: `interaction-engineering`, `responsive-design`, `accessibility`. `web-interface-guidelines`의 hover 지침에 표준 맥락을 제공한다.

### 편집 권고

사람 검토 후 `publish`. 간결하고 실무에 충분히 권위 있으며 필수 동작이 hover에 의존해서는 안 된다는 제품 규칙과 함께 사용해야 한다.

## 웹사이트 디자인 분석

### 정보 계층과 탐색

상태 표시, 정의, 문서 목차, syntax, 예제, 명세, 호환성, 관련 읽기가 예측 가능한 참고 계층을 만든다.

### UI, 인터랙션 및 모션

검색, 탐색, 호환 정보, 코드 예제, 기여 액션이 있다. 런타임 동작은 실행하지 않았다.

### 그리드, 레이아웃 및 반응형 동작

큰 MDN 탐색 안에 문서 열이 있으며 본문은 선형이다. 반응형 탐색은 테스트하지 않았다.

### 타이포그래피, 색상 및 시각적 리듬

코드, 정의 용어, 상태 레이블, 짧은 섹션이 훑기 쉽게 만든다. 대비와 코드 토큰 색은 시각 감사하지 않았다.

### 접근성 관찰

제목, 코드, 표, 설명 레이블이 의미 구조를 제공한다. 호환성 표, 포커스, 좁은 화면 탐색은 런타임 확인이 필요하다. 내용 자체는 capability 기반 인터랙션을 장려한다.

### 전이 가능한 원칙

- 실제 hover capability로 hover 전용 보강을 제한한다.
- 필수 콘텐츠와 액션은 hover 없이 제공한다.
- 짧은 정의와 실행 가능한 예제를 결합한다.
- 구현 지침 옆에 명세와 호환 근거를 둔다.

### 복제하지 않아야 할 출처 고유 표현

MDN 문장, 코드 예제, 호환성 표, 탐색, 브랜딩을 복제하지 않는다.

## 자료 발견

- 적격 섹션: `Specifications`, `See also`.
- 웨이브 3 후보: `css-media-queries-level-4-hover`, `using-media-queries`, `media-at-rule`.
- 이 부모 페이지의 레이블과 URL만 기록했고 목적지는 열지 않았다.
- 전역 MDN 탐색, footer, contributor 링크, 부수적 본문 링크는 제외했다.

## 근거와 불확실성

- 2026-08-13 직접 관찰: redirect, 정규 제목·경로, 정의, syntax, 예제, 명세, 호환성, 관련 링크, 수정일.
- 브라우저 지원은 구현할 때 다시 확인해야 한다.
- 실제 렌더링 접근성과 인터랙션은 테스트하지 않았다.

## 사람 검토

- 검토자:
- 결정:
- 검토일:
- 메모:
