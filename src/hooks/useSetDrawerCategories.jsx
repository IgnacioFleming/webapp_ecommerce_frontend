import { useEffect, useState } from "react";
import { BiPurchaseTag } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import { useShowCart } from "./useShowCart";
import { RiShoppingCartLine } from "react-icons/ri";
import { BsBagDashFill } from "react-icons/bs";

const initialCategories = [
  { title: "Products", icon: <BsBagDashFill size={25} />, path: "/products" },
  { title: "My Purchases", icon: <BiPurchaseTag size={25} />, path: "/tickets" },
  { title: "Profile", icon: <MdAccountCircle size={25} />, path: "/profile" },
];
const cartCategory = {
  title: "Cart",
  icon: <RiShoppingCartLine size={25} />,
  path: "/cart",
};
export const useSetDrawerCategories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const showCart = useShowCart();
  useEffect(() => {
    if (showCart) setCategories([...initialCategories, cartCategory]);
    else setCategories(initialCategories);
  }, [showCart]);
  return categories;
};
