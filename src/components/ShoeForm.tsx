import { Formik, Field, Form, ErrorMessage,FieldArray } from 'formik';
import { ShoeData, Gender, OnlySizesData } from '../types'
import * as Yup from 'yup';

const ShoeForm = () => {
  const initialValue:ShoeData = {
    name: "",
    color: "",
    price: 0,
    gender: Gender.MALE,
    sizes: [{
      size: 0,
      quantity: 0
    }]
  }

  Yup.addMethod(Yup.array, 'unique', function(message) {
    return this.test('unique', message, function(list) {
      const sizesSet = new Set(list?.map(value => value.size))
      return list!.length  === sizesSet.size;
    });
});
  
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    color: Yup.string()
      .required('Color is required'),
    price: Yup.number().moreThan(0)
      .required('A price is required'),
    gender: Yup.string()
      .required('Selected a gender'),
    sizes: Yup.array().of(
      Yup.object().shape({
        size: Yup.number().moreThan(0)
          .required('A size is required'),
        quantity: Yup.number()
          .required('A quantity is required')
    })).unique('Cannot have duplicate size')
  })

  //creates a new obj to represent a size
  const createNewSize = (values:ShoeData, setValues:any) => {
    const newSizeArr:OnlySizesData[] = [...values.sizes]
    newSizeArr.push({size: 0, quantity: 0})
    setValues({...values, sizes: newSizeArr})
  }

  //remvoes an size from the array
  const removeSize = (index:number, values:ShoeData, setValues:any) => {
    const newSizeArr:OnlySizesData[] = [...values.sizes]
    newSizeArr.splice(index, 1)
    setValues({...values, sizes: newSizeArr})
  }

  const onSubmit = (fields:ShoeData) => {
    console.log(fields)
  }

  return (
    <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ errors, values, touched, setValues }) => (
        
        <Form>
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

          <FieldArray name="sizes">
            {() => (values.sizes.map((size, i) => {
              const ticketErrors = errors.sizes?.length && errors.sizes[i] || {};
              const ticketTouched = touched.sizes?.length && touched.sizes[i] || {};

              return(
                <div key={i}>
                  <div className="form-group col-6">
                    <label>Size</label>
                    <Field name={`sizes.${i}.size`} type="number" />
                    <ErrorMessage name={`sizes.${i}.size`} component="div" className="invalid-feedback">
                      {msg => <div>Size must be greater than 0</div>}
                    </ErrorMessage>
                  </div>
                  <div className="form-group col-6">
                    <label>Quantity</label>
                    <Field name={`sizes.${i}.quantity`} type="number" />
                    <ErrorMessage name={`sizes.${i}.quantity`} component="div" className="invalid-feedback" />
                  </div>
                  <button onClick={() => removeSize(i, values, setValues)}>Remove</button>
                </div>
              )
              }))}
          </FieldArray>
          <button onClick={() => createNewSize(values, setValues)}>Add new size</button>
          <button>Submit</button>
        </Form>
      )}
    </Formik>
  )
}

export default ShoeForm