import axios from 'axios'

const baseUrl = '/api/users'

const signin = async (credentials:{username: string, password:string}) => {
  try{
    const response = await axios.post(`${baseUrl}/signin`, credentials)
    return response;
  }catch(error ){
    if (axios.isAxiosError(error)) {
      console.log('error ', error.response)
      return error.response
    } else {
      throw new Error('different error than axios');
    }
  }
}

export default {
  signin
}