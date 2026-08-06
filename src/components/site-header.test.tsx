import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/site-header";

const labels = {
  home: "Home",
  explore: "Explore",
  references: "References",
  about: "About",
};

describe("SiteHeader", () => {
  it("renders the four stable English navigation destinations", () => {
    render(
      <SiteHeader
        locale="en"
        navigationLabel="Primary navigation"
        labels={labels}
      />,
    );

    const navigation = screen.getByRole("navigation", {
      name: "Primary navigation",
    });
    const links = within(navigation).getAllByRole("link");

    expect(links).toHaveLength(4);
    expect(links.map((link) => link.textContent)).toEqual([
      "Home",
      "Explore",
      "References",
      "About",
    ]);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/en",
    );
    expect(screen.getByRole("link", { name: "Explore" })).toHaveAttribute(
      "href",
      "/en/explore",
    );
    expect(screen.getByRole("link", { name: "References" })).toHaveAttribute(
      "href",
      "/en/references",
    );
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/en/about",
    );
  });
});
