import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ConfirmationCheckout from "./ConfirmationCheckout";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";

jest.mock("@stripe/react-stripe-js", () => ({
  PaymentElement: () => <div data-testid="mock-paymentElement"></div>,
  useElements: jest.fn(),
  useStripe: jest.fn(),
}));

jest.mock("sweetalert2", () => ({ fire: jest.fn().mockResolvedValue({}) }));

describe("ConfirmationCheckout", () => {
  const mockTotal = 100;
  const mockTotalQuantity = 5;
  const mockCompletePurchase = jest.fn().mockResolvedValue(undefined);
  const mockConfirmPayment = jest.fn().mockResolvedValue({}).mockName("confirm_payment_function");

  const renderConfirmationCheckout = (props = {}) => {
    const defaultProps = {
      total: mockTotal,
      totalQuantity: mockTotalQuantity,
      completePurchase: mockCompletePurchase,
    };
    render(
      <BrowserRouter>
        <ConfirmationCheckout {...{ ...defaultProps, ...props }} />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render PaymentElement and have the correct total and totalQuantity", () => {
    renderConfirmationCheckout();
    const paymentElement = screen.getByTestId("mock-paymentElement");
    expect(paymentElement).toBeInTheDocument();
    const total = screen.getByRole("heading", { name: /total amount: \$ 100/i });
    expect(total).toBeInTheDocument();
    const totalQuantity = screen.getByRole("heading", { name: /items quantity: 5/i });
    expect(totalQuantity).toBeInTheDocument();
  });

  test("link go back must navigate to /cart ", () => {
    renderConfirmationCheckout();
    const link = screen.getByRole("link", { name: /go back/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/cart");
  });

  test("handle submit when stripe is undefined", async () => {
    useElements.mockImplementationOnce(() => ({ getElement: jest.fn() }));
    useStripe.mockImplementationOnce(() => undefined);
    renderConfirmationCheckout();
    const form = screen.getByRole("form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockConfirmPayment).not.toHaveBeenCalled();
    });
  });

  test("handle submit when elements is undefined", async () => {
    useElements.mockImplementationOnce(() => undefined);
    useStripe.mockImplementationOnce(() => ({ confirmPayment: mockConfirmPayment }));
    renderConfirmationCheckout();
    const form = screen.getByRole("form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockConfirmPayment).not.toHaveBeenCalled();
    });
  });

  test("handle error from confirmPayment when submiting the form", async () => {
    mockConfirmPayment.mockResolvedValue({ error: { type: "mockError", message: "This is a mock error message" } });
    useStripe.mockImplementationOnce(() => ({ confirmPayment: mockConfirmPayment }));
    const mockClear = jest.fn();
    const mockGetElement = jest.fn(() => ({ clear: mockClear }));
    useElements.mockImplementationOnce(() => ({ getElement: mockGetElement }));
    renderConfirmationCheckout();
    const form = screen.getByRole("form");
    fireEvent.submit(form);
    await waitFor(() => {
      expect(mockCompletePurchase).toHaveBeenCalledWith(true);
      expect(Swal.fire).toHaveBeenCalled();
      expect(mockClear).toHaveBeenCalled();
    });
  });

  test("should call completePurchase without args if confirmPayment does not return an error", async () => {
    mockConfirmPayment.mockResolvedValue({});
    useElements.mockImplementationOnce(() => ({ getElement: jest.fn() }));
    useStripe.mockImplementationOnce(() => ({ confirmPayment: mockConfirmPayment }));
    renderConfirmationCheckout();
    const form = screen.getByRole("form");
    fireEvent.submit(form);
    await waitFor(() => {
      expect(mockCompletePurchase).toHaveBeenCalledTimes(1);
      expect(mockCompletePurchase).not.toHaveBeenCalledWith(true);
    });
  });
});
