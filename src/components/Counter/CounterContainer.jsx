import { useEffect, useState } from "react";
import Counter from "./Counter";

const CounterContainer = ({ stock, onAdd, initial = 1 }) => {
  const [notDisabled, setNotDisabled] = useState(false);
  useEffect(() => {
    stock !== 0 && setNotDisabled(true);
  }, []);
  return <Counter stock={stock} onAdd={onAdd} initial={initial} notDisabled={notDisabled} />;
};

export default CounterContainer;
