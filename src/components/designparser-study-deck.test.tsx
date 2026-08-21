import { render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DesignparserStudyDeck } from "./designparser-study-deck";

vi.mock("@hyperframes/player", () => ({}));
vi.mock("@hyperframes/player/slideshow", () => ({}));

describe("DesignparserStudyDeck", () => {
  it("mounts the accessible player DOM and removes it during cleanup", async () => {
    const composition = "<!doctype html><title>Exact composition</title>";
    const manifest = '{"slides":[{"sceneId":"exact-slide"}]}';
    const { container, unmount } = render(
      <DesignparserStudyDeck
        label="Alignment study slides"
        composition={composition}
        manifest={manifest}
      />,
    );
    const host = container.firstElementChild;

    expect(host).not.toBeNull();

    await waitFor(() => {
      expect(host?.querySelector("hyperframes-slideshow")).not.toBeNull();
    });

    const slideshow = host?.querySelector("hyperframes-slideshow");
    const player = slideshow?.querySelector("hyperframes-player");
    const script = slideshow?.querySelector(
      'script[type="application/hyperframes-slideshow+json"]',
    );

    expect(slideshow).toHaveAttribute("tabindex", "0");
    expect(slideshow).toHaveAttribute("aria-label", "Alignment study slides");
    expect(player).toHaveAttribute("interactive");
    expect(player).toHaveAttribute("width", "1920");
    expect(player).toHaveAttribute("height", "1080");
    expect(player).toHaveAttribute("srcdoc", composition);
    expect(script?.textContent).toBe(manifest);

    unmount();

    expect(host).toBeEmptyDOMElement();
  });
});
