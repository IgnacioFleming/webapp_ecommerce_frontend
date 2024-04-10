import { Box, Button, Typography } from "@mui/material";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";

import React from "react";
import { Link } from "react-router-dom";

const ConfirmationCheckout = ({ total, totalQuantity, completePurchase }) => {
  const stripe = useStripe();
  const elements = useElements();
  let initializePurchaseConfirmation;
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      redirect: "if_required",
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)

      Swal.fire({
        title: "Error! The Payment was declined",
        icon: "error",
        text: "Please try using another payment method or try again later",
        confirmButtonText: "OK",
      });
      initializePurchaseConfirmation = () => completePurchase(true);
      return;
    } else {
      initializePurchaseConfirmation = () => completePurchase();
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
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" mt={11} color="initial">
          Por favor completá tus datos de pago
        </Typography>
        <PaymentElement />
        <Typography variant="h5" color="initial" mt={10} mb={5}>
          Cantidad de items: {totalQuantity}
        </Typography>
        <Typography variant="h5" color="initial" mt={5} mb={10}>
          Total de la Compra: $ {total}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 5 }}>
          <Button type="submit" variant="contained" onClick={initializePurchaseConfirmation}>
            Confirmar Compra
          </Button>

          <Link to="/cart">
            <Button type="button" variant="contained">
              Volver
            </Button>
          </Link>
        </Box>
      </form>
    </Box>
  );
};

export default ConfirmationCheckout;
