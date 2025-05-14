import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CartWidget from "./CartWidget";
import { useShowCart } from "../../hooks/useShowCart";
import { CartContextProvider } from "../../../__mocks__/CartContext";

jest.mock("../../hooks/useShowCart", () => ({
  useShowCart: jest.fn(),
}));
jest.mock("../../context/CartContext", () => {
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
  const renderCartWidget = (contextValue = { quantity: 0 }) => {
    const cartQuantity = () => contextValue.quantity;
    return render(
      <BrowserRouter>
        <CartContextProvider value={{ cartQuantity }}>
          <CartWidget />
        </CartContextProvider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should not render wuen showCart is false", () => {
    useShowCart.mockReturnValue(false);

    const { container } = renderCartWidget();
    expect(container.firstChild).toBeNull();
  });

  test("should render correctly when showCart is true", () => {
    useShowCart.mockReturnValue(true);
    renderCartWidget({ quantity: 3 });

    const cartIcon = screen.getByTestId("cart-icon");
    expect(cartIcon).toBeInTheDocument();

    const quantitySpan = screen.getByText("3");
    expect(quantitySpan).toBeInTheDocument();
  });

  test("quantity should show 0 when there are no products in the cart", () => {
    useShowCart.mockReturnValue(true);

    renderCartWidget({ quantity: 0 });

    const quantitySpan = screen.getByText("0");
    expect(quantitySpan).toBeInTheDocument();
  });

  test("should navigate to cart page when clicking it", () => {
    useShowCart.mockReturnValue(true);

    const mockedNavigate = jest.fn();
    jest.spyOn(require("react-router-dom"), "useNavigate").mockImplementation(() => mockedNavigate);

    renderCartWidget();

    const cartWidgetBox = screen.getByTestId("cart-widget-box");
    fireEvent.click(cartWidgetBox);

    expect(mockedNavigate).toHaveBeenCalledWith("/cart");
  });
});
