import { AppBar, CssBaseline, Toolbar } from "@mui/material";
import { NavigationMenu } from "./NavigationMenu";
import { Link, Outlet } from "react-router-dom";
import { useGetUserData } from "../../utils/hooks/useGetUserData";
const Navbar = () => {
  useGetUserData();
  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Link to="/">
            <img src="https://res.cloudinary.com/dah7yxmc5/image/upload/v1680611686/Eccomerce/logo_ecommerce_ci16kw.png" alt="Logo de la empresa" />
          </Link>
          <NavigationMenu />
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Outlet />
    </>
  );
};

export default Navbar;
