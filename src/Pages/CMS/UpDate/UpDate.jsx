import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { singleApi, updateApi } from "../../../Toolkit/productSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { product_pic } from "../../../Helper";

const defaultTheme = createTheme();

export default function UpDate() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product);
  console.log(data.sdata);
  const [image, setImage] = useState();
  useEffect(() => {
    dispatch(singleApi(id));
  }, [dispatch]);
  useEffect(() => {
    if (data.sdata) {
      setValue("name", data.sdata.name);
      setValue("price", data.sdata.price);
      setValue("description", data.sdata.description);
      setValue("brand", data.sdata.brand);
    //   setValue("image", data.sdata.image);
    }
  },[data.sdata]);
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("brand", data.brand);
    formData.append("image", data.image[0]);
    dispatch(updateApi({ payload: formData, id }));
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
            Update Product
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
                  autoFocus
                  error={errors.name}
                  helperText={errors.name && "name is required"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("price", { required: true })}
                  required
                  fullWidth
                  id="price"
                  name="price"
                  error={errors.price}
                  helperText={errors.price && "price is required"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("description", { required: true })}
                  required
                  fullWidth
                  id="description"
                  name="description"
                  error={errors.description}
                  helperText={errors.description && "description is required"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("brand", { required: true })}
                  required
                  fullWidth
                  name="brand"
                  id="brand"
                  error={errors.brand}
                  helperText={errors.brand && "brand is required"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("image", { required: true })}
                  required
                  fullWidth
                  name="image"
                  id="image"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  error={errors.image}
                  helperText={!image && errors.image && "image is required"}
                />
                {image !== "" && image !== null && image !== undefined ? (
                  <>
                    <img
                      src={URL.createObjectURL(image)}
                      alt="hello world"
                      height={"200px"}
                    />
                  </>
                ) : (
                  <>
                    {data.sdata?.image === "" ? (
                      <>
                        <img
                          //    src=""
                          alt=""
                        />
                      </>
                    ) : (
                      <>
                        <img
                          src={data.sdata?.image}
                          alt="hello world"
                          height={"200px"}
                        />
                      </>
                    )}
                  </>
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
                  Submit
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
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
