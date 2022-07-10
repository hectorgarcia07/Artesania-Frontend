import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import { Alert as AlertType} from '../../types';

export default function TransitionAlerts({severityType, message, isActive}:AlertType) {
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={isActive}>
        <Alert
          severity={severityType}
          sx={{ mb: 2 }}
        >
        { message }
        </Alert>
      </Collapse>
    </Box>
  );
}
