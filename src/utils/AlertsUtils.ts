import { Action } from '../state'

interface UpdateAlertProps {
  message: string,
  dispatchObj: React.Dispatch<Action>
}

export const successAlert = ({ message, dispatchObj}:UpdateAlertProps) => {
  dispatchObj({
    type: 'UPDATE_ALERT',
    payload: {
      isLoading: false,
      severityType: 'success',
      message,
      isActive: true    
    }
  })
  removeAlert(dispatchObj)
}

export const loadingAlert = ({message, dispatchObj}:UpdateAlertProps) => {
  dispatchObj({ 
    type: "UPDATE_ALERT", 
    payload: {
      isLoading: true,
      severityType: 'info',
      message,
      isActive: true
    }
  })
  removeAlert(dispatchObj)

}

export const errorAlert = ({ message, dispatchObj }: UpdateAlertProps) => {
  dispatchObj({ 
    type: "UPDATE_ALERT", 
    payload: {
      isLoading: false,
      severityType: 'error',
      message,
      isActive: true
    }
  })
  removeAlert(dispatchObj)

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