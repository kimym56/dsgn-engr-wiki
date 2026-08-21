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

// Motion pilot decks: these reels get fully choreographed builds per slide
// (staggered header entrance, drawn ink shapes, ambient glow drift) instead
// of the single content fade. The deck component replays each opening on
// arrival.
const MOTION_PILOT_REEL_IDS = new Set(["Db-9Ty2jbe6", "Db3O3K4DdYi"]);

export function isMotionPilotStudy(study: DesignparserStudy): boolean {
  return MOTION_PILOT_REEL_IDS.has(study.id);
}

// Drawn-shape palette quoted from the source reel: pale graph paper, black
// ink outlines, one pink accent, teal annotation chips.
const PILOT_INK = "#17181a";
const PILOT_PINK = "#e07967";
const PILOT_TEAL = "#a8dcd2";
// Paths are normalized to pathLength=1000 and hidden by a dash slightly over
// it (round line caps would otherwise peek at exact equality). GSAP writes
// integer strokeDashoffset values, so the 1000-scale keeps draw-on smooth.
const PILOT_DASH = "1020";

// Fixed per-vertex wobble keeps the octagons hand-cut without randomness.
const PILOT_OCTAGON_WOBBLE = [
  0.04, -0.05, 0.06, -0.03, 0.05, -0.06, 0.02, 0.04,
];

function pilotOctagonPath(
  cx: number,
  cy: number,
  radius: number,
  variant = 0,
): string {
  const rotation = Math.PI / 8 + variant * 0.19;
  const points = PILOT_OCTAGON_WOBBLE.map((wobble, index) => {
    const angle = rotation + (index * Math.PI) / 4;
    const r = radius * (1 + wobble);
    return `${(cx + r * Math.cos(angle)).toFixed(1)} ${(cy + r * Math.sin(angle)).toFixed(1)}`;
  });
  return `M${points.join(" L")} Z`;
}

function pilotHeartPath(cx: number, cy: number, size: number): string {
  const point = (x: number, y: number) => `${x.toFixed(1)} ${y.toFixed(1)}`;
  return [
    `M${point(cx, cy + size * 0.72)}`,
    `C ${point(cx - size * 1.06, cy - size * 0.1)} ${point(cx - size * 0.56, cy - size * 0.94)} ${point(cx, cy - size * 0.32)}`,
    `C ${point(cx + size * 0.56, cy - size * 0.94)} ${point(cx + size * 1.06, cy - size * 0.1)} ${point(cx, cy + size * 0.72)}`,
    "Z",
  ].join(" ");
}

function pilotArrowPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): string {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const head = 15;
  const point = (x: number, y: number) => `${x.toFixed(1)} ${y.toFixed(1)}`;
  return [
    `M${point(x1, y1)} L${point(x2, y2)}`,
    `M${point(x2 - head * Math.cos(angle - 0.5), y2 - head * Math.sin(angle - 0.5))} L${point(x2, y2)}`,
    `L${point(x2 - head * Math.cos(angle + 0.5), y2 - head * Math.sin(angle + 0.5))}`,
  ].join(" ");
}

function pilotDrawPath(id: string, d: string, extra = ""): string {
  return `<path id="${id}" d="${d}" pathLength="1000" fill="none" stroke="${PILOT_INK}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${PILOT_DASH}" stroke-dashoffset="${PILOT_DASH}"${extra ? ` ${extra}` : ""}/>`;
}

function pilotText(
  id: string,
  x: number,
  y: number,
  content: string,
  extra = "",
): string {
  return `<text id="${id}" x="${x}" y="${y}" fill="${PILOT_INK}"${extra ? ` ${extra}` : ""}>${escapeHtml(content)}</text>`;
}

function pilotChip(id: string, x: number, y: number, label: string): string {
  const width = label.length * 12 + 34;
  return `<g id="${id}"><rect x="${x}" y="${y}" width="${width}" height="42" rx="9" fill="${PILOT_TEAL}" stroke="${PILOT_INK}" stroke-width="2"/><text x="${(x + width / 2).toFixed(1)}" y="${y + 29}" text-anchor="middle" font-size="22" font-weight="700" fill="${PILOT_INK}">${escapeHtml(label)}</text></g>`;
}

