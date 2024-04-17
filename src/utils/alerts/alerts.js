import Swal from "sweetalert2";

const errorAlert = (text) => {
  return Swal.fire({ title: "Ocurrió un error!", icon: "error", timer: 4000, text });
};

const warningAlert = ({ title = "Warning", text = "Do you want to confirm this action?", needConfirmation = false, icon = "warning", confirmButtonText = "OK", timer = 0, html }) => {
  return Swal.fire({
    title,
    text: !html && text,
    timer,
    icon,
    showCancelButton: needConfirmation,
    confirmButtonText,
    html,
  });
};

const successAlert = (title, text) => {
  return Swal.fire({
    title,
    text,
    timer: 4000,
    icon: "success",
  });
};

export default {
  errorAlert,
  warningAlert,
  successAlert,
};
