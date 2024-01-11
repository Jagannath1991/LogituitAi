import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography } from '@mui/material';

const ApiPopUp = ({ open, onClose, message, isSuccess }) => {
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ style: { backgroundColor: 'white' ,width:"400px"} }}>
      <DialogTitle>
        <Typography variant="h6" style={{ color: 'black' }}>
         Message
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography style={{ color: 'black' }}>{message}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant='contained'>
          <Typography style={{ color: 'white' }}>Close</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApiPopUp;
