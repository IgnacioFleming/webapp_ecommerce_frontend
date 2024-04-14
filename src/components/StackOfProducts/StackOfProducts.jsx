import { Box, Button, Grid, Paper, Stack, styled, Typography } from "@mui/material";
import { Item } from "../../utils/styledComponents/Item";

const StackOfProducts = ({ array, hasDeleteAction, deleteFromCart }) => {
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
                height: 200,
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
              key={e._id}
              elevation={5}
            >
              <Grid container>
                <Grid item md={2} sx={{ display: "flex", alignItems: "center", height: "100%" }}>
                  <Box sx={{ height: "80%", width: "100%" }}>
                    <img
                      style={{
                        height: 180,
                        width: 180,
                        objectFit: "contain",
                      }}
                      src={e.product?.thumbnails[0]}
                    />
                  </Box>
                </Grid>
                <Grid
                  item
                  md={4}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography gutterBottom variant="h5" color="initial">
                    {e.product?.title}
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={2}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 1,
                  }}
                >
                  <Typography gutterBottom sx={{ fontWeight: "bold" }} variant="subtitle1" color="initial">
                    Cantidad
                  </Typography>
                  <Typography gutterBottom variant="h5" color="initial">
                    {e.quantity}
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={2}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",

                    gap: 1,
                  }}
                >
                  <Typography gutterBottom sx={{ fontWeight: "bold" }} variant="subtitle1" color="initial">
                    Importe
                  </Typography>
                  <Typography gutterBottom variant="h5" color="initial">
                    ${e.quantity * e.product?.price}
                  </Typography>
                </Grid>
                <Grid item md={2} sx={{ display: "flex", alignItems: "center" }}>
                  {hasDeleteAction && (
                    <Button variant="contained" onClick={() => deleteFromCart(e.product._id)}>
                      Eliminar
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Item>
          );
        })}
    </Stack>
  );
};

export default StackOfProducts;
