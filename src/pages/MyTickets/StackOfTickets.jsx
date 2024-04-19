import { Box, Button, Stack, Typography } from "@mui/material";
import StackOfProducts from "../../components/StackOfProducts/StackOfProducts";
import { Container } from "../../utils/styledComponents/Container";
import { formatDate } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

const StackOfTickets = ({ array, isAdmin }) => {
  const navigate = useNavigate();
  if (!Array.isArray(array)) return null;

  return (
    <>
      <Stack
        direction="column"
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          marginTop: 5,
          marginBottom: 5,
        }}
        spacing={5}
      >
        {array &&
          array.map((e) => {
            return (
              <Container
                sx={{
                  width: "80%",
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
                  {formatDate(e.purchase_datetime)}
                </Typography>
                <StackOfProducts array={e.products} />
                <Box>
                  <Typography mb={2} variant="h5" color="initial">
                    <span style={{ fontWeight: 700 }}>Amount:</span> ${e.amount.toLocaleString()}
                  </Typography>
                </Box>
              </Container>
            );
          })}
        <Button variant="contained" onClick={() => navigate("/products")}>
          Go Back
        </Button>
      </Stack>
    </>
  );
};

export default StackOfTickets;
