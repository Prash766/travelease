import { test, expect } from '@playwright/test';

const UI_URL = 'http://localhost:5173'

test('should allow user to log in', async ({ page }) => {
  await page.goto(UI_URL);
  //get the login button
  await page.getByRole("link" , {name:"Login"}).click()
  await expect(page.getByRole("heading" ,{name:"Welcome back"})).toBeVisible()
  await page.locator("[name=email]").fill("something@gmail.com")
  await page.locator("[name=password]").fill("password")
  await page.getByRole("button" ,{name:"Sign in"}).click()
  await expect(page.getByText("Logged In Successfully")).toBeVisible()
  await expect(page.getByRole("link" , {name:"My Bookings"})).toBeVisible()
  await expect(page.getByRole("link" , {name:"My Hotels"})).toBeVisible()
  await expect(page.getByRole("button" , {name:"Sign Out"})).toBeVisible()

});

test('should allow user to register' , async({page})=>{
  const test_email= `test_email${(Math.random()*80000)+1000}@gmail.com`
  await page.goto(UI_URL)
  await page.getByRole("link", {name:"Signup"}).click()
  await expect(page.getByRole("heading" ,{name:"Create an account"})).toBeVisible()
  await page.locator("[name=firstName]").fill("John")
  await page.locator("[name=lastName]").fill("Doe")
  await page.locator("[name=email]").fill(test_email)
  await page.locator("[name=password]").fill("password")
  await page.locator("[name=confirmPassword]").fill("password")
  await page.getByRole("button", {name:"Create Account"}).click()
  await expect(page.getByText("Registration Success!")).toBeVisible()
  await expect(page.getByRole("link" , {name:"My Bookings"})).toBeVisible()
  await expect(page.getByRole("link" , {name:"My Hotels"})).toBeVisible()
  await expect(page.getByRole("button" , {name:"Sign Out"})).toBeVisible()

})
