import { describe, expect, it } from "vitest";
import {
  parseReferenceCatalog,
  validateReferenceCatalog,
  type ReferenceCatalogInput,
} from "./reference-schema";

const validRecord = {
  id: "developing-taste",
  title: "Developing Taste",
  url: "https://emilkowal.ski/ui/developing-taste",
  publisher: "Emil Kowalski",
  author: "Emil Kowalski",
  summary: "An original project-owned summary.",
  relevance: "An original project-owned relevance note.",
  format: "article",
  areas: ["design-engineering-foundations"],
  collections: [],
  source_language: "en",
  published: null,
  added: "2026-08-14",
  reviewed: "2026-08-14",
  status: "review",
  preview: null,
  language: "en",
  translation_of: null,
};

const validArea = {
  id: "design-engineering-foundations",
  label: "Design Engineering Foundations",
  description: "Core perspectives on design-engineering practice.",
};

const validInput: ReferenceCatalogInput = {
  areas: [
    validArea,
  ],
  collections: [],
  records: [
    {
      path: "content/references/en/developing-taste.json",
      value: validRecord,
    },
  ],
};

describe("parseReferenceCatalog", () => {
  it("accepts a complete English catalog with nullable optional fields", () => {
    expect(parseReferenceCatalog(validInput)).toEqual({
      areas: validInput.areas,
      collections: [],
      records: [validRecord],
    });
  });

  it.each([
    ["id", { id: "Developing Taste" }, "id"],
    ["url", { url: "http://example.com" }, "url"],
    ["source language", { source_language: "english" }, "source_language"],
    ["added date", { added: "2026-02-30" }, "added"],
    ["format", { format: "video" }, "format"],
    ["status", { status: "approved" }, "status"],
    ["empty areas", { areas: [] }, "areas"],
    ["translation", { translation_of: "some-record" }, "translation_of"],
  ])("rejects an invalid %s", (_label, replacement, field) => {
    const input = structuredClone(validInput);
    input.records[0].value = { ...validRecord, ...replacement };

    expect(validateReferenceCatalog(input)).toEqual(
      expect.arrayContaining([
        expect.stringContaining(
          "content/references/en/developing-taste.json." + field,
        ),
      ]),
    );
  });

  it("rejects missing fields and unknown fields", () => {
    const input = structuredClone(validInput);
    const { summary: _summary, ...missingSummary } = validRecord;
    input.records = [
      { path: "content/references/en/missing.json", value: missingSummary },
      {
        path: "content/references/en/unknown.json",
        value: { ...validRecord, unexpected: true },
      },
    ];

    expect(validateReferenceCatalog(input)).toEqual(
      expect.arrayContaining([
        expect.stringContaining("missing.json.summary"),
        expect.stringContaining("unknown.json.unexpected"),
      ]),
    );
  });

  it("rejects duplicate record ids, urls, and relationships", () => {
    const input = structuredClone(validInput);
    input.records = [
      validInput.records[0],
      {
        path: "content/references/en/duplicate.json",
        value: {
          ...validRecord,
          areas: [
            "design-engineering-foundations",
            "design-engineering-foundations",
          ],
        },
      },
    ];

    expect(validateReferenceCatalog(input)).toEqual(
      expect.arrayContaining([
        expect.stringContaining("duplicate record id"),
        expect.stringContaining("duplicate canonical url"),
        expect.stringContaining("duplicate area"),
      ]),
    );
  });

  it("rejects unknown areas and collections", () => {
    const input = structuredClone(validInput);
    input.records[0].value = {
      ...validRecord,
      areas: ["unknown-area"],
      collections: ["unknown-collection"],
    };

    expect(validateReferenceCatalog(input)).toEqual(
      expect.arrayContaining([
        expect.stringContaining("unknown area"),
        expect.stringContaining("unknown collection"),
      ]),
    );
  });

  it("requires complete preview attribution and alternative text", () => {
    const input = structuredClone(validInput);
    input.records[0].value = {
      ...validRecord,
      preview: {
        src: "/previews/developing-taste.webp",
        alt: "",
        source_url: "https://example.com",
        rights: "",
      },
    };

    expect(validateReferenceCatalog(input)).toEqual(
      expect.arrayContaining([
        expect.stringContaining("preview.alt"),
        expect.stringContaining("preview.rights"),
      ]),
    );
  });

  it("rejects duplicate area ids", () => {
    const input = structuredClone(validInput);
    input.areas = [
      validArea,
      { ...validArea, label: "Duplicate" },
    ];

    expect(validateReferenceCatalog(input)).toEqual(
      expect.arrayContaining([expect.stringContaining("duplicate area id")]),
    );
  });

  it("rejects duplicate collection ids", () => {
    const input = structuredClone(validInput);
    input.collections = [
      { id: "featured", label: "Featured", description: "Featured work." },
      { id: "featured", label: "Again", description: "Repeated work." },
    ];

    expect(validateReferenceCatalog(input)).toEqual(
      expect.arrayContaining([
        expect.stringContaining("duplicate collection id"),
      ]),
    );
  });

  it("rejects malformed registry ids", () => {
    const input = structuredClone(validInput);
    input.areas = [{ ...validArea, id: "Invalid Id" }];

    expect(validateReferenceCatalog(input)).toEqual(
      expect.arrayContaining([expect.stringContaining("areas[0].id")]),
    );
  });

  it("rejects unknown registry fields", () => {
    const input = structuredClone(validInput);
    input.areas = [{ ...validArea, unexpected: true }];

    expect(validateReferenceCatalog(input)).toEqual(
      expect.arrayContaining([expect.stringContaining("areas[0].unexpected")]),
    );
  });

  it("rejects a non-English metadata language", () => {
    const input = structuredClone(validInput);
    input.records[0].value = {
      ...validRecord,
      language: "ko",
    };

    expect(validateReferenceCatalog(input)).toEqual(
      expect.arrayContaining([
        expect.stringContaining("developing-taste.json.language"),
      ]),
    );
  });

  it("rejects an invalid preview source URL", () => {
    const input = structuredClone(validInput);
    input.records[0].value = {
      ...validRecord,
      preview: {
        src: "/previews/developing-taste.webp",
        alt: "Developing Taste preview",
        source_url: "http://example.com",
        rights: "Used with permission.",
      },
    };

    expect(validateReferenceCatalog(input)).toEqual(
      expect.arrayContaining([
        expect.stringContaining("preview.source_url"),
      ]),
    );
  });
});
