# 공개 레퍼런스 기반 구현 계획

> **번역 안내:** 이 문서는 검토용 한국어 번역입니다. [영문 원문](../../../superpowers/plans/2026-08-14-public-reference-foundation.md)이 정본이며, 해석이 다를 경우 영문 원문을 따릅니다.

> **에이전트 작업자용:** 필수 하위 스킬: 이 계획을 작업별로 구현하려면 superpowers:subagent-driven-development(권장) 또는 superpowers:executing-plans를 사용합니다. 단계 추적에는 체크박스(`- [ ]`) 구문을 사용합니다.

**목표:** 요청 또는 빌드 중에 외부 콘텐츠를 가져오지 않고, 스키마로 검증되고 서버에서 렌더링되는 `/en/references` 인덱스를 통해 승인된 영어 DENG 웨이브 1 레퍼런스 9개를 게시합니다.

**아키텍처:** 레퍼런스마다 프로젝트 소유 JSON 레코드 하나와 소규모 Area 및 Collection 레지스트리를 유지합니다. 서버 전용 로더가 모든 파일과 관계를 검증하고, 순수 헬퍼가 표시할 레코드를 선택하고 필터링하며, React Server Components가 쿼리 매개변수 필터와 외부 소스 카드를 렌더링합니다. 레코드 메타데이터는 상태가 `review`에서 `published`로 변경되기 전에 별도의 사람 검토 게이트를 통과하며, 링크 상태 확인은 수동 유지관리 명령으로 남깁니다.

**기술 스택:** Next.js 16.3 App Router, React 19 Server Components, TypeScript 6, Node.js 파일 시스템 API, Vitest 및 Testing Library, axe를 포함한 Playwright, Prettier, ESLint. 런타임 의존성을 추가하지 않습니다.

## 전역 제약 조건

- `superpowers:using-git-worktrees`로 만든 격리된 기능 worktree에서 작업합니다.
- 모든 동작 변경에 `superpowers:test-driven-development`를 따릅니다. 집중된 실패 테스트 하나를 작성하고 실행해 예상된 실패를 확인한 뒤 최소 구현을 추가하고 다시 실행합니다.
- 작업, 체크포인트 또는 브랜치가 완료되었다고 선언하기 전에 `superpowers:verification-before-completion`을 사용합니다.
- App Router 코드를 수정하기 전에 `node_modules/next/dist/docs/` 아래의 관련 번들 Next.js 16 가이드를 읽습니다.
- `page.tsx`, 필터, 결과 및 카드를 Server Components로 유지합니다. `"use client"`, 브라우저 저장소 또는 클라이언트 측 데이터 번들을 추가하지 않습니다.
- 페이지 렌더링, `next build`, 기본 `npm run check` 또는 레코드 검증에서 소스를 가져오지 않습니다.
- 이번 릴리스에서 공개 메타데이터 로케일은 영어뿐입니다. `/ko`를 게시하거나 한국어 레퍼런스 레코드를 만들지 않습니다.
- 디자인 명세에서 승인된 레코드 9개만 정확히 생성합니다. 웨이브 3 Candidate를 조사하거나 웨이브 2 Candidate를 승격하지 않습니다.
- 명시적인 작업 4 관리자 게이트까지 새 레코드를 `review`로 유지합니다. Candidate의 `publication.decision: publish`는 이 게이트를 우회하지 않습니다.
- 소스 정체성을 보존하고 각 카드를 현재 탭에서 정식 HTTPS URL에 연결합니다. 소스 텍스트, 아트워크, 스크린샷 또는 Open Graph 이미지를 복사하지 않습니다.
- `docs/superpowers/specs/2026-08-14-public-reference-foundation-design.md`를 승인된 제품 계약으로 취급합니다.
- 각 작업의 집중 테스트가 통과한 경우에만 작업 후 커밋합니다. 관련 없는 사용자 변경을 이러한 커밋에 포함하지 않습니다.

---

## 작업 1: 레퍼런스 스키마 정의 및 테스트

**파일:**

- 생성: `src/content/reference-schema.ts`
- 생성: `src/content/reference-schema.test.ts`

### 1.1 실패하는 스키마 테스트 작성

- [ ] 완전하고 유효한 fixture를 포함하는 `src/content/reference-schema.test.ts`를 생성합니다:

```ts
import { describe, expect, it } from "vitest";
import {
  parseReferenceCatalog,
  validateReferenceCatalog,
  type ReferenceCatalogInput,
} from "./reference-schema";

const validRecord = {
  id: "developing-taste",
  title: "Developing Taste",
  url: "https://emilkowal.ski/ui/developing-taste",
  publisher: "Emil Kowalski",
  author: "Emil Kowalski",
  summary: "An original project-owned summary.",
  relevance: "An original project-owned relevance note.",
  format: "article",
  areas: ["design-engineering-foundations"],
  collections: [],
  source_language: "en",
  published: null,
  added: "2026-08-14",
  reviewed: "2026-08-14",
  status: "review",
  preview: null,
  language: "en",
  translation_of: null,
};

const validInput: ReferenceCatalogInput = {
  areas: [
    {
      id: "design-engineering-foundations",
      label: "Design Engineering Foundations",
      description: "Core perspectives on design-engineering practice.",
    },
  ],
  collections: [],
  records: [
    {
      path: "content/references/en/developing-taste.json",
      value: validRecord,
    },
  ],
};

describe("parseReferenceCatalog", () => {
  it("accepts a complete English catalog with nullable optional fields", () => {
    expect(parseReferenceCatalog(validInput)).toEqual({
      areas: validInput.areas,
      collections: [],
      records: [validRecord],
    });
  });

  it.each([
    ["id", { id: "Developing Taste" }, "id"],
    ["url", { url: "http://example.com" }, "url"],
    ["source language", { source_language: "english" }, "source_language"],
    ["added date", { added: "2026-02-30" }, "added"],
    ["format", { format: "video" }, "format"],
    ["status", { status: "approved" }, "status"],
    ["empty areas", { areas: [] }, "areas"],
    ["translation", { translation_of: "some-record" }, "translation_of"],
  ])("rejects an invalid %s", (_label, replacement, field) => {
    const input = structuredClone(validInput);
    input.records[0].value = { ...validRecord, ...replacement };

    expect(validateReferenceCatalog(input)).toEqual(
      expect.arrayContaining([
        expect.stringContaining(
          "content/references/en/developing-taste.json." + field,
        ),
      ]),
    );
  });

  it("rejects missing fields and unknown fields", () => {
    const input = structuredClone(validInput);
    const { summary: _summary, ...missingSummary } = validRecord;
    input.records = [
      {
        path: "content/references/en/missing.json",
        value: missingSummary,
      },
      {
        path: "content/references/en/unknown.json",
        value: { ...validRecord, unexpected: true },
      },
    ];

    expect(validateReferenceCatalog(input)).toEqual(
      expect.arrayContaining([
        expect.stringContaining("missing.json.summary"),
        expect.stringContaining("unknown.json.unexpected"),
      ]),
    );
  });

  it("rejects duplicate record ids, urls, and relationships", () => {
    const input = structuredClone(validInput);
    input.records = [
      validInput.records[0],
      {
        path: "content/references/en/duplicate.json",
        value: {
          ...validRecord,
          areas: [
            "design-engineering-foundations",
            "design-engineering-foundations",
          ],
        },
      },
    ];

    const errors = validateReferenceCatalog(input);
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.stringContaining("duplicate record id"),
        expect.stringContaining("duplicate canonical url"),
        expect.stringContaining("duplicate area"),
      ]),
    );
  });

  it("rejects unknown areas and collections", () => {
    const input = structuredClone(validInput);
    input.records[0].value = {
      ...validRecord,
      areas: ["unknown-area"],
      collections: ["unknown-collection"],
    };

    expect(validateReferenceCatalog(input)).toEqual(
      expect.arrayContaining([
        expect.stringContaining("unknown area"),
        expect.stringContaining("unknown collection"),
      ]),
    );
  });

  it("requires complete preview attribution and alternative text", () => {
    const input = structuredClone(validInput);
    input.records[0].value = {
      ...validRecord,
      preview: {
        src: "/previews/developing-taste.webp",
        alt: "",
        source_url: "https://example.com",
        rights: "",
      },
    };

    expect(validateReferenceCatalog(input)).toEqual(
      expect.arrayContaining([
        expect.stringContaining("preview.alt"),
        expect.stringContaining("preview.rights"),
      ]),
    );
  });
});
```

