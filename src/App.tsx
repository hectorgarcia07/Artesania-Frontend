import Shoes from './components/Shoes'
import { useEffect } from 'react';
import { useStateValue } from "./state";
import ShoeServices from './services/shoes'
import { useMatch, Route, Link, Routes, Navigate, PathMatch, useNavigate } from "react-router-dom";
import SignIn from './components/forms/signin/SignIn'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoutes'
import CreateShoeForm from './components/forms/shoeForms/CreateShoeForm'
import SingleShoeCard from './components/SingleShoeCard'
import EditShoeForm from './components/forms/shoeForms/EditShoeForm'
import NavBar from './components/Navbar'

function App() {
  const getShoeFromID = (id:PathMatch<"id"> | null) => {
    if(id == null || id.params == null || id.params.id == null ){
      return null
    }else{
      return state.shoes[id.params.id]
    }
  }
  const [state, dispatch] = useStateValue();
  const updateMatch = useMatch('/updateShoe/:id')
  const viewShoe = useMatch('/shoe/:id')
  const shoeData = getShoeFromID(updateMatch)
  const singleShoeData = getShoeFromID(viewShoe)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPatientList = async () => {
      try {
        const shoeListFromApi = await ShoeServices.getAll();
        console.log("USE EFFFECT", shoeListFromApi);
        dispatch({ type: "SET_SHOE_LIST", payload: shoeListFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList(); 
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Shoes />} />
        <Route path="/signin"  element={ localStorage.getItem('token') ? <Navigate replace to="/" /> : <SignIn /> } />
        <Route path="/" element={<ProtectedRoute />} >
          <Route path="createShoe" element={<CreateShoeForm />} />
          <Route path="shoe/:id" element={ 
            singleShoeData ?
            <SingleShoeCard singleShoeData={singleShoeData} /> :
            null
          } />
          <Route path="updateShoe/:id" element={
            shoeData ?
            <EditShoeForm shoeData={shoeData} /> :
            null
          }
          />
        </Route>
        <Route path="/not-found" element={<NotFound /> } />
        <Route path="*" element={<p>{"There's nothing here: 404!"}</p>} />
      </Routes>
    </>
  );
}

export default App;