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

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const LANGUAGE_PATTERN = /^[a-z]{2}(?:-[A-Z]{2})?$/;

const AREA_KEYS = ["id", "label", "description"];
const COLLECTION_KEYS = ["id", "label", "description"];
const RECORD_KEYS = [
  "id",
  "title",
  "url",
  "publisher",
  "author",
  "summary",
  "relevance",
  "format",
  "areas",
  "collections",
  "source_language",
  "published",
  "added",
  "reviewed",
  "status",
  "preview",
  "language",
  "translation_of",
];
const PREVIEW_KEYS = ["src", "alt", "source_url", "rights"];

type PlainObject = Record<string, unknown>;

function isPlainObject(value: unknown): value is PlainObject {
  if (typeof value !== "object" || value === null) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function expectExactKeys(
  value: PlainObject,
  keys: readonly string[],
  path: string,
  errors: string[],
): void {
  for (const key of keys) {
    if (!(key in value)) errors.push(`${path}.${key}: missing required field`);
  }
  for (const key of Object.keys(value).filter((key) => !keys.includes(key)).sort()) {
    errors.push(`${path}.${key}: unknown field`);
  }
}

function expectNonEmptyString(value: unknown, path: string, errors: string[]): value is string {
  if (typeof value !== "string" || value.trim() === "") {
    errors.push(`${path}: expected a non-empty string`);
    return false;
  }
  return true;
}

function expectId(value: unknown, path: string, errors: string[]): value is string {
  return expectNonEmptyString(value, path, errors) && ID_PATTERN.test(value)
    ? true
    : (typeof value === "string" && value.trim() !== "" && errors.push(`${path}: invalid id`), false);
}

function expectHttpsUrl(value: unknown, path: string, errors: string[]): void {
  if (!expectNonEmptyString(value, path, errors)) return;
  try {
    if (new URL(value).protocol !== "https:") throw new Error("not HTTPS");
  } catch {
    errors.push(`${path}: expected an HTTPS URL`);
  }
}

function expectDate(value: unknown, path: string, errors: string[]): void {
  if (!expectNonEmptyString(value, path, errors)) return;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    errors.push(`${path}: expected an ISO date`);
    return;
  }
  const date = new Date(`${value}T00:00:00.000Z`);
  if (
    Number.isNaN(date.valueOf()) ||
    date.getUTCFullYear() !== Number(match[1]) ||
    date.getUTCMonth() + 1 !== Number(match[2]) ||
    date.getUTCDate() !== Number(match[3])
  ) {
    errors.push(`${path}: expected a valid ISO date`);
  }
}

function validateRegistry(
  value: unknown,
  kind: "area" | "collection",
  errors: string[],
): Set<string> {
  const path = `${kind}s`;
  const ids = new Set<string>();
  if (!Array.isArray(value)) {
    errors.push(`${path}: expected an array`);
    return ids;
  }

  for (const [index, item] of value.entries()) {
    const itemPath = `${path}[${index}]`;
    if (!isPlainObject(item)) {
      errors.push(`${itemPath}: expected an object`);
      continue;
    }
    expectExactKeys(item, kind === "area" ? AREA_KEYS : COLLECTION_KEYS, itemPath, errors);
    const idIsValid = expectId(item.id, `${itemPath}.id`, errors);
    expectNonEmptyString(item.label, `${itemPath}.label`, errors);
    expectNonEmptyString(item.description, `${itemPath}.description`, errors);
    if (idIsValid && typeof item.id === "string") {
      if (ids.has(item.id)) errors.push(`${itemPath}.id: duplicate ${kind} id ${item.id}`);
      ids.add(item.id);
    }
  }
  return ids;
}

function validateRelationships(
  value: unknown,
  path: string,
  registryIds: Set<string>,
  kind: "area" | "collection",
  errors: string[],
  required: boolean,
): void {
  if (!Array.isArray(value)) {
    errors.push(`${path}: expected an array`);
    return;
  }
  if (required && value.length === 0) errors.push(`${path}: expected at least one ${kind}`);
  const seen = new Set<string>();
  for (const [index, id] of value.entries()) {
    const itemPath = `${path}[${index}]`;
    if (!expectId(id, itemPath, errors)) continue;
    if (seen.has(id)) errors.push(`${itemPath}: duplicate ${kind} ${id}`);
    seen.add(id);
    if (!registryIds.has(id)) errors.push(`${itemPath}: unknown ${kind} ${id}`);
  }
}

