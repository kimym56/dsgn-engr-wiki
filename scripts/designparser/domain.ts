import * as fs from "node:fs/promises";
import path from "node:path";

export const PROFILE_URL = "https://www.instagram.com/designparser/reels/";
export const STAGES = [
  "download",
  "audio",
  "transcript",
  "frames",
  "draft",
] as const;
export type StageName = (typeof STAGES)[number];
export type StageStatus = "pending" | "running" | "complete" | "failed";

export interface StageState {
  status: StageStatus;
  updatedAt: string;
  error?: string;
}

export interface ReelRecord {
  id: string;
  url: string;
  observedAt: string;
  publishedAt?: string;
  stages: Record<StageName, StageState>;
}

export interface Manifest {
  schemaVersion: 1;
  profile: typeof PROFILE_URL;
  discovery: {
    status: "never" | "running" | "complete" | "failed";
    updatedAt: string;
    error?: string;
  };
  reels: Record<string, ReelRecord>;
}

export interface DiscoveredReel {
  id: string;
  url: string;
  publishedAt?: string;
}

export interface Transcript {
  language: "en";
  text: string;
  segments: Array<{ start: number; end: number; text: string }>;
}

export interface PrivateDraft {
  reelId: string;
  status: "needs-review";
  title: string;
  summary: string;
  principles: string[];
  applications: string[];
  uncertainties: string[];
  evidence: Array<{ label: string; start: number; end: number }>;
  slides: Array<{
    kind:
      | "source"
      | "problem"
      | "principle"
      | "diagram"
      | "application"
      | "constraint"
      | "takeaway";
    eyebrow: string;
    title: string;
    body: string;
    visual:
      | { type: "sequence"; items: string[] }
      | { type: "comparison"; before: string; after: string }
      | { type: "layers"; items: string[] }
      | { type: "rule"; statement: string };
  }>;
}

const STAGE_OUTPUTS = {
  download: ["source.json", "source.mp4"],
  audio: ["audio.wav"],
  transcript: ["transcript.json", "transcript.txt"],
  frames: ["frames"],
  draft: ["draft.json"],
} satisfies Record<StageName, readonly string[]>;

const stageStatuses = new Set<StageStatus>([
  "pending",
  "running",
  "complete",
  "failed",
]);
const discoveryStatuses = new Set<string>([
  "never",
  "running",
  "complete",
  "failed",
]);
const slideKinds = new Set<PrivateDraft["slides"][number]["kind"]>([
  "source",
  "problem",
  "principle",
  "diagram",
  "application",
  "constraint",
  "takeaway",
]);

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${field} must be a nonempty string`);
  }
  return value.trim();
}

function nonnegativeNumber(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    throw new Error(`${field} is invalid`);
  }
  return value;
}

function validReel(
  id: unknown,
  url: unknown,
  field: string,
): asserts id is string {
  if (typeof id !== "string" || !/^[A-Za-z0-9_-]+$/.test(id)) {
    throw new Error(`${field}.id must be a valid shortcode`);
  }
  if (url !== `https://www.instagram.com/reel/${id}/`) {
    throw new Error(`${field}.url must be a canonical reel URL`);
  }
}

function pendingStages(now: string): Record<StageName, StageState> {
  return Object.fromEntries(
    STAGES.map((stage) => [stage, { status: "pending", updatedAt: now }]),
  ) as Record<StageName, StageState>;
}

function recordFor(reel: DiscoveredReel, now: string): ReelRecord {
  validReel(reel.id, reel.url, "reel");
  return {
    id: reel.id,
    url: reel.url,
    observedAt: now,
    ...(reel.publishedAt === undefined
      ? {}
      : { publishedAt: reel.publishedAt }),
    stages: pendingStages(now),
  };
}

export function emptyManifest(now: string): Manifest {
  requiredString(now, "now");
  return {
    schemaVersion: 1,
    profile: PROFILE_URL,
    discovery: { status: "never", updatedAt: now },
    reels: {},
  };
}

