import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { Alert as AlertType} from '../../types';
import { useStateValue } from "../../state";

export default function TransitionAlerts({severityType, message, isActive}:AlertType) {
  const [state, dispatch] = useStateValue();
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
                dispatch({ 
                  type: "UPDATE_ALERT", 
                  payload: {
                    isLoading: false,
                    severityType: 'success',
                    message: '',
                    isActive: false
                  }
                })
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
