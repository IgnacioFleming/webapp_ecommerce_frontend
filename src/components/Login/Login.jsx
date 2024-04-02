import styles from "./Login.module.css";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import { Box, Button, Typography } from "@mui/material";
import { FacebookLoginButton } from "react-social-login-buttons";

const formContainer = {
  display: "flex",
  flexDirection: "column",
  width: "80%",
  height: "100%",
  justifyContent: "center",
};

const Login = () => {
  return (
    <>
      <div className={styles.container}>
        <Grid container sx={{ height: "100%" }}>
          <Grid md sx={{ display: "flex", alignItems: "stretch", justifyContent: "center" }}>
            <img className={styles.mainImg} src="https://res.cloudinary.com/dah7yxmc5/image/upload/v1711660908/pexels-elvis-2528118_1_brmtfw.jpg" alt="Main image" />
          </Grid>
          <Grid md sx={{ display: "flex", alignItems: "stretch", justifyContent: "center" }}>
            <Box sx={formContainer}>
              <img className={styles.logo} src="https://res.cloudinary.com/dah7yxmc5/image/upload/v1680611686/logo_ecommerce_ci16kw.png" alt="Logo.png" />
              <Typography variant="h2" color="initial" mb={2} fontWeight="semibold">
                Login
              </Typography>
              <Typography variant="subtitle1" color="initial" mb={6}>
                Wellcome Back. Please login to your account.
              </Typography>
              <form id="login" className={styles.form}>
                <TextField id="email" label="Email" variant="outlined" fullWidth />
                <Box>
                  <TextField id="password" label="Password" variant="outlined" type="password" fullWidth />
                  <Typography variant="body1" color="initial">
                    Forgot your password?
                  </Typography>
                </Box>
                <Button type="submit" variant="contained" sx={{ width: 200, height: 60, fontSize: 20, fontWeight: "semibold", borderRadius: 90, marginTop: 2 }}>
                  SIGN IN
                </Button>
              </form>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "center", width: "60%" }}>
                <div className={styles.line}></div>
                <Typography variant="subtitle2" color="initial" fontSize={15} mt={10} mb={10}>
                  OR
                </Typography>
                <div className={styles.line}></div>
              </Box>
              <FacebookLoginButton />
              <Typography variant="h6" color="initial">
                Sign In with Github
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Login;
