import React, { useContext, useEffect, useState } from "react";
import FormCheckout from "./FormCheckout";
import { useFormik } from "formik";
import * as Yup from "yup";

const FormCheckoutContainer = ({ completePurchase }) => {
  const [validation, setValidation] = useState(false);
  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      telefono: "",
      email: "",
      confirmarEmail: "",
    },
    onSubmit: completePurchase,
    validationSchema: Yup.object().shape({
      nombre: Yup.string()
        .required("Este campo es obligatorio")
        .max(20, "El nombre debe tener como máximo 20 caracteres"),
      apellido: Yup.string()
        .required("Este campo es obligatorio")
        .max(20, "El nombre debe tener como máximo 20 caracteres"),
      telefono: Yup.number()
        .max(
          1000000000000000,
          "El telefono debe tener 15 caracteres como máximo"
        )
        .typeError("Debe ingresar un número")
        .required("Este campo es obligatorio"),
      email: Yup.string()
        .required("Este campo es obligatorio")
        .email("Este campo debe ser un email"),
      confirmarEmail: Yup.string()
        .required("Este campo es obligatorio")
        .oneOf([Yup.ref("email")], "Los correos no coinciden"),
    }),

    validateOnChange: false,
  });
  useEffect(() => {
    if (
      !values.nombre ||
      !values.apellido ||
      !values.telefono ||
      !values.email ||
      !values.confirmarEmail
    ) {
      setValidation(false);
    } else {
      setValidation(true);
    }
  }, [values]);

  return (
    <FormCheckout
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      errors={errors}
      values={values}
      validation={validation}
    />
  );
};

export default FormCheckoutContainer;
