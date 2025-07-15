import { fireEvent, render, screen } from "@testing-library/react";
import Dropdown from "./Dropdown";
import { __mockUseNavigate, BrowserRouter } from "react-router-dom";

jest.mock("react-router-dom", () => {
  const mockUseNavigate = jest.fn();
  return { ...jest.requireActual("react-router-dom"), __esModule: true, useNavigate: () => mockUseNavigate, __mockUseNavigate: mockUseNavigate };
});

const mockTitle = "Categories";
const mockItems = [{ _id: "path_1" }, { _id: "path_2" }, { _id: "path_3" }];

describe("Dropdown", () => {
  const renderDropdown = (props) => {
    const allProps = {
      title: mockTitle,
      type: "text",
      listItems: mockItems,
      ...props,
    };

    return render(
      <BrowserRouter>
        <Dropdown {...allProps} />
      </BrowserRouter>
    );
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("button renders when type is text", () => {
    renderDropdown();
    const dropdownButton = screen.getByRole("button");
    expect(dropdownButton).toBeInTheDocument;
  });

  test("nothing renders when type is not text", () => {
    renderDropdown({ type: "image" });
    const dropdown = screen.queryByRole("button");
    expect(dropdown).toBeNull();
  });

  test("when user clicks the button it displays the dropdown menu and 3 listitems", () => {
    renderDropdown();
    const dropdown = screen.getByRole("button");
    fireEvent.click(dropdown);
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    const listitems = screen.getAllByText(/path/);
    expect(listitems).toHaveLength(3);
  });

  test("when user clicks an listitem, useNavigate should be called with the path", () => {
    renderDropdown();
    const dropdown = screen.getByRole("button");
    fireEvent.click(dropdown);
    const listitems = screen.getAllByRole("button", { name: /path/ });
    screen.debug(listitems);
    fireEvent.click(listitems[0].querySelector(":first-child"));
    expect(__mockUseNavigate).toHaveBeenCalledWith("/products/category/path_1");
  });

  test("navigates to /products when item _id is 'Todos'", () => {
    renderDropdown({
      listItems: [{ _id: "Todos" }],
    });

    const dropdown = screen.getByRole("button");
    fireEvent.click(dropdown);

    const todosItem = screen.getByRole("button", { name: "Todos" });
    fireEvent.click(todosItem.querySelector(":first-child"));

    expect(__mockUseNavigate).toHaveBeenCalledWith("/products");
  });
});
