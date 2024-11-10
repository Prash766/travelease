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

test('should book hotel', async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder("Where are you going?").fill("Ireland");

  const checkInDate = new Date();
  checkInDate.setDate(checkInDate.getDate() + 3);
  const formattedCheckIn = checkInDate.toLocaleDateString("en-GB").split("/").reverse().join("-");

  const checkOutDate = new Date();
  checkOutDate.setDate(checkOutDate.getDate() + 6);
  const formattedCheckOut = checkOutDate.toLocaleDateString("en-GB").split("/").reverse().join("-");

  await page.waitForSelector('input[name="checkIn"]');
  await page.locator('input[name="checkIn"]').fill(formattedCheckIn);

  await page.waitForSelector('input[name="checkOut"]');
  await page.locator('input[name="checkOut"]').fill(formattedCheckOut);

  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("1 Search Results")).toBeVisible();

  await page.getByText("Dublin Getaways").click();
  await page.getByRole("button", { name: "Book Now" }).click();

  await expect(page.getByText("Total: $357")).toBeVisible();

  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame.locator('[placeholder="Card number"]').fill("4242424242424242");
  await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/29");
  await stripeFrame.locator('[placeholder="CVC"]').fill("123");
  await stripeFrame.locator('[placeholder="ZIP"]').fill("12345");

  await page.getByRole("button", { name: "Confirm Booking" }).click();
  await expect(page.getByText("Booking Successful")).toBeVisible();
});
