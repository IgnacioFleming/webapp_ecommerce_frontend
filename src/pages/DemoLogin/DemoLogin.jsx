import styles from "./DemoLogin.module.css";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import { Box, Button, Typography } from "@mui/material";
import { GithubLoginButton } from "react-social-login-buttons";
import { Link } from "react-router-dom";

const gridStyle = { display: "flex", alignItems: "center", justifyContent: "center", width: "100%" };

const formContainer = {
  display: "flex",
  flexDirection: "column",
  width: { md: "80%" },
  justifyContent: "center",
  alignItems: { xs: "center", md: "flex-start" },
  backgroundColor: "white",
  padding: 2,
};

const thirdPartyAuthButtonStyle = {
  width: "220px",
  borderRadius: 45,
  margin: 0,
  backgroundColor: "#141414",
};

const loginButtonStyle = { width: 200, height: 50, fontSize: 20, fontWeight: "semibold", borderRadius: 45, alignSelf: "center" };

const dividerStyle = { display: "flex", alignItems: "center", gap: 2, justifyContent: "center", width: "60%" };

const thirdPartyAuthButtonContainer = { display: "flex", flexDirection: "column", alignItems: "center", width: "60%", gap: 1 };

const DemoLogin = ({ handleSubmit }) => {
  return (
    <>
      <div className={styles.container}>
        <Grid container>
          <Grid md sx={{ ...gridStyle, position: { xs: "absolute", md: "static" }, zIndex: -1 }}>
            <img className={styles.mainImg} src="https://res.cloudinary.com/dah7yxmc5/image/upload/v1711660908/Eccomerce/Authentication/login-left-image.jpg" alt="Main image" />
          </Grid>

          <Grid xs={12} md sx={{ ...gridStyle, height: "100vh" }}>
            <Box sx={formContainer}>
              <img className={styles.logo} src="https://res.cloudinary.com/dah7yxmc5/image/upload/v1680611686/Eccomerce/logo_ecommerce_ci16kw.png" alt="Logo.png" />
              <Typography variant="h2" color="initial" mb={1} fontWeight="semibold">
                Login
              </Typography>
              <Typography variant="subtitle1" color="initial" mb={2}>
                Wellcome Back. Please enter to the admin account.
              </Typography>

              <form id="login" className={styles.form} onSubmit={handleSubmit}>
                <Button type="submit" variant="contained" sx={loginButtonStyle}>
                  SIGN IN
                </Button>
              </form>
              <Box sx={dividerStyle}>
                <div className={styles.line}></div>
                <Typography variant="subtitle2" color="initial" fontSize={15} mt={2} mb={2}>
                  OR
                </Typography>
                <div className={styles.line}></div>
              </Box>
              <Box sx={thirdPartyAuthButtonContainer}>
                {/* <GoogleLoginButton style={thirdPartyAuthButtonStyle} /> */}
                <a href={`${import.meta.env.VITE_APP_BASE_URL}/api/sessions/github`}>
                  <GithubLoginButton style={thirdPartyAuthButtonStyle} />
                </a>
              </Box>
              <Typography variant="body1" color="initial" mt={1}>
                Do you already have an account? Go to <Link to="/register">Register</Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default DemoLogin;
