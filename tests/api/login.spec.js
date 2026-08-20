import { test, expect, request } from "@playwright/test";

const loginPayload = { userEmail: process.env.USER_EMAIL, userPassword: process.env.USER_PASSWORD };

test.describe("Login API tests @login @ui", () => {
  test.beforeAll(async () => {
    const apiContext = await request.newContext({ baseURL: process.env.baseURLFromEnv });
    const response = await apiContext.post("/api/ecom/auth/login", { data: loginPayload });

    expect(response.ok()).toBeTruthy();
    console.log(await response.json());
  });

  //   test.beforeEach();

  test("Login with valid credentials @smoke", async ({ page }) => {
    await page.goto("/client");
    console.log(loginPayload);
    await expect(page).toHaveTitle("Let's Shop");
  });
});
