import { test, expect } from "@playwright/test";

test("la app carga y muestra contenido", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/SneakerRank/i);
});

test("muestra el heading principal", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(2000);
  const body = await page.textContent("body");
  expect(body).toContain("Sneaker");
});

test("muestra el botón de buscar", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(2000);
  const body = await page.textContent("body");
  expect(body).toContain("buscar");
});
