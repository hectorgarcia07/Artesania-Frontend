import useForm from '../hooks/useForm'
import useShoeSizes from '../hooks/useShoeSizes'
import { OnlyShoeData, Gender } from '../types'

const ShoeForm = () => {
  const initialState:OnlyShoeData = {
    name: "",
    color: "",
    price: 0,
    gender: Gender.MALE,
  }

  const submitData = async (event:React.FormEvent<HTMLFormElement>) => {
    onSubmit(event, sizes)
    return 
  }

  const {
    shoeValues, onChange, onSubmit
  } = useForm(submitData, initialState)

  const {
    sizes, handleShoeSizeChange, addNewShoeSize, removeSize
  } = useShoeSizes()

  return (
    <form onSubmit={submitData}>
      <div>
        <label>
          Name:
          <input
            name='name'
            type='text'
            value={shoeValues.name}
            placeholder='name'
            onChange={onChange}
            required
          />
        </label>
        <label>
          Color:
          <input
            name='color'
            id='color'
            type='text'
            placeholder='Color'
            value={shoeValues.color}
            onChange={onChange}
            required
          />
        </label>
        <label>
          Price:
          $<input
            name='price'
            id='price'
            type='number'
            value={shoeValues.price}
            placeholder='Price'
            onChange={onChange}
            required
          />
        </label>
        <h3>Gender</h3>
        <label>
          <input 
            name="gender" 
            type="radio" 
            value={Gender.MALE} 
            onChange={onChange} 
            checked={shoeValues.gender === Gender.MALE} />
          Male
        </label>
        <label>
          <input 
            name="gender" 
            type="radio" 
            value={Gender.FEMALE} 
            onChange={onChange} 
            checked={shoeValues.gender === Gender.FEMALE}/>
          Female
        </label>
        <label>
          <input 
            name="gender" 
            type="radio" 
            value={Gender.UNISEX} 
            onChange={onChange} 
            checked={shoeValues.gender === Gender.UNISEX}/>
          Unixex
        </label>
        <div>
          Sizes:
          {sizes.map( (size, index) => (
            <div key={index}>
              <input 
                type="number" 
                value={size.size} 
                name="size" 
                onChange={(e) => handleShoeSizeChange(index,e)}
                required
              />
              <input 
                type="number" 
                value={size.quantity} 
                name="quantity" 
                onChange={(e) => handleShoeSizeChange(index,e)}
                required
              />
              <button onClick={() => removeSize(index)}>Remove</button>
            </div>
          ))}
          <button onClick={addNewShoeSize}>Add new size</button>
        </div>
        <button type='submit'>Submit</button>
      </div>
    </form>
  )
}

export default ShoeForm