class ApiUtils {
  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  async getAuthToken() {
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/client/#/auth/login",
      { data: this.loginPayload }
    );

    const loginResJson = await loginResponse.json();
    let token = loginResJson.token;
    return token;
  }

  async createOrder(orderPayLoad) {
    let response = {};
    response.autToken = await this.getAuthToken();

    const orderRes = await this.apiContext.post(
      "https://rahulshettyacademy.com/client/#/auth/login",
      {
        data: orderPayLoad,
        headers: {
          Authorization: response.autToken,
          "Content-Type": "application/json",
        },
      }
    );

    const orderResJson = await orderRes.json();
    response.orderId = orderResJson?.orders[0];
    return response;
  }
}

export default ApiUtils;
