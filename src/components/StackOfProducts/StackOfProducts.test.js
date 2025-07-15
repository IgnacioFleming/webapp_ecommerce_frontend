import { render, screen } from "@testing-library/react";
import StackOfProducts from "./StackOfProducts";

describe("StackOfProducts", () => {
  const mockArray = [];
  const mockHasDeleteAction = false;
  const mockDeleteFromCart = jest.fn();
  const mockArrayWithProducts = [
    {
      _id: "test-1",
      product: {
        title: "mock title 1",
        thumbnails: ["mock thumbnail 1"],
        price: 100,
      },
      quantity: 1,
    },
    {
      _id: "test-2",
      product: {
        title: "mock title 2",
        thumbnails: ["mock thumbnail 2"],
        price: 200,
      },
      quantity: 2,
    },
    {
      _id: "test-3",
      product: {
        title: "mock title 3",
        thumbnails: ["mock thumbnail 3"],
        price: 300,
      },
      quantity: 3,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("component renders", () => {
    render(<StackOfProducts array={mockArray} hasDeleteAction={mockHasDeleteAction} deleteFromCart={mockDeleteFromCart} />);
    screen.getByTestId("stack");
  });

  test("handles if array prop is not an Array instance and returns null", () => {
    const mockArray = 2;
    render(<StackOfProducts array={mockArray} hasDeleteAction={mockHasDeleteAction} deleteFromCart={mockDeleteFromCart} />);
    expect(screen.queryByTestId("stack")).not.toBeInTheDocument();
  });

  test("handles correctly if an array with products is passed as a prop", () => {
    render(<StackOfProducts array={mockArrayWithProducts} hasDeleteAction={mockHasDeleteAction} deleteFromCart={mockDeleteFromCart} />);
    screen.debug();
  });
});