export function parseManifest(value: unknown): Manifest {
  if (!isObject(value)) throw new Error("manifest must be an object");
  if (value.schemaVersion !== 1) throw new Error("schemaVersion must be 1");
  if (value.profile !== PROFILE_URL)
    throw new Error("profile must be the Designparser reels URL");
  if (!isObject(value.discovery))
    throw new Error("discovery must be an object");
  if (
    typeof value.discovery.status !== "string" ||
    !discoveryStatuses.has(value.discovery.status)
  ) {
    throw new Error("discovery.status is invalid");
  }
  requiredString(value.discovery.updatedAt, "discovery.updatedAt");
  if (value.discovery.error !== undefined)
    requiredString(value.discovery.error, "discovery.error");
  if (!isObject(value.reels)) throw new Error("reels must be an object");

  for (const [id, record] of Object.entries(value.reels)) {
    if (!isObject(record)) throw new Error(`reels.${id} must be an object`);
    validReel(record.id, record.url, `reels.${id}`);
    if (record.id !== id) throw new Error(`reels.${id}.id must match its key`);
    requiredString(record.observedAt, `reels.${id}.observedAt`);
    if (record.publishedAt !== undefined)
      requiredString(record.publishedAt, `reels.${id}.publishedAt`);
    if (!isObject(record.stages))
      throw new Error(`reels.${id}.stages must be an object`);
    for (const stage of STAGES) {
      const state = record.stages[stage];
      if (!isObject(state))
        throw new Error(`reels.${id}.stages.${stage} must be an object`);
      if (!stageStatuses.has(state.status as StageStatus)) {
        throw new Error(`reels.${id}.stages.${stage}.status is invalid`);
      }
      requiredString(state.updatedAt, `reels.${id}.stages.${stage}.updatedAt`);
      if (state.error !== undefined)
        requiredString(state.error, `reels.${id}.stages.${stage}.error`);
    }
  }

  return structuredClone(value) as unknown as Manifest;
}

export async function readManifest(filePath: string): Promise<Manifest> {
  return parseManifest(JSON.parse(await fs.readFile(filePath, "utf8")));
}

export async function writeManifest(filePath: string, manifest: Manifest) {
  const temporary = `${filePath}.tmp`;
  await fs.writeFile(temporary, `${JSON.stringify(manifest, null, 2)}\n`);
  await fs.rename(temporary, filePath);
}

export function reconcileDiscovery(
  manifest: Manifest,
  reels: DiscoveredReel[],
  now: string,
): Manifest {
  const next = structuredClone(manifest);
  requiredString(now, "now");
  for (const reel of reels) {
    validReel(reel.id, reel.url, "reel");
    if (!next.reels[reel.id]) next.reels[reel.id] = recordFor(reel, now);
  }
  return next;
}

export function setStage(
  record: ReelRecord,
  stage: StageName,
  status: StageStatus,
  now: string,
  error?: string,
): ReelRecord {
  const next = structuredClone(record);
  if (!STAGES.includes(stage)) throw new Error("stage is invalid");
  if (!stageStatuses.has(status)) throw new Error("status is invalid");
  requiredString(now, "now");
  const stageIndex = STAGES.indexOf(stage);
  if (status === "complete") {
    for (const upstream of STAGES.slice(0, stageIndex)) {
      if (next.stages[upstream].status !== "complete") {
        throw new Error(`${stage} cannot complete before ${upstream}`);
      }
    }
  }
  next.stages[stage] = { status, updatedAt: now };
  if (error !== undefined)
    next.stages[stage].error = requiredString(error, "error");
  return next;
}

export async function stageOutputExists(
  cacheRoot: string,
  record: ReelRecord,
  stage: StageName,
): Promise<boolean> {
  const reelRoot = path.join(cacheRoot, "reels", record.id);
  try {
    for (const output of STAGE_OUTPUTS[stage]) {
      const outputPath = path.join(reelRoot, output);
      const info = await fs.stat(outputPath);
      if (stage === "frames") {
        if (!info.isDirectory()) return false;
        const entries = await fs.readdir(outputPath);
        if (!entries.some((entry) => entry.endsWith(".jpg"))) return false;
      } else if (!info.isFile()) {
        return false;
      }
    }
    return true;
  } catch {
    return false;
  }
}

export function normalizeWhisperTranscript(value: unknown): Transcript {
  if (!isObject(value)) throw new Error("transcript must be an object");
  if (value.language !== "en") throw new Error("language must be en");
  const text = requiredString(value.text, "text");
  if (!Array.isArray(value.segments))
    throw new Error("segments must be an array");
  let previousEnd = 0;
  const segments = value.segments.map((segment, index) => {
    if (!isObject(segment))
      throw new Error(`segments.${index} must be an object`);
    const start = nonnegativeNumber(segment.start, `segments.${index}.start`);
    const end = nonnegativeNumber(segment.end, `segments.${index}.end`);
    if (end < start) {
      throw new Error(`segments.${index}.end is invalid`);
    }
    if (index > 0 && start < previousEnd) {
      throw new Error(`segments.${index} overlaps the previous segment`);
    }
    previousEnd = end;
    return {
      start,
      end,
      text: requiredString(segment.text, `segments.${index}.text`),
    };
  });
  return { language: "en", text, segments };
}

