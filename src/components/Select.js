import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { isSerieCargada } from "../utils/utils";

export const SelectComponent = ({ serie, setSerie, seriesCargadas }) => {
  function renderOptions() {
    let options = [];
    for (var i = 1; i < 13; i++) {
      if (!isSerieCargada(i, seriesCargadas))
        options.push(
          <MenuItem key={i} value={i}>
            Serie {i}
          </MenuItem>
        );
    }
    return options;
  }
  return (
    <FormControl sx={{ minWidth: 100 }} size="small">
      <InputLabel id="demo-select-small">Serie</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={serie}
        label="Serie"
        onChange={(e) => setSerie(e.target.value)}
      >
        <MenuItem value="">
          <em>Ninguna</em>
        </MenuItem>
        {renderOptions()}
      </Select>
    </FormControl>
  );
};