- [ ] 중복 Area ID, 중복 Collection ID, 잘못된 레지스트리 ID, 알 수 없는 레지스트리 필드, `en`이 아닌 메타데이터 언어, 유효하지 않은 preview `source_url`에 대한 별도 사례를 추가합니다.

### 1.2 누락된 모듈로 인해 테스트가 실패하는지 확인

- [ ] 실행:

```bash
npx vitest run src/content/reference-schema.test.ts
```

- [ ] 해결되지 않은 `./reference-schema` import가 실패 원인인지 확인합니다. 테스트가 통과하거나 관련 없는 설정 오류로 실패하면 계속 진행하지 않습니다.

### 1.3 타입이 지정된 검증기 구현

- [ ] 다음 export 계약을 포함하는 `src/content/reference-schema.ts`를 생성합니다:

```ts
export const REFERENCE_FORMATS = [
  "article",
  "documentation",
  "tool",
  "case-study",
] as const;

export const REFERENCE_STATUSES = [
  "draft",
  "review",
  "published",
  "archived",
] as const;

export type ReferenceFormat = (typeof REFERENCE_FORMATS)[number];
export type ReferenceStatus = (typeof REFERENCE_STATUSES)[number];

export interface ReferencePreview {
  src: string;
  alt: string;
  source_url: string;
  rights: string;
}

export interface ReferenceRecord {
  id: string;
  title: string;
  url: string;
  publisher: string;
  author: string | null;
  summary: string;
  relevance: string;
  format: ReferenceFormat;
  areas: string[];
  collections: string[];
  source_language: string;
  published: string | null;
  added: string;
  reviewed: string;
  status: ReferenceStatus;
  preview: ReferencePreview | null;
  language: "en";
  translation_of: null;
}

export interface ReferenceArea {
  id: string;
  label: string;
  description: string;
}

export interface ReferenceCollection {
  id: string;
  label: string;
  description: string;
}

export interface ReferenceCatalog {
  areas: ReferenceArea[];
  collections: ReferenceCollection[];
  records: ReferenceRecord[];
}

export interface ReferenceCatalogInput {
  areas: unknown;
  collections: unknown;
  records: Array<{ path: string; value: unknown }>;
}

export function validateReferenceCatalog(
  input: ReferenceCatalogInput,
): string[];

export function parseReferenceCatalog(
  input: ReferenceCatalogInput,
): ReferenceCatalog;
```

- [ ] 스키마 라이브러리를 추가하는 대신 작은 로컬 헬퍼로 런타임 검증을 구현합니다:
  - `isPlainObject`는 prototype이 `Object.prototype` 또는 `null`인 객체를 허용합니다.
  - `expectExactKeys`는 누락되거나 알 수 없는 모든 필드를 보고합니다.
  - `expectNonEmptyString`은 빈 문자열과 공백만 있는 문자열을 거부합니다.
  - ID는 `/^[a-z0-9]+(?:-[a-z0-9]+)*$/`와 일치해야 합니다.
  - 언어 코드는 `/^[a-z]{2}(?:-[A-Z]{2})?$/`와 일치해야 합니다.
  - URL은 `new URL`로 파싱되어야 하며 `https:`를 사용해야 합니다.
  - ISO 날짜는 `YYYY-MM-DD`와 일치하고 UTC `Date`를 왕복 변환하여 존재할 수 없는 날짜가 실패해야 합니다.
  - `preview.src`는 `/`로 시작해야 하고, `preview.source_url`은 HTTPS여야 하며, `alt`와 `rights`는 비어 있지 않아야 합니다.
  - Record, Area 및 Collection 객체는 알 수 없는 키를 거부합니다.
  - 중복 ID, URL, Area 및 Collection은 객체별 검증 후 보고합니다.
  - 레코드 관계는 파싱된 레지스트리 식별자와 대조하여 확인합니다.
  - 이번 릴리스의 영어 레코드는 `source_language: "en"`, `language: "en"`, `translation_of: null`이어야 합니다.
  - 발견 가능한 모든 오류를 결정적인 파일/필드 순서로 반환합니다.
  - `parseReferenceCatalog`는 메시지가 `Invalid reference catalog:`로 시작하고 각 검증 오류를 별도 줄에 포함하는 하나의 `Error`를 던집니다.

### 1.4 집중 테스트 및 저장소 테스트 실행

- [ ] 실행:

```bash
npx vitest run src/content/reference-schema.test.ts
npm run typecheck
```

- [ ] 두 명령이 모두 통과하는지 확인합니다.

### 1.5 작업 1 커밋

- [ ] 스키마와 해당 테스트만 커밋합니다:

