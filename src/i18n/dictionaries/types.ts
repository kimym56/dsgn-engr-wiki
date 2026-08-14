import type { ReferenceFormat } from "@/content/reference-schema";

export type PageKey = "home" | "explore" | "references" | "about";

export interface PageCopy {
  eyebrow: string;
  title: string;
  description: string;
}

export interface ReferencesCopy {
  count: (count: number) => string;
  areaFilter: string;
  formatFilter: string;
  allAreas: string;
  allFormats: string;
  applyFilters: string;
  clearFilters: string;
  noResults: string;
  previewBanner: string;
  neutralPreview: string;
  relevance: string;
  sourceLanguage: string;
  reviewed: string;
  visitSource: string;
  formats: Record<ReferenceFormat, string>;
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
    explore: string;
  };
  references: ReferencesCopy;
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
