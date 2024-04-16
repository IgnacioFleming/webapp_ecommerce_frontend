import ItemCard from "./ItemCard";

const ItemList = ({ items, refresh }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,300px)",
        gap: 15,
        justifyContent: "center",
        padding: "50px",
      }}
    >
      {items.map((item) => {
        return <ItemCard item={item} key={item._id} refresh={refresh} />;
      })}
    </div>
  );
};

export default ItemList;
