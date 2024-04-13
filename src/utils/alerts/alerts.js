import Swal from "sweetalert2";

const errorAlert = (text) => {
  return Swal.fire({ title: "Ocurrió un error!", icon: "error", timer: 4000, text });
};

const warningAlert = (title, text) => {
  return Swal.fire({
    title,
    text,
    timer: 4000,
    icon: "warning",
  });
};

export default {
  errorAlert,
  warningAlert,
};
