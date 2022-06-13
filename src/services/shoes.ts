import axios from 'axios'
import { Shoe } from '../types'
const baseUrl = 'http://localhost:3003/api/shoes'

//get all shoes and return it or the error message
const getAll = async () => {
  try{
    const { data } = await axios.get<Shoe[]>(`${baseUrl}`);
    return data
  }catch(e: unknown){
    let err = 'Error getting all shoes ';
    if(e instanceof Error){
      err += e.message
    }
    throw new Error(err);
  }
}

/* const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}
 */
export default { getAll }