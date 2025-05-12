// Mock de hooks
jest.mock("../../hooks/useShowCart", () => ({
  useShowCart: jest.fn(),
}));
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CartWidget from "./CartWidget";
import { useShowCart } from "../../hooks/useShowCart";
import { CartContextProvider } from "../../../__mocks__/CartContext";

// También modifica el import en el archivo original de CartWidget.jsx durante los tests
jest.mock("../../context/CartContext", () => {
  // Importamos el mock de la carpeta en la raíz
  const mock = require("__mocks__/CartContext");
  return {
    CartContext: mock.CartContext,
  };
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("CartWidget Component", () => {
  // Función auxiliar para renderizar el componente con contexto
  const renderCartWidget = (contextValue = { quantity: 0 }) => {
    const cartQuantity = () => contextValue.quantity;
    console.log(contextValue.quantity);
    return render(
      <BrowserRouter>
        <CartContextProvider value={{ cartQuantity }}>
          <CartWidget />
        </CartContextProvider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    // Resetear mocks antes de cada test
    jest.clearAllMocks();
  });

  test("no se renderiza cuando showCart es false", () => {
    // Mock de useShowCart devolviendo false
    useShowCart.mockReturnValue(false);

    const { container } = renderCartWidget();
    expect(container.firstChild).toBeNull();
  });

  test("se renderiza correctamente cuando showCart es true", () => {
    // Mock de useShowCart devolviendo true
    useShowCart.mockReturnValue(true);

    renderCartWidget({ quantity: 3 });

    // Verificar ícono del carrito
    const cartIcon = screen.getByTestId("cart-icon");
    expect(cartIcon).toBeInTheDocument();

    // Verificar contador de productos
    const quantitySpan = screen.getByText("3");
    expect(quantitySpan).toBeInTheDocument();
  });

  test("muestra 0 cuando no hay productos en el carrito", () => {
    // Mock de useShowCart devolviendo true
    useShowCart.mockReturnValue(true);

    renderCartWidget({ quantity: 0 });

    const quantitySpan = screen.getByText("0");
    expect(quantitySpan).toBeInTheDocument();
  });

  test("navega a la página de carrito al hacer click", () => {
    // Mock de useShowCart devolviendo true
    useShowCart.mockReturnValue(true);

    // Mockear navigate
    const mockedNavigate = jest.fn();
    jest.spyOn(require("react-router-dom"), "useNavigate").mockImplementation(() => mockedNavigate);

    renderCartWidget({ quantity: 2 });

    // Obtener el Box clickeable
    const cartWidgetBox = screen.getByTestId("cart-widget-box");
    fireEvent.click(cartWidgetBox);

    // Verificar que navigate fue llamado con '/cart'
    expect(mockedNavigate).toHaveBeenCalledWith("/cart");
  });
});
