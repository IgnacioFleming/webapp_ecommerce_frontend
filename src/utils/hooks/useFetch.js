import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const useFetch = (url, method, dependencies = []) => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState();
  const fetchFunction = useCallback(() => {
    fetch(url, {
      method,
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => setPayload(json.payload))
      .catch((err) => navigate("/login"));
  }, []);
  useEffect(() => fetchFunction(), dependencies);
  return { payload };
};

export default useFetch;
