import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

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

function validateAllowedFields(value, fields, prefix, candidatePath, errors) {
  for (const field of Object.keys(value)) {
    if (!fields.includes(field)) {
      addError(errors, candidatePath, `${prefix}${field}`, "is not allowed");
    }
  }
}

export async function parseCandidateFile(candidatePath) {
  const { frontMatter } = await parseMarkdownFile(candidatePath);
  return frontMatter;
}

async function parseMarkdownFile(filePath) {
  const contents = await readFile(filePath, "utf8");
  const lines = contents.split(/\r?\n/);

  if (lines[0] !== "---") {
    throw new Error(
      `${filePath}: front_matter must start with a --- delimiter`,
    );
  }

  const closingDelimiter = lines.indexOf("---", 1);
  if (closingDelimiter === -1) {
    throw new Error(`${filePath}: front_matter must end with a --- delimiter`);
  }

  let frontMatter;
  try {
    frontMatter = parse(lines.slice(1, closingDelimiter).join("\n"));
  } catch (error) {
    throw new Error(
      `${filePath}: front_matter is invalid YAML: ${error.message}`,
      { cause: error },
    );
  }

  if (!isRecord(frontMatter)) {
    throw new Error(`${filePath}: front_matter must be a YAML mapping`);
  }

  return {
    frontMatter,
    body: lines.slice(closingDelimiter + 1).join("\n"),
  };
}

export function validateCandidate(candidate, candidatePath) {
  const errors = [];

  if (!isRecord(candidate)) {
    addError(errors, candidatePath, "candidate", "must be a YAML mapping");
    return errors;
  }

  validateRequiredFields(candidate, REQUIRED_FIELDS, "", candidatePath, errors);
  validateAllowedFields(candidate, REQUIRED_FIELDS, "", candidatePath, errors);

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
        validateAllowedFields(
          discovery,
          REQUIRED_DISCOVERY_FIELDS,
          prefix,
          candidatePath,
          errors,
        );

        if (
          Object.hasOwn(discovery, "parent_id") &&
          !isKebabCase(discovery.parent_id)
        ) {
          addError(
            errors,
            candidatePath,
            `${prefix}parent_id`,
            "must be a lowercase kebab-case ID",
          );
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
      validateAllowedFields(
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

function displayPath(candidate, index, context) {
  return (
    context.candidatePaths?.get(candidate) ??
    `<candidate ${isNonEmptyString(candidate?.id) ? candidate.id : index + 1}>`
  );
}

function discoveryKey(discovery) {
  return REQUIRED_DISCOVERY_FIELDS.map((field) =>
    JSON.stringify(discovery[field]),
  ).join("\u0000");
}

async function loadAnalysisParents(repositoryRoots) {
  const parents = new Map();

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
        const { frontMatter } = await parseMarkdownFile(
          path.join(directory, entry.name),
        );
        if (
          isKebabCase(frontMatter.reference_id) &&
          isHttpsUrl(frontMatter.canonical_url)
        ) {
          parents.set(frontMatter.reference_id, frontMatter.canonical_url);
        }
      } catch {
        // Source-analysis validation belongs to its own authoring workflow.
      }
    }
  }

  return parents;
}

async function validateAnalysisArtifact(
  filePath,
  candidate,
  { reviewTranslation = false } = {},
) {
  let artifact;
  try {
    artifact = await parseMarkdownFile(filePath);
  } catch (error) {
    return [error.message];
  }

  const errors = [];
  const expectedValues = {
    reference_id: candidate.id,
    canonical_url: candidate.canonical_url,
    status: "draft",
  };
  for (const [property, expectedValue] of Object.entries(expectedValues)) {
    if (artifact.frontMatter[property] !== expectedValue) {
      addError(errors, filePath, property, `must match ${expectedValue}`);
    }
  }

  if (reviewTranslation) {
    const expectedNotice = `> 이 문서는 [영문 원본](../../sources/${candidate.id}.md)의 한국어 검토용 번역본입니다. 영문 원본을 기준 분석으로 사용합니다.`;
    if (!artifact.body.includes(expectedNotice)) {
      addError(
        errors,
        filePath,
        "review_translation_notice",
        `must contain the exact backlink ../../sources/${candidate.id}.md`,
      );
    }
  }

  return errors;
}

async function pathIsFile(filePath) {
  try {
    return (await stat(filePath)).isFile();
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "ENOTDIR") return false;
    throw error;
  }
}

