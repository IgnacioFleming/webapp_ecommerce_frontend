import { loadStripe } from "@stripe/stripe-js";
import ConfirmationCheckout from "../ConfirmationCheckout/ConfirmationCheckout";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { paymentService } from "../services/payment";

const Payment = ({ completePurchase, total, totalQuantity }) => {
  const stripePromise = loadStripe("pk_test_51OSiVAFMHFP7zoxXIkADv1gPSg1H7sS86ExIPqft3PTb7wv6iOGZVyX0W8axI0lQkCqVm9wl3zrz7mSdcS2or1gA00p7snpsoq");
  const [clientSecret, setClientSecret] = useState("");
  const options = {
    clientSecret,
    appearence: { theme: "stripe" },
  };
  const createPaymentIntent = async () => {
    const paymentIntent = await paymentService.createPaymentIntent({ amount: 1200, currency: "usd" });
    return paymentIntent;
  };
  useEffect(() => {
    if (!clientSecret) {
      const result = createPaymentIntent().then((res) => {
        console.log(res);
        setClientSecret(res.clientSecret);
      });
    }
  }, [clientSecret]);
  console.log(clientSecret);
  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <ConfirmationCheckout completePurchase={completePurchase} total={total} totalQuantity={totalQuantity} />;
        </Elements>
      )}
    </>
  );
};

export default Payment;
