import { Grid, Switch } from "@mui/material";

export const NavBar = ({ viewMode, setViewMode }) => {
  return (
    <Grid
      container
      direction="row"
      sx={{ height: "5rem", background: "#8d99ae" }}
    >
      <Grid item xs={2}>
        <Switch
          color="default"
          checked={viewMode}
          onChange={(e) => setViewMode(e.target.checked)}
        />
      </Grid>
      <Grid item xs={8} sx={{ display: "flex", justifyContent: "center" }}>
        <img src="showmidget-removebg-preview.png" height="80rem" alt=""></img>
      </Grid>
    </Grid>
  );
};
