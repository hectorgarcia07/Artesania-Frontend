import { ShoeData } from "../../../types"
import ShoeServices from '../../../services/shoes'
import { useStateValue } from "../../../state";
import { useNavigate } from "react-router-dom";
import ShoeForm from "./ShoeForm";
import { useState } from "react";
import { pathToDefault } from "../../../utils/pathToDefault";

const CreateShoeForm = () => {
  const [submitState, setSubmitState] = useState({
    error: false
  })
  const [state, dispatch] = useStateValue()
  const navigate = useNavigate()

  const onSubmit = async(fields:ShoeData) => {
    console.log("ON SUBMIT ", fields)
    const token = JSON.parse(localStorage.getItem("token")!)
    let url = ''

    //if image was uploaded, then check to see if you can save it and save the url
    if(fields.shoe_image instanceof File){
      const img_response = await ShoeServices.uploadImage(fields.shoe_image, token)
      url = img_response ? img_response : pathToDefault
    }
    else{
      url = pathToDefault
    }
    const { shoe_image, ...other } = fields
    //create new object to post excluding shoe_image and adding url
    const shoePostData = { ...other, url}
    try{
      const response = await ShoeServices.createShoeEntry(shoePostData, token)
      console.log("RESPONSE", response)
      if(response){
        if(response.status === 201){
          dispatch({ type: "ADD_SHOE", payload: response.data })
          navigate('/')
        }
      }
    }
    catch(e){
      console.log("Failed")
    }
    setSubmitState({
      error: true
    })
  }

  return (
    <ShoeForm submitState={submitState} onSubmit={onSubmit} data={null}/>
  )
}

export default CreateShoeForm