```bash
git add src/content/reference-schema.ts src/content/reference-schema.test.ts
git commit -m "feat: define validated reference schema"
```

---

## 작업 2: 로컬 콘텐츠 로드 및 검토 레코드 9개 작성

**파일:**

- 생성: `src/content/reference-store.ts`
- 생성: `src/content/reference-store.test.ts`
- 생성: `src/content/reference-content.test.ts`
- 생성: `content/areas/en.json`
- 생성: `content/collections/en.json`
- 생성: `content/references/en/taste-is-eating-silicon-valley.json`
- 생성: `content/references/en/web-interface-guidelines.json`
- 생성: `content/references/en/developing-taste.json`
- 생성: `content/references/en/pasito.json`
- 생성: `content/references/en/vaul.json`
- 생성: `content/references/en/family-wallet.json`
- 생성: `content/references/en/on-taste-part-3.json`
- 생성: `content/references/en/manage-design-projects.json`
- 생성: `content/references/en/ux-engineer-a-terminal-career.json`
- 수정: `references/index.md`
- 수정: `references/log.md`
- 수정: `package.json`

### 2.1 실패하는 로더 테스트 작성

- [ ] `src/content/reference-store.test.ts`에서 임시 콘텐츠 루트를 테스트합니다. 테스트는 `fs.mkdtemp`로 fixture 디렉터리를 만들고, `fs.writeFile`로 JSON을 작성하며, `afterEach`에서 바로 그 임시 디렉터리를 정리해야 합니다.
- [ ] 다음 동작을 다룹니다:
  - `areas/en.json`, `collections/en.json` 및 모든 `references/en/*.json` 파일을 읽음
  - 모든 파일 값을 `parseReferenceCatalog`에 전달함
  - 잘못된 JSON에 대해 문제가 있는 상대 파일 경로를 보고함
  - 유효하지 않은 콘텐츠에 대해 문제가 있는 상대 파일 경로와 필드를 보고함
  - 레코드를 `added` 내림차순으로 정렬한 다음 `localeCompare("en")`을 사용해 `title`로 정렬함
  - 공개적으로는 `published` 레코드만 반환함
  - 호출자가 `includeReview: true`를 명시적으로 전달한 경우에만 `review` 레코드를 포함함
  - `draft` 및 `archived` 레코드는 항상 제외함

- [ ] 테스트에서 다음 공개 인터페이스를 사용합니다:

```ts
import {
  loadReferenceCatalog,
  selectVisibleReferences,
} from "./reference-store";

const catalog = await loadReferenceCatalog(fixtureRoot);
expect(catalog.records.map(({ id }) => id)).toEqual([
  "newer-title",
  "older-title",
]);

expect(selectVisibleReferences(catalog.records)).toEqual([
  expect.objectContaining({ status: "published" }),
]);

expect(
  selectVisibleReferences(catalog.records, { includeReview: true }),
).toEqual([
  expect.objectContaining({ status: "published" }),
  expect.objectContaining({ status: "review" }),
]);
```

### 2.2 로더 테스트가 실패하는지 확인

- [ ] 실행:

```bash
npx vitest run src/content/reference-store.test.ts
```

- [ ] 해결되지 않은 `./reference-store` import가 예상한 실패인지 확인합니다.

### 2.3 파일 시스템 로더 구현

- [ ] 다음 내용으로 `src/content/reference-store.ts`를 생성합니다:

```ts
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import {
  parseReferenceCatalog,
  type ReferenceCatalog,
  type ReferenceRecord,
} from "./reference-schema";

const DEFAULT_CONTENT_ROOT = path.join(process.cwd(), "content");

export async function loadReferenceCatalog(
  contentRoot = DEFAULT_CONTENT_ROOT,
): Promise<ReferenceCatalog>;

export function selectVisibleReferences(
  records: ReferenceRecord[],
  options?: { includeReview?: boolean },
): ReferenceRecord[];
```

- [ ] 두 레지스트리를 한 번 읽고, `references/en` 아래에서 `.json`으로 끝나는 파일명만 나열하며, 읽기 전에 파일명을 정렬하고, 경로를 포함한 오류로 JSON을 파싱하고, `parseReferenceCatalog`를 한 번 호출한 다음 승인된 결정적 레코드 정렬을 적용합니다.
- [ ] 이 모듈에는 `fetch`, React API, 요청 상태 및 mutation이 없어야 합니다.

### 2.4 Area 및 Collection 레지스트리 작성

- [ ] `content/areas/en.json`을 다음 내용 그대로 생성합니다:

```json
[
  {
    "id": "design-engineering-foundations",
    "label": "Design Engineering Foundations",
    "description": "Core perspectives on the role, judgment, and practice of connecting design intent with implementation."
  },
  {
    "id": "interface-implementation",
    "label": "Interface Implementation",
    "description": "Component structure, state, responsive behavior, and frontend techniques that turn interface decisions into working software."
  },
  {
    "id": "interaction-and-motion",
    "label": "Interaction and Motion",
    "description": "Feedback, transitions, gestures, and temporal behavior that make interfaces understandable and responsive."
  },
  {
    "id": "design-systems-and-tokens",
    "label": "Design Systems and Tokens",
    "description": "Reusable foundations, component systems, tokens, and governance that align design and engineering."
  },
  {
    "id": "prototyping-and-tooling",
    "label": "Prototyping and Tooling",
    "description": "Tools and prototyping practices that help teams explore, communicate, and test interface ideas."
  },
  {
    "id": "accessibility-and-inclusive-design",
    "label": "Accessibility and Inclusive Design",
    "description": "Practices that make interfaces usable across abilities, input methods, preferences, and environments."
  },
  {
    "id": "collaboration-handoff-and-workflow",
    "label": "Collaboration, Handoff, and Workflow",
    "description": "Shared processes and artifacts that keep design and engineering aligned throughout delivery."
  },
  {
    "id": "frontend-quality-and-performance",
    "label": "Frontend Quality and Performance",
    "description": "Reliability, performance, and implementation quality as they affect the user experience."
  }
]
```

- [ ] `content/collections/en.json`을 다음과 같이 생성합니다:

```json
[]
```

### 2.5 검토 중인 레코드 9개 작성

- [ ] 다음 승인된 초안 메타데이터를 사용해 레코드마다 파일 하나를 생성합니다. 모든 `status`는 `review`, 모든 `preview`는 `null`로 유지합니다.

