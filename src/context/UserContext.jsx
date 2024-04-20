import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("auth-token") || "");
  const [isAdmin, setIsAdmin] = useState(false);
  const setUserData = (data) => {
    setUser(data);
    data.role === "admin" && setIsAdmin(true);
  };

  const setNewToken = (token) => {
    setToken(token);
    localStorage.setItem("auth-token", token);
  };

  const updateUserProfileImage = (image) => {
    const newUserData = { ...user };
    newUserData.profile_image = image;
    setUser(newUserData);
  };

  let data = {
    user,
    setUserData,
    isAdmin,
    updateUserProfileImage,
    token,
    setNewToken,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export default React.memo(UserContextProvider);
