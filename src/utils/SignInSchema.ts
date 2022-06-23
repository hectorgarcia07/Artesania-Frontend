import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  username: yup.string()
    .required('Username is required'),
  password: yup.string()
    .required('Password is required')
})

export const initialState = {
  username: '',
  password: ''
}