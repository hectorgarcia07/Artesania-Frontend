/* eslint-disable no-extra-boolean-cast */
import { Formik, FormikProps } from 'formik';
import { ShoeData, Gender, Age } from '../../../types'
import { InputLabel, FormControl,
  Select, MenuItem, Typography, Container, Box, Button, Input } from '@mui/material';
import { validationSchema } from '../../../utils/ShoeFormSchema'
import CustomInput from './CustomInput'
import CustomFieldArray from './CustomFieldArray'

interface SheFormProp {
  onSubmit: (fields: ShoeData) => Promise<void>,
  initialValue: ShoeData
}

const ShoeForm = ({ onSubmit, initialValue }: SheFormProp) => {
  const style = {
    pb: '1rem'
  }

  return (
    <>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={onSubmit}
      >
        { (props:FormikProps<ShoeData> )=> (
          <Container component='form' onSubmit={props.handleSubmit} maxWidth="sm" sx={{pt: '1.5rem'}}>
            <InputLabel htmlFor="contained-button-file" sx={{mb: '2rem'}}>
              <Input 
                inputProps={{ accept: 'image/jpeg, image/png, image/jpg' }} 
                id="contained-button-file" 
                type="file"
                name="shoe_image"
                onChange={
                  async (event) => {
                    const target = event.target as HTMLInputElement
                    if(target && target.files){
                      console.log("TRUE", target.files[0])
                      await props.setFieldValue("shoe_image", target.files[0])
                    }
                  }
                }
              />
            </InputLabel>
            <CustomInput
              label="Name"
              name="name"
              type="text"
            />
            <CustomInput
              label="Color"
              name="color"
              type="text"
            />
            <CustomInput
              label="Price"
              name="price"
              type="number"
            />
            <FormControl fullWidth sx={style}>
              <InputLabel id="gender_label">Gender</InputLabel>
              <Select
                labelId="gender_label"
                name='gender'
                value={props.values.gender}
                label="Gender"
                onChange={props.handleChange}
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
                value={props.values.age}
                label="Age"
                onChange={props.handleChange}
              >
                <MenuItem value={Age.ADULT}>Adult</MenuItem>
                <MenuItem value={Age.KID}>Kid</MenuItem>
              </Select>
            </FormControl>
            <Typography gutterBottom variant="h5" component="div">
              Sizes:
            </Typography>
            <CustomFieldArray 
              values={props.values}
              name="sizes"
            />
            <Box sx={style}> 
              <Button type="submit" variant="contained" disabled={props.isSubmitting}>
                { props.isSubmitting ? 'Submitting...' : 'Submit' }
              </Button>
            </Box>
          </Container>
        )}
      </Formik>
    </>
  )
}

export default ShoeForm