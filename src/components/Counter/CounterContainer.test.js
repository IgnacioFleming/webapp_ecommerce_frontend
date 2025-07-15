import { fireEvent, render, screen } from "@testing-library/react";
import CounterContainer from "./CounterContainer";
import { UserContextProvider } from "../../../__mocks__/UserContext";
import { BrowserRouter } from "react-router-dom";
import { __mockedCounter } from "../../hooks/useCounter";

jest.mock("../../context/UserContext", () => {
  const mock = require("__mocks__/UserContext");
  return { UserContext: mock.UserContext };
});

jest.mock("../../hooks/useCounter", () => {
  const useCounterActions = {
    counter: 1,
    agregar: jest.fn(),
    quitar: jest.fn(),
    reset: jest.fn(),
  };

  const mockUseCounter = jest.fn(() => useCounterActions);
  return {
    __esModule: true,
    default: mockUseCounter,
    __mockedCounter: useCounterActions,
  };
});

describe("CounterContainer", () => {
  const onAdd = jest.fn();
  const mockStock = 1;
  const renderCounterContainer = (context = {}, props = {}) => {
    return render(
      <BrowserRouter>
        <UserContextProvider value={context}>
          <CounterContainer stock={props.stock ?? mockStock} onAdd={props.onAdd ?? onAdd} />
        </UserContextProvider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("renderings", () => {
    test("component should render", () => {
      renderCounterContainer();
      const counter = screen.getByText("Go Back");
      expect(counter).toBeInTheDocument();
    });

    test("should render counter controls and addToCart button if user is not admin", () => {
      renderCounterContainer();
      const counterControls = screen.getByTestId("counter-controls");
      expect(counterControls).toBeInTheDocument();
    });

    test("should not render counter controls and addToCart button if user is admin", () => {
      renderCounterContainer({ isAdmin: true });
      const counterControls = screen.queryByTestId("counter-controls");
      expect(counterControls).toBeNull();
    });
  });

  describe("properties", () => {
    test("button should have disabled property if notDisabled is false", () => {
      const component = renderCounterContainer({}, { stock: 0 });
      const counter = screen.getByText("Add to Cart");
      expect(counter.classList.contains("Mui-disabled")).toBeTruthy();
      component.unmount();
      renderCounterContainer({}, { stock: 1 });
      const counterRerendered = screen.getByText("Add to Cart");
      expect(counterRerendered.classList.contains("Mui-disabled")).not.toBeTruthy();
    });

    test("if user is not admin when clicks on AddToCart button onAdd should be called", () => {
      const onAdd = jest.fn();
      renderCounterContainer({}, { stock: 1, onAdd });
      const addButton = screen.getByText("Add to Cart");
      fireEvent.click(addButton);
      expect(onAdd).toHaveBeenCalled();
    });
  });

  describe("useCounter calls", () => {
    test("calls quitar when clicking minus icon", () => {
      renderCounterContainer({}, { stock: 10 });
      const substractButton = screen.getAllByRole("button")[0];
      fireEvent.click(substractButton);
      expect(__mockedCounter.quitar).toHaveBeenCalled();
    });

    test("calls agregar when clicking plus icon", () => {
      renderCounterContainer({}, { stock: 10 });
      const addButton = screen.getAllByRole("button")[1];
      fireEvent.click(addButton);
      expect(__mockedCounter.agregar).toHaveBeenCalled();
    });

    test("calls reset when clicking reset icon", () => {
      renderCounterContainer({}, { stock: 10 });
      const resetButton = screen.getAllByRole("button")[2];
      fireEvent.click(resetButton);
      expect(__mockedCounter.reset).toHaveBeenCalled();
    });
  });

  describe("navigation", () => {
    test("go back button should have a correct navigation link", () => {
      renderCounterContainer();
      const goBackLink = screen.getByRole("link", { name: /go back/i });
      expect(goBackLink).toBeInTheDocument();
      expect(goBackLink).toHaveAttribute("href", "/");
    });
  });
});
