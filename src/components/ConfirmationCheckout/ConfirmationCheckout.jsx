import { Box, Button, Typography } from "@mui/material";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";

const ConfirmationCheckout = ({ total, totalQuantity, completePurchase }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (result.error) {
      console.log("no tengo que entrar aca");
      await completePurchase(true);
      Swal.fire({
        title: "Error! The Payment was declined",
        icon: "error",
        text: "Please try using another payment method or try again later",
        confirmButtonText: "OK",
      });
      elements.getElement(PaymentElement).clear();
    } else {
      console.log("tengo que entrar aca");
      await completePurchase();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit} role="form">
        <Typography variant="h5" mt={11} color="initial">
          Please complete your payment details
        </Typography>
        <PaymentElement options={{ business: { name: "The Office Store" }, paymentMethodOrder: ["s"] }} />
        <Typography variant="h5" color="initial" mt={10} mb={5}>
          Items Quantity: {totalQuantity}
        </Typography>
        <Typography variant="h5" color="initial" mt={5} mb={10}>
          Total Amount: $ {total}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 5 }}>
          <Button type="submit" variant="contained">
            Confirm Purchase
          </Button>

          <Link to="/cart">
            <Button type="button" variant="contained">
              Go Back
            </Button>
          </Link>
        </Box>
      </form>
    </Box>
  );
};

export default ConfirmationCheckout;
