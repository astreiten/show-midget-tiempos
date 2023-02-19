import { Grid } from "@mui/material";
import Casilla from "./Casilla";
import { isSerieCargada } from "../utils/utils";

export const SeriesCheck = ({ seriesCargadas }) => {
  function renderCasillas() {
    let casillas = [];
    for (var i = 1; i < 13; i++) {
      casillas.push(
        <Casilla
          key={i}
          value={i}
          cargada={isSerieCargada(i, seriesCargadas)}
        />
      );
    }
    return casillas;
  }

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ marginTop: "1rem", marginBottom: "1rem" }}
    >
      {renderCasillas()}
    </Grid>
  );
};
