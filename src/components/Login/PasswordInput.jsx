import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import React, { useState } from "react";

function PasswordInput({ handleChange, errors, values }) {
  const [showPassword, setShowPassword] = useState(false);
  const visibilityIconStyle = errors.password && { color: "#d32f2f" };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => {};
  const handleMouseUpPassword = () => {};
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password" error={errors.password ? true : false}>
        Password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} onMouseUp={handleMouseUpPassword} edge="end">
              {!showPassword ? <VisibilityOff sx={visibilityIconStyle} /> : <Visibility sx={visibilityIconStyle} />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
        name="password"
        onChange={handleChange}
        error={errors.password && true}
        value={values.password}
      />
      {errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
    </FormControl>
  );
}

export default PasswordInput;