```json
{
  "id": "taste-is-eating-silicon-valley",
  "title": "Taste Is Eating Silicon Valley.",
  "url": "https://www.workingtheorys.com/p/taste-is-eating-silicon-valley",
  "publisher": "Working Theorys",
  "author": "Anu",
  "summary": "Anu argues that as software production becomes less scarce, product design, brand, experience, and cultural awareness become stronger differentiators.",
  "relevance": "A perspective on why implementation quality alone does not define a compelling product and why design engineers need coherent product judgment.",
  "format": "article",
  "areas": ["design-engineering-foundations"],
  "collections": [],
  "source_language": "en",
  "published": "2024-09-19",
  "added": "2026-08-14",
  "reviewed": "2026-08-14",
  "status": "review",
  "preview": null,
  "language": "en",
  "translation_of": null
}
```

```json
{
  "id": "web-interface-guidelines",
  "title": "Web Interface Guidelines",
  "url": "https://interfaces.rauno.me/",
  "publisher": "Web Interface Guidelines",
  "author": null,
  "summary": "A living checklist of interface details spanning forms, typography, motion, touch, performance, accessibility, and feedback.",
  "relevance": "Makes tacit frontend craft decisions reviewable while reminding teams to test each guideline against current browser and product context.",
  "format": "documentation",
  "areas": [
    "interface-implementation",
    "interaction-and-motion",
    "accessibility-and-inclusive-design",
    "frontend-quality-and-performance"
  ],
  "collections": [],
  "source_language": "en",
  "published": null,
  "added": "2026-08-14",
  "reviewed": "2026-08-14",
  "status": "review",
  "preview": null,
  "language": "en",
  "translation_of": null
}
```

```json
{
  "id": "developing-taste",
  "title": "Developing Taste",
  "url": "https://emilkowal.ski/ui/developing-taste",
  "publisher": "Emil Kowalski",
  "author": "Emil Kowalski",
  "summary": "Emil Kowalski presents taste as trainable through sustained exposure, explicit analysis, repeated practice, and critique.",
  "relevance": "Connects observation with implementation and feedback, offering an accessible starting loop for developing design-engineering judgment.",
  "format": "article",
  "areas": ["design-engineering-foundations"],
  "collections": [],
  "source_language": "en",
  "published": null,
  "added": "2026-08-14",
  "reviewed": "2026-08-14",
  "status": "review",
  "preview": null,
  "language": "en",
  "translation_of": null
}
```

```json
{
  "id": "pasito",
  "title": "Pasito",
  "url": "https://joshpuckett.me/pasito",
  "publisher": "Josh Puckett",
  "author": "Josh Puckett",
  "summary": "A demonstration and API reference for a React stepper with multiple orientations, autoplay, windowing, theming, and documented accessibility semantics.",
  "relevance": "Shows how a compact interaction primitive can combine live examples, usage code, customization, motion, and accessibility considerations.",
  "format": "tool",
  "areas": [
    "interface-implementation",
    "interaction-and-motion",
    "accessibility-and-inclusive-design"
  ],
  "collections": [],
  "source_language": "en",
  "published": null,
  "added": "2026-08-14",
  "reviewed": "2026-08-14",
  "status": "review",
  "preview": null,
  "language": "en",
  "translation_of": null
}
```

```json
{
  "id": "vaul",
  "title": "Vaul",
  "url": "https://vaul.emilkowal.ski/",
  "publisher": "Vaul",
  "author": null,
  "summary": "A focused landing page and demonstration for a React drawer component, with direct paths to its documentation and source.",
  "relevance": "Provides a concise example of presenting a spatial, gesture-oriented interaction while keeping implementation resources close to the demo.",
  "format": "tool",
  "areas": [
    "interface-implementation",
    "interaction-and-motion",
    "accessibility-and-inclusive-design"
  ],
  "collections": [],
  "source_language": "en",
  "published": null,
  "added": "2026-08-14",
  "reviewed": "2026-08-14",
  "status": "review",
  "preview": null,
  "language": "en",
  "translation_of": null
}
```

```json
{
  "id": "family-wallet",
  "title": "Family Wallet",
  "url": "https://www.raphaelsalaja.com/work/family-wallet",
  "publisher": "Raphael Salaja",
  "author": "Raphael Salaja",
  "summary": "A compact recreation of a multi-stage wallet-customization flow that frames component complexity as a state-modeling problem.",
  "relevance": "Offers an applied prompt for planning predictable state transitions before building a visually rich interactive component.",
  "format": "case-study",
  "areas": ["interface-implementation", "interaction-and-motion"],
  "collections": [],
  "source_language": "en",
  "published": null,
  "added": "2026-08-14",
  "reviewed": "2026-08-14",
  "status": "review",
  "preview": null,
  "language": "en",
  "translation_of": null
}
```

```json
{
  "id": "on-taste-part-3",
  "title": "On Taste, Part 3",
  "url": "https://medium.com/the-year-of-the-looking-glass/on-taste-part-3-d7d9f069f0b2",
  "publisher": "The Year of the Looking Glass",
  "author": "Julie Zhuo",
  "summary": "Julie Zhuo describes six practices for strengthening taste through observation, critique, discussion, practice, and candid feedback.",
  "relevance": "Provides a durable learning loop that crosses visual design, interaction, and implementation while remaining clearly framed as practitioner advice.",
  "format": "article",
  "areas": ["design-engineering-foundations"],
  "collections": [],
  "source_language": "en",
  "published": "2013-05-23",
  "added": "2026-08-14",
  "reviewed": "2026-08-14",
  "status": "review",
  "preview": null,
  "language": "en",
  "translation_of": null
}
```

```json
{
  "id": "manage-design-projects",
  "title": "Manage design projects",
  "url": "https://linear.app/method/manage-design-projects",
  "publisher": "Linear",
  "author": null,
  "summary": "Linear describes how its team moves design work from problem verification and open exploration into focused feedback, task decomposition, and continuous engineering collaboration.",
  "relevance": "Treats handoff as shared project context rather than a final transfer and offers concrete ways to represent uncertain design work.",
  "format": "article",
  "areas": ["collaboration-handoff-and-workflow"],
  "collections": [],
  "source_language": "en",
  "published": null,
  "added": "2026-08-14",
  "reviewed": "2026-08-14",
  "status": "review",
  "preview": null,
  "language": "en",
  "translation_of": null
}
```

