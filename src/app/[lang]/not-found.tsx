import Link from "next/link";
import { englishDictionary } from "@/i18n/dictionaries/en";

export default function NotFound() {
  const copy = englishDictionary.notFound;

  return (
    <section className="shell page-lead">
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1>{copy.title}</h1>
      <p className="lede">{copy.description}</p>
      <Link className="button button--primary" href="/en">
        {copy.action}
      </Link>
    </section>
  );
}
