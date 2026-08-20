import { test, expect } from "@playwright/test";

test("Login with valid credentials @login @api", async ({ page }) => {
  await page.goto("/client/#/dashboard/dash");

  await expect(page).toHaveTitle("Let's Shop");
});
