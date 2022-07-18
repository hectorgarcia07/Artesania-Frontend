import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { isTokenValid } from "../utils/isTokenValid"
import { updateAlert } from '../utils/AlertsUtils'
import { useStateValue } from '../state' 

const ProtectedRoute = () => {
  console.log("Checking validity")
  const [, dispatch] = useStateValue();
  const location = useLocation()
  const token = localStorage.getItem('token');

  const result = isTokenValid()

  if(result.valid){
    updateAlert({
      alertProps: {
        isLoading: false,
        severityType: 'error',
        message: result.message,
        isActive: true
      },
      dispatchObj: dispatch
    })
    console.log("Redireting to sign in");
    
    return <Navigate to="signin" replace state={{from: location}} />
  }

  console.log("Valid token");  
  return <Outlet />
}

export default ProtectedRoute