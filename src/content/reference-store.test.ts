import { afterEach, describe, expect, it } from "vitest";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import {
  loadReferenceCatalog,
  selectVisibleReferences,
} from "./reference-store";
import type { ReferenceArea, ReferenceRecord } from "./reference-schema";

let fixtureRoot: string | undefined;

const area: ReferenceArea = {
  id: "design-engineering-foundations",
  label: "Design Engineering Foundations",
  description: "Core perspectives on design-engineering practice.",
};

const record = (overrides: Partial<ReferenceRecord> = {}): ReferenceRecord => ({
  id: "older-title",
  title: "Older Title",
  url: "https://example.com/older-title",
  publisher: "Example",
  author: null,
  summary: "An original project-owned summary.",
  relevance: "An original project-owned relevance note.",
  format: "article",
  areas: [area.id],
  collections: [],
  source_language: "en",
  published: null,
  added: "2026-08-13",
  reviewed: "2026-08-14",
  status: "review",
  preview: null,
  language: "en",
  translation_of: null,
  ...overrides,
});

async function writeFixture(
  relativePath: string,
  value: unknown,
): Promise<void> {
  fixtureRoot ??= await mkdtemp(path.join(tmpdir(), "reference-store-"));
  const destination = path.join(fixtureRoot, relativePath);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(
    destination,
    typeof value === "string" ? value : JSON.stringify(value),
    "utf8",
  );
}

async function writeCatalog(
  records: Array<{ filename: string; value: unknown }>,
): Promise<string> {
  await writeFixture("areas/en.json", [area]);
  await writeFixture("collections/en.json", []);
  await Promise.all(
    records.map(({ filename, value }) =>
      writeFixture(path.join("references/en", filename), value),
    ),
  );
  return fixtureRoot!;
}

afterEach(async () => {
  if (fixtureRoot) await rm(fixtureRoot, { recursive: true, force: true });
  fixtureRoot = undefined;
});

describe("reference store", () => {
  it("reads both registries and every JSON reference file", async () => {
    const root = await writeCatalog([
      {
        filename: "older.json",
        value: record(),
      },
      {
        filename: "newer.json",
        value: record({
          id: "newer-title",
          title: "Newer Title",
          url: "https://example.com/newer-title",
          added: "2026-08-14",
        }),
      },
    ]);
    await writeFixture("references/en/ignored.txt", "not JSON");

    const catalog = await loadReferenceCatalog(root);

    expect(catalog.areas).toEqual([area]);
    expect(catalog.collections).toEqual([]);
    expect(catalog.records.map(({ id }) => id)).toEqual([
      "newer-title",
      "older-title",
    ]);
  });

  it("reports the relative path for malformed JSON", async () => {
    const root = await writeCatalog([]);
    await writeFixture("references/en/malformed.json", "{ this is not JSON");

    await expect(loadReferenceCatalog(root)).rejects.toThrow(
      "references/en/malformed.json",
    );
  });

  it("reports the relative path and field for invalid content", async () => {
    const root = await writeCatalog([
      {
        filename: "invalid.json",
        value: record({ title: "" }),
      },
    ]);

    await expect(loadReferenceCatalog(root)).rejects.toThrow(
      "references/en/invalid.json.title",
    );
  });

  it("sorts records by added date descending and then English title", async () => {
    const root = await writeCatalog([
      {
        filename: "zulu.json",
        value: record({
          id: "same-date-zulu",
          title: "Zulu",
          url: "https://example.com/same-date-zulu",
          added: "2026-08-14",
        }),
      },
      {
        filename: "alpha.json",
        value: record({
          id: "same-date-alpha",
          title: "Alpha",
          url: "https://example.com/same-date-alpha",
          added: "2026-08-14",
        }),
      },
      {
        filename: "older.json",
        value: record(),
      },
    ]);

    const catalog = await loadReferenceCatalog(root);

    expect(catalog.records.map(({ id }) => id)).toEqual([
      "same-date-alpha",
      "same-date-zulu",
      "older-title",
    ]);
  });

  it("returns only published records unless review is explicitly included", () => {
    const records = [
      record({
        id: "published",
        url: "https://example.com/published",
        status: "published",
      }),
      record({
        id: "review",
        url: "https://example.com/review",
        status: "review",
      }),
      record({
        id: "draft",
        url: "https://example.com/draft",
        status: "draft",
      }),
      record({
        id: "archived",
        url: "https://example.com/archived",
        status: "archived",
      }),
    ];

    expect(selectVisibleReferences(records)).toEqual([
      expect.objectContaining({ status: "published" }),
    ]);
    expect(selectVisibleReferences(records, { includeReview: true })).toEqual([
      expect.objectContaining({ status: "published" }),
      expect.objectContaining({ status: "review" }),
    ]);
  });
});
