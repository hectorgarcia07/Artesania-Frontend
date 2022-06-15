import Shoes from './components/Shoes'
import { useEffect } from 'react';
import { useStateValue } from "./state";
import ShoeServices from './services/shoes'
import { useMatch, Route, Link, Routes } from "react-router-dom";
import CreateShoeForm from './components/forms/CreateShoeForm';
import EditShoeForm from './components/forms/EditShoeForm';

//import Shoes from './components/Shoes'
function App() {
  const [state, dispatch] = useStateValue();
  const match = useMatch('/updateShoe/:id')
  const shoeData = match?.params.id ? state.shoes[match?.params.id] : null

  console.log("State", state)
  
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
      <Link to="/"><button>Home</button></Link>
      <Link to="/createShoe"><button>Form</button></Link>

      <Routes>
        <Route path="/*" element={<Shoes />} />
        <Route path="/createShoe" element={<CreateShoeForm />} />
        <Route path="/updateShoe/:id" element={shoeData === null ? <CreateShoeForm /> : <EditShoeForm shoeData={shoeData} /> } />
      </Routes>
    </main>
  );
}

export default App;
