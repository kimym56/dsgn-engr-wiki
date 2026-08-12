# 1단계 기술 기반 구현 계획

> 이 문서는 [영문 원본](../../../superpowers/plans/2026-08-05-phase-1-technical-foundation.md)의 한국어 번역본입니다. 영문 원본을 기준 문서로 사용합니다.

> **에이전트 작업자:** 필수 하위 스킬인 `superpowers:subagent-driven-development`(권장) 또는 `superpowers:executing-plans`를 사용하여 이 계획을 작업별로 구현합니다. 단계 추적에는 체크박스(`- [ ]`) 구문을 사용합니다.

**목표:** 홈, 참고 자료, 탐색, 소개를 위한 영어 로케일 접두사 경로와 반복 가능한 품질 게이트를 갖춘 최소한의 접근 가능한 Next.js 애플리케이션 셸을 구축하고 배포합니다.

**아키텍처:** `src/app/[lang]` 아래에서 정적으로 렌더링할 수 있는 Next.js App Router 애플리케이션을 사용합니다. 영어만 게시하고, 한국어는 타입이 지정된 로케일 계약에 예약합니다. 탐색, 문구, 스타일은 프로젝트에서 소유하고 서버에서 렌더링합니다. 루트에서는 `/en`으로 단순 리디렉션하며, 이 단계에서는 콘텐츠 스키마, 참고 자료 레코드, 필터링, 검색, 언어 컨트롤 또는 외부 서비스를 추가하지 않습니다.

**기술 스택:** Node.js 22, npm, Next.js 16.3.0, React 19.2.8, TypeScript 6.0.2, 프로젝트 소유 CSS, ESLint 10.8.0, Prettier 3.9.6, Vitest 4.1.10, Testing Library, Playwright Test 1.62.1, axe-core, GitHub Actions, Vercel.

## 전역 제약

- 제품은 선별된 공개 디자인 엔지니어링 참조 라이브러리입니다. 이는 검색 엔진, 소스 미러, 코스 플랫폼 또는 커뮤니티 제품이 아닙니다.
- 영어는 1단계에서 유일하게 게시된 로캘입니다. 검토된 한국어 메타데이터를 위해 `ko`를 예약하세요. `kr`를 언어 코드로 사용하지 마십시오.
- 모든 공개 애플리케이션 경로는 로캘 접두사로 시작됩니다. `/`는 `/en`로 리디렉션됩니다. URL은 신뢰할 수 있는 언어 상태로 유지됩니다.
- 안정적인 최상위 탐색은 홈, 탐색, 참조 및 정보입니다.
- 두 번째 검토된 로케일이 존재할 때까지 언어 컨트롤을 표시하지 마십시오.
- 참조 스키마, 리소스 레코드, 영역, 컬렉션, 필터, 검색, MDX, 데이터베이스, 인증, CMS, 호스팅 검색, 런타임 스크래핑 또는 외부 소스 요청을 추가하지 마십시오.
- 공개 페이지는 이후 상호 작용에서 특별히 요구하지 않는 한 클라이언트측 JavaScript 없이 렌더링되어야 합니다.
- CSS 사용자 정의 속성과 프로젝트 소유 스타일을 사용합니다. 스타일이나 구성 요소 프레임워크를 추가하지 마세요.
- 자동화된 접근성 검사는 키보드 및 의미론적 검토를 보완하지만 대체하지는 않습니다.
- 결정론적 빌드 및 테스트는 외부 게시자의 온라인 상태에 의존해서는 안 됩니다.
- 정확한 종속성 버전을 사용하고 `package-lock.json`를 커밋합니다.
- 로컬 및 CI에서 Node.js `22.17.0`를 사용하세요. `.nvmrc`를 `22.17.0`로 기록하고 `package.json` 엔진을 `>=22.17.0 <23`로 기록합니다.
- 커밋되지 않은 기존 문서 작업을 보존하고 관련 없는 파일을 다시 작성하지 않습니다.

---

## 범위 경계

이 계획은 로드맵 1단계만 구현합니다. 이후 계획을 위해 의도적으로 승인된 요구 사항을 남겨 둡니다.

- 2단계: 참조, 영역, 컬렉션, 로케일 메타데이터 및 미리보기 스키마 샘플 기록; 확인; 중립 미리보기 대체; 로컬 찾아보기 색인; 링크 건강 도구.
- 3단계: 검색 페이지 채우기, 필터링, 영역 및 컬렉션 경로, 검토된 번역이 있는 언어 전환.
- 4단계 이상: 검색, 제안 워크플로, 광범위한 큐레이션, 유지 관리 자동화.

## 파일 및 책임 맵

### 프로젝트 및 품질 구성

- `package.json` — 정확한 종속성, 노드 엔진 및 정식 로컬/CI 명령.
- `package-lock.json` — `npm install`에 의해 생성된 재현 가능한 npm 종속성 그래프.
- `.nvmrc` — 정확한 로컬 노드 버전.
- `next.config.ts` — 루트에서 영어로 리디렉션되며 다른 애플리케이션 동작은 없습니다.
- `tsconfig.json` — 엄격한 TypeScript 및 `@/*` 소스 별칭입니다.
- `next-env.d.ts` — Next.js에서 생성된 TypeScript 선언; 생성 후에는 편집하지 마세요.
- `eslint.config.mjs` — Next.js 핵심 웹 바이탈 및 TypeScript 린트 규칙.
- `.prettierrc.json` 및 `.prettierignore` — 형식 지정 정책 및 생성된 출력 제외.
- `.gitignore` — 기존 무시를 유지하고 TypeScript 빌드 메타데이터를 추가합니다.
- `vitest.config.ts` 및 `src/test/setup.ts` — jsdom 구성 요소 테스트 환경 및 DOM 일치자.
- `playwright.config.ts` — Chromium 데스크톱/모바일 프로젝트 및 로컬 개발 서버.
- `.github/workflows/ci.yml` — 결정적 설치, 정적 검사, 테스트, 빌드 및 브라우저 검사.

### 로케일 기반

