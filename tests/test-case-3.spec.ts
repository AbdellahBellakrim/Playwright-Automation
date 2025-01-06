import { test, expect } from "@playwright/test";
import { generateRandomEmail, generateRandomString } from "./helpers/utils";

test("Test Case 3: Login User with incorrect email and password", async ({
  page,
}) => {
  const email = generateRandomEmail("wrong.john.doe");
  const password = generateRandomString(10);
  await page.goto("http://automationexercise.com");
  await expect(page).toHaveTitle("Automation Exercise");
  await page.click('text="Signup / Login"');
  await expect(page.locator('text="Login to your account"')).toBeVisible();
  await page.fill('input[data-qa="login-email"]', email);
  await page.fill('input[data-qa="login-password"]', password);
  await page.click('button[data-qa="login-button"]');
  await expect(
    page.locator('text="Your email or password is incorrect!"')
  ).toBeVisible();
});
