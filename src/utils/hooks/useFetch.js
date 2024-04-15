import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const useFetch = (url, method = "GET", dependencies = []) => {
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
  }, [url, method, ...dependencies]);

  useEffect(() => {
    fetchFunction();
  }, [...dependencies]);

  const refreshPayloadAfterDeletion = useCallback(
    (id) => {
      const refreshedItems = payload.filter((item) => item._id !== id);
      setPayload(refreshedItems);
    },
    [url, method, payload, ...dependencies]
  );

  return { payload, refreshPayloadAfterDeletion };
};

export default useFetch;
