import { describe, expect, it } from "vitest";
import {
  DEFAULT_LOCALE,
  KNOWN_LOCALES,
  PUBLISHED_LOCALES,
  isKnownLocale,
  isPublishedLocale,
  localePath,
} from "@/i18n/config";

describe("locale configuration", () => {
  it("publishes English while reserving Korean", () => {
    expect(DEFAULT_LOCALE).toBe("en");
    expect(PUBLISHED_LOCALES).toEqual(["en"]);
    expect(KNOWN_LOCALES).toEqual(["en", "ko"]);
    expect(isKnownLocale("ko")).toBe(true);
    expect(isPublishedLocale("ko")).toBe(false);
    expect(isKnownLocale("kr")).toBe(false);
  });

  it("builds locale-prefixed application paths", () => {
    expect(localePath("en")).toBe("/en");
    expect(localePath("en", "explore")).toBe("/en/explore");
    expect(localePath("en", "references")).toBe("/en/references");
    expect(localePath("en", "about")).toBe("/en/about");
  });
});
