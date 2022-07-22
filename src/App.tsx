import { useEffect } from 'react';
import { useMatch, Route, Routes, PathMatch } from "react-router-dom";
import { useStateValue } from "./state";
import { Token } from './types';
import { SignIn, CreateShoeForm, EditShoeForm } from './components/forms'
import { ProtectedRoute, Navbar, Alert } from './components'
import { Shoes, NotFound, SingleShoeCard } from './pages'
import { loadingAlert, errorAlert, successAlert } from './utils/AlertsUtils'
import ShoeServices from './services/shoes'

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

  useEffect(() => {
    console.log("Fetcing shoes")
    const fetchShoetList = async (token:Token) => {
      console.log('token', token)
      try {
        loadingAlert({ message: 'Getting inventory from servers. Please wait...', dispatchObj: dispatch })
        const shoeListFromApi = await ShoeServices.getAll(token);
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
  }, [state.token])
  
  return (
    <>
      <Navbar />
      { state.alert.isActive && <Alert {...state.alert} /> }
      <Routes>
        <Route path="/signin" element={ <SignIn /> } />
        <Route element={<ProtectedRoute />} >
          <Route path="/" element={ <Shoes /> } />
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
          }/>
        </Route>
        <Route path="/not-found" element={<NotFound /> } />
        <Route path="*" element={<p>{"There's nothing here: 404!"}</p>} />
      </Routes>
    </>
  );
}

export default App;