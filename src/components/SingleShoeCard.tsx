import {
  Card, CardActions, Box, Button, CardContent,
  Typography, Container, Divider
} from '@mui/material/';
import { Link } from 'react-router-dom';
import { Shoe } from '../types'
import { useStateValue } from '../state';
import { useState } from 'react';
import ShoeService from '../services/shoes' 
/*
<CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />*/

const SingleShoeCard = ({singleShoeData}:{singleShoeData:Shoe }) => {
  const [state, dispatch] = useStateValue();

  const [ toggleDeleteBtn, setToggleDeleteBtn ] = useState(false);

  const deleteShoe = async() => {
    const response = await ShoeService.deleteShoeEntry(singleShoeData.id)
    console.log("DELETE ", response)

    if(response.status === 204){
      dispatch({ type: "DELTE_SHOE", payload: singleShoeData.id })
    }
  }
  const shoeCardContentStyle = { 
    display: 'flex', 
    justifyContent: 'space-between',
    alignItems: 'center',
  }
  const propertyNameSize = { fontSize: '1.3rem'}
  return(
    <Container>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Box>
            <Typography gutterBottom variant="h5" component="div">
              {singleShoeData.name}
            </Typography>
          </Box>
          <Box sx={shoeCardContentStyle}>
            <Typography gutterBottom sx={propertyNameSize} component="p">
              Color
            </Typography>
            <Typography gutterBottom variant="body1" component="p">
              {singleShoeData.color}
            </Typography>
          </Box>
          <Box sx={shoeCardContentStyle}>
            <Typography gutterBottom sx={propertyNameSize} component="p">
              Gender
            </Typography>
            <Typography gutterBottom variant="body1" component="p">
              {singleShoeData.gender}
            </Typography>
          </Box>
          <Box sx={shoeCardContentStyle}>
            <Typography gutterBottom sx={propertyNameSize} component="p">
              Age
            </Typography>
            <Typography gutterBottom variant="body1" component="p">
              {singleShoeData.age}
            </Typography>
          </Box>
          <Box sx={shoeCardContentStyle}>
            <Typography gutterBottom sx={propertyNameSize} component="p">
              Price
            </Typography>
            <Typography gutterBottom variant="body1" component="p">
              ${singleShoeData.price}
            </Typography>
          </Box>
          <Box sx={shoeCardContentStyle}>
            <Typography gutterBottom sx={propertyNameSize} component="p">
              Size
            </Typography>
          </Box>
          {
            singleShoeData.sizes.map(size => (
              <Box key={size.id} sx={shoeCardContentStyle}>
                <Typography gutterBottom sx={{...propertyNameSize, paddingLeft: '0.5rem'}} component="p">
                  {size.size}
                </Typography>
                <Typography gutterBottom variant="body1" component="p">
                  {size.quantity}
                </Typography>
              </Box>
            ))
          }
          <Link to={`/updateShoe/${singleShoeData.id}`}>
            <Button variant="contained" href="#contained-buttons">
              Update Shoe Data
            </Button>
          </Link>
          <Button sx={{color: "red"}} 
            onClick={() => setToggleDeleteBtn(true)}>
            Delete
          </Button>
          { !toggleDeleteBtn ? 
              null : 
              <>
                <Button onClick={deleteShoe} sx={{color: "red"}} >
                  Delete permenetly!
                </Button>
                <Button onClick={() => setToggleDeleteBtn(false)}>
                  Dont delete
                </Button>
              </>
          }
        </CardContent>
      </Card>
    </Container>
  )
}

export default SingleShoeCard