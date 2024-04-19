import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { Toolbar } from "@mui/material";
import { BsBagDashFill } from "react-icons/bs";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";

const categories = [
  { title: "Products", icon: <BsBagDashFill size={25} /> },
  { title: "My Purchases", icon: <BiSolidPurchaseTag size={25} /> },
  { title: "Profile", icon: <MdAccountCircle size={25} /> },
];

export default function DrawerMenu() {
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <Toolbar />
        {categories.map((category, index) => {
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>{category.icon}</ListItemIcon>
              <ListItemText primary={category.title} sx={{ display: "flex", alignItems: "center", margin: 0, paddingTop: 1 }} />
            </ListItemButton>
          </ListItem>;
        })}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
