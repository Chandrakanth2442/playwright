import { test, expect } from "@playwright/test";

// test.describe("suite 1", () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto("http://localhost:4200/");
//     await page.getByText("Forms").click();
//   });

//   test("the first test", async ({ page }) => {
//     await page.goto("http://localhost:4200/");
//     await page.getByText("Forms").click();
//     await page.getByText("Form Layouts").click();
//   });

//   test("navigate to datepicker", async ({ page }) => {
//     await page.goto("http://localhost:4200/");
//     await page.getByText("Forms").click();
//     await page.getByText("Form Layouts").click();
//   });
// });

test("First Playwright test", async ({ page }) => {
  const userName = page.locator("#username");
  const password = page.locator("[type='password']");
  const signInBtn = page.locator("#signInBtn");

  // const context = await browser.newContext();
  // const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await userName.fill("rahulshetty");
  await password.fill("learning");
  await signInBtn.click();
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");

  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await signInBtn.click();

  console.log(await page.locator(".card-body a").first().textContent());
});

// test.only("First Playwright test1", async ({ page }) => {
//   await page.goto("https://google.com");
//   console.log(await page.title());
//   await expect(page).toHaveTitle("Google");
// });
