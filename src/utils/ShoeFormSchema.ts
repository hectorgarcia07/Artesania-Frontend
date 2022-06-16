import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  name: yup.string()
    .required('Name is required'),
  color: yup.string()
    .required('Color is required'),
  price: yup.number()
    .integer("Must enter a number")
    .moreThan(0)
    .required('A price is required'),
  gender: yup.string()
    .required('Select an gender'),
  age: yup.string()
    .required('Select an age'),
  sizes: yup.array().of(
    yup.object().shape({
      size: yup.number()
        .integer("Must enter a number")
        .positive('Size must be greater than 0')
        .required('A size is required'),
      quantity: yup.number()
        .integer("Must enter a number")
        .moreThan(-1, "Cannot be negative")
        .required('A quantity is required')
    })).min(1).test('unique', {unique: 'Needs to be unique'}, function (list) {
      if(list === undefined){
        return false
      }
      return list?.length === new Set(list?.map(s => s.size)).size;
    })
})