function safeDraftString(value: unknown, field: string): string {
  const text = requiredString(value, field);
  if (/<[^>]*>/.test(text)) throw new Error(`${field} must not contain HTML`);
  if (/(?:\.study-cache|\/frames\/|\.jpg\b)/i.test(text)) {
    throw new Error(`${field} must not contain a frame path`);
  }
  if (
    /(?:source\.(?:json|mp4)|audio\.wav|transcript\.(?:json|txt))/i.test(text)
  ) {
    throw new Error(`${field} must not contain a source-media path`);
  }
  return text;
}

function rejectPrivateEvidenceFields(value: unknown): void {
  if (Array.isArray(value)) {
    value.forEach(rejectPrivateEvidenceFields);
    return;
  }
  if (!isObject(value)) return;
  for (const [key, child] of Object.entries(value)) {
    if (/^(?:transcript|transcriptText|caption|captionText)$/i.test(key)) {
      throw new Error("draft must not contain a transcript text field");
    }
    if (/^(?:frame|frames|framePath)$/i.test(key)) {
      throw new Error("draft must not contain a frame path");
    }
    rejectPrivateEvidenceFields(child);
  }
}

function draftStrings(value: unknown, field: string, minimum = 0): string[] {
  if (!Array.isArray(value) || value.length < minimum) {
    throw new Error(
      `${field} must contain at least ${minimum} item${minimum === 1 ? "" : "s"}`,
    );
  }
  return value.map((item, index) => safeDraftString(item, `${field}.${index}`));
}

export function validatePrivateDraft(value: unknown): PrivateDraft {
  if (!isObject(value)) throw new Error("draft must be an object");
  rejectPrivateEvidenceFields(value);
  validReel(
    value.reelId,
    `https://www.instagram.com/reel/${value.reelId}/`,
    "draft",
  );
  if (value.status !== "needs-review")
    throw new Error("status must be needs-review");
  const evidence = value.evidence;
  if (!Array.isArray(evidence) || evidence.length === 0)
    throw new Error("evidence must contain at least one range");
  const slides = value.slides;
  if (!Array.isArray(slides) || slides.length < 4 || slides.length > 8) {
    throw new Error("slides must contain 4–8 slides");
  }
  return {
    reelId: value.reelId,
    status: "needs-review",
    title: safeDraftString(value.title, "title"),
    summary: safeDraftString(value.summary, "summary"),
    principles: draftStrings(value.principles, "principles", 1),
    applications: draftStrings(value.applications, "applications", 1),
    uncertainties: draftStrings(value.uncertainties, "uncertainties"),
    evidence: evidence.map((item, index) => {
      if (!isObject(item))
        throw new Error(`evidence.${index} must be an object`);
      const start = nonnegativeNumber(item.start, `evidence.${index}.start`);
      const end = nonnegativeNumber(item.end, `evidence.${index}.end`);
      if (end < start) {
        throw new Error(`evidence.${index} has an invalid range`);
      }
      return {
        label: safeDraftString(item.label, `evidence.${index}.label`),
        start,
        end,
      };
    }),
    slides: slides.map((slide, index) => {
      if (!isObject(slide))
        throw new Error(`slides.${index} must be an object`);
      if (
        !slideKinds.has(slide.kind as PrivateDraft["slides"][number]["kind"])
      ) {
        throw new Error(`slides.${index}.kind is invalid`);
      }
      if (!isObject(slide.visual))
        throw new Error(`slides.${index}.visual must be an object`);
      const visual = slide.visual;
      let normalizedVisual: PrivateDraft["slides"][number]["visual"];
      if (visual.type === "sequence" || visual.type === "layers") {
        normalizedVisual = {
          type: visual.type,
          items: draftStrings(visual.items, `slides.${index}.visual.items`, 1),
        };
      } else if (visual.type === "comparison") {
        normalizedVisual = {
          type: "comparison",
          before: safeDraftString(
            visual.before,
            `slides.${index}.visual.before`,
          ),
          after: safeDraftString(visual.after, `slides.${index}.visual.after`),
        };
      } else if (visual.type === "rule") {
        normalizedVisual = {
          type: "rule",
          statement: safeDraftString(
            visual.statement,
            `slides.${index}.visual.statement`,
          ),
        };
      } else {
        throw new Error(`slides.${index}.visual.type is invalid`);
      }
      return {
        kind: slide.kind as PrivateDraft["slides"][number]["kind"],
        eyebrow: safeDraftString(slide.eyebrow, `slides.${index}.eyebrow`),
        title: safeDraftString(slide.title, `slides.${index}.title`),
        body: safeDraftString(slide.body, `slides.${index}.body`),
        visual: normalizedVisual,
      };
    }),
  };
}