```json
{
  "id": "ux-engineer-a-terminal-career",
  "title": "UX Engineer, a terminal career",
  "url": "https://blog.damato.design/posts/terminal-career/",
  "publisher": "D'Amato Design",
  "author": "Donnie D'Amato",
  "summary": "Donnie D'Amato uses personal career experience to examine why hybrid UX engineering roles can lack suitable management, expectations, interviews, and advancement paths.",
  "relevance": "Expands design-engineering discussion beyond craft into the organizational support and career structures needed to sustain boundary-spanning work.",
  "format": "article",
  "areas": [
    "design-engineering-foundations",
    "design-systems-and-tokens",
    "collaboration-handoff-and-workflow"
  ],
  "collections": [],
  "source_language": "en",
  "published": null,
  "added": "2026-08-14",
  "reviewed": "2026-08-14",
  "status": "review",
  "preview": null,
  "language": "en",
  "translation_of": null
}
```

### 2.6 실제 콘텐츠 검증 테스트 및 명령 추가

- [ ] `src/content/reference-content.test.ts`를 생성합니다:

```ts
import { describe, expect, it } from "vitest";
import { loadReferenceCatalog } from "./reference-store";

describe("reference content", () => {
  it("loads the approved English foundation set in review", async () => {
    const catalog = await loadReferenceCatalog();

    expect(catalog.areas).toHaveLength(8);
    expect(catalog.collections).toEqual([]);
    expect(catalog.records).toHaveLength(9);
    expect(new Set(catalog.records.map(({ status }) => status))).toEqual(
      new Set(["review"]),
    );
  });
});
```

- [ ] `package.json` scripts를 다음과 같이 변경합니다:

```json
{
  "references:graph:check": "node scripts/reference-graph.mjs references/candidates",
  "references:records:check": "vitest run src/content/reference-content.test.ts",
  "references:check": "npm run references:graph:check && npm run references:records:check"
}
```

기존 `check` script가 계속 `npm run references:check`로 시작하도록 변경하지 않습니다.

### 2.7 검토 단계 워크플로 상태 기록

- [ ] 레코드가 아직 검토 중일 때 `references/index.md`를 업데이트합니다:
  - 초안 레코드: 0
  - 검토 중 레코드: 9
  - 게시된 레코드: 0
  - 기본 공개 Area 및 레코드 경로와 함께 9개 행을 모두 Review 표에 추가합니다.
  - 웨이브 1의 “records have not yet been created” 메모를 검토 레코드 9개가 이제 명시적 공개 메타데이터 게이트를 기다린다는 메모로 교체합니다.
- [ ] `references/log.md`를 다시 쓰지 말고, Change, Affected ID 9개 전체, 게시가 아닌 초안 작성을 승인한 Candidate/디자인 명세 승인을 포함하는 `ingest | DENG wave 1 review records drafted` 항목을 추가합니다.

### 2.8 작업 2 검증 및 커밋

- [ ] 실행:

```bash
npx vitest run src/content/reference-schema.test.ts src/content/reference-store.test.ts src/content/reference-content.test.ts
npm run references:check
npm run typecheck
```

- [ ] 모든 명령이 통과하고 소스 URL이 요청되지 않았는지 확인합니다.
- [ ] 커밋:

```bash
git add package.json src/content content references/index.md references/log.md
git commit -m "feat: add reviewed reference records"
```

---

## 작업 3: 서버 렌더링 References 인덱스 구축

**파일:**

- 생성: `src/content/reference-filters.ts`
- 생성: `src/content/reference-filters.test.ts`
- 생성: `src/components/reference-card.tsx`
- 생성: `src/components/reference-index.tsx`
- 생성: `src/components/reference-index.test.tsx`
- 수정: `src/app/[lang]/references/page.tsx`
- 수정: `src/app/[lang]/page-shells.test.tsx`
- 수정: `src/app/[lang]/explore/page.tsx`
- 수정: `src/i18n/dictionaries/types.ts`
- 수정: `src/i18n/dictionaries/en.ts`
- 수정: `src/app/globals.css`

### 3.1 번들된 Next.js 가이드 읽기

- [ ] 다음의 정확한 번들 가이드를 읽습니다:
  - `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`
  - `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
  - `node_modules/next/dist/docs/01-app/02-guides/testing/vitest.md`
  - `node_modules/next/dist/docs/01-app/02-guides/testing/playwright.md`
  - `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/page.md`
- [ ] Next.js 16이 `params`와 `searchParams`를 Promise로 제공하고, `searchParams`를 읽으면 라우트가 요청 시 렌더링된다는 점을 구현 메모에 기록합니다.

### 3.2 실패하는 필터 테스트 작성

- [ ] 작은 타입 지정 fixture와 다음 테스트를 포함하는 `src/content/reference-filters.test.ts`를 생성합니다:
  - 쿼리가 없으면 표시 가능한 모든 레코드를 반환함
  - 유효한 Area 필터
  - 유효한 Format 필터
  - 유효한 Area와 Format의 교집합
  - 알 수 없는 Area 또는 Format은 전체 필터 상태를 폐기하고 표시 가능한 모든 레코드를 반환함
  - 일치 항목이 없는 유효한 필터는 빈 배열을 반환함
  - 반복된 쿼리 값은 첫 번째 문자열만 사용함

- [ ] 다음 공개 계약을 정확히 사용합니다:

```ts
export interface ReferenceFilterState {
  area: string | null;
  format: ReferenceFormat | null;
  hasInvalidValue: boolean;
}

export function parseReferenceFilters(
  searchParams: Record<string, string | string[] | undefined>,
  catalog: Pick<ReferenceCatalog, "areas">,
): ReferenceFilterState;

export function filterReferences(
  records: ReferenceRecord[],
  filters: ReferenceFilterState,
): ReferenceRecord[];
```

- [ ] `npx vitest run src/content/reference-filters.test.ts`를 실행하고 누락된 모듈로 인해 실패하는지 확인합니다.

### 3.3 순수 필터링 헬퍼 구현

- [ ] `parseReferenceFilters`에서는 레지스트리에 존재하는 Area ID와 `REFERENCE_FORMATS` 중 하나만 허용합니다.
- [ ] 제공된 값 중 하나라도 알 수 없으면 `{ area: null, format: null, hasInvalidValue: true }`를 반환합니다.
- [ ] `filterReferences`에서는 필터링을 제외하고 입력 순서를 그대로 반환합니다. UI 계층에서 정렬하지 않습니다.
- [ ] 집중 테스트를 실행하고 통과하는지 확인합니다.

### 3.4 실패하는 컴포넌트 테스트 작성

- [ ] `src/components/reference-index.test.tsx`를 생성합니다. 타입이 지정된 레코드 및 레지스트리 fixture로 동기식 `ReferenceIndex`를 렌더링하고 다음을 확인합니다:
  - 개수에 `aria-live="polite"`를 사용함
  - 카드가 format, title, publisher, 선택적 author, summary, relevance, Area 레이블, 소스 언어 및 검토 날짜를 렌더링함
  - 제목 링크와 명시적인 `Visit original source` 링크가 모두 정식 URL을 사용함
  - 링크에 `target="_blank"`가 없음
  - author와 게시 날짜가 없을 때 빈 레이블이 생성되지 않음
  - `preview: null`이 중립적인 프로젝트 처리를 렌더링함
  - 필터 컨트롤에 접근 가능한 레이블이 있고, 선택된 유효 값을 유지하며, GET으로 제출하고, `/en/references`로 이동하는 초기화 링크를 제공함
  - 검토 프리뷰가 눈에 보이는 비프로덕션 배너를 렌더링함
  - 유효한 0건 결과 입력이 결과 없음 메시지와 초기화 동작을 렌더링함

- [ ] 테스트에서 컴포넌트 계약을 다음과 같이 정의합니다:

```tsx
<ReferenceIndex
  lang="en"
  records={records}
  areas={areas}
  filters={{ area: null, format: null, hasInvalidValue: false }}
  isReviewPreview={false}
  dictionary={dictionary}
