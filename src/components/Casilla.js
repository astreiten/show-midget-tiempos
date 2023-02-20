import * as React from "react";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Casilla({ value, cargada }) {
  return (
    <Grid item xs={1}>
      <Card
        sx={{
          height: "2rem",
          width: "100%",
          background: cargada ? "#0ead69" : "#d90429",
          borderRadius: "0",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{ fontSize: 15, fontWeight: "800", marginTop: "0.2rem" }}
        >
          {value}
        </Typography>
      </Card>
    </Grid>
  );
}
