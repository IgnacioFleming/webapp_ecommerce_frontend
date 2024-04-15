import ItemCard from "./ItemCard";

const ItemList = ({ items, refresh }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        padding: "20px",
        justifyContent: "center",
        marginTop: 50,
      }}
    >
      {items.map((item) => {
        return <ItemCard item={item} key={item._id} refresh={refresh} />;
      })}
    </div>
  );
};

export default ItemList;
