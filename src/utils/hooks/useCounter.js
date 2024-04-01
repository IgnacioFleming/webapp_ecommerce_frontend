import { useState } from "react";

const useCounter = (initial) => {
  const [counter, setCounter] = useState(initial);
  const agregar = (stock) => {
    counter < stock && setCounter(counter + 1);
  };
  const quitar = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };
  const reset = () => setCounter(initial);
  return { counter, agregar, quitar, reset };
};

export default useCounter;
