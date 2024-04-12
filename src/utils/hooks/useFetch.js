import { useEffect, useState } from "react";

const useFetch = (url, method, dependencies = []) => {
  const [payload, setPayload] = useState();
  useEffect(() => {
    fetch(url, {
      method,
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => setPayload(json.payload));
  }, dependencies);

  return { payload };
};

export default useFetch;
