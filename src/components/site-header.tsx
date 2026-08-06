import Link from "next/link";
import type { PublishedLocale, RouteSegment } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import type { Dictionary, PageKey } from "@/i18n/dictionaries/types";

const navigationItems: readonly {
  key: PageKey;
  segment?: RouteSegment;
}[] = [
  { key: "home" },
  { key: "explore", segment: "explore" },
  { key: "references", segment: "references" },
  { key: "about", segment: "about" },
];

interface SiteHeaderProps {
  locale: PublishedLocale;
  navigationLabel: string;
  labels: Dictionary["navigation"];
}

export function SiteHeader({
  locale,
  navigationLabel,
  labels,
}: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link className="wordmark" href={localePath(locale)}>
          DSGN/ENGR
        </Link>
        <nav aria-label={navigationLabel}>
          <ul className="site-navigation">
            {navigationItems.map(({ key, segment }) => (
              <li key={key}>
                <Link href={localePath(locale, segment)}>{labels[key]}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
