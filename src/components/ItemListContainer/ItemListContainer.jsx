import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import Loader from "../Loader/Loader";

const ItemListContainer = () => {
  const [items, setItems] = useState([]);

  const { categoryName } = useParams();

  useEffect(() => {
    let consulta;
    const itemCollection = collection(db, "products");

    if (categoryName) {
      const q = query(itemCollection, where("category", "==", categoryName));
      consulta = q;
    } else {
      consulta = itemCollection;
    }

    getDocs(consulta)
      .then((response) => {
        const products = response.docs.map((e) => {
          return { ...e.data(), id: e.id };
        });

        setItems(products);
      })
      .catch((err) => console.log(err));
  }, [categoryName]);

  return <>{items.length === 0 ? <Loader /> : <ItemList items={items} />}</>;
};

export default ItemListContainer;
