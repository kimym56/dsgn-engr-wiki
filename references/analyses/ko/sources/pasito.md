---
reference_id: "pasito"
title: "Pasito"
canonical_url: "https://joshpuckett.me/pasito"
analyzed: "2026-08-12"
status: "draft"
---

> 이 문서는 [영문 원본](../../sources/pasito.md)의 한국어 검토용 번역본입니다. 영문 원본을 기준 분석으로 사용합니다.

# 자료 분석: Pasito

## 편집 평가

### 범위 적합성

Pasito는 가로, 세로, autoplay, windowing, theme 변형을 제공하는 유동적인 React stepper의 1차 데모이자 간결한 API reference다. 작은 interaction primitive를 사용 코드, customization variable, 접근성 의미 구조, 실제처럼 보이는 데모와 결합한 구체적인 사례라는 점에서 디자인 엔지니어링에 적합하다. Dependency-free라는 주장과 production 동작은 package source와 대조해 독립적으로 검증하지 않았다.

### 권위와 지속 가능성

Josh Puckett은 개인 사이트에서 컴포넌트를 공개하고 GitHub 저장소로 연결한다. 페이지는 현재 API, 기본값, theming surface를 문서화하지만 package version, release date, changelog, license, compatibility matrix는 보이지 않는다. 저자가 의도한 interface에 대해서는 권위가 있으나 장기적 지속 가능성은 package 유지관리에 달려 있다.

### 중복 및 분류

제안 형식: `tool`. 제안 Area: `interaction-design`, `component-engineering`, `motion`, `accessibility`. 제안 Collection: 없음. 출처 언어: `en`. 터치, 모션, 접근 가능한 컨트롤 지침 수준에서 `web-interface-guidelines`와 중복되며, Pasito는 적용된 컴포넌트 사례를 더한다.

### 편집 권고

`review`. 사람이 저장소 상태, 키보드 동작, 의미 구조, reduced motion, 모바일 입력을 확인한다면 컴포넌트 case study로 유지한다. 문서의 접근성 checklist를 독립된 테스트 근거로 다루지 않는다.

## 웹사이트 디자인 분석

### 정보 계층과 탐색

페이지는 컴포넌트 목적과 데모로 시작한 뒤 세로, autoplay, theme 사례를 보여주고 installation, usage, API, theming, accessibility로 이어진다. 전달된 class name에 따르면 고정 섹션 탐색은 extra-large 너비에서만 나타나며, 지역 앵커가 문서 outline을 그대로 따른다.

### UI, 인터랙션 및 모션

정적 HTML에는 레이블이 있는 이전·다음, 추가·삭제, 재생·일시정지, 단계 선택, 복사 컨트롤이 있다. Stepper는 tablist model, roving `tabIndex`, `aria-selected`, 단계별 label을 사용한다. 문서는 기본 transition 500ms, 설정 가능한 easing, timed fill, 일시정지·재개, loop, `prefers-reduced-motion`에서 즉시 끝나는 transition을 명시한다. 이 동작은 런타임에서 실행하지 못했다.

### 그리드, 레이아웃 및 반응형 동작

이미지 중심 사례 안에서 가로와 세로 stepper 데모를 번갈아 보여준 뒤 전체 너비 코드와 API table을 배치한다. 고정 side navigation은 `xl` breakpoint 아래에서 숨겨져 좁은 화면에서는 단순한 읽기 흐름을 제공한다. 실제 overflow, table 재배치, touch 동작은 검사하지 않았다.

### 타이포그래피, 색상 및 시각적 리듬

중립적인 documentation surface와 artwork 배경 데모, 여러 themed stepper 변형이 교차한다. Code block과 table이 경험적 사례에서 구현 세부 사항으로 리듬을 전환한다. 정확한 대비와 dark-mode rendering은 시각적으로 확인하지 않았다.

### 접근성 관찰

전달된 마크업에서 확인한 긍정적 근거는 레이블이 있는 컨트롤, `role="tablist"`, `role="tab"`, `aria-selected`, roving focus, 숨긴 장식용 GitHub·copy icon, 명시적인 reduced-motion 주장이다. Arrow key가 기대되는 tab pattern을 구현하는지, autoplay 안내와 pause control이 충분한지, 작은 step target이 touch 요구를 충족하는지, 모든 theme에서 focus가 보이는지는 확인이 필요하다.

### 전이 가능한 원칙

- 컴포넌트 데모에 installation, usage, API, theming, accessibility note를 함께 둔다.
- active state를 controlled 상태로 유지하고 timing을 설정값으로 노출한다.
- autoplay를 일시정지할 수 있게 하고 reduced-motion 사용자에게 transition 비용을 없앤다.
- 의미 구조를 바꾸지 않고 작은 token surface로 theme 변형을 만든다.
- 추상화를 문서화하기 전에 가로와 세로 맥락에서 시연한다.

### 복제하지 않아야 할 출처 고유 표현

Pasito 이름, pill geometry, theme preset, artwork, gallery composition, 정확한 CSS variable과 기본값, 코드, 문서 구성을 복사하지 않는다.

## 자료 발견

- 적격 섹션: 없음. 명시적인 Resources, References, Further reading, Recommended, footnotes 또는 의미상 명확히 동등한 선별 섹션이 없었다.
- 후보 ID: 없음.
- 다음 웨이브 후보: 없음.
- 제외한 링크 유형: 지역 섹션 탐색, 컴포넌트 API·문서 앵커, GitHub project navigation, copy control, 이미지·artwork credit.

## 근거와 불확실성

- 직접 관찰: 2026-08-12에 전체 페이지 텍스트, 사례, installation·usage 자료, API table, accessibility note, 전달된 컨트롤 의미 구조, 부모 페이지의 모든 링크를 검사했다.
- 사람의 확인이 필요한 주장: package version과 유지관리, 실제 keyboard model, touch target 크기, autoplay 안내, reduced-motion 구현.
- 접근 제한: 동적 상태 변경, animation timing, 반응형 재배치, 키보드 조작, focus styling, contrast, screen-reader 동작은 런타임에서 검사하지 않았다.
- 기존 분석과의 모순: 없음.

## 사람 검토

- 검토자:
- 결정:
- 검토일:
- 메모:
