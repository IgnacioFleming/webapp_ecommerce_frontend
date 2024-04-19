import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import useFetch from "../../hooks/useFetch";
const ItemListContainer = () => {
  const { categoryName } = useParams();

  const url = !categoryName ? `${import.meta.env.VITE_APP_BASE_URL}/api/products?limit=1000` : `${import.meta.env.VITE_APP_BASE_URL}/api/products?query=${JSON.stringify({ category: categoryName })}&limit=1000`;
  const { payload, refreshPayloadAfterDeletion } = useFetch(url, "GET", [categoryName]);
  const { user } = useContext(UserContext);

  return <>{!payload || !user ? <Loader /> : <ItemList items={payload} refresh={refreshPayloadAfterDeletion} />}</>;
};

export default ItemListContainer;
