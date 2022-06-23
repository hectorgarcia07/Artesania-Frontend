import {useState} from 'react'
import { AlertColor } from '@mui/material/'

interface PopupType{
  isActive: boolean;
  message: string;
  severityType: AlertColor;
}

export const useNotification = () => {
  const [status, setStatus] = useState<PopupType>({
    isActive: false, 
    message: '', 
    severityType: 'info',
  });

  return {
    status, setStatus
  }
}