// @vitest-environment node

import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { finalizeUpdate, prepareUpdate } from "./update.ts";

const englishDigest = `# Digest

All 1 reels from @designparser (published 2026-08-01 → 2026-08-01), integrated from old material.

- **Reels:** 1 · **Frames embedded:** 1 · **Transcript language:** en

## Reel index

| # | Reel | Title / topic | Published |
| ---: | --- | --- | --- |
| 1 | [\`old-reel\`](#reel-1) | Old reel | 2026-08-01 |

---

## Reel studies

<a id="reel-1"></a>
### 1. Old reel

**Reel:** [old-reel](https://www.instagram.com/reel/old-reel/) · **Published:** 2026-08-01

#### Transcript

**[0:00–0:01]** Old.

---

## Designparser Site Modal References

### Color

#### Existing — \`existing\` *(no matching reel URL)*

- **Site subject:** [Open modal](https://designparser.de/#existing)

### Typography

#### Existing type — \`existing-type\` *(no matching reel URL)*

- **Site subject:** [Open modal](https://designparser.de/#existing-type)
`;

const koreanDigest = englishDigest
  .replace("# Digest", "# 다이제스트")
  .replace(
    "All 1 reels from @designparser (published 2026-08-01 → 2026-08-01), integrated from old material.",
    "@designparser의 릴스 1개(2026-08-01 → 2026-08-01 게시)를 이전 자료에서 통합한 한국어판입니다.",
  )
  .replace(
    "- **Reels:** 1 · **Frames embedded:** 1 · **Transcript language:** en",
    "- **릴:** 1개 · **임베드된 프레임:** 1장 · **트랜스크립트 언어:** 영어 (번역 포함)",
  )
  .replace("## Reel index", "## 릴 인덱스")
  .replace("## Reel studies", "## 릴 학습 자료")
  .replace(
    "## Designparser Site Modal References",
    "## Designparser 사이트 모달 참고자료",
  )
  .replace("#### Transcript", "#### 트랜스크립트");

async function writeReel(root: string, id: string, publishedAt: string) {
  const directory = path.join(
    root,
    ".study-cache",
    "designparser",
    "reels",
    id,
  );
  await mkdir(path.join(directory, "frames"), { recursive: true });
  await writeFile(
    path.join(directory, "source.json"),
    JSON.stringify({
      id,
      url: `https://www.instagram.com/reel/${id}/`,
      creator: "@designparser",
      publishedAt,
      duration: 10,
      width: 720,
      height: 1280,
    }),
  );
  await writeFile(
    path.join(directory, "transcript.json"),
    JSON.stringify({
      language: "en",
      text: `${id} transcript`,
      segments: [{ start: 0, end: 1, text: `${id} transcript` }],
    }),
  );
  await writeFile(path.join(directory, "frames", "000000.000.jpg"), "frame");
}

