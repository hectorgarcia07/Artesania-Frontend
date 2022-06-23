import { ShoeData, FormError, Shoe } from "../../../types"
import ShoeServices from '../../../services/shoes'
import { useStateValue } from "../../../state";
import ShoeForm from "./ShoeForm";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom'

const EditShoeForm = ({shoeData}:{shoeData: Shoe}) => {
  const [submitState, setSubmitState] = useState<FormError>({
    error: undefined
  })
  const [, dispatch] = useStateValue()
  const navigate = useNavigate()
  const location = useLocation()

  const onSubmit = async (fields:ShoeData) => {
    try{
      const token = JSON.parse(localStorage.getItem("token")!)
      const response = await ShoeServices.updateShoeEntry(shoeData?.id, fields, token)
      if(response.status === 200){
        dispatch({ type: "UPDATE_SHOE", payload: response.data })
        navigate('/')
      }
    }catch(err: unknown){
      console.log("ERROR UPDAGING")
      if (axios.isAxiosError(err)) {
        setSubmitState({ error: err.response})
        console.log("AXIOS ", err.message, err.response?.status)
        localStorage.removeItem('token')
        navigate('/signin', {replace: true, state: {from: location, data: shoeData}} )
      }
    }
  }

  return (
    <ShoeForm submitState={submitState} onSubmit={onSubmit} data={shoeData}/>
  )
}

export default EditShoeForm