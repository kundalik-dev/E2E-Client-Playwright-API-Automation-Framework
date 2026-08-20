import { test, expect, request } from "@playwright/test";
import ApiUtils from "../../utils/ApiUtils";

const orderPayLoad = {
  orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }],
};
const loginPayLoad = { userEmail: "kundalik.dev@gmail.com", userPassword: "Admin@123" };
let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new ApiUtils(apiContext, loginPayLoad);
  response = apiUtils.createOrder(orderPayLoad);
});

test.beforeEach(async (page) => {
  await page.goto("/");
});

test("valid order placement", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.autToken);

  //   await page.goto("");

  await expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});
