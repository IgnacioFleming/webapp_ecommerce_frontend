import { Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import CounterContainer from "../../components/Counter/CounterContainer.jsx";
import { formatCurrency } from "../../utils/utils.js";
const cardActionsStyle = {
  display: "flex",
  width: "100%",
  justifyContent: "center",
  marginBottom: 6,
};

const ItemDetail = ({ item, onAdd, quantity }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }} key={item.id}>
      <Card
        sx={{
          width: { xs: "100%", md: "70%" },
          padding: { xs: "0px", md: "50px" },
          margin: { xs: "0px", sm: "25px", md: "50px" },
        }}
      >
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
            <CardMedia
              component="img"
              alt="item"
              image={item.thumbnails ? item.thumbnails[0] : ""}
              sx={{
                width: "100%",
                objectFit: "cover",
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{ width: "100%", textAlign: "center" }}>
                {item.title}
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ margin: 2 }}>
                {item.description}
              </Typography>

              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Price: {formatCurrency(item.price)}
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Stock: {item.stock}
              </Typography>
            </CardContent>
            <CardActions sx={cardActionsStyle}>
              <CounterContainer stock={item.stock} onAdd={onAdd} initial={quantity} />
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default ItemDetail;
