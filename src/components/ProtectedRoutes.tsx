import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { isTokenValid } from "../utils/isTokenValid"

const ProtectedRoute = () => {
  const location = useLocation()
  const token = localStorage.getItem('token');

  if(!isTokenValid()){
    return <Navigate to="signin" replace state={{from: location}} />
  }

  console.log("Valid token");  
  return <Outlet />
}

export default ProtectedRoute