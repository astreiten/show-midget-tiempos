import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function TablaCargaTiempos({ posiciones, setPosicionesSerie }) {
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

  const handleRowChange = (newRow) => {
    let newPos = posiciones;
    newPos[newRow.id].tiempoFinal = newRow.tiempo;
    setPosicionesSerie(newPos);
  };

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={posicionesTabla}
        columns={columns}
        processRowUpdate={handleRowChange}
        onProcessRowUpdateError={(error) => {
          console.log(error);
        }}
      />
    </div>
  );
}
