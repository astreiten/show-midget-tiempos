import { Grid } from "@mui/material";
import Cajon from "./Cajon";

export const Fila = ({ pilotos }) => {
  return (
    <Grid container direction="row" sx={{ marginTop: "0.5rem" }}>
      <Grid item xs={3}>
        <Cajon piloto={pilotos[0]} />
      </Grid>
      <Grid item xs={3}>
        <Cajon piloto={pilotos[1]} />
      </Grid>
      <Grid item xs={3}>
        <Cajon piloto={pilotos[2]} />
      </Grid>
      <Grid item xs={3}>
        <Cajon piloto={pilotos[3]} />
      </Grid>
    </Grid>
  );
};
