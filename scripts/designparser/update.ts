import { createHash } from "node:crypto";
import {
  mkdir,
  readFile,
  readdir,
  rename,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { runCli } from "./cli.ts";

const RULES_URL = "https://designparser.de/data/rules.json";

type JsonObject = Record<string, unknown>;

export interface PendingReel {
  id: string;
  source: JsonObject;
  transcript: JsonObject;
  frames: string[];
}

export interface PendingSiteRule {
  id: string;
  change: "new" | "changed";
  category: string;
  categoryTitle: string;
  hash: string;
  rule: JsonObject;
}

export interface PendingUpdate {
  version: 1;
  reels: PendingReel[];
  site: PendingSiteRule[];
}

export interface PrepareOptions {
  repositoryRoot?: string;
  extract?: () => Promise<number>;
  fetchRules?: () => Promise<unknown>;
}

interface Evidence {
  start: number;
  end: number;
  label: string;
}

interface Analysis {
  title: string;
  summary: string;
  principles: string[];
  applications: string[];
  uncertainties: string[];
  evidence: Evidence[];
  transcript?: string[];
}

interface PendingResult {
  version: 1;
  reels: Array<{ id: string; en: Analysis; ko: Analysis }>;
  site: Array<{ id: string; enMarkdown: string; koMarkdown: string }>;
}

export interface FinalizeOptions {
  repositoryRoot?: string;
}

function isObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stableJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (!isObject(value)) return JSON.stringify(value);
  return `{${Object.keys(value)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`)
    .join(",")}}`;
}

function hash(value: unknown) {
  return createHash("sha256").update(stableJson(value)).digest("hex");
}

function string(value: unknown, field: string) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${field} is invalid`);
  }
  return value.trim();
}

function strings(value: unknown, field: string) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${field} is invalid`);
  }
  return value.map((item, index) => string(item, `${field}.${index}`));
}

function analysis(value: unknown, field: string, korean: boolean): Analysis {
  if (!isObject(value)) throw new Error(`${field} analysis is invalid`);
  if (!Array.isArray(value.evidence) || value.evidence.length === 0) {
    throw new Error(`${field} evidence is invalid`);
  }
  const evidence = value.evidence.map((item, index): Evidence => {
    if (
      !isObject(item) ||
      typeof item.start !== "number" ||
      typeof item.end !== "number" ||
      item.start < 0 ||
      item.end <= item.start
    ) {
      throw new Error(`${field} evidence.${index} is invalid`);
    }
    return {
      start: item.start,
      end: item.end,
      label: string(item.label, `${field} evidence.${index}.label`),
    };
  });
  return {
    title: string(value.title, `${field} title`),
    summary: string(value.summary, `${field} summary`),
    principles: strings(value.principles, `${field} principles`),
    applications: strings(value.applications, `${field} applications`),
    uncertainties: strings(value.uncertainties, `${field} uncertainties`),
    evidence,
    transcript: korean
      ? strings(value.transcript, `${field} transcript`)
      : undefined,
  };
}

function validateResult(value: unknown): PendingResult {
  if (
    !isObject(value) ||
    value.version !== 1 ||
    !Array.isArray(value.reels) ||
    !Array.isArray(value.site)
  ) {
    throw new Error("pending result is invalid");
  }
  return {
    version: 1,
    reels: value.reels.map((item) => {
      if (!isObject(item)) throw new Error("reel result is invalid");
      const id = string(item.id, "reel id");
      return {
        id,
        en: analysis(item.en, `${id} English`, false),
        ko: analysis(item.ko, `${id} Korean`, true),
      };
    }),
    site: value.site.map((item) => {
      if (!isObject(item)) throw new Error("site result is invalid");
      const id = string(item.id, "site id");
      const enMarkdown = string(item.enMarkdown, `${id} English Markdown`);
      const koMarkdown = string(item.koMarkdown, `${id} Korean Markdown`);
      if (
        !enMarkdown.startsWith("#### ") ||
        !koMarkdown.startsWith("#### ") ||
        !enMarkdown.includes(`\`${id}\``) ||
        !koMarkdown.includes(`\`${id}\``)
      ) {
        throw new Error(`${id} site Markdown is invalid`);
      }
      return { id, enMarkdown, koMarkdown };
    }),
  };
}

async function readJson(file: string): Promise<unknown> {
  return JSON.parse(await readFile(file, "utf8"));
}

