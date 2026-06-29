import { test, expect } from "@playwright/test";

test("la app carga correctamente", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/SneakerRank/i);
});

test("el div root existe y React montó algo", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(3000);
  const root = await page.locator("#root");
  await expect(root).toBeAttached();
});

test("la página no tiene errores de red críticos", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (err) => errors.push(err.message));
  await page.goto("/");
  await page.waitForTimeout(2000);
  const fatalErrors = errors.filter(e => e.includes("Cannot read") || e.includes("is not defined"));
  expect(fatalErrors).toHaveLength(0);
});
