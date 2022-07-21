import { useEffect } from 'react'
import { Outlet, useLocation, Navigate } from 'react-router-dom'
import { isTokenValid } from "../utils/isTokenValid"
import { errorAlert } from '../utils/AlertsUtils'
import { useStateValue } from '../state' 

const ProtectedRoute = () => {
  console.log("Checking validity")
  const [state, dispatch] = useStateValue();
  const location = useLocation()

  console.log('In Protected Route effect')
  const result = isTokenValid()
  useEffect(() => {
    if(!result.valid){
      console.log("error message")
      dispatch({type: 'SIGN_OUT'})
      errorAlert({
        message: result.message,
        dispatchObj: dispatch
      })
    }
  }, [])

  if(!result.valid){
    console.log("Redireting to sign in");
    return <Navigate to="/signin" replace state={{ from: location }} />
  }

  console.log("Valid token");  
  return <Outlet />
}

export default ProtectedRoute