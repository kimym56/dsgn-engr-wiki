import { describe, expect, it } from "vitest";
import {
  loadReferenceCatalog,
  selectVisibleReferences,
} from "./reference-store";

describe("reference content", () => {
  it("loads the published English foundation set", async () => {
    const catalog = await loadReferenceCatalog();

    expect(catalog.areas).toHaveLength(8);
    expect(catalog.collections).toEqual([]);
    expect(catalog.records).toHaveLength(9);
    expect(catalog.records.every(({ status }) => status === "published")).toBe(
      true,
    );
    expect(
      catalog.records.filter(({ status }) => status === "review"),
    ).toHaveLength(0);
    expect(selectVisibleReferences(catalog.records)).toHaveLength(9);
  });
});
