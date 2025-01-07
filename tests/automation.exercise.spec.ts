import { test, expect } from "@playwright/test";
import { registerUser } from "./helpers/utils";
import { generateRandomEmail, generateRandomString } from "./helpers/utils";
import path from "path";

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

test("Test Case 5: Register User with existing email", async ({ page }) => {
  const { email, username } = await registerUser(page);

  await page.click('text="Logout"');
  await page.click('a:has-text("Home")');
  await page.goto("http://automationexercise.com");
  await expect(page).toHaveTitle("Automation Exercise");
  await page.click('text="Signup / Login"');
  await expect(page.locator('text="New User Signup!"')).toBeVisible();
  await page.fill('input[name="name"]', username);
  await page.fill('input[data-qa="signup-email"]', email);
  await page.click('button[data-qa="signup-button"]');
  await expect(
    page.locator('text="Email Address already exist!"')
  ).toBeVisible();
});

test("Test Case 6: Contact Us Form", async ({ page }) => {
  await page.goto("http://automationexercise.com");
  await expect(page).toHaveTitle("Automation Exercise");
  await page.click('a:has-text("Contact Us")');
  await expect(page.locator('text="Get In Touch"')).toBeVisible();
  await page.fill('input[name="name"]', "John Doe");
  await page.fill('input[name="email"]', "johndoe@example.com");
  await page.fill('input[name="subject"]', "Test Subject");
  await page.fill('textarea[name="message"]', "This is a test message.");
  const filePath = path.join(__dirname, "../test_cases.pdf");
  await page.setInputFiles('input[name="upload_file"]', filePath);
  page.once("dialog", async (dialog) => {
    await dialog.accept();
  });
  await page.click('input[value="Submit"]');
  await page.waitForSelector(".contact-form .alert-success");
  await expect(page.locator(".contact-form .alert-success")).toBeVisible();
  await page.click('a:has-text("Home")');
  await expect(page).toHaveTitle("Automation Exercise");
});

test("Test Case 7: Verify Test Cases Page", async ({ page }) => {
  await page.goto("http://automationexercise.com");
  await expect(page).toHaveTitle("Automation Exercise");
  await page.click('a:has-text("Test Cases")');
  await expect(page.locator(".title.text-center")).toBeVisible();
});

test("Test Case 8: Verify All Products and product detail page", async ({
  page,
}) => {
  await page.goto("http://automationexercise.com");
  await expect(page).toHaveTitle("Automation Exercise");
  await page.click('a:has-text("Products")');
  await expect(page.locator(".title.text-center")).toBeVisible();

  await expect(page.locator(".features_items")).toBeVisible();

  await page.click(
    '.features_items .product-image-wrapper >> nth=0 >> a:has-text("View Product")'
  );
  const productInfo = page.locator(".product-information");
  await expect(productInfo).toBeVisible();
  await expect(productInfo.locator("h2")).toBeVisible(); // Product name
  await expect(productInfo.locator("p >> nth=0")).toBeVisible(); // Category
  await expect(productInfo.locator("span >> nth=1")).toBeVisible(); // Price
  await expect(productInfo.locator("p >> nth=1")).toBeVisible(); // Availability
  await expect(productInfo.locator("p >> nth=2")).toBeVisible(); // Condition
  await expect(productInfo.locator("p >> nth=3")).toBeVisible(); // Brand
});

test("Test Case 9: Search Product", async ({ page }) => {
  await page.goto("http://automationexercise.com");
  await expect(page).toHaveTitle("Automation Exercise");
  await page.click('a:has-text("Products")');
  await expect(page.locator(".title.text-center")).toBeVisible();
  await expect(page.locator(".features_items")).toBeVisible();
  // You can modify this search term as needed
  const searchTerm = "Blue Top";
  await page.fill("#search_product", searchTerm);
  await page.click("#submit_search");
  await expect(page.locator('h2:has-text("Searched Products")')).toBeVisible();
  const searchResults = page.locator(".features_items .product-image-wrapper");
  await expect(searchResults).toBeVisible();
  const searchResultsCount = await searchResults.count();
  await expect(searchResultsCount).toBeGreaterThan(0);
  for (let i = 0; i < searchResultsCount; i++) {
    const productName = await searchResults
      .nth(i)
      .locator(".productinfo p")
      .textContent();
    expect(productName?.toLowerCase()).toContain(searchTerm.toLowerCase());
  }
});
