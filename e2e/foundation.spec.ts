import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("the root redirects to the canonical English home", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveURL(/\/en$/);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Useful references from across design and engineering.",
    }),
  ).toBeVisible();
});

test("the stable navigation reaches every top-level page", async ({ page }) => {
  await page.goto("/en");

  const navigation = page.getByRole("navigation", {
    name: "Primary navigation",
  });
  await expect(navigation.getByRole("link")).toHaveCount(4);

  await navigation.getByRole("link", { name: "References" }).click();
  await expect(page).toHaveURL(/\/en\/references$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "References" }),
  ).toBeVisible();

  await navigation.getByRole("link", { name: "Explore" }).click();
  await expect(page).toHaveURL(/\/en\/explore$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Explore" }),
  ).toBeVisible();

  await navigation.getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/\/en\/about$/);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "About DSGN ENGR Wiki",
    }),
  ).toBeVisible();
});

test("keyboard users can skip repeated navigation", async ({ page }) => {
  await page.goto("/en");

  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await expect(skipLink).toBeFocused();
  await skipLink.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("an unknown English route offers recovery", async ({ page }) => {
  await page.goto("/en/unknown");

  await expect(
    page.getByRole("heading", { level: 1, name: "Page not found" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Return home" })).toHaveAttribute(
    "href",
    "/en",
  );
});

for (const route of ["/en", "/en/references", "/en/explore", "/en/about"]) {
  test(`${route} has no detectable accessibility violations`, async ({
    page,
  }) => {
    await page.goto(route);

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}

test("the mobile shell does not overflow horizontally", async ({ page }) => {
  await page.goto("/en");

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
});
