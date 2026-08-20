import { test, expect, request } from "@playwright/test";

const loginPayload = { userEmail: process.env.username, userPassword: process.env.password };

test.describe("Login API tests @login @ui", () => {
  test.beforeAll(async () => {
    const apiContext = await request.newContext();
    await apiContext.post("/client/#/auth/login", { data: loginPayload });
    console.log(loginPayload);
  });

  //   test.beforeEach();

  test("Login with valid credentials @smoke", async ({ page }) => {
    await page.goto("/client");
    console.log(loginPayload);
    await expect(page).toHaveTitle("Let's Shop");
  });
});