async function exists(file: string) {
  try {
    await stat(file);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return false;
    throw error;
  }
}

function reelIds(markdown: string) {
  return new Set(
    [...markdown.matchAll(/instagram\.com\/reel\/([A-Za-z0-9_-]+)\//g)].map(
      (match) => match[1],
    ),
  );
}

function siteIds(markdown: string) {
  return new Set(
    [...markdown.matchAll(/^#### .+ — `([^`]+)`/gm)].map((match) => match[1]),
  );
}

function flattenRules(value: unknown) {
  if (!isObject(value) || !isObject(value.categories)) {
    throw new Error("Designparser rules payload is invalid");
  }
  const rules: Array<{
    id: string;
    category: string;
    categoryTitle: string;
    rule: JsonObject;
  }> = [];
  for (const [category, rawCategory] of Object.entries(value.categories)) {
    if (
      !isObject(rawCategory) ||
      typeof rawCategory.title !== "string" ||
      !Array.isArray(rawCategory.rules)
    ) {
      throw new Error("Designparser rules payload is invalid");
    }
    for (const rule of rawCategory.rules) {
      if (!isObject(rule) || typeof rule.id !== "string") {
        throw new Error("Designparser rules payload is invalid");
      }
      rules.push({
        id: rule.id,
        category,
        categoryTitle: rawCategory.title,
        rule,
      });
    }
  }
  return rules;
}

async function defaultFetchRules() {
  const response = await fetch(RULES_URL, {
    headers: { accept: "application/json" },
  });
  if (!response.ok)
    throw new Error(`Designparser rules fetch failed: ${response.status}`);
  return response.json();
}

export async function prepareUpdate(
  options: PrepareOptions = {},
): Promise<PendingUpdate> {
  const repositoryRoot = options.repositoryRoot ?? process.cwd();
  const cacheRoot = path.join(repositoryRoot, ".study-cache", "designparser");
  const englishPath = path.join(cacheRoot, "reels-digest.md");
  const koreanPath = path.join(cacheRoot, "reels-digest-ko.md");
  await mkdir(cacheRoot, { recursive: true });

  const exitCode = await (options.extract ?? (() => runCli(["extract"])))();
  if (exitCode !== 0) throw new Error("reel extraction failed");

  const [english, korean, rawRules] = await Promise.all([
    readFile(englishPath, "utf8"),
    readFile(koreanPath, "utf8"),
    (options.fetchRules ?? defaultFetchRules)(),
  ]);
  const englishReels = reelIds(english);
  const koreanReels = reelIds(korean);
  const reelsRoot = path.join(cacheRoot, "reels");
  const reels: PendingReel[] = [];
  for (const entry of await readdir(reelsRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (englishReels.has(entry.name) && koreanReels.has(entry.name)) continue;
    const directory = path.join(reelsRoot, entry.name);
    const sourcePath = path.join(directory, "source.json");
    const transcriptPath = path.join(directory, "transcript.json");
    const framesDirectory = path.join(directory, "frames");
    if (
      !(await exists(sourcePath)) ||
      !(await exists(transcriptPath)) ||
      !(await exists(framesDirectory))
    ) {
      throw new Error(`${entry.name} extraction is incomplete`);
    }
    const frames = (await readdir(framesDirectory))
      .filter((name) => name.endsWith(".jpg"))
      .sort()
      .map((name) =>
        path.relative(repositoryRoot, path.join(framesDirectory, name)),
      );
    if (frames.length === 0) throw new Error(`${entry.name} has no frames`);
    const source = await readJson(sourcePath);
    const transcript = await readJson(transcriptPath);
    if (
      !isObject(source) ||
      source.id !== entry.name ||
      !isObject(transcript)
    ) {
      throw new Error(`${entry.name} extraction metadata is invalid`);
    }
    reels.push({ id: entry.name, source, transcript, frames });
  }
  reels.sort(
    (left, right) =>
      String(left.source.publishedAt ?? "").localeCompare(
        String(right.source.publishedAt ?? ""),
      ) || left.id.localeCompare(right.id),
  );

  const observedRules = flattenRules(rawRules);
  const acceptedPath = path.join(cacheRoot, "site-accepted.json");
  let acceptedHashes = new Map<string, string>();
  if (await exists(acceptedPath)) {
    const accepted = await readJson(acceptedPath);
    if (!isObject(accepted) || !isObject(accepted.hashes)) {
      throw new Error("accepted Designparser site snapshot is invalid");
    }
    acceptedHashes = new Map(
      Object.entries(accepted.hashes).filter(
        (entry): entry is [string, string] => typeof entry[1] === "string",
      ),
    );
  } else {
    const existingEnglish = siteIds(english);
    const existingKorean = siteIds(korean);
    acceptedHashes = new Map(
      observedRules
        .filter(({ id }) => existingEnglish.has(id) && existingKorean.has(id))
        .map(({ id, rule }) => [id, hash(rule)]),
    );
  }

  const site = observedRules.flatMap((entry): PendingSiteRule[] => {
    const nextHash = hash(entry.rule);
    const previousHash = acceptedHashes.get(entry.id);
    if (previousHash === nextHash) return [];
    return [
      {
        ...entry,
        change: previousHash === undefined ? "new" : "changed",
        hash: nextHash,
      },
    ];
  });

  const pending: PendingUpdate = { version: 1, reels, site };
  await rm(path.join(cacheRoot, "pending-result.json"), { force: true });
  await Promise.all([
    writeFile(
      path.join(cacheRoot, "pending-update.json"),
      `${JSON.stringify(pending, null, 2)}\n`,
    ),
    writeFile(
      path.join(cacheRoot, "site-observed.json"),
      `${JSON.stringify({ rules: observedRules }, null, 2)}\n`,
    ),
  ]);
  return pending;
}

function timestamp(seconds: number) {
  const rounded = Math.round(seconds);
  return `${Math.floor(rounded / 60)}:${String(rounded % 60).padStart(2, "0")}`;
}

function renderReel(pending: PendingReel, value: Analysis, korean: boolean) {
  const source = pending.source;
  const segments = Array.isArray(pending.transcript.segments)
    ? pending.transcript.segments
    : [];
  if (korean && value.transcript?.length !== segments.length) {
    throw new Error(
      `${pending.id} Korean transcript count does not match Whisper`,
    );
  }
  const date = string(source.publishedAt, `${pending.id} publishedAt`).slice(
    0,
    10,
  );
  const duration = Math.round(Number(source.duration));
  if (!Number.isFinite(duration) || duration <= 0) {
    throw new Error(`${pending.id} duration is invalid`);
  }
  const metadata = korean
    ? `**릴:** [${pending.id}](${String(source.url)}) · **제작자:** ${String(source.creator)} · **게시일:** ${date} · **길이:** ${duration}s · **분석 상태:** \`needs-review\``
    : `**Reel:** [${pending.id}](${String(source.url)}) · **Creator:** ${String(source.creator)} · **Published:** ${date} · **Duration:** ${duration}s · **Analysis status:** \`needs-review\``;
  const lines = [
    '<a id="reel-0"></a>',
    `### 0. ${value.title}`,
    "",
    metadata,
    "",
    korean ? `**요약.** ${value.summary}` : `**Summary.** ${value.summary}`,
    "",
    korean ? "#### 원칙" : "#### Principles",
    "",
    ...value.principles.map((item) => `- ${item}`),
    "",
    korean ? "#### 적용" : "#### Applications",
    "",
    ...value.applications.map((item) => `- ${item}`),
    "",
    korean ? "#### 불확실성" : "#### Uncertainties",
    "",
    ...value.uncertainties.map((item) => `- ${item}`),
    "",
    korean ? "#### 근거" : "#### Evidence",
    "",
    korean
      ? "| 시점 | 릴에서 주장하는 내용 |"
      : "| Time | What the reel claims |",
    "| --- | --- |",
    ...value.evidence.map(
      (item) =>
        `| ${timestamp(item.start)}–${timestamp(item.end)} | ${item.label} |`,
    ),
    "",
    korean ? "#### 트랜스크립트" : "#### Transcript",
    "",
  ];
  segments.forEach((segment, index) => {
    if (
      !isObject(segment) ||
      typeof segment.start !== "number" ||
      typeof segment.end !== "number"
    ) {
      throw new Error(`${pending.id} Whisper segment is invalid`);
    }
    const text = korean
      ? value.transcript?.[index]
      : string(segment.text, `${pending.id} transcript segment`);
    lines.push(
      `**[${timestamp(segment.start)}–${timestamp(segment.end)}]** ${text}`,
      "",
    );
  });
  return lines.join("\n").trim();
}

interface ReelBlock {
  id: string;
  title: string;
  published: string;
  oldNumber: number;
  markdown: string;
}

function reelBlocks(markdown: string): ReelBlock[] {
  const starts = [...markdown.matchAll(/^<a id="reel-(\d+)"><\/a>$/gm)];
  return starts.map((match, index) => {
    const start = match.index ?? 0;
    const next = starts[index + 1]?.index;
    const site = markdown.search(
      /^## Designparser (?:Site Modal References|사이트 모달 참고자료)$/m,
    );
    const end = next ?? (site >= 0 ? site : markdown.length);
    const block = markdown
      .slice(start, end)
      .trim()
      .replace(/\n+---\s*$/, "")
      .trim();
    const id = block.match(/instagram\.com\/reel\/([A-Za-z0-9_-]+)\//)?.[1];
    const title = block.match(/^### \d+\. (.+)$/m)?.[1];
    const published = block.match(
      /\*\*(?:Published|게시일):\*\* (\d{4}-\d{2}-\d{2})/,
    )?.[1];
    if (!id || !title || !published)
      throw new Error("digest reel block is invalid");
    return {
      id,
      title,
      published,
      oldNumber: Number(match[1]),
      markdown: block,
    };
  });
}

function renumber(block: ReelBlock, number: number) {
  return block.markdown
    .replace(/^<a id="reel-\d+"><\/a>$/m, `<a id="reel-${number}"></a>`)
    .replace(/^### \d+\./m, `### ${number}.`);
}

function replaceIndex(markdown: string, blocks: ReelBlock[], korean: boolean) {
  const heading = korean ? "## 릴 인덱스" : "## Reel index";
  const start = markdown.indexOf(heading);
  const end = markdown.indexOf("\n---", start);
  if (start < 0 || end < 0) throw new Error("digest index is missing");
  const table = korean
    ? ["| 번호 | 릴 | 제목/주제 | 게시일 |", "|---:|---|---|---|"]
    : ["| # | Reel | Title/topic | Published |", "|---:|---|---|---|"];
  blocks.forEach((block, index) => {
    table.push(
      `| ${index + 1} | [\`${block.id}\`](#reel-${index + 1}) | ${block.title} | ${block.published} |`,
    );
  });
  return `${markdown.slice(0, start)}${heading}\n\n${table.join("\n")}\n${markdown.slice(end)}`;
}

function updateCover(markdown: string, blocks: ReelBlock[], korean: boolean) {
  const first = blocks[0]?.published;
  const last = blocks.at(-1)?.published;
  if (!first || !last) throw new Error("digest has no reels");
  if (korean) {
    return markdown
      .replace(
        /^@designparser의 릴스 \d+개\([\s\S]*?한국어판입니다\.$/m,
        `@designparser의 릴스 ${blocks.length}개(${first} → ${last} 게시)를 소스 메타데이터, Whisper 트랜스크립트, 객관적 분석에서 통합한 한국어판입니다.`,
      )
      .replace(
        /^- \*\*릴:\*\* .*$/m,
        `- **릴:** ${blocks.length}개 · **트랜스크립트 언어:** 영어 (번역 포함)`,
      );
  }
  return markdown
    .replace(
      /^All \d+ reels from @designparser \(published .*$/m,
      `All ${blocks.length} reels from @designparser (published ${first} → ${last}), integrated from source metadata, Whisper transcripts, and objective analysis.`,
    )
    .replace(
      /^- \*\*Reels:\*\* .*$/m,
      `- **Reels:** ${blocks.length} · **Transcript language:** en`,
    );
}

function updateSiteLinks(
  markdown: string,
  oldNumberToId: Map<number, string>,
  newIdToNumber: Map<string, number>,
) {
  return markdown.replace(
    /\[(Reel|릴) (\d+)\]\(#reel-\d+\)/g,
    (whole, label: string, number: string) => {
      const id = oldNumberToId.get(Number(number));
      const next = id === undefined ? undefined : newIdToNumber.get(id);
      return next === undefined ? whole : `[${label} ${next}](#reel-${next})`;
    },
  );
}

function siteBlocks(markdown: string) {
  const matches = [...markdown.matchAll(/^#### .+ — `([^`]+)`.*$/gm)];
  return new Map(
    matches.map((match, index) => {
      const start = match.index ?? 0;
      const next = matches[index + 1]?.index ?? markdown.length;
      const category = markdown
        .slice(start + match[0].length, next)
        .search(/^### /m);
      const end = category < 0 ? next : start + match[0].length + category;
      return [match[1], markdown.slice(start, end).trim()];
    }),
  );
}

function mergeSite(
  markdown: string,
  replacements: Map<string, string>,
  observed: Array<{ id: string; category: string; categoryTitle: string }>,
) {
  let output = markdown;
  for (const [id, replacement] of replacements) {
    const existing = siteBlocks(output);
    const current = existing.get(id);
    if (current) {
      output = output.replace(current, replacement);
      continue;
    }
    const rule = observed.find((item) => item.id === id);
    if (!rule)
      throw new Error(`${id} is absent from the observed site snapshot`);
    const siblings = observed
      .filter((item) => item.category === rule.category)
      .map((item) => item.id);
    const index = siblings.indexOf(id);
    const next = siblings.slice(index + 1).find((item) => existing.has(item));
    if (next) {
      const block = existing.get(next)!;
      output = output.replace(block, `${replacement}\n\n${block}`);
      continue;
    }
    const previous = siblings
      .slice(0, index)
      .reverse()
      .find((item) => existing.has(item));
    if (previous) {
      const block = existing.get(previous)!;
      output = output.replace(block, `${block}\n\n${replacement}`);
      continue;
    }
    const coverage = output.search(/^### Coverage$/m);
    const insertion = coverage >= 0 ? coverage : output.length;
    output = `${output.slice(0, insertion).trimEnd()}\n\n### ${rule.categoryTitle}\n\n${replacement}\n\n${output.slice(insertion)}`;
  }
  return output;
}

function mergeDigest(
  original: string,
  added: ReelBlock[],
  site: Map<string, string>,
  observed: Array<{ id: string; category: string; categoryTitle: string }>,
  korean: boolean,
) {
  const current = reelBlocks(original);
  const oldNumbers = new Map(
    current.map((block) => [block.oldNumber, block.id]),
  );
  const byId = new Map(current.map((block) => [block.id, block]));
  added.forEach((block) => byId.set(block.id, block));
  const blocks = [...byId.values()].sort(
    (left, right) =>
      left.published.localeCompare(right.published) ||
      left.id.localeCompare(right.id),
  );
  const numbers = new Map(blocks.map((block, index) => [block.id, index + 1]));
  const studiesHeading = korean ? "## 릴 학습 자료" : "## Reel studies";
  const siteHeading = korean
    ? "## Designparser 사이트 모달 참고자료"
    : "## Designparser Site Modal References";
  const studiesStart = original.indexOf(studiesHeading);
  const siteStart = original.indexOf(siteHeading);
  if (studiesStart < 0 || siteStart < 0)
    throw new Error("digest hierarchy is invalid");
  const beforeStudies = original.slice(0, studiesStart + studiesHeading.length);
  let appendix = mergeSite(original.slice(siteStart), site, observed);
  appendix = updateSiteLinks(appendix, oldNumbers, numbers);
  let merged = `${beforeStudies}\n\n${blocks
    .map((block, index) => renumber(block, index + 1))
    .join("\n\n\n")}\n\n\n---\n\n${appendix.trim()}\n`;
  merged = replaceIndex(merged, blocks, korean);
  merged = updateCover(merged, blocks, korean);
  if (/^#### (Slides|Frames|슬라이드|프레임)$/m.test(merged)) {
    throw new Error("digest contains a prohibited section");
  }
  if (reelBlocks(merged).length !== blocks.length) {
    throw new Error("digest reel count is invalid");
  }
  return merged;
}

async function replacePair(
  englishPath: string,
  koreanPath: string,
  en: string,
  ko: string,
) {
  const enTemp = `${englishPath}.next`;
  const koTemp = `${koreanPath}.next`;
  const enBackup = `${englishPath}.previous`;
  const koBackup = `${koreanPath}.previous`;
  await Promise.all([writeFile(enTemp, en), writeFile(koTemp, ko)]);
  try {
    await Promise.all([
      rename(englishPath, enBackup),
      rename(koreanPath, koBackup),
    ]);
    await Promise.all([
      rename(enTemp, englishPath),
      rename(koTemp, koreanPath),
    ]);
    await Promise.all([rm(enBackup), rm(koBackup)]);
  } catch (error) {
    if (await exists(enBackup)) await rename(enBackup, englishPath);
    if (await exists(koBackup)) await rename(koBackup, koreanPath);
    await Promise.all([
      rm(enTemp, { force: true }),
      rm(koTemp, { force: true }),
    ]);
    throw error;
  }
}

export async function finalizeUpdate(options: FinalizeOptions = {}) {
  const repositoryRoot = options.repositoryRoot ?? process.cwd();
  const cacheRoot = path.join(repositoryRoot, ".study-cache", "designparser");
  const englishPath = path.join(cacheRoot, "reels-digest.md");
  const koreanPath = path.join(cacheRoot, "reels-digest-ko.md");
  const [pendingValue, resultValue, observedValue, english, korean] =
    await Promise.all([
      readJson(path.join(cacheRoot, "pending-update.json")),
      readJson(path.join(cacheRoot, "pending-result.json")),
      readJson(path.join(cacheRoot, "site-observed.json")),
      readFile(englishPath, "utf8"),
      readFile(koreanPath, "utf8"),
    ]);
  const pending = pendingValue as PendingUpdate;
  if (!isObject(pending) || pending.version !== 1) {
    throw new Error("pending update is invalid");
  }
  const result = validateResult(resultValue);
  if (!isObject(observedValue) || !Array.isArray(observedValue.rules)) {
    throw new Error("observed Designparser site snapshot is invalid");
  }
  const observed = observedValue.rules.map((entry) => {
    if (
      !isObject(entry) ||
      typeof entry.id !== "string" ||
      typeof entry.category !== "string" ||
      typeof entry.categoryTitle !== "string" ||
      !isObject(entry.rule)
    ) {
      throw new Error("observed Designparser site snapshot is invalid");
    }
    return {
      id: entry.id,
      category: entry.category,
      categoryTitle: entry.categoryTitle,
      rule: entry.rule,
    };
  });
  const pendingReels = new Map(pending.reels.map((item) => [item.id, item]));
  const pendingSite = new Set(pending.site.map((item) => item.id));
  if (
    result.reels.length !== pendingReels.size ||
    result.site.length !== pendingSite.size ||
    result.reels.some((item) => !pendingReels.has(item.id)) ||
    result.site.some((item) => !pendingSite.has(item.id))
  ) {
    throw new Error("pending result does not cover the complete update");
  }

  const englishAdded: ReelBlock[] = [];
  const koreanAdded: ReelBlock[] = [];
  for (const item of result.reels) {
    const pendingReel = pendingReels.get(item.id)!;
    const published = string(
      pendingReel.source.publishedAt,
      `${item.id} publishedAt`,
    ).slice(0, 10);
    englishAdded.push({
      id: item.id,
      title: item.en.title,
      published,
      oldNumber: 0,
      markdown: renderReel(pendingReel, item.en, false),
    });
    koreanAdded.push({
      id: item.id,
      title: item.ko.title,
      published,
      oldNumber: 0,
      markdown: renderReel(pendingReel, item.ko, true),
    });
  }
  const nextEnglish = mergeDigest(
    english,
    englishAdded,
    new Map(result.site.map((item) => [item.id, item.enMarkdown])),
    observed,
    false,
  );
  const nextKorean = mergeDigest(
    korean,
    koreanAdded,
    new Map(result.site.map((item) => [item.id, item.koMarkdown])),
    observed,
    true,
  );
  if (reelBlocks(nextEnglish).length !== reelBlocks(nextKorean).length) {
    throw new Error("English and Korean reel counts differ");
  }
  const hashes = Object.fromEntries(
    observed.map((entry) => [entry.id, hash(entry.rule)]),
  );
  await replacePair(englishPath, koreanPath, nextEnglish, nextKorean);
  await writeFile(
    path.join(cacheRoot, "site-accepted.json"),
    `${JSON.stringify({ hashes }, null, 2)}\n`,
  );
  return {
    reels: result.reels.length,
    site: result.site.length,
    totalReels: reelBlocks(nextEnglish).length,
  };
}

const isMain =
  process.argv[1] !== undefined &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isMain) {
  const command = process.argv[2];
  if (command !== "prepare" && command !== "finalize") {
    console.error(
      "Usage: npm run study:designparser:update -- prepare|finalize",
    );
    process.exitCode = 1;
  } else {
    try {
      if (command === "prepare") {
        const pending = await prepareUpdate();
        console.log(
          JSON.stringify({
            reels: pending.reels.length,
            site: pending.site.length,
          }),
        );
      } else {
        console.log(JSON.stringify(await finalizeUpdate()));
      }
    } catch (error) {
      console.error(error instanceof Error ? error.message : "update failed");
      process.exitCode = 1;
    }
  }
}
