import { jwt } from "../utils/utils";

export default class PaymentService {
  constructor() {}
  async createPaymentIntent({ amount, currency }) {
    const fetchData = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/payments/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
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
  // async createPaymentMethod(paymentInstance) {
  //   const paymentMethodData = {
  //     type: "card",
  //     card: {
  //       number: "4242424242424242",
  //       exp_month: 8,
  //       exp_year: 2026,
  //       cvc: "314",
  //     },
  //   };
  //   const response = await paymentInstance.paymentMethods.create();
  // }
}

export const paymentService = new PaymentService();
