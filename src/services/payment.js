export default class PaymentService {
  constructor() {}
  async createPaymentIntent({ amount, currency, token }) {
    const fetchData = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/payments/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
}

export const paymentService = new PaymentService();
