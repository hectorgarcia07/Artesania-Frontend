import { ShoeData, FormError, Shoe } from "../../../types"
import ShoeServices from '../../../services/shoes'
import { useStateValue } from "../../../state";
import { useNavigate } from "react-router-dom";
import ShoeForm from "./ShoeForm";
import { useState } from "react";

const EditShoeForm = ({shoeData}:{shoeData:Shoe }) => {
  const [submitState, setSubmitState] = useState<FormError>({
    error: undefined
  })
  const [, dispatch] = useStateValue()
  const navigate = useNavigate()

  const onSubmit = async (fields:ShoeData) => {
    const response = await ShoeServices.updateShoeEntry(shoeData?.id, fields)

    if(response.status === 200){
      dispatch({ type: "UPDATE_SHOE", payload: response.data })
      navigate('/')
    }

    setSubmitState({
      error: response
    })
  }

  return (
    <ShoeForm submitState={submitState} onSubmit={onSubmit} data={shoeData}/>
  )
}

export default EditShoeForm