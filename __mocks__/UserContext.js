import React from "react";

const mockUser = {
  first_name: "mockName",
  last_name: "mockLastName",
  email: "mockEmail",
  password: "mockPassword",
  cart: "mockCartId",
  role: "usuario",
  profile_image: "mockUrl",
  last_connection: "mockDate",
  documents: [],
};

export const UserContext = React.createContext({ isAdmin: false });

export const UserContextProvider = ({ children, value = {} }) => {
  const defaultValue = {
    user: mockUser,
    setUserData: jest.fn(),
    isAdmin: false,
    updateUserProfileImage: jest.fn(),
    token: "mockToken",
    setNewToken: jest.fn(),
    ...value,
  };
  return <UserContext.Provider value={defaultValue}>{children}</UserContext.Provider>;
};
