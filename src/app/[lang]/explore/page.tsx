import type { Metadata } from "next";
import Link from "next/link";
import { loadDictionary } from "@/i18n/load-dictionary";

export const metadata: Metadata = { title: "Explore" };

interface ExplorePageProps {
  params: Promise<{ lang: string }>;
}

export default async function ExplorePage({ params }: ExplorePageProps) {
  const { lang } = await params;
  const dictionary = await loadDictionary(lang);
  const copy = dictionary.pages.explore;

  return (
    <section className="shell page-lead">
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1>{copy.title}</h1>
      <p className="lede">{copy.description}</p>
      <div className="empty-state">
        <p>{dictionary.emptyState.explore}</p>
        <Link className="button" href={`/${lang}/references`}>
          {dictionary.homeActions.references}
        </Link>
      </div>
    </section>
  );
}
