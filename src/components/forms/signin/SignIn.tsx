import { useFormik } from 'formik';
import {validationSchema, initialState} from '../../../utils/SignInSchema'
import {Button, CssBaseline, TextField, Box, Typography, Container } from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import auth from '../../../services/auth';
import { useNotification } from '../../../hooks/useNotification'
import { useLocation, useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function SignIn() {
  console.log("IN SING IN PAGE ")

  const { status, setStatus } = useNotification()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async (values:{username: string, password: string}) => {
    const response = await auth.signin(values);
    console.log("RESPONSE ", response)
    if(response && response.data.success){
      setStatus({ isActive: true, message: 'Logging in!', severityType: "success" })
      localStorage.setItem('token', JSON.stringify(response.data.token))
      localStorage.setItem('user', JSON.stringify(response.data.user))
      const state = location.state as { from: Location }
      console.log(response.data)

      if(state && state.from ){
        console.log('from ', state)
        navigate(state.from)
      }else{
        navigate('/');
      }
    }
    else if(response && !response.data.success){
      setStatus({ isActive: true, message: 'Invalid username or password', severityType: "warning" }) 
    }
    else{
      setStatus({ isActive: true, message: 'Something went seriously wrong. Hmmm', severityType: "warning" }) 
    }
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  });

  return (
    <ThemeProvider theme={theme}>
      
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={formik.handleSubmit} >
            <TextField
              sx={{ mt: 1 }}
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}