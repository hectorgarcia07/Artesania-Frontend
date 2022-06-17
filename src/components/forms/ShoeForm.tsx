/* eslint-disable no-extra-boolean-cast */
import { Formik, Field, Form, ErrorMessage, FieldArray, FormikErrors, FormikTouched } from 'formik';
import { ShoeData, Gender, OnlySizesData, FormError, Age, Size } from '../../types'
import { SetStateAction } from 'react';
import { TextField, InputLabel, FormControl, Select, MenuItem, Button, Box, Typography, Input } from '@mui/material';

import { validationSchema } from '../../utils/ShoeFormSchema'

interface SheFormProp {
  submitState: FormError,
  onSubmit: (fields: ShoeData) => Promise<void>,
  data: ShoeData | null
}

const ShoeForm = ({ submitState, onSubmit, data }: SheFormProp) => {

  let initialValue: ShoeData;

  //make a new initial value or make a copy of the passed data to edit.
  if (data == null) {
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
  } else {
    initialValue = {
      ...data,
      sizes: data.sizes.map(size => ({ ...size }))
    }
  }
  
  //creates a new obj to represent a size
  const createNewSize = (values: ShoeData, setValues: { (values: SetStateAction<ShoeData>, shouldValidate?: boolean | undefined): void; (arg0: { sizes: OnlySizesData[]; name: string; color: string; price: number; gender: Gender | null; age: Age | null; }): void; }) => {
    const newSizeArr: OnlySizesData[] = [...values.sizes]
    newSizeArr.push({ size: 0, quantity: 0 })
    setValues({ ...values, sizes: newSizeArr })
  }

  //remvoes an size from the array
  const removeSize = (index: number, values: ShoeData, setValues: { (values: SetStateAction<ShoeData>, shouldValidate?: boolean | undefined): void; (arg0: { sizes: OnlySizesData[]; name: string; color: string; price: number; gender: Gender | null; age: Age | null; }): void; }) => {
    const newSizeArr: OnlySizesData[] = [...values.sizes]
    newSizeArr.splice(index, 1)
    setValues({ ...values, sizes: newSizeArr })
  }

  const checkErrorForSize = (touched: FormikTouched<Omit<Size, "id">>[] | { size: any; }[] | undefined, error:any, i: number) => {
    if (error != undefined && error[i] != undefined && touched != undefined && touched[i] != undefined) {
      return touched[i].size && Boolean(error[i].size)
    }
    return false
  }

  const checkHelperTextForSize = (touched: FormikTouched<Omit<Size, "id">>[] | undefined, error:any, i: number) => {
    console.log("CHECK HELPER TEXT")
    console.log("error: ", error)
    console.log("touched", touched)
    if (error != undefined && error[i] != undefined && touched != undefined && touched[i] != undefined) {
      return touched[i].size && error[i].size
    }
    return false
  }

  const checkErrorForQuantity = (touched:any, error:any, i: number) => {
    if (error != undefined && error[i] != undefined && touched != undefined && touched[i] != undefined) {
      return touched[i].quantity && Boolean(error[i].quantity)
    }
    return false
  }

  const checkHelperTextForQuantity = (touched:any, error:any, i: number) => {
    console.log("CHECK HELPER TEXT")
    console.log("error: ", error)
    console.log("touched", touched)
    if (error != undefined && error[i] != undefined && touched != undefined && touched[i] != undefined) {
      return touched[i].quantity && error[i].quantity
    }
    return false
  }

  const checkIfUniqueSizes = (error:any) => {
    if (error != undefined ) {
      return Boolean(error.unique) 
    }
    return false
  }

  const style = {
    pb: '1rem'
  }

  return (
    <>
      {Boolean(submitState.error) ? (<div>SERVER IS DOWN!</div>) : null}
      <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, values, touched, setValues, handleChange }) => (
          <Form >
            <InputLabel htmlFor="contained-button-file" sx={style}>
              <Input name="shoe_image"
                type="file" 
                inputProps={{accept: "image/png, image/jpg, image/jpeg"}} 
                id="contained-button-file" 
              />
            </InputLabel>
            <TextField
              sx={style}
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
              sx={style}
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
              sx={style}
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
            <FormControl fullWidth sx={style}>
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
            <FormControl fullWidth sx={style}>
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

            <Typography gutterBottom variant="h5" component="div">
              Sizes:
            </Typography>

            {checkIfUniqueSizes(errors.sizes) ? <Box sx={style}>Sizes must be unique</Box> : null}

            <FieldArray name="sizes">
              {() => (values.sizes.map((_size, i) => {
                return (
                  <Box key={i} sx={style}>
                    <TextField
                      sx={style}
                      fullWidth
                      type="number"
                      name={`sizes.${i}.size`}
                      label="Size"
                      value={values.sizes[i].size}
                      onChange={handleChange}
                      error={checkErrorForSize(touched.sizes, errors.sizes, i)}
                      helperText={checkHelperTextForSize(touched.sizes, errors.sizes, i)}
                      />

                    <TextField
                      fullWidth
                      sx={style}
                      type="number"
                      name={`sizes.${i}.quantity`}
                      label="Quantity"
                      value={values.sizes[i].quantity}
                      onChange={handleChange}
                      error={checkErrorForQuantity(touched.sizes, errors.sizes, i)}
                      helperText={checkHelperTextForQuantity(touched.sizes, errors.sizes, i)}
                      />

                    <Button 
                      onClick={() => removeSize(i, values, setValues)} 
                      type="button"
                      variant="contained"
                    >
                      Remove Size
                    </Button>
                  </Box>
                )
              }))}
            </FieldArray>
            <Box sx={style}>
              <Button onClick={() => createNewSize(values, setValues)} variant="contained">Add new size</Button>
            </Box>
            <Box sx={style}> 
              <Button type="submit" variant="contained">Submit</Button>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default ShoeForm