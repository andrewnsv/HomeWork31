import * as React from "react";
import { Backdrop, Box, Modal, Fade, Typography } from "@mui/material";
import { Character } from "../../slices/heroesSlice";

interface BasicModalProps {
  data: Character | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BasicModal: React.FC<BasicModalProps> = ({ data, setOpen, open }) => {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          {data && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img alt={data.name} src={data.image} />
              </Box>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                sx={{ textAlign: "center", mt: 2 }}
              >
                {data.name}
              </Typography>
              <Typography
                id="transition-modal-description"
                sx={{ textAlign: "center", mt: 2 }}
              >
                ID: {data.id}
              </Typography>
              <Typography
                id="transition-modal-description"
                sx={{ textAlign: "center", mt: 2 }}
              >
                Status: {data.status}
              </Typography>
            </>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default BasicModal;
