import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DesignparserStudyDeck } from "@/components/designparser-study-deck";
import {
  buildHyperframesComposition,
  buildSlideshowManifest,
} from "@/studies/designparser/hyperframes";
import {
  getDesignparserStudy,
  getDesignparserStudyParams,
} from "@/studies/designparser/studies";

interface DesignparserStudyPageProps {
  params: Promise<{ lang: string; reelId: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getDesignparserStudyParams();
}

async function loadStudy({ params }: DesignparserStudyPageProps) {
  const { lang, reelId } = await params;
  const study = lang === "en" ? getDesignparserStudy(reelId) : undefined;

  if (!study) notFound();

  return study;
}

export async function generateMetadata(
  props: DesignparserStudyPageProps,
): Promise<Metadata> {
  const study = await loadStudy(props);

  return {
    title: study.title,
    description: study.summary,
    robots: { index: false, follow: false },
  };
}

export default async function DesignparserStudyPage(
  props: DesignparserStudyPageProps,
) {
  const study = await loadStudy(props);
  const composition = buildHyperframesComposition(study);
  const manifest = buildSlideshowManifest(study);

  return (
    <article className="shell page-lead study-detail">
      <Link className="study-back-link" href="/en/studies/designparser">
        Back to Designparser studies
      </Link>
      <header className="study-detail__header">
        <p className="eyebrow">Designparser study</p>
        <h1>{study.title}</h1>
        <p className="lede">{study.summary}</p>
        <dl className="study-metadata">
          <div>
            <dt>Source</dt>
            <dd>
              <a href={study.source.url}>{study.source.creator}</a>
            </dd>
          </div>
          <div>
            <dt>Published</dt>
            <dd>
              <time dateTime={study.source.publishedAt}>
                {study.source.publishedAt}
              </time>
            </dd>
          </div>
          <div>
            <dt>Reviewed</dt>
            <dd>
              <time dateTime={study.reviewedAt}>{study.reviewedAt}</time>
            </dd>
          </div>
        </dl>
      </header>

      <section className="study-section" aria-labelledby="study-evidence">
        <h2 id="study-evidence">Evidence</h2>
        <ul className="study-evidence-list">
          {study.evidence.map((evidence) => (
            <li
              className="study-evidence"
              key={`${evidence.start}-${evidence.end}`}
            >
              <span>{evidence.label}</span>
              <span>
                {evidence.start}s–{evidence.end}s
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="study-section" aria-labelledby="study-deck">
        <h2 id="study-deck">Study deck</h2>
        <DesignparserStudyDeck
          label={`${study.title} slides`}
          composition={composition}
          manifest={manifest}
        />
      </section>
    </article>
  );
}
