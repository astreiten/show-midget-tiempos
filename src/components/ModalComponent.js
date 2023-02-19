import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TablaTiempos from "./TablaTiempos";
import { Grid } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "18rem",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ModalComponent = ({
  openModal,
  setOpenModal,
  posicionesSerie,
  confirmSerieLoad,
}) => {
  return (
    <Modal
      open={openModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Confirmar resultados procesados
        </Typography>
        <TablaTiempos posiciones={posicionesSerie} />
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          spacing={1}
          sx={{ marginTop: "1rem" }}
        >
          <Grid item>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                confirmSerieLoad();
                setOpenModal(false);
              }}
            >
              CONFIRMAR
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              BORRAR
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
