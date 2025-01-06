import { test, expect } from "@playwright/test";
import { registerUser } from "./helpers/utils";
import { generateRandomEmail, generateRandomString } from "./helpers/utils";

test("Test Case 1: Register User", async ({ page }) => {
  const { username } = await registerUser(page);
  await expect(
    page.locator(`a:has-text("Logged in as ${username}")`)
  ).toBeVisible();
  await page.click('text="Delete Account"');
  await expect(page.locator('text="Account Deleted!"')).toBeVisible();
  await page.click('a[data-qa="continue-button"]');
});

test("Test Case 2: Login User with correct email and password", async ({
  page,
}) => {
  const { email, password, username } = await registerUser(page);
  await page.click('text="Logout"');
  await page.goto("http://automationexercise.com");
  await expect(page).toHaveTitle("Automation Exercise");
  await page.click('text="Signup / Login"');
  await expect(page.locator('text="Login to your account"')).toBeVisible();
  await page.fill('input[data-qa="login-email"]', email);
  await page.fill('input[data-qa="login-password"]', password);
  await page.click('button[data-qa="login-button"]');
  await expect(
    page.locator(`a:has-text("Logged in as ${username}")`)
  ).toBeVisible();
  await page.click('text="Delete Account"');
  await expect(page.locator('text="Account Deleted!"')).toBeVisible();
});

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

test("Test Case 4: Logout User", async ({ page }) => {
  const { email, password, username } = await registerUser(page);
  await page.click('text="Logout"');
  await page.click('a:has-text("Home")');
  await page.click('text="Signup / Login"');
  await expect(page.locator('text="Login to your account"')).toBeVisible();
  await page.fill('input[data-qa="login-email"]', email);
  await page.fill('input[data-qa="login-password"]', password);
  await page.click('button[data-qa="login-button"]');
  await expect(
    page.locator(`a:has-text("Logged in as ${username}")`)
  ).toBeVisible();
  await page.click('text="Logout"');
  await expect(page.locator('text="Login to your account"')).toBeVisible();
});
