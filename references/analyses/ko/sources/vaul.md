---
reference_id: "vaul"
title: "Vaul"
canonical_url: "https://vaul.emilkowal.ski/"
analyzed: "2026-08-12"
status: "draft"
---

> 이 문서는 [영문 원본](../../sources/vaul.md)의 한국어 검토용 번역본입니다. 영문 원본을 기준 분석으로 사용합니다.

# 자료 분석: Vaul

## 편집 평가

### 범위 적합성

Vaul의 landing page는 React용 drawer component를 보여주는 최소한의 1차 데모다. 하나의 즉각적인 trigger로 공간적 인터랙션을 보여주고 documentation과 source로 바로 연결하는 집중된 사례라는 점에서 디자인 엔지니어링에 적합하다. Landing page만으로는 gesture physics, focus management, nested drawer, responsive behavior, 구현 tradeoff를 설명하지 않으므로 별도로 승인된 문서 분석 없이는 교육 가치가 제한된다.

### 권위와 지속 가능성

사이트는 Emil Kowalski의 domain에서 게시되고 Vaul GitHub 저장소와 documentation으로 연결된다. 프로젝트 정체성과 의도된 진입점에 대해서는 권위가 있지만, 페이지에는 version, release date, compatibility statement, maintenance status, test evidence가 없다. 정규 landing URL은 직접 접근할 수 있었다.

### 중복 및 분류

제안 형식: `tool`. 제안 Area: `component-engineering`, `interaction-design`, `motion`, `accessibility`. 출처 언어: `en`. 컴포넌트 landing page라는 점에서 Pasito와 겹치지만, Vaul은 progress navigation이 아니라 modal·gesture 중심 surface를 보여준다.

### 편집 권고

`review`. 이후 사람의 승인을 받은 검사에서 현재 documentation, focus, dismissal, reduced motion, gesture conflict, project maintenance를 확인하는 경우에만 영감 자료 후보로 유지한다.

## 웹사이트 디자인 분석

### 정보 계층과 탐색

전체 landing page는 의도적으로 간결하다. 제품 이름, 한 문장 설명, `Open Drawer`, GitHub, Documentation만 있다. 임시 course banner가 핵심 콘텐츠 위에 나타난다. Demo가 주 경로이고 보조 자료가 그 다음인 계층이다.

### UI, 인터랙션 및 모션

전달된 마크업의 button에는 `aria-haspopup="dialog"`, `aria-expanded="false"`, `aria-controls`가 있어 닫힌 drawer trigger임을 나타낸다. 브라우저 런타임을 사용할 수 없어 열린 상태, drag gesture, dismissal 경로, focus trap, transition timing, reduced-motion 동작을 검사하지 못했다.

### 그리드, 레이아웃 및 반응형 동작

간결한 가로 action group과 중앙 정렬된 단일 목적 hero를 사용한다. 전달된 class name에는 promotion banner의 small·medium breakpoint 변화가 있다. Drawer 크기, 작은 화면 동작, orientation 변화는 시각적으로 확인하지 않았다.

### 타이포그래피, 색상 및 시각적 리듬

보이는 텍스트 계층은 큰 제품 제목, 짧은 회색 설명, 둥근 action, documentation 링크로 제한된다. 메타데이터는 어두운 theme color를 선언한다. 정확한 글꼴, 대비, drawer styling은 시각적으로 검사하지 않았다.

### 접근성 관찰

초기 trigger가 유용한 dialog state와 ownership attribute를 노출하고 promotion close control에 명시적 label이 있다. 실제 dialog role, accessible name, focus 진입과 복귀, Escape 처리, background inertness, touch 대안, contrast, motion accommodation은 열린 상태를 볼 수 없어 확인하지 못했다.

### 전이 가능한 원칙

- 컴포넌트를 정의하는 interaction을 보조 설명보다 앞에 둔다.
- Trigger에 dialog state와 ownership을 노출한다.
- Source와 documentation 경로를 보이게 하되 demo보다 보조적으로 둔다.
- Modal component를 추천하기 전에 open-state 접근성과 motion을 검증한다.

### 복제하지 않아야 할 출처 고유 표현

Vaul 이름, drawer 동작, 코드, 중앙 정렬 구성, 둥근 action styling, promotion banner, 시각 정체성을 복사하지 않는다.

## 자료 발견

- 적격 섹션: 없음. 명시적인 Resources, References, Further reading, Recommended, footnotes 또는 의미상 명확히 동등한 선별 섹션이 없었다.
- 후보 ID: 없음.
- 다음 웨이브 후보: 없음.
- 제외한 링크 유형: GitHub project navigation, 컴포넌트 documentation navigation, course promotion, 지역·페이지 utility control.

## 근거와 불확실성

- 직접 관찰: 2026-08-12에 전체 landing-page 텍스트, 초기 닫힌 상태 마크업, 메타데이터, 부모 페이지의 모든 링크를 검사했다.
- 사람의 확인이 필요한 주장: 현재 maintainer와 project status, 완전한 drawer semantics, gesture, focus management, reduced-motion behavior.
- 접근 제한: drawer를 열 수 없었다. 렌더링된 시각 요소, animation, keyboard behavior, responsive layout, contrast, screen-reader output은 검사하지 않았다.
- 기존 분석과의 모순: 없음.

## 사람 검토

- 검토자:
- 결정:
- 검토일:
- 메모:
