import { ShoeData } from "../../../types"
import ShoeServices from '../../../services/shoes'
import { useStateValue } from "../../../state";
import { useNavigate } from "react-router-dom";
import ShoeForm from "./ShoeForm";
import { useState } from "react";
import { pathToDefault } from "../../../utils/pathToDefault";
import { successAlert, loadingAlert, errorAlert } from "../../../utils/AlertsUtils";

const CreateShoeForm = () => {
  const [submitState, setSubmitState] = useState({
    error: false,
    submitStatus: false
  })
  const [state, dispatch] = useStateValue()
  const navigate = useNavigate()

  const onSubmit = async(fields:ShoeData) => {
    console.log("ON SUBMIT ", fields)
    const token = JSON.parse(localStorage.getItem("token")!)
    let url = ''

    setSubmitState({
      error: false,
      submitStatus: true
    })

    loadingAlert({
      message: 'Submitting info. Please wait...',
      dispatchObj: dispatch
    })

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
      if(response && response.status === 201){
        successAlert({
          message: 'Added a new Shoe.',
          dispatchObj: dispatch
        })

        dispatch({ type: "ADD_SHOE", payload: response.data })
        navigate('/')
      }
    }
    catch(e){
      errorAlert({
        message: 'Error creating a new shoe. Please try again.',
        dispatchObj: dispatch
      })
    }
    setSubmitState({
      error: true,
      submitStatus: false
    })
  }

  return (
    <ShoeForm submitState={submitState} onSubmit={onSubmit} data={null}/>
  )
}

export default CreateShoeForm