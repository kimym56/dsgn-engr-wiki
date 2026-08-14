import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import {
  parseReferenceCatalog,
  type ReferenceCatalog,
  type ReferenceRecord,
} from "./reference-schema";

const DEFAULT_CONTENT_ROOT = path.join(process.cwd(), "content");

async function readJsonFile(
  contentRoot: string,
  relativePath: string,
): Promise<unknown> {
  const source = await readFile(path.join(contentRoot, relativePath), "utf8");

  try {
    return JSON.parse(source);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to parse ${relativePath}: ${message}`);
  }
}

export async function loadReferenceCatalog(
  contentRoot = DEFAULT_CONTENT_ROOT,
): Promise<ReferenceCatalog> {
  const referenceDirectory = "references/en";
  const filenames = (await readdir(path.join(contentRoot, referenceDirectory)))
    .filter((filename) => filename.endsWith(".json"))
    .sort();
  const [areas, collections, ...records] = await Promise.all([
    readJsonFile(contentRoot, "areas/en.json"),
    readJsonFile(contentRoot, "collections/en.json"),
    ...filenames.map(async (filename) => ({
      path: `${referenceDirectory}/${filename}`,
      value: await readJsonFile(
        contentRoot,
        `${referenceDirectory}/${filename}`,
      ),
    })),
  ]);
  const catalog = parseReferenceCatalog({
    areas,
    collections,
    records: records as Array<{ path: string; value: unknown }>,
  });

  return {
    ...catalog,
    records: [...catalog.records].sort(
      (left, right) =>
        right.added.localeCompare(left.added) ||
        left.title.localeCompare(right.title, "en"),
    ),
  };
}

export function selectVisibleReferences(
  records: ReferenceRecord[],
  options?: { includeReview?: boolean },
): ReferenceRecord[] {
  return records.filter(
    (record) =>
      record.status === "published" ||
      (options?.includeReview === true && record.status === "review"),
  );
}
