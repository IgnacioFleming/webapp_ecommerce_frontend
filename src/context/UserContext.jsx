import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const initialUser = JSON.parse(localStorage.getItem("user")) || {};
  const [user, setUser] = useState(initialUser);
  const [isAdmin, setIsAdmin] = useState(false);
  const setUserData = (data) => {
    setUser(data);
    user.first_name === "Admin_User" && setIsAdmin(true);
  };
  useEffect(() => {
    if (Object.keys(user).length !== 0) localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  let data = {
    user,
    setUserData,
    isAdmin,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export default React.memo(UserContextProvider);
