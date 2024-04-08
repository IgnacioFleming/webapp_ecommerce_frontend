import { useEffect, useState } from "react";
import Register from "./Register";
import { useFormik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert2";

function RegisterContainer() {
  const [submitted, setSubmitted] = useState(false);
  const registerUser = async (data) => {
    fetch("http://localhost:8080/api/sessions/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "error") {
          swal.fire({
            title: "We're sorry",
            text: "User email already exists. Please Login or try registering with another email",
            icon: "error",
          });
          return;
        }
        swal.fire({
          title: "Registration completed!",
          text: "You have been registered successfully. Please Login to start purchasing",
          icon: "success",
        });
      })
      .catch((err) => {
        swal.fire({
          title: "We're Sorry",
          text: "An Error ocurred during your registration. Please try again later.",
          icon: "error",
        });
      });
  };
  const { handleChange, handleSubmit, values, errors } = useFormik({
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
  return <Register handleChange={handleChange} handleSubmit={handleSubmit} values={values} errors={errors} />;
}

export default RegisterContainer;
