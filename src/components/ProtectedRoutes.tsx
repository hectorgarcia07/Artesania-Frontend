import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { isTokenValid } from "../utils/isTokenValid"
import { updateAlert } from '../utils/AlertsUtils'
import { useStateValue } from '../state' 

const ProtectedRoute = () => {
  const [, dispatch] = useStateValue();
  const location = useLocation()
  const token = localStorage.getItem('token');

  if(!isTokenValid()){
    updateAlert(
      {
        alertProps: {
        isLoading: false,
        severityType: 'error',
        message: 'Session expired. Please sign in again.',
        isActive: true
        },
        dispatchObj: dispatch
    })
    return <Navigate to="signin" replace state={{from: location}} />
  }

  console.log("Valid token");  
  return <Outlet />
}

export default ProtectedRoute