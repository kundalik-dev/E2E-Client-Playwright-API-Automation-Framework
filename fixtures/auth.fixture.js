import { test as baseAuth, expect } from "../fixtures/pages.fixture";

const STORAGE_STATE_PATH = process.env.STORAGE_STATE_PATH || "../auth/storageStateAuth.json";
const loginPayload = {
  userEmail: process.env.USER_EMAIL,
  userPassword: process.env.USER_PASSWORD,
};

const test = baseAuth.extend({
  authToken: async ({ request }, use) => {
    const response = await request.post("/api/ecom/auth/login", { data: loginPayload });
    expect(response.ok()).toBeTruthy();
    const authToken = (await response.json()).token;
    await use(authToken);
  },

  authenticatedPage: async ({ page, authToken }, use) => {
    await page.addInitScript((token) => {
      window.localStorage.setItem("token", token);
    }, authToken);
    await use(page);
  },

  authPageState: async ({ page, loginPage }, use) => {
    loginPage.goto("/client/#/auth/login");
    loginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);

    await page.context().storageState({ path: STORAGE_STATE_PATH });
    await use(STORAGE_STATE_PATH);
  },
});

export { test, expect };
