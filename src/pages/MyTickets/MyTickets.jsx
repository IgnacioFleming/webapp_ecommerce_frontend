import { Box, Button, Typography } from "@mui/material";
import StackOfTickets from "./StackOfTickets";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import useFetch from "../../hooks/useFetch";
const boxStyle = {
  paddingTop: 5,
  paddingBottom: 5,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 5,
  height: "80vh",
};
const MyTickets = () => {
  const { user } = useContext(UserContext);
  const url = `${import.meta.env.VITE_APP_BASE_URL}` + (user.first_name === "Admin_User" ? `/api/tickets` : `/api/tickets/${user.email}`);
  const myTickets = useFetch(url, "GET");
  const navigate = useNavigate();

  return (
    <>
      {myTickets.payload?.length === 0 ? (
        <Box sx={boxStyle}>
          <Typography variant="h4" color="initial">
            You have not purchases yet.
          </Typography>
          <Button variant="contained" onClick={() => navigate("/products")}>
            Go Back
          </Button>
        </Box>
      ) : (
        <StackOfTickets array={myTickets.payload} isAdmin={user.first_name === "Admin_User" ? true : false} />
      )}
    </>
  );
};

export default MyTickets;
