import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import DesignparserStudiesPage, { metadata as indexMetadata } from "./page";
import DesignparserStudyPage, {
  dynamicParams,
  generateMetadata,
  generateStaticParams,
} from "./[reelId]/page";
import {
  buildHyperframesComposition,
  buildSlideshowManifest,
} from "@/studies/designparser/hyperframes";
import type { DesignparserStudy } from "@/studies/designparser/model";

const studyState = vi.hoisted(() => ({
  studies: [] as DesignparserStudy[],
}));
const notFoundMock = vi.hoisted(() =>
  vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
);

vi.mock("@/studies/designparser/studies", () => ({
  get designparserStudies() {
    return studyState.studies;
  },
  getDesignparserStudy: (id: string) =>
    studyState.studies.find((study) => study.id === id),
  getDesignparserStudyParams: () =>
    studyState.studies.map(({ id }) => ({ reelId: id })),
}));
vi.mock("next/navigation", () => ({ notFound: notFoundMock }));
vi.mock("@hyperframes/player", () => ({}));
vi.mock("@hyperframes/player/slideshow", () => ({}));

const syntheticStudy: DesignparserStudy = {
  id: "C-example_1",
  locale: "en",
  source: {
    url: "https://www.instagram.com/reel/C-example_1/",
    creator: "@designparser",
    publishedAt: "2026-08-01",
  },
  processedAt: "2026-08-12",
  reviewedAt: "2026-08-12",
  status: "reviewed",
  title: "Separate alignment from distribution",
  summary: "A study of choosing one layout responsibility at a time.",
  principles: ["Use one mechanism for each spatial responsibility."],
  applications: ["Separate group placement from spacing within the group."],
  uncertainties: [],
  evidence: [{ label: "Main explanation", start: 2.5, end: 12.25 }],
  slides: [
    {
      kind: "source",
      eyebrow: "Designparser study",
      title: "Alignment has two jobs",
      body: "Treat placement and internal spacing as separate decisions.",
      visual: { type: "rule", statement: "One mechanism, one responsibility" },
    },
    {
      kind: "problem",
      eyebrow: "Problem",
      title: "One rule is asked to do too much",
      body: "Mixed responsibilities make responsive behavior hard to predict.",
      visual: { type: "comparison", before: "Mixed", after: "Separated" },
    },
    {
      kind: "principle",
      eyebrow: "Principle",
      title: "Separate the decisions",
      body: "Place the group first, then distribute its children.",
      visual: { type: "sequence", items: ["Place", "Distribute", "Verify"] },
    },
    {
      kind: "takeaway",
      eyebrow: "Takeaway",
      title: "Clear ownership creates stable layouts",
      body: "Each layout primitive should answer one spatial question.",
      visual: { type: "layers", items: ["Container", "Group", "Item"] },
    },
  ],
};

const englishIndexParams = Promise.resolve({ lang: "en" });
const englishDetailParams = Promise.resolve({
  lang: "en",
  reelId: syntheticStudy.id,
});

beforeEach(() => {
  studyState.studies = [];
  notFoundMock.mockClear();
});

afterEach(cleanup);

describe("Designparser studies index", () => {
  it("states when no reviewed studies are available", async () => {
    render(await DesignparserStudiesPage({ params: englishIndexParams }));

    expect(
      screen.getByRole("heading", { level: 1, name: "Designparser studies" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("No reviewed studies are available."),
    ).toBeInTheDocument();
  });

  it("links only the reviewed Designparser collection", async () => {
    studyState.studies = [syntheticStudy];

    render(await DesignparserStudiesPage({ params: englishIndexParams }));

    expect(
      screen.getByRole("link", { name: syntheticStudy.title }),
    ).toHaveAttribute("href", `/en/studies/designparser/${syntheticStudy.id}`);
    expect(screen.getByText(syntheticStudy.summary)).toBeInTheDocument();
    expect(screen.queryByText("No reviewed studies are available.")).toBeNull();
  });

  it("rejects non-English index routes", async () => {
    await expect(
      DesignparserStudiesPage({ params: Promise.resolve({ lang: "ko" }) }),
    ).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFoundMock).toHaveBeenCalledOnce();
  });

  it("keeps the index out of search results", () => {
    expect(indexMetadata.robots).toEqual({ index: false, follow: false });
  });
});

describe("Designparser study detail", () => {
  it("renders reviewed source context, evidence ranges, and generated deck strings", async () => {
    studyState.studies = [syntheticStudy];

    const { container } = render(
      await DesignparserStudyPage({ params: englishDetailParams }),
    );

    expect(
      screen.getByRole("heading", { level: 1, name: syntheticStudy.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(syntheticStudy.summary)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: syntheticStudy.source.creator }),
    ).toHaveAttribute("href", syntheticStudy.source.url);
    expect(screen.getByText("2.5s–12.25s")).toBeInTheDocument();
    expect(
      screen.queryByText(syntheticStudy.slides[0].body),
    ).not.toBeInTheDocument();

    await waitFor(() => {
      expect(container.querySelector("hyperframes-player")).not.toBeNull();
    });

    expect(container.querySelector("hyperframes-player")).toHaveAttribute(
      "srcdoc",
      buildHyperframesComposition(syntheticStudy),
    );
    expect(
      container.querySelector(
        'script[type="application/hyperframes-slideshow+json"]',
      )?.textContent,
    ).toBe(buildSlideshowManifest(syntheticStudy));
  });

  it("returns only reviewed IDs as static params and disables other IDs", () => {
    studyState.studies = [syntheticStudy];

    expect(generateStaticParams()).toEqual([{ reelId: syntheticStudy.id }]);
    expect(dynamicParams).toBe(false);
  });

  it("rejects unknown and non-English detail routes", async () => {
    studyState.studies = [syntheticStudy];

    await expect(
      DesignparserStudyPage({
        params: Promise.resolve({ lang: "en", reelId: "unknown" }),
      }),
    ).rejects.toThrow("NEXT_NOT_FOUND");
    await expect(
      DesignparserStudyPage({
        params: Promise.resolve({ lang: "ko", reelId: syntheticStudy.id }),
      }),
    ).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFoundMock).toHaveBeenCalledTimes(2);
  });

  it("generates descriptive noindex metadata for a reviewed study", async () => {
    studyState.studies = [syntheticStudy];

    await expect(
      generateMetadata({ params: englishDetailParams }),
    ).resolves.toEqual({
      title: syntheticStudy.title,
      description: syntheticStudy.summary,
      robots: { index: false, follow: false },
    });
  });
});
