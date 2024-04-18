import { Avatar, Box, Button, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Payment from "../../components/Payment/Payment";

const Checkout = ({ cart, cartAmount, completePurchase, orderId, totalQuantity }) => {
  const total = cartAmount();
  return (
    <>
      {orderId ? (
        <Box sx={{ marginBlock: 10 }}>
          <Typography align="center" mt={10} mb={10} variant="h1" color="initial">
            Congratulations!!
          </Typography>
          <Typography align="center" variant="subtitle2" color="initial" sx={{ fontSize: 20 }}>
            Your purchase was registered successfully! Your order number is
            <strong> {orderId}</strong> .<br />
            <br /> <br /> Thank you for choosing us!!
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
            <Link to="/">
              <Button variant="contained">Back to Home</Button>
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
                  Order Detail
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
                                  Quantity: {e.quantity}
                                </Typography>

                                <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                                  Amount: $ {e.quantity * e.product.price}
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
