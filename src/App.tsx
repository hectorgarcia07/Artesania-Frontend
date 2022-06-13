import { Shoe } from './types';
import Shoes from './components/Shoes'
import { useEffect } from 'react';
import { useStateValue } from "./state";
import ShoeServices from './services/shoes'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

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
          <Link to="/">
          <button></button>
          </Link>

          <Routes>
            <Route path="/" element={<Shoes />} />
          </Routes>
        </main>
      </Router>
  );
}

export default App;
