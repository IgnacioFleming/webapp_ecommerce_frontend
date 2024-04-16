import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import { useFormik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert2";

function RegisterContainer() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const { handleChange, handleSubmit, values, errors, resetForm } = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    onSubmit: registerUser,
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required("First Name is required"),
      last_name: Yup.string().required("Last Name is required"),
      email: Yup.string().required("Email field is required").email("This field must be an email"),
      password: Yup.string()
        .required("Password field is required")
        .min(8, "Password field must be at least 8 characters long")
        .matches(/^(?=.*\d)(?=.*\W)(?=.*[a-z])(?=.*[A-Z]).*$/, {
          message: "Password field must contain at least one uppercase, one lowercase, one digit and one special character",
        }),
      confirm_password: Yup.string()
        .required("Password confirmation is required")
        .oneOf([Yup.ref("password")], "Doesn't match your entered password"),
    }),
    validateOnChange: submitted,
  });
  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      setSubmitted(true);
    }
  }, [errors]);

  async function registerUser(data) {
    fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/sessions/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "error") {
          swal
            .fire({
              title: "We're sorry",
              text: "User email already exists. Please Login or try registering with another email",
              icon: "error",
            })
            .then(() => resetForm());
          return;
        }
        swal
          .fire({
            title: "Registration completed!",
            text: "You have been registered successfully. Please Login to start purchasing",
            icon: "success",
            confirmButtonText: "Go to Login",
          })
          .then((res) => {
            if (res.isConfirmed) {
              navigate("/login");
            }
          });
      })
      .catch((err) => {
        swal
          .fire({
            title: "We're Sorry",
            text: err,
            icon: "error",
          })
          .then(() => resetForm());
      });
  }

  return <Register handleChange={handleChange} handleSubmit={handleSubmit} values={values} errors={errors} />;
}

export default RegisterContainer;