- `src/i18n/config.ts` — 알려지거나 게시된 로케일 상수, 가드 및 로케일 인식 경로 구성.
- `src/i18n/config.test.ts` — 영어 출판, 한국어 예약 및 URL 동작을 보호합니다.
- `src/i18n/dictionaries/types.ts` — 모든 로케일 사전에서 공유되는 복사 계약입니다.
- `src/i18n/dictionaries/en.ts` — 모든 1단계 방문자용 영어 사본.
- `src/i18n/load-dictionary.ts` — 게시되지 않은 로케일을 거부하는 서버 전용 사전 로더입니다.

### 애플리케이션 셸

- `src/app/globals.css` — 디자인 토큰, 반응형 셸, 포커스 스타일 및 모션 감소 동작.
- `src/app/[lang]/layout.tsx` — 로캘 유효성 검사, 문서 언어, 메타데이터, 건너뛰기 링크, 머리글, 주요 랜드마크 및 바닥글.
- `src/components/site-header.tsx` — 클라이언트 JavaScript가 없는 안정적인 로케일 인식 탐색 링크 4개.
- `src/components/site-header.test.tsx` — 접근 가능한 탐색 이름 및 목적지.
- `src/components/site-footer.tsx` — 프로젝트 정체성 및 범위 설명.
- `src/app/[lang]/page.tsx` — 영어 홈 셸과 두 개의 검색 진입점.
- `src/app/[lang]/references/page.tsx` — 미래의 완전한 인덱스를 위한 정직한 빈 상태 쉘입니다.
- `src/app/[lang]/explore/page.tsx` — 향후 영역 및 컬렉션을 위한 정직한 빈 상태 셸입니다.
- `src/app/[lang]/about/page.tsx` — 간결한 범위, 선별 및 소스 ID 설명.
- `src/app/[lang]/not-found.tsx` — 알 수 없는 영어 경로에 대한 복구 UI.
- `src/app/[lang]/[...rest]/page.tsx` — 로케일 복구 UI를 호출하는 명시적 포괄 기능입니다.

### 확인 및 문서화

- `e2e/foundation.spec.ts` — 리디렉션, 탐색, 키보드 건너뛰기 링크, 알 수 없는 경로 복구, 반응형 연기 검사 및 자동화된 접근성 검사.
- `README.md` — 완료된 기반 상태, 정확한 로컬 설정, 명령, 경로 및 배포 경계.

---

### 작업 1: 재현 가능한 Next.js 및 품질 도구 스캐폴드

**파일:**
- 생성: `package.json`
- 생성: `package-lock.json`
- 생성: `.nvmrc`
- 생성: `next.config.ts`
- 생성: `tsconfig.json`
- 생성: `next-env.d.ts`
- 생성: `eslint.config.mjs`
- 생성: `.prettierrc.json`
- 생성: `.prettierignore`
- 생성: `vitest.config.ts`
- 생성: `src/test/setup.ts`
- 수정: `.gitignore`

**인터페이스:**
- 소비: `docs/decisions/0001-recommended-tech-stack.md`에서 허용되는 스택과 `docs/development-process.md`의 1단계 품질 게이트 요구 사항입니다.
- 생성: `npm run dev`, `build`, `start`, `format`, `format:check`, `lint`, `typecheck`, `test`, `test:watch`, `test:e2e` 및 `check`; `@/*` 별칭; 이후 작업에서 사용되는 jsdom Vitest 환경.

- [ ] **1단계: 기존 작업을 변경하지 않고 구현 작업 공간을 확인**

달리다:

```bash
git status --short
node --version
npm --version
```

예상: 승인된 문서 변경 사항은 그대로 유지되고 Node는 `v22.17.0`를 보고하고 npm은 `10.9.2` 또는 호환 가능한 npm 10 릴리스를 보고합니다. 노드가 다른 경우 패키지를 설치하기 전에 노드 `22.17.0`로 리포지토리를 실행하세요.

- [ ] **2단계: 승인된 준비 기준 및 승인된 계획 커밋**

사용자가 이 계획을 승인한 후에만 실행하십시오.

```bash
git diff --check
git add README.md docs templates
git commit -m "docs: approve phase one implementation plan"
```

예상: 승인된 영어/한국어 준비 문서, 결정, 템플릿 및 이 구현 계획은 애플리케이션 코드가 시작되기 전에 캡처됩니다. 애플리케이션 종속성이나 소스 파일은 이 커밋의 일부가 아닙니다.

- [ ] **3단계: 패키지 매니페스트 및 노드 버전 계약 생성**

`package.json` 생성:

```json
{
  "name": "dsgn-engr-wiki",
  "version": "0.1.0",
  "private": true,
  "engines": {
    "node": ">=22.17.0 <23"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "lint": "eslint . --max-warnings=0",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "check": "npm run format:check && npm run lint && npm run typecheck && npm run test && npm run build"
  }
}
```

`.nvmrc` 생성:

```text
22.17.0
```

- [ ] **4단계: 선택한 런타임 및 개발 버전을 정확하게 설치**

달리다:

```bash
npm install --save-exact next@16.3.0 react@19.2.8 react-dom@19.2.8
npm install --save-dev --save-exact typescript@6.0.2 @types/node@22.20.1 @types/react@19.2.17 @types/react-dom@19.2.3 eslint@10.8.0 eslint-config-next@16.3.0 prettier@3.9.6 vitest@4.1.10 jsdom@30.0.1 @testing-library/react@16.3.2 @testing-library/dom@10.4.1 @testing-library/jest-dom@7.0.0 @playwright/test@1.62.1 @axe-core/playwright@4.12.1
```

예상: `package-lock.json`가 생성되고, `package.json`에는 `^` 또는 `~`가 없는 정확한 버전이 포함되며, npm은 피어 종속성 충돌이 없다고 보고합니다. npm이 피어 충돌을 보고하면 선택한 버전 쌍을 중지하고 수정하십시오. `--force` 또는 `--legacy-peer-deps`를 사용하지 마십시오.

- [ ] **5단계: 엄격한 프레임워크, TypeScript, Lint 및 형식 지정 구성 추가**

