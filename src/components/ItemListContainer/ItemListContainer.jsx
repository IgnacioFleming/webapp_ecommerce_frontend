import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import Loader from "../Loader/Loader";
import useFetch from "../../utils/hooks/useFetch";

const ItemListContainer = () => {
  // const [items, setItems] = useState([]);

  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { payload } = useFetch("http://localhost:8080/api/products", "GET", [categoryName]);
  console.log(payload);
  // useEffect(() => {
  //   fetch("http://localhost:8080/api/products", {
  //     method: "GET",
  //     credentials: "include",
  //   })
  //     .then((res) => res.json())
  //     .then((json) => setItems(json.payload))
  //     .catch((err) => navigate("/login"));
  // }, [categoryName]);

  return <>{!payload ? <Loader /> : <ItemList items={payload} />}</>;
};

export default ItemListContainer;
