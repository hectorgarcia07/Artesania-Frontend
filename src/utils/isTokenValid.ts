import jwt_decode from "jwt-decode";

export const isTokenValid = () => {
  const token = localStorage.getItem('token');
  const tokenResult = { valid: false, message: '' }
  if(!token){
    tokenResult.message = 'Please sign in.'
    return tokenResult
  }else{
    try{
      const decodedToken:any = jwt_decode(JSON.parse(token));
      const currentDate = new Date();

      // JWT exp is in seconds
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        tokenResult.message = 'Session expired. Please sign in again.'
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        return tokenResult
      }
    }catch(e:unknown){
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      tokenResult.message = 'Internal error.'
      if(e instanceof Error){
        console.log(e.message)
      }
      return tokenResult
    }
    
  }
  tokenResult.valid = true
  return tokenResult;
}
