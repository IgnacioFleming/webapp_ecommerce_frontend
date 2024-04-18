import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import alerts from "../../utils/alerts/alerts";

const ItemCard = ({ item, refresh }) => {
  const { user } = useContext(UserContext);
  const handleDelete = async (id) => {
    try {
      const modal = await alerts.warningAlert("Delete Product", "Are you sure you want to delete this product?", { needConfirmation: true });

      if (modal.isConfirmed) {
        refresh(id);
        let result = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/products/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (result.status === "error") return alerts.errorAlert(result.description);
        return alerts.successAlert("Product Deleted!", "This product was deleted successfully");
      }
    } catch (error) {
      throw alerts.errorAlert(error);
    }
  };
  return (
    <Card sx={{ width: 300, padding: "10px" }}>
      <CardMedia
        component="img"
        alt="item"
        image={item.thumbnails[0]}
        sx={{
          width: "100%",
          height: "50%",
          objectFit: "contain",
          maxHeight: 250,
        }}
      />
      <CardContent sx={{ height: "40%" }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ height: "25%", marginBottom: 4 }}>
          {item.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ height: "30%" }}>
          {item.description}
        </Typography>
      </CardContent>

      <CardActions sx={{ display: "flex", justifyContent: "center", gap: 1, alignItems: "flex-end", height: "10%" }}>
        <Link sx={{ justifySelf: "start" }} to={`/itemDetail/${item._id}`}>
          <Button size="small" variant="contained" sx={{ justifySelf: "start" }}>
            Details
          </Button>
        </Link>
        {user.role === "admin" && (
          <Button size="small" variant="contained" sx={{ justifySelf: "start" }} onClick={() => handleDelete(item._id)}>
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
export default ItemCard;
