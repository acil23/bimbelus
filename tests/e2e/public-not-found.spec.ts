import { expect, test } from "@playwright/test";

const missingSlug = "this-page-does-not-exist";

const routes = [
  ["program", `/program/${missingSlug}`],
  ["tutor", `/tutor/${missingSlug}`],
  ["prestasi", `/prestasi/${missingSlug}`],
  ["root", "/this-page-does-not-exist"],
] as const;

test.describe("public detail routes", () => {
  for (const [label, path] of routes) {
    test(`${label} route returns a real 404`, async ({ page }) => {
      const response = await page.goto(path);

      expect(response?.status()).toBe(404);
      await expect(
        page.getByRole("heading", { name: /halaman belum ditemukan/i }),
      ).toBeVisible();
    });
  }
});