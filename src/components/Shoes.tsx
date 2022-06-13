import { useStateValue } from "../state";
import {Shoe} from '../types'
import ShoeList from './ShoeList'

const Shoes = () => {
  const [state, dispatch] = useStateValue();
  return (
    <>
      { Object.values(state.shoes).map((shoe:Shoe) => <ShoeList key={shoe.id}shoe={shoe} />)}
    </>
  )
}

export default Shoes;