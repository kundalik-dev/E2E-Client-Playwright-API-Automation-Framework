import { test, expect, request } from "@playwright/test";

const loginPayload = { userEmail: process.env.USER_EMAIL, userPassword: process.env.USER_PASSWORD };
const baseURL = process.env.baseURLFromEnv || "https://rahulshettyacademy.com/";

let authToken;

test.describe("Login API tests @login @api", () => {
  test.beforeAll(async () => {
    const apiContext = await request.newContext({ baseURL: baseURL });
    const response = await apiContext.post("/api/ecom/auth/login", { data: loginPayload });
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    authToken = responseBody.token;
  });

  test.beforeEach(async ({ page }) => {
    await page.addInitScript((token) => {
      window.localStorage.setItem("token", token);
    }, authToken);
  });

  test("Login with valid credentials @api", async ({ page }) => {
    await page.goto("/client/#/dashboard/dash");
    await expect(page).toHaveTitle("Let's Shop");
  });
});
