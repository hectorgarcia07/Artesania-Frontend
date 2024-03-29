import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Size } from '../types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: "400px",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  padding: "1rem 1.5rem",
  width: "80%"
};

interface ModalProps{
  onClickMethod: () => unknown;
  description: string;
}

export default function ConfirmDeleteModal({ onClickMethod , description}: ModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button sx={{ mb: '1rem' }} onClick={handleOpen} variant="outlined" color='error'>{description}</Button>
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Are you sure you want to delete this?
            </Typography>
            <Box id="transition-modal-description" sx={{ mt: 2 }}>
              <Button variant="contained" onClick={handleClose} sx={{ mr: '1rem' }}>Cancel</Button>
              <Button 
                variant="contained" 
                color="error" 
                onClick={() => {  
                  onClickMethod()
                  handleClose()
                }}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}