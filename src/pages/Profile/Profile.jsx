import { Toolbar, Container, Paper, Typography, Box, Button } from "@mui/material";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import alerts from "../../utils/alerts/alerts";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { MdEdit } from "react-icons/md";
import UploadButton from "../../components/FileUpload/UploadButton";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const entries = [
    ["first_name", "Nombre :"],
    ["last_name", "Apellido: "],
    ["email", "Email: "],
    ["role", "Rol: "],
  ];

  const handleLogOut = async () => {
    fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/sessions/logout`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") {
          localStorage.clear("user");
          return (window.location.href = "/login");
        }
        return alerts.errorAlert(json.message);
      });
  };

  return (
    <>
      <Toolbar />
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 10 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, justifyContent: "center" }}>
            <div className={styles.imgContainer}>
              <img className={styles.profileImg} src={user.profile_image || "https://res.cloudinary.com/dah7yxmc5/image/upload/v1736197523/Eccomerce/Profile/default-avatar_oarvax.jpg"} alt="Profile Image" />
              <UploadButton variant="contained" icon={<MdEdit color="white" size={20} />} sx={{ width: 30, height: 30, borderRadius: "150px", padding: 0, position: "absolute", right: 0, bottom: 0 }} />
            </div>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {entries.map(([entry, text], index) => {
                if (!user[entry]) return;
                return (
                  <Typography key={index} variant="body" color="initial" sx={{ display: "flex" }}>
                    <strong style={{ display: "block", width: 80 }}>{text}</strong>
                    {user[entry]}
                  </Typography>
                );
              })}
              <Box sx={{ display: "flex", gap: 1, marginTop: 2 }}>
                <Button variant="contained" onClick={handleLogOut} size="small">
                  Log Out
                </Button>
                <Button variant="contained" onClick={() => navigate("/")} size="small">
                  Volver
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Profile;
