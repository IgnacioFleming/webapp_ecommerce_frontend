import { useEffect, useState } from "react";
import { BiPurchaseTag } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import { useShowCart } from "./useShowCart";
import { RiShoppingCartLine } from "react-icons/ri";
import { BsBagDashFill } from "react-icons/bs";

const initialCategories = [
  { title: "Products", icon: <BsBagDashFill size={25} /> },
  { title: "My Purchases", icon: <BiPurchaseTag size={25} /> },
  { title: "Profile", icon: <MdAccountCircle size={25} /> },
];
const cartCategory = {
  title: "Cart",
  icon: <RiShoppingCartLine size={25} />,
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
