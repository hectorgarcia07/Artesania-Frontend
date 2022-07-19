import { Container, Stack, Typography,Grid } from '@mui/material';
import { useStateValue } from "../state";
import {Shoe} from '../types'
import ShoeList from '../components/ShoeList'
import { useEffect } from 'react';
import ShoeServices from '../services/shoes'
import { isTokenValid } from '../utils/isTokenValid';
import { useNavigate } from 'react-router-dom';
import { errorAlert } from '../utils/AlertsUtils';

const Shoes = () => {
  const [state, dispatch] = useStateValue();
  const navigate = useNavigate()

  useEffect(() => {
    console.log("Fetcing shoes")
    const fetchShoetList = async (token:string) => {
      try {
        const shoeListFromApi = await ShoeServices.getAll(token);
        console.log("USE EFFFECT", shoeListFromApi);
        dispatch({ type: "SET_SHOE_LIST", payload: shoeListFromApi });
      } catch (e) {
        console.error(e);
      }
    }

    const result = isTokenValid()
    if(!result.valid || !state.token){
      errorAlert({
        message: result.message,
        dispatchObj: dispatch
      })
      navigate('/signin', { replace: true })
    }
    else if(Object.values(state.shoes).length === 0){
      console.log('in if ese')
      fetchShoetList(state.token); 
    }
  }, [dispatch, navigate])

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