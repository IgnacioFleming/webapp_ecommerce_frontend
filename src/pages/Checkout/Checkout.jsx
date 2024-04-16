import { Avatar, Box, Button, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Payment from "../../components/Payment/Payment";

const Checkout = ({ cart, cartAmount, completePurchase, orderId, isLoading, totalQuantity }) => {
  const total = cartAmount();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {orderId ? (
        <Box>
          <Typography align="center" mt={30} mb={10} variant="h1" color="initial">
            Felicitaciones!!
          </Typography>
          <Typography align="center" variant="subtitle2" color="initial" sx={{ fontSize: 20 }}>
            Tu compra se realizó con éxito! Tu número de orden es
            <strong> {orderId}</strong> .<br />
            <br /> <br /> Muchas gracias por elegirnos!!
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
            <Link to="/">
              <Button variant="contained">Volver al Inicio</Button>
            </Link>
          </Box>
        </Box>
      ) : (
        <div>
          <Grid container>
            <Grid item md={6} sx={{ display: "flex" }}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <Typography variant="h4" mt={10} color="initial">
                  Detalle de tu compra
                </Typography>
                <List
                  sx={{
                    width: "auto",
                    marginTop: 5,
                  }}
                >
                  {cart.map((e) => {
                    return (
                      <React.Fragment key={e.product._id}>
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar alt={e.title} src={e.product.thumbnails[0]} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={e.product.title}
                            secondary={
                              <span
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                                  Cantidad: {e.quantity}
                                </Typography>

                                <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                                  Monto: $ {e.quantity * e.product.price}
                                </Typography>
                              </span>
                            }
                          />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </React.Fragment>
                    );
                  })}
                </List>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "2px",
                    height: "90%",
                    minHeight: "500px",
                    backgroundColor: "#ccc",
                  }}
                ></div>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Payment completePurchase={completePurchase} total={total} totalQuantity={totalQuantity} />
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default Checkout;
