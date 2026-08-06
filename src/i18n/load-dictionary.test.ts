import { describe, expect, it } from "vitest";
import { loadDictionary } from "@/i18n/load-dictionary";

describe("loadDictionary", () => {
  it("loads the published English dictionary", async () => {
    const dictionary = await loadDictionary("en");

    expect(dictionary.navigation).toEqual({
      home: "Home",
      explore: "Explore",
      references: "References",
      about: "About",
    });
  });

  it("rejects an unpublished locale", async () => {
    await expect(loadDictionary("ko")).rejects.toMatchObject({
      digest: "NEXT_HTTP_ERROR_FALLBACK;404",
    });
  });
});
