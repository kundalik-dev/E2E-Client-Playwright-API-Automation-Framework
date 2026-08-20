import { test, expect } from "../fixtures/auth.fixture";

// test.use({
//   storageState: "../auth/storageStateAuth.json",
// });

test("Login using storage state", async ({ page }) => {
  await page.goto("client/#/dashboard/dash");
  await expect(page).toHaveURL("client/#/dashboard/dash");
});
