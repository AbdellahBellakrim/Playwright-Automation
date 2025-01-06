import { Page, expect } from "@playwright/test";

/**
 * Generates a random email address.
 * @param prefix - The prefix for the email (e.g., 'user').
 * @returns A random email address.
 */
export function generateRandomEmail(prefix: string = "user"): string {
  const randomNumber = Math.floor(Math.random() * 10000);
  return `${prefix}${randomNumber}@example.com`;
}

/**
 * Generates a random string of a given length.
 * @param length - The length of the random string.
 * @returns A random string.
 */
export function generateRandomString(length: number = 8): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Formats a date of birth into day, month, and year.
 * @param date - The date of birth as a Date object.
 * @returns An object containing day, month, and year.
 */
export function formatDateOfBirth(date: Date): {
  day: string;
  month: string;
  year: string;
} {
  const day = date.getDate().toString();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear().toString();
  return { day, month, year };
}

/**
 * Registers a new user and returns the user's data.
 * @param page - The Playwright page object.
 * @returns An object containing the user's email and password.
 */
export async function registerUser(
  page: Page
): Promise<{ email: string; password: string; username: string }> {
  await page.goto("http://automationexercise.com");
  await expect(page).toHaveTitle("Automation Exercise");
  await page.click('text="Signup / Login"');
  await expect(page.locator('text="New User Signup!"')).toBeVisible();

  const username = "John Doe";
  const email = generateRandomEmail("john.doe");
  await page.fill('input[name="name"]', username);
  await page.fill('input[data-qa="signup-email"]', email);
  await page.click('button[data-qa="signup-button"]');
  await expect(page.locator('text="Enter Account Information"')).toBeVisible();

  const title = "Mr";
  const password = generateRandomString(10);
  const dob = formatDateOfBirth(new Date(1990, 0, 1));
  await page.click(`input[value="${title}"]`);
  await page.fill('input[data-qa="password"]', password);
  await page.selectOption('select[data-qa="days"]', dob.day);
  await page.selectOption('select[data-qa="months"]', dob.month);
  await page.selectOption('select[data-qa="years"]', dob.year);

  await page.check("input#newsletter");

  await page.check("input#optin");

  const firstName = "John";
  const lastName = "Doe";
  const company = "ABC Inc";
  const address1 = "123 Main St";
  const address2 = "Apt 4B";
  const country = "United States";
  const state = "New York";
  const city = "New York";
  const zipcode = "10001";
  const mobileNumber = "1234567890";

  await page.fill('input[data-qa="first_name"]', firstName);
  await page.fill('input[data-qa="last_name"]', lastName);
  await page.fill('input[data-qa="company"]', company);
  await page.fill('input[data-qa="address"]', address1);
  await page.fill('input[data-qa="address2"]', address2);
  await page.selectOption('select[data-qa="country"]', country);
  await page.fill('input[data-qa="state"]', state);
  await page.fill('input[data-qa="city"]', city);
  await page.fill('input[data-qa="zipcode"]', zipcode);
  await page.fill('input[data-qa="mobile_number"]', mobileNumber);

  await page.click('button[data-qa="create-account"]');
  await expect(page.locator('text="Account Created!"')).toBeVisible();
  await page.click('a[data-qa="continue-button"]');
  await expect(
    page.locator(`a:has-text("Logged in as ${username}")`)
  ).toBeVisible();

  return { email, password, username };
}
