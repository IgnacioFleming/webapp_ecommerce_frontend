import { IconButton, List, ListItemButton, ListItemText, Menu } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useState } from "react";

const paperProps = {
  elevation: 0,
  sx: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    width: "150px",
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      left: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
};

const Dropdown = ({ title, type, listItems }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {type === "text" && (
        <IconButton onClick={handleClick} sx={{ color: "white" }} size="small" aria-controls={open ? "account-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined}>
          {title} <RiArrowDropDownLine size="2em" />
        </IconButton>
      )}
      <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose} transformOrigin={{ horizontal: "left", vertical: "top" }} anchorOrigin={{ horizontal: "left", vertical: "bottom" }} PaperProps={paperProps}>
        <List>
          {listItems.map((item) => {
            const path = item?._id?.toLowerCase() === "todos" ? "/products" : `/products/category/${item._id.toLowerCase()}`;
            return (
              <ListItemButton key={item._id} onClick={() => navigate(path)}>
                <ListItemText onClick={handleClose} primary={item._id} sx={{ textTransform: "capitalize" }} />
              </ListItemButton>
            );
          })}
        </List>
      </Menu>
    </>
  );
};

export default Dropdown;
