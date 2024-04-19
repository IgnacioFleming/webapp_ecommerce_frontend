import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";

export const useShowCart = () => {
  const { cart } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);
  useEffect(() => {
    if (cart.length > 0) return setShowCart(true);
    else setShowCart(false);
  }, [cart]);
  return showCart;
};
