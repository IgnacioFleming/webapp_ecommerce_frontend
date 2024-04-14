import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";
import alerts from "../alerts/alerts";
const BASE_URL = "http://localhost:8080";

export function useGetUserData() {
  const location = useLocation();
  const { user, setUserData } = useContext(UserContext);
  const { setCart } = useContext(CartContext);

  useEffect(() => {
    if (location.pathname === "/products" && !localStorage.getItem("user")) {
      fetch(`${BASE_URL}/api/sessions/current`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((json) => {
          setUserData(json.description.user);
        })
        .catch((err) => {
          alerts.errorAlert(err);
          setTimeout(() => (window.location.href = "/login"), 4000);
        });
    }
    if (Object.keys(user).length !== 0) {
      fetch(`${BASE_URL}/api/carts/${user.cart}`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((json) => setCart(json.payload.products))
        .catch((err) => alerts.errorAlert(err));
    }
  }, [user]);
  return { user };
}
