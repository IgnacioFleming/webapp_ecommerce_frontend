import { Box, Button, TextField, Typography } from "@mui/material";
import styles from "./Register.module.css";
import { GithubLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { Link } from "react-router-dom";

const container = {
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const formContainer = {
  display: "flex",
  flexDirection: "column",
  width: "50%",
  height: "90%",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "white",
  borderRadius: "25px",
};

const thirdPartyAuthButtonStyle = {
  width: "220px",
  borderRadius: 45,
  margin: 0,
};

const thirdPartyAuthInnerTextStyle = {
  fontSize: 17,
};
const RegisterButtonStyle = { width: 200, height: 50, fontSize: 20, fontWeight: "semibold", borderRadius: 45, marginTop: 1, alignSelf: "center" };

const dividerStyle = { display: "flex", alignItems: "center", gap: 2, justifyContent: "center", width: "60%" };

const thirdPartyAuthButtonContainer = { display: "flex", justifyContent: "center", gap: 3 };

const shortInputBox = { display: "flex", gap: "10px", width: "100%" };

function Register({ handleChange, handleSubmit, errors, values }) {
  return (
    <>
      <div className={styles.background}></div>
      <Box sx={container}>
        <Box sx={formContainer}>
          <img className={styles.logo} src="https://res.cloudinary.com/dah7yxmc5/image/upload/v1680611686/Eccomerce/logo_ecommerce_ci16kw.png" alt="Logo.png" />
          <Typography variant="h2" color="initial" fontWeight="bold">
            Create Account
          </Typography>
          <Typography variant="subtitle1" color="initial" mb={1}>
            Please Register your new account.
          </Typography>
          <form id="Register" className={styles.form} onSubmit={handleSubmit}>
            <Box sx={shortInputBox}>
              <TextField className={styles.shortInput} name="first_name" label="First Name" variant="outlined" onChange={handleChange} helperText={errors.first_name} error={errors.first_name && true} value={values.first_name} />
              <TextField className={styles.shortInput} name="last_name" label="Last Name" variant="outlined" onChange={handleChange} helperText={errors.last_name} error={errors.last_name && true} value={values.last_name} />
            </Box>
            <TextField fullWidth name="email" label="Email" variant="outlined" onChange={handleChange} helperText={errors.email} error={errors.email && true} value={values.email} />
            <Box sx={shortInputBox}>
              <TextField fullWidth name="password" label="Password" variant="outlined" type="password" onChange={handleChange} helperText={errors.password} error={errors.password && true} value={values.password} />

              <TextField fullWidth name="confirm_password" label="Confirm Password" variant="outlined" type="password" onChange={handleChange} helperText={errors.confirm_password} error={errors.confirm_password && true} value={values.confirm_password} />
            </Box>

            <Button type="submit" variant="contained" sx={RegisterButtonStyle}>
              SIGN UP
            </Button>
          </form>
          <Box sx={dividerStyle}>
            <div className={styles.line}></div>
            <Typography variant="subtitle2" color="initial" fontSize={15} mt={1} mb={1}>
              OR
            </Typography>
            <div className={styles.line}></div>
          </Box>
          <Box sx={thirdPartyAuthButtonContainer}>
            <GoogleLoginButton style={thirdPartyAuthButtonStyle}>
              <span style={thirdPartyAuthInnerTextStyle}>Sign Up with Google</span>
            </GoogleLoginButton>
            <GithubLoginButton style={thirdPartyAuthButtonStyle}>
              <span style={thirdPartyAuthInnerTextStyle}>Sign Up with Github</span>
            </GithubLoginButton>
          </Box>
          <Box>
            <Typography variant="body1" color="initial" mt={3}>
              Do you already have an account? Go to <Link to="/login">Login</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Register;
