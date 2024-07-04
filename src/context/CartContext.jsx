import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  let localCart = localStorage.getItem("cart");

  let initialCart = JSON.parse(localCart) || [];

  const [cart, setCart] = useState(initialCart);

  const { user } = useContext(UserContext);
  console.log(user);

  useEffect(() => {
    if (user.cart) {
      const data = fetch(`http://localhost:8080/api/carts/${user.cart}`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          setCart(json.payload.products);
          localStorage.setItem("cart", JSON.stringify(json.payload.products));
          console.log(cart);
        });
    }
  }, [user]);

  const addToCart = (product, quantity) => {
    console.log(quantity);
    fetch(`http://localhost:8080/api/carts/${user.cart}/products/${product}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));

    fetch(`http://localhost:8080/api/carts/${user.cart}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("paso por el addcart", json);
        setCart(json.payload.products);
        localStorage.setItem("cart", JSON.stringify(json.payload.products));
      });
  };

  const isInCart = (id) => {
    let exists = cart.some((e) => e.id === id);
    return exists;
  };

  const deleteFromCart = (id) => {
    let newCart = [];
    cart.map((e) => {
      if (e.id != id) {
        return (newCart = [...newCart, e]);
      }
    });
    setCart(newCart);
  };
  const cartAmount = () => {
    let totalAmount = cart.reduce((acc, e) => {
      return acc + e.quantity * e.price;
    }, 0);
    return totalAmount;
  };

  const cartQuantity = () => {
    console.log(cart, "en la funcion cartQuantity");
    if (cart?.length > 0) {
      let itemsQuantity = cart.reduce((acc, e) => {
        return acc + e.quantity;
      }, 0);
      return itemsQuantity;
    }
  };

  const getCartQuantity = (id) => {
    // let product = cart.find((e) => e.id === id);
    // return product?.quantity;
  };
  const setCartEmpty = () => {
    setCart([]);
  };

  let data = {
    addToCart,
    deleteFromCart,
    cart,
    cartAmount,
    cartQuantity,
    getCartQuantity,
    setCartEmpty,
  };
  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
