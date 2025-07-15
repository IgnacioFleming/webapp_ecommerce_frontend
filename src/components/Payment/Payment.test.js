import { act, render, screen, waitFor } from "@testing-library/react";
import { UserContextProvider } from "../../../__mocks__/UserContext";
import Payment from "./Payment";
import { paymentService } from "../../services/payment";

jest.mock("@stripe/stripe-js", () => ({ loadStripe: jest.fn().mockResolvedValue({}) }));
jest.mock("../ConfirmationCheckout/ConfirmationCheckout", () => () => <div data-testid="mock-confirmation-checkout"></div>);
jest.mock("@stripe/react-stripe-js", () => ({
  Elements: ({ children }) => <div data-testid="mock-elements">{children}</div>,
}));
jest.mock("../../context/UserContext", () => {
  const mock = require("__mocks__/UserContext");
  return {
    UserContext: mock.UserContext,
  };
});

jest.mock("../../services/payment", () => ({
  paymentService: {
    createPaymentIntent: jest.fn(),
  },
}));

describe("Payment", () => {
  const mockCompletePurchase = jest.fn();
  const mockTotal = 100;
  const mockTotalQuantity = 5;
  const renderPayment = (context = {}) => {
    render(
      <UserContextProvider value={{ token: "mock-token", ...context }}>
        <Payment completePurchase={mockCompletePurchase} total={mockTotal} totalQuantity={mockTotalQuantity} />
      </UserContextProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders component if createPaymentIntent return a clientSecret", async () => {
    paymentService.createPaymentIntent.mockResolvedValue({ clientSecret: "mockSecret" });
    renderPayment();
    await waitFor(() => {
      const elements = screen.getByTestId("mock-elements");
      expect(elements).toBeInTheDocument();
      const conversationCheckout = screen.getByTestId("mock-confirmation-checkout");
      expect(conversationCheckout).toBeInTheDocument();
    });
  });

  test("does not render the component if createPaymentIntent does not return a clientSecret", async () => {
    paymentService.createPaymentIntent.mockResolvedValue({ clientSecret: null });
    renderPayment();
    await waitFor(() => {
      const elements = screen.queryByTestId("mock-elements");
      expect(elements).not.toBeInTheDocument();
      const conversationCheckout = screen.queryByTestId("mock-confirmation-checkout");
      expect(conversationCheckout).not.toBeInTheDocument();
    });
  });
});
