import { useState } from "react";
import { Grid } from "@mui/material";
import { useLocalStorage } from "./utils/hooks";
import { Form } from "./Form";
import { NavBar } from "./components/NavBar";
import { Semis } from "./Semis";

function App() {
  const [positions, setPositions] = useLocalStorage("positions", []);
  const [viewMode, setViewMode] = useState(false);

  return (
    <div
      style={{
        background: "#edf2f4",
        height: "fit-content",
        minHeight: "60rem",
      }}
    >
      <NavBar viewMode={viewMode} setViewMode={setViewMode} />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {viewMode ? (
          <Semis positions={positions} />
        ) : (
          <Form positions={positions} setPositions={setPositions} />
        )}
      </Grid>
    </div>
  );
}

export default App;
