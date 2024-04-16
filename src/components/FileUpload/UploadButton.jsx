import styled from "@emotion/styled";
import { Button } from "@mui/material";
import alerts from "../../utils/alerts/alerts";
import UserApiCall from "../../services/UserApiCall";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const VissualyHiddenInput = styled("input")({
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
  const buildFormDataWithFile = (file) => {
    const formData = new FormData();
    formData.append("profileImage", file);
    return formData;
  };

  const handleSelectFile = async (e) => {
    const selection = await alerts.warningAlert({ title: "Info", text: "Do you want to change your profile image for this?", needConfirmation: true, confirmButtonText: "Yes", icon: "info" });
    if (selection.isConfirmed) {
      const formData = buildFormDataWithFile(e.target.files[0]);
      const uploadData = new UserApiCall();
      const result = await uploadData.upload(user.id, formData);
      if (result?.status === "success") return updateUserProfileImage(result.payload);
      else alerts.errorAlert("There was an error while processing your data");
    }
  };
  return (
    <>
      <Button component="label" sx={{ minWidth: 0, display: "flex", gap: 1, justifyContent: "center", alignItems: "center", ...sx }} role={undefined} variant={variant} tabIndex={-1}>
        {icon}
        {text}
        <VissualyHiddenInput type="file" onChange={handleSelectFile} multiple={multiple} />
      </Button>
    </>
  );
}

export default UploadButton;
