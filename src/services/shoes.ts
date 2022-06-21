import axios from 'axios'
import { Shoe, ShoeData } from '../types'

const baseUrl = '/api/shoes'

const setToken = (token:string):string => {  
  return `bearer ${token}`
}

//get all shoes and return it or the error message
const getAll = async () => {
  try{
    const { data } = await axios.get<Shoe[]>(`${baseUrl}`);
    console.log("DATA", data)
    return data
  }catch(e: unknown){
    let err = 'Error getting all shoes ';
    if(e instanceof Error){
      err += e.message
    }
    throw new Error(err);
  }
}

const createShoeEntry = async (shoeObj:ShoeData, token:string) => {
  try{
    const config = {
      headers: { Authorization: setToken(token) },  
    }
    const response = await axios.post(baseUrl, shoeObj, config)
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

const deleteShoeEntry = async (id:string) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response
}

export default { 
  getAll,
  createShoeEntry,
  updateShoeEntry,
  deleteShoeEntry
}