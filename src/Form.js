import { useState } from "react";
import {
  Grid,
  Button,
  Select,
  MenuItem,
  Chip,
  Typography,
  IconButton,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Tesseract from "tesseract.js";
import { useLocalStorage } from "./utils/hooks";
import { sortPositionsAux, filterFilas, buildPositions } from "./utils/utils";

export const Form = ({ positions, setPositions }) => {
  const [imagePath, setImagePath] = useState("");
  const [serie, setSerie] = useState("");
  const [seriesCargadas, setSeriesCargadas] = useLocalStorage(
    "seriescargadas",
    []
  );
  const [log, setLog] = useState("");

  const renderSeriesChips = () => {
    return seriesCargadas.map((serie, i) => {
      return (
        <Grid
          item
          sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
          xs={4}
          md={4}
        >
          <Chip label={"Serie " + seriesCargadas[i]} color="success" />
        </Grid>
      );
    });
  };

  const renderPositions = () => {
    return positions.map((position, i) => {
      return (
        <Grid
          item
          sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
          xs={12}
          md={12}
        >
          <Typography variant="h3">
            {position.numero +
              " " +
              position.apellido +
              " " +
              position.tiempoFinal}
          </Typography>
        </Grid>
      );
    });
  };

  const handleChange = (event) => {
    setImagePath(URL.createObjectURL(event.target.files[0]));
  };

  const sortPositions = (positions) => {
    return positions.sort(sortPositionsAux);
  };

  const extractAndLoadSerie = () => {
    Tesseract.recognize(imagePath, "eng", {
      logger: (m) => setLog(m),
    })
      .catch((err) => {
        setLog("ERROR");

        console.error(err);
      })
      .then((result) => {
        console.log(result.data.lines);
        let positionsSerieNueva = buildPositions(
          filterFilas(result.data.lines)
        );
        let newPositions = sortPositions(positions.concat(positionsSerieNueva));
        setPositions(newPositions);
        let oldSeriesCargadas = seriesCargadas;
        setSeriesCargadas(oldSeriesCargadas.concat([serie]));
        setSerie("");
        setImagePath("");
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
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            setSeriesCargadas([]);
            setPositions([]);
          }}
          style={{ height: 50 }}
        >
          Clear all data
        </Button>
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
        xs={12}
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
      <Grid container>
        <Grid
          item
          sx={{ display: "flex", justifyContent: "center", margin: "0.5rem" }}
          xs={12}
          md={12}
        >
          <Select
            sx={{ width: "7rem" }}
            value={serie}
            variant="filled"
            onChange={(event) => {
              setSerie(event.target.value);
            }}
          >
            <MenuItem value={1}>Serie 1</MenuItem>
            <MenuItem value={2}>Serie 2</MenuItem>
          </Select>
        </Grid>
        <Grid
          item
          sx={{ display: "flex", justifyContent: "center" }}
          xs={12}
          md={12}
        >
          <Button
            variant="contained"
            onClick={extractAndLoadSerie}
            style={{ height: 50 }}
            disabled={!serie || !imagePath}
          >
            Cargar serie
          </Button>
        </Grid>

        <Grid item xs={12} md={12}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: "0.5rem",
              }}
            >
              {renderSeriesChips()}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "center", margin: "0.5rem" }}
        >
          <Typography variant="h4">{log.status}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} md={2}>
        <Grid
          container
          sx={{ display: "flex", justifyContent: "center", margin: "0.5rem" }}
        >
          {renderPositions()}
        </Grid>
      </Grid>
    </>
  );
};
