import { Box, Button, Divider, List, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import StackOfProducts from "../../components/StackOfProducts/StackOfProducts";

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
      <StackOfProducts array={cart} hasDeleteAction deleteFromCart={deleteFromCart} />
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
                There&apos;s no items added to cart yet.
              </Typography>
            </Box>
          </>
        )}
        <Box sx={{ ...boxStyle, gap: 2 }}>
          {cart.length > 0 && (
            <>
              <Link to="/checkout">
                <Button size="large" variant="contained">
                  Complete Purchase
                </Button>
              </Link>

              <Button size="large" variant="contained" onClick={setCartEmpty}>
                Empty Cart
              </Button>
            </>
          )}
          <Link to="/">
            <Button size="large" variant="contained">
              Go Back
            </Button>
          </Link>
        </Box>
      </List>
    </div>
  );
};

export default Cart;
