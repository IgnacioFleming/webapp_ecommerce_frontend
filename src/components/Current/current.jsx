import { useEffect, useState } from "react";

function Current() {
  const [user, setUser] = useState({});
  useEffect(() => {
    fetch("http://localhost:8080/api/sessions/current", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setUser(json);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <p>{JSON.stringify(user)}</p>
    </div>
  );
}

export default Current;
