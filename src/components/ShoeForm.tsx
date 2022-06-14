/* eslint-disable no-extra-boolean-cast */
import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage,FieldArray } from 'formik';
import { ShoeData, Gender, OnlySizesData, FormError,Age } from '../types'
import * as Yup from 'yup';
import { SetStateAction } from 'react';
import ShoeServices from '../services/shoes'
import { useNavigate } from 'react-router';
import { useStateValue } from "../state";

const ShoeForm = () => {
  const [, dispatch] = useStateValue()
  const navigate = useNavigate()
  const [submitState, setSubmitState] = useState<FormError>({
    error: undefined
  })
  const initialValue:ShoeData = {
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
    })).min(1).test("Unique", "Sizes must be unique", values => {
      const sizesSet = new Set(values?.map(value => value.size))
      return values!.length  === sizesSet.size  })

  })

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

  const onSubmit = async(fields:ShoeData) => {
    const response = await ShoeServices.createShoeEntry(fields)
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
    <>
    {Boolean(submitState.error) ? (<div>SERVER IS DOWN!</div>) : null}
    <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ errors, values, touched, setValues }) => (
        <Form >
          <label htmlFor="name">Name</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" />

          <label htmlFor="color">Color</label>
          <Field name="color" type="text" />
          <ErrorMessage name="color" />

          <label htmlFor="price">Price</label>
          <Field name="price" type="number" />
          <ErrorMessage name="price" />

          <Field name="gender" as="select" className="">
            <option value={Gender.MALE}>Male</option>
            <option value={Gender.FEMALE}>Female</option>
            <option value={Gender.UNISEX}>Unisex</option>
          </Field>
          <ErrorMessage name="gender" />

          <Field name="age" as="select" className="">
            <option value={Age.ADULT}>Adult</option>
            <option value={Age.KID}>Kid</option>
          </Field>
          <ErrorMessage name="age" />

          {errors.sizes && touched.sizes ? (<div>Sizes must be unique</div>) : null}
          <FieldArray name="sizes">
            {() => (values.sizes.map((size, i) => {
              return(
                <div key={i}>
                  <div className="form-group col-6">
                    <label>Size</label>
                    <Field name={`sizes.${i}.size`} type="number" />
                    <ErrorMessage name={`sizes.${i}.size`} component="div" className="invalid-feedback">
                      {() => <div>Size must be greater than 0</div>}
                    </ErrorMessage>
                  </div>
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