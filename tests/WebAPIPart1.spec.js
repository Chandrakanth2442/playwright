import { test, expect } from "@playwright/test";

test.beforeAll(() => {});

test.beforeEach(() => {});

test("First Playwright test", async ({ page }) => {
  const productName = "ZARA COAT 3";
  // const productsLocator = page.locator(
  //   "//div[@class='card-body']//descendant::b"
  // );
  const productsLocator = page.locator(".card-body");

  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("talakokkulachandrakanth@gmail.com");
  await page.locator("#userPassword").fill("Rahulshetty@rpa1");
  await page.locator("#login").click();
  // await page.waitForLoadState("networkidle");
  await productsLocator.first().waitFor();
  const products = await productsLocator.allTextContents();
  // const titles = await page.locator(".card-body b").allTextContents();

  const count = await productsLocator.count();

  for (let i = 0; i < count; i++) {
    const text = await productsLocator.nth(i).locator("b").textContent();
    if (text?.trim() === productName) {
      await productsLocator.nth(i).locator("text=Add To Cart").click();
      break;
    }
  }

  await page.locator("[routerlink*='/dashboard/cart']").click();
  await page.locator("text=Checkout").waitFor();

  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  await page.locator("text=Checkout").click();
  await page.locator("text=Place Order").waitFor();
  await page
    .locator("[placeholder*='Country']")
    .pressSequentially("Ind", { delay: 100 });
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const links = await dropdown.locator("button").count();
  await dropdown.locator("button");
  for (let i = 0; i < links; i++) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }
  // await page.pause();
  // expect(page.locator(".user__name")).toHaveText(
  //   "talakokkulachandrakanth@gmail.com"
  // );

  await page.locator(".action__submit").click();
  await page.locator("text=dummywebsite@rahulshettyacademy.com").waitFor();
  expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderId);

  await page.locator("button[routerlink*='/dashboard/myorders']").click();
  // await page.locator("button[routerlink*='/dashboard/cart']").waitFor();
  const table = page.locator("tbody .ng-star-inserted");
  await table.last().waitFor();
  const orders = await table.count();
  console.log(orders);
  for (let i = 0; i < orders; i++) {
    const text = await page
      .locator("tr.ng-star-inserted th")
      .nth(i)
      .textContent();
    console.log(text);
    if (orderId.includes(text)) {
      console.log("Order found in orders");
      break;
    } else {
      console.log("Order not found");
    }
  }

  // const cartProducts = page.locator(".itemNumber");
  // const cartSize = await cartProducts.count();

  // for (let i = 0; i < cartSize; i++) {
  //   const text = await productsLocator.nth(i).locator("h3").textContent();
  //   console.log(text);
  //   if (text === productName) {
  //     console.log("Item matches");
  //   }
  // }

  // console.log(products);
});
