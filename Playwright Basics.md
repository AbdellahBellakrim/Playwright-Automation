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
