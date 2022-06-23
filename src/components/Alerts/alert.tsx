import * as React from 'react';
import Box from '@mui/material/Box';
import Alert, { AlertColor } from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

interface MessageType{
  severityType: AlertColor;
  message: string;
  isActive: boolean;
  setStatus: React.Dispatch<React.SetStateAction<PopupType>>;
}

interface PopupType{
  isActive: boolean;
  message: string;
  severityType: AlertColor;
}

export default function TransitionAlerts({severityType, message, isActive, setStatus}:MessageType) {

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={isActive}>
        <Alert
          severity={severityType}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setStatus( prevStatus => ({
                  ...prevStatus,
                  isActive: false
                }));
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
        { message }
        </Alert>
      </Collapse>
    </Box>
  );
}
