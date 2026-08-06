import { notFound } from "next/navigation";
import { isPublishedLocale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

const dictionaries = {
  en: async () =>
    import("@/i18n/dictionaries/en").then((module) => module.englishDictionary),
} satisfies Record<"en", () => Promise<Dictionary>>;

export async function loadDictionary(locale: string): Promise<Dictionary> {
  if (!isPublishedLocale(locale)) {
    notFound();
  }

  return dictionaries[locale]();
}
