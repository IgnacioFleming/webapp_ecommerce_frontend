import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import useFetch from "../../hooks/useFetch";
import { UserContext } from "../../context/UserContext";
import CartWidget from "../../components/CartWidget/CartWidget";
const alignment = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: 3,
};
export const NavigationMenu = () => {
  const { user } = useContext(UserContext);
  const data = useFetch(`${import.meta.env.VITE_APP_BASE_URL}/api/products/categories`, "GET");
  const initialsOfName = Object.keys(user).length !== 0 && user.first_name !== "Admin_User" ? user.first_name[0] + user.last_name?.[0] : "A";

  return (
    <Box sx={alignment}>
      {data.payload && <Dropdown type="text" title="Products" listItems={[{ _id: "todos" }, ...data.payload]} />}

      <Link to="/tickets">
        <IconButton size="small" aria-label="mis-compras">
          <Typography variant="body" color="white">
            {user?.role === "admin" ? "Sales" : "My Purchases"}
          </Typography>
        </IconButton>
      </Link>
      {user?.role === "admin" && (
        <Link to="/addProducts">
          <IconButton size="small" variant="body1" sx={{ cursor: "pointer", color: "white" }} align="center">
            Add Products
          </IconButton>
        </Link>
      )}
      <Link to="/profile">
        <IconButton size="small" variant="body1" sx={{ cursor: "pointer", color: "white" }} align="center">
          <Avatar sx={{ width: 32, height: 32, marginRight: "1px" }}>{initialsOfName}</Avatar>Profile
        </IconButton>
      </Link>
      <CartWidget />
    </Box>
  );
};
