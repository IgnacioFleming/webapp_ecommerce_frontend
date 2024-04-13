import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import Loader from "../Loader/Loader";
import useFetch from "../../utils/hooks/useFetch";
const BASE_URL = "http://localhost:8080";
const ItemListContainer = () => {
  const { categoryName } = useParams();
  const location = useLocation();
  useEffect(() => {
    if (location === "/products" && !localStorage.getItem("user")) {
      fetch(`${BASE_URL}/api/sessions/current`)
        .then((res) => res.json())
        .then((json) => {
          localStorage.setItem("user", JSON.stringify(json));
        })
        .catch((err) => (window.location.href = "/login"));
      console.log("entre en el if");
    }
  }, []);

  const url = !categoryName ? `${BASE_URL}/api/products` : `${BASE_URL}/api/products?query=${JSON.stringify({ category: categoryName })}`;
  const { payload } = useFetch(url, "GET", [categoryName]);

  return <>{!payload ? <Loader /> : <ItemList items={payload} />}</>;
};

export default ItemListContainer;
