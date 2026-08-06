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
        "The complete index will make reviewed design-engineering resources easy to scan and evaluate.",
    },
    explore: {
      eyebrow: "Guided discovery",
      title: "Explore",
      description:
        "Areas and editorial collections will offer focused paths through the same canonical reference library.",
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
    references: "The first reviewed reference set is being prepared.",
    explore:
      "Areas and collections will appear with the first reviewed references.",
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
