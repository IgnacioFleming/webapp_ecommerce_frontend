export default class PaymentService {
  constructor() {}
  async createPaymentIntent() {
    const fetchData = await fetch("http://localhost:8080/api/payments/create-payment-intent", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 1000, currency: "usd" }),
    });
    const response = await fetchData.json();
    console.log(response);
  }
}
