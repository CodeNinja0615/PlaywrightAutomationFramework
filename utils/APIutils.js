class APIutils
{
    
    constructor(apiContext, loginPayload)
    {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }
    async getToken()
    {
        const loginResponse = await  this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',  // Make a POST request to the login endpoint
            {
                data: this.loginPayload // Pass the login payload
            });
        const loginResponseJson = await loginResponse.json(); // Parse the response JSON
        const token = loginResponseJson.token; // Extract the token from the response
        console.log(token);
        return token
    }
    async createOrder(orderPayload)
    {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data: orderPayload,
                headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                }
            });
        const orderResJson = await orderResponse.json();
        const orderID = orderResJson.orders[0];
        console.log(orderResJson);
        response.orderID = orderID;
        return response;
    }
}

module.exports = {APIutils};