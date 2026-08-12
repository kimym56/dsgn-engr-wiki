import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const candidateMetadata = new WeakMap();

const REQUIRED_FIELDS = [
  "id",
  "title",
  "title_source",
  "canonical_url",
  "canonical_verified",
  "source_language",
  "status",
  "first_discovered",
  "last_checked",
  "analysis_path",
  "translation_path",
  "discoveries",
  "publication",
];

const REQUIRED_DISCOVERY_FIELDS = [
  "parent_id",
  "parent_url",
  "section",
  "link_text",
  "encountered_url",
  "discovered",
  "wave",
  "depth",
  "active",
];

const REQUIRED_PUBLICATION_FIELDS = [
  "decision",
  "reviewer",
  "reviewed",
  "notes",
];

const TITLE_SOURCES = new Set(["destination", "parent-link"]);
const LIFECYCLE_STATES = new Set([
  "discovered",
  "analyzing",
  "analyzed",
  "inaccessible",
  "rejected",
]);
const PUBLICATION_DECISIONS = new Set([
  "pending",
  "publish",
  "context-only",
  "reject",
  "revisit",
]);

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isKebabCase(value) {
  return typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function isIsoDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00Z`);
  return (
    !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value
  );
}

function isHttpsUrl(value) {
  if (typeof value !== "string") return false;

  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname.length > 0;
  } catch {
    return false;
  }
}

function isSafeMarkdownPath(value) {
  if (typeof value !== "string" || !value.endsWith(".md")) return false;
  if (value.includes("\\") || path.posix.isAbsolute(value)) return false;

  const segments = value.split("/");
  return (
    segments.every(
      (segment) => segment !== "" && segment !== "." && segment !== "..",
    ) && path.posix.normalize(value) === value
  );
}

function addError(errors, candidatePath, property, message) {
  errors.push(`${candidatePath}: ${property} ${message}`);
}

function validateRequiredFields(value, fields, prefix, candidatePath, errors) {
  for (const field of fields) {
    if (!Object.hasOwn(value, field)) {
      addError(errors, candidatePath, `${prefix}${field}`, "is required");
    }
  }
}

export async function parseCandidateFile(candidatePath) {
  const contents = await readFile(candidatePath, "utf8");
  const lines = contents.split(/\r?\n/);

  if (lines[0] !== "---") {
    throw new Error(
      `${candidatePath}: front_matter must start with a --- delimiter`,
    );
  }

  const closingDelimiter = lines.indexOf("---", 1);
  if (closingDelimiter === -1) {
    throw new Error(
      `${candidatePath}: front_matter must end with a --- delimiter`,
    );
  }

  try {
    const candidate = parse(lines.slice(1, closingDelimiter).join("\n"));
    if (!isRecord(candidate)) {
      throw new Error("must be a YAML mapping");
    }
    return candidate;
  } catch (error) {
    throw new Error(
      `${candidatePath}: front_matter is invalid YAML: ${error.message}`,
      { cause: error },
    );
  }
}

export function validateCandidate(candidate, candidatePath) {
  const errors = [];

  if (!isRecord(candidate)) {
    addError(errors, candidatePath, "candidate", "must be a YAML mapping");
    return errors;
  }

  validateRequiredFields(candidate, REQUIRED_FIELDS, "", candidatePath, errors);

  if (Object.hasOwn(candidate, "id") && !isKebabCase(candidate.id)) {
    addError(errors, candidatePath, "id", "must be a lowercase kebab-case ID");
  }
  if (Object.hasOwn(candidate, "title") && !isNonEmptyString(candidate.title)) {
    addError(errors, candidatePath, "title", "must be a non-empty string");
  }
  if (
    Object.hasOwn(candidate, "title_source") &&
    !TITLE_SOURCES.has(candidate.title_source)
  ) {
    addError(
      errors,
      candidatePath,
      "title_source",
      "must be destination or parent-link",
    );
  }
  if (
    Object.hasOwn(candidate, "canonical_url") &&
    !isHttpsUrl(candidate.canonical_url)
  ) {
    addError(
      errors,
      candidatePath,
      "canonical_url",
      "must be an absolute HTTPS URL",
    );
  }
  if (
    Object.hasOwn(candidate, "canonical_verified") &&
    typeof candidate.canonical_verified !== "boolean"
  ) {
    addError(errors, candidatePath, "canonical_verified", "must be a Boolean");
  }
  if (
    Object.hasOwn(candidate, "source_language") &&
    (typeof candidate.source_language !== "string" ||
      !/^[a-z]{2,3}(?:-[A-Za-z0-9]+)*$/.test(candidate.source_language))
  ) {
    addError(
      errors,
      candidatePath,
      "source_language",
      "must be a language code",
    );
  }
  if (
    Object.hasOwn(candidate, "status") &&
    !LIFECYCLE_STATES.has(candidate.status)
  ) {
    addError(errors, candidatePath, "status", "has an unknown lifecycle value");
  }

  for (const property of ["first_discovered", "last_checked"]) {
    if (Object.hasOwn(candidate, property) && !isIsoDate(candidate[property])) {
      addError(
        errors,
        candidatePath,
        property,
        "must be an ISO YYYY-MM-DD date",
      );
    }
  }

  const expectedAnalysisPath = isKebabCase(candidate.id)
    ? `references/analyses/sources/${candidate.id}.md`
    : null;
  const expectedTranslationPath = isKebabCase(candidate.id)
    ? `references/analyses/ko/sources/${candidate.id}.md`
    : null;

  for (const [property, expectedPath] of [
    ["analysis_path", expectedAnalysisPath],
    ["translation_path", expectedTranslationPath],
  ]) {
    const value = candidate[property];
    if (
      Object.hasOwn(candidate, property) &&
      value !== null &&
      (!isSafeMarkdownPath(value) ||
        (expectedPath !== null && value !== expectedPath))
    ) {
      addError(
        errors,
        candidatePath,
        property,
        `must be null or ${expectedPath ?? "a matching safe relative Markdown path"}`,
      );
    }
  }

  const hasAnalysis = typeof candidate.analysis_path === "string";
  const hasTranslation = typeof candidate.translation_path === "string";
  if (hasAnalysis !== hasTranslation) {
    addError(
      errors,
      candidatePath,
      "analysis_path",
      "must be set together with translation_path",
    );
    addError(
      errors,
      candidatePath,
      "translation_path",
      "must be set together with analysis_path",
    );
  }

  if (candidate.status === "analyzed" && (!hasAnalysis || !hasTranslation)) {
    if (!errors.some((error) => error.includes(": analysis_path "))) {
      addError(
        errors,
        candidatePath,
        "analysis_path",
        "is required when status is analyzed",
      );
    }
    if (!errors.some((error) => error.includes(": translation_path "))) {
      addError(
        errors,
        candidatePath,
        "translation_path",
        "is required when status is analyzed",
      );
    }
  }

  if (Object.hasOwn(candidate, "discoveries")) {
    if (
      !Array.isArray(candidate.discoveries) ||
      candidate.discoveries.length === 0
    ) {
      addError(
        errors,
        candidatePath,
        "discoveries",
        "must be a non-empty array",
      );
    } else {
      candidate.discoveries.forEach((discovery, index) => {
        const prefix = `discoveries[${index}].`;
        if (!isRecord(discovery)) {
          addError(
            errors,
            candidatePath,
            `discoveries[${index}]`,
            "must be a mapping",
          );
          return;
        }

        validateRequiredFields(
          discovery,
          REQUIRED_DISCOVERY_FIELDS,
          prefix,
          candidatePath,
          errors,
        );

        for (const property of ["parent_id"]) {
          if (
            Object.hasOwn(discovery, property) &&
            !isKebabCase(discovery[property])
          ) {
            addError(
              errors,
              candidatePath,
              `${prefix}${property}`,
              "must be a lowercase kebab-case ID",
            );
          }
        }
        for (const property of ["section", "link_text"]) {
          if (
            Object.hasOwn(discovery, property) &&
            !isNonEmptyString(discovery[property])
          ) {
            addError(
              errors,
              candidatePath,
              `${prefix}${property}`,
              "must be a non-empty string",
            );
          }
        }
        for (const property of ["parent_url", "encountered_url"]) {
          if (
            Object.hasOwn(discovery, property) &&
            !isHttpsUrl(discovery[property])
          ) {
            addError(
              errors,
              candidatePath,
              `${prefix}${property}`,
              "must be an absolute HTTPS URL",
            );
          }
        }
        if (
          Object.hasOwn(discovery, "discovered") &&
          !isIsoDate(discovery.discovered)
        ) {
          addError(
            errors,
            candidatePath,
            `${prefix}discovered`,
            "must be an ISO YYYY-MM-DD date",
          );
        }
        for (const property of ["wave", "depth"]) {
          if (
            Object.hasOwn(discovery, property) &&
            (!Number.isInteger(discovery[property]) || discovery[property] <= 0)
          ) {
            addError(
              errors,
              candidatePath,
              `${prefix}${property}`,
              "must be an integer greater than zero",
            );
          }
        }
        if (
          Object.hasOwn(discovery, "active") &&
          typeof discovery.active !== "boolean"
        ) {
          addError(
            errors,
            candidatePath,
            `${prefix}active`,
            "must be a Boolean",
          );
        }
      });
    }
  }

  if (Object.hasOwn(candidate, "publication")) {
    if (!isRecord(candidate.publication)) {
      addError(errors, candidatePath, "publication", "must be a mapping");
    } else {
      validateRequiredFields(
        candidate.publication,
        REQUIRED_PUBLICATION_FIELDS,
        "publication.",
        candidatePath,
        errors,
      );

      if (
        Object.hasOwn(candidate.publication, "decision") &&
        !PUBLICATION_DECISIONS.has(candidate.publication.decision)
      ) {
        addError(
          errors,
          candidatePath,
          "publication.decision",
          "has an unknown publication value",
        );
      }
      if (
        Object.hasOwn(candidate.publication, "reviewer") &&
        candidate.publication.reviewer !== null &&
        !isNonEmptyString(candidate.publication.reviewer)
      ) {
        addError(
          errors,
          candidatePath,
          "publication.reviewer",
          "must be null or a non-empty string",
        );
      }
      if (
        Object.hasOwn(candidate.publication, "reviewed") &&
        candidate.publication.reviewed !== null &&
        !isIsoDate(candidate.publication.reviewed)
      ) {
        addError(
          errors,
          candidatePath,
          "publication.reviewed",
          "must be null or an ISO YYYY-MM-DD date",
        );
      }
      if (
        Object.hasOwn(candidate.publication, "notes") &&
        candidate.publication.notes !== null &&
        typeof candidate.publication.notes !== "string"
      ) {
        addError(
          errors,
          candidatePath,
          "publication.notes",
          "must be null or a string",
        );
      }
    }
  }

  return errors;
}

function displayPath(candidate, index) {
  return (
    candidateMetadata.get(candidate)?.candidatePath ??
    `<candidate ${isNonEmptyString(candidate?.id) ? candidate.id : index + 1}>`
  );
}

function discoveryKey(discovery) {
  return REQUIRED_DISCOVERY_FIELDS.map((field) =>
    JSON.stringify(discovery[field]),
  ).join("\u0000");
}

async function loadAnalysisIds(repositoryRoots) {
  const ids = new Set();

  for (const repositoryRoot of repositoryRoots) {
    const directory = path.join(
      repositoryRoot,
      "references",
      "analyses",
      "sources",
    );
    let entries;
    try {
      entries = await readdir(directory, { withFileTypes: true });
    } catch (error) {
      if (error.code === "ENOENT") continue;
      throw error;
    }

    for (const entry of entries) {
      if (!entry.isFile() || path.extname(entry.name) !== ".md") continue;

      try {
        const contents = await readFile(
          path.join(directory, entry.name),
          "utf8",
        );
        const lines = contents.split(/\r?\n/);
        const closingDelimiter = lines.indexOf("---", 1);
        if (lines[0] !== "---" || closingDelimiter === -1) continue;
        const frontMatter = parse(lines.slice(1, closingDelimiter).join("\n"));
        if (isRecord(frontMatter) && isKebabCase(frontMatter.reference_id)) {
          ids.add(frontMatter.reference_id);
        }
      } catch {
        // Source-analysis validation belongs to its own authoring workflow.
      }
    }
  }

  return ids;
}

async function pathIsFile(filePath) {
  try {
    return (await stat(filePath)).isFile();
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "ENOTDIR") return false;
    throw error;
  }
}

export async function validateGraph(candidates) {
  const errors = [];
  const ids = new Map();
  const canonicalUrls = new Map();
  const repositoryRoots = new Set();

  candidates.forEach((candidate, index) => {
    const candidatePath = displayPath(candidate, index);
    errors.push(...validateCandidate(candidate, candidatePath));

    const repositoryRoot = candidateMetadata.get(candidate)?.repositoryRoot;
    if (repositoryRoot) repositoryRoots.add(repositoryRoot);

    if (isKebabCase(candidate?.id)) {
      if (ids.has(candidate.id)) {
        addError(
          errors,
          candidatePath,
          "id",
          `duplicates ${candidate.id} from ${ids.get(candidate.id)}`,
        );
      } else {
        ids.set(candidate.id, candidatePath);
      }
    }

    if (isHttpsUrl(candidate?.canonical_url)) {
      if (canonicalUrls.has(candidate.canonical_url)) {
        addError(
          errors,
          candidatePath,
          "canonical_url",
          `duplicates ${candidate.canonical_url} from ${canonicalUrls.get(candidate.canonical_url)}`,
        );
      } else {
        canonicalUrls.set(candidate.canonical_url, candidatePath);
      }
    }
  });

  const sourceAnalysisIds = await loadAnalysisIds(repositoryRoots);
  const knownParentIds = new Set([...ids.keys(), ...sourceAnalysisIds]);

  for (const [candidateIndex, candidate] of candidates.entries()) {
    if (!isRecord(candidate)) continue;
    const candidatePath = displayPath(candidate, candidateIndex);
    const seenEdges = new Map();

    if (Array.isArray(candidate.discoveries)) {
      candidate.discoveries.forEach((discovery, discoveryIndex) => {
        if (!isRecord(discovery)) return;
        const prefix = `discoveries[${discoveryIndex}]`;
        const edgeKey = discoveryKey(discovery);

        if (seenEdges.has(edgeKey)) {
          addError(
            errors,
            candidatePath,
            prefix,
            `duplicates identical discovery edge ${seenEdges.get(edgeKey)}`,
          );
        } else {
          seenEdges.set(edgeKey, `discoveries[${discoveryIndex}]`);
        }

        if (discovery.parent_id === candidate.id) {
          addError(
            errors,
            candidatePath,
            `${prefix}.parent_id`,
            `self-links ${candidate.id}`,
          );
        } else if (
          isKebabCase(discovery.parent_id) &&
          !knownParentIds.has(discovery.parent_id)
        ) {
          addError(
            errors,
            candidatePath,
            `${prefix}.parent_id`,
            `unknown ${discovery.parent_id}`,
          );
        }
      });
    }

    const repositoryRoot =
      candidateMetadata.get(candidate)?.repositoryRoot ?? process.cwd();
    for (const property of ["analysis_path", "translation_path"]) {
      const relativePath = candidate[property];
      if (
        typeof relativePath === "string" &&
        isSafeMarkdownPath(relativePath) &&
        !(await pathIsFile(path.join(repositoryRoot, relativePath)))
      ) {
        addError(
          errors,
          candidatePath,
          property,
          `does not exist: ${relativePath}`,
        );
      }
    }
  }

  return errors;
}

export async function loadCandidates(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }

  const repositoryRoot = path.resolve(directory, "..", "..");
  const candidates = [];
  for (const entry of entries
    .filter((item) => item.isFile() && path.extname(item.name) === ".md")
    .sort((left, right) => left.name.localeCompare(right.name))) {
    const candidatePath = path.join(directory, entry.name);
    const candidate = await parseCandidateFile(candidatePath);
    candidateMetadata.set(candidate, { candidatePath, repositoryRoot });
    candidates.push(candidate);
  }

  return candidates;
}

async function main() {
  const directory = process.argv[2] ?? "references/candidates";

  try {
    const candidates = await loadCandidates(directory);
    const errors = await validateGraph(candidates);
    if (errors.length > 0) {
      for (const error of errors) console.error(error);
      process.exitCode = 1;
      return;
    }

    console.log(`Reference graph valid: ${candidates.length} candidates`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await main();
}
