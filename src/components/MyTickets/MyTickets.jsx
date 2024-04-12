import { useEffect, useState } from "react";
import useFetch from "../../utils/hooks/useFetch";
import StackOfProducts from "../StackOfProducts/StackOfProducts";
import { Box, Typography } from "@mui/material";
const MyTickets = () => {
  const myTickets = useFetch("http://localhost:8080/api/tickets", "GET", []);
  return (
    <>
      {myTickets.payload &&
        myTickets.payload.map((ticket) => {
          return (
            <Box key={ticket._id} sx={{ border: "1px solid black" }}>
              <Typography variant="subtitle1" color="initial">
                {ticket.code}
              </Typography>
              <Typography variant="subtitle1" color="initial">
                {ticket.amount}
              </Typography>
            </Box>
          );
        })}
      <StackOfProducts array={myTickets.payload} />
    </>
  );
};

export default MyTickets;
