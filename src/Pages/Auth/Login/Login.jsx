import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { LoginApi, redirect } from "../../../Toolkit/authSlice";
import { useEffect } from "react";


const defaultTheme = createTheme();

export default function Login() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const data=useSelector((state)=>state.auth)
    const {
        register,
        handleSubmit,
       
        formState: { errors },
      } = useForm()

     useEffect(()=>{
      const fetch=async()=>{
        const token=localStorage.getItem("token")
         const hello=window.location.pathname==="/"
         if (token) {
          return hello && navigate("/Home")
          
         }
      }
      fetch()

     },[navigate,data.isRedirectToo])
     useEffect(()=>{
      dispatch(redirect(null))
     },[dispatch,data.isRedirectToo])
    
      const onSubmit = (data) =>{
        const value={
          "email":data.email,
          "password":data.password
        }
        dispatch(LoginApi(value))
      }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
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
              Sign In
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
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" to={"/forgot"}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" to={"/registration"}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
