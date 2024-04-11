import { Avatar, Button, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { useState } from "react";
import Dropdown from "./Dropdown";
const alignment = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
export const NavigationMenu = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const initialsOfName = userInfo.first_name[0] + userInfo.last_name[0];
  useEffect(() => {
    const categoriesCollection = collection(db, "categories");
    getDocs(categoriesCollection)
      .then((res) => {
        const itemCategories = res.docs.map((category) => {
          return {
            ...category.data(),
            id: category.id,
          };
        });
        setCategories(itemCategories);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Grid container sx={{ justifyContent: "center" }}>
      <Grid item xs={4} sx={alignment}>
        <Dropdown type="text" title="Categorías" listItems={categories} />
      </Grid>
      <Grid item xs={4} sx={alignment}>
        <IconButton size="small" variant="body1" onClick={() => navigate("")} sx={{ cursor: "pointer", color: "white" }} align="center">
          <Avatar sx={{ width: 32, height: 32, marginRight: "1px" }}>{initialsOfName}</Avatar>
          Perfil
        </IconButton>
      </Grid>
    </Grid>
  );
};
