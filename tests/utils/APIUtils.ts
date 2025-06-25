
import { test, expect, request } from "@playwright/test";

// let token;

export default class APIUtils{

    private apiContext;
    private loginPayLoad;
    private ordersPayLoad;

    constructor(apiContext, loginPayLoad, ordersPayLoad){
        this.apiContext=apiContext;
        this.loginPayLoad=loginPayLoad;
        this.ordersPayLoad=ordersPayLoad;
    }

    async getToken(){
        const loginResponse = await this.apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    { data: this.loginPayLoad }
  );

  expect(loginResponse.ok()).toBeTruthy();
  const loginResponseJson = await loginResponse.json();
  const token = loginResponseJson.token;
  console.log(token);
  return token;
    }

createOrder=async()=>{
            const orderResponse = await this.apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: this.ordersPayLoad,
      headers: {
        "Authorization": await this.getToken(),
        "Content-Type": "application/json",
      },
    }
  );

  const orderResponseJson = await orderResponse.json();
  console.log(orderResponseJson);
  const orderId = orderResponseJson.orders[0];
  return orderId;
    }
}


//  module.exports={APIUtils}