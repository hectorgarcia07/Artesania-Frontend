import { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { isTokenValid } from "../utils/isTokenValid"
import { updateAlert, errorAlert } from '../utils/AlertsUtils'
import { useStateValue } from '../state' 

const ProtectedRoute = () => {
  console.log("Checking validity")
  const [state, dispatch] = useStateValue();
  const navigate = useNavigate()
  const location = useLocation()
  
  useEffect(() => {
    console.log('In user effect')
    const result = isTokenValid()
      if(!result.valid){
        errorAlert({
          message: result.message,
          dispatchObj: dispatch
        })
        console.log("Redireting to sign in");
        
        navigate('/signin', { replace: true, state: {from: location }})
      }
  }, [navigate, state.user])

  console.log("Valid token");  
  return <Outlet />
}

export default ProtectedRoute