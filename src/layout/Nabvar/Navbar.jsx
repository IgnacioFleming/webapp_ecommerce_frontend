import { AppBar, CssBaseline, Hidden, Toolbar } from "@mui/material";
import { NavigationMenu } from "./NavigationMenu";
import { Link, Outlet } from "react-router-dom";
import { useGetUserData } from "../../hooks/useGetUserData";
import ResponsiveNavigationMenu from "./ResponsiveNavigationMenu";
import DrawerMenu from "../Drawer/Drawer";
import { useState } from "react";
const Navbar = () => {
  useGetUserData();
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = (newOpen) => {
    setOpenDrawer(newOpen);
  };
  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <img src="https://res.cloudinary.com/dah7yxmc5/image/upload/v1680611686/Eccomerce/logo_ecommerce_ci16kw.png" alt="Logo de la empresa" />
          </Link>
          <Hidden mdDown>
            <NavigationMenu />
          </Hidden>
          <Hidden mdUp>
            <ResponsiveNavigationMenu toggleDrawer={toggleDrawer} openDrawer={openDrawer} />
          </Hidden>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {openDrawer && (
        <Hidden mdUp>
          <DrawerMenu openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
        </Hidden>
      )}
      <Outlet />
    </>
  );
};

export default Navbar;
