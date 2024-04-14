import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const initialUser = JSON.parse(localStorage.getItem("user")) || {};
  const [user, setUser] = useState(initialUser);
  const setUserData = (data) => {
    setUser(data);
  };
  useEffect(() => {
    if (Object.keys(user).length !== 0) localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  let data = {
    user,
    setUserData,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export default React.memo(UserContextProvider);
