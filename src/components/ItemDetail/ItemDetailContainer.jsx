import React, { useContext, useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import Swal from "sweetalert2";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const { addToCart, getCartQuantity } = useContext(CartContext);

  useEffect(() => {
    fetch(`http://localhost:8080/api/products/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        setItem(json.payload);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const onAdd = (cantidad) => {
    cantidad > 0 && addToCart(item._id, { quantity: cantidad });
    Swal.fire({
      position: "center",
      icon: "success",
      title: `Producto agregado al carrito`,
      showConfirmButton: true,
      timer: 1500,
    });
  };
  let quantity = getCartQuantity(item._id);

  return (
    <>
      <ItemDetail item={item} onAdd={onAdd} quantity={quantity} />
    </>
  );
};

export default ItemDetailContainer;
