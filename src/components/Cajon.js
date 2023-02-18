import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function Cajon({ piloto }) {
  return (
    <Card sx={{ height: "6rem", width: "6rem", textAlign: "center" }}>
      <CardContent>
        <Typography sx={{ fontSize: 30, fontWeight: "800" }}>
          {piloto && piloto.numero}
        </Typography>
        <Typography sx={{ fontSize: 11, fontWeight: "600" }}>
          {piloto && piloto.apellido}
        </Typography>
      </CardContent>
    </Card>
  );
}
