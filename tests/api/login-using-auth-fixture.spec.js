import { test, expect } from "../../fixtures/auth.fixture";

test.beforeEach(async ({ authenticatedPage }) => {
  await authenticatedPage.goto("/client/#/dashboard/dash");
});

test.use({
  storageState: "",
});

test("Login with valid credentials and using fixtures which already set authentication @login @api", async ({
  page,
  dashboardPage,
}) => {
  await expect(page).toHaveTitle("Let's Shop");
  await expect(dashboardPage.shoeName).toHaveText("ADIDAS ORIGINAL");
});
