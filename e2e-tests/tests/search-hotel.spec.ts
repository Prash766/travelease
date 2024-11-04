import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Login" }).click();
  await expect(
    page.getByRole("heading", { name: "Welcome back" })
  ).toBeVisible();
  await page.locator('[name="email"]').fill("prash@gmail.com");
  await page.locator('[name="password"]').fill("password");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByText("Logged In Successfully")).toBeVisible();
});

test("Should show hotel search results", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder("Where are you going?").fill("Ireland");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("1 Search Results")).toBeVisible();
  await expect(page.getByText("Dublin Getaways")).toBeVisible();
});
