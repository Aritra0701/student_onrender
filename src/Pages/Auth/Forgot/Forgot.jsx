import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux';
import { forgotApi } from '../../../Toolkit/authSlice';



const defaultTheme = createTheme();

export default function SignIn() {
    const dispatch=useDispatch()
    const data=useSelector((state)=>state.auth)
    const {
        register,
        handleSubmit,
        
        formState: { errors },
      } = useForm()
    
      const onSubmit = (data) =>{
        const value={
            "email":data.email,
            "first_school":data.first_school,
            "newPassword":data.newPassword
        }
        dispatch(forgotApi(value))
      }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
            {...register("email",{required:true})}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={errors.email}
              helperText={errors.email && "email is required"}
            />
            <TextField
            {...register("newPassword",{required:true})}
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="newPassword"
              type="password"
              id="newPassword"
              error={errors.newPassword}
              helperText={errors.newPassword && "newPassword is required"}
              
            />
             <TextField
             {...register("first_school",{required:true})}
              margin="normal"
              required
              fullWidth
              name="first_school"
              label="first_school"
              
              id="first_school"
              error={errors.first_school}
              helperText={errors.first_school && "first_school is required"}
              
            />
           
            {data.status==="idle"?(<>
                <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            </>):(<>
                <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Loading....
            </Button>
            </>)}
           
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}