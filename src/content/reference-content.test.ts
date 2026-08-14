import { describe, expect, it } from "vitest";
import { loadReferenceCatalog } from "./reference-store";

describe("reference content", () => {
  it("loads the approved English foundation set in review", async () => {
    const catalog = await loadReferenceCatalog();

    expect(catalog.areas).toHaveLength(8);
    expect(catalog.collections).toEqual([]);
    expect(catalog.records).toHaveLength(9);
    expect(new Set(catalog.records.map(({ status }) => status))).toEqual(
      new Set(["review"]),
    );
  });
});
