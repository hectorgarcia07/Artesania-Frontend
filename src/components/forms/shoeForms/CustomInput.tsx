import TextField from '@mui/material/TextField';
import { FieldHookConfig, useField } from 'formik';

interface myTextProps {
  label: string;
  name: string;
  type: string;
}

type MyCustomInputProps = myTextProps & FieldHookConfig<string>

const CustomInput = (props:MyCustomInputProps ) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  const style = {
    pb: '1rem'
  }

  return (
    <TextField
      fullWidth
      sx={style}
      { ...field }
      error={ !!errorText }
      label={ props.label }
      name={ props.name }
      type={ props.type }
      helperText={errorText}
    />
  )
}

export default CustomInput