import { Container } from "../../utils/styledComponents/Container";
import { Box, Button, Checkbox, FormControlLabel, styled, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function AddProducts({ handleSubmit, handleChange, values, errors, selectedFiles, setSelectedFiles }) {
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    console.log(files);
    setSelectedFiles(files);
  };
  return (
    <Container sx={containerStyle}>
      <form onSubmit={handleSubmit}>
        <Box sx={inputBoxStyle}>
          <TextField onChange={handleChange} error={errors.title} sx={{ width: "30%", minWidth: "200px" }} name="title" label="Title" value={values.title} helperText={errors.title} />
          <TextField onChange={handleChange} error={errors.description} sx={{ width: "30%", minWidth: "200px" }} name="description" label="Description" value={values.description} helperText={errors.description} />
          <TextField onChange={handleChange} error={errors.price} sx={{ width: "30%", minWidth: "200px" }} name="price" label="Price" value={values.price} helperText={errors.price} />
          <TextField onChange={handleChange} error={errors.category} sx={{ width: "30%", minWidth: "200px" }} name="category" label="Category" value={values.category} helperText={errors.category} />
          <TextField onChange={handleChange} error={errors.code} sx={{ width: "30%", minWidth: "200px" }} name="code" label="Code" value={values.code} helperText={errors.code} />
          <TextField onChange={handleChange} error={errors.stock} sx={{ width: "30%", minWidth: "200px" }} name="stock" label="Stock" value={values.stock} helperText={errors.stock} />
          <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
            <FormControlLabel control={<Checkbox value={values.status} onChange={handleChange} name="status" defaultChecked />} label="Visible" labelPlacement="start" />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifySelf: "flex-end" }}>
              <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
                Attach images
                <VisuallyHiddenInput type="file" onChange={handleFileChange} name="images" multiple />
              </Button>
              {selectedFiles.length > 0 &&
                selectedFiles.map((file, index) => {
                  return (
                    <h3 key={index} style={{ position: "absolute", marginLeft: 170 }}>
                      {file.name}
                    </h3>
                  );
                })}
            </Box>
          </Box>
          <Button type="submit" variant="contained" color="primary">
            Create Product
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default AddProducts;
