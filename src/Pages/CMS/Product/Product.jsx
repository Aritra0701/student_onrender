import { Container, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteApi, productApi } from '../../../Toolkit/productSlice'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2'
import { Link} from 'react-router-dom';

const Product = () => {
  
  const dispatch=useDispatch()
  const data=useSelector((state)=>state.product)
  // console.log(data.pdata);
  useEffect(()=>{
    dispatch(productApi())
  },[])
  const isConfirmed=(id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id)
        
      }
    });
  }
  const handleDelete=(id)=>{
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
    dispatch(deleteApi(id)).then(()=>dispatch(productApi()))

  }
  return (
    <Container>
      <Grid container>
        {data.pdata?.map((item)=>(
          <Grid item lg={4}>
            <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={item.image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={(()=>isConfirmed(item._id))}>Delete</Button>
        <Button size="small" component={Link} to={`/Product/${item._id}`}>Edit</Button>
      </CardActions>
    </Card>

          </Grid>
        ))}

      </Grid>
    </Container>
  )
}

export default Product
