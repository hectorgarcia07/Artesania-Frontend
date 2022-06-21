import * as React from 'react';
import { Formik, Form, useFormik } from 'formik';
import {validationSchema, initialState} from '../../../utils/SignInSchema'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signin } from '../../../services/auth'

const theme = createTheme();

export default function SignIn() {
  const handleSubmit = async (values:{username: string, password: string}) => {
    const response = await signin(values);
    console.log(values);
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
            marginTop: 8,
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