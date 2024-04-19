import { Box } from "@mui/material";
import { MdOutlineMenu } from "react-icons/md";
const alignment = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
};
function ResponsiveNavigationMenu() {
  return (
    <Box sx={alignment}>
      <MdOutlineMenu size={40} />
    </Box>
  );
}

export default ResponsiveNavigationMenu;
