import { Token } from "../types";

export const checkTokenValidity = ():Token => {
  try{
    const tokenFromLocalStorage = localStorage.getItem('token')
    if(!tokenFromLocalStorage)
      return null
    
    const token = JSON.parse(tokenFromLocalStorage)
    return typeof token == 'string' ? (token as Token) : null
  }catch(e:unknown){
    return null
  }
}
