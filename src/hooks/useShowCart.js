import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";

export const useShowCart = () => {
  const { cartQuantity } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);
  useEffect(() => {
    if (cartQuantity > 0) return setShowCart(true);
    else setShowCart(false);
  }, [cartQuantity]);
  return showCart;
};
