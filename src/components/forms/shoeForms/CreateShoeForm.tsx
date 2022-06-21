import { ShoeData, FormError } from "../../../types"
import ShoeServices from '../../../services/shoes'
import { useStateValue } from "../../../state";
import { useNavigate } from "react-router-dom";
import ShoeForm from "./ShoeForm";
import { useState } from "react";

const CreateShoeForm = () => {
  const [submitState, setSubmitState] = useState<FormError>({
    error: undefined
  })
  const [state, dispatch] = useStateValue()
  const navigate = useNavigate()

  const onSubmit = async(fields:ShoeData) => {
    const response = await ShoeServices.createShoeEntry(fields, state.token)
    console.log("RESPONSE", response)

    if(response.status === 201){
      dispatch({ type: "ADD_SHOE", payload: response.data })
      navigate('/')
    }

    setSubmitState({
      error: response
    })
  }

  return (
    <ShoeForm submitState={submitState} onSubmit={onSubmit} data={null}/>
  )
}

export default CreateShoeForm