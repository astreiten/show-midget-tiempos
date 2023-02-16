import { useState, useEffect } from "react";
import { Grid, Button, Select, MenuItem, Chip } from "@mui/material";
import Tesseract from "tesseract.js";
import "./App.css";

function App() {
  const useLocalStorage = (storageKey, fallbackState) => {
    const [value, setValue] = useState(
      JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
    );

    useEffect(() => {
      localStorage.setItem(storageKey, JSON.stringify(value));
    }, [value, storageKey]);

    return [value, setValue];
  };
  const [imagePath, setImagePath] = useState("");
  const [serie, setSerie] = useState("");
  const [seriesCargadas, setSeriesCargadas] = useLocalStorage(
    "seriescargadas",
    []
  );

  const renderSeriesChips = () => {
    console.log(seriesCargadas);
    return seriesCargadas.map((serie, i) => {
      return (
        <Grid item sx={{ display: "flex", justifyContent: "center" }} md={4}>
          <Chip label={"Serie " + seriesCargadas[i]} color="success" />
        </Grid>
      );
    });
  };

  const handleChange = (event) => {
    setImagePath(URL.createObjectURL(event.target.files[0]));
  };

  function isNumeric(str) {
    if (typeof str != "string") return false; // we only process strings!
    return (
      !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
  }

  function sortPositionsAux(positionA, positionB) {
    if (positionA.tiempoFinal < positionB.tiempoFinal) return -1;
    if (positionA.tiempoFinal > positionB.tiempoFinal) return 1;
    return 0;
  }

  const filterFilas = (filas) => {
    return filas.filter((fila) => {
      return isNumeric(fila.words[0].text);
    });
  };

  const buildPositions = (filas) => {
    return filas.map((fila) => {
      return {
        numero: fila.words[0].text,
        apellido: fila.words[1].text,
        tiempoFinal:
          fila.words[
            fila.words.lastIndexOf(
              fila.words.findLast((element) => {
                return element.text.startsWith("01:");
              })
            )
          ].text,
      };
    });
  };

  const sortPositions = (positions) => {
    return positions.sort(sortPositionsAux);
  };

  const extractAndLoadSerie = () => {
    Tesseract.recognize(imagePath, "eng", {
      logger: (m) => console.log(m),
    })
      .catch((err) => {
        console.log("ERROR");

        console.error(err);
      })
      .then((result) => {
        console.log(result.data.lines);
        const str = localStorage.getItem("test");
        const existingPositions = JSON.parse(str);
        let positions = buildPositions(filterFilas(result.data.lines));
        console.log(positions);
        let newPositions = sortPositions(existingPositions.concat(positions));
        const jsonArray = JSON.stringify(newPositions);
        localStorage.setItem("test", jsonArray);
        let oldSeriesCargadas = seriesCargadas;
        setSeriesCargadas(oldSeriesCargadas.concat([serie]));
        setSerie("");
        setImagePath("");
      });
  };

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item md={12}>
        <h3 style={{ textAlign: "center" }}>Carga de Serie Clasificatoria</h3>
      </Grid>
      <Grid item md={12}>
        {imagePath && <img src={imagePath} className="App-image" alt="logo" />}
      </Grid>
      <Grid sx={{ display: "flex", justifyContent: "center" }} item md={12}>
        <input type="file" onChange={handleChange} />
      </Grid>
      <Grid container>
        <Grid
          item
          sx={{ display: "flex", justifyContent: "center", margin: "0.5rem" }}
          md={12}
        >
          <Select
            sx={{ width: "7rem" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={serie}
            label="Age"
            onChange={(event) => {
              setSerie(event.target.value);
            }}
          >
            <MenuItem value={1}>Serie 1</MenuItem>
            <MenuItem value={2}>Serie 2</MenuItem>
          </Select>
        </Grid>
        <Grid item sx={{ display: "flex", justifyContent: "center" }} md={12}>
          <Button
            variant="contained"
            onClick={extractAndLoadSerie}
            style={{ height: 50 }}
            disabled={!serie || !imagePath}
          >
            Cargar serie
          </Button>
        </Grid>

        <Grid item md={2} sx={{ marginLeft: "50rem" }}>
          <Grid
            container
            sx={{ display: "flex", justifyContent: "center", margin: "0.5rem" }}
          >
            {renderSeriesChips()}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
