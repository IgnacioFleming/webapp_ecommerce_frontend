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
};
const MyTickets = () => {
  const { user } = useContext(UserContext);
  const url = `${import.meta.env.VITE_APP_BASE_URL}` + (user.first_name === "Admin_User" ? `/api/tickets` : `/api/tickets/${user.email}`);
  const myTickets = useFetch(url, "GET");
  const navigate = useNavigate();
  if (myTickets.payload?.length <= 0) boxStyle.height = "80vh";
  return (
    <>
      <Box sx={boxStyle}>
        {myTickets.payload?.length === 0 ? (
          <Typography variant="h4" color="initial">
            You have not purchases yet.
          </Typography>
        ) : (
          <StackOfTickets array={myTickets.payload} isAdmin={user.first_name === "Admin_User" ? true : false} />
        )}
        <Button variant="contained" onClick={() => navigate("/products")}>
          Go Back
        </Button>
      </Box>
    </>
  );
};

export default MyTickets;
