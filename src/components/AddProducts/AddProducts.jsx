import { Container } from "../../utils/styledComponents/Container";
import { Box, Button, TextField } from "@mui/material";

const containerStyle = {
  padding: "10px 0 10px 0",
  height: "calc(100vh - 100px)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 2,
};
const inputBoxStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  gap: 2,
};

function AddProducts() {
  return (
    <Container sx={containerStyle}>
      <Box>
        <Box sx={inputBoxStyle}>
          <TextField sx={{ width: "30%", minWidth: "200px" }} id="" label="Título" value={""} onChange={() => {}} />
          <TextField sx={{ width: "30%", minWidth: "200px" }} id="" label="Descripción" value={""} onChange={() => {}} />
          <TextField sx={{ width: "30%", minWidth: "200px" }} id="" label="Precio" value={""} onChange={() => {}} />
          <TextField sx={{ width: "30%", minWidth: "200px" }} id="" label="Categoría" value={""} onChange={() => {}} />
          <TextField sx={{ width: "30%", minWidth: "200px" }} id="" label="Código" value={""} onChange={() => {}} />
          <TextField sx={{ width: "30%", minWidth: "200px" }} id="" label="Stock" value={""} onChange={() => {}} />
          <TextField sx={{ width: "30%", minWidth: "200px" }} id="" label="Status" value={""} onChange={() => {}} />
          <TextField sx={{ width: "30%", minWidth: "200px" }} id="" label="Imágenes" value={""} onChange={() => {}} />
          <Button variant="contained" color="primary">
            Crear Producto
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AddProducts;
