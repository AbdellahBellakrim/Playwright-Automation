import { test, expect } from "@playwright/test";
import { registerUser } from "./helpers/utils";

test("Test Case 2: Login User with correct email and password", async ({
  page,
}) => {
  const user = await registerUser(page);
  await page.click('text="Logout"');
  await page.goto("http://automationexercise.com");
  await expect(page).toHaveTitle("Automation Exercise");
  await page.click('text="Signup / Login"');
  await expect(page.locator('text="Login to your account"')).toBeVisible();
  await page.fill('input[data-qa="login-email"]', user.email);
  await page.fill('input[data-qa="login-password"]', user.password);
  await page.click('button[data-qa="login-button"]');
  await expect(
    page.locator(`a:has-text("Logged in as ${user.username}")`)
  ).toBeVisible();
  await page.click('text="Delete Account"');
  await expect(page.locator('text="Account Deleted!"')).toBeVisible();
});
