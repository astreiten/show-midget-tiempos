import { useEffect, useState } from "react";
import { Grid, Button, IconButton, Typography } from "@mui/material";
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
import { ModalComponent } from "./components/ModalComponent";

export const Form = ({ positions, setPositions }) => {
  const [imagePath, setImagePath] = useState("");
  const [serie, setSerie] = useState("");
  const [seriesCargadas, setSeriesCargadas] = useLocalStorage(
    "seriescargadas",
    []
  );
  const [log, setLog] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [posicionesSerieTemp, setPosicionesSerieTemp] = useState([]);

  const handleChange = (event) => {
    setImagePath(URL.createObjectURL(event.target.files[0]));
  };

  const sortPositions = (positions) => {
    return positions.sort(sortPositionsAux);
  };

  useEffect(() => {
    if (posicionesSerieTemp.length > 0) {
      setOpenModal(true);
    }
  }, [posicionesSerieTemp]);

  const confirmSerieLoad = () => {
    let newPositions = sortPositions(positions.concat(posicionesSerieTemp));
    setPositions(newPositions);
    let oldSeriesCargadas = seriesCargadas;
    setSeriesCargadas(oldSeriesCargadas.concat([serie]));
    setSerie("");
    setImagePath("");
    setLoading(false);
    setPosicionesSerieTemp([]);
  };

  const cancelSerieLoad = () => {
    setSerie("");
    setImagePath("");
    setLoading(false);
    setPosicionesSerieTemp([]);
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
        setPosicionesSerieTemp(positionsSerieNueva);
      });
  };
  return (
    <>
      <ModalComponent
        openModal={openModal}
        setOpenModal={setOpenModal}
        posicionesSerie={posicionesSerieTemp}
        confirmSerieLoad={confirmSerieLoad}
        cancelSerieLoad={cancelSerieLoad}
        imagePath={imagePath}
      ></ModalComponent>
      <Grid item xs={12} md={12}>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "600", marginTop: "0.5rem" }}
        >
          Carga de Serie Clasificatoria
        </Typography>
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
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          background: "white",
          marginRight: "1rem",
          marginLeft: "1rem",
          padding: "0.5rem",
          borderRadius: "1rem",
        }}
      >
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
