import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import alerts from "../../utils/alerts/alerts";
import Loader from "../../components/Loader/Loader";

function GithubAuth() {
  const navigate = useNavigate();
  const { setNewToken } = useContext(UserContext);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      setNewToken(token);
      navigate("/products");
    } else {
      alerts.errorAlert("Authentication failed.");
      navigate("/login"); // O cualquier otra ruta de error
    }
  }, [navigate]);

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Loader />
    </div>
  );
}

export default GithubAuth;
