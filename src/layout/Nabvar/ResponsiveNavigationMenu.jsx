import { Box } from "@mui/material";
import { MdOutlineMenu } from "react-icons/md";
const alignment = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
};
function ResponsiveNavigationMenu({ toggleDrawer, openDrawer }) {
  return (
    <Box sx={alignment}>
      <MdOutlineMenu size={40} onClick={() => toggleDrawer(!openDrawer)} />
    </Box>
  );
}

export default ResponsiveNavigationMenu;
