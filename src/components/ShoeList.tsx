import { Shoe } from '../types'
import { Link } from 'react-router-dom'
import { 
  Box, Card, Link as DOMLink, Button,
  Typography, Stack, CardContent 
} from '@mui/material'
import { styled } from '@mui/material/styles';

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const ShoeList = ({shoe}:{shoe: Shoe} ) => {
  console.log(shoe)
  return (
    <Card>
      <CardContent>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={"Image product"} src={shoe.url} />
      </Box>
        <Box >
          <Typography variant="h5">
            {shoe.name}
          </Typography>
        </Box>

        <Box >
          <Typography variant="subtitle1">
            
          </Typography>
          <DOMLink to={`shoe/${shoe.id}`} color="inherit" underline="hover" component={Link}>
              <Button variant="contained">
                View Details
              </Button>
            </DOMLink>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ShoeList