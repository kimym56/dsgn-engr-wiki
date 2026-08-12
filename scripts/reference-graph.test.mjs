// @vitest-environment node

import { execFile } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

import {
  parseCandidateFile,
  loadCandidates,
  validateCandidate,
  validateGraph,
} from "./reference-graph.mjs";

const temporaryDirectories = [];
const executeFile = promisify(execFile);
const scriptPath = fileURLToPath(
  new URL("./reference-graph.mjs", import.meta.url),
);

function validCandidate(overrides = {}) {
  return {
    id: "child-source",
    title: "Child source",
    title_source: "destination",
    canonical_url: "https://example.com/child",
    canonical_verified: true,
    source_language: "en",
    status: "discovered",
    first_discovered: "2026-08-12",
    last_checked: "2026-08-12",
    analysis_path: null,
    translation_path: null,
    discoveries: [
      {
        parent_id: "parent-source",
        parent_url: "https://example.com/parent",
        section: "Resources",
        link_text: "Child source",
        encountered_url: "https://example.com/child",
        discovered: "2026-08-12",
        wave: 1,
        depth: 1,
        active: true,
      },
    ],
    publication: {
      decision: "pending",
      reviewer: null,
      reviewed: null,
      notes: null,
    },
    ...overrides,
  };
}

async function temporaryFile(name, contents) {
  const directory = await mkdtemp(path.join(tmpdir(), "reference-graph-"));
  temporaryDirectories.push(directory);
  const filePath = path.join(directory, name);
  await writeFile(filePath, contents);
  return filePath;
}

async function fixtureRepository(candidates, parentIds = ["parent-source"]) {
  const root = await mkdtemp(path.join(tmpdir(), "reference-graph-"));
  temporaryDirectories.push(root);
  const candidateDirectory = path.join(root, "references", "candidates");
  const analysisDirectory = path.join(
    root,
    "references",
    "analyses",
    "sources",
  );
  await mkdir(candidateDirectory, { recursive: true });
  await mkdir(analysisDirectory, { recursive: true });

  await Promise.all([
    ...candidates.map((candidate) =>
      writeFile(
        path.join(candidateDirectory, `${candidate.id}.md`),
        `---\n${JSON.stringify(candidate)}\n---\n`,
      ),
    ),
    ...parentIds.map((parentId, index) =>
      writeFile(
        path.join(analysisDirectory, `source-analysis-${index + 1}.md`),
        `---\nreference_id: ${parentId}\n---\n`,
      ),
    ),
  ]);

  return { root, candidateDirectory };
}

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

describe("parseCandidateFile", () => {
  it("parses only the YAML between the first two front-matter delimiters", async () => {
    const filePath = await temporaryFile(
      "child-source.md",
      [
        "---",
        "id: child-source",
        "title: Child source",
        "---",
        "# Body",
        "---",
        "id: ignored-body-value",
      ].join("\n"),
    );

    await expect(parseCandidateFile(filePath)).resolves.toMatchObject({
      id: "child-source",
      title: "Child source",
    });
  });

  it("reports malformed YAML with the candidate path and front_matter property", async () => {
    const filePath = await temporaryFile(
      "malformed.md",
      "---\nid: [unterminated\n---\n",
    );

    await expect(parseCandidateFile(filePath)).rejects.toThrow(filePath);
    await expect(parseCandidateFile(filePath)).rejects.toThrow("front_matter");
  });

  it("reports a non-mapping document as a front_matter mapping error", async () => {
    const filePath = await temporaryFile("list.md", "---\n- one\n- two\n---\n");

    await expect(parseCandidateFile(filePath)).rejects.toThrow(
      `${filePath}: front_matter must be a YAML mapping`,
    );
  });
});

