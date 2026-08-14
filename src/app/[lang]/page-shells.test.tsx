import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage from "@/app/[lang]/about/page";
import ExplorePage from "@/app/[lang]/explore/page";
import HomePage from "@/app/[lang]/page";
import ReferencesPage from "@/app/[lang]/references/page";

const englishParams = Promise.resolve({ lang: "en" });

describe("English Phase 1 page shells", () => {
  it("introduces the library and links to its two discovery routes", async () => {
    render(await HomePage({ params: englishParams }));

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Useful references from across design and engineering.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Browse references" }),
    ).toHaveAttribute("href", "/en/references");
    expect(
      screen.getByRole("link", { name: "Explore the library" }),
    ).toHaveAttribute("href", "/en/explore");
  });

  it("keeps review records hidden outside development preview mode", async () => {
    render(
      await ReferencesPage({
        params: englishParams,
        searchParams: Promise.resolve({ preview: "review" }),
      }),
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "References" }),
    ).toBeInTheDocument();
    expect(screen.getByText("0 references")).toHaveAttribute(
      "aria-live",
      "polite",
    );
    expect(screen.queryByText("Developing Taste")).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        "Editorial preview: review records are visible in this development build.",
      ),
    ).not.toBeInTheDocument();
  });

  it("directs Explore readers to the complete References index", async () => {
    render(await ExplorePage({ params: englishParams }));

    expect(
      screen.getByRole("heading", { level: 1, name: "Explore" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Browse the complete reviewed reference index."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Browse references" }),
    ).toHaveAttribute("href", "/en/references");
  });

  it("explains the library's editorial principles", async () => {
    render(await AboutPage({ params: englishParams }));

    expect(
      screen.getByRole("heading", { level: 1, name: "About DSGN ENGR Wiki" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "How the library works" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });
});
