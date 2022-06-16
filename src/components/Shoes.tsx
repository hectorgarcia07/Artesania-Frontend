import { Container, Stack, Typography,Grid } from '@mui/material';
import { useStateValue } from "../state";
import {Shoe} from '../types'
import ShoeList from './ShoeList'

const Shoes = () => {
  const [state, dispatch] = useStateValue();
  console.log("STATE", state)
  return (
    <Container>
      <Typography variant="h4" sx={{ m: 1 }}>
        Shoes
      </Typography>
      <Grid container spacing={3} >
        { 
          Object
            .values(state.shoes)
            .map((shoe:Shoe) => 
              <Grid key={shoe.id} item xs={12} sm={6} md={3}>
                <ShoeList shoe={shoe} />
              </Grid>
            )
        }
      </Grid>
    </Container>
  )
}

export default Shoes;