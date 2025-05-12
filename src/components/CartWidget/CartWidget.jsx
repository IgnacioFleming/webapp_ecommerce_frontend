import { useContext } from "react";
import { Box } from "@mui/material";
import { RiShoppingCartLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useShowCart } from "../../hooks/useShowCart";

const boxStyle = {
  display: "flex",
  justifyContent: "space-betwen",
  height: "100%",
  alignItems: "center",
  cursor: "pointer",
};
const counterStyle = {
  border: "solid 1px white",
  borderRadius: "50%",
  position: "relative",
  top: "-18px",
  right: 10,
  height: "22px",
  width: "22px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "1",
  fontSize: 13,
};

const CartWidget = () => {
  const showCart = useShowCart();
  const { cartQuantity } = useContext(CartContext);
  const navigate = useNavigate();
  let quantity = cartQuantity();

  return (
    <>
      {showCart && (
        <Box sx={boxStyle} onClick={() => navigate("/cart")} data-testid="cart-widget-box">
          <RiShoppingCartLine size={25} data-testid="cart-icon" />

          <span style={counterStyle}>{quantity || 0}</span>
        </Box>
      )}
    </>
  );
};

export default CartWidget;