/>
```

- [ ] `npx vitest run src/components/reference-index.test.tsx`를 실행하고 누락된 컴포넌트로 인해 실패하는지 확인합니다.

### 3.5 영어 사전 계약 추가

- [ ] 기존 References 빈 상태 문구를 다음 타입 지정 문자열로 교체합니다:

```ts
references: {
  count: (count: number) => string;
  areaFilter: string;
  formatFilter: string;
  allAreas: string;
  allFormats: string;
  applyFilters: string;
  clearFilters: string;
  noResults: string;
  previewBanner: string;
  neutralPreview: string;
  relevance: string;
  sourceLanguage: string;
  reviewed: string;
  visitSource: string;
  formats: Record<ReferenceFormat, string>;
}
```

- [ ] 간결한 영어 문구를 사용합니다:
  - 페이지 설명: `Reviewed design-engineering resources with original summaries and direct links to their canonical sources.`
  - 개수: 단수 `1 reference`, 복수 `N references`
  - 필터: `Area`, `Format`, `All areas`, `All formats`, `Apply filters`, `Clear filters`
  - 결과 없음: `No reviewed references match these filters.`
  - 배너: `Editorial preview: review records are visible in this development build.`
  - 중립 프리뷰: `Project-reviewed reference`
  - 레이블: `Why it matters`, `Source language`, `Reviewed`
  - 동작: `Visit original source`
  - 형식: `Article`, `Documentation`, `Tool`, `Case study`

### 3.6 Server Components 구현

- [ ] `src/components/reference-card.tsx`를 동기식 컴포넌트로 생성합니다. 의미론적 `article`, 제목, 설명 문단, 적절한 경우 정의 목록 메타데이터, Area 목록 및 이해하기 쉬운 링크 2개를 사용합니다.
- [ ] 결과 개수, GET 필터 form, 선택적 프리뷰 배너, grid 및 결과 없음 상태를 담당하는 동기식 컴포넌트로 `src/components/reference-index.tsx`를 생성합니다.
- [ ] 모든 시각적 레이블을 제공된 dictionary에 둡니다. 어느 컴포넌트에서도 전역 영어 dictionary를 직접 import하지 않습니다.
- [ ] 검토 날짜에는 `<time dateTime={record.reviewed}>`를 사용합니다.
- [ ] 중립 프리뷰를 `aria-hidden` 세부 요소가 있는 텍스트/장식적 도형으로 렌더링합니다. 이미지 요청을 추가하지 않습니다.
- [ ] 필터 컨트롤을 네이티브로 유지합니다. JavaScript 상태나 숨겨진 브라우저 영속성을 추가하지 않습니다.

### 3.7 라우트 연결

- [ ] `src/app/[lang]/references/page.tsx`를 다음과 같이 업데이트합니다:

```tsx
type ReferencesPageProps = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ReferencesPage({
  params,
  searchParams,
}: ReferencesPageProps) {
  const [{ lang }, query, catalog] = await Promise.all([
    params,
    searchParams,
    loadReferenceCatalog(),
  ]);
  const dictionary = await loadDictionary(lang);
  const isReviewPreview =
    process.env.NODE_ENV === "development" &&
    firstValue(query.preview) === "review";
  const visible = selectVisibleReferences(catalog.records, {
    includeReview: isReviewPreview,
  });
  const filters = parseReferenceFilters(query, catalog);
  const records = filterReferences(visible, filters);

  return (
    <section className="shell page-lead">
      <p className="eyebrow">{dictionary.pages.references.eyebrow}</p>
      <h1>{dictionary.pages.references.title}</h1>
      <p className="lede">{dictionary.pages.references.description}</p>
      <ReferenceIndex
        lang={lang}
        records={records}
        areas={catalog.areas}
        filters={filters}
        isReviewPreview={isReviewPreview}
        dictionary={dictionary.references}
      />
    </section>
  );
}
```

- [ ] 문자열 또는 배열에서 첫 번째 문자열을 반환하는 작은 로컬 `firstValue` 헬퍼를 유지하거나 도입합니다. 공개 필터 API를 통해 `preview`를 노출하지 않습니다.
- [ ] Promise인 `searchParams` prop에 맞게 `src/app/[lang]/page-shells.test.tsx`를 업데이트하고, production/test 모드에서 `?preview=review`가 검토 레코드를 노출하지 않는지 검증합니다.
- [ ] Area 또는 Collection 페이지를 약속하지 않으면서 사용자를 `/en/references`로 정확히 안내하도록 Explore의 임시 문구와 링크를 업데이트합니다.

### 3.8 반응형 스타일 추가

- [ ] 기존 token과 시각 언어를 사용해 `src/app/globals.css`를 확장합니다:
  - 가로 overflow 없이 줄바꿈되는 간결한 필터 행
  - 좁은 화면에서는 1열 카드, 콘텐츠 가독성이 유지되는 경우에만 2열
  - select, button, 초기화 링크, 제목 링크 및 소스 링크에 눈에 보이는 키보드 focus
  - 소스 소유권을 암시하지 않는 중립적 프리뷰 처리
  - 충분한 contrast를 갖춘 메타데이터 및 Area pill
  - hover에서만 제공되는 정보 없음
  - 기존 `prefers-reduced-motion` 동작을 준수하고 새 animation을 추가하지 않음

### 3.9 작업 3 검증 및 커밋

- [ ] 실행:

```bash
npx vitest run src/content/reference-filters.test.ts src/components/reference-index.test.tsx "src/app/[lang]/page-shells.test.tsx"
npm run lint
npm run typecheck
npm run build
```

- [ ] 네트워크 접근 없이 빌드가 성공하고 검토 프리뷰가 개발 환경에서만 제공되는지 확인합니다.
- [ ] 커밋:

```bash
git add src
git commit -m "feat: render the public reference index"
```

---

## 작업 4: 편집 게이트 실행 및 승인된 레코드 게시

**파일:**

- 수정: `content/references/en/*.json`
- 수정: `src/content/reference-content.test.ts`
- 수정: `references/candidates/taste-is-eating-silicon-valley.md`
- 수정: `references/candidates/web-interface-guidelines.md`
- 수정: `references/candidates/developing-taste.md`
- 수정: `references/candidates/pasito.md`
- 수정: `references/candidates/vaul.md`
- 수정: `references/candidates/family-wallet.md`
- 수정: `references/candidates/on-taste-part-3.md`
- 수정: `references/candidates/manage-design-projects.md`
- 수정: `references/candidates/ux-engineer-a-terminal-career.md`
- 수정: `references/index.md`
- 수정: `references/log.md`

### 4.1 개발 프리뷰 시작

- [ ] `npm run dev`를 실행하고 `/en/references?preview=review`를 엽니다.
- [ ] 카드 9개가 모두 렌더링되고 편집 프리뷰 배너가 표시되는지 확인합니다.
- [ ] 데스크톱 및 모바일 너비, 키보드 탐색, focus 표시, 링크 대상, 누락된 날짜 처리 및 필터 조합을 확인합니다.

### 4.2 명시적 메타데이터 체크포인트 제시

- [ ] 다음을 포함하는 간결한 검토 표로 레코드 9개를 관리자에게 제시합니다:
  - title 및 정식 URL
  - publisher 및 author
  - summary
  - relevance
  - format
  - Area
  - published, added 및 reviewed 날짜

- [ ] 이 지점에서 구현을 중단합니다. 명시적 승인 또는 수정을 요청합니다. 이전 Candidate 승인이나 디자인 명세 승인만을 근거로 어떤 `status`도 `published`로 변경하지 않습니다.

### 4.3 요청된 메타데이터 수정 적용

- [ ] 관리자가 요청한 수정만 적용합니다.
- [ ] 수정으로 사실적 귀속, 날짜 또는 정식 URL이 변경되면 먼저 기존 영어 분석 및 Candidate와 대조해 확인합니다. 로컬 근거가 부족하고 관리자가 확장 검증을 승인한 경우에만 소스를 탐색합니다.
- [ ] 실질적으로 변경된 레코드의 `reviewed`를 수정 날짜로 업데이트합니다.
- [ ] `npm run references:check`를 실행하고 수정이 중대한 경우 변경된 필드를 다시 제시합니다.

### 4.4 명시적 승인 후에만 게시

- [ ] 승인 후 9개 `status` 값을 모두 `review`에서 `published`로 변경합니다.
- [ ] 게시된 레코드 9개와 검토 레코드 0개를 기대하도록 `src/content/reference-content.test.ts`를 업데이트합니다:

```ts
expect(catalog.records).toHaveLength(9);
expect(catalog.records.every(({ status }) => status === "published")).toBe(
  true,
);
expect(selectVisibleReferences(catalog.records)).toHaveLength(9);
```

- [ ] 각 Candidate의 기존 `publication.notes`에 공개 레코드가 `content/references/en/<id>.json`에 생성·검토·게시되었다는 짧은 메모를 추가합니다. discovery lifecycle을 변경하거나 두 번째 publication decision을 만들지 않습니다.
- [ ] `references/index.md`를 업데이트합니다:
  - 초안 레코드: 0
  - 검토 중 레코드: 0
  - 게시된 레코드: 9
  - ID, 기본 Area 또는 레코드 경로를 변경하지 않고 9개 행을 모두 Review 표에서 Published 표로 이동합니다.
  - 웨이브 1 검토 게이트 메모를 완료 메모로 교체합니다.
  - 해결된 “Create and validate reference records” 이슈를 제거합니다.
- [ ] `references/log.md`를 다시 쓰지 말고, Change, Affected ID 9개 전체 및 관리자의 명시적 승인 날짜를 포함하는 `review | DENG wave 1 public records published` 항목을 추가합니다.

### 4.5 작업 4 검증 및 커밋

- [ ] 실행:

```bash
npm run references:check
npx vitest run src/content src/components/reference-index.test.tsx "src/app/[lang]/page-shells.test.tsx"
npm run typecheck
```

- [ ] preview 매개변수 없이 `/en/references`를 열고 승인된 레코드 9개가 모두 렌더링되는지 확인합니다.
- [ ] 커밋:

```bash
git add content src/content/reference-content.test.ts references
git commit -m "feat: publish first reference set"
```

---

## 작업 5: 범위가 제한된 수동 링크 상태 유지관리 추가

**파일:**

- 생성: `scripts/reference-link-health.mjs`
- 생성: `scripts/reference-link-health.test.mjs`
- 수정: `package.json`
- 수정: `README.md`

### 5.1 실패하는 링크 상태 테스트 작성

- [ ] Vitest와 주입된 가짜 `fetchImpl` 함수를 사용해 `scripts/reference-link-health.test.mjs`를 생성합니다. 다음을 다룹니다:
  - 2xx 응답은 `healthy`로 보고함
  - 하나 이상의 3xx 응답은 `redirect`와 최종 확인된 대상을 보고함
  - redirect loop 또는 5회를 초과한 hop은 `unavailable`로 보고함
  - HEAD 405는 GET으로 한 번 재시도함
  - timeout 또는 abort는 다른 결과를 버리지 않고 `unavailable`로 보고함
  - 네트워크 오류는 오류 메시지와 함께 `unavailable`로 보고함
  - 동시성은 진행 중인 요청 4개를 절대 초과하지 않음
  - 하나 이상의 대상이 unavailable일 때만 process exit code가 0이 아님

- [ ] 다음 export 인터페이스를 테스트합니다:

```js
export async function checkReferenceUrl(
  record,
  { fetchImpl = fetch, timeoutMs = 10000 } = {},
) {}

export async function checkReferenceLinks(
  records,
  { fetchImpl = fetch, timeoutMs = 10000, concurrency = 4 } = {},
) {}
```

- [ ] `npx vitest run scripts/reference-link-health.test.mjs`를 실행하고 누락된 모듈로 인해 실패하는지 확인합니다.

### 5.2 수동 명령 구현

- [ ] Node 내장 `fetch`와 `AbortSignal.timeout`으로 `scripts/reference-link-health.mjs`를 구현합니다.
- [ ] `references:records:check`가 검증한 후에만 `content/references/en/*.json`을 읽습니다.
- [ ] `redirect: "manual"`로 HEAD를 보내고, 405 또는 501인 경우에만 GET으로 재시도하며, 응답 body는 절대 다운로드하지 않습니다.
- [ ] 상대 `Location` header를 `new URL(location, currentUrl)`로 확인하고, 최대 5개 hop을 따르며, loop가 종료되도록 방문한 URL의 Set을 유지합니다.
- [ ] 레코드마다 결정적인 한 줄을 출력합니다:

```text
HEALTHY  developing-taste  200  https://emilkowal.ski/ui/developing-taste
REDIRECT media-hover  301  https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/hover
UNAVAILABLE example  timeout  https://example.com/
```

- [ ] 합계를 출력하고 unavailable인 레코드가 있으면 `process.exitCode = 1`로 설정합니다. 레코드를 변경하지 않습니다.

### 5.3 옵트인 스크립트 및 문서 추가

- [ ] 추가:

```json
{
  "references:links": "npm run references:records:check && node scripts/reference-link-health.mjs"
}
```

- [ ] `references:links`를 `check`, `build`, 페이지 또는 네트워크에 접속하는 테스트에 추가하지 않습니다.
- [ ] 다음 내용을 문서화하는 짧은 `Reference maintenance` 섹션을 `README.md`에 추가합니다:
  - `content/references/en/<id>.json` 작성
  - 로컬 schema/graph 검증용 `npm run references:check`
  - 선택적 네트워크 유지관리용 `npm run references:links`
  - 외부 장애는 애플리케이션 빌드를 절대 차단하지 않음

### 5.4 작업 5 검증 및 커밋

- [ ] 실행:

```bash
npx vitest run scripts/reference-link-health.test.mjs
npm run references:check
npm run check
```

- [ ] `npm run check`가 네트워크 요청을 수행하지 않는지 확인합니다.
- [ ] `npm run references:links`를 별도로 실행하고 보고서를 유지관리 근거로 기록합니다. 원격 실패는 발견 사항이며 구현 테스트 실패가 아닙니다.
- [ ] 커밋:

```bash
git add scripts/reference-link-health.mjs scripts/reference-link-health.test.mjs package.json README.md
git commit -m "chore: add reference link health check"
```

---

## 작업 6: 브라우저 커버리지 및 저장소 검증 완료

**파일:**

- 수정: `e2e/foundation.spec.ts`
- 수정: `docs/ko/superpowers/plans/2026-08-05-phase-1-technical-foundation.md`
- 수정: `docs/superpowers/plans/2026-08-11-korean-analysis-translations.md`
- 수정: `docs/superpowers/plans/2026-08-12-source-graph-discovery.md`

### 6.1 실패하는 브라우저 어설션 추가

- [ ] 다음 production server 테스트로 `e2e/foundation.spec.ts`를 확장합니다:
  - `/en/references`를 방문해 레퍼런스 카드 9개를 찾음
  - 제목, 결과 개수, 필터 레이블 및 `Visit original source` 링크를 확인함
  - `developing-taste` 링크가 정식 URL을 가리키고 `target="_blank"`가 없는지 확인함
  - `/en/references?area=interaction-and-motion&format=tool`을 방문해 `Pasito`와 `Vaul`만 찾음
  - `/en/references?area=unknown`을 방문해 레코드 9개 전체로 복구되는지 확인함
  - `/en/references?area=prototyping-and-tooling`을 방문해 유효한 결과 없음 상태와 초기화 링크를 확인함
  - production server에서 `/en/references?preview=review`를 방문해 프리뷰 배너가 표시되지 않는지 확인함
  - `/en/references`에 대해 axe를 실행함
  - 좁은 모바일 viewport에서 문서에 가로 overflow가 없는지 확인함
  - Tab을 사용해 필터 컨트롤과 첫 번째 카드 링크에 눈에 보이는 focus가 적용되는지 확인함

- [ ] 집중 Playwright 테스트를 실행하고, 테스트 전용 selector 또는 접근성 조정을 추가하기 전에 새 assertion 하나 이상이 실패하는지 확인합니다.

### 6.2 최소한의 테스트 가능성 수정

- [ ] 의미론적 role/name locator를 우선 사용합니다. 안정적인 의미론적 locator가 없는 경우에만 `data-testid`를 추가합니다.
- [ ] 테스트에서 드러난 실제 접근성, 의미론 또는 반응형 문제만 수정합니다. 이 작업에서 승인된 시각 시스템을 재설계하지 않습니다.

### 6.3 기존 포매팅 경고 3개 정규화

- [ ] 다음 파일에만 Prettier를 실행합니다:

```bash
npx prettier --write docs/ko/superpowers/plans/2026-08-05-phase-1-technical-foundation.md docs/superpowers/plans/2026-08-11-korean-analysis-translations.md docs/superpowers/plans/2026-08-12-source-graph-discovery.md
```

- [ ] diff를 검사하고 포매팅 변경뿐인지 확인합니다. 이 과거 계획의 요구사항을 번역하거나 다시 쓰거나 변경하지 않습니다.

### 6.4 전체 검증 단계 실행

- [ ] 다음 순서로 실행합니다:

```bash
npm run references:check
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

- [ ] 모든 명령이 0으로 종료되는지 확인합니다.
- [ ] 빌드 출력과 애플리케이션 요청에 외부 소스 fetch가 없는지 확인합니다.
- [ ] `git status --short`에 의도한 변경만 표시되는지 확인합니다.
- [ ] 승인된 디자인의 모든 완료 기준에 따라 전체 diff를 검토합니다.

### 6.5 코드 리뷰 요청 및 브랜치 마무리

- [ ] 완료된 브랜치에 `superpowers:requesting-code-review`를 사용합니다.
- [ ] 검증된 High 또는 Medium 발견 사항을 집중 테스트와 함께 해결하고 전체 검증 단계를 다시 실행합니다.
- [ ] 작업 6을 커밋합니다:

```bash
git add e2e/foundation.spec.ts docs/ko/superpowers/plans/2026-08-05-phase-1-technical-foundation.md docs/superpowers/plans/2026-08-11-korean-analysis-translations.md docs/superpowers/plans/2026-08-12-source-graph-discovery.md
git commit -m "test: verify public reference experience"
```

- [ ] `superpowers:finishing-a-development-branch`를 사용해 검증된 merge, PR, 유지 또는 폐기 옵션을 제시합니다. 관리자가 옵션을 선택하지 않은 상태에서 merge하거나 push하지 않습니다.