`next.config.ts` 생성:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
```

`tsconfig.json` 생성:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

`next-env.d.ts` 생성:

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
```

`eslint.config.mjs` 생성:

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  globalIgnores([
    ".next/**",
    "coverage/**",
    "out/**",
    "playwright-report/**",
    "test-results/**",
    "next-env.d.ts",
  ]),
]);
```

`.prettierrc.json` 생성:

```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all"
}
```

`.prettierignore` 생성:

```text
.next
coverage
node_modules
out
package-lock.json
playwright-report
test-results
```

`.gitignore`에 추가:

```text

# TypeScript incremental state
*.tsbuildinfo
```

- [ ] **6단계: 구성 요소 테스트 환경 구성**

`vitest.config.ts` 생성:

```ts
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const repositoryRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": path.join(repositoryRoot, "src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
```

`src/test/setup.ts` 생성:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **7단계: 스캐폴드 구성 포맷 및 확인**

달리다:

```bash
npm run format
npm run format:check
npm run lint
npm run typecheck
```

예상: 네 가지 명령이 모두 통과됩니다. `npm test`는 동작 테스트가 존재한 후 작업 2에서 의도적으로 처음 실행됩니다.

- [ ] **8단계: 스캐폴드 커밋**

```bash
git add .gitignore .nvmrc .prettierignore .prettierrc.json eslint.config.mjs next-env.d.ts next.config.ts package.json package-lock.json src/test/setup.ts tsconfig.json vitest.config.ts
git commit -m "build: scaffold phase one toolchain"
```

---

### 작업 2: 게시된 로캘 및 URL 계약

**파일:**
- 생성: `src/i18n/config.test.ts`
- 생성: `src/i18n/config.ts`
- 생성: `src/i18n/dictionaries/types.ts`
- 생성: `src/i18n/dictionaries/en.ts`
- 생성: `src/i18n/load-dictionary.ts`

**인터페이스:**
- 사용: Next.js `notFound()` 및 작업 1의 `@/*` 별칭.
- 생성: 작업 3 및 4에 대한 `KnownLocale`, `PublishedLocale`, `RouteSegment`, `KNOWN_LOCALES`, `PUBLISHED_LOCALES`, `DEFAULT_LOCALE`, `isKnownLocale(value: string)`, `isPublishedLocale(value: string)`, `localePath(locale, segment)`, `Dictionary` 및 `loadDictionary(locale: string)`.

- [ ] **1단계: 실패한 로케일 계약 테스트 작성**

`src/i18n/config.test.ts` 생성:

```ts
import { describe, expect, it } from "vitest";
import {
  DEFAULT_LOCALE,
  KNOWN_LOCALES,
  PUBLISHED_LOCALES,
  isKnownLocale,
  isPublishedLocale,
  localePath,
} from "@/i18n/config";

describe("locale configuration", () => {
  it("publishes English while reserving Korean", () => {
    expect(DEFAULT_LOCALE).toBe("en");
    expect(PUBLISHED_LOCALES).toEqual(["en"]);
    expect(KNOWN_LOCALES).toEqual(["en", "ko"]);
    expect(isKnownLocale("ko")).toBe(true);
    expect(isPublishedLocale("ko")).toBe(false);
    expect(isKnownLocale("kr")).toBe(false);
  });

  it("builds locale-prefixed application paths", () => {
    expect(localePath("en")).toBe("/en");
    expect(localePath("en", "explore")).toBe("/en/explore");
    expect(localePath("en", "references")).toBe("/en/references");
    expect(localePath("en", "about")).toBe("/en/about");
  });
});
```

- [ ] **2단계: 테스트를 실행하고 누락된 계약이 실패하는지 확인**

달리다:

```bash
npm test -- src/i18n/config.test.ts
```

예상: `@/i18n/config`가 존재하지 않으므로 실패합니다.

- [ ] **3단계: 로케일 상수, 가드 및 URL 도우미 구현**

`src/i18n/config.ts` 생성:

```ts
export const KNOWN_LOCALES = ["en", "ko"] as const;
export const PUBLISHED_LOCALES = ["en"] as const;
export const DEFAULT_LOCALE = "en" satisfies PublishedLocale;

export type KnownLocale = (typeof KNOWN_LOCALES)[number];
export type PublishedLocale = (typeof PUBLISHED_LOCALES)[number];
export type RouteSegment = "explore" | "references" | "about";

export function isKnownLocale(value: string): value is KnownLocale {
  return KNOWN_LOCALES.some((locale) => locale === value);
}

export function isPublishedLocale(value: string): value is PublishedLocale {
  return PUBLISHED_LOCALES.some((locale) => locale === value);
}

export function localePath(
  locale: PublishedLocale,
  segment?: RouteSegment,
): string {
  return segment ? `/${locale}/${segment}` : `/${locale}`;
}
```

- [ ] **4단계: 집중 테스트를 실행하고 통과하는지 확인**

달리다:

```bash
npm test -- src/i18n/config.test.ts
```

예상: 두 개의 테스트가 통과되었습니다.

- [ ] **5단계: 사전 계약 추가 및 영어 쉘 복사 완료**

`src/i18n/dictionaries/types.ts` 생성:

```ts
export type PageKey = "home" | "explore" | "references" | "about";

export interface PageCopy {
  eyebrow: string;
  title: string;
  description: string;
}

export interface Dictionary {
  brand: {
    name: string;
    description: string;
  };
  navigation: Record<PageKey, string>;
  accessibility: {
    primaryNavigation: string;
    skipToContent: string;
  };
  pages: Record<PageKey, PageCopy>;
  homeActions: {
    references: string;
    explore: string;
  };
  emptyState: {
    references: string;
    explore: string;
  };
  about: {
    heading: string;
    statements: readonly string[];
  };
  notFound: {
    eyebrow: string;
    title: string;
    description: string;
    action: string;
  };
}
```

`src/i18n/dictionaries/en.ts` 생성:

```ts
import type { Dictionary } from "@/i18n/dictionaries/types";

export const englishDictionary = {
  brand: {
    name: "DSGN ENGR Wiki",
    description: "A curated library of design-engineering references.",
  },
  navigation: {
    home: "Home",
    explore: "Explore",
    references: "References",
    about: "About",
  },
  accessibility: {
    primaryNavigation: "Primary navigation",
    skipToContent: "Skip to content",
  },
  pages: {
    home: {
      eyebrow: "Design engineering, carefully sourced",
      title: "Useful references from across design and engineering.",
      description:
        "DSGN ENGR Wiki adds concise editorial context to trusted resources, then sends you to the original publisher.",
    },
    references: {
      eyebrow: "Complete library",
      title: "References",
      description:
        "The complete index will make reviewed design-engineering resources easy to scan and evaluate.",
    },
    explore: {
      eyebrow: "Guided discovery",
      title: "Explore",
      description:
        "Areas and editorial collections will offer focused paths through the same canonical reference library.",
    },
    about: {
      eyebrow: "Project scope",
      title: "About DSGN ENGR Wiki",
      description:
        "This project helps designers, frontend developers, and design engineers find reliable material without copying the source.",
    },
  },
  homeActions: {
    references: "Browse references",
    explore: "Explore the library",
  },
  emptyState: {
    references: "The first reviewed reference set is being prepared.",
    explore: "Areas and collections will appear with the first reviewed references.",
  },
  about: {
    heading: "How the library works",
    statements: [
      "Every published reference points to its canonical external source.",
      "Project-owned summaries explain why a resource may be useful.",
      "Selection favors reviewed quality and clear attribution over volume.",
    ],
  },
  notFound: {
    eyebrow: "404",
    title: "Page not found",
    description: "This page does not exist or is not published in this language.",
    action: "Return home",
  },
} satisfies Dictionary;
```

`src/i18n/load-dictionary.ts` 생성:

```ts
import { notFound } from "next/navigation";
import { isPublishedLocale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

const dictionaries = {
  en: async () =>
    import("@/i18n/dictionaries/en").then(
      (module) => module.englishDictionary,
    ),
} satisfies Record<"en", () => Promise<Dictionary>>;

export async function loadDictionary(locale: string): Promise<Dictionary> {
  if (!isPublishedLocale(locale)) {
    notFound();
  }

  return dictionaries[locale]();
}
```

- [ ] **6단계: 집중 및 정적 검사 실행**

달리다:

```bash
npm test -- src/i18n/config.test.ts
npm run lint
npm run typecheck
```

예상: 모든 명령이 경고 없이 통과됩니다.

- [ ] **7단계: 로캘 기반 커밋**

```bash
git add src/i18n
git commit -m "feat: establish locale route contract"
```

---

### 작업 3: 접근 가능한 4-라우트 애플리케이션 셸

**파일:**
- 생성: `src/components/site-header.test.tsx`
- 생성: `src/components/site-header.tsx`
- 생성: `src/components/site-footer.tsx`
- 생성: `src/app/globals.css`
- 생성: `src/app/[lang]/layout.tsx`
- 생성: `src/app/[lang]/page.tsx`
- 생성: `src/app/[lang]/references/page.tsx`
- 생성: `src/app/[lang]/explore/page.tsx`
- 생성: `src/app/[lang]/about/page.tsx`
- 생성: `src/app/[lang]/not-found.tsx`
- 생성: `src/app/[lang]/[...rest]/page.tsx`

**인터페이스:**
- 태스크 2의 `PublishedLocale`, `PUBLISHED_LOCALES`, `isPublishedLocale()`, `localePath()`, `Dictionary`, `loadDictionary()`를 소모합니다.
- 생성: `SiteHeader({ locale, navigationLabel, labels })`, `SiteFooter({ description })`, `/en`, `/en/references`, `/en/explore`, `/en/about` 및 작업 4 브라우저 확인을 위한 로케일 인식 복구 UI.

- [ ] **1단계: 실패한 액세스 가능 탐색 구성요소 테스트 작성**

`src/components/site-header.test.tsx` 생성:

```tsx
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/site-header";

const labels = {
  home: "Home",
  explore: "Explore",
  references: "References",
  about: "About",
};

describe("SiteHeader", () => {
  it("renders the four stable English navigation destinations", () => {
    render(
      <SiteHeader
        locale="en"
        navigationLabel="Primary navigation"
        labels={labels}
      />,
    );

    const navigation = screen.getByRole("navigation", {
      name: "Primary navigation",
    });
    const links = within(navigation).getAllByRole("link");

    expect(links).toHaveLength(4);
    expect(links.map((link) => link.textContent)).toEqual([
      "Home",
      "Explore",
      "References",
      "About",
    ]);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/en",
    );
    expect(screen.getByRole("link", { name: "Explore" })).toHaveAttribute(
      "href",
      "/en/explore",
    );
    expect(screen.getByRole("link", { name: "References" })).toHaveAttribute(
      "href",
      "/en/references",
    );
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/en/about",
    );
  });
});
```

- [ ] **2단계: 구성요소 테스트를 실행하고 실패하는지 확인**

달리다:

```bash
npm test -- src/components/site-header.test.tsx
```

예상: `@/components/site-header`가 존재하지 않으므로 실패합니다.

- [ ] **3단계: 서버에서 렌더링된 머리글 및 바닥글 구현**

`src/components/site-header.tsx` 생성:

```tsx
import Link from "next/link";
import type { PublishedLocale, RouteSegment } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import type { Dictionary, PageKey } from "@/i18n/dictionaries/types";

const navigationItems: readonly {
  key: PageKey;
  segment?: RouteSegment;
}[] = [
  { key: "home" },
  { key: "explore", segment: "explore" },
  { key: "references", segment: "references" },
  { key: "about", segment: "about" },
];

interface SiteHeaderProps {
  locale: PublishedLocale;
  navigationLabel: string;
  labels: Dictionary["navigation"];
}

export function SiteHeader({
  locale,
  navigationLabel,
  labels,
}: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link className="wordmark" href={localePath(locale)}>
          DSGN/ENGR
        </Link>
        <nav aria-label={navigationLabel}>
          <ul className="site-navigation">
            {navigationItems.map(({ key, segment }) => (
              <li key={key}>
                <Link href={localePath(locale, segment)}>{labels[key]}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
```

`src/components/site-footer.tsx` 생성:

```tsx
interface SiteFooterProps {
  description: string;
}

export function SiteFooter({ description }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <strong>DSGN ENGR Wiki</strong>
        <p>{description}</p>
      </div>
    </footer>
  );
}
```

- [ ] **4단계: 구성 요소 테스트를 실행하고 통과하는지 확인**

달리다:

```bash
npm test -- src/components/site-header.test.tsx
```

예상: 한 번의 테스트 통과.

- [ ] **5단계: 로케일 레이아웃 및 의미 문서 셸 구현**

`src/app/[lang]/layout.tsx` 생성:

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  PUBLISHED_LOCALES,
  isPublishedLocale,
} from "@/i18n/config";
import { loadDictionary } from "@/i18n/load-dictionary";
import "../globals.css";

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

interface LocaleRouteProps {
  params: Promise<{ lang: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return PUBLISHED_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LocaleRouteProps): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await loadDictionary(lang);

  return {
    title: {
      default: dictionary.brand.name,
      template: `%s — ${dictionary.brand.name}`,
    },
    description: dictionary.brand.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { lang } = await params;

  if (!isPublishedLocale(lang)) {
    notFound();
  }

  const dictionary = await loadDictionary(lang);

  return (
    <html lang={lang}>
      <body>
        <a className="skip-link" href="#main-content">
          {dictionary.accessibility.skipToContent}
        </a>
        <SiteHeader
          locale={lang}
          labels={dictionary.navigation}
          navigationLabel={dictionary.accessibility.primaryNavigation}
        />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter description={dictionary.brand.description} />
      </body>
    </html>
  );
}
```

- [ ] **6단계: 4개의 정직한 1단계 페이지 쉘 모두 구현**

`src/app/[lang]/page.tsx` 생성:

```tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { isPublishedLocale, localePath } from "@/i18n/config";
import { loadDictionary } from "@/i18n/load-dictionary";

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;

  if (!isPublishedLocale(lang)) {
    notFound();
  }

  const dictionary = await loadDictionary(lang);
  const copy = dictionary.pages.home;

  return (
    <section className="shell page-lead page-lead--home">
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1>{copy.title}</h1>
      <p className="lede">{copy.description}</p>
      <div className="page-actions">
        <Link
          className="button button--primary"
          href={localePath(lang, "references")}
        >
          {dictionary.homeActions.references}
        </Link>
        <Link className="button" href={localePath(lang, "explore")}>
          {dictionary.homeActions.explore}
        </Link>
      </div>
    </section>
  );
}
```

`src/app/[lang]/references/page.tsx` 생성:

```tsx
import type { Metadata } from "next";
import { loadDictionary } from "@/i18n/load-dictionary";

export const metadata: Metadata = { title: "References" };

interface ReferencesPageProps {
  params: Promise<{ lang: string }>;
}

export default async function ReferencesPage({ params }: ReferencesPageProps) {
  const { lang } = await params;
  const dictionary = await loadDictionary(lang);
  const copy = dictionary.pages.references;

  return (
    <section className="shell page-lead">
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1>{copy.title}</h1>
      <p className="lede">{copy.description}</p>
      <p className="empty-state">{dictionary.emptyState.references}</p>
    </section>
  );
}
```

`src/app/[lang]/explore/page.tsx` 생성:

```tsx
import type { Metadata } from "next";
import { loadDictionary } from "@/i18n/load-dictionary";

export const metadata: Metadata = { title: "Explore" };

interface ExplorePageProps {
  params: Promise<{ lang: string }>;
}

export default async function ExplorePage({ params }: ExplorePageProps) {
  const { lang } = await params;
  const dictionary = await loadDictionary(lang);
  const copy = dictionary.pages.explore;

  return (
    <section className="shell page-lead">
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1>{copy.title}</h1>
      <p className="lede">{copy.description}</p>
      <p className="empty-state">{dictionary.emptyState.explore}</p>
    </section>
  );
}
```

`src/app/[lang]/about/page.tsx` 생성:

```tsx
import type { Metadata } from "next";
import { loadDictionary } from "@/i18n/load-dictionary";

export const metadata: Metadata = { title: "About" };

interface AboutPageProps {
  params: Promise<{ lang: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  const dictionary = await loadDictionary(lang);
  const copy = dictionary.pages.about;

  return (
    <div className="shell page-lead">
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1>{copy.title}</h1>
      <p className="lede">{copy.description}</p>
      <section className="principles" aria-labelledby="library-process">
        <h2 id="library-process">{dictionary.about.heading}</h2>
        <ul>
          {dictionary.about.statements.map((statement) => (
            <li key={statement}>{statement}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
```

- [ ] **7단계: 유용한 알 수 없는 경로 복구 추가**

`src/app/[lang]/not-found.tsx` 생성:

```tsx
import Link from "next/link";
import { englishDictionary } from "@/i18n/dictionaries/en";

export default function NotFound() {
  const copy = englishDictionary.notFound;

  return (
    <section className="shell page-lead">
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1>{copy.title}</h1>
      <p className="lede">{copy.description}</p>
      <Link className="button button--primary" href="/en">
        {copy.action}
      </Link>
    </section>
  );
}
```

`src/app/[lang]/[...rest]/page.tsx` 생성:

```tsx
import { notFound } from "next/navigation";

export default function UnknownLocaleRoute() {
  notFound();
}
```

- [ ] **8단계: 프로젝트 소유의 반응형 시각적 기반 추가**

`src/app/globals.css` 생성:

```css
:root {
  --color-canvas: #f4f2ed;
  --color-surface: #ffffff;
  --color-text: #171715;
  --color-muted: #64615a;
  --color-line: #d5d0c6;
  --color-accent: #2447d8;
  --color-accent-strong: #1732a0;
  --font-sans: Arial, Helvetica, sans-serif;
  --space-1: 0.5rem;
  --space-2: 0.75rem;
  --space-3: 1rem;
  --space-4: 1.5rem;
  --space-5: 2rem;
  --space-6: 3rem;
  --space-7: 5rem;
  --radius: 0.35rem;
  --shell: 72rem;
}

* {
  box-sizing: border-box;
}

html {
  background: var(--color-canvas);
  color: var(--color-text);
  font-family: var(--font-sans);
  line-height: 1.5;
}

body {
  min-height: 100vh;
  margin: 0;
}

a {
  color: inherit;
  text-underline-offset: 0.2em;
}

a:hover {
  color: var(--color-accent-strong);
}

:focus-visible {
  outline: 0.2rem solid var(--color-accent);
  outline-offset: 0.2rem;
}

.shell {
  width: min(100% - 2rem, var(--shell));
  margin-inline: auto;
}

.skip-link {
  position: fixed;
  z-index: 10;
  top: var(--space-3);
  left: var(--space-3);
  padding: var(--space-2) var(--space-3);
  background: var(--color-text);
  color: var(--color-surface);
  transform: translateY(-200%);
}

.skip-link:focus {
  color: var(--color-surface);
  transform: translateY(0);
}

.site-header {
  border-bottom: 1px solid var(--color-line);
  background: color-mix(in srgb, var(--color-canvas) 92%, transparent);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  min-height: 4.5rem;
}

.wordmark {
  font-weight: 800;
  letter-spacing: -0.04em;
  text-decoration: none;
}

.site-navigation {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;
}

.site-navigation a {
  font-size: 0.9375rem;
  font-weight: 650;
  text-decoration: none;
}

main {
  min-height: calc(100vh - 12rem);
}

.page-lead {
  padding-block: var(--space-7);
}

.page-lead--home {
  padding-block: clamp(5rem, 14vw, 10rem);
}

.eyebrow {
  margin: 0 0 var(--space-3);
  color: var(--color-accent-strong);
  font-size: 0.8rem;
  font-weight: 750;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h1,
h2,
p {
  margin-top: 0;
}

h1 {
  max-width: 17ch;
  margin-bottom: var(--space-4);
  font-size: clamp(2.5rem, 8vw, 6.5rem);
  line-height: 0.98;
  letter-spacing: -0.055em;
}

h2 {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  letter-spacing: -0.025em;
}

.lede {
  max-width: 42rem;
  margin-bottom: var(--space-5);
  color: var(--color-muted);
  font-size: clamp(1.1rem, 2vw, 1.4rem);
}

.page-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.button {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  justify-content: center;
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--color-text);
  border-radius: var(--radius);
  font-weight: 700;
  text-decoration: none;
}

.button--primary {
  background: var(--color-text);
  color: var(--color-surface);
}

.button--primary:hover {
  background: var(--color-accent-strong);
  color: var(--color-surface);
}

.empty-state,
.principles {
  max-width: 44rem;
  margin-top: var(--space-6);
  padding: var(--space-4);
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  background: var(--color-surface);
}

.principles ul {
  display: grid;
  gap: var(--space-3);
  padding-left: 1.25rem;
}

.site-footer {
  border-top: 1px solid var(--color-line);
}

.site-footer__inner {
  display: flex;
  justify-content: space-between;
  gap: var(--space-4);
  padding-block: var(--space-4);
  color: var(--color-muted);
  font-size: 0.875rem;
}

.site-footer p {
  margin-bottom: 0;
}

@media (max-width: 42rem) {
  .site-header__inner,
  .site-footer__inner {
    align-items: flex-start;
    flex-direction: column;
    padding-block: var(--space-3);
  }

  .site-navigation {
    gap: var(--space-2) var(--space-3);
  }

  .page-lead {
    padding-block: var(--space-6);
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **9단계: 구성 요소, 정적 및 프로덕션 빌드 검사 실행**

달리다:

```bash
npm run format
npm test
npm run lint
npm run typecheck
npm run build
```

예상: 모든 명령이 통과되었습니다. 빌드 출력에는 `/en`, `/en/explore`, `/en/references` 및 `/en/about`에 대한 정적 경로가 포함됩니다. 누락된 키, 수화 또는 메타데이터 경고가 표시되지 않습니다.

- [ ] **10단계: 브라우저 자동화 전에 셸을 수동으로 검사**

달리다:

```bash
npm run dev
```

약 390px 및 1440px 너비에서 `http://localhost:3000/`, `/en`, `/en/references`, `/en/explore`, `/en/about` 및 `/en/unknown`를 검사합니다. 루트가 `/en`로 리디렉션되는지, 가로 스크롤 없이 텍스트를 계속 읽을 수 있는지, 네 개의 탐색 링크가 모두 작동하는지, 제목 계층 구조가 논리적인지, 키보드 포커스가 표시되는지, 첫 번째 탭이 "콘텐츠로 건너뛰기"에 도달하고, 언어 전환기나 가짜 참조 콘텐츠가 표시되지 않는지 확인하세요.

- [ ] **11단계: 애플리케이션 셸 커밋**

```bash
git add src/app src/components
git commit -m "feat: add accessible locale-aware app shell"
```

---

### 작업 4: 브라우저 여정 및 자동화된 접근성

**파일:**
- 생성: `playwright.config.ts`
- 생성: `e2e/foundation.spec.ts`

**인터페이스:**
- 소비: 작업 3의 리디렉션, 4개 경로, 건너뛰기 링크, 주요 랜드마크, 내비게이션 라벨, 찾을 수 없는 UI.
- CI 업무에 적합한 `npm run test:e2e`, Chromium 데스크탑/모바일 커버리지, Axe 리포트를 제작합니다.

- [ ] **1단계: 격리된 Chromium 데스크톱 및 모바일 프로젝트 구성**

`playwright.config.ts` 생성:

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:3000/en",
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 7"] },
    },
  ],
});
```

- [ ] **2단계: 승인된 기초 동작에 대한 브라우저 테스트 작성**

`e2e/foundation.spec.ts` 생성:

```ts
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("the root redirects to the canonical English home", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveURL(/\/en$/);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Useful references from across design and engineering.",
    }),
  ).toBeVisible();
});

test("the stable navigation reaches every top-level page", async ({ page }) => {
  await page.goto("/en");

  const navigation = page.getByRole("navigation", {
    name: "Primary navigation",
  });
  await expect(navigation.getByRole("link")).toHaveCount(4);

  await navigation.getByRole("link", { name: "References" }).click();
  await expect(page).toHaveURL(/\/en\/references$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "References" }),
  ).toBeVisible();

  await navigation.getByRole("link", { name: "Explore" }).click();
  await expect(page).toHaveURL(/\/en\/explore$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Explore" }),
  ).toBeVisible();

  await navigation.getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/\/en\/about$/);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "About DSGN ENGR Wiki",
    }),
  ).toBeVisible();
});

test("keyboard users can skip repeated navigation", async ({ page }) => {
  await page.goto("/en");

  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await expect(skipLink).toBeFocused();
  await skipLink.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("an unknown English route offers recovery", async ({ page }) => {
  await page.goto("/en/unknown");

  await expect(
    page.getByRole("heading", { level: 1, name: "Page not found" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Return home" })).toHaveAttribute(
    "href",
    "/en",
  );
});

for (const route of ["/en", "/en/references", "/en/explore", "/en/about"]) {
  test(`${route} has no detectable accessibility violations`, async ({ page }) => {
    await page.goto(route);

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}

test("the mobile shell does not overflow horizontally", async ({ page }) => {
  await page.goto("/en");

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
});
```

- [ ] **3단계: 고정된 Playwright Chromium 바이너리 설치**

달리다:

```bash
npx playwright install chromium
```

예상: 극작가는 `@playwright/test@1.62.1`와 일치하는 Chromium 바이너리가 설치되었거나 이미 존재하는지 확인합니다.

- [ ] **4단계: 전체 브라우저 제품군 실행**

달리다:

```bash
npm run test:e2e
```

예상: 데스크톱 및 모바일 Chromium 프로젝트 모두에서 모든 테스트가 통과되었습니다. 이 제품군은 외부 게시자에게 요청하지 않습니다.

- [ ] **5단계: 전체 로컬 품질 게이트 실행**

달리다:

```bash
npm run check
npm run test:e2e
git diff --check
```

예상: 공백 오류, 경고 또는 집중/건너뛰기 테스트 없이 모든 명령이 통과됩니다.

- [ ] **6단계: 브라우저 확인 커밋**

```bash
git add e2e playwright.config.ts
git commit -m "test: cover foundation browser journeys"
```

---

### 작업 5: 지속적인 통합, 설정 문서화 및 미리 보기 배포

**파일:**
- 생성: `.github/workflows/ci.yml`
- 수정: `README.md`

**인터페이스:**
- 소비: 작업 1~4의 모든 명령과 테스트.
- 생성: 풀 요청/푸시 품질 게이트, 문서화된 설정, 1단계 승인 준비가 된 Vercel 미리보기 URL.

- [ ] **1단계: 로컬에서 사용되는 동일한 노드 및 명령을 사용하여 CI 워크플로 추가**

`.github/workflows/ci.yml` 생성:

```yaml
name: CI

on:
  pull_request:
  push:
    branches:
      - main

permissions:
  contents: read

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true

jobs:
  quality:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - name: Check out repository
        uses: actions/checkout@v5

      - name: Use Node.js 22.17.0
        uses: actions/setup-node@v5
        with:
          node-version: 22.17.0
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Install Chromium
        run: npx playwright install --with-deps chromium

      - name: Run deterministic quality gate
        run: npm run check

      - name: Run browser and accessibility checks
        run: npm run test:e2e
```

- [ ] **2단계: 구현 통과 후 README 상태 및 다음 게이트 텍스트 교체**

`## Naming` 앞의 단락을 통해 `## Project status` 섹션을 다음으로 바꾸십시오.

```markdown
## Project status

Phase 1, the **technical foundation**, is implemented. The repository contains a deployable Next.js shell with locale-prefixed English routes, project-owned design tokens, automated checks, and continuous integration.

It intentionally does not yet contain:

- production reference records or content schemas
- populated Areas or Collections
- filters, search, or a language switcher
- a database, authentication, CMS, or hosted search service

Those capabilities begin with separately approved Phase 2 and Phase 3 plans.
```

`## Next gate` 섹션을 다음으로 바꾸십시오.

~~~~~마크다운
## 지역 개발

요구사항:

- Node.js 22.17.0(`nvm use`는 `.nvmrc`를 읽습니다)
- npm 10

설치 및 실행:

```bash
npm ci
npm run dev
```

`http://localhost:3000`를 엽니다. 루트는 `/en`로 리디렉션됩니다.

## 품질 명령

- `npm run format:check` — 형식 확인
- `npm run lint` — 경고 없이 ESLint를 실행합니다.
- `npm run typecheck` — 엄격한 TypeScript 검사 실행
- `npm test` — 단위 및 구성 요소 테스트 실행
- `npm run test:e2e` — Chromium 브라우저 및 자동 접근성 검사 실행
- `npm run build` — 프로덕션 빌드 생성
- `npm run check` — 결정론적 비브라우저 품질 게이트 실행

외부 링크 상태 확인은 의도적으로 이러한 명령과 분리되어 있으며 참조 시스템과 함께 도입됩니다.

## 신청 경로

- `/`는 `/en`로 리디렉션됩니다.
- `/en` — 홈
- `/en/references` — 참조 셸
- `/en/explore` — 쉘 탐색
- `/en/about` — 소개

한국어는 예약된 로캘 코드 `ko`를 사용하지만 검토된 번역이 존재할 때까지 `/ko` 페이지나 언어 컨트롤은 게시되지 않습니다.

## 다음 게이트

다음 아티팩트는 2단계 참조 재단 구현 계획입니다. 해당 기능이 구현되기 전에 로컬 레코드 형식, 스키마, 유효성 검사, 샘플 참조, 미리 보기 대체, 생성된 찾아보기 색인 및 비차단 링크 상태 워크플로를 정의합니다.
~~~~

- [ ] **3단계: 문서, 로컬 링크 및 모든 프로젝트 명령 확인**

달리다:

```bash
npm run format
npm run check
npm run test:e2e
git diff --check
```

그런 다음 이 로컬 Markdown 링크 확인을 실행하세요.

```bash
node -e 'const fs=require("node:fs"),path=require("node:path");const files=[];function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){if(entry.name==="node_modules"||entry.name===".next"||entry.name===".git")continue;const full=path.join(dir,entry.name);entry.isDirectory()?walk(full):entry.name.endsWith(".md")&&files.push(full)}}walk(".");const missing=[];for(const file of files){const text=fs.readFileSync(file,"utf8");for(const match of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)){const target=match[1].split("#")[0];if(!target||/^(https?:|mailto:)/.test(target))continue;const resolved=path.resolve(path.dirname(file),decodeURIComponent(target));if(!fs.existsSync(resolved))missing.push(`${file}: ${target}`)}}if(missing.length){console.error(missing.join("\n"));process.exit(1)}console.log(`${files.length} Markdown files checked; all local links resolve.`)'
```

예상 사항: 서식 지정, 린트, 유형, 단위/구성 요소 테스트, 프로덕션 빌드, 브라우저/접근성 테스트, 공백 검사 및 로컬 마크다운 링크가 모두 통과되었습니다.

- [ ] **4단계: CI 및 문서 커밋**

```bash
git add .github/workflows/ci.yml README.md
git commit -m "ci: verify and document phase one foundation"
```

- [ ] **5단계: Vercel 미리보기 배포 생성 및 검사**

Vercel에서 다음 설정을 사용하여 GitHub 저장소를 가져옵니다.

```text
Framework preset: Next.js
Node.js version: 22.x
Install command: npm ci
Build command: npm run build
Output directory: Next.js default
Environment variables: none for Phase 1
```

생성된 미리보기 URL을 열고 `/`가 `/en`로 리디렉션되는지 확인하세요. 홈, 탐색, 참조, 정보, 키보드 건너뛰기 탐색, 모바일 레이아웃 및 `/en/unknown`는 로컬 빌드처럼 작동합니다. 미리보기 URL은 변경되므로 소스 코드가 아닌 풀 요청 또는 구현 핸드오프에 미리보기 URL을 기록하세요.

- [ ] **6단계: 원격 품질 게이트 확인**

예상: GitHub Actions `CI / quality` 작업이 구현 분기를 통과하고 Vercel 미리 보기에서 성공적인 빌드를 보고합니다. 두 환경 모두 로컬에서 경고가 표시되지 않으면 이를 수정하고 다시 푸시하기 전에 전체 로컬 품질 게이트를 다시 실행하세요.

- [ ] **7단계: 최종 1단계 범위 감사**

달리다:

```bash
git status --short
git log --oneline --decorate -7
rg -n "kr|localStorage|middleware|proxy|database|auth|CMS|search" src e2e package.json next.config.ts README.md
```

예상되는:

- 의도적인 분기 변경만 존재합니다.
- 6개의 계획된 커밋이 있습니다: 준비/계획 기준선, 스캐폴드, 로케일 계약, 애플리케이션 셸, 브라우저 검증 및 CI/문서화
- 해결되지 않은 자리 표시자 마커가 남아 있지 않습니다.
- `kr`는 locale-guard 테스트 및 한국어 언어 코드가 아님을 설명하는 문서에만 나타납니다.
- 로컬 스토리지 언어 상태, 미들웨어/프록시, 데이터베이스, 인증, CMS, 검색 구현, 프로덕션 참조 데이터 또는 외부 게시자 요청이 없습니다.
- `/ko`는 정적으로 생성되지 않으며 언어 제어가 렌더링되지 않습니다.

---

## 1단계 승인 체크리스트

- [ ] `npm ci`는 Node.js 22.17.0 및 커밋된 잠금 파일에서 성공합니다.
- [ ] `/`는 브라우저 전용 상태 없이 `/en`로 리디렉션됩니다.
- [ ] `/en`, `/en/references`, `/en/explore` 및 `/en/about`는 정적으로 렌더링됩니다.
- [ ] `ko`는 로캘 계약에 예약되어 있지만 게시되지 않습니다.
- [ ] 안정적인 탐색은 홈, 탐색, 참조 및 정보입니다.
- [ ] 쉘에는 하나의 `main` 랜드마크, 논리적 제목, 가시적 포커스, 작동하는 건너뛰기 링크 및 감지 가능한 도끼 위반이 없습니다.
- [ ] 셸은 가로 오버플로 없이 모바일 및 데스크톱 너비에서 사용 가능합니다.
- [ ] 가짜 참조, 영역, 컬렉션, 필터, 검색 또는 언어 제어가 없습니다.
- [ ] `npm run format:check`, `lint`, `typecheck`, `test`, `build` 및 `test:e2e`는 로컬로 전달됩니다.
- [ ] GitHub Actions는 동일한 결정적 품질 게이트를 실행하고 Chromium 검사를 성공적으로 수행합니다.
- [ ] Vercel 미리보기가 성공적으로 배포되고 수동으로 검사됩니다.
- [ ] README 문서 설정, 명령, 경로, 고의적 연기 및 다음 게이트.
- [ ] 외부 게시자에 의존하는 빌드나 테스트가 없습니다.

## 버전 선택 참고 사항

키 버전은 2026년 8월 5일에 공식 npm 레지스트리 메타데이터와 비교하여 확인되었습니다. Next.js 16.3.0에는 Node.js 20.9 이상이 필요합니다. Node 22.17.0은 작업공간에서 이미 사용 가능하고 Next.js, ESLint, Vitest 및 Playwright를 만족하므로 선택되었습니다. 기본 TypeScript 7 생태계가 정착되는 동안 선택한 Next.js 린트 툴체인에서 실행되는 버전을 유지하기 위해 최신 7.0 라인 대신 TypeScript 6.0.2가 선택되었습니다. 정확한 전이적 종속성은 `package-lock.json`에 의해 캡처된 상태로 유지됩니다.

