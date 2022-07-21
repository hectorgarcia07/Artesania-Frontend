import { Container, Typography,Grid } from '@mui/material';
import { useStateValue } from "../state";
import {Shoe, Token} from '../types'
import ShoeList from '../components/ShoeList'
import { useEffect } from 'react';
import ShoeServices from '../services/shoes'
import { errorAlert, loadingAlert, successAlert } from '../utils/AlertsUtils';
import { GetAllResponse } from '../responseTypes';

const Shoes = () => {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    console.log("Fetcing shoes")
    const fetchShoetList = async (token:Token) => {
      console.log('token', token)
      try {
        loadingAlert({ message: 'Getting inventory from servers. Please wait...', dispatchObj: dispatch })
        const shoeListFromApi:GetAllResponse = await ShoeServices.getAll(token);
        console.log("USE EFFFECT", shoeListFromApi);

        if(shoeListFromApi.statusCode === 401 || shoeListFromApi.statusCode === 500 ){
          errorAlert({ message: shoeListFromApi.message, dispatchObj: dispatch})
          dispatch({ type: 'SIGN_OUT' })
        }
        if(shoeListFromApi.data){
          successAlert({ message: shoeListFromApi.message, dispatchObj: dispatch })
          dispatch({ type: "SET_SHOE_LIST", payload: shoeListFromApi.data });
        }
      } catch (e) {
        dispatch({ type: 'SIGN_OUT' })
        errorAlert({ message: "Could not get your inventory. ", dispatchObj: dispatch})
      }
    }

    if(state.token)
      fetchShoetList(state.token)
    else
      dispatch({ type: 'SIGN_OUT' })
  }, [])

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