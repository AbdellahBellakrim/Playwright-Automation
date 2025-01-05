import { test, expect } from "@playwright/test";

test("Test Case 1: Register User", async ({ page }) => {
  // Step 2: Navigate to the homepage
  await page.goto("http://automationexercise.com");

  // Step 3: Verify the homepage is visible
  await expect(page).toHaveTitle("Automation Exercise");

  // Step 4: Click on 'Signup / Login' button
  await page.click('text="Signup / Login"');

  // Step 5: Verify 'New User Signup!' is visible
  await expect(page.locator('text="New User Signup!"')).toBeVisible();

  // Step 6: Enter name and email
  await page.fill('input[name="name"]', "leete222st4222");
  await page.fill(
    'input[data-qa="signup-email"]',
    `test${Date.now()}@example.com`
  );

  // Step 7: Click 'Signup' button
  await page.click('button[data-qa="signup-button"]');

  // Step 8: Verify 'ENTER ACCOUNT INFORMATION' is visible (I changed to text from ENTER ACCOUNT INFORMATION' to 'Enter Account Information')
  await expect(page.locator('text="Enter Account Information"')).toBeVisible();

  // Step 9: Fill account information
  await page.click('input[value="Mr"]');
  await page.fill('input[data-qa="password"]', "password1337Temp");
  await page.selectOption('select[data-qa="days"]', "27");
  await page.selectOption('select[data-qa="months"]', "January");
  await page.selectOption('select[data-qa="years"]', "2018");

  // Step 10: Select 'Sign up for our newsletter!' checkbox
  await page.check("input#newsletter");

  // Step 11: Select 'Receive special offers from our partners!' checkbox
  await page.check("input#optin");

  // Step 12: Fill address details
  await page.fill('input[data-qa="first_name"]', "John");
  await page.fill('input[data-qa="last_name"]', "Doe");
  await page.fill('input[data-qa="company"]', "ABC Inc");
  await page.fill('input[data-qa="address"]', "123 Main St");
  await page.fill('input[data-qa="address2"]', "Apt 4B");
  await page.selectOption('select[data-qa="country"]', "United States");
  await page.fill('input[data-qa="state"]', "New York");
  await page.fill('input[data-qa="city"]', "New York");
  await page.fill('input[data-qa="zipcode"]', "10001");
  await page.fill('input[data-qa="mobile_number"]', "1234567890");

  // Step 13: Click 'Create Account' button
  await page.click('button[data-qa="create-account"]');

  // Step 14: Verify 'ACCOUNT CREATED!' is visible
  await expect(page.locator('text="Account Created!"')).toBeVisible();

  // Step 15: Click 'Continue' button
  await page.click('a[data-qa="continue-button"]');

  // Step 16: Verify 'Logged in as username' is visible
  await expect(
    page.locator('a:has-text("Logged in as leete222st4222")')
  ).toBeVisible();

  // Step 17: Click 'Delete Account' button
  await page.click('text="Delete Account"');

  // Step 18: Verify 'ACCOUNT DELETED!' is visible
  await expect(page.locator('text="Account Deleted!"')).toBeVisible();
});
