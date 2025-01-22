### **Playwright Basics in a Nutshell**

#### **1. What is Playwright?**

- Playwright is a **Node.js library** for automating browsers (Chromium, Firefox, WebKit).
- It allows you to write **end-to-end tests** for web applications.
- It’s fast, reliable, and works across multiple browsers.

---

#### **2. Core Features of Playwright**

Here are the key features you need to know:

1. **Cross-Browser Support**:

   - Playwright supports **Chromium**, **Firefox**, and **WebKit** (Safari).
   - Write once, run on all browsers.

2. **Auto-Waiting**:

   - Playwright **automatically waits** for elements to be visible, clickable, or ready before interacting with them.
   - No need to manually add `sleep()` or `wait()` calls.

3. **Selectors**:

   - Playwright uses **CSS selectors**, **XPath**, or **text-based selectors** to locate elements.
   - Example:
     ```javascript
     await page.click("button#submit"); // CSS selector
     await page.click('text="Login"'); // Text-based selector
     ```

4. **Interactions**:

   - You can **click**, **type**, **hover**, **scroll**, and more.
   - Example:
     ```javascript
     await page.click("button#submit");
     await page.type("input#username", "testuser");
     ```

5. **Assertions**:

   - Use assertions to **verify** that elements have the expected state.
   - Example:
     ```javascript
     expect(await page.isVisible('text="Welcome"')).toBeTruthy();
     ```

6. **Navigation**:

   - Navigate to URLs, go back, forward, or reload the page.
   - Example:
     ```javascript
     await page.goto("https://example.com");
     await page.goBack();
     ```

7. **Handling Popups and Dialogs**:

   - Playwright can handle **alerts**, **confirmations**, and **prompts**.
   - Example:
     ```javascript
     page.on("dialog", async (dialog) => {
       console.log(dialog.message());
       await dialog.accept();
     });
     ```

8. **Frames and Tabs**:

   - Easily switch between **iframes** and **browser tabs**.
   - Example:
     ```javascript
     const frame = page.frame("iframe-name");
     await frame.click("button");
     ```

9. **Network Control**:

   - Intercept and modify network requests (e.g., mock API responses).
   - Example:
     ```javascript
     await page.route("**/api/data", (route) =>
       route.fulfill({ body: "mocked data" })
     );
     ```

10. **Screenshots and Videos**:

    - Capture **screenshots** or record **videos** of test runs.
    - Example:
      ```javascript
      await page.screenshot({ path: "screenshot.png" });
      ```

11. **Parallel Testing**:
    - Run tests in parallel across multiple browsers or devices.

---

#### **3. Basic Playwright Test Structure**

A Playwright test typically looks like this:

```javascript
const { test, expect } = require("@playwright/test");

test("Example Test", async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.goto("https://example.com");

  // Step 2: Interact with elements
  await page.click('text="Get Started"');

  // Step 3: Assert something
  expect(await page.isVisible('text="Welcome"')).toBeTruthy();
});
```

---

#### **4. Key Concepts to Learn**

1. **Test Hooks**:

   - `test.beforeEach` and `test.afterEach` for setup and teardown.
   - Example:
     ```javascript
     test.beforeEach(async ({ page }) => {
       await page.goto("https://example.com");
     });
     ```

2. **Page Object Model (POM)**:

   - A design pattern to organize your tests by creating reusable objects for each page.
   - Example:
     ```javascript
     class LoginPage {
       constructor(page) {
         this.page = page;
       }
       async login(username, password) {
         await this.page.type("#username", username);
         await this.page.type("#password", password);
         await this.page.click("#submit");
       }
     }
     ```

3. **Configuration**:

   - Use `playwright.config.js` to configure browsers, timeouts, and more.
   - Example:
     ```javascript
     module.exports = {
       timeout: 30000, // Global timeout
       use: {
         browserName: "chromium",
         headless: false, // Run in headed mode
       },
     };
     ```

4. **Debugging**:
   - Use `playwright inspector` to debug tests interactively.
   - Run tests with:
     ```bash
     npx playwright test --debug
     ```

---

#### **5. Quick Cheat Sheet**

| **Action**       | **Code Example**                                        |
| ---------------- | ------------------------------------------------------- |
| Navigate to URL  | `await page.goto('https://example.com');`               |
| Click an element | `await page.click('button#submit');`                    |
| Type text        | `await page.type('input#username', 'testuser');`        |
| Check visibility | `await page.isVisible('text="Welcome"');`               |
| Assertion        | `expect(await page.textContent('h1')).toBe('Welcome');` |
| Take screenshot  | `await page.screenshot({ path: 'screenshot.png' });`    |
| Handle dialog    | `page.on('dialog', dialog => dialog.accept());`         |

