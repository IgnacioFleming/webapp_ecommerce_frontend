import { Grid, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { useState } from "react";
const alignment = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
export const CategoriesDesktop = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
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
        console.log(categories);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Grid container sx={{ justifyContent: "center" }}>
      {categories.map((category) => {
        return (
          <Grid item xs={2} sx={alignment} key={category.id}>
            <Typography
              variant="h6"
              onClick={() => navigate(category.path)}
              sx={{ cursor: "pointer" }}
              align="center"
            >
              {category.title}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
};
