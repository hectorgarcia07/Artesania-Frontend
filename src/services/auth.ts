import axios from 'axios'
import { Shoe, ShoeData } from '../types'

const baseUrl = '/api/users'

export const signin = async (credentials:{username: string, password:string}) => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  console.log(response)
  return response;
}