import { test as setup, expect } from "@playwright/test";

const STORAGE_STATE_PATH = process.env.STORAGE_STATE_PATH || "../auth/storageStateAuth.json";
const loginPayload = {
  userEmail: process.env.USER_EMAIL,
  userPassword: process.env.USER_PASSWORD,
};
const baseURL = process.env.baseURLFromEnv;

setup("authenticate", async ({ request }) => {
  const apiContext = await request.newContext({ baseURL: baseURL });
  const response = await apiContext.post("/api/ecom/auth/login", { data: loginPayload });
  expect(response.ok()).toBeTruthy();

  console.log(response.ok());

  if (!response.ok()) {
    throw new Error(`Login failed: ${response.status()}`);
  }

  await request.storageState({
    path: STORAGE_STATE_PATH,
  });

  console.log(`Authentication successful. Storage state saved to ${STORAGE_STATE_PATH}`);
});
