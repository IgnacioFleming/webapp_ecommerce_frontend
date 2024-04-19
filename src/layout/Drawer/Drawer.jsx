import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Toolbar } from "@mui/material";
import { useSetDrawerCategories } from "../../hooks/useSetDrawerCategories";

export default function DrawerMenu({ openDrawer, toggleDrawer }) {
  const categories = useSetDrawerCategories();

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => toggleDrawer(false)}>
      <List>
        <Toolbar />
        {categories.map((category, index) => {
          return (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>{category.icon}</ListItemIcon>
                <ListItemText primary={category.title} sx={{ display: "flex", alignItems: "center", margin: 0, paddingTop: 0 }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
