import { Token } from "../types";


export const checkTokenValidity = ():Token => {
  const tokenFromLocalStorage = localStorage.getItem('token')
  return typeof tokenFromLocalStorage == 'string' ? (JSON.parse(tokenFromLocalStorage) as Token) : null
}
