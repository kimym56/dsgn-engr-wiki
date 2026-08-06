import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PUBLISHED_LOCALES, isPublishedLocale } from "@/i18n/config";
import { loadDictionary } from "@/i18n/load-dictionary";
import "../globals.css";

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

interface LocaleRouteProps {
  params: Promise<{ lang: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return PUBLISHED_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LocaleRouteProps): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await loadDictionary(lang);

  return {
    title: {
      default: dictionary.brand.name,
      template: `%s — ${dictionary.brand.name}`,
    },
    description: dictionary.brand.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { lang } = await params;

  if (!isPublishedLocale(lang)) {
    notFound();
  }

  const dictionary = await loadDictionary(lang);

  return (
    <html lang={lang}>
      <body>
        <a className="skip-link" href="#main-content">
          {dictionary.accessibility.skipToContent}
        </a>
        <SiteHeader
          locale={lang}
          labels={dictionary.navigation}
          navigationLabel={dictionary.accessibility.primaryNavigation}
        />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter description={dictionary.brand.description} />
      </body>
    </html>
  );
}
