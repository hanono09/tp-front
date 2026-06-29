import { test, expect } from "@playwright/test";

test("muestra el título al cargar", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("SneakerRank")).toBeVisible();
});

test("muestra la barra de búsqueda", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByPlaceholder(/nike dunk, samba, jordan/i)).toBeVisible();
});

test("busca sneakers y muestra resultados", async ({ page }) => {
  await page.goto("/");
  const input = page.getByPlaceholder(/nike dunk, samba, jordan/i);
  await input.clear();
  await input.fill("yeezy");
  await page.getByRole("button", { name: /buscar/i }).click();
  await expect(page.getByTestId("sneaker-card").first()).toBeVisible({ timeout: 5000 });
});
