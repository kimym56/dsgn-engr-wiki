"use client";

import { useEffect, useRef } from "react";

interface DesignparserStudyDeckProps {
  label: string;
  composition: string;
  manifest: string;
}

export function DesignparserStudyDeck({
  label,
  composition,
  manifest,
}: DesignparserStudyDeckProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    let cancelled = false;

    if (!host) return;

    void Promise.all([
      import("@hyperframes/player"),
      import("@hyperframes/player/slideshow"),
    ]).then(() => {
      if (cancelled) return;

      const slideshow = document.createElement("hyperframes-slideshow");
      slideshow.tabIndex = 0;
      slideshow.setAttribute("aria-label", label);

      const player = document.createElement("hyperframes-player");
      player.setAttribute("interactive", "");
      player.setAttribute("width", "1920");
      player.setAttribute("height", "1080");
      player.setAttribute("srcdoc", composition);

      const script = document.createElement("script");
      script.type = "application/hyperframes-slideshow+json";
      script.textContent = manifest;

      slideshow.append(player, script);
      host.replaceChildren(slideshow);
    });

    return () => {
      cancelled = true;
      host.replaceChildren();
    };
  }, [composition, label, manifest]);

  return <div ref={hostRef} className="study-deck" />;
}
