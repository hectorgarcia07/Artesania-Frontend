import { Shoe } from '../types'

const ShoeList = ({shoe}:{shoe: Shoe} ) => {
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
    </div>
  )
}

export default ShoeList