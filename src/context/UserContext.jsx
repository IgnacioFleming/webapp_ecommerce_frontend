import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const setUserData = (data) => {
    setUser(data);
    data.role === "admin" && setIsAdmin(true);
  };

  let data = {
    user,
    setUserData,
    isAdmin,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export default React.memo(UserContextProvider);
