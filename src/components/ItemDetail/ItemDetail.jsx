import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import CounterContainer from "../Counter/CounterContainer.jsx";
const cardActionsStyle = {
  display: "flex",
  width: "100%",
  justifyContent: "center",
  marginBottom: 6,
};

const ItemDetail = ({ item, onAdd, cantidad }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }} key={item.id}>
      <Card
        sx={{
          width: "50%",
          height: 500,
          padding: "100px",
          margin: "50px",
        }}
      >
        <Grid container sx={{ justifyContent: "center", height: "100%" }}>
          <Grid item md={6} sx={{ height: "100%" }}>
            <CardMedia
              component="img"
              alt="item"
              image={item.img}
              sx={{
                width: "80%",
                height: "80%",
                objectFit: "contain",
              }}
            />
          </Grid>

          <Grid item md={6}>
            <CardContent
              sx={{
                height: 100,
                marginBottom: 30,
              }}
            >
              <Typography
                gutterBottom
                variant="h3"
                component="div"
                sx={{ width: "100%", marginBottom: 5, textAlign: "center" }}
              >
                {item.title}
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ marginBottom: 5, textAlign: "center" }}
              >
                {item.description}
              </Typography>

              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{
                  width: "100%",
                  textAlign: "center",
                  height: "10%",
                  marginBottom: 5,
                }}
              >
                Precio: ${item.price}
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{
                  width: "100%",
                  textAlign: "center",
                  height: "10%",
                  marginBottom: 5,
                }}
              >
                Stock disponible: {item.stock}
              </Typography>
            </CardContent>
            <CardActions sx={cardActionsStyle}>
              <CounterContainer
                stock={item.stock}
                onAdd={onAdd}
                initial={cantidad}
              />
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default ItemDetail;
