import { Toolbar, Container, Paper, Typography, Box, Button } from "@mui/material";
import React from "react";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const entries = [
    ["first_name", "Nombre :"],
    ["last_name", "Apellido: "],
    ["email", "Email: "],
    ["role", "Rol: "],
  ];

  const handleLogOut = async () => {
    fetch("http://localhost:8080/api/sessions/logout", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") return (window.location.href = "/login");
        return console.log(json.message);
      });
  };

  return (
    <>
      <Toolbar />
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "80vh", gap: 10 }}>
          <div className={styles.imgContainer}>
            <img className={styles.profileImg} src="https://res.cloudinary.com/dah7yxmc5/image/upload/v1724515550/Eccomerce/Profile/profile-img_qth3s5.jpg" alt="Profile Image" />
          </div>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, justifyContent: "center" }}>
            {entries.map(([entry, text], index) => {
              if (!user[entry]) return;
              return (
                <Typography key={index} variant="h4" color="initial">
                  <strong>{text}</strong>
                  {user[entry]}
                </Typography>
              );
            })}
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" onClick={handleLogOut}>
              Log Out
            </Button>
            <Button variant="contained" onClick={() => navigate("/")}>
              Volver
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Profile;
