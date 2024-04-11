import { Toolbar, Container, Paper, Typography, Box } from "@mui/material";
import React from "react";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const entries = [
    ["first_name", "Nombre :"],
    ["last_name", "Apellido: "],
    ["email", "Email: "],
    ["role", "Rol: "],
  ];

  return (
    <>
      <Toolbar />
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ display: "flex", justifyContent: "center", height: "80vh" }}>
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
        </Paper>
      </Container>
    </>
  );
};

export default Profile;
