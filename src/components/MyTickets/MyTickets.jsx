import { Box, Button, Typography } from "@mui/material";
import useFetch from "../../utils/hooks/useFetch";
import StackOfTickets from "./StackOfTickets";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
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
  const url = user.first_name === "Admin_User" ? "http://localhost:8080/api/tickets" : `http://localhost:8080/api/tickets/${user.email}`;
  const myTickets = useFetch(url, "GET");
  console.log(myTickets.payload);
  const navigate = useNavigate();
  if (myTickets.payload?.length === 0) boxStyle.height = "80vh";
  return (
    <>
      <Box sx={boxStyle}>
        {myTickets.payload?.length === 0 ? (
          <Typography variant="h4" color="initial">
            Aún no realizaste compras.
          </Typography>
        ) : (
          <StackOfTickets array={myTickets.payload} isAdmin={user.first_name === "Admin_User" ? true : false} />
        )}
        <Button variant="contained" onClick={() => navigate("/products")}>
          Volver
        </Button>
      </Box>
    </>
  );
};

export default MyTickets;
