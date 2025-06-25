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

// test("First Playwright test", async ({ page }) => {
//   const userName = page.locator("#username");
//   const password = page.locator("[type='password']");
//   const signInBtn = page.locator("#signInBtn");
//   const itemsInWebsite = page.locator(".card-body a");
//   // const context = await browser.newContext();
//   // const page = await context.newPage();
//   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//   await userName.fill("rahulshetty");
//   await password.fill("learning");
//   await signInBtn.click();
//   console.log(await page.locator("[style*='block']").textContent());
//   await expect(page.locator("[style*='block']")).toContainText("Incorrect");

//   await userName.fill("");
//   await userName.fill("rahulshettyacademy");
//   await signInBtn.click();

//   console.log(await itemsInWebsite.first().textContent());
//   const allTitles = await itemsInWebsite.allTextContents();
//   console.log(allTitles);
// });

test("UI Controls", async ({ page }) => {
  const userName = page.locator("#username");
  const password = page.locator("[type='password']");
  const signInBtn = page.locator("#signInBtn");
  const itemsInWebsite = page.locator(".card-body a");
  const dropdown = page.locator("select.form-control");
  const documentLink = page.locator("[href*='documents-request']");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await userName.fill("rahulshettyacademy");
  await password.fill("learning");
  // await page.pause();
  await dropdown.selectOption("consult");

  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();

  console.log(page.locator(".radiotextsty").last().isChecked());
  expect(page.locator(".radiotextsty").last()).toBeChecked();
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();
  await expect(documentLink).toHaveAttribute("class", "blinkingText");

  await signInBtn.click();

  console.log(await itemsInWebsite.first().textContent());
  const allTitles = await itemsInWebsite.allTextContents();
  console.log(allTitles);
});

test("Child windows handle", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*='documents-request']");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    documentLink.click(),
  ]);
  const text = await newPage.locator(".red").textContent();
  const arrayText = text.split("@");
  console.log(arrayText[0]);
  console.log(arrayText[1]);

  console.log(text);
});

// test.only("First Playwright test1", async ({ page }) => {
//   await page.goto("https://google.com");
//   console.log(await page.title());
//   await expect(page).toHaveTitle("Google");
// });
