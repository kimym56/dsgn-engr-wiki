import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator, type Page } from "@playwright/test";

async function tabTo(page: Page, target: Locator, maximumTabs = 12) {
  for (let index = 0; index < maximumTabs; index += 1) {
    await page.keyboard.press("Tab");

    if (
      await target.evaluate((element) => element === document.activeElement)
    ) {
      return;
    }
  }

  throw new Error(
    `Tab did not reach ${await target.evaluate((element) => element.outerHTML)}`,
  );
}

async function expectVisibleKeyboardFocus(target: Locator) {
  await expect(target).toBeFocused();
  expect(
    await target.evaluate((element) => {
      const style = getComputedStyle(element);

      return (
        style.outlineStyle !== "none" && parseFloat(style.outlineWidth) > 0
      );
    }),
  ).toBe(true);
}

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

test("the published reference index exposes nine named cards and canonical links", async ({
  page,
}) => {
  const externalRequests: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());

    if (
      (url.protocol === "http:" || url.protocol === "https:") &&
      url.origin !== "http://127.0.0.1:3000"
    ) {
      externalRequests.push(request.url());
    }
  });

  await page.goto("/en/references");

  await expect(
    page.getByRole("heading", { level: 1, name: "References" }),
  ).toBeVisible();
  await expect(page.getByText("9 references", { exact: true })).toHaveAttribute(
    "aria-live",
    "polite",
  );
  await expect(page.getByRole("combobox", { name: "Area" })).toBeVisible();
  await expect(page.getByRole("combobox", { name: "Format" })).toBeVisible();

  const cards = page.getByRole("article");
  await expect(cards).toHaveCount(9);
  await expect(
    cards.getByRole("link", { name: "Visit original source" }),
  ).toHaveCount(9);

  const developingTaste = page.getByRole("article", {
    name: "Developing Taste",
  });
  await expect(developingTaste).toBeVisible();

  for (const link of [
    developingTaste.getByRole("link", { name: "Developing Taste" }),
    developingTaste.getByRole("link", { name: "Visit original source" }),
  ]) {
    await expect(link).toHaveAttribute(
      "href",
      "https://emilkowal.ski/ui/developing-taste",
    );
    await expect(link).not.toHaveAttribute("target", "_blank");
  }

  expect(externalRequests).toEqual([]);
});

test("reference filters narrow results by Area and Format", async ({
  page,
}) => {
  await page.goto("/en/references?area=interaction-and-motion&format=tool");

  await expect(page.getByText("2 references", { exact: true })).toBeVisible();
  await expect(page.getByRole("article")).toHaveCount(2);
  await expect(
    page.getByRole("article").getByRole("heading", { level: 2 }),
  ).toHaveText(["Pasito", "Vaul"]);
  await expect(page.getByRole("combobox", { name: "Area" })).toHaveValue(
    "interaction-and-motion",
  );
  await expect(page.getByRole("combobox", { name: "Format" })).toHaveValue(
    "tool",
  );
});

test("an unknown reference filter recovers to the complete index", async ({
  page,
}) => {
  await page.goto("/en/references?area=unknown");

  await expect(page.getByText("9 references", { exact: true })).toBeVisible();
  await expect(page.getByRole("article")).toHaveCount(9);
  await expect(page.getByRole("combobox", { name: "Area" })).toHaveValue("");
});

test("a valid empty reference filter offers a clear action", async ({
  page,
}) => {
  await page.goto("/en/references?area=prototyping-and-tooling");

  await expect(page.getByText("0 references", { exact: true })).toBeVisible();
  await expect(page.getByRole("article")).toHaveCount(0);
  await expect(
    page.getByText("No reviewed references match these filters."),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Clear filters" }),
  ).toHaveAttribute("href", "/en/references");
});

test("production never exposes the editorial review preview", async ({
  page,
}) => {
  await page.goto("/en/references?preview=review");

  await expect(page.getByRole("article")).toHaveCount(9);
  await expect(
    page.getByText(
      "Editorial preview: review records are visible in this development build.",
    ),
  ).toHaveCount(0);
});

test("the narrow reference index has no overflow and preserves keyboard focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/references");

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);

  const area = page.getByRole("combobox", { name: "Area" });
  const focusOrder = [
    area,
    page.getByRole("combobox", { name: "Format" }),
    page.getByRole("button", { name: "Apply filters" }),
    page.getByRole("link", { name: "Clear filters" }),
    page.getByRole("article").first().getByRole("link").first(),
    page
      .getByRole("article")
      .first()
      .getByRole("link", { name: "Visit original source" }),
  ];

  await tabTo(page, area);
  await expectVisibleKeyboardFocus(area);

  for (const target of focusOrder.slice(1)) {
    await page.keyboard.press("Tab");
    await expectVisibleKeyboardFocus(target);
  }
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
