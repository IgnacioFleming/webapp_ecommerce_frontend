import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  let localCart = localStorage.getItem("cart");

  let initialCart = JSON.parse(localCart) || [];

  const [cart, setCart] = useState(initialCart);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user.cart) {
      fetch(`http://localhost:8080/api/carts/${user.cart}`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((json) => {
          setCart(json.payload.products);
          localStorage.setItem("cart", JSON.stringify(json.payload.products));
        });
    }
  }, []);

  const addToCart = async (product, quantity) => {
    await fetch(`http://localhost:8080/api/carts/${user.cart}/products/${product}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });

    await fetch(`http://localhost:8080/api/carts/${user.cart}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        setCart(json.payload.products);
        localStorage.setItem("cart", JSON.stringify(json.payload.products));
      });
  };
  // const isInCart = (id) => {
  //   let exists = cart.some((e) => e.id === id);
  //   return exists;
  // };

  const deleteFromCart = async (id) => {
    const updatedCart = cart.filter((item) => item.product._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    await fetch(`http://localhost:8080/api/carts/${user.cart}/products/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
  };
  const cartAmount = () => {
    if (cart.length > 0) {
      let totalAmount = cart?.reduce((acc, e) => {
        return acc + e.quantity * e.product.price;
      }, 0);
      return totalAmount;
    }
  };

  const cartQuantity = () => {
    if (cart?.length > 0) {
      let itemsQuantity = cart.reduce((acc, e) => {
        return acc + e.quantity;
      }, 0);
      return itemsQuantity;
    }
  };

  const getCartQuantity = (id) => {
    console.log(cart);
    let product = cart.find((e) => e.product._id === id);
    return product?.quantity;
  };
  const setCartEmpty = async () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
    await fetch(`http://localhost:8080/api/carts/${user.cart}`, {
      method: "DELETE",
      credentials: "include",
    });
  };

  let data = {
    addToCart,
    deleteFromCart,
    cart,
    cartAmount,
    cartQuantity,
    getCartQuantity,
    setCartEmpty,
    setCart,
  };
  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
