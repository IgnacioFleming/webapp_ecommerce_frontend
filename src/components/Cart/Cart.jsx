import { Box, Button, Divider, Grid, List, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import StackOfProducts from "../StackOfProducts/StackOfProducts";

const boxStyle = {
  paddingTop: 5,
  paddingBottom: 5,
  display: "flex",
};

const Cart = ({ cart, deleteFromCart, totalAmount, setCartEmpty }) => {
  if (cart.length == 0) {
    boxStyle.justifyContent = "center";
    boxStyle.width = "100%";
  } else {
    boxStyle.justifyContent = "flex-end";
    boxStyle.width = "80%";
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <StackOfProducts array={cart} hasDeleteAction />
      <List sx={{ width: "80%" }}>
        {cart.length > 0 && (
          <>
            <Divider variant="fullWidth"></Divider>
            <Box sx={boxStyle}>
              <Typography variant="h4" color="initial">
                Total : {totalAmount}
              </Typography>
            </Box>
            <Divider variant="fullWidth"></Divider>
          </>
        )}
        {cart.length == 0 && (
          <>
            <Box sx={boxStyle}>
              <Typography variant="h4" color="initial">
                Aún no agregaste productos al Carrito
              </Typography>
            </Box>
          </>
        )}
        <Box sx={{ ...boxStyle, gap: 2 }}>
          {cart.length > 0 && (
            <>
              <Link to="/checkout">
                <Button size="large" variant="contained">
                  Terminar Compra
                </Button>
              </Link>

              <Button size="large" variant="contained" onClick={setCartEmpty}>
                Vaciar Carrito
              </Button>
            </>
          )}
          <Link to="/">
            <Button size="large" variant="contained">
              Volver
            </Button>
          </Link>
        </Box>
      </List>
    </div>
  );
};

export default Cart;
