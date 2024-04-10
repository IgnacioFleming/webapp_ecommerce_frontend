import { Box, Button, Typography } from "@mui/material";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";

import React from "react";
import { Link } from "react-router-dom";

const ConfirmationCheckout = ({ total, totalQuantity, completePurchase }) => {
  const stripe = useStripe();
  const elements = useElements();
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
    console.log(result);

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
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
          <Button type="submit" variant="contained" onClick={completePurchase}>
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
