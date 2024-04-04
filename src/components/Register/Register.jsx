import { Box, Button, TextField, Typography } from "@mui/material";
import styles from "./Register.module.css";
import { GithubLoginButton, GoogleLoginButton } from "react-social-login-buttons";
const formContainer = {
  display: "flex",
  flexDirection: "column",
  width: "80%",
  height: "100%",
  justifyContent: "center",
};

const thirdPartyAuthButtonStyle = {
  width: "220px",
  borderRadius: 45,
  margin: 0,
};
const loginButtonStyle = { width: 200, height: 60, fontSize: 20, fontWeight: "semibold", borderRadius: 45, marginTop: 2, alignSelf: "center" };

const dividerStyle = { display: "flex", alignItems: "center", gap: 2, justifyContent: "center", width: "60%" };

const thirdPartyAuthButtonContainer = { display: "flex", flexDirection: "column", alignItems: "center", width: "60%", gap: 2 };

function Register({ handleChange, handleSubmit, errors, values }) {
  return (
    <div className={styles.container}>
      <Box sx={formContainer}>
        <img className={styles.logo} src="https://res.cloudinary.com/dah7yxmc5/image/upload/v1680611686/logo_ecommerce_ci16kw.png" alt="Logo.png" />
        <Typography variant="h2" color="initial" mb={2} fontWeight="semibold">
          Login
        </Typography>
        <Typography variant="subtitle1" color="initial" mb={6}>
          Wellcome Back. Please login to your account.
        </Typography>
        <form id="login" className={styles.form} onSubmit={handleSubmit}>
          <TextField name="email" label="Email" variant="outlined" fullWidth onChange={handleChange} helperText={errors.email} error={errors.email && true} value={values.email} />
          <Box>
            <TextField name="password" label="Password" variant="outlined" type="password" fullWidth onChange={handleChange} helperText={errors.password} error={errors.password && true} value={values.password} />
            <Typography variant="body1" color="initial">
              Forgot your password?
            </Typography>
          </Box>
          <Button type="submit" variant="contained" sx={loginButtonStyle}>
            SIGN IN
          </Button>
        </form>
        <Box sx={dividerStyle}>
          <div className={styles.line}></div>
          <Typography variant="subtitle2" color="initial" fontSize={15} mt={5} mb={5}>
            OR
          </Typography>
          <div className={styles.line}></div>
        </Box>
        <Box sx={thirdPartyAuthButtonContainer}>
          <GoogleLoginButton style={thirdPartyAuthButtonStyle} />
          <GithubLoginButton style={thirdPartyAuthButtonStyle} />
        </Box>
      </Box>
    </div>
  );
}

export default Register;
