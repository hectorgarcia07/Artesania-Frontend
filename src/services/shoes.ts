import axios, { AxiosError } from 'axios'
import { Shoe, ShoePostData, Token } from '../types'
import { GetAllResponse, ImgUploadResponse, 
  DeleteResponse, CreateShoeResponse , UpdateShoeResponse
} from '../responseTypes'
import { pathToDefault } from '../utils/pathToDefault'

const baseUrl = '/api/shoes'

const getConfig = (token:Token) => {
  return {
    headers: { 
      "Authorization": `Bearer ${token}` }
  }
}

//get all shoes and return it or the error message
const getAll = async (token:Token) => {
  const resultObj:GetAllResponse = {
    statusCode: 0,
    message: '',
    data: null,
  }
  try{
    console.log("IN get all")
    const config = getConfig(token)
    const { data, status } = await axios.get<Shoe[]>(`${baseUrl}`, config);
    resultObj.data = data
    resultObj.statusCode = status
    resultObj.message = 'Successfully got your inventory'

    return resultObj
  }catch(error: any){
    console.log("ERROR GETTING ALL ", error)
    if (axios.isAxiosError(error)){
      resultObj.statusCode = error.response?.status || 401,
      resultObj.message = 'Expired session. Please login again'
    } else{
      resultObj.statusCode = error.response?.status || 500,
      resultObj.message = "Interal Server Error. Please try again."
    }
    return resultObj
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
  const resultObj:CreateShoeResponse = { data: null, statusCode: 500, message: 'Error creating a new shoe. Please try again.' }
  try{
    const config = getConfig(token)
    const response = await axios.post(baseUrl, shoeObj, config)
    console.log("RESPONSE", response)
    resultObj.data = response.data
    resultObj.message = 'Added a new Shoe'
    resultObj.statusCode = response.status

    console.log('result, ', response)

    return resultObj
  }catch(e: unknown){
    console.log('Error ', e)
    return resultObj
  }
}

const uploadImage = async (img:File, token:string) => {
  const imgUploadResponse:ImgUploadResponse = { url: pathToDefault }
  try{
    const config = getConfig(token)
    const formData = new FormData()
    console.log("FILE TO SEND: ", img, "CONFIG ", formData)
    const response = await axios.post(`${baseUrl}/img`, formData, config)
    
    if(response.data.link){
      imgUploadResponse.url = response.data.link
    }

    console.log("SUCCESS ", response.data)
    return imgUploadResponse
  }catch(e: unknown){
    console.log("failed to upload ", e)
    return imgUploadResponse
  }
}

const updateShoeEntry = async (id:string, newObject:ShoePostData, token:string) => {
  const updateResponse:UpdateShoeResponse = { data: null, message: 'Error updating a shoe. Please try again.', statusCode: 500 }
  try{
    const config = getConfig(token)
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
    updateResponse.data = response.data
    updateResponse.message = 'Updated successfully'
    updateResponse.statusCode = response.status

    return updateResponse
  }catch(e: unknown){
    console.log('Updated error: ', e)
    return updateResponse
  }
}

const deleteShoeEntry = async (id:string, token:string) => {
  const deleteResultObj:DeleteResponse = { statusCode: 0, message: '' }
  try{
    const config = getConfig(token)
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    deleteResultObj.statusCode = response.status
    deleteResultObj.message = 'Item deleted'

    return deleteResultObj
  }catch(e: unknown){
    console.log("Error, please sign in again", e)

    deleteResultObj.statusCode = 500
    deleteResultObj.message = 'Internal server error'
    return deleteResultObj
  }
}

export default { 
  getAll,
  getSingleShoe,
  createShoeEntry,
  updateShoeEntry,
  deleteShoeEntry,
  uploadImage
}