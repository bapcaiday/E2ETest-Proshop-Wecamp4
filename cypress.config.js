import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env:{
      home_url:"/",
      login_url:"/login",
      signup_url:"/register",
      cart_url:"/cart",
      shipping_url:"/shipping",
      payment_url:"/payment",
      placeorder_url:"/placeorder",
    },
    baseUrl: "http://localhost:3000"
  },
});
