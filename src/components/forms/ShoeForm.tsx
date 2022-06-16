/* eslint-disable no-extra-boolean-cast */
import { Formik, Field, Form, ErrorMessage,FieldArray, FormikErrors, FormikTouched } from 'formik';
import { ShoeData, Gender, OnlySizesData, FormError,Age, Size } from '../../types'
import * as Yup from 'yup';
import { SetStateAction } from 'react';
import { TextField, InputLabel, FormControl, Select, MenuItem } from '@mui/material';

interface SheFormProp{
  submitState: FormError, 
  onSubmit: (fields: ShoeData) => Promise<void>,
  data: ShoeData | null
}

const ShoeForm = ({submitState, onSubmit, data}:SheFormProp) => {
  console.log("Shoe form", onSubmit)
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    color: Yup.string()
      .required('Color is required'),
    price: Yup.number().moreThan(0)
      .required('A price is required'),
    gender: Yup.string()
      .required('Select an gender'),
    age: Yup.string()
      .required('Select an age'),
    sizes: Yup.array().of(
      Yup.object().shape({
        size: Yup.number().moreThan(0)
          .required('A size is required'),
        quantity: Yup.number()
          .required('A quantity is required')
          .moreThan(-1)
    })).min(1)

  })

  let initialValue:ShoeData;

  //make a new initial value or make a copy of the passed data to edit.
  if(data == null){
    initialValue = {
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
  }else{
    initialValue = {
      ...data,
      sizes: data.sizes.map(size => ({...size}))
    }
  }
  //creates a new obj to represent a size
  const createNewSize = (values:ShoeData, setValues: { (values: SetStateAction<ShoeData>, shouldValidate?: boolean | undefined): void; (arg0: { sizes: OnlySizesData[]; name: string; color: string; price: number; gender: Gender | null; age: Age | null; }): void; }) => {
    const newSizeArr:OnlySizesData[] = [...values.sizes]
    newSizeArr.push({size: 0, quantity: 0})
    setValues({...values, sizes: newSizeArr})
  }

  //remvoes an size from the array
  const removeSize = (index:number, values:ShoeData, setValues: { (values: SetStateAction<ShoeData>, shouldValidate?: boolean | undefined): void; (arg0: { sizes: OnlySizesData[]; name: string; color: string; price: number; gender: Gender | null; age: Age | null; }): void; }) => {
    const newSizeArr:OnlySizesData[] = [...values.sizes]
    newSizeArr.splice(index, 1)
    setValues({...values, sizes: newSizeArr})
  }

  const stuff = (error: string | string[] | FormikErrors<Omit<Size, "id">>[] | undefined, touched: FormikTouched<Omit<Size, "id">>[] | undefined, i:number) =>{
    console.log("Error", error)
    if(error && error != undefined && touched && touched != undefined){
      return Boolean(error[i]) && touched[i]
    }
    console.log("Touched", touched)
    return false
  }

  return (
    <>
    {Boolean(submitState.error) ? (<div>SERVER IS DOWN!</div>) : null}
    <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ errors, values, touched, setValues, handleChange }) => (
        <Form >
          <TextField
            fullWidth
            id="email"
            name="name"
            label="Name"
            value={values.name}
            onChange={handleChange}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />

          <TextField
            fullWidth
            id="color"
            name="color"
            label="Color"
            value={values.color}
            onChange={handleChange}
            error={touched.color && Boolean(errors.color)}
            helperText={touched.color && errors.color}
          />

          <TextField
            fullWidth
            type="number"
            id="price"
            name="price"
            label="Price"
            value={values.price}
            onChange={handleChange}
            error={touched.price && Boolean(errors.price)}
            helperText={touched.price && errors.price}
          />

          <FormControl fullWidth>
            <InputLabel id="gender_label">Gender</InputLabel>
            <Select
              labelId="gender_label"
              name='gender'
              value={values.gender}
              label="Gender"
              onChange={handleChange}
            >
              <MenuItem value={Gender.MALE}>Male</MenuItem>
              <MenuItem value={Gender.FEMALE}>Female</MenuItem>
              <MenuItem value={Gender.UNISEX}>Unisex</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="age_label">Age</InputLabel>
            <Select
              labelId="age_label"
              name='age'
              value={values.age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={Age.ADULT}>Adult</MenuItem>
              <MenuItem value={Age.KID}>Kid</MenuItem>
            </Select>
          </FormControl>
          
          

          {errors.sizes && touched.sizes ? (<div>Sizes must be unique</div>) : null}
          
          <FieldArray name="sizes">
            
            {() => (values.sizes.map((size, i) => {
              return(
                <div key={i}>
                  
                  <TextField
                    fullWidth
                    type="number"
                    name={`sizes.${i}.size`}
                    label="Size"
                    value={values.sizes[i].size}
                    onChange={handleChange}
                    error={touched?.sizes?[i] && Boolean(errors?.sizes?[i]) }
                    helperText={touched.price && errors.price}
                  />




                  <div className="form-group col-6">
                    <label>Quantity</label>
                    <Field name={`sizes.${i}.quantity`} type="number" />
                    <ErrorMessage name={`sizes.${i}.quantity`} component="div" className="invalid-feedback">
                      {() => <div>Quantity must be greater than 0</div>}
                    </ErrorMessage>
                  </div>
                  <button onClick={() => removeSize(i, values, setValues)}>Remove</button>
                </div>
              )
              }))}
          </FieldArray>
          <button onClick={() => createNewSize(values, setValues)}>Add new size</button>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
    </>
  )
}

export default ShoeForm