import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function TablaTiempos({ posiciones }) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "800" }}>MEJORES TIEMPOS</TableCell>
            <TableCell align="right">Tiempo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posiciones.map((posicion, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {i + 1 + ") " + posicion.numero + "-" + posicion.apellido}
              </TableCell>
              <TableCell align="right">{posicion.tiempoFinal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
