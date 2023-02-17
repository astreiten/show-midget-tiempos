import { useState } from "react";
import { Grid } from "@mui/material";
import { useLocalStorage } from "./utils/hooks";
import { Form } from "./Form";

function App() {
  const [positions, setPositions] = useLocalStorage("positions", []);

  return (
    <div style={{ background: "#edf2f4", height: "60rem" }}>
      <Grid
        container
        direction="row"
        sx={{ height: "5rem", background: "#8d99ae" }}
      ></Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Form positions={positions} setPositions={setPositions} />
      </Grid>
    </div>
  );
}

export default App;
