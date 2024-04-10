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
    return response;
  }
  async confirmPaymentIntent(paymentInstance, elements) {
    const response = await paymentInstance.confirmPayment({ elements, confirmParams: { redirect: "if_required" } });
    return response;
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
  }
}

export const paymentService = new PaymentService();
