import React from "react";

export const CartContext = React.createContext();

export const CartContextProvider = ({ children, value = {} }) => {
  const defaultValue = {
    cartQuantity: () => 0,
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    clearCart: jest.fn(),
    ...value,
  };

  return <CartContext.Provider value={{ ...defaultValue, ...value }}>{children}</CartContext.Provider>;
};
