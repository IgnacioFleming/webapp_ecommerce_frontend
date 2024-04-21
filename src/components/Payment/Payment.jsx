import { loadStripe } from "@stripe/stripe-js";
import ConfirmationCheckout from "../ConfirmationCheckout/ConfirmationCheckout";
import { Elements } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { paymentService } from "../../services/payment";
import { appearance } from "./paymentAppearence";
import { UserContext } from "../../context/UserContext";
const Payment = ({ completePurchase, total, totalQuantity }) => {
  const stripePromise = loadStripe("pk_test_51OSiVAFMHFP7zoxXIkADv1gPSg1H7sS86ExIPqft3PTb7wv6iOGZVyX0W8axI0lQkCqVm9wl3zrz7mSdcS2or1gA00p7snpsoq");

  const [clientSecret, setClientSecret] = useState("");
  const { token } = useContext(UserContext);

  const createPaymentIntent = async () => {
    const paymentIntent = await paymentService.createPaymentIntent({ amount: total * 100, currency: "usd", token });
    return setClientSecret(paymentIntent.clientSecret);
  };
  useEffect(() => {
    const initializePayment = async () => {
      await createPaymentIntent();
    };

    initializePayment();
  }, []);
  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
          <ConfirmationCheckout completePurchase={completePurchase} total={total} totalQuantity={totalQuantity} createPaymentIntent={createPaymentIntent} />;
        </Elements>
      )}
    </>
  );
};

export default Payment;
