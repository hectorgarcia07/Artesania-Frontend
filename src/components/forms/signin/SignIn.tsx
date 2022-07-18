import { useFormik } from 'formik';
import {validationSchema, initialState} from '../../../utils/SignInSchema'
import {Button, CssBaseline, TextField, Box, Typography, Container } from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import auth from '../../../services/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateAlert, loadingAlert } from '../../../utils/AlertsUtils';
import { useStateValue } from '../../../state';
import { SignInResponse } from '../../../utils/signInTypeCheck';

const theme = createTheme();

export default function SignIn() {
  console.log("IN SING IN PAGE ")

  const [state, dispatch] = useStateValue();
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async (values:{username: string, password: string}) => {
    loadingAlert({
      alertProps: {
      isLoading: true,
      severityType: 'info',
      message: 'Sigining in. Please wait...',
      isActive: true
      },
      dispatchObj: dispatch
    })

    const response:SignInResponse = await auth.signin(values);
    console.log("RESPONSE ", response)
    if(response && response.success && response.token && response.user){
      updateAlert(
        {
          alertProps: {
          isLoading: false,
          severityType: 'success',
          message: 'Signed in successfully!',
          isActive: true
          },
          dispatchObj: dispatch
      })
      
      localStorage.setItem('token', JSON.stringify(response.token))
      localStorage.setItem('user', JSON.stringify(response.user))
      const state = location.state as { from: Location }
      
      dispatch({ type: 'SIGN_IN', paloyad: { token: response.token, user: response.user }})

      if(state && state.from ){
        console.log('from ', state)
        navigate(state.from)
      }else{
        navigate('/');
      }
    }
    else if(response && !response.success){
      updateAlert({
        alertProps:{
          isLoading: false,
          severityType: 'error',
          message: 'Invalid username or password',
          isActive: true
        },
        dispatchObj: dispatch
      })
    }
    else{
      updateAlert({
        alertProps:{
          isLoading: false,
          severityType: 'error',
          message: 'Something went seriously wrong. Hmm...',
          isActive: true
        },
        dispatchObj: dispatch
      })
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
              disabled={state.alert.isLoading}
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