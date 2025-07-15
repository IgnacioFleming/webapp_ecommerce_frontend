import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import alerts from "../utils/alerts/alerts";
import { useNavigate } from "react-router-dom";

export function useGetUserData() {
  const { user, setUserData, token } = useContext(UserContext);
  const { setCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/sessions/current`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.status === "error") navigate("/demo-login");
          else setUserData(json.description.user);
        })
        .catch((err) => {
          console.log("trigger this alert");
          alerts.errorAlert(err);
        });
    }
  }, []);
  useEffect(() => {
    if (Object.keys(user).length !== 0 && user.role !== "admin") {
      fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/carts/${user.cart}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((json) => setCart(json.payload.products))
        .catch((err) => alerts.errorAlert(err));
    }
  }, [user]);

  return { user };
}
