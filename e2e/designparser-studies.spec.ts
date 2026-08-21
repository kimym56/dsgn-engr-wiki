import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { designparserStudies } from "../src/studies/designparser/studies";

const study = designparserStudies[0];
if (!study) {
  throw new Error("designparser-studies e2e requires a reviewed study");
}

const studyPath = `/en/studies/designparser/${study.id}`;

test("a reviewed study is unlisted but directly usable", async ({ page }) => {
  await page.goto(studyPath);

  await expect(
    page.getByRole("heading", { level: 1, name: study.title }),
  ).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex.*nofollow|nofollow.*noindex/,
  );
  await expect(
    page.getByRole("link", { name: "@designparser" }),
  ).toHaveAttribute("href", study.source.url);

  await expect(
    page.getByLabel(`Slide 1 of ${study.slides.length}`),
  ).toBeVisible({ timeout: 20000 });
  await page.getByRole("button", { name: "Next slide" }).click();
  await expect(
    page.getByLabel(`Slide 2 of ${study.slides.length}`),
  ).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByLabel(`Slide 3 of ${study.slides.length}`),
  ).toBeVisible();
});

test("the unlisted study stays out of public discovery", async ({ page }) => {
  await page.goto("/en");

  const navigation = page.getByRole("navigation", {
    name: "Primary navigation",
  });
  await expect(navigation.getByRole("link")).toHaveCount(4);
  await expect(navigation.getByRole("link", { name: "Studies" })).toHaveCount(
    0,
  );

  for (const route of ["/en/references", "/en/explore", "/en/about"]) {
    await page.goto(route);
    await expect(page.locator('a[href*="/studies/designparser"]')).toHaveCount(
      0,
    );
  }
});

test("unknown reel IDs and non-English locales are not found", async ({
  page,
}) => {
  const unknownReel = await page.goto(
    "/en/studies/designparser/NOT_A_REAL_REEL",
  );
  expect(unknownReel?.status()).toBe(404);
  await expect(
    page
      .getByRole("heading", { level: 1, name: "404" })
      .or(page.getByRole("heading", { level: 1, name: "Page not found" })),
  ).toBeVisible();

  const nonEnglish = await page.goto("/ko/studies/designparser");
  expect(nonEnglish?.status()).toBe(404);
  await expect(
    page
      .getByRole("heading", { level: 1, name: "404" })
      .or(page.getByRole("heading", { level: 1, name: "Page not found" })),
  ).toBeVisible();
});

test("the study page does not overflow horizontally", async ({ page }) => {
  await page.goto(studyPath);

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
});

test("a reviewed study page has no violations outside the isolated deck", async ({
  page,
}) => {
  await page.goto(studyPath);

  const results = await new AxeBuilder({ page })
    .exclude(".study-deck")
    .analyze();
  expect(results.violations).toEqual([]);
});

test("reduced-motion readers still navigate with final visuals", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(studyPath);

  await expect(
    page.getByLabel(`Slide 1 of ${study.slides.length}`),
  ).toBeVisible({ timeout: 20000 });

  const compositionFrame = page
    .frames()
    .find((frame) => frame !== page.mainFrame());
  if (!compositionFrame) {
    throw new Error("the study deck composition frame never mounted");
  }

  const firstContent = compositionFrame.locator(`#${study.id}-slide-1-content`);
  await expect(firstContent).toBeVisible();
  expect(
    await firstContent.evaluate((el) => getComputedStyle(el).opacity),
  ).toBe("1");
  expect(
    await firstContent.evaluate((el) => getComputedStyle(el).transform),
  ).toBe("none");

  await page.getByRole("button", { name: "Next slide" }).click();
  await expect(
    page.getByLabel(`Slide 2 of ${study.slides.length}`),
  ).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByLabel(`Slide 3 of ${study.slides.length}`),
  ).toBeVisible();

  await expect(compositionFrame.locator("video, audio")).toHaveCount(0);
  await expect(compositionFrame.locator("section.scene")).toHaveCount(
    study.slides.length,
  );
});
