import { test, expect } from "@playwright/test";
import { registerUser } from "./helpers/utils";

test("Test Case 1: Register User", async ({ page }) => {
  await registerUser(page);
  await page.click('text="Delete Account"');
  await expect(page.locator('text="Account Deleted!"')).toBeVisible();
  await page.click('a[data-qa="continue-button"]');
});
