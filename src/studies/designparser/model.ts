type SlideKind =
  | "source"
  | "problem"
  | "principle"
  | "diagram"
  | "application"
  | "constraint"
  | "takeaway";

type SlideVisual =
  | { readonly type: "sequence"; readonly items: readonly string[] }
  | {
      readonly type: "comparison";
      readonly before: string;
      readonly after: string;
    }
  | { readonly type: "layers"; readonly items: readonly string[] }
  | { readonly type: "rule"; readonly statement: string };

export interface StudySlide {
  readonly kind: SlideKind;
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly visual: SlideVisual;
}

export interface DesignparserStudy {
  readonly id: string;
  readonly locale: "en";
  readonly translationOf?: string;
  readonly source: {
    readonly url: string;
    readonly creator: "@designparser";
    readonly publishedAt: string;
  };
  readonly processedAt: string;
  readonly reviewedAt: string;
  readonly status: "reviewed";
  readonly title: string;
  readonly summary: string;
  readonly principles: readonly string[];
  readonly applications: readonly string[];
  readonly uncertainties: readonly string[];
  readonly evidence: readonly {
    readonly label: string;
    readonly start: number;
    readonly end: number;
  }[];
  readonly slides: readonly StudySlide[];
}

const slideKinds: readonly SlideKind[] = [
  "source",
  "problem",
  "principle",
  "diagram",
  "application",
  "constraint",
  "takeaway",
];
const prohibitedContent =
  /[<>]|data:|blob:|file:|\.study-cache|\b(?:transcript|caption|screenshot)\b|\.(?:mp4|mov|webm|m4v|avi|mkv|wav|mp3|m4a|aac|ogg|jpg|jpeg|png|gif|webp)\b/i;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${field} must be a nonempty string`);
  }
  return value;
}

function date(value: unknown, field: string): string {
  const text = requiredString(value, field);
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text);
  if (!match) throw new Error(`${field} must be an ISO calendar date`);
  const [year, month, day] = match.slice(1).map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    throw new Error(`${field} must be an ISO calendar date`);
  }
  return text;
}

function rejectProhibitedContent(
  value: unknown,
  seen = new Set<object>(),
): void {
  if (typeof value === "string") {
    if (prohibitedContent.test(value)) {
      throw new Error("committed content contains prohibited private evidence");
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => rejectProhibitedContent(item, seen));
    return;
  }
  if (!isRecord(value) || seen.has(value)) return;
  seen.add(value);
  for (const [key, child] of Object.entries(value)) {
    rejectProhibitedContent(key, seen);
    rejectProhibitedContent(child, seen);
  }
}

function strings(
  value: unknown,
  field: string,
  minimum = 0,
  maximum = Number.POSITIVE_INFINITY,
): string[] {
  if (!Array.isArray(value) || value.length < minimum) {
    throw new Error(`${field} must contain at least ${minimum} items`);
  }
  if (value.length > maximum) {
    throw new Error(`${field} must contain at most ${maximum} items`);
  }
  return value.map((item, index) => requiredString(item, `${field}.${index}`));
}

function slide(value: unknown, index: number): StudySlide {
  if (!isRecord(value)) throw new Error(`slides.${index} must be an object`);
  if (!slideKinds.includes(value.kind as SlideKind)) {
    throw new Error(`slides.${index}.kind is invalid`);
  }
  if (!isRecord(value.visual)) {
    throw new Error(`slides.${index}.visual must be an object`);
  }

  const visual = value.visual;
  let normalizedVisual: SlideVisual;
  if (visual.type === "sequence" || visual.type === "layers") {
    normalizedVisual = {
      type: visual.type,
      items: strings(visual.items, `slides.${index}.visual.items`, 1, 6),
    };
  } else if (visual.type === "comparison") {
    normalizedVisual = {
      type: "comparison",
      before: requiredString(visual.before, `slides.${index}.visual.before`),
      after: requiredString(visual.after, `slides.${index}.visual.after`),
    };
  } else if (visual.type === "rule") {
    normalizedVisual = {
      type: "rule",
      statement: requiredString(
        visual.statement,
        `slides.${index}.visual.statement`,
      ),
    };
  } else {
    throw new Error(`slides.${index}.visual.type is invalid`);
  }

  return {
    kind: value.kind as SlideKind,
    eyebrow: requiredString(value.eyebrow, `slides.${index}.eyebrow`),
    title: requiredString(value.title, `slides.${index}.title`),
    body: requiredString(value.body, `slides.${index}.body`),
    visual: normalizedVisual,
  };
}

function deepFreeze<T>(value: T): T {
  if (value && typeof value === "object") {
    Object.values(value).forEach(deepFreeze);
    Object.freeze(value);
  }
  return value;
}

export function validateStudy(value: unknown): DesignparserStudy {
  if (!isRecord(value)) throw new Error("study must be an object");
  rejectProhibitedContent(value);
  const id = requiredString(value.id, "id");
  if (!/^[A-Za-z0-9_-]+$/.test(id))
    throw new Error("id must be a valid shortcode");
  if (value.locale !== "en") throw new Error("locale must be en");
  if (value.translationOf !== undefined) {
    throw new Error("English studies must not have translationOf");
  }
  if (value.status !== "reviewed") throw new Error("status must be reviewed");
  if (!isRecord(value.source)) throw new Error("source must be an object");
  if (value.source.creator !== "@designparser") {
    throw new Error("source.creator must be @designparser");
  }
  if (value.source.url !== `https://www.instagram.com/reel/${id}/`) {
    throw new Error("source.url must be a canonical reel URL matching id");
  }

  const evidence = value.evidence;
  if (!Array.isArray(evidence) || evidence.length === 0) {
    throw new Error("evidence must contain at least one range");
  }
  let previousEnd = 0;
  const normalizedEvidence = evidence.map((item, index) => {
    if (!isRecord(item)) throw new Error(`evidence.${index} must be an object`);
    const start = item.start;
    const end = item.end;
    if (
      typeof start !== "number" ||
      typeof end !== "number" ||
      !Number.isFinite(start) ||
      !Number.isFinite(end) ||
      start < 0 ||
      end < start ||
      (index > 0 && start < previousEnd)
    ) {
      throw new Error(`evidence.${index} has an invalid or overlapping range`);
    }
    previousEnd = end;
    return {
      label: requiredString(item.label, `evidence.${index}.label`),
      start,
      end,
    };
  });

  const slides = value.slides;
  if (!Array.isArray(slides) || slides.length < 4 || slides.length > 8) {
    throw new Error("slides must contain 4–8 slides");
  }
  const normalizedSlides = slides.map(slide);
  if (normalizedSlides[0].kind !== "source") {
    throw new Error("the first slide must be source");
  }
  if (normalizedSlides.at(-1)?.kind !== "takeaway") {
    throw new Error("the final slide must be takeaway");
  }
  if (
    normalizedSlides.slice(1).some((slide) => slide.kind === "source") ||
    normalizedSlides.slice(0, -1).some((slide) => slide.kind === "takeaway")
  ) {
    throw new Error("source and takeaway slides must be unique boundaries");
  }
  if (
    normalizedSlides.some(
      (item, index) =>
        index > 0 &&
        slideKinds.indexOf(item.kind) <
          slideKinds.indexOf(normalizedSlides[index - 1].kind),
    )
  ) {
    throw new Error("slides must follow editorial order");
  }

  return deepFreeze({
    id,
    locale: "en",
    source: {
      url: value.source.url,
      creator: "@designparser",
      publishedAt: date(value.source.publishedAt, "source.publishedAt"),
    },
    processedAt: date(value.processedAt, "processedAt"),
    reviewedAt: date(value.reviewedAt, "reviewedAt"),
    status: "reviewed",
    title: requiredString(value.title, "title"),
    summary: requiredString(value.summary, "summary"),
    principles: strings(value.principles, "principles", 1),
    applications: strings(value.applications, "applications", 1),
    uncertainties: strings(value.uncertainties, "uncertainties"),
    evidence: normalizedEvidence,
    slides: normalizedSlides,
  });
}

export function validateStudies(value: unknown): readonly DesignparserStudy[] {
  if (!Array.isArray(value)) throw new Error("studies must be an array");
  const studies = value.map(validateStudy);
  const ids = new Set<string>();
  for (const study of studies) {
    if (ids.has(study.id)) throw new Error(`duplicate study id: ${study.id}`);
    ids.add(study.id);
  }
  return deepFreeze(
    studies.sort(
      (left, right) =>
        right.source.publishedAt.localeCompare(left.source.publishedAt) ||
        left.id.localeCompare(right.id),
    ),
  );
}
