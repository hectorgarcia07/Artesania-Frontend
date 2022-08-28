import {
  Card, Box, Button, CardContent,
  Typography, Container, CardMedia, 
} from '@mui/material/';
import { Link } from 'react-router-dom';
import { Shoe } from '../types'
import { useStateValue } from '../state';
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal } from 'react';
import ShoeService from '../services/shoes' 
import { useNavigate } from 'react-router-dom';
import ConfirmationBtn from '../components/ConfirmDeleteModal'
import { successAlert, errorAlert } from '../utils/AlertsUtils'

const SingleShoeCard = ({singleShoeData}:{singleShoeData: Shoe}) => {
  console.log("SNGEL SHOE CARD")
  const [state, dispatch] = useStateValue();
  const navigate = useNavigate()
  
  const deleteShoe = async() => {
    const token = state.token
    if(!token){
      errorAlert({
        message: 'Session expired, please log in',
        dispatchObj: dispatch
      })
      navigate('/signin', {replace: true, state: { from: location }} )
    }
    else{
      const resultObj = await ShoeService.deleteShoeEntry(singleShoeData.id, token)
      console.log("DELETE ", resultObj)

      if(resultObj.statusCode === 204){
        successAlert({
          message: resultObj.message,
          dispatchObj: dispatch
        })
        dispatch({ type: "DELTE_SHOE", payload: singleShoeData.id })
        navigate("/")
      }
      else{
        errorAlert({
          message: resultObj.message,
          dispatchObj: dispatch
        })
        dispatch({ type: 'SIGN_OUT' })
        navigate('/signin', {replace: true, state: { from: location }} )
      }
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
          <CardMedia
            component="img"
            alt="Product image"
            sx={{maxWidth: "100%"}}
            src={singleShoeData.url}
          />
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
            <Button variant="contained" sx={{mb: "1rem"}}>
              Update Shoe Data
            </Button>
          </Link>
          <ConfirmationBtn 
            onClickMethod={ () => deleteShoe() } 
            description={"Delete shoe information and size"} 
          />
        </CardContent>
      </Card>
    </Container>
  )
}

export default SingleShoeCard