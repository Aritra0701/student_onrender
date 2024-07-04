import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { homeApi, redirect } from "../../../Toolkit/authSlice";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";

const Home = () => {
  const data = useSelector((state) => state.auth);
  console.log(data.home);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(homeApi());
  }, [dispatch]);
  useEffect(()=>{
    dispatch(redirect(null))
  },[dispatch,data.isRedirectToo])
  return (
    <Container>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        {data.home?.map((item) => (
          <Grid item sx={{alignItems:"center"}}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://images.pexels.com/photos/18023783/pexels-photo-18023783/free-photo-of-close-up-of-bouquets.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.email}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
