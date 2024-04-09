import { useStripe } from "@stripe/react-stripe-js";

export default class PaymentService {
  constructor() {}
  async createPaymentIntent({ amount, currency }) {
    const fetchData = await fetch("http://localhost:8080/api/payments/create-payment-intent", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, currency }),
    });
    const response = await fetchData.json();
    console.log(response);
  }
  async confirmPaymentIntent(paymentInstance, clientSecret) {
    const response = await paymentInstance.confirmPayment({ clientSecret });
    console.log(response);
  }
  async createPaymentMethod(paymentInstance) {
    const paymentMethodData = {
      type: "card",
      card: {
        number: "4242424242424242",
        exp_month: 8,
        exp_year: 2026,
        cvc: "314",
      },
    };
    const response = await paymentInstance.paymentMethods.create();
    console.log(response);
  }
}