describe("Designparser one-shot update", () => {
  it("prepares only reels and website subjects missing from both digests", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "designparser-update-"));
    const cache = path.join(root, ".study-cache", "designparser");
    await mkdir(cache, { recursive: true });
    await writeFile(path.join(cache, "reels-digest.md"), englishDigest);
    await writeFile(path.join(cache, "reels-digest-ko.md"), koreanDigest);
    await writeReel(root, "old-reel", "2026-08-01T00:00:00.000Z");
    await writeReel(root, "new-reel", "2026-08-02T00:00:00.000Z");

    const result = await prepareUpdate({
      repositoryRoot: root,
      extract: async () => 0,
      fetchRules: async () => ({
        categories: {
          color: {
            title: "COLOR",
            rules: [
              { id: "existing", title: "Existing", category: "color" },
              { id: "new-rule", title: "New rule", category: "color" },
            ],
          },
        },
      }),
    });

    expect(result.reels.map((reel) => reel.id)).toEqual(["new-reel"]);
    expect(result.site.map((rule) => rule.id)).toEqual(["new-rule"]);
    expect(
      JSON.parse(
        await readFile(path.join(cache, "pending-update.json"), "utf8"),
      ),
    ).toEqual(result);
  });

  it("leaves both digests unchanged when bilingual analysis is incomplete", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "designparser-update-"));
    const cache = path.join(root, ".study-cache", "designparser");
    await mkdir(cache, { recursive: true });
    await writeFile(path.join(cache, "reels-digest.md"), englishDigest);
    await writeFile(path.join(cache, "reels-digest-ko.md"), koreanDigest);
    await writeReel(root, "new-reel", "2026-08-02T00:00:00.000Z");
    await prepareUpdate({
      repositoryRoot: root,
      extract: async () => 0,
      fetchRules: async () => ({ categories: {} }),
    });
    await writeFile(
      path.join(cache, "pending-result.json"),
      JSON.stringify({
        version: 1,
        reels: [
          {
            id: "new-reel",
            en: {
              title: "Only English",
              summary: "A summary.",
              principles: ["A principle."],
              applications: ["An application."],
              uncertainties: ["An uncertainty."],
              evidence: [{ start: 0, end: 1, label: "A claim." }],
            },
          },
        ],
        site: [],
      }),
    );

    await expect(finalizeUpdate({ repositoryRoot: root })).rejects.toThrow(
      "new-reel Korean analysis is invalid",
    );
    await expect(
      readFile(path.join(cache, "reels-digest.md"), "utf8"),
    ).resolves.toBe(englishDigest);
    await expect(
      readFile(path.join(cache, "reels-digest-ko.md"), "utf8"),
    ).resolves.toBe(koreanDigest);
  });

  it("atomically merges bilingual results in canonical order", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "designparser-update-"));
    const cache = path.join(root, ".study-cache", "designparser");
    await mkdir(cache, { recursive: true });
    await writeFile(path.join(cache, "reels-digest.md"), englishDigest);
    await writeFile(path.join(cache, "reels-digest-ko.md"), koreanDigest);
    await writeReel(root, "new-reel", "2026-08-02T00:00:00.000Z");
    await prepareUpdate({
      repositoryRoot: root,
      extract: async () => 0,
      fetchRules: async () => ({
        categories: {
          color: {
            title: "COLOR",
            rules: [
              { id: "existing", title: "Existing", category: "color" },
              { id: "new-rule", title: "New rule", category: "color" },
            ],
          },
        },
      }),
    });
    const analysis = {
      summary: "A factual summary.",
      principles: ["A principle."],
      applications: ["An application."],
      uncertainties: ["An uncertainty."],
      evidence: [{ start: 0, end: 1, label: "A claim." }],
    };
    await writeFile(
      path.join(cache, "pending-result.json"),
      JSON.stringify({
        version: 1,
        reels: [
          {
            id: "new-reel",
            en: { title: "New reel", ...analysis },
            ko: {
              title: "새 릴",
              ...analysis,
              transcript: ["새 릴 트랜스크립트"],
            },
          },
        ],
        site: [
          {
            id: "new-rule",
            enMarkdown:
              "#### New rule — `new-rule` *(no matching reel URL)*\n\n- **Site subject:** [Open modal](https://designparser.de/#new-rule)",
            koMarkdown:
              "#### 새 규칙 — `new-rule` *(일치하는 릴 URL 없음)*\n\n- **사이트 주제:** [모달 열기](https://designparser.de/#new-rule)",
          },
        ],
      }),
    );

    const summary = await finalizeUpdate({ repositoryRoot: root });
    const english = await readFile(path.join(cache, "reels-digest.md"), "utf8");
    const korean = await readFile(
      path.join(cache, "reels-digest-ko.md"),
      "utf8",
    );

    expect(summary).toEqual({ reels: 1, site: 1, totalReels: 2 });
    expect(english).toContain(
      "| 1 | [`old-reel`](#reel-1) | Old reel | 2026-08-01 |",
    );
    expect(english).toContain(
      "| 2 | [`new-reel`](#reel-2) | New reel | 2026-08-02 |",
    );
    expect(english.indexOf("### 1. Old reel")).toBeLessThan(
      english.indexOf("### 2. New reel"),
    );
    expect(english).toContain("**[0:00–0:01]** new-reel transcript");
    expect(korean).toContain("**[0:00–0:01]** 새 릴 트랜스크립트");
    expect(english).toContain("#### New rule — `new-rule`");
    expect(korean).toContain("#### 새 규칙 — `new-rule`");
    expect(english).toContain(
      "All 2 reels from @designparser (published 2026-08-01 → 2026-08-02)",
    );
    expect(english).toContain("- **Reels:** 2 · **Transcript language:** en");
    expect(korean).toContain(
      "@designparser의 릴스 2개(2026-08-01 → 2026-08-02 게시)",
    );
    expect(english.indexOf("#### New rule — `new-rule`")).toBeLessThan(
      english.indexOf("### Typography"),
    );
    expect(`${english}\n${korean}`).not.toMatch(
      /^#### (Slides|Frames|슬라이드|프레임)$/m,
    );
    await expect(
      readFile(path.join(cache, "site-accepted.json"), "utf8"),
    ).resolves.toContain("new-rule");
  });

  it("accepts reel blocks appended after a historical separator", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "designparser-update-"));
    const cache = path.join(root, ".study-cache", "designparser");
    await mkdir(cache, { recursive: true });
    const appended = `<a id="reel-2"></a>
### 2. Appended reel

**Reel:** [appended](https://www.instagram.com/reel/appended/) · **Creator:** @designparser · **Published:** 2026-08-02 · **Duration:** 1s · **Analysis status:** \`needs-review\`

#### Transcript

**[0:00–0:01]** Appended.`;
    const en = englishDigest.replace(
      "## Designparser Site Modal References",
      `${appended}\n\n## Designparser Site Modal References`,
    );
    const ko = koreanDigest.replace(
      "## Designparser 사이트 모달 참고자료",
      `${appended.replace("#### Transcript", "#### 트랜스크립트")}\n\n## Designparser 사이트 모달 참고자료`,
    );
    await writeFile(path.join(cache, "reels-digest.md"), en);
    await writeFile(path.join(cache, "reels-digest-ko.md"), ko);
    await writeFile(
      path.join(cache, "pending-update.json"),
      JSON.stringify({ version: 1, reels: [], site: [] }),
    );
    await writeFile(
      path.join(cache, "pending-result.json"),
      JSON.stringify({ version: 1, reels: [], site: [] }),
    );
    await writeFile(
      path.join(cache, "site-observed.json"),
      JSON.stringify({ rules: [] }),
    );

    await expect(finalizeUpdate({ repositoryRoot: root })).resolves.toEqual({
      reels: 0,
      site: 0,
      totalReels: 2,
    });
  });
});
