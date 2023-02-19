import { useState } from "react";
import { Grid, Button, Chip, IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import Tesseract from "tesseract.js";
import { useLocalStorage } from "./utils/hooks";
import { sortPositionsAux, filterFilas, buildPositions } from "./utils/utils";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import TablaTiempos from "./components/TablaTiempos";
import { SelectComponent } from "./components/Select";
import { SeriesCheck } from "./components/SeriesCheck";

export const Form = ({ positions, setPositions }) => {
  const [imagePath, setImagePath] = useState("");
  const [serie, setSerie] = useState("");
  const [seriesCargadas, setSeriesCargadas] = useLocalStorage(
    "seriescargadas",
    []
  );
  const [log, setLog] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setImagePath(URL.createObjectURL(event.target.files[0]));
  };

  const sortPositions = (positions) => {
    return positions.sort(sortPositionsAux);
  };

  const extractAndLoadSerie = () => {
    setLoading(true);
    Tesseract.recognize(imagePath, "eng", {
      logger: (m) => setLog(m),
    })
      .catch((err) => {
        setLog("ERROR");

        console.error(err);
      })
      .then((result) => {
        let positionsSerieNueva = buildPositions(
          filterFilas(result.data.lines)
        );
        let newPositions = sortPositions(positions.concat(positionsSerieNueva));
        setPositions(newPositions);
        let oldSeriesCargadas = seriesCargadas;
        setSeriesCargadas(oldSeriesCargadas.concat([serie]));
        setSerie("");
        setImagePath("");
        setLoading(false);
      });
  };
  return (
    <>
      <Grid item xs={12} md={12}>
        <h3 style={{ textAlign: "center" }}>Carga de Serie Clasificatoria</h3>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "0.5rem",
          height: imagePath && "10rem",
        }}
      >
        {imagePath && <img src={imagePath} className="App-image" alt="logo" />}
      </Grid>
      <Grid
        sx={{ display: "flex", justifyContent: "center" }}
        item
        xs={4}
        md={12}
      >
        <Button variant="contained" component="label">
          Upload
          <input hidden type="file" onChange={handleChange} />
        </Button>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input hidden accept="image/*" type="file" />
          <PhotoCamera />
        </IconButton>
      </Grid>
      <Grid
        item
        sx={{ display: "flex", justifyContent: "center", margin: "0.5rem" }}
        xs={3}
        md={12}
      >
        <SelectComponent
          serie={serie}
          setSerie={setSerie}
          seriesCargadas={seriesCargadas}
        />
      </Grid>
      <Grid container>
        <Grid
          item
          sx={{ display: "flex", justifyContent: "center" }}
          xs={12}
          md={12}
        >
          {loading ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Button
              variant="contained"
              color="info"
              onClick={extractAndLoadSerie}
              style={{ height: 50 }}
              disabled={!serie || !imagePath}
            >
              Cargar serie
            </Button>
          )}
        </Grid>
        <Grid item xs={12} md={12}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <SeriesCheck seriesCargadas={seriesCargadas} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={11} md={2}>
        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          {positions.length > 0 && <TablaTiempos posiciones={positions} />}
        </Grid>
      </Grid>
      {seriesCargadas.length > 0 && (
        <Grid item>
          <IconButton
            aria-label="delete"
            onClick={() => {
              setSeriesCargadas([]);
              setPositions([]);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      )}
    </>
  );
};
