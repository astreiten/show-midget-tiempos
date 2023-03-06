import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function TablaCargaTiempos({ posiciones }) {
  const [posicionesTabla, setPosicionesTabla] = React.useState([]);
  const columns = [
    { field: "piloto", headerName: "Piloto", width: 180, editable: false },
    { field: "tiempo", headerName: "Tiempo", editable: true },
  ];

  React.useEffect(() => {
    let posicionesAux = posiciones.map((posicion, i) => {
      return {
        id: i,
        piloto: i + 1 + ") " + posicion.numero + "-" + posicion.apellido,
        tiempo: posicion.tiempoFinal,
      };
    });
    setPosicionesTabla(posicionesAux);
  }, [posiciones]);

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid rows={posicionesTabla} columns={columns} />
    </div>
  );
}
