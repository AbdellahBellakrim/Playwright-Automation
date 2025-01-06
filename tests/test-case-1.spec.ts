import { test, expect } from "@playwright/test";

// User Information
const USERNAME = "leete222st4222";
const EMAIL = `test${Date.now()}@example.com`;
const PASSWORD = "password1337Temp";

// Personal Information
const TITLE = "Mr";
const DAY = "27";
const MONTH = "January";
const YEAR = "2018";

// Address Information
const FIRST_NAME = "John";
const LAST_NAME = "Doe";
const COMPANY = "ABC Inc";
const ADDRESS1 = "123 Main St";
const ADDRESS2 = "Apt 4B";
const COUNTRY = "United States";
const STATE = "New York";
const CITY = "New York";
const ZIPCODE = "10001";
const MOBILE_NUMBER = "1234567890";

// Page URLs and Titles
const BASE_URL = "http://automationexercise.com";
const PAGE_TITLE = "Automation Exercise";

test("Test Case 1: Register User", async ({ page }) => {
  await page.goto(BASE_URL);
  await expect(page).toHaveTitle(PAGE_TITLE);

  await page.click('text="Signup / Login"');
  await expect(page.locator('text="New User Signup!"')).toBeVisible();

  await page.fill('input[name="name"]', USERNAME);
  await page.fill('input[data-qa="signup-email"]', EMAIL);

  await page.click('button[data-qa="signup-button"]');
  await expect(page.locator('text="Enter Account Information"')).toBeVisible();

  await page.click(`input[value="${TITLE}"]`);
  await page.fill('input[data-qa="password"]', PASSWORD);
  await page.selectOption('select[data-qa="days"]', DAY);
  await page.selectOption('select[data-qa="months"]', MONTH);
  await page.selectOption('select[data-qa="years"]', YEAR);

  await page.check("input#newsletter");
  await page.check("input#optin");

  await page.fill('input[data-qa="first_name"]', FIRST_NAME);
  await page.fill('input[data-qa="last_name"]', LAST_NAME);
  await page.fill('input[data-qa="company"]', COMPANY);
  await page.fill('input[data-qa="address"]', ADDRESS1);
  await page.fill('input[data-qa="address2"]', ADDRESS2);
  await page.selectOption('select[data-qa="country"]', COUNTRY);
  await page.fill('input[data-qa="state"]', STATE);
  await page.fill('input[data-qa="city"]', CITY);
  await page.fill('input[data-qa="zipcode"]', ZIPCODE);
  await page.fill('input[data-qa="mobile_number"]', MOBILE_NUMBER);

  await page.click('button[data-qa="create-account"]');
  await expect(page.locator('text="Account Created!"')).toBeVisible();

  await page.click('a[data-qa="continue-button"]');
  await expect(
    page.locator(`a:has-text("Logged in as ${USERNAME}")`)
  ).toBeVisible();

  await page.click('text="Delete Account"');
  await expect(page.locator('text="Account Deleted!"')).toBeVisible();
});
