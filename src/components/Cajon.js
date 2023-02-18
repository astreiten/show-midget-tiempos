import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function Cajon({ piloto }) {
  return (
    <Card sx={{ height: "6rem", width: "6rem", textAlign: "center" }}>
      <CardContent>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          {piloto && piloto.numero}
        </Typography>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          {piloto && piloto.apellido}
        </Typography>
      </CardContent>
    </Card>
  );
}
