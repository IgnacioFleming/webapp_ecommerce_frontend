import { useContext, useState } from "react";
import Checkout from "./Checkout";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";

const CheckoutContainer = () => {
  const { cart, cartAmount, setCart, cartQuantity } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let totalQuantity = cartQuantity();

  const completePurchase = async (error = false) => {
    if (error) return;
    const purchase = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/carts/${user.cart}/purchase`, {
      method: "POST",
      credentials: "include",
    });
    const ticketData = await purchase.json();
    const result = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/carts/${user.cart}`, {
      method: "GET",
      credentials: "include",
    });
    const { payload } = await result.json();
    setCart(payload.products);
    localStorage.setItem("cart", JSON.stringify(payload.products));
    setOrderId(ticketData.payload.split(":")[1].trim());
  };
  return <Checkout cart={cart} cartAmount={cartAmount} completePurchase={completePurchase} orderId={orderId} isLoading={isLoading} totalQuantity={totalQuantity} />;
};

export default CheckoutContainer;
