import type { DesignparserStudy, StudySlide } from "./model";

const SCENE_SECONDS = 6;

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character]!,
  );
}

function jsonForScript(value: unknown): string {
  return JSON.stringify(value)
    .replaceAll("<", "\\u003c")
    .replaceAll(">", "\\u003e")
    .replaceAll("&", "\\u0026")
    .replaceAll("\u2028", "\\u2028")
    .replaceAll("\u2029", "\\u2029");
}

function sceneId(study: DesignparserStudy, index: number): string {
  return `${study.id}-slide-${index + 1}`;
}

export function buildSlideshowManifest(study: DesignparserStudy): string {
  return jsonForScript({
    slides: study.slides.map((slide, index) => ({
      sceneId: sceneId(study, index),
      notes: slide.body,
    })),
  });
}

function renderVisual(slide: StudySlide, id: string): string {
  const visual = slide.visual;

  if (visual.type === "rule") {
    return `<div class="visual rule" id="${id}-visual"><span class="rule-mark" aria-hidden="true"></span><p id="${id}-rule">${escapeHtml(visual.statement)}</p></div>`;
  }

  if (visual.type === "comparison") {
    return `<div class="visual comparison" id="${id}-visual"><div class="comparison-card before" id="${id}-before"><span>Before</span><strong>${escapeHtml(visual.before)}</strong></div><div class="comparison-arrow" id="${id}-arrow" aria-hidden="true">→</div><div class="comparison-card after" id="${id}-after"><span>After</span><strong>${escapeHtml(visual.after)}</strong></div></div>`;
  }

  const items = visual.items
    .map(
      (item, index) =>
        `<li id="${id}-${visual.type}-${index + 1}"><span>${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(item)}</strong></li>`,
    )
    .join("");

  return `<ol class="visual ${visual.type}" id="${id}-visual">${items}</ol>`;
}

function renderScene(
  study: DesignparserStudy,
  slide: StudySlide,
  index: number,
): string {
  const id = sceneId(study, index);
  const escapedId = escapeHtml(id);

  return `<section class="scene clip" id="${escapedId}" data-composition-id="${escapedId}" data-width="1920" data-height="1080" data-start="${index * SCENE_SECONDS}" data-duration="${SCENE_SECONDS}" aria-labelledby="${escapedId}-title">
  <div class="scene-content" id="${escapedId}-content">
    <header id="${escapedId}-header"><p class="scene-index">Study ${String(index + 1).padStart(2, "0")}</p><h1 id="${escapedId}-title">${escapeHtml(slide.title)}</h1><p class="claim" id="${escapedId}-claim">${escapeHtml(slide.body)}</p></header>
    ${renderVisual(slide, escapedId)}
  </div>
  <i class="timeline-clock" id="${escapedId}-clock" aria-hidden="true"></i>
</section>`;
}

function renderTimeline(study: DesignparserStudy, index: number): string {
  const id = sceneId(study, index);
  const selector = `#${id}-content`;
  const timeline = `sceneTimeline${index + 1}`;
  const reduced = `reducedMotion${index + 1}`;

  return `<script>
const ${reduced} = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const ${timeline} = gsap.timeline({ paused: true });
if (${reduced}) {
  gsap.set(${JSON.stringify(selector)}, { opacity: 1, y: 0 });
} else {
  ${timeline}.fromTo(${JSON.stringify(selector)}, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, 0);
}
${timeline}.to(${JSON.stringify(`#${id}-clock`)}, { opacity: 1, duration: 6, ease: "none" }, 0);
window.__timelines[${JSON.stringify(id)}] = ${timeline};
</script>`;
}

export function buildHyperframesComposition(study: DesignparserStudy): string {
  const manifest = buildSlideshowManifest(study);
  const scenes = study.slides
    .map((slide, index) => renderScene(study, slide, index))
    .join("\n");
  const timelines = study.slides
    .map((_, index) => renderTimeline(study, index))
    .join("\n");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Layout study</title>
<style>
:root { color-scheme: dark; font-family: system-ui, sans-serif; background: #101522; color: #f1f3ed; }
* { box-sizing: border-box; }
html, body { width: 1920px; height: 1080px; margin: 0; overflow: hidden; }
body { background: #101522; }
.composition-root { position: absolute; inset: 0; width: 1920px; height: 1080px; }
.scene { position: absolute; inset: 0; width: 1920px; height: 1080px; overflow: hidden; background: radial-gradient(circle at 84% 15%, #293246 0, #101522 42%); }
.scene-content { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(620px, 1.1fr); gap: 112px; align-items: center; width: 100%; height: 100%; padding: 112px 136px; }
.timeline-clock { display: none; }
.scene-index { margin: 0 0 28px; color: #8dd8c5; font-size: 25px; font-weight: 750; letter-spacing: 0.18em; text-transform: uppercase; }
h1 { max-width: 760px; margin: 0; font-size: 78px; line-height: 0.98; letter-spacing: -0.052em; }
.claim { max-width: 720px; margin: 38px 0 0; color: #c7cbd2; font-size: 32px; line-height: 1.42; }
.visual { min-height: 590px; margin: 0; padding: 52px; border: 2px solid #3c465c; border-radius: 40px; background: #192033; box-shadow: 0 32px 90px rgb(0 0 0 / 28%); }
.rule { display: grid; place-content: center; gap: 36px; }
.rule-mark { display: block; width: 112px; height: 14px; border-radius: 999px; background: #e7bb72; }
.rule p { max-width: 650px; margin: 0; font-size: 55px; font-weight: 780; line-height: 1.08; letter-spacing: -0.035em; }
.comparison { display: grid; grid-template-columns: 1fr 92px 1fr; align-items: center; }
.comparison-card { display: grid; gap: 22px; min-height: 340px; align-content: center; padding: 44px; border-radius: 28px; background: #252c3e; }
.comparison-card.after { color: #101522; background: #8dd8c5; }
.comparison-card span { font-size: 22px; font-weight: 760; letter-spacing: 0.16em; text-transform: uppercase; opacity: 0.7; }
.comparison-card strong { font-size: 48px; line-height: 1.05; }
.comparison-arrow { color: #e7bb72; font-size: 54px; text-align: center; }
.sequence, .layers { display: grid; align-content: center; gap: 22px; list-style: none; }
.sequence li, .layers li { display: flex; gap: 28px; align-items: center; min-height: 112px; padding: 26px 32px; border: 2px solid #46516a; border-radius: 24px; background: #222a3d; }
.sequence li span, .layers li span { color: #8dd8c5; font-size: 22px; font-weight: 800; }
.sequence li strong, .layers li strong { font-size: 36px; }
.sequence li + li { margin-left: 62px; }
.sequence li + li + li { margin-left: 124px; }
.layers li { margin-inline: auto; }
.layers li:nth-child(1) { width: 94%; }
.layers li:nth-child(2) { width: 76%; }
.layers li:nth-child(3) { width: 58%; }
@media (prefers-reduced-motion: reduce) { .scene-content { opacity: 1; transform: none; } }
</style>
</head>
<body>
<main class="composition-root" id="${escapeHtml(study.id)}" data-composition-id="${escapeHtml(study.id)}" data-start="0" data-width="1920" data-height="1080" data-duration="${study.slides.length * SCENE_SECONDS}">
${scenes}
</main>
<script type="application/hyperframes-slideshow+json">${manifest}</script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<script>window.__timelines = window.__timelines || {};</script>
${timelines}
<script src="https://cdn.jsdelivr.net/npm/@hyperframes/core@0.7.107/dist/hyperframe.runtime.iife.js"></script>
</body>
</html>`;
}
