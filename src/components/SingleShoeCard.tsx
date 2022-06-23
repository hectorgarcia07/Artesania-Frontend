import {
  Card, Box, Button, CardContent,
  Typography, Container, 
} from '@mui/material/';
import { Link, PathMatch } from 'react-router-dom';
import { Shoe } from '../types'
import { useStateValue } from '../state';
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useState } from 'react';
import ShoeService from '../services/shoes' 
import { useNavigate } from 'react-router-dom';

/*
<CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />*/

const SingleShoeCard = ({singleShoeData}:{singleShoeData: Shoe}) => {
  console.log("SNGEL SHOE CARD")
  const [state, dispatch] = useStateValue();
  const navigate = useNavigate()
  const [ toggleDeleteBtn, setToggleDeleteBtn ] = useState(false);
  /* if(singleShoeData == null){
    return <></>
  }
 */
  const deleteShoe = async() => {
    const token = JSON.parse(localStorage.getItem("token")!)
    const response = await ShoeService.deleteShoeEntry(singleShoeData.id, token)
    console.log("DELETE ", response)

    if(response.status === 204){
      dispatch({ type: "DELTE_SHOE", payload: singleShoeData.id })
      navigate("/")
    }
  }
  const shoeCardContentStyle = { 
    display: 'flex', 
    justifyContent: 'space-between',
    alignItems: 'center',
  }
  const propertyNameSize = { fontSize: '1.3rem'}
  return(
    <Container maxWidth="sm" sx={{pt: "1.5rem"}}>
      <Card>
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
          <Box sx={{...shoeCardContentStyle, pt: "1.5rem"}} >
            <Typography gutterBottom sx={propertyNameSize} component="p">
              Size
            </Typography>
            <Typography gutterBottom sx={propertyNameSize} component="p">
              Quantity
            </Typography>
          </Box>
          {
            singleShoeData.sizes.map((size: { id: Key | null | undefined; size: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; quantity: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) => (
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
            <Button variant="contained">
              Update Shoe Data
            </Button>
          </Link>
          <Button sx={{color: "red"}} 
            onClick={() => setToggleDeleteBtn(true)}>
            Delete
          </Button>
          { !toggleDeleteBtn ? 
              null :
              <Box sx={{pt: "1.5rem"}}>
                <Button onClick={deleteShoe} sx={{color: "red"}} >
                  Delete permenetly!
                </Button>
                <Button onClick={() => setToggleDeleteBtn(false)}>
                  Dont delete
                </Button>
              </Box>
          }
        </CardContent>
      </Card>
    </Container>
  )
}

export default SingleShoeCard