function validatePreview(value: unknown, path: string, errors: string[]): void {
  if (value === null) return;
  if (!isPlainObject(value)) {
    errors.push(`${path}: expected an object or null`);
    return;
  }
  expectExactKeys(value, PREVIEW_KEYS, path, errors);
  if (expectNonEmptyString(value.src, `${path}.src`, errors) && !value.src.startsWith("/")) {
    errors.push(`${path}.src: expected a root-relative path`);
  }
  expectNonEmptyString(value.alt, `${path}.alt`, errors);
  expectHttpsUrl(value.source_url, `${path}.source_url`, errors);
  expectNonEmptyString(value.rights, `${path}.rights`, errors);
}

export function validateReferenceCatalog(input: ReferenceCatalogInput): string[] {
  const errors: string[] = [];
  const areaIds = validateRegistry(input.areas, "area", errors);
  const collectionIds = validateRegistry(input.collections, "collection", errors);
  const recordIds = new Set<string>();
  const urls = new Set<string>();

  for (const entry of input.records) {
    const path = entry.path;
    const value = entry.value;
    if (!isPlainObject(value)) {
      errors.push(`${path}: expected an object`);
      continue;
    }
    expectExactKeys(value, RECORD_KEYS, path, errors);
    const idIsValid = expectId(value.id, `${path}.id`, errors);
    expectNonEmptyString(value.title, `${path}.title`, errors);
    expectHttpsUrl(value.url, `${path}.url`, errors);
    expectNonEmptyString(value.publisher, `${path}.publisher`, errors);
    if (value.author !== null) expectNonEmptyString(value.author, `${path}.author`, errors);
    expectNonEmptyString(value.summary, `${path}.summary`, errors);
    expectNonEmptyString(value.relevance, `${path}.relevance`, errors);
    if (!REFERENCE_FORMATS.includes(value.format as ReferenceFormat)) errors.push(`${path}.format: invalid format`);
    validateRelationships(value.areas, `${path}.areas`, areaIds, "area", errors, true);
    validateRelationships(value.collections, `${path}.collections`, collectionIds, "collection", errors, false);
    if (!expectNonEmptyString(value.source_language, `${path}.source_language`, errors) || !LANGUAGE_PATTERN.test(value.source_language)) {
      if (typeof value.source_language === "string" && value.source_language.trim() !== "") errors.push(`${path}.source_language: invalid language code`);
    }
    if (value.source_language !== "en") errors.push(`${path}.source_language: English records require en`);
    if (value.published !== null) expectDate(value.published, `${path}.published`, errors);
    expectDate(value.added, `${path}.added`, errors);
    expectDate(value.reviewed, `${path}.reviewed`, errors);
    if (!REFERENCE_STATUSES.includes(value.status as ReferenceStatus)) errors.push(`${path}.status: invalid status`);
    validatePreview(value.preview, `${path}.preview`, errors);
    if (value.language !== "en") errors.push(`${path}.language: English records require en`);
    if (value.translation_of !== null) errors.push(`${path}.translation_of: English records require null`);

    if (idIsValid && typeof value.id === "string") {
      if (recordIds.has(value.id)) errors.push(`${path}.id: duplicate record id ${value.id}`);
      recordIds.add(value.id);
    }
    if (typeof value.url === "string") {
      if (urls.has(value.url)) errors.push(`${path}.url: duplicate canonical url ${value.url}`);
      urls.add(value.url);
    }
  }
  return errors;
}

export function parseReferenceCatalog(input: ReferenceCatalogInput): ReferenceCatalog {
  const errors = validateReferenceCatalog(input);
  if (errors.length > 0) throw new Error(`Invalid reference catalog:\n${errors.join("\n")}`);
  return {
    areas: input.areas as ReferenceArea[],
    collections: input.collections as ReferenceCollection[],
    records: input.records.map(({ value }) => value as ReferenceRecord),
  };
}
