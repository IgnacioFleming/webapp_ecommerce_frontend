import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";
import alerts from "../alerts/alerts";

export function useGetUserData() {
  const { user, setUserData } = useContext(UserContext);
  const { setCart } = useContext(CartContext);

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/sessions/current`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((json) => {
          setUserData(json.description.user);
        })
        .catch((err) => {
          alerts.errorAlert(err);
          setTimeout(() => (window.location.href = "/login"), 3000);
        });
    }
  }, []);
  useEffect(() => {
    if (Object.keys(user).length !== 0 && user.role !== "admin") {
      fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/carts/${user.cart}`, {
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
