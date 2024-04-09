import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
  const stripePromise = loadStripe("pk_test_51OSiVAFMHFP7zoxXIkADv1gPSg1H7sS86ExIPqft3PTb7wv6iOGZVyX0W8axI0lQkCqVm9wl3zrz7mSdcS2or1gA00p7snpsoq");
};

export default Payment;
