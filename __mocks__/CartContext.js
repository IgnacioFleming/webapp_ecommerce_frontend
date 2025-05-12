// Archivo: __mocks__/CartContext.js
import React from "react";

// Creamos un contexto con un valor predeterminado básico
export const CartContext = React.createContext({
  cartQuantity: () => 0,
  // Agrega aquí los otros métodos que uses en el contexto
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  clearCart: jest.fn(),
  // ... otros métodos
});

// Esto exporta el proveedor mock para usarlo en los tests
export const CartContextProvider = ({ children, value = {} }) => {
  // El valor predeterminado solo se usa si no se proporciona un valor inicial
  const defaultValue = {
    cartQuantity: () => 0,
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    clearCart: jest.fn(),
    ...value,
  };

  return <CartContext.Provider value={{ ...defaultValue, ...value }}>{children}</CartContext.Provider>;
};
