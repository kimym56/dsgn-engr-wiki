import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type {
  ReferenceArea,
  ReferenceFormat,
  ReferenceRecord,
} from "@/content/reference-schema";
import { ReferenceIndex } from "./reference-index";

const areas: ReferenceArea[] = [
  {
    id: "interface-implementation",
    label: "Interface Implementation",
    description: "Building useful interfaces.",
  },
  {
    id: "accessibility-and-inclusive-design",
    label: "Accessibility and Inclusive Design",
    description: "Making interfaces usable.",
  },
];

const dictionary = {
  count: (count: number) =>
    count === 1 ? "1 reference" : `${count} references`,
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
  } satisfies Record<ReferenceFormat, string>,
};

function record(overrides: Partial<ReferenceRecord> = {}): ReferenceRecord {
  return {
    id: "interface-article",
    title: "Interface Article",
    url: "https://example.com/interface-article",
    publisher: "Example Publisher",
    author: "Ava Example",
    summary: "A concise project-owned summary.",
    relevance: "It shows why the resource matters.",
    format: "article",
    areas: ["interface-implementation"],
    collections: [],
    source_language: "en",
    published: "2026-08-01",
    added: "2026-08-14",
    reviewed: "2026-08-14",
    status: "published",
    preview: null,
    language: "en",
    translation_of: null,
    ...overrides,
  };
}

describe("ReferenceIndex", () => {
  it("renders complete reference-card information with canonical source links", () => {
    render(
      <ReferenceIndex
        lang="en"
        records={[record()]}
        areas={areas}
        filters={{ area: null, format: null, hasInvalidValue: false }}
        isReviewPreview={false}
        dictionary={dictionary}
      />,
    );

    expect(screen.getByText("1 reference")).toHaveAttribute(
      "aria-live",
      "polite",
    );
    expect(
      screen.getByText("Article", { selector: ".reference-card__format" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Example Publisher")).toBeInTheDocument();
    expect(screen.getByText("Ava Example")).toBeInTheDocument();
    expect(
      screen.getByText("A concise project-owned summary."),
    ).toBeInTheDocument();
    expect(screen.getByText("Why it matters")).toBeInTheDocument();
    expect(
      screen.getByText("It shows why the resource matters."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Interface Implementation", {
        selector: ".reference-card__areas li",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Source language")).toBeInTheDocument();
    expect(screen.getByText("en")).toBeInTheDocument();
    expect(screen.getByText("Reviewed")).toBeInTheDocument();
    expect(screen.getByText("2026-08-14")).toHaveAttribute(
      "datetime",
      "2026-08-14",
    );
    expect(screen.getByText("Project-reviewed reference")).toBeInTheDocument();

    const titleLink = screen.getByRole("link", { name: "Interface Article" });
    const sourceLink = screen.getByRole("link", {
      name: "Visit original source",
    });
    expect(titleLink).toHaveAttribute(
      "href",
      "https://example.com/interface-article",
    );
    expect(sourceLink).toHaveAttribute(
      "href",
      "https://example.com/interface-article",
    );
    expect(titleLink).not.toHaveAttribute("target", "_blank");
    expect(sourceLink).not.toHaveAttribute("target", "_blank");
  });

  it("omits empty optional author and published-date labels", () => {
    render(
      <ReferenceIndex
        lang="en"
        records={[record({ author: null, published: null })]}
        areas={areas}
        filters={{ area: null, format: null, hasInvalidValue: false }}
        isReviewPreview={false}
        dictionary={dictionary}
      />,
    );

    expect(screen.queryByText("Author")).not.toBeInTheDocument();
    expect(screen.queryByText("Published")).not.toBeInTheDocument();
  });

  it("renders an accessible GET filter form retaining valid values", () => {
    render(
      <ReferenceIndex
        lang="en"
        records={[record()]}
        areas={areas}
        filters={{
          area: "interface-implementation",
          format: "article",
          hasInvalidValue: false,
        }}
        isReviewPreview={false}
        dictionary={dictionary}
      />,
    );

    expect(screen.getByRole("form", { name: "Apply filters" })).toHaveAttribute(
      "method",
      "get",
    );
    expect(screen.getByLabelText("Area")).toHaveValue(
      "interface-implementation",
    );
    expect(screen.getByLabelText("Format")).toHaveValue("article");
    expect(screen.getByRole("link", { name: "Clear filters" })).toHaveAttribute(
      "href",
      "/en/references",
    );
  });

  it("shows an editorial banner for review previews", () => {
    render(
      <ReferenceIndex
        lang="en"
        records={[record({ status: "review" })]}
        areas={areas}
        filters={{ area: null, format: null, hasInvalidValue: false }}
        isReviewPreview
        dictionary={dictionary}
      />,
    );

    expect(
      screen.getByText(
        "Editorial preview: review records are visible in this development build.",
      ),
    ).toBeVisible();
  });

  it("preserves review preview through filter submission only in preview mode", () => {
    const props = {
      lang: "en",
      records: [record({ status: "review" as const })],
      areas,
      filters: { area: null, format: null, hasInvalidValue: false },
      dictionary,
    };
    const { rerender } = render(<ReferenceIndex {...props} isReviewPreview />);
    const form = screen.getByRole("form", { name: "Apply filters" });
    const previewInput = form.querySelector('input[name="preview"]');

    expect(previewInput).toBeInstanceOf(HTMLInputElement);
    expect(previewInput).toHaveAttribute("type", "hidden");
    expect(previewInput).toHaveValue("review");

    rerender(<ReferenceIndex {...props} isReviewPreview={false} />);

    expect(
      screen
        .getByRole("form", { name: "Apply filters" })
        .querySelector('input[name="preview"]'),
    ).toBeNull();
  });

  it("shows a clear action for valid filters with zero results", () => {
    render(
      <ReferenceIndex
        lang="en"
        records={[]}
        areas={areas}
        filters={{
          area: "accessibility-and-inclusive-design",
          format: "documentation",
          hasInvalidValue: false,
        }}
        isReviewPreview={false}
        dictionary={dictionary}
      />,
    );

    expect(
      screen.getByText("No reviewed references match these filters."),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Clear filters" })).toHaveAttribute(
      "href",
      "/en/references",
    );
  });
});