describe("validateCandidate", () => {
  const candidatePath = "/fixtures/references/candidates/child-source.md";

  it("accepts a complete valid candidate node", () => {
    expect(validateCandidate(validCandidate(), candidatePath)).toEqual([]);
  });

  it("reports every missing required property with the candidate path", () => {
    const candidate = validCandidate();
    delete candidate.title;
    delete candidate.publication;

    expect(validateCandidate(candidate, candidatePath)).toEqual(
      expect.arrayContaining([
        expect.stringContaining(`${candidatePath}: title`),
        expect.stringContaining(`${candidatePath}: publication`),
      ]),
    );
  });

  it("rejects unknown root, discovery, and publication properties", () => {
    const candidate = validCandidate({ unexpected_root: true });
    candidate.discoveries[0].unexpected_discovery = true;
    candidate.publication.unexpected_publication = true;

    expect(validateCandidate(candidate, candidatePath)).toEqual([
      `${candidatePath}: unexpected_root is not allowed`,
      `${candidatePath}: discoveries[0].unexpected_discovery is not allowed`,
      `${candidatePath}: publication.unexpected_publication is not allowed`,
    ]);
  });

  it.each([
    ["title_source", "third-party", "title_source"],
    ["status", "duplicate", "status"],
    ["canonical_verified", "true", "canonical_verified"],
    ["first_discovered", "08/12/2026", "first_discovered"],
  ])("rejects an invalid %s value", (property, value, expectedProperty) => {
    const errors = validateCandidate(
      validCandidate({ [property]: value }),
      candidatePath,
    );

    expect(errors).toEqual([
      expect.stringContaining(`${candidatePath}: ${expectedProperty}`),
    ]);
  });

  it.each([
    ["canonical_url", "http://example.com/child"],
    ["discoveries[0].parent_url", "//example.com/parent"],
    ["discoveries[0].encountered_url", "javascript:alert(1)"],
  ])("rejects non-HTTPS URL property %s", (property, value) => {
    const candidate = validCandidate();
    if (property === "canonical_url") {
      candidate.canonical_url = value;
    } else {
      const edgeProperty = property.slice("discoveries[0].".length);
      candidate.discoveries[0][edgeProperty] = value;
    }

    expect(validateCandidate(candidate, candidatePath)).toEqual([
      expect.stringContaining(`${candidatePath}: ${property}`),
    ]);
  });

  it("rejects an unsafe analysis path", () => {
    expect(
      validateCandidate(
        validCandidate({
          status: "analyzed",
          analysis_path: "../outside.md",
          translation_path: "references/analyses/ko/sources/child-source.md",
        }),
        candidatePath,
      ),
    ).toEqual([expect.stringContaining(`${candidatePath}: analysis_path`)]);
  });

  it("rejects mutually inconsistent analysis paths", () => {
    const errors = validateCandidate(
      validCandidate({
        analysis_path: "references/analyses/sources/child-source.md",
        translation_path: null,
      }),
      candidatePath,
    );

    expect(errors).toEqual(
      expect.arrayContaining([
        expect.stringContaining(`${candidatePath}: analysis_path`),
        expect.stringContaining(`${candidatePath}: translation_path`),
      ]),
    );
  });

  it.each([
    ["decision", "approved"],
    ["reviewer", false],
    ["reviewed", "tomorrow"],
    ["notes", 42],
  ])("rejects an invalid publication.%s value", (property, value) => {
    const candidate = validCandidate({
      publication: {
        ...validCandidate().publication,
        [property]: value,
      },
    });

    expect(validateCandidate(candidate, candidatePath)).toEqual([
      expect.stringContaining(`${candidatePath}: publication.${property}`),
    ]);
  });

  it("rejects an empty discoveries collection", () => {
    expect(
      validateCandidate(validCandidate({ discoveries: [] }), candidatePath),
    ).toEqual([expect.stringContaining(`${candidatePath}: discoveries`)]);
  });

  it.each([
    ["wave", 0],
    ["depth", 1.5],
    ["active", "true"],
  ])("rejects an invalid discoveries[0].%s value", (property, value) => {
    const candidate = validCandidate();
    candidate.discoveries[0][property] = value;

    expect(validateCandidate(candidate, candidatePath)).toEqual([
      expect.stringContaining(`${candidatePath}: discoveries[0].${property}`),
    ]);
  });
});

