import { test, expect } from "@playwright/test";

test.describe("Registration Flow", () => {
  test("should show the landing page with Get Started button", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByText("Welcome to Acme")).toBeVisible();
    await expect(page.getByRole("link", { name: "Get Started" })).toBeVisible();
  });

  test("should navigate to registration page", async ({ page }) => {
    await page.goto("/");
    await page.click("text=Get Started");
    await expect(page).toHaveURL("/register");
    await expect(page.getByText("Create your account")).toBeVisible();
  });

  test("should show validation error for invalid email", async ({ page }) => {
    await page.goto("/register");
    await page.fill("#name", "Test User");
    await page.fill("#email", "invalid-email");
    await page.fill("#password", "SecurePass1");
    await page.click('button[type="submit"]');

    // Should show server-side validation error
    await expect(page.getByRole("alert")).toBeVisible();
  });

  test("should successfully register with valid data", async ({ page }) => {
    await page.goto("/register");
    await page.fill("#name", "Test User");
    await page.fill("#email", `test-${Date.now()}@example.com`);
    await page.fill("#password", "SecurePass1");
    await page.click('button[type="submit"]');

    // Should redirect to onboarding
    await expect(page).toHaveURL("/onboarding");
  });

  test("should reject duplicate email registration", async ({ page }) => {
    await page.goto("/register");
    await page.fill("#name", "Another User");
    await page.fill("#email", "jane@acme.com"); // Pre-existing user
    await page.fill("#password", "SecurePass1");
    await page.click('button[type="submit"]');

    await expect(page.getByText("Email already registered")).toBeVisible();
  });

  // This test exposes the bug: emails like "user@" should be rejected
  test("should reject email without valid domain", async ({ page }) => {
    await page.goto("/register");
    await page.fill("#name", "Bug Test");
    await page.fill("#email", "user@");
    await page.fill("#password", "SecurePass1");
    await page.click('button[type="submit"]');

    // BUG: This currently passes validation and creates the user
    // Expected: should show validation error
    await expect(page.getByRole("alert")).toBeVisible();
  });
});
