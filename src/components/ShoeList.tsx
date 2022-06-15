import { Shoe } from '../types'
import { Link } from 'react-router-dom'
import { useStateValue } from '../state';

const ShoeList = ({shoe}:{shoe: Shoe} ) => {
  const [state,] = useStateValue();

  return (
    <div>
      <h1>{shoe.name}</h1>
      <p>Color: {shoe.color}</p>
      <p>Price: {shoe.price}</p>
      <p>Gender: {shoe.gender}</p>
      <p>Age: {shoe.age}</p>
      <ul>
        {shoe.sizes.map(size => <li key={size.id}>{size.size} {size.quantity}</li>)}
      </ul>
      <Link to={`/updateShoe/${shoe.id}`}>
        <button>Update</button>
      </Link>
      
    </div>
  )
}

export default ShoeList