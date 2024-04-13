import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import useFetch from "../../utils/hooks/useFetch";
import { useGetUserData } from "../../utils/hooks/useGetUserData";
const BASE_URL = "http://localhost:8080";
const ItemListContainer = () => {
  const { categoryName } = useParams();

  const url = !categoryName ? `${BASE_URL}/api/products` : `${BASE_URL}/api/products?query=${JSON.stringify({ category: categoryName })}`;
  const { payload } = useFetch(url, "GET", [categoryName]);
  const { user } = useGetUserData();

  return <>{!payload || !user ? <Loader /> : <ItemList items={payload} />}</>;
};

export default ItemListContainer;
