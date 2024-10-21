import { test, expect } from '@playwright/test'
import path from 'path'
const UI_URL = 'http://localhost:5173'
test.beforeEach(async({page})=>{
    await page.goto(UI_URL);
    //get the login button
    await page.getByRole("link" , {name:"Login"}).click()
    await expect(page.getByRole("heading" ,{name:"Welcome back"})).toBeVisible()
    await page.locator("[name=email]").fill("prash@gmail.com")
    await page.locator("[name=password]").fill("password")
    await page.getByRole("button" ,{name:"Sign in"}).click()
    await expect(page.getByText("Logged In Successfully")).toBeVisible()
})
test('User should be able to add a hotel' , async({page})=>{
    await page.goto(`${UI_URL}/add-hotel`)
    
    await expect(page.getByRole("heading" ,{name:"Hotel Registration"})).toBeVisible()

    await page.locator("[name=name]").fill("Azure Skyline Resort")
    await page.locator("[name=type]").selectOption("Resort")
    await page.locator("[name=country]").fill("India")
    await page.locator("[name=city]").fill("Delhi")
    await page.locator("[name=adultCount]").fill("2")
    await page.locator("[name=childCount]").fill("2")
    await page.locator("[name=description]").fill("A high-end resort offering breathtaking views of the skyline, perfect for urban escapes.")

    const slider = await page.locator("[name=pricePerNight]")
    const sliderWidth = await slider.evaluate(el => el.getBoundingClientRect().width)
    await slider.click({ force: true, position: { x: (sliderWidth / 3), y: 0 } }) 


    await page.locator('button:has(svg.lucide-star)').nth(2).click();

const selectedStarsCount = await page.locator('svg.lucide-star[fill="#FFFF00"]').count();
 expect(selectedStarsCount).toBe(3);  // This is the corrected part


    await page.getByRole("button", {name: "Wi-fi"}).click()
    await page.getByRole("button", {name: "TV"}).click()

    await page.setInputFiles('[name=imageFiles]', [
        path.join(__dirname, "files" , "2.jpeg"),
        path.join(__dirname, "files" , "3.jpg")
    ])

    await page.getByRole("button", {name:"Register Hotel"}).click()

    await expect(page.getByText("Hotel Added")).toBeVisible()
})

test("should display hotels", async ({ page }) => {
    await page.goto(`${UI_URL}/myHotels`);
  
    await expect(page.getByRole("heading", { name: "Azure Skyline Resort" })).toBeVisible();
    await expect(page.getByText("₹3500")).toBeVisible();
    await expect(page.getByText("Delhi, India")).toBeVisible();
    const selectedStars = await page.locator('svg.lucide-star.text-yellow-400').count();

    await expect(selectedStars).toBe(3);
   
    await expect(page.locator('svg.lucide-users')).toBeVisible(); 
    await expect(page.getByText("2 Adults")).toBeVisible(); 
    await expect(page.getByText("2 Children")).toBeVisible(); 
  
    await expect(page.getByRole("button", { name: "View Details" })).toBeVisible();
  });
  


