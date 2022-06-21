import Shoes from './components/Shoes'
import { useEffect } from 'react';
import { useStateValue } from "./state";
import ShoeServices from './services/shoes'
import { useMatch, Route, Link, Routes } from "react-router-dom";
import CreateShoeForm from './components/forms/shoeForms/CreateShoeForm';
import EditShoeForm from './components/forms/shoeForms/EditShoeForm';
import SingleShoeCard from './components/SingleShoeCard'
import SignIn from './components/forms/signin/SignIn'
import { Box } from '@mui/material';

function App() {
  const [state, dispatch] = useStateValue();
  const updateMatch = useMatch('/updateShoe/:id')
  const shoeData = updateMatch?.params.id ? state.shoes[updateMatch?.params.id] : null

  const viewShoe = useMatch('/shoe/:id')
  const singleShoeData = viewShoe?.params.id ? state.shoes[viewShoe?.params.id] : null
  
  useEffect(() => {
    const fetchPatientList = async () => {
      try {
        const shoeListFromApi = await ShoeServices.getAll();
        console.log("ShoeListAPI", shoeListFromApi);
        dispatch({ type: "SET_SHOE_LIST", payload: shoeListFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  return (
    <main>
      <Box sx={{mb: '1rem'}}>
        <Link to="/"><button>Home</button></Link>
        <Link to="/createShoe"><button>Form</button></Link>
        <Link to="/signin"><button>Sign in</button></Link>
      </Box>

      <Routes>
        <Route path="/*" element={<Shoes />} />
        <Route path="/shoe/:id" element={singleShoeData === null ? <Shoes /> : <SingleShoeCard singleShoeData={singleShoeData} />} />
        <Route path="/createShoe" element={<CreateShoeForm />} />
        <Route path="/updateShoe/:id" element={shoeData === null ? <CreateShoeForm /> : <EditShoeForm shoeData={shoeData} /> } />
        <Route path="/signin"  element={<SignIn />} />
      </Routes>
    </main>
  );
}

export default App;
