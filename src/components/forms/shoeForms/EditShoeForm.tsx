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
  const [, dispatch] = useStateValue()
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
    try{
      const token = JSON.parse(localStorage.getItem("token")!)
      let url = ''

      //update new image of shoe
      if(fields.shoe_image instanceof File){
        console.log("About to upload image")
        const img_response = await ShoeServices.uploadImage(fields.shoe_image, token)

        if(!img_response && oldUrl){
          url = oldUrl
        }
        else if(!img_response && !oldUrl){
          url = pathToDefault
        }
        else{
          url = img_response
        }
      }
      else{
        url = oldUrl
      }
      const {shoe_image, ...fieldsData } = fields
      const updatedFieldData = {...fieldsData, url}
      console.log("About to modify ", updatedFieldData)
      const response = await ShoeServices.updateShoeEntry(shoeData.id, updatedFieldData, token)
      if(response.status === 200){
        successAlert({
          message: 'Updated a shoe.',
          dispatchObj: dispatch
        })

        dispatch({ type: "UPDATE_SHOE", payload: response.data })
        navigate('/')
      }
    }catch(err: unknown){
      console.log("ERROR UPDAGING")
      errorAlert({
        message: 'Error updating a shoe. Please try again.',
        dispatchObj: dispatch
      })

      if (axios.isAxiosError(err)) {
        setSubmitState({ error: true, submitStatus: false})
        console.log("AXIOS ", err.message, err.response?.status)
        localStorage.removeItem('token')
        navigate('/signin', {replace: true, state: {from: location, data: shoeData}} )
      }
    }
  }

  return (
    <ShoeForm submitState={submitState} onSubmit={onSubmit} data={shoeDataToModify}/>
  )
}

export default EditShoeForm