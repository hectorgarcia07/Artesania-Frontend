import axios from 'axios'
import { Shoe, ShoeData } from '../types'

const baseUrl = '/api/shoes'

const getConfig = (token:string) => {
  return {
    headers: { 
      "Authorization": `Bearer ${token}` }
  }
}

//get all shoes and return it or the error message
const getAll = async () => {
  try{
    const { data } = await axios.get<Shoe[]>(`${baseUrl}`);
    console.log("GETALL ", data)
    return data
  }catch(e: unknown){
    let err = 'Error getting all shoes ';
    if(e instanceof Error){
      err += e.message
    }
    throw new Error(err);
  }
}

const getSingleShoe = async (id:string, token:string) => {
  try{
    const config = getConfig(token)
    console.log('id', id)
    const { data } = await axios.get<Shoe>(`${baseUrl}/${id}`, config);
    console.log("SINGLE SHOE ", data)
    return data
  }catch(e: unknown){
    let err = 'Error getting a shoe ';
    if(e instanceof Error){
      err += e.message
    }
    console.log("ERROR SINGEL SOE", err)
    throw new Error(err)
  }
}

const createShoeEntry = async (shoeObj:ShoeData, token:string) => {
  try{
    const config = getConfig(token)
    const response = await axios.post(baseUrl, shoeObj, config)
    console.log("RESPONSE", response)
    return response
  }catch(e: any){
    return e
  }
}

const updateShoeEntry = async (id:string, newObject:ShoeData, token:string) => {
  const config = getConfig(token)
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response
}

const deleteShoeEntry = async (id:string, token:string) => {
  const config = getConfig(token)
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}

export default { 
  getAll,
  getSingleShoe,
  createShoeEntry,
  updateShoeEntry,
  deleteShoeEntry
}