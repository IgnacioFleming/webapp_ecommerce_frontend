import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
      <Stack
        direction="column"
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 10,
        }}
        spacing={5}
      >
        {cart.map((e) => {
          console.log(cart);
          return (
            <Item
              sx={{
                width: "80%",
                height: 150,
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
              key={e.id}
              elevation={5}
            >
              <Grid container>
                <Grid
                  item
                  md={1}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Box sx={{ height: "80%", width: "80%" }}>
                    <img
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                        paddingLeft: 100,
                      }}
                      src={e.img}
                    />
                  </Box>
                </Grid>
                <Grid
                  item
                  md={5}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography gutterBottom variant="h5" color="initial">
                    {e.title}
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={2}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 1,
                  }}
                >
                  <Typography
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                    variant="subtitle1"
                    color="initial"
                  >
                    Cantidad
                  </Typography>
                  <Typography gutterBottom variant="h5" color="initial">
                    {e.quantity}
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={2}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",

                    gap: 1,
                  }}
                >
                  <Typography
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                    variant="subtitle1"
                    color="initial"
                  >
                    Importe
                  </Typography>
                  <Typography gutterBottom variant="h5" color="initial">
                    {e.quantity * e.price}
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={2}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Button
                    variant="contained"
                    onClick={() => deleteFromCart(e.id)}
                  >
                    Eliminar
                  </Button>
                </Grid>
              </Grid>
            </Item>
          );
        })}
      </Stack>
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