function pilotVisualMarkup(study: DesignparserStudy, index: number): string {
  const id = sceneId(study, index);
  const slide = study.slides[index]!;
  const visual = slide.visual;
  // Rotate the blob family per reel so pilot decks do not share shapes.
  const seed =
    [...study.id].reduce((total, ch) => total + ch.charCodeAt(0), 0) % 8;
  const pieces: string[] = [];

  if (visual.type === "comparison") {
    const ghosts = [0, 1, 2, 3, 4]
      .map((ghost) =>
        pilotDrawPath(
          `${id}-ghost-${ghost + 1}`,
          pilotOctagonPath(96 + ghost * 58, 64, 20, (ghost % 3) + seed),
          'opacity="0.45" stroke-width="2.5"',
        ),
      )
      .join("");
    pieces.push(
      pilotDrawPath(`${id}-shape-a`, pilotOctagonPath(205, 232, 102, seed)),
      pilotDrawPath(`${id}-shape-b`, pilotOctagonPath(555, 232, 102, 3 + seed)),
      ghosts,
      pilotDrawPath(
        `${id}-heart`,
        pilotHeartPath(205, 220, 30),
        `stroke="${PILOT_PINK}"`,
      ),
      pilotChip(`${id}-chip`, 141, 372, "25 times"),
      pilotText(
        `${id}-after`,
        380,
        448,
        visual.after,
        `text-anchor="middle" font-size="26" font-weight="700" fill="${PILOT_PINK}"`,
      ),
    );
  } else if (visual.type === "layers") {
    const count = visual.items.length;
    const rowGap = count > 1 ? Math.min(152, 340 / (count - 1)) : 0;
    const radius = Math.max(18, Math.min(50, rowGap * 0.3));
    const firstCy = 240 - ((count - 1) * rowGap) / 2;
    const rows = visual.items.map((item, itemIndex) => {
      const cy = firstCy + itemIndex * rowGap;
      return pilotText(
        `${id}-label-${itemIndex + 1}`,
        246,
        Math.round(cy + 10),
        item,
        'font-size="28" font-weight="650"',
      );
    });
    const octagons = visual.items.map((_, itemIndex) =>
      pilotDrawPath(
        `${id}-oct-${itemIndex + 1}`,
        pilotOctagonPath(
          150,
          firstCy + itemIndex * rowGap,
          radius,
          itemIndex + seed,
        ),
      ),
    );
    const arrows = visual.items.slice(0, -1).map((_, itemIndex) => {
      const from = firstCy + itemIndex * rowGap + radius + 10;
      const to = firstCy + (itemIndex + 1) * rowGap - radius - 10;
      return pilotDrawPath(
        `${id}-arrow-${itemIndex + 1}`,
        pilotArrowPath(150, from, 150, to),
      );
    });
    const lastCy = firstCy + (count - 1) * rowGap;
    const scribbleRadius = radius + 16;
    pieces.push(
      ...octagons,
      ...arrows,
      ...rows,
      pilotDrawPath(
        `${id}-scribble`,
        `M${(150 - scribbleRadius).toFixed(1)} ${lastCy.toFixed(1)} C ${(150 - scribbleRadius - 6).toFixed(1)} ${(lastCy - scribbleRadius * 1.25).toFixed(1)}, ${(150 + scribbleRadius + 6).toFixed(1)} ${(lastCy - scribbleRadius * 1.2).toFixed(1)}, ${(150 + scribbleRadius).toFixed(1)} ${(lastCy + 6).toFixed(1)} C ${(150 + scribbleRadius + 5).toFixed(1)} ${(lastCy + scribbleRadius * 1.2).toFixed(1)}, ${(150 - scribbleRadius - 5).toFixed(1)} ${(lastCy + scribbleRadius * 1.15).toFixed(1)}, ${(150 - scribbleRadius + 4).toFixed(1)} ${(lastCy - 6).toFixed(1)}`,
        `stroke="${PILOT_PINK}"`,
      ),
    );
  } else if (visual.type === "sequence") {
    const count = visual.items.length;
    const nodeX = (itemIndex: number) =>
      count > 1 ? 130 + (itemIndex * 510) / (count - 1) : 380;
    const nodes = visual.items.map((_, itemIndex) =>
      pilotDrawPath(
        `${id}-node-${itemIndex + 1}`,
        pilotOctagonPath(nodeX(itemIndex), 248, 27, itemIndex + seed),
        'stroke-width="3"',
      ),
    );
    const labels = visual.items.map((item, itemIndex) =>
      pilotText(
        `${id}-label-${itemIndex + 1}`,
        Math.round(nodeX(itemIndex)),
        itemIndex % 2 === 0 ? 196 : 316,
        item,
        'text-anchor="middle" font-size="22" font-weight="650"',
      ),
    );
    pieces.push(
      pilotDrawPath(`${id}-path`, "M66 248 C 210 242, 330 254, 694 246"),
      ...nodes,
      ...labels,
      pilotDrawPath(
        `${id}-heart`,
        pilotHeartPath(nodeX(count - 1), 172, 20),
        `stroke="${PILOT_PINK}"`,
      ),
    );
  } else if (slide.kind === "takeaway") {
    pieces.push(
      pilotDrawPath(`${id}-axis-y`, "M120 56 L120 376"),
      pilotDrawPath(`${id}-axis-x`, "M116 380 L684 380"),
      pilotDrawPath(
        `${id}-trend`,
        "M148 348 C 300 336, 420 250, 652 128",
        'stroke-width="4"',
      ),
      `<circle id="${id}-dot" cx="652" cy="128" r="9" fill="${PILOT_PINK}" stroke="${PILOT_INK}" stroke-width="2"/>`,
      pilotDrawPath(
        `${id}-heart`,
        pilotHeartPath(652, 90, 17),
        `stroke="${PILOT_PINK}"`,
      ),
      pilotChip(`${id}-chip`, 150, 64, "mere exposure"),
      pilotText(`${id}-axis-label-y`, 62, 66, "liking", 'font-size="21"'),
      pilotText(
        `${id}-axis-label-x`,
        684,
        412,
        "exposure",
        'text-anchor="end" font-size="21"',
      ),
      pilotText(
        `${id}-stmt`,
        380,
        448,
        visual.type === "rule" ? visual.statement : "",
        'text-anchor="middle" font-size="28" font-weight="700"',
      ),
    );
  } else {
    const ghosts = [
      [150, 84],
      [610, 84],
      [150, 336],
      [610, 336],
    ]
      .map(([gx, gy], ghost) =>
        pilotDrawPath(
          `${id}-ghost-${ghost + 1}`,
          pilotOctagonPath(gx, gy, 24, ghost + seed),
          'opacity="0.45" stroke-width="2.5"',
        ),
      )
      .join("");
    pieces.push(
      pilotDrawPath(`${id}-oct`, pilotOctagonPath(380, 200, 96, seed)),
      ghosts,
      pilotDrawPath(
        `${id}-heart`,
        pilotHeartPath(380, 196, 34),
        `stroke="${PILOT_PINK}"`,
      ),
      pilotText(
        `${id}-stmt`,
        380,
        428,
        visual.type === "rule" ? visual.statement : "",
        'text-anchor="middle" font-size="32" font-weight="750"',
      ),
      pilotDrawPath(
        `${id}-underline`,
        "M230 448 C 330 443, 430 452, 530 446",
        `stroke="${PILOT_PINK}" stroke-width="4"`,
      ),
    );
  }

  const label =
    visual.type === "rule"
      ? visual.statement
      : visual.type === "comparison"
        ? `${visual.before} versus ${visual.after}`
        : visual.items.join(", ");
  return `<svg viewBox="0 0 760 480" role="img" aria-label="${escapeHtml(label)}">${pieces.join("")}</svg>`;
}

