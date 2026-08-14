import { describe, expect, it } from "vitest";
import type {
  ReferenceArea,
  ReferenceCatalog,
  ReferenceRecord,
} from "./reference-schema";
import { filterReferences, parseReferenceFilters } from "./reference-filters";

const areas: ReferenceArea[] = [
  {
    id: "interface-implementation",
    label: "Interface Implementation",
    description: "Building useful interfaces.",
  },
  {
    id: "accessibility-and-inclusive-design",
    label: "Accessibility and Inclusive Design",
    description: "Making interfaces usable.",
  },
];

const catalog: Pick<ReferenceCatalog, "areas"> = { areas };

function record(overrides: Partial<ReferenceRecord> = {}): ReferenceRecord {
  return {
    id: "interface-article",
    title: "Interface Article",
    url: "https://example.com/interface-article",
    publisher: "Example",
    author: null,
    summary: "A project-owned summary.",
    relevance: "A project-owned relevance note.",
    format: "article",
    areas: ["interface-implementation"],
    collections: [],
    source_language: "en",
    published: null,
    added: "2026-08-14",
    reviewed: "2026-08-14",
    status: "published",
    preview: null,
    language: "en",
    translation_of: null,
    ...overrides,
  };
}

const records = [
  record(),
  record({
    id: "accessible-tool",
    title: "Accessible Tool",
    url: "https://example.com/accessible-tool",
    format: "tool",
    areas: ["accessibility-and-inclusive-design"],
  }),
  record({
    id: "interface-tool",
    title: "Interface Tool",
    url: "https://example.com/interface-tool",
    format: "tool",
  }),
];

describe("reference filters", () => {
  it("returns every visible record when no filters are supplied", () => {
    const filters = parseReferenceFilters({}, catalog);

    expect(filterReferences(records, filters).map(({ id }) => id)).toEqual([
      "interface-article",
      "accessible-tool",
      "interface-tool",
    ]);
  });

  it("treats empty native select values as no filter", () => {
    const filters = parseReferenceFilters({ area: "", format: "" }, catalog);

    expect(filters).toEqual({
      area: null,
      format: null,
      hasInvalidValue: false,
    });
  });

  it("filters by a valid Area", () => {
    const filters = parseReferenceFilters(
      { area: "accessibility-and-inclusive-design" },
      catalog,
    );

    expect(filterReferences(records, filters).map(({ id }) => id)).toEqual([
      "accessible-tool",
    ]);
  });

  it("filters by a valid Format", () => {
    const filters = parseReferenceFilters({ format: "tool" }, catalog);

    expect(filterReferences(records, filters).map(({ id }) => id)).toEqual([
      "accessible-tool",
      "interface-tool",
    ]);
  });

  it("intersects a valid Area and Format", () => {
    const filters = parseReferenceFilters(
      { area: "interface-implementation", format: "tool" },
      catalog,
    );

    expect(filterReferences(records, filters).map(({ id }) => id)).toEqual([
      "interface-tool",
    ]);
  });

  it("discards all filter state when either supplied filter is unknown", () => {
    const unknownArea = parseReferenceFilters(
      { area: "unknown-area", format: "tool" },
      catalog,
    );
    const unknownFormat = parseReferenceFilters(
      { area: "interface-implementation", format: "unknown-format" },
      catalog,
    );

    expect(unknownArea).toEqual({
      area: null,
      format: null,
      hasInvalidValue: true,
    });
    expect(unknownFormat).toEqual(unknownArea);
    expect(filterReferences(records, unknownArea)).toEqual(records);
  });

  it("returns no records for valid filters that have no matching record", () => {
    const filters = parseReferenceFilters(
      { area: "accessibility-and-inclusive-design", format: "documentation" },
      catalog,
    );

    expect(filterReferences(records, filters)).toEqual([]);
  });

  it("uses only the first string from repeated query values", () => {
    const filters = parseReferenceFilters(
      {
        area: [
          "accessibility-and-inclusive-design",
          "interface-implementation",
        ],
        format: ["tool", "article"],
      },
      catalog,
    );

    expect(filters).toEqual({
      area: "accessibility-and-inclusive-design",
      format: "tool",
      hasInvalidValue: false,
    });
  });
});
