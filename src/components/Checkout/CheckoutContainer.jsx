import React, { useContext, useState } from "react";
import Checkout from "./Checkout";
import { CartContext } from "../../context/CartContext";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import PaymentService from "../services/payment";

const CheckoutContainer = () => {
  const { cart, cartAmount, setCart, cartQuantity } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let totalQuantity = cartQuantity();

  const completePurchase = async () => {
    const paymentService = new PaymentService();
    await paymentService.createPaymentIntent();
    const purchase = await fetch(`http://localhost:8080/api/carts/${user.cart}/purchase`, {
      method: "POST",
      credentials: "include",
    });
    const ticketData = await purchase.json();
    const result = await fetch(`http://localhost:8080/api/carts/${user.cart}`, {
      method: "GET",
      credentials: "include",
    });
    const { payload } = await result.json();
    setCart(payload.products);
    localStorage.setItem("cart", JSON.stringify(payload.products9));
    setOrderId(ticketData.payload.split(":")[1].trim());
  };
  console.log(cart);
  return <Checkout cart={cart} cartAmount={cartAmount} completePurchase={completePurchase} orderId={orderId} isLoading={isLoading} totalQuantity={totalQuantity} />;
};

export default CheckoutContainer;
