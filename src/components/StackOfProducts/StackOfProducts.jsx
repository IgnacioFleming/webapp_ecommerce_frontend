import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { Container } from "../../utils/styledComponents/Container";
import { formatCurrency } from "../../utils/utils";

const StackOfProducts = ({ array, hasDeleteAction, deleteFromCart }) => {
  if (!Array.isArray(array)) return null;
  return (
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
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
              key={e._id}
              elevation={5}
            >
              <Grid container>
                <Grid item xs={12} md={4} sx={{ display: "flex", alignItems: { xs: "center", md: "flex-start" }, height: "100%", flexDirection: "column", gap: 2, overflow: "hidden" }}>
                  <Box sx={{ margin: 2 }}>
                    <img
                      style={{
                        height: 180,
                        width: 180,
                        objectFit: "cover",
                      }}
                      src={e.product?.thumbnails[0]}
                    />
                    <Typography variant="h6" color="initial">
                      {e.product?.title}
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={8}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                    flexWrap: "wrap",
                    overflow: "hidden",
                  }}
                >
                  <Typography variant="subtitle1" color="initial">
                    <strong>Quantity:</strong> {e.quantity}
                  </Typography>
                  <Typography variant="subtitle1" color="initial">
                    <strong>Amount:</strong> {formatCurrency(e.quantity * e.product?.price)}
                  </Typography>
                  {hasDeleteAction && (
                    <Button sx={{ justifySelf: "flex-end" }} variant="contained" onClick={() => deleteFromCart(e.product._id)}>
                      Delete
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Container>
          );
        })}
    </Stack>
  );
};

export default StackOfProducts;
