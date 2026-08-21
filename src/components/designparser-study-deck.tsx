"use client";

import { useEffect, useRef } from "react";

interface DesignparserStudyDeckProps {
  label: string;
  composition: string;
  manifest: string;
  replaySceneMotion?: boolean;
}

const MOTION_SCENE_SECONDS = 6;
const MOTION_STOP_OFFSET = 2.9;

interface MotionPlayerElement extends HTMLElement {
  currentTime: number;
  readonly paused: boolean;
  seek(time: number): void;
  play(): void;
  pause(): void;
}

export function DesignparserStudyDeck({
  label,
  composition,
  manifest,
  replaySceneMotion = false,
}: DesignparserStudyDeckProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    let cancelled = false;
    let teardownMotion: (() => void) | undefined;

    if (!host) return;

    void Promise.all([
      import("@hyperframes/player"),
      import("@hyperframes/player/slideshow"),
    ]).then(() => {
      if (cancelled) return;

      const slideshow = document.createElement("hyperframes-slideshow");
      slideshow.tabIndex = 0;
      slideshow.setAttribute("aria-label", label);

      const player = document.createElement(
        "hyperframes-player",
      ) as unknown as MotionPlayerElement;
      player.setAttribute("interactive", "");
      player.setAttribute("width", "1920");
      player.setAttribute("height", "1080");
      player.setAttribute("srcdoc", composition);

      const script = document.createElement("script");
      script.type = "application/hyperframes-slideshow+json";
      script.textContent = manifest;

      slideshow.append(player, script);
      host.replaceChildren(slideshow);

      if (!replaySceneMotion) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Motion pilot driver: the slideshow controller lands each navigation at
      // a scene's rest frame with the player paused, which hides scene-start
      // tweens. The deck stays behind an opacity curtain from the navigation
      // input until each scene's opening has been rewound, so arrival never
      // flashes the settled frame before the build replays and pauses before
      // the scene boundary — motion stays within the visited slide.
      let replaying = false;
      let stopAt = 0;
      let lastScene = -1;

      const curtain = (hidden: boolean) => {
        slideshow.style.transition = hidden ? "none" : "opacity 220ms ease-out";
        slideshow.style.opacity = hidden ? "0" : "1";
      };

      const revealFallback = window.setTimeout(() => curtain(false), 4000);

      const hideForNavigation = (event: Event) => {
        if (event instanceof KeyboardEvent) {
          if (
            event.key === "ArrowRight" ||
            event.key === "ArrowLeft" ||
            event.key === " " ||
            event.key === "Backspace"
          ) {
            curtain(true);
          }
          return;
        }
        const name = (event.target as Element | null)
          ?.closest("button")
          ?.getAttribute("aria-label");
        if (name === "Next slide" || name === "Previous slide") {
          curtain(true);
        }
      };

      const onTimeUpdate = () => {
        const time = player.currentTime;
        if (replaying) {
          if (time >= stopAt - 0.05) {
            replaying = false;
            player.pause();
            // Only reveal when still on the replayed scene; a navigation that
            // landed mid-replay keeps the curtain until its own build starts.
            if (Math.floor(time / MOTION_SCENE_SECONDS) === lastScene) {
              curtain(false);
            }
          }
          return;
        }
        if (!player.paused) return;
        const scene = Math.floor(time / MOTION_SCENE_SECONDS);
        const start = scene * MOTION_SCENE_SECONDS;
        const restFrame = start + MOTION_SCENE_SECONDS / 2;
        if (scene !== lastScene && Math.abs(time - restFrame) <= 0.75) {
          lastScene = scene;
          replaying = true;
          stopAt = start + MOTION_STOP_OFFSET;
          player.seek(start);
          window.requestAnimationFrame(() => {
            player.play();
            curtain(false);
          });
        }
      };

      curtain(true);
      slideshow.addEventListener("click", hideForNavigation, true);
      window.addEventListener("keydown", hideForNavigation, true);
      player.addEventListener("timeupdate", onTimeUpdate);

      teardownMotion = () => {
        window.clearTimeout(revealFallback);
        slideshow.removeEventListener("click", hideForNavigation, true);
        window.removeEventListener("keydown", hideForNavigation, true);
        player.removeEventListener("timeupdate", onTimeUpdate);
      };
    });

    return () => {
      cancelled = true;
      teardownMotion?.();
      host.replaceChildren();
    };
  }, [composition, label, manifest, replaySceneMotion]);

  return <div ref={hostRef} className="study-deck" />;
}
