import axios from 'axios'
import { Shoe, ShoeData } from '../types'
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

const createShoeEntry = async (shoeObj:ShoeData) => {
  try{
    const response = await axios.post(baseUrl, shoeObj)
    console.log("RESPONSE", response)
    return response
  }catch(e: any){
    return e
  }
}

const updateShoeEntry = async (id:string, newObject:ShoeData) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response
}

export default { 
  getAll,
  createShoeEntry,
  updateShoeEntry
}