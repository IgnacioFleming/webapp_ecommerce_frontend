import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  return (
    <Card sx={{ maxWidth: 300, padding: "10px" }}>
      <CardMedia
        component="img"
        alt="item"
        image={item.img}
        sx={{
          width: "100%",
          height: "50%",
          objectFit: "contain",
          maxHeight: 250,
        }}
      />
      <CardContent
        sx={{
          height: 100,
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ height: "25%", marginBottom: 4 }}
        >
          {item.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ height: "30%" }}
        >
          {item.description}
        </Typography>
      </CardContent>

      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Link sx={{ justifySelf: "start" }} to={`/itemDetail/${item.id}`}>
          <Button
            size="small"
            variant="contained"
            sx={{ justifySelf: "start" }}
          >
            Detalle
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};
export default ItemCard;
