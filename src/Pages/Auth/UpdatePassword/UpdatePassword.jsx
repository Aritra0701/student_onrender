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
import { removeToken, updatePasswordApi } from '../../../Toolkit/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';



const defaultTheme = createTheme();

export default function UpdatePassword() {
  const navigate=useNavigate()
    const data=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
    const user_id=localStorage.getItem("user_id")
    const {
        register,
        handleSubmit,
        
        formState: { errors },
      } = useForm()
    
      const onSubmit = (data) =>{
        const value={
            "user_id":user_id,
            "password":data.password
        }
        dispatch(updatePasswordApi(value)).then(()=>dispatch(removeToken()))
       
      }
      useEffect(()=>{
        const fetch=()=>{
          const password=localStorage.getItem("password")
          const path=window.location.pathname==="/update-password"
          if (password) {
            return path &&  navigate("/")
            
          }
        }
        fetch()
      },[navigate,data.isRedirectToo])

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
          UpdatePassword
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            
            <TextField
            {...register("password",{required:true})}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={errors.password}
              helperText={errors.password && "password is required"}
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
              Loading...
            </Button>

            </>)}
            
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
  );
}