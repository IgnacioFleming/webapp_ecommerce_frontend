import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AiFillGithub } from "react-icons/ai";
import UploadButton from "./UploadButton";
import alerts from "../../utils/alerts/alerts";
import UserApiCall from "../../services/UserApiCall";
import { UserContextProvider } from "../../../__mocks__/UserContext";

jest.mock("../../context/UserContext", () => {
  const mock = require("__mocks__/UserContext");
  return { UserContext: mock.UserContext };
});

jest.mock("../../services/UserApiCall", () => {
  return jest.fn().mockImplementation(() => {
    return { upload: jest.fn() };
  });
});

jest.mock("../../utils/alerts/alerts", () => ({ warningAlert: jest.fn(), errorAlert: jest.fn() }));

const mockFileReader = {
  onloadend: null,
  readAsDataURL: jest.fn(function () {
    setTimeout(() => {
      this.onloadend();
    }, 0);
  }),
  result: "data:image/jpeg;base64,mockImageData",
};

window.FileReader = jest.fn().mockImplementation(() => mockFileReader);

describe("UploadButton", () => {
  const mockUpdateProfileImage = jest.fn();
  const mockUser = { id: "user123" };
  const mockToken = "token123";
  const mockImage = new File(["content"], "img.jpg", { type: "image/jpeg" });

  const renderUploadButton = (props = {}) => {
    const defaultProps = {
      icon: undefined,
      variant: "contained",
      sx: {},
      text: "",
    };
    render(
      <UserContextProvider
        value={{
          user: mockUser,
          token: mockToken,
          updateUserProfileImage: mockUpdateProfileImage,
        }}
      >
        <UploadButton {...{ ...defaultProps, ...props }} />
      </UserContextProvider>
    );
  };
  beforeAll(() => {
    global.FileReader = class {
      readAsDataURL() {
        this.result = "data:image/jepg;base64,mockbase64";
        this.onloadend();
      }
    };
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders with some text", () => {
    renderUploadButton({ text: "Upload" });
    const button = screen.getByText(/upload/i);
    expect(button).toBeInTheDocument();
  });

  test("renders with text and icon", () => {
    renderUploadButton({ text: "Upload", icon: <AiFillGithub /> });
    const icon = screen.getByText(/upload/i);
    expect(icon.querySelector("svg")).toBeInTheDocument();
  });

  test("handles file selection and confirms upload", async () => {
    const uploadMock = jest.fn().mockResolvedValue({
      status: "success",
      payload: "new-image-url.jpg",
    });
    UserApiCall.mockImplementation(() => ({ upload: uploadMock }));
    alerts.warningAlert.mockResolvedValue({ isConfirmed: true });
    renderUploadButton({ text: "Upload" });
    const fileInput = screen.getByText(/upload/i).querySelector('input[type="file"]');
    expect(fileInput).toBeInTheDocument();
    fireEvent.change(fileInput, { target: { files: [mockImage] } });
    await waitFor(() => {
      expect(alerts.warningAlert).toHaveBeenCalled();
      expect(alerts.warningAlert.mock.calls[0][0]).toHaveProperty("needConfirmation", true);
    });

    await waitFor(() => {
      expect(uploadMock).toHaveBeenCalledWith(mockUser.id, expect.any(FormData), mockToken);
    });
    expect(mockUpdateProfileImage).toHaveBeenCalledWith("new-image-url.jpg");
  });

  test("handles upload error", async () => {
    const uploadMock = jest.fn().mockResolvedValue({ status: "error" });
    UserApiCall.mockImplementation(() => ({ upload: uploadMock }));
    alerts.warningAlert.mockResolvedValue({ isConfirmed: true });
    renderUploadButton({ text: "Upload" });
    const fileInput = screen.getByText(/upload/i).querySelector('input[type="file"]');
    fireEvent.change(fileInput, { target: { files: [mockImage] } });
    await waitFor(() => {
      expect(alerts.warningAlert).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(uploadMock).toHaveBeenCalled();
      expect(mockUpdateProfileImage).not.toHaveBeenCalled();
      expect(alerts.errorAlert).toHaveBeenCalledWith("There was an error while processing your data");
    });
  });

  test("does nothing when there is not file selected", async () => {
    renderUploadButton({ text: "Upload" });
    const fileInput = screen.getByText(/upload/i).querySelector('input[type="file"]');
    fireEvent.change(fileInput, { target: { files: [] } });
    await waitFor(() => {
      expect(alerts.warningAlert).not.toHaveBeenCalled();
    });
  });

  test("does nothing when user does not confirm the upload", async () => {
    alerts.warningAlert.mockResolvedValue({ isConfirmed: false });
    const uploadMock = jest.fn();
    UserApiCall.mockImplementation(() => ({ upload: uploadMock }));
    renderUploadButton({ text: "Upload" });
    const fileInput = screen.getByText(/upload/i).querySelector('input[type="file"]');
    fireEvent.change(fileInput, { target: { files: [mockImage] } });
    await waitFor(() => {
      expect(uploadMock).not.toHaveBeenCalled();
    });
  });

  test("renders with multiple=true prop", () => {
    renderUploadButton({ text: "Upload", multiple: true });
    const button = screen.getByText(/upload/i);
    const fileInput = button.querySelector('input[type="file"]');

    expect(fileInput).toHaveAttribute("multiple");
  });
});
