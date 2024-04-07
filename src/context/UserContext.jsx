import { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const initialUser = JSON.parse(localStorage.getItem("user")) || {};
  const [user, setUser] = useState(initialUser);
  const setUserData = (data) => {
    setUser(data);
  };
  console.log(user);
  let data = {
    user,
    setUserData,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
