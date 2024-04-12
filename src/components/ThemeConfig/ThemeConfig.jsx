import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#141414",
    },
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          height: "100px",
        },
      },
    },
  },
});

export default theme;
