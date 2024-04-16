import { useFormik } from "formik";
import Login from "./Login";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function LoginContainer() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const { setUserData } = useContext(UserContext);

  const { handleChange, handleSubmit, values, errors, resetForm } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: loginUser,
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Email field is required").email("This field must be an email"),
      password: Yup.string().required("Password fiel is required"),
    }),
    validateOnChange: submitted,
  });
  async function loginUser({ email, password }) {
    fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/sessions/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") {
          setUserData(json.description.dtoUser);
          navigate("/products");
        } else {
          Swal.fire({ title: "Credenciales Inválidas", text: "El usuario o la contraseña son incorrectos.", timer: 6000, icon: "warning" });
        }
      })
      .catch(() => {
        resetForm();
        Swal.fire({ title: "Servicio no disponible", text: "Actualmente el servicio no se encuentra disponible, por favor intente más tarde", timer: 6000, icon: "error" });
      });
  }

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      setSubmitted(true);
    }
  }, [errors]);

  return (
    <div>
      <Login handleChange={handleChange} handleSubmit={handleSubmit} values={values} errors={errors} />
    </div>
  );
}

export default LoginContainer;
