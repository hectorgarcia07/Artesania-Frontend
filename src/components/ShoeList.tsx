import { Shoe } from '../types'
import { Link } from 'react-router-dom'
import { 
  Box, Card, Link as DOMLink, Button,
  Typography, Stack, CardContent 
} from '@mui/material'
import { styled } from '@mui/material/styles';

/* const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
}); */

const ShoeList = ({shoe}:{shoe: Shoe} ) => {
  return (
    <Card>
      <CardContent>
        <Box >
          <Typography variant="h5">
            {shoe.name}
          </Typography>
        </Box>

        <Box >
          <Typography variant="subtitle1">
            
          </Typography>
          <Link to={`/updateShoe/${shoe.id}`}>
            <DOMLink to={`shoe/${shoe.id}`} color="inherit" underline="hover" component={Link}>
              <Button variant="contained" href="#contained-buttons">
                View Details
              </Button>
            </DOMLink>
          </Link>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ShoeList