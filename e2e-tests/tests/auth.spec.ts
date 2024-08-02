import { test, expect } from '@playwright/test';

const UI_URL="http://localhost:5173"

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  // Get the signin button
  await page.getByRole("link", { name: "Sign In"}).click();

  await expect(page.getByRole("heading", { name: "Sign In"})).toBeVisible();

  // Fill out the form
  await page.locator("[name=email]").fill("1@example.com");
  await page.locator("[name=password]").fill("John123!");
  await page.getByRole("button", { name: "Login" }).click();

  // Expects to be redirected to the dashboard.
  await expect(page.getByText("Sign in Successful!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out"})).toBeVisible();
});

/**
 * Tests that checks whether the registration functionality works properly
 */
test("should allow the user to register", async ({ page }) => {
  const testEmail = `test_register_${Math.floor(Math.random() * 90000) + 10000}@example.com`;
  await page.goto(UI_URL);

  // Click on the Register link
  await page.getByRole("link", { name: "Sign In"}).click();
  await page.getByRole("link", { name: "Create an account here"}).click();

  await expect(page.getByRole("heading", { name: "Create an Account"})).toBeVisible();

  // Fill out the form
  await page.locator("[name=firstName]").fill("Jane");
  await page.locator("[name=lastName]").fill("Doe");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("Jane123!");
  await page.locator("[name=confirmPassword]").fill("Jane123!");
  await page.getByRole("button", { name: "Create account" }).click();

  // Expects to be redirected to the dashboard.
  await expect(page.getByText("Registration Success!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out"})).toBeVisible();
})