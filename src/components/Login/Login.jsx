import styles from "./Login.module.css";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import { Box, Button, Typography } from "@mui/material";
const Login = () => {
  return (
    <div className={styles.container}>
      <Grid container sx={{ height: "100%" }}>
        <Grid md sx={{ display: "flex", alignItems: "stretch", justifyContent: "center" }}>
          <img src="https://res.cloudinary.com/dah7yxmc5/image/upload/v1711495777/habitacion-vacia-sillas-escritorios_23-2149008873_ydrfj5.jpg" alt="background-image" />
        </Grid>
        <Grid md>
          <Box>
            <img src="https://res.cloudinary.com/dah7yxmc5/image/upload/v1680611686/logo_ecommerce_ci16kw.png" alt="Logo.png" />
            <Typography variant="h1" color="initial">
              Login
            </Typography>
            <Typography variant="subtitle1" color="initial">
              Wellcome Back. Please login to your account.
            </Typography>
            <form id="login" className={styles.form}>
              <TextField id="email" label="Email" variant="outlined" />
              <TextField id="password" label="Password" variant="outlined" type="password" />
              <Typography variant="body1" color="initial">
                Forgot my password.
              </Typography>
              <Button type="submit" variant="contained">
                SIGN IN
              </Button>
            </form>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="initial" fontSize={15}>
              OR
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" color="initial">
              Sign In with Google
            </Typography>
            <Typography variant="h6" color="initial">
              Sign In with Github
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
