import { useFormik } from "formik";
import Login from "./Login";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

function LoginContainer() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const { setUserData } = useContext(UserContext);
  const loginUser = async ({ email, password }) => {
    fetch("http://localhost:8080/api/sessions/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((json) => {
        setUserData(json.description.dtoUser);
        localStorage.setItem("user", JSON.stringify(json.description.dtoUser));
        navigate("/products");
      })
      .catch((err) => console.log(err));
  };

  const { handleChange, handleSubmit, values, errors } = useFormik({
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
