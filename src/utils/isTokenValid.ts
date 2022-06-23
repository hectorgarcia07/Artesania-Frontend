import jwt_decode from "jwt-decode";

export const isTokenValid = () => {
  const token = localStorage.getItem('token');

  if(!token){
    return false
  }else{
    const decodedToken:any = jwt_decode(JSON.parse(token));
    console.log("Decoded Token", decodedToken);
    const currentDate = new Date();

    // JWT exp is in seconds
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      console.log("Token expired.");
      localStorage.removeItem('token')
      return false
    }
  }
  return true;
}
