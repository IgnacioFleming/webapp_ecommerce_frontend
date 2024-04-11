import { Toolbar, Container, Paper, Typography, Box, Button } from "@mui/material";
import React from "react";

const Profile = () => {
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
          <div style={{ border: "solid 1px black", width: 250, height: 250, borderRadius: 150 }}></div>
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
          <Button variant="contained" onClick={handleLogOut}>
            Log Out
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default Profile;
