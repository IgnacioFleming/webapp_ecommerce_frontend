import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  // let localCart = JSON.parse(localStorage.getItem("cart"));

  // let initialCart = localCart || [];

  const [cart, setCart] = useState([]);

  const { user } = useContext(UserContext);
  console.log(cart);
  console.log(user.cart);
  useEffect(() => {
    if (user.cart) {
      const data = fetch(`http://localhost:8080/api/carts/${user.cart}`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          setCart(json.products);
        });
      console.log(data);
    }
  }, [user]);

  const addToCart = (product) => {
    // let exists = isInCart(producto.id);

    // if (exists) {
    //   let newCart = cart.map((e) => {
    //     if (e.id === producto.id) {
    //       return { ...e, quantity: producto.quantity };
    //     } else {
    //       return e;
    //     }
    //   });
    //   setCart(newCart);
    // } else {
    //   setCart([...cart, producto]);
    // }

    fetch(`http://localhost:8080/api/carts/${user.cart}/products/${product}`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
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
    if (cart.length > 0) {
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
