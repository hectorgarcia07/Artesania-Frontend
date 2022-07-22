import { ShoeData, Shoe } from "../../../types"
import ShoeServices from '../../../services/shoes'
import { useStateValue } from "../../../state";
import ShoeForm from "./ShoeForm";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom'
import { pathToDefault } from "../../../utils/pathToDefault";
import { loadingAlert, errorAlert, successAlert } from "../../../utils/AlertsUtils";

const EditShoeForm = ({shoeData}:{shoeData: Shoe}) => {
  const [submitState, setSubmitState] = useState({
    error: false,
    submitStatus: false
  })
  const [state, dispatch] = useStateValue()
  const navigate = useNavigate()
  const location = useLocation()

  const {url: oldUrl, id, ...restOfData} = shoeData
  const shoeDataToModify = {...restOfData, shoe_image: undefined}

  const onSubmit = async (fields:ShoeData) => {
    console.log("Submitting ")
    setSubmitState({
      error: false,
      submitStatus: true
    })

    loadingAlert({
      message: 'Submitting info. Please wait...',
      dispatchObj: dispatch
    })

    const token = state.token
    let url = oldUrl.length ? oldUrl : pathToDefault

    if(!token){
      errorAlert({ message: 'Expired session, please sign in ', dispatchObj: dispatch })
      dispatch({ type: 'SIGN_OUT' })
      return navigate('/signin', { replace: true, state: { from: location } } )
    }

    //update new image of shoe
    if(fields.shoe_image instanceof File){
      console.log("About to upload image")
      const img_response = await ShoeServices.uploadImage(fields.shoe_image, token)

      if(img_response.url ){
        url = img_response.url
      }
    }
  
    const { shoe_image, ...fieldsData } = fields
    const updatedFieldData = {...fieldsData, url}
    console.log("About to modify ", updatedFieldData)
    const response = await ShoeServices.updateShoeEntry(shoeData.id, updatedFieldData, token)

    if(response.data && response.statusCode === 200){
      successAlert({
        message: response.message,
        dispatchObj: dispatch
      })

      dispatch({ type: "UPDATE_SHOE", payload: response.data })
      navigate('/')
    }
    else{
      console.log("ERROR UPDAGING")
      errorAlert({
        message: response.message,
        dispatchObj: dispatch
      })

      setSubmitState({ error: true, submitStatus: false })
      dispatch({ type: 'SIGN_OUT' })
      navigate('/signin', {replace: true, state: {from: location, data: shoeData}} )
    }
  }

  return (
    <ShoeForm submitState={submitState} onSubmit={onSubmit} data={shoeDataToModify}/>
  )
}

export default EditShoeForm