---
Handling flaky tests is a common challenge in automation testing, including when using Playwright. Flaky tests are tests that sometimes pass and sometimes fail without any changes to the code. Here’s how you can handle flaky tests in Playwright:

---

### **1. Identify the Root Cause**
Before fixing flaky tests, you need to understand why they are flaky. Common causes include:
- **Timing Issues:** The test runs faster or slower than expected due to network latency or UI rendering delays.
- **Asynchronous Operations:** The test doesn’t wait for an element or action to complete.
- **Environment Differences:** Tests behave differently in different environments (e.g., local vs. CI/CD).
- **External Dependencies:** Tests relying on external APIs, databases, or services that may be unstable.
- **Random Data:** Tests using random or dynamic data that changes between runs.

---

### **2. Strategies to Handle Flaky Tests**

#### **a. Use Playwright’s Auto-Waiting Feature**
Playwright automatically waits for elements to be actionable (e.g., visible, enabled) before interacting with them. However, if your test still fails due to timing issues:
- Use `page.waitForSelector()` or `page.waitForTimeout()` (as a last resort) to explicitly wait for elements or conditions.
- Avoid hard-coded waits (`page.waitForTimeout()`) as much as possible, as they can slow down tests and mask underlying issues.

Example:
```javascript
await page.waitForSelector('#submit-button', { state: 'visible' });
await page.click('#submit-button');
```

---

#### **b. Retry Failed Tests**
Playwright supports test retries out of the box. You can configure retries in the `playwright.config.js` file to rerun flaky tests automatically.

Example:
```javascript
module.exports = {
  retries: 2, // Retry failed tests up to 2 times
};
```

---

#### **c. Mock External Dependencies**
If your tests rely on external APIs or services, use mocking to eliminate unpredictability. Playwright allows you to intercept and mock network requests.

Example:
```javascript
await page.route('https://api.example.com/data', route => {
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ data: 'mocked data' }),
  });
});
```

---

#### **d. Use Stable Selectors**
Ensure your selectors are robust and not prone to change. Avoid using dynamic or overly specific selectors (e.g., XPath with hard-coded indices).

Example:
```javascript
// Bad: Fragile selector
await page.click('div > ul > li:nth-child(3) > button');

// Good: Stable selector
await page.click('[data-testid="submit-button"]');
```

---

#### **e. Run Tests in Isolation**
Flaky tests can sometimes fail due to shared state between tests. Ensure each test is independent and doesn’t rely on the state of previous tests.

- Use `test.describe` to group related tests.
- Reset the application state before each test (e.g., clear cookies, local storage, or database).

---

#### **f. Debug Flaky Tests**
Use Playwright’s debugging tools to investigate flaky tests:
- Run tests in headed mode (`headless: false`) to observe the browser behavior.
- Use `playwright inspector` to step through the test execution.
- Add logs (`console.log()`) to track the test flow.

Example:
```javascript
test('example test', async ({ page }) => {
  console.log('Navigating to the page...');
  await page.goto('https://example.com');
  console.log('Clicking the button...');
  await page.click('#submit-button');
});
```

---

#### **g. Analyze Flaky Tests in CI/CD**
If flaky tests occur in CI/CD pipelines:
- Check for differences between local and CI environments (e.g., browser versions, network conditions).
- Use Playwright’s trace viewer to capture detailed logs and screenshots of test runs.

Example:
```javascript
await page.context().tracing.start({ screenshots: true, snapshots: true });
await page.click('#submit-button');
await page.context().tracing.stop({ path: 'trace.zip' });
```

---

### **3. Best Practices to Prevent Flaky Tests**
- **Write Atomic Tests:** Each test should focus on a single functionality.
- **Use Reliable Assertions:** Ensure assertions are specific and deterministic.
- **Run Tests in Parallel:** Playwright supports parallel test execution, but ensure tests don’t interfere with each other.
- **Monitor Flaky Tests:** Track flaky tests over time and address them promptly.

---

### **Example of Fixing a Flaky Test**
Suppose you have a flaky test that fails because a button isn’t always clickable:

```javascript
test('submit form', async ({ page }) => {
  await page.goto('https://example.com');
  await page.click('#submit-button'); // Flaky because the button isn't always ready
});
```

**Fix:**
```javascript
test('submit form', async ({ page }) => {
  await page.goto('https://example.com');
  await page.waitForSelector('#submit-button', { state: 'visible' }); // Wait for the button
  await page.click('#submit-button');
});
```
---

#### **6. Next Steps**

1. Install Playwright:
   ```bash
   npm init playwright@latest
   ```
2. Run the sample tests:
   ```bash
   npx playwright test
   ```
3. Explore the Playwright documentation: [Playwright Docs](https://playwright.dev/docs/intro)
