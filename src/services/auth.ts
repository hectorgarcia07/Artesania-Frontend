import axios from 'axios'
import { checkSignInResponse, SignInResponse } from '../utils/signInTypeCheck'

const baseUrl = '/api/users'

const signin = async (credentials:{username: string, password:string}) => {
  try{
    const response = await axios.post(`${baseUrl}/signin`, credentials)
    const data = checkSignInResponse(response.data)
    return data;
  }catch(error ){
    const response = { message: 'Internal server error', success: false }
    return response
  }
}

export default {
  signin
}