import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { Link } from "react-router-dom";
import useCounter from "../../utils/hooks/useCounter";

const counterStyles = {
  display: "flex",
  justifyContent: "center",
  marginBottom: 20,
};

const Counter = ({ stock, onAdd, notDisabled, initial = 1 }) => {
  stock === 0 && (initial = 0);
  const { counter, agregar, quitar, reset } = useCounter(initial);
  return (
    <Grid container>
      <Grid item xs={12}>
        <div style={counterStyles}>
          <Button onClick={quitar}>
            <AiOutlineMinusSquare size={20} />
          </Button>
          <Box
            sx={{ display: "flex", alignItems: "center", paddingBottom: 0.5 }}
          >
            {counter}
          </Box>
          <Button onClick={() => agregar(stock)}>
            <AiOutlinePlusSquare size={20} />
          </Button>
          <Button onClick={reset}>
            <RxCounterClockwiseClock size={20} />
          </Button>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            marginTop: 15,
          }}
        >
          <Button
            size="small"
            variant="contained"
            disabled={!notDisabled}
            onClick={() => onAdd(counter)}
          >
            Agregar al carrito
          </Button>

          <Link to={`/`}>
            <Button size="small" variant="contained">
              Volver
            </Button>
          </Link>
        </div>
      </Grid>
    </Grid>
  );
};

export default Counter;
