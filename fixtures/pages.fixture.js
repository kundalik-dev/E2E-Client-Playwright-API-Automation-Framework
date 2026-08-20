import { test as base, expect } from "@playwright/test";
import LoginPage from "../pages/login.page";
import DashboardPage from "../pages/dashboard.page";

// const userEmail = process.env.USER_EMAIL;
// const userPassword = process.env.USER_PASSWORD;
// const loginPayload = {
//   userEmail: userEmail,
//   userPassword: userPassword,
// };

const test = base.extend({
  // authToken: async ({ request }, use) => {
  //   const response = await request.post("/api/ecom/auth/login", { data: loginPayload });
  //   expect(response.ok()).toBeTruthy();

  //   const authToken = (await response.json()).token;
  //   await use(authToken);
  // },

  // Login page fixture
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // Dashboard page fixture
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
});

export { test, expect };
