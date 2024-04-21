import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const useFetch = (url, method = "GET", dependencies = []) => {
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const [payload, setPayload] = useState();
  const fetchFunction = useCallback(() => {
    fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "error") navigate("/login");
        else setPayload(json.payload);
      })
      .catch(() => navigate("/login"));
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
