import type { Metadata } from "next";
import Link from "next/link";
import { englishDictionary } from "@/i18n/dictionaries/en";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page not found — DSGN ENGR Wiki",
  description: englishDictionary.notFound.description,
};

export default function GlobalNotFound() {
  const copy = englishDictionary.notFound;

  return (
    <html lang="en">
      <body>
        <main id="main-content">
          <section className="shell page-lead">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p className="lede">{copy.description}</p>
            <Link className="button button--primary" href="/en">
              {copy.action}
            </Link>
          </section>
        </main>
      </body>
    </html>
  );
}
