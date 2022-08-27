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

  return (
    <TextField 
      { ...field }
      error={ !!errorText }
      label={ props.label }
      name={ props.name }
      type={ props.type }
    />
  )
}

export default CustomInput