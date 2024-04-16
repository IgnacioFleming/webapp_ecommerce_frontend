import styled from "@emotion/styled";
import { Button } from "@mui/material";
import alerts from "../../utils/alerts/alerts";
import UserApiCall from "../../services/UserApiCall";
import { useContext, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import React from "react";

const VissualyHiddenInput = styled(
  React.forwardRef(function FileInput(props, ref) {
    return <input {...props} ref={ref} />;
  })
)({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function UploadButton({ multiple = false, icon, variant, sx, text = "" }) {
  const { user, updateUserProfileImage } = useContext(UserContext);
  const fileRef = useRef(null);
  const buildFormDataWithFile = (file) => {
    const formData = new FormData();
    formData.append("profileImage", file);
    return formData;
  };

  const handleSelectFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      const html = `<p>"Do you want to change your profile image for this?"</p>
      <img style="width:100px; height:100px; object-fit:contain; margin:20px;" src="${reader.result}" alt="File selected image" />
      `;
      const selection = await alerts.warningAlert({ title: "Info", html, needConfirmation: true, confirmButtonText: "Yes", icon: "info" });
      if (selection.isConfirmed) {
        const formData = buildFormDataWithFile(e.target.files[0]);
        const uploadData = new UserApiCall();
        const result = await uploadData.upload(user.id, formData);
        if (result?.status === "success") return updateUserProfileImage(result.payload);
        else alerts.errorAlert("There was an error while processing your data");
      } else {
        if (fileRef.current) fileRef.current.value = "";
      }
    };
    reader.readAsDataURL(file);
  };
  return (
    <>
      <Button component="label" sx={{ minWidth: 0, display: "flex", gap: 1, justifyContent: "center", alignItems: "center", ...sx }} role={undefined} variant={variant} tabIndex={-1}>
        {icon}
        {text}
        <VissualyHiddenInput ref={fileRef} type="file" onChange={handleSelectFile} multiple={multiple} />
      </Button>
    </>
  );
}

export default UploadButton;
