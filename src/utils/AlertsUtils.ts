import { Action } from '../state'
import { Alert } from '../types'

interface UpdateAlertProps {
  alertProps: Alert, 
  dispatchObj: React.Dispatch<Action>
}

interface NewUpdateAlertProps {
  message: string,
  dispatchObj: React.Dispatch<Action>
}

export const updateAlert = ({alertProps, dispatchObj}:UpdateAlertProps) => {
  dispatchObj({ 
    type: "UPDATE_ALERT", 
    payload: alertProps
  })
  removeAlert(dispatchObj)
}

export const loadingAlert = ({alertProps, dispatchObj}:UpdateAlertProps) => {
  dispatchObj({ 
    type: "UPDATE_ALERT", 
    payload: alertProps
  })
}

export const errorAlert = ({ message, dispatchObj }: NewUpdateAlertProps) => {
  dispatchObj({ 
    type: "UPDATE_ALERT", 
    payload: {
      isLoading: false,
      severityType: 'error',
      message,
      isActive: true
    }
  })
}

export const removeAlert = (dispatchObj:React.Dispatch<Action>) => {

  setTimeout(() => {
    dispatchObj({ 
      type: "UPDATE_ALERT", 
      payload: {
        isLoading: false,
        severityType: 'success',
        message: '',
        isActive: false
      }
    })
  }, 5000)
}