export function buildSlideshowManifest(study: DesignparserStudy): string {
  return jsonForScript({
    slides: study.slides.map((slide, index) => ({
      sceneId: sceneId(study, index),
      notes: slide.body,
    })),
  });
}

function renderVisual(
  study: DesignparserStudy,
  slide: StudySlide,
  index: number,
): string {
  const visual = slide.visual;

  if (isMotionPilotStudy(study)) {
    return `<figure class="visual visual--paper" id="${sceneId(study, index)}-visual">${pilotVisualMarkup(study, index)}</figure>`;
  }

  const id = sceneId(study, index);

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
    ${renderVisual(study, slide, index)}
  </div>
  <i class="timeline-clock" id="${escapedId}-clock" aria-hidden="true"></i>
</section>`;
}

function renderTimeline(study: DesignparserStudy, index: number): string {
  const id = sceneId(study, index);
  const selector = `#${id}-content`;
  const timeline = `sceneTimeline${index + 1}`;
  const reduced = `reducedMotion${index + 1}`;

  const pilot = renderMotionPilotTimeline(study, index, {
    id,
    selector,
    timeline,
    reduced,
  });
  if (pilot !== null) return pilot;

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

function renderMotionPilotTimeline(
  study: DesignparserStudy,
  index: number,
  names: { id: string; selector: string; timeline: string; reduced: string },
): string | null {
  if (!isMotionPilotStudy(study)) return null;
  const slide = study.slides[index];
  if (!slide) return null;

  const { id, timeline, reduced } = names;

  const tweens: string[] = [];
  const finals: Array<{ target: string; vars: string }> = [];
  const at = (seconds: number) => seconds.toFixed(2);
  const add = (
    target: string,
    from: string,
    to: string,
    when: number,
  ): void => {
    tweens.push(
      `${timeline}.fromTo(${JSON.stringify(`#${target}`)}, ${from}, ${to}, ${at(when)});`,
    );
  };

  // Wrapper fades fast so each element owns its entrance.
  add(
    `${id}-content`,
    "{ opacity: 0 }",
    '{ opacity: 1, duration: 0.25, ease: "power1.out" }',
    0,
  );
  finals.push({ target: `#${id}-content`, vars: "{ opacity: 1, y: 0 }" });

  // Header cascade.
  add(
    `${id}-header .scene-index`,
    "{ opacity: 0, x: -36 }",
    '{ opacity: 1, x: 0, duration: 0.45, ease: "power3.out" }',
    0.05,
  );
  add(
    `${id}-title`,
    "{ opacity: 0, y: 88, scale: 0.96 }",
    '{ opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "back.out(1.25)" }',
    0.18,
  );
  add(
    `${id}-claim`,
    "{ opacity: 0, y: 40 }",
    '{ opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }',
    0.42,
  );
  tweens.push(
    `${timeline}.to(${JSON.stringify(`#${id}-title, #${id}-claim`)}, { y: -5, duration: 1.4, ease: "sine.out" }, 1.4);`,
  );
  finals.push({
    target: `#${id}-header .scene-index`,
    vars: "{ opacity: 1, x: 0 }",
  });
  finals.push({
    target: `#${id}-title`,
    vars: "{ opacity: 1, y: 0, scale: 1 }",
  });
  finals.push({ target: `#${id}-claim`, vars: "{ opacity: 1, y: 0 }" });

  // Visual container, then a build specific to the visual grammar.
  add(
    `${id}-visual`,
    "{ opacity: 0, scale: 0.94 }",
    '{ opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }',
    0.55,
  );
  finals.push({ target: `#${id}-visual`, vars: "{ opacity: 1, scale: 1 }" });

  // Drawn-shape builds: ink strokes self-draw, accents pop, labels rise.
  // Timings compress for longer item lists so every build ends before the
  // deck driver pauses the scene just under three seconds in.
  const draw = (target: string, when: number, duration: number): void => {
    add(
      target,
      `{ strokeDashoffset: ${PILOT_DASH} }`,
      `{ strokeDashoffset: 0, duration: ${duration}, ease: "power2.inOut" }`,
      when,
    );
    finals.push({ target: `#${target}`, vars: "{ strokeDashoffset: 0 }" });
  };
  const pop = (
    target: string,
    when: number,
    ease: string,
    duration = 0.45,
  ): void => {
    add(
      target,
      "{ opacity: 0, scale: 0.35 }",
      `{ opacity: 1, scale: 1, duration: ${duration}, ease: "${ease}", transformOrigin: "center" }`,
      when,
    );
    finals.push({ target: `#${target}`, vars: "{ opacity: 1, scale: 1 }" });
  };
  const rise = (target: string, when: number): void => {
    add(
      target,
      "{ opacity: 0, y: 16 }",
      '{ opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }',
      when,
    );
    finals.push({ target: `#${target}`, vars: "{ opacity: 1, y: 0 }" });
  };

  const visual = slide.visual;
  if (visual.type === "comparison") {
    draw(`${id}-shape-a`, 0.7, 0.7);
    draw(`${id}-shape-b`, 0.85, 0.7);
    for (let ghost = 1; ghost <= 5; ghost++) {
      draw(`${id}-ghost-${ghost}`, 1.15 + (ghost - 1) * 0.13, 0.35);
    }
    pop(`${id}-chip`, 1.8, "back.out(2)");
    draw(`${id}-heart`, 1.95, 0.5);
    pop(`${id}-heart`, 1.95, "back.out(1.8)", 0.5);
    rise(`${id}-after`, 2.35);
  } else if (visual.type === "layers") {
    const count = visual.items.length;
    const step = count > 1 ? Math.min(0.45, 1.5 / (count - 1)) : 0;
    visual.items.forEach((_, itemIndex) => {
      const when = 0.7 + itemIndex * step;
      draw(`${id}-oct-${itemIndex + 1}`, when, 0.5);
      rise(`${id}-label-${itemIndex + 1}`, when + 0.18);
      if (itemIndex < count - 1) {
        draw(`${id}-arrow-${itemIndex + 1}`, when + 0.28, 0.3);
      }
    });
    draw(`${id}-scribble`, 0.7 + (count - 1) * step + 0.2, 0.45);
  } else if (visual.type === "sequence") {
    const count = visual.items.length;
    const step = count > 1 ? Math.min(0.32, 1.35 / (count - 1)) : 0;
    draw(`${id}-path`, 0.7, 0.9);
    visual.items.forEach((_, itemIndex) => {
      const when = 0.85 + itemIndex * step;
      draw(`${id}-node-${itemIndex + 1}`, when, 0.35);
      pop(`${id}-node-${itemIndex + 1}`, when, "back.out(1.8)", 0.4);
      rise(`${id}-label-${itemIndex + 1}`, when + 0.12);
    });
    pop(`${id}-heart`, 0.85 + (count - 1) * step + 0.28, "back.out(2)", 0.4);
  } else if (slide.kind === "takeaway") {
    draw(`${id}-axis-y`, 0.7, 0.45);
    draw(`${id}-axis-x`, 0.8, 0.45);
    pop(`${id}-chip`, 1.05, "back.out(2)");
    draw(`${id}-trend`, 1.3, 0.9);
    rise(`${id}-stmt`, 1.9);
    pop(`${id}-dot`, 2.1, "back.out(2)", 0.4);
    pop(`${id}-heart`, 2.25, "back.out(1.8)", 0.4);
  } else {
    draw(`${id}-oct`, 0.7, 0.8);
    for (let ghost = 1; ghost <= 4; ghost++) {
      draw(`${id}-ghost-${ghost}`, 1.15 + (ghost - 1) * 0.14, 0.4);
    }
    draw(`${id}-heart`, 1.85, 0.5);
    pop(`${id}-heart`, 1.85, "back.out(1.8)", 0.5);
    rise(`${id}-stmt`, 2.05);
    draw(`${id}-underline`, 2.3, 0.4);
  }

  return `<script>
const ${reduced} = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const ${timeline} = gsap.timeline({ paused: true });
if (${reduced}) {
${finals.map((f) => `  gsap.set(${JSON.stringify(f.target)}, ${f.vars});`).join("\n")}
} else {
${tweens.map((t) => `  ${t}`).join("\n")}
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
.composition-root--light .scene { background: #fdfcf9; background-image: repeating-linear-gradient(0deg, rgb(23 24 26 / 4%) 0 1px, transparent 1px 44px), repeating-linear-gradient(90deg, rgb(23 24 26 / 4%) 0 1px, transparent 1px 44px); }
.composition-root--light .scene-index { color: #e07967; }
.composition-root--light h1 { color: #17181a; }
.composition-root--light .claim { color: #4a4b4e; }
.composition-root--light .visual--paper { padding: 0; border: 0; border-radius: 0; background-color: transparent; background-image: none; box-shadow: none; }
.scene-content { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(620px, 1.1fr); gap: 112px; align-items: center; width: 100%; height: 100%; padding: 112px 136px; }
.timeline-clock { display: none; }
.scene-index { margin: 0 0 28px; color: #8dd8c5; font-size: 25px; font-weight: 750; letter-spacing: 0.18em; text-transform: uppercase; }
h1 { max-width: 760px; margin: 0; font-size: 78px; line-height: 0.98; letter-spacing: -0.052em; }
.claim { max-width: 720px; margin: 38px 0 0; color: #c7cbd2; font-size: 32px; line-height: 1.42; }
.visual { min-height: 590px; margin: 0; padding: 52px; border: 2px solid #3c465c; border-radius: 40px; background: #192033; box-shadow: 0 32px 90px rgb(0 0 0 / 28%); }
.visual--paper { display: grid; padding: 0; border-color: #17181a; border-radius: 18px; background-color: #f4f1ea; background-image: repeating-linear-gradient(0deg, rgb(23 24 26 / 5%) 0 1px, transparent 1px 44px), repeating-linear-gradient(90deg, rgb(23 24 26 / 5%) 0 1px, transparent 1px 44px); box-shadow: 0 26px 70px rgb(0 0 0 / 34%); }
.visual--paper svg { display: block; width: 100%; height: 100%; }
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
<main class="composition-root${isMotionPilotStudy(study) ? " composition-root--light" : ""}" id="${escapeHtml(study.id)}" data-composition-id="${escapeHtml(study.id)}" data-start="0" data-width="1920" data-height="1080" data-duration="${study.slides.length * SCENE_SECONDS}">
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
