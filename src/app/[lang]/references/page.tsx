import type { Metadata } from "next";
import { ReferenceIndex } from "@/components/reference-index";
import {
  filterReferences,
  parseReferenceFilters,
} from "@/content/reference-filters";
import {
  loadReferenceCatalog,
  selectVisibleReferences,
} from "@/content/reference-store";
import { loadDictionary } from "@/i18n/load-dictionary";

export const metadata: Metadata = { title: "References" };

interface ReferencesPageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ReferencesPage({
  params,
  searchParams,
}: ReferencesPageProps) {
  const [{ lang }, query, catalog] = await Promise.all([
    params,
    searchParams,
    loadReferenceCatalog(),
  ]);
  const dictionary = await loadDictionary(lang);
  const isReviewPreview =
    process.env.NODE_ENV === "development" &&
    firstValue(query.preview) === "review";
  const visible = selectVisibleReferences(catalog.records, {
    includeReview: isReviewPreview,
  });
  const filters = parseReferenceFilters(query, catalog);
  const records = filterReferences(visible, filters);

  return (
    <section className="shell page-lead">
      <p className="eyebrow">{dictionary.pages.references.eyebrow}</p>
      <h1>{dictionary.pages.references.title}</h1>
      <p className="lede">{dictionary.pages.references.description}</p>
      <ReferenceIndex
        areas={catalog.areas}
        dictionary={dictionary.references}
        filters={filters}
        isReviewPreview={isReviewPreview}
        lang={lang}
        records={records}
      />
    </section>
  );
}