describe("reference graph invariants", () => {
  it("reports duplicate IDs and canonical URLs", async () => {
    const first = validCandidate();
    const second = validCandidate({
      canonical_url: "https://example.com/second",
    });
    const third = validCandidate({
      id: "third-source",
      canonical_url: first.canonical_url,
    });
    const errors = await validateGraph([first, second, third], {
      sourceAnalysisIds: ["parent-source"],
    });

    expect(errors).toEqual([
      expect.stringContaining("id duplicates child-source"),
      expect.stringContaining(
        "canonical_url duplicates https://example.com/child",
      ),
    ]);
  });

  it("reports repeated identical discovery edges", async () => {
    const candidate = validCandidate();
    candidate.discoveries.push({ ...candidate.discoveries[0] });
    const { candidateDirectory } = await fixtureRepository([candidate]);

    const candidates = await loadCandidates(candidateDirectory);

    expect(await validateGraph(candidates, candidates.context)).toEqual([
      expect.stringContaining("discoveries[1]"),
    ]);
  });

  it("reports unknown parents and self-links", async () => {
    const unknown = validCandidate();
    const selfLinked = validCandidate({ id: "self-linked" });
    selfLinked.discoveries[0].parent_id = "self-linked";

    expect(await validateGraph([unknown, selfLinked])).toEqual(
      expect.arrayContaining([
        expect.stringContaining(
          "discoveries[0].parent_id unknown parent-source",
        ),
        expect.stringContaining(
          "discoveries[0].parent_id self-links self-linked",
        ),
      ]),
    );
  });

  it("reports analysis and translation paths whose files do not exist", async () => {
    const { candidateDirectory } = await fixtureRepository([
      validCandidate({
        status: "analyzed",
        analysis_path: "references/analyses/sources/child-source.md",
        translation_path: "references/analyses/ko/sources/child-source.md",
      }),
    ]);
    const candidates = await loadCandidates(candidateDirectory);

    expect(await validateGraph(candidates, candidates.context)).toEqual(
      expect.arrayContaining([
        expect.stringContaining("analysis_path"),
        expect.stringContaining("translation_path"),
      ]),
    );
  });

  it("accepts distinct edges from candidate and source-analysis parents", async () => {
    const parent = validCandidate({
      id: "candidate-parent",
      canonical_url: "https://example.com/candidate-parent",
    });
    const child = validCandidate({
      discoveries: [
        validCandidate().discoveries[0],
        {
          ...validCandidate().discoveries[0],
          parent_id: "candidate-parent",
          parent_url: "https://example.com/candidate-parent",
        },
      ],
    });
    const { candidateDirectory } = await fixtureRepository([parent, child]);

    const candidates = await loadCandidates(candidateDirectory);

    expect(await validateGraph(candidates, candidates.context)).toEqual([]);
  });

  it("loads zero candidates when the directory does not exist", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "reference-graph-"));
    temporaryDirectories.push(root);

    await expect(loadCandidates(path.join(root, "missing"))).resolves.toEqual(
      [],
    );
  });

  it("reports candidate filenames that do not match their front-matter IDs", async () => {
    const { candidateDirectory } = await fixtureRepository([]);
    await writeFile(
      path.join(candidateDirectory, "wrong-name.md"),
      `---\n${JSON.stringify(validCandidate())}\n---\n`,
    );

    const candidates = await loadCandidates(candidateDirectory);

    expect(candidates).toHaveLength(1);
    expect(candidates.errors).toEqual([
      expect.stringContaining(
        "wrong-name.md: id must match filename child-source.md",
      ),
    ]);
  });

  it("validates parsed candidates against an explicit repository context", async () => {
    const candidate = validCandidate({
      status: "analyzed",
      analysis_path: "references/analyses/sources/child-source.md",
      translation_path: "references/analyses/ko/sources/child-source.md",
    });
    const { root, candidateDirectory } = await fixtureRepository([candidate]);
    const candidatePath = path.join(candidateDirectory, "child-source.md");
    await mkdir(path.join(root, "references", "analyses", "ko", "sources"), {
      recursive: true,
    });
    await Promise.all([
      writeFile(
        path.join(root, candidate.analysis_path),
        "---\nreference_id: child-source\n---\n",
      ),
      writeFile(path.join(root, candidate.translation_path), "# Translation\n"),
    ]);

    const parsedCandidate = await parseCandidateFile(candidatePath);

    await expect(
      validateGraph([parsedCandidate], {
        repositoryRoot: root,
        candidatePaths: new Map([[parsedCandidate, candidatePath]]),
      }),
    ).resolves.toEqual([]);
  });
});

describe("reference graph CLI", () => {
  it("reports a valid missing collection as zero candidates", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "reference-graph-"));
    temporaryDirectories.push(root);

    const result = await executeFile(process.execPath, [
      scriptPath,
      path.join(root, "references", "candidates"),
    ]);

    expect(result.stderr).toBe("");
    expect(result.stdout.trim()).toBe("Reference graph valid: 0 candidates");
  });

  it("prints each actionable validation error to stderr and exits 1", async () => {
    const { candidateDirectory } = await fixtureRepository([
      validCandidate({
        canonical_url: "http://example.com/child",
        status: "duplicate",
      }),
    ]);
    const candidatePath = path.join(candidateDirectory, "child-source.md");

    let failure;
    try {
      await executeFile(process.execPath, [scriptPath, candidateDirectory]);
    } catch (error) {
      failure = error;
    }

    expect(failure?.code).toBe(1);
    expect(failure?.stdout).toBe("");
    expect(failure?.stderr.trim().split("\n")).toEqual([
      expect.stringContaining(`${candidatePath}: canonical_url`),
      expect.stringContaining(`${candidatePath}: status`),
    ]);
  });

  it("prints parse and validation errors from every candidate as single lines", async () => {
    const { candidateDirectory } = await fixtureRepository([]);
    const invalidCandidatePath = path.join(
      candidateDirectory,
      "child-source.md",
    );
    const firstMalformedPath = path.join(candidateDirectory, "first.md");
    const secondMalformedPath = path.join(candidateDirectory, "second.md");
    await Promise.all([
      writeFile(
        invalidCandidatePath,
        `---\n${JSON.stringify(
          validCandidate({ canonical_url: "http://example.com/child" }),
        )}\n---\n`,
      ),
      writeFile(firstMalformedPath, "---\nid: [unterminated\n---\n"),
      writeFile(secondMalformedPath, "---\ntitle: [unterminated\n---\n"),
    ]);

    let failure;
    try {
      await executeFile(process.execPath, [scriptPath, candidateDirectory]);
    } catch (error) {
      failure = error;
    }

    const lines = failure?.stderr.trim().split("\n");
    expect(failure?.code).toBe(1);
    expect(lines).toHaveLength(3);
    expect(lines).toEqual(
      expect.arrayContaining([
        expect.stringContaining(`${firstMalformedPath}: front_matter`),
        expect.stringContaining(`${secondMalformedPath}: front_matter`),
        expect.stringContaining(`${invalidCandidatePath}: canonical_url`),
      ]),
    );
  });
});
