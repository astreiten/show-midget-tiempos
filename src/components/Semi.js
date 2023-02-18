import { Divider, Grid, Typography } from "@mui/material";
import { Fila } from "./Fila";

export const Semi = ({ positions, number }) => {
  let base = number - 1;
  return (
    <>
      <Grid container direction="column">
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography>SEMI {number}</Typography>
        </Grid>
        <Fila
          pilotos={[
            positions[base],
            positions[base + 4],
            positions[base + 8],
            positions[base + 12],
          ]}
        />
        <Fila
          pilotos={[
            positions[base + 16],
            positions[base + 20],
            positions[base + 24],
            positions[base + 28],
          ]}
        />
        <Fila pilotos={[positions[base + 32], positions[base + 36]]} />
        <Grid item>
          <Divider
            sx={{ marginTop: "0.5rem", borderTop: "5px solid #8c8b8b" }}
          />
        </Grid>
      </Grid>
    </>
  );
};
