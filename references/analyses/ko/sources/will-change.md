---
reference_id: "will-change"
title: "will-change CSS property"
canonical_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/will-change"
analyzed: "2026-08-13"
status: "draft"
---

> 이 문서는 [영문 원본](../../sources/will-change.md)의 한국어 검토용 번역본입니다. 영문 원본을 기준 분석으로 사용합니다.

# 자료 분석: will-change CSS property

## 편집 평가

### 범위 적합성

MDN은 `will-change`를 렌더링 hint로 문서화하며 추측적이거나 넓은 사용을 반복 경고한다. 실제 문제를 측정하고, 좁은 범위에 변경 직전 적용하며, 이후 제거하라는 애니메이션 성능의 핵심 자료다.

### 권위와 지속 가능성

MDN은 규범적 CSS Will Change 명세와 호환 데이터에 연결된 유지보수 2차 참고자료다. 기존 URL은 정규 속성 페이지로 redirect됐다. API는 안정적이지만 성능 효과는 브라우저와 작업량에 따라 달라진다.

### 중복 및 분류

제안 형식: `technical reference`. 제안 Area: `motion`, `performance`, `frontend-engineering`. `web-interface-guidelines`의 애니메이션 조언에 표준 기반 주의를 더한다.

### 편집 권고

`review`. 강한 게시 후보지만 결정은 사람이 소유한다. 성능 hint도 과도하면 메모리를 소비하고 성능을 악화시킬 수 있다는 경고가 가장 가치 있다.

## 웹사이트 디자인 분석

### 정보 계층과 탐색

가용성과 정의, syntax, 자세한 경고, 예제, 형식 정의, 명세, 호환성, 관련 자료 순이다. 복사 가능한 예제보다 경고를 먼저 두어 오용을 줄인다.

### UI, 인터랙션 및 모션

검색, 탐색, 코드 예제, 호환성, 기여 액션이 있다. 실제 애니메이션과 인터랙션은 실행하지 않았다.

### 그리드, 레이아웃 및 반응형 동작

넓은 MDN 탐색 안의 선형 문서다. 좁은 화면에서 표와 코드 overflow는 테스트하지 않았다.

### 타이포그래피, 색상 및 시각적 리듬

경고 블록, 코드, 정의 표, 짧은 제목이 강한 기술 리듬을 만든다. 시각 대비는 감사하지 않았다.

### 접근성 관찰

의미 있는 섹션, 경고, 코드, 표가 구조적 읽기를 돕는다. 포커스, 호환성 표 탐색, 모바일 동작은 미확인이다. 성능 변경은 저사양 장치에서도 테스트해야 한다.

### 전이 가능한 원칙

- 성능 문제를 관찰한 뒤 최적화한다.
- 렌더링 hint는 좁고 일시적으로 적용한다.
- 메모리, compositing, stacking-context 부작용을 테스트한다.
- 예제 앞에 오용 경고를 둔다.
- 변경 완료 뒤 최적화 상태를 제거한다.

### 복제하지 않아야 할 출처 고유 표현

MDN 문장, 예제, 표, 탐색, 브랜딩을 복제하지 않는다.

## 자료 발견

- 적격 섹션: `Specifications`, `See also`.
- 웨이브 3 후보: `css-will-change-module-level-1`, `transform-css-property`, `translate-css-property`, `scale-css-property`, `rotate-css-property`, `animation-css-property`, `css-will-change-guide`.
- 부모 링크만 기록했고 목적지는 열지 않았다.
- 전역 MDN 탐색, footer, contributor 도구, 본문 정의 링크는 제외했다.

## 근거와 불확실성

- 2026-08-13 직접 관찰: redirect, 정규 제목·경로, 경고, 예제, 형식 syntax, 명세, 호환성, 관련 링크, 수정일.
- 실제 개선이나 악화는 대상 인터페이스와 브라우저에서 profiling해야 한다.
- 렌더링 접근성과 런타임 동작은 테스트하지 않았다.

## 사람 검토

- 검토자:
- 결정:
- 검토일:
- 메모:
