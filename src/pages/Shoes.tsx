import { Container, Typography,Grid } from '@mui/material';
import { useStateValue } from "../state";
import { Shoe } from '../types'
import ShoeList from '../components/ShoeList'

const Shoes = () => {
  const [state, dispatch] = useStateValue();

  console.log("STATE", state)
  return (
    <Container>
      <Typography variant="h4" sx={{ m: 1 }}>
        Shoes
      </Typography>
      <Grid container sx={{justifyContent: 'center'}} spacing={8} >
        { 
          Object
            .values(state.shoes)
            .map((shoe:Shoe) => 
              <Grid key={shoe.id} item xs={10} sm={6} md={4}>
                <ShoeList shoe={shoe} />
              </Grid>
            )
        }
      </Grid>
    </Container>
  )
}

export default Shoes;