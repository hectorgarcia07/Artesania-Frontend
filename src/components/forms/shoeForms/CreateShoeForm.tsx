import { Age, Gender, ShoeData } from "../../../types"
import ShoeServices from '../../../services/shoes'
import { useStateValue } from "../../../state";
import { useNavigate } from "react-router-dom";
import ShoeForm from "./ShoeForm";
import { pathToDefault } from "../../../utils/pathToDefault";
import { successAlert, loadingAlert, errorAlert } from "../../../utils/AlertsUtils";

const CreateShoeForm = () => {
  const [state, dispatch] = useStateValue()
  const navigate = useNavigate()

  const initialValue = {
    shoe_image: undefined,
    name: "",
    color: "",
    price: 0,
    gender: Gender.MALE,
    age: Age.ADULT,
    sizes: [{
      size: 0,
      quantity: 0
    }]
  }

  const onSubmit = async (fields:ShoeData) => {
    loadingAlert({
      message: 'Submitting info. Please wait...',
      dispatchObj: dispatch
    })

    console.log("ON SUBMIT ", fields)
    const token = state.token
    let url = pathToDefault

    if(!token){
      errorAlert({ message: 'Expired session, please sign in ', dispatchObj: dispatch })
      dispatch({ type: 'SIGN_OUT' })
      return navigate('/signin', { replace: true, state: { from: location } } )
    }

    //if image was uploaded, then check to see if you can save it and save the url
    if(fields.shoe_image instanceof File){
      const responeObj = await ShoeServices.uploadImage(fields.shoe_image, token)
      url = responeObj.url
    }
    
    const { shoe_image, ...other } = fields
    //create new object to post excluding shoe_image and adding url
    const shoePostData = { ...other, url}

    const response = await ShoeServices.createShoeEntry(shoePostData, token)
    console.log("RESPONSE", response)
    if(response && response.data && response.statusCode === 201){
      successAlert({
        message: 'Added a new Shoe.',
        dispatchObj: dispatch
      })

      dispatch({ type: "ADD_SHOE", payload: response.data })
      navigate('/')
    }
    else{
      errorAlert({
        message: 'Error creating a new shoe. Please try again.',
        dispatchObj: dispatch
      })
    }
  }

  return (
    <ShoeForm onSubmit={onSubmit} initialValue={initialValue}/>
  )
}

export default CreateShoeForm