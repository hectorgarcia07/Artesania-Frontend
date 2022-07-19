import axios from 'axios'
import { Shoe, ShoePostData } from '../types'

const baseUrl = '/api/shoes'

const getConfig = (token:string) => {
  return {
    headers: { 
      "Authorization": `Bearer ${token}` }
  }
}

//get all shoes and return it or the error message
const getAll = async (token:string) => {
  try{
    console.log("IN get all")
    const config = getConfig(token)
    const { data } = await axios.get<Shoe[]>(`${baseUrl}`, config);
    console.log("GETALL ", data)
    return data
  }catch(e: unknown){
    console.log(e)
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

const createShoeEntry = async (shoeObj:ShoePostData, token:string) => {
  try{
    const config = getConfig(token)
    const response = await axios.post(baseUrl, shoeObj, config)
    console.log("RESPONSE", response)
    return response
  }catch(e: unknown){
    if(e instanceof Error){
      console.log('ERROR POSTING', e.message)
      throw e
    }
  }
}

const uploadImage = async (img:File, token:string) => {
  try{
    const config = getConfig(token)
    const formData = new FormData()
    formData.append("shoe_image", img)
    console.log("FILE TO SEND: ", img, "CONFIG ", formData)
    const response = await axios.post(`${baseUrl}/img`, formData, config)
    console.log("SUCCESS ", response.data)
    return response.data.link
  }catch(e: unknown){
    console.log("failed to upload")
    if(e instanceof Error){
      console.log("ERROR FAILED UPLOAD ", e.message)
    }
    return null
  }

}

const updateShoeEntry = async (id:string, newObject:ShoePostData, token:string) => {
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
  deleteShoeEntry,
  uploadImage
}