function withLoadContext(candidates, errors, context) {
  Object.defineProperties(candidates, {
    errors: { value: errors },
    context: { value: context },
  });
  return candidates;
}

export async function validateGraph(candidates, context = {}) {
  const errors = [];
  const ids = new Map();
  const canonicalUrls = new Map();
  const candidateParents = new Map();

  candidates.forEach((candidate, index) => {
    const candidatePath = displayPath(candidate, index, context);
    errors.push(...validateCandidate(candidate, candidatePath));

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

      if (isHttpsUrl(candidate?.canonical_url)) {
        candidateParents.set(candidate.id, candidate.canonical_url);
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

  const sourceAnalysisParents = new Map(context.sourceAnalysisParents);
  if (context.repositoryRoot) {
    for (const [id, canonicalUrl] of await loadAnalysisParents([
      context.repositoryRoot,
    ])) {
      sourceAnalysisParents.set(id, canonicalUrl);
    }
  }
  const parentCanonicalUrls = new Map([
    ...sourceAnalysisParents,
    ...candidateParents,
  ]);

  for (const [candidateIndex, candidate] of candidates.entries()) {
    if (!isRecord(candidate)) continue;
    const candidatePath = displayPath(candidate, candidateIndex, context);
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
          !parentCanonicalUrls.has(discovery.parent_id)
        ) {
          addError(
            errors,
            candidatePath,
            `${prefix}.parent_id`,
            `unknown ${discovery.parent_id}`,
          );
        } else if (
          parentCanonicalUrls.has(discovery.parent_id) &&
          discovery.parent_url !== parentCanonicalUrls.get(discovery.parent_id)
        ) {
          addError(
            errors,
            candidatePath,
            `${prefix}.parent_url`,
            `must match ${parentCanonicalUrls.get(discovery.parent_id)}`,
          );
        }
      });
    }

    if (context.repositoryRoot) {
      for (const property of ["analysis_path", "translation_path"]) {
        const relativePath = candidate[property];
        if (
          typeof relativePath !== "string" ||
          !isSafeMarkdownPath(relativePath)
        ) {
          continue;
        }

        const artifactPath = path.join(context.repositoryRoot, relativePath);
        if (!(await pathIsFile(artifactPath))) {
          addError(
            errors,
            candidatePath,
            property,
            `does not exist: ${relativePath}`,
          );
          continue;
        }

        if (candidate.status === "analyzed") {
          errors.push(
            ...(await validateAnalysisArtifact(artifactPath, candidate, {
              reviewTranslation: property === "translation_path",
            })),
          );
        }
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
    if (error.code === "ENOENT") {
      return withLoadContext([], [], {
        repositoryRoot: path.resolve(directory, "..", ".."),
        candidatePaths: new Map(),
      });
    }
    throw error;
  }

  const repositoryRoot = path.resolve(directory, "..", "..");
  const candidates = [];
  const errors = [];
  const candidatePaths = new Map();
  for (const entry of entries
    .filter((item) => item.isFile() && path.extname(item.name) === ".md")
    .sort((left, right) => left.name.localeCompare(right.name))) {
    const candidatePath = path.join(directory, entry.name);
    try {
      const candidate = await parseCandidateFile(candidatePath);
      candidatePaths.set(candidate, candidatePath);
      candidates.push(candidate);

      if (`${candidate.id}.md` !== entry.name) {
        addError(
          errors,
          candidatePath,
          "id",
          `must match filename ${candidate.id}.md`,
        );
      }
    } catch (error) {
      errors.push(error.message);
    }
  }

  return withLoadContext(candidates, errors, {
    repositoryRoot,
    candidatePaths,
  });
}

function formatError(error) {
  return error.replace(/\s*\r?\n\s*/g, " ");
}

async function main() {
  const directory = process.argv[2] ?? "references/candidates";

  try {
    const candidates = await loadCandidates(directory);
    const errors = [
      ...candidates.errors,
      ...(await validateGraph(candidates, candidates.context)),
    ];
    if (errors.length > 0) {
      for (const error of errors) console.error(formatError(error));
      process.exitCode = 1;
      return;
    }

    console.log(`Reference graph valid: ${candidates.length} candidates`);
  } catch (error) {
    console.error(formatError(error.message));
    process.exitCode = 1;
  }
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await main();
}
