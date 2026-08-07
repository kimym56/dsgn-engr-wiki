import Link from "next/link";
import { notFound } from "next/navigation";
import { isPublishedLocale, localePath } from "@/i18n/config";
import { loadDictionary } from "@/i18n/load-dictionary";

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;

  if (!isPublishedLocale(lang)) {
    notFound();
  }

  const dictionary = await loadDictionary(lang);
  const copy = dictionary.pages.home;

  return (
    <section className="shell page-lead page-lead--home">
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1>{copy.title}</h1>
      <p className="lede">{copy.description}</p>
      <div className="page-actions">
        <Link
          className="button button--primary"
          href={localePath(lang, "references")}
        >
          {dictionary.homeActions.references}
        </Link>
        <Link className="button" href={localePath(lang, "explore")}>
          {dictionary.homeActions.explore}
        </Link>
      </div>
    </section>
  );
}
