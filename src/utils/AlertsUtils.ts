import { useStateValue } from "../state"
import { Alert } from '../types'

const [, dispatch] = useStateValue();

export const updateAlert = (alertProps:Alert) => {
  dispatch({ 
    type: "UPDATE_ALERT", 
    payload: alertProps
  })

}

export const removeAlert = () => {
  setTimeout(() => {
    dispatch({ 
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