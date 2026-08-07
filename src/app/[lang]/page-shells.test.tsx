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

  it("keeps References honest before records are published", async () => {
    render(await ReferencesPage({ params: englishParams }));

    expect(
      screen.getByRole("heading", { level: 1, name: "References" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("The first reviewed reference set is being prepared."),
    ).toBeInTheDocument();
  });

  it("keeps Explore honest before areas and collections are published", async () => {
    render(await ExplorePage({ params: englishParams }));

    expect(
      screen.getByRole("heading", { level: 1, name: "Explore" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Areas and collections will appear with the first reviewed references.",
      ),
    ).toBeInTheDocument();
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
