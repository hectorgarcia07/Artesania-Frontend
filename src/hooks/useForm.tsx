import { useState } from "react";
import { OnlyShoeData, OnlySizesData } from '../types'

//custom hook that will be used on forms
const useForm = (callback: any, initialState:OnlyShoeData) => {
  const [shoeValues, setShoeValues] = useState(initialState)

  // onChange
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShoeValues({
      ...shoeValues, 
      [event.target.name]: event.target.value 
    });
  };

  // onSubmit
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>, sizes:OnlySizesData[]) => {
    event.preventDefault();
    
    await callback(); // triggering the callback
  };

  return {
    shoeValues, onChange, onSubmit
  }
};

export default useForm