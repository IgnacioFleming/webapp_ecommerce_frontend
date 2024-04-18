import { Box, Button, Grid } from "@mui/material";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { Link } from "react-router-dom";
import useCounter from "../../utils/hooks/useCounter";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const counterStyles = {
  display: "flex",
  justifyContent: "center",
  marginBottom: 20,
};

const Counter = ({ stock, onAdd, notDisabled, initial = 1 }) => {
  const { isAdmin } = useContext(UserContext);
  const adjustedInitial = stock === 0 ? 0 : initial;
  const { counter, agregar, quitar, reset } = useCounter(adjustedInitial);
  return (
    <Grid container>
      {!isAdmin && (
        <Grid item xs={12}>
          <div style={counterStyles}>
            <Button onClick={quitar}>
              <AiOutlineMinusSquare size={20} />
            </Button>
            <Box sx={{ display: "flex", alignItems: "center", paddingBottom: 0.5 }}>{counter}</Box>
            <Button onClick={() => agregar(stock)}>
              <AiOutlinePlusSquare size={20} />
            </Button>
            <Button onClick={reset}>
              <RxCounterClockwiseClock size={20} />
            </Button>
          </div>
        </Grid>
      )}
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            marginTop: 15,
          }}
        >
          {!isAdmin && (
            <Button size="small" variant="contained" disabled={!notDisabled} onClick={() => onAdd(counter)}>
              Add to Cart
            </Button>
          )}

          <Link to={`/`}>
            <Button size="small" variant="contained">
              Go Back
            </Button>
          </Link>
        </div>
      </Grid>
    </Grid>
  );
};

export default Counter;
