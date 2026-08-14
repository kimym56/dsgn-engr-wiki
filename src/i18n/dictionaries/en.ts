import type { Dictionary } from "@/i18n/dictionaries/types";

export const englishDictionary = {
  brand: {
    name: "DSGN ENGR Wiki",
    description: "A curated library of design-engineering references.",
  },
  navigation: {
    home: "Home",
    explore: "Explore",
    references: "References",
    about: "About",
  },
  accessibility: {
    primaryNavigation: "Primary navigation",
    skipToContent: "Skip to content",
  },
  pages: {
    home: {
      eyebrow: "Design engineering, carefully sourced",
      title: "Useful references from across design and engineering.",
      description:
        "DSGN ENGR Wiki adds concise editorial context to trusted resources, then sends you to the original publisher.",
    },
    references: {
      eyebrow: "Complete library",
      title: "References",
      description:
        "Reviewed design-engineering resources with original summaries and direct links to their canonical sources.",
    },
    explore: {
      eyebrow: "Guided discovery",
      title: "Explore",
      description:
        "Start with the complete reviewed reference index while dedicated discovery paths are being prepared.",
    },
    about: {
      eyebrow: "Project scope",
      title: "About DSGN ENGR Wiki",
      description:
        "This project helps designers, frontend developers, and design engineers find reliable material without copying the source.",
    },
  },
  homeActions: {
    references: "Browse references",
    explore: "Explore the library",
  },
  emptyState: {
    explore: "Browse the complete reviewed reference index.",
  },
  references: {
    count: (count) => `${count} reference${count === 1 ? "" : "s"}`,
    areaFilter: "Area",
    formatFilter: "Format",
    allAreas: "All areas",
    allFormats: "All formats",
    applyFilters: "Apply filters",
    clearFilters: "Clear filters",
    noResults: "No reviewed references match these filters.",
    previewBanner:
      "Editorial preview: review records are visible in this development build.",
    neutralPreview: "Project-reviewed reference",
    relevance: "Why it matters",
    sourceLanguage: "Source language",
    reviewed: "Reviewed",
    visitSource: "Visit original source",
    formats: {
      article: "Article",
      documentation: "Documentation",
      tool: "Tool",
      "case-study": "Case study",
    },
  },
  about: {
    heading: "How the library works",
    statements: [
      "Every published reference points to its canonical external source.",
      "Project-owned summaries explain why a resource may be useful.",
      "Selection favors reviewed quality and clear attribution over volume.",
    ],
  },
  notFound: {
    eyebrow: "404",
    title: "Page not found",
    description:
      "This page does not exist or is not published in this language.",
    action: "Return home",
  },
} satisfies Dictionary;
