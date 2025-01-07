# QA Automation Testing

This repository contains end-to-end tests implemented using Playwright.

## Prerequisites

- Node.js (v18 or higher)
- npm (Node Package Manager)

## Installation

```bash
npm install
```

## Running Tests

Tests run in non-headless mode by default, but you can also explicitly specify it:

```bash
npx playwright test --headed
```

For additional options, you can run:

```bash
npx playwright test --help
```

```bash
npx playwright test --headed
```

To run specific test cases:

```bash
# Run Test Case 1
npx playwright test --headed --grep "Test Case 1: Register User"

# Run Test Case 2
npx playwright test --headed --grep "Test Case 2: Login User with correct email and password"

# Run Test Case 3
npx playwright test --headed --grep "Test Case 3: Login User with incorrect email and password"

# Run Test Case 4
npx playwright test --headed --grep "Test Case 4: Logout User"

# Run Test Case 5
npx playwright test --headed --grep "Test Case 5: Register User with existing email"

# Run Test Case 6
npx playwright test --headed --grep "Test Case 6: Contact Us Form"

# Run Test Case 7
npx playwright test --headed --grep "Test Case 7: Verify Test Cases Page"

# Run Test Case 8
npx playwright test --headed --grep "Test Case 8: Verify All Products and product detail page"

# Run Test Case 9
npx playwright test --headed --grep "Test Case 9: Search Product"
```

## Test Case Overview

Test Case 1: Register User

Test Case 2: Login User with correct email and password

Test Case 3: Login User with incorrect email and password

Test Case 4: Logout User

Test Case 5: Register User with existing email

Test Case 6: Contact Us Form

Test Case 7: Verify Test Cases Page

Test Case 8: Verify All Products and product detail page

Test Case 9: Search Product

## Test Cases

The test cases are documented in the `test_cases.pdf` file located in the root directory. Please refer to this document for detailed test scenarios and expected behaviors.

## Configuration

Tests are configured to run in Chromium by default. To modify browser settings or other configurations, check the `playwright.config.ts` file.

## Project Structure

```
├── tests/          # Test files
├── test_cases.pdf  # Documented test scenarios
└── README.md       # This file
```

## Additional Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Test Cases Document](./test_cases.pdf)
