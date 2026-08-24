# Gallery-dl 탐색 오류 구현 계획

> **권위 있는 원문:** 이 문서는 [영어 원문](../../../superpowers/plans/2026-08-25-gallery-dl-discovery-errors.md)의 한국어 검토 번역본입니다. 요구사항 해석에는 영어 버전이 우선합니다.

> **에이전트 작업자용:** 필수 하위 스킬: 이 계획을 작업별로 구현하려면 superpowers:subagent-driven-development(권장) 또는 superpowers:executing-plans를 사용하세요. 단계는 추적을 위해 체크박스(`- [ ]`) 구문을 사용합니다.

**목표:** 유효한 릴 탐색 및 실제 빈 결과 처리를 보존하면서 내장된 gallery-dl 탐색 실패를 정확하게 보고합니다.

**아키텍처:** JSON 신뢰 경계에서 기존 `discoverReels` 어댑터를 확장합니다. 릴 정규화 전에 type-`-1` 메시지를 검사하고 진단 내용을 정제하고 길이를 제한하며, 기존의 모든 type-`3` 수집 동작은 변경하지 않습니다.

**기술 스택:** TypeScript, Node.js 22.17.0, Vitest 4.1.10

## 전역 제약 조건

- 의존성, 재시도, 대체 스크레이퍼 또는 샌드박스 우회 동작을 추가하지 마세요.
- 오류에 미디어 URL, 서명된 쿼리 문자열 또는 쿠키 데이터를 노출하지 마세요.
- 0이 아닌 종료, 중단, 잘못된 형식의 출력 및 실제 빈 결과 동작을 보존하세요.

---

### 작업 1: 내장된 탐색 오류 감지

**파일:**

- 수정: `scripts/designparser/commands.ts:114-163`
- 테스트: `scripts/designparser/commands.test.ts:103-122`

**인터페이스:**

- 소비: `JSON.parse(result.stdout)`가 반환한 파싱된 gallery-dl 메시지.
- 생성: 기존 `discoverReels(runner?: CommandRunner): Promise<DiscoveredReel[]>`. 이제 간결한 진단과 함께 type-`-1` gallery-dl 응답을 거부합니다.

- [ ] **단계 1: 실패하는 회귀 테스트 작성**

빈 배열 단언 앞에 잘못된 형식, 챌린지 및 빈 응답 테스트에 다음 단언을 추가하세요.

```ts
await expect(
  discoverReels(
    runner({
      code: 0,
      stdout: JSON.stringify([
        [
          -1,
          {
            error: "HttpError",
            message:
              "NameResolutionError:\nCookie: sessionid=one; ig_did=two\nAuthorization: Bearer bearer-secret\nFailed to resolve HTTP://www.instagram.com/private?token=secret sessionid=super-secret",
          },
        ],
      ]),
      stderr: "",
    }),
  ),
).rejects.toThrow(
  /^gallery-dl discovery error: HttpError: NameResolutionError: Cookie=\[REDACTED\] Authorization=\[REDACTED\] Failed to resolve \[URL\] sessionid=\[REDACTED\]$/,
);
```

- [ ] **단계 2: 집중 테스트를 실행하고 실패하는지 확인**

실행:

```bash
nvm exec 22.17.0 npm test -- scripts/designparser/commands.test.ts
```

예상 결과: 어댑터가 현재 `gallery-dl discovery found no reels`를 보고하므로 FAIL.

- [ ] **단계 3: 길이가 제한된 내장 오류 보고 구현**

`hasInterruption` 근처에 다음 헬퍼를 추가하세요.

```ts
function sanitizedDiagnostic(value: unknown) {
  if (typeof value !== "string") return "";
  return value
    .replace(
      /\b(set-cookie|cookie|authorization)\s*[:=][^\r\n]*/gi,
      "$1=[REDACTED]",
    )
    .replace(/[\u0000-\u001f\u007f-\u009f]+/g, " ")
    .replace(/\bhttps?:\/\/\S+/gi, "[URL]")
    .replace(
      /\b(cookie|cookies|session(?:id)?|csrftoken|token|auth(?:orization)?|password|passwd|secret)\s*[:=]\s*[^\s,;]+/gi,
      "$1=[REDACTED]",
    )
    .replace(/\s+/g, " ")
    .trim();
}

function embeddedDiscoveryError(messages: unknown[]) {
  for (const message of messages) {
    if (!Array.isArray(message) || message[0] !== -1 || !isObject(message[1]))
      continue;
    const payload = message[1];
    const rawName = sanitizedDiagnostic(payload.error);
    const name = /^[A-Za-z][A-Za-z0-9_.-]{0,63}$/.test(rawName) ? rawName : "";
    const detail = sanitizedDiagnostic(payload.message);
    const cause = [name, detail].filter(Boolean).join(": ").slice(0, 240);
    return cause
      ? `gallery-dl discovery error: ${cause}`
      : "gallery-dl discovery error";
  }
}
```

`messages`가 배열인지 검증한 후, 릴을 수집하기 전에 다음을 추가하세요.

```ts
const embeddedError = embeddedDiscoveryError(messages);
if (embeddedError) throw new Error(embeddedError);
```

- [ ] **단계 4: 집중 검증 및 저장소 검증 실행**

실행:

```bash
nvm exec 22.17.0 npm test -- scripts/designparser/commands.test.ts
nvm exec 22.17.0 npm run typecheck
nvm exec 22.17.0 npm run format:check -- scripts/designparser/commands.ts scripts/designparser/commands.test.ts
```

예상 결과: 모든 명령이 통과함.

- [ ] **단계 5: 네트워크 액세스로 전체 다이제스트 워크플로 실행**

무시되는 비공개 `.study-cache/designparser/reels-digest.md` 및 `.study-cache/designparser/reels-digest-ko.md` 파일이 있는 메인 작업 트리에서 Node 22.17.0 및 네트워크 액세스를 사용하여 `npm run study:designparser:update -- prepare`를 실행하세요. 준비에 성공하면 대기 중인 분석 및 `finalize`까지 `.agents/skills/designparser-digest/SKILL.md`를 정확히 따르세요. 그렇지 않으면 어느 다이제스트도 편집하지 말고 중단하세요.

- [ ] **단계 6: 구현 커밋**

```bash
git add scripts/designparser/commands.ts scripts/designparser/commands.test.ts docs/superpowers/plans/2026-08-25-gallery-dl-discovery-errors.md docs/ko/superpowers/plans/2026-08-25-gallery-dl-discovery-errors.md
git commit -m "fix: report gallery discovery errors"
```
