import { Box, Button, TextField, Typography } from "@mui/material";

import React from "react";
import { Link } from "react-router-dom";

const ConfirmationCheckout = ({ total, totalQuantity, completePurchase }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" mt={11} color="initial">
        Por favor completá tus datos para continuar
      </Typography>
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
    </Box>
  );
};

export default ConfirmationCheckout;
