import type { Metadata } from "next";
import { loadDictionary } from "@/i18n/load-dictionary";

export const metadata: Metadata = { title: "About" };

interface AboutPageProps {
  params: Promise<{ lang: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  const dictionary = await loadDictionary(lang);
  const copy = dictionary.pages.about;

  return (
    <div className="shell page-lead">
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1>{copy.title}</h1>
      <p className="lede">{copy.description}</p>
      <section className="principles" aria-labelledby="library-process">
        <h2 id="library-process">{dictionary.about.heading}</h2>
        <ul>
          {dictionary.about.statements.map((statement) => (
            <li key={statement}>{statement}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
