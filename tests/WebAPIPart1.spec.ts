import { test, expect, request } from "@playwright/test";
import APIUtils from "./utils/APIUtils";

const loginPayLoad = {
  userEmail: "talakokkulachandrakanth@gmail.com",
  userPassword: "Rahulshetty@rpa1",
};

const ordersPayLoad = {orders: 
[{country: "India", productOrderedId: "67a8dde5c0d3e6622a297cc8"}]}

let token;
let orderId;

test.beforeAll(async () => {

  const apiContext = await request.newContext();
  const apiUtils=new APIUtils(apiContext, loginPayLoad, ordersPayLoad);

  //token
  token=await apiUtils.getToken();

  //OrderId
  orderId=await apiUtils.createOrder();
});

test.beforeEach(() => {});

test("First Playwright test", async ({ page }) => {
  const productName = "ZARA COAT 3";
  const productsLocator = page.locator(".card-body");

  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("button[routerlink*='/dashboard/myorders']").click();


  //Cross checking the order
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
});
