import { AppBar, Box, CssBaseline, Drawer, Hidden, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { NavigationMenu } from "./NavigationMenu";
import CartWidget from "../CartWidget/CartWidget";
import { Link, Outlet } from "react-router-dom";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const Navbar = () => {
  const drawerWidth = 240;
  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Link to="/">
            <img src="https://res.cloudinary.com/dah7yxmc5/image/upload/v1680611686/Eccomerce/logo_ecommerce_ci16kw.png" alt="Logo de la empresa" />
          </Link>
          <NavigationMenu />
          <CartWidget />
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Outlet />
    </>
  );
};

export default Navbar;
