import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { designparserStudies } from "@/studies/designparser/studies";

export const metadata: Metadata = {
  title: "Designparser studies",
  description:
    "Reviewed design and engineering studies from Designparser reels.",
  robots: { index: false, follow: false },
};

interface DesignparserStudiesPageProps {
  params: Promise<{ lang: string }>;
}

export default async function DesignparserStudiesPage({
  params,
}: DesignparserStudiesPageProps) {
  const { lang } = await params;

  if (lang !== "en") notFound();

  return (
    <section className="shell page-lead study-index">
      <p className="eyebrow">Unlisted collection</p>
      <h1>Designparser studies</h1>
      <p className="lede">
        Reviewed design and engineering ideas translated into focused slide
        studies.
      </p>
      {designparserStudies.length === 0 ? (
        <p className="empty-state">No reviewed studies are available.</p>
      ) : (
        <ul className="study-card-list">
          {designparserStudies.map((study) => (
            <li className="study-card" key={study.id}>
              <p className="study-card__meta">
                {study.source.creator} · {study.source.publishedAt}
              </p>
              <h2>
                <Link href={`/en/studies/designparser/${study.id}`}>
                  {study.title}
                </Link>
              </h2>
              <p>{study.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
