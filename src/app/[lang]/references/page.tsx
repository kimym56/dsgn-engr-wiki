import type { Metadata } from "next";
import { loadDictionary } from "@/i18n/load-dictionary";

export const metadata: Metadata = { title: "References" };

interface ReferencesPageProps {
  params: Promise<{ lang: string }>;
}

export default async function ReferencesPage({ params }: ReferencesPageProps) {
  const { lang } = await params;
  const dictionary = await loadDictionary(lang);
  const copy = dictionary.pages.references;

  return (
    <section className="shell page-lead">
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1>{copy.title}</h1>
      <p className="lede">{copy.description}</p>
      <p className="empty-state">{dictionary.emptyState.references}</p>
    </section>
  );
}
