export type PageKey = "home" | "explore" | "references" | "about";

export interface PageCopy {
  eyebrow: string;
  title: string;
  description: string;
}

export interface Dictionary {
  brand: {
    name: string;
    description: string;
  };
  navigation: Record<PageKey, string>;
  accessibility: {
    primaryNavigation: string;
    skipToContent: string;
  };
  pages: Record<PageKey, PageCopy>;
  homeActions: {
    references: string;
    explore: string;
  };
  emptyState: {
    references: string;
    explore: string;
  };
  about: {
    heading: string;
    statements: readonly string[];
  };
  notFound: {
    eyebrow: string;
    title: string;
    description: string;
    action: string;
  };
}
