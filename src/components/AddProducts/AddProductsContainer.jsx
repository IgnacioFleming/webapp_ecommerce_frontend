import { useFormik } from "formik";
import AddProducts from "./AddProducts";
import * as Yup from "yup";
import { useState } from "react";

function AddProductsContainer() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const { handleChange, handleSubmit, values, errors, resetForm } = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      price: "",
      code: "",
      stock: "",
      status: true,
    },
    onSubmit: createProduct,
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Title field is required"),
      description: Yup.string().required("Description field is required"),
      category: Yup.string().required("Category field is required"),
      price: Yup.number().required("Price field is required"),
      code: Yup.string().required("Code field is required"),
      stock: Yup.number().required("Stock field is required"),
      status: Yup.boolean(),
      images: Yup.string(),
    }),
    validateOnChange: false,
  });

  async function createProduct(data) {
    const formData = new FormData();
    Object.entries(data).forEach(([name, value]) => {
      formData.append(name, value);
    });
    selectedFiles.length > 0 && selectedFiles.forEach((file) => formData.append("thumbnail", file));

    fetch("http://localhost:8080/api/products", {
      credentials: "include",
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") return console.log(json);
        console.log("error al crear el producto");
      })
      .catch((err) => console.log(err));
  }
  return <AddProducts handleChange={handleChange} handleSubmit={handleSubmit} values={values} errors={errors} setSelectedFiles={setSelectedFiles} selectedFiles={selectedFiles} />;
}

export default AddProductsContainer;
