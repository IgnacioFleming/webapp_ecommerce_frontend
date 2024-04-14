import { Paper, styled } from "@mui/material";

export const Container = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  textAlign: "center",
}));
