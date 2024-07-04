import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registration } from "../../../Toolkit/authSlice";
import { useState } from "react";

const defaultTheme = createTheme();

export default function Registration() {
  const dispatch = useDispatch();
  const [picture, setPicture] = useState("");
  const data = useSelector((state) => state.auth);
  console.log(data.status);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    formData.append("password", data.password);
    formData.append("first_school", data.first_school);
    formData.append("image", data.image[0]);
    dispatch(registration(formData));
  };

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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("name", { required: true })}
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="name"
                  autoFocus
                  error={errors.name}
                  helperText={errors.name && "name is required"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("mobile", { required: true })}
                  required
                  fullWidth
                  id="mobile"
                  label="mobile"
                  name="mobile"
                  error={errors.mobile}
                  helperText={errors.mobile && "mobile is required"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("email", { required: true })}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={errors.email}
                  helperText={errors.email && "email is required"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("password", { required: true })}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={errors.password}
                  helperText={errors.password && "password is required"}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  {...register("first_school", { required: true })}
                  required
                  fullWidth
                  id="first_school"
                  label="first_school"
                  name="first_school"
                  error={errors.first_school}
                  helperText={errors.first_school && "first_school is required"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("image", { required: true })}
                  required
                  fullWidth
                  name="image"
                  type="file"
                  id="image"
                  onChange={(e) => setPicture(e.target.files[0])}
                  error={errors.image}
                  helperText={!picture && errors.image && "image is required"}
                />
                {picture !== "" && picture !== null && picture !== undefined ? (
                  <>
                    <img
                      src={URL.createObjectURL(picture)}
                      alt="hello world"
                      height={"200px"}
                    />
                  </>
                ) : (
                  <>{picture === "" && <p>drag and drop image here</p>}</>
                )}
              </Grid>
            </Grid>
            {data.status === "idle" ? (
              <>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Loading...
                </Button>
              </>
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" to={"/"}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
