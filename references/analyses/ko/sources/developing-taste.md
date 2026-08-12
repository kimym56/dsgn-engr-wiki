---
reference_id: "developing-taste"
title: "Developing Taste"
canonical_url: "https://emilkowal.ski/ui/developing-taste"
analyzed: "2026-08-12"
status: "draft"
---

> 이 문서는 [영문 원본](../../sources/developing-taste.md)의 한국어 검토용 번역본입니다. 영문 원본을 기준 분석으로 사용합니다.

# 자료 분석: Developing Taste

## 편집 평가

### 범위 적합성

Emil Kowalski는 taste를 개인적 선호가 아니라 훈련할 수 있는 역량으로 제시한다. 글은 향상 방법을 좋은 작업에 지속적으로 노출되기, 그 작업이 성공한 이유를 명시적으로 분석하기, 비평을 받으며 반복해 연습하기라는 세 가지 실천으로 압축한다. 관찰을 구현과 피드백에 연결하므로 디자인 엔지니어링에 유용하지만, 검증된 훈련 방법이라기보다 간결한 에세이다.

### 권위와 지속 가능성

이 글은 Emil Kowalski의 1차 디자인 엔지니어링 사이트에 게시되어 실무자의 경험을 반영한다. 관련 에세이, 강연, 앱 분석 사례, Ira Glass의 “taste gap”을 인용하지만 게시일이나 수정일은 보이지 않는다. 핵심 실천 loop는 오래갈 수 있으나 소프트웨어 상용화와 AI에 관한 도입부 주장은 시점에 더 민감하다.

### 중복 및 분류

제안 형식: `article`. 제안 Area: `design-engineering-foundations`, `product-craft`. 출처 언어: `en`. 희소성에서 풍요로 간다는 전제는 `taste-is-eating-silicon-valley`와, 실천 조언은 `on-taste-part-3`와 직접 중복된다. 세 자료 중 이 글이 가장 짧고 디자인 엔지니어링에 특화된 종합본이다.

### 편집 권고

`review`. 접근하기 쉬운 입문 글로 유지하되 세 단계 모델을 저자의 견해로 귀속하고, 커리큘럼으로 다루기 전에 사례나 비평 방법을 함께 제공한다.

## 웹사이트 디자인 분석

### 정보 계층과 탐색

짧은 시장 비유에서 taste 정의로 이동한 뒤 명료하게 이름 붙인 세 섹션으로 이어진다. 인용 카드와 번호가 매겨진 주석이 보조 관점을 제공하며, 이전 글과 다음 글 링크가 페이지를 닫는다. 저자 헤더와 현재 course banner가 본문 흐름을 바꾸지 않으면서 글의 틀을 만든다.

### UI, 인터랙션 및 모션

제목 링크가 섹션 이동을 지원하고, 레이블이 있는 버튼으로 주석에서 참조 위치로 돌아갈 수 있다. 전달된 마크업에는 닫을 수 있는 course banner가 있다. 런타임 인터랙션, transition, reduced-motion 지원은 검사하지 않았다.

### 그리드, 레이아웃 및 반응형 동작

짧은 문단, 인용 블록, footnotes로 이루어진 좁은 단일 열 article layout을 사용한다. 전달된 class name에서 헤더의 일부 컨트롤이 medium breakpoint에서 조정되지만 실제 반응형 재배치는 시각적으로 확인하지 않았다.

### 타이포그래피, 색상 및 시각적 리듬

큰 섹션 구분, 간결한 문단, 독립된 인용으로 차분한 tutorial 리듬을 만든다. Inline emphasis와 번호 주석이 주장과 보조 자료를 구분한다. 정확한 글꼴, 색상, 대비 관계는 시각적으로 검사하지 않았다.

### 접근성 관찰

전달된 마크업에는 레이블이 있는 닫기 및 footnote 복귀 버튼, 제목, 링크, 반응형 viewport가 있다. Footnote 복귀 컨트롤은 돌아가기 액션을 명시한다. 키보드 순서, 포커스 외형, 대비, screen reader 읽기 순서, 모션 선호는 검사하지 않았다.

### 전이 가능한 원칙

- 노출, 분석, 제작, 피드백을 loop로 연결해 판단력을 기른다.
- “좋다” 또는 “나쁘다”는 반응을 관찰 가능한 선택과 연결된 이유로 바꾼다.
- 실무자의 완성물뿐 아니라 그들이 영향을 받은 대상을 연구한다.
- 판단과 실행 사이의 차이를 예상하면서 계속 연습한다.

### 복제하지 않아야 할 출처 고유 표현

자동차와 말의 비유, 인용문, 세 부분의 문구, course banner, article layout, 저자 branding, 시각적 처리를 복사하지 않는다.

## 자료 발견

- 적격 섹션: 명시적으로 번호가 매겨진 footnotes.
- 후보 ID: `craft-and-beauty-the-business-value-of-form-in-function`, `on-taste-part-3`, `app-dissection`, `the-taste-gap-ira-glass`.
- 다음 웨이브 후보: 링크를 열지 않고 2단계·웨이브 2 링크 4개를 기록했다. 새 임시 노드 3개는 `canonical_verified: false`를 사용한다. `on-taste-part-3`는 이미 정규 URL이 검증되어 있어 기존 노드에 발견 엣지 하나를 추가했다.
- 제외한 링크 유형: course promotion, 저자·홈 링크, inline 인용 목적지, 제목 앵커, 이전·다음 글 탐색.

## 근거와 불확실성

- 직접 관찰: 2026-08-12에 전체 본문, 세 섹션 구조, footnotes, 탐색 class, 의미 구조, 부모 페이지의 URL을 검사했다.
- 사람의 확인이 필요한 주장: 게시일, 수정 이력, 간결한 모델이 `on-taste-part-3`와 별도로 공개할 만큼 충분한 가치를 더하는지.
- 접근 제한: 렌더링된 시각 요소, 키보드 동작, 반응형 재배치, 모션, reduced-motion 동작, screen reader 출력을 검사하지 않았다.
- 기존 분석과의 모순: 없음. 이 글은 `on-taste-part-3`에도 있는 아이디어를 단순화한다. 중복은 독립적인 보강 근거로 다루지 말고 공개해야 한다.

## 사람 검토

- 검토자:
- 결정:
- 검토일:
- 메모:
