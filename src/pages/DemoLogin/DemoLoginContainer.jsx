import { useFormik } from "formik";
import DemoLogin from "./DemoLogin";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function DemoLoginContainer() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const { setUserData, setNewToken } = useContext(UserContext);

  const { handleChange, handleSubmit, values, errors, resetForm } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: loginUser,
  });
  async function loginUser() {
    fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/sessions/demo-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "mockEmail", password: "mockPass" }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") {
          setUserData(json.payload.dtoUser);
          setNewToken(json.payload.token);
          navigate("/products");
        } else {
          Swal.fire({ title: "Invalid Credentials", text: "User or Password values are incorrect.", timer: 6000, icon: "warning" });
        }
      })
      .catch(() => {
        resetForm();
        Swal.fire({ title: "Service not available", text: "Currently this service is not available, pleas try again later.", timer: 6000, icon: "error" });
      });
  }

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      setSubmitted(true);
    }
  }, [errors]);

  return (
    <div>
      <DemoLogin handleChange={handleChange} handleSubmit={handleSubmit} values={values} errors={errors} />
    </div>
  );
}

export default DemoLoginContainer;
