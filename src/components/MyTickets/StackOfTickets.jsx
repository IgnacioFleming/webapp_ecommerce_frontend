import { Box, Paper, Stack, styled, Typography } from "@mui/material";
import StackOfProducts from "../StackOfProducts/StackOfProducts";
import { Item } from "../../utils/styledComponents/Item";

const StackOfTickets = ({ array, isAdmin }) => {
  if (!Array.isArray(array)) return null;
  return (
    <Stack
      direction="column"
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
      }}
      spacing={5}
    >
      {array &&
        array.map((e) => {
          return (
            <Item
              sx={{
                width: "80%",
                height: "auto",
              }}
              key={e._id}
              elevation={5}
            >
              {isAdmin && (
                <Typography mt={2} variant="h5" color="initial" sx={{ fontWeight: "600" }}>
                  Comprador: {e.purchaser}
                </Typography>
              )}
              <Typography mt={2} variant="h5" color="initial" sx={{ fontWeight: "600" }}>
                {e.purchase_datetime}
              </Typography>
              <StackOfProducts array={e.products} />
              <Box>
                <Typography mb={2} variant="h5" color="initial">
                  <span style={{ fontWeight: 700 }}>Total:</span> ${e.amount.toLocaleString()}
                </Typography>
              </Box>
            </Item>
          );
        })}
    </Stack>
  );
};

export default StackOfTickets;
