import Shoes from './components/Shoes'
import { useEffect } from 'react';
import { useStateValue } from "./state";
import ShoeServices from './services/shoes'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import FormLink from './components/ShoeForm';

//import Shoes from './components/Shoes'
function App() {
  const [state, dispatch] = useStateValue();
  useEffect(() => {
    const fetchPatientList = async () => {
      try {
        const shoeListFromApi = await ShoeServices.getAll();
        console.log(shoeListFromApi);
        dispatch({ type: "SET_SHOE_LIST", payload: shoeListFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  console.log("STATE:", state)
  return (
    <Router>
        <main>
          <Link to="/"><button>Home</button></Link>
          <Link to="/createShoe"><button>Form</button></Link>

          <Routes>
            <Route path="/" element={<Shoes />} />
            <Route path="/createShoe" element={<FormLink />} />
          </Routes>
        </main>
      </Router>
  );
}

export default App;
