import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import useFetch from "../../utils/hooks/useFetch";
import { UserContext } from "../../context/UserContext";
const alignment = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
};
export const NavigationMenu = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const data = useFetch("http://localhost:8080/api/products/categories", "GET");

  const initialsOfName = Object.keys(user).length !== 0 && user.first_name !== "Admin_User" ? user.first_name[0] + user.last_name?.[0] : "";

  return (
    <Box sx={alignment}>
      {data.payload && <Dropdown type="text" title="Productos" listItems={[{ _id: "todos" }, ...data.payload]} />}
      <IconButton size="small" aria-label="mis-compras" onClick={() => navigate("/tickets")}>
        <Typography variant="body" color="white">
          {user?.first_name === "Admin_User" ? "Ventas" : "Mis Compras"}
        </Typography>
      </IconButton>

      <IconButton size="small" variant="body1" onClick={() => navigate("/profile")} sx={{ cursor: "pointer", color: "white" }} align="center">
        <Avatar sx={{ width: 32, height: 32, marginRight: "1px" }}>{initialsOfName}</Avatar>
        Perfil
      </IconButton>
    </Box>
  );
};
