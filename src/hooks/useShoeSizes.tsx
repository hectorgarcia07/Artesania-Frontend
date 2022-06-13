import { useState } from 'react'
import { OnlySizesData } from '../types'

const useShoeSizes = () => {
  const initialSizeState:OnlySizesData[] = [{
    size: 0,
    quantity: 0
  }]
  
  const [sizes, setSizes] = useState<OnlySizesData[]>(initialSizeState)

  //will handle updating individual shoe size
  const handleShoeSizeChange = (index:number, event:React.ChangeEvent<HTMLInputElement>) => {
    //make copy of new state
    const currState = [...sizes]
    currState[index][event.target.name] = event.target.value
    console.log(currState[index][event.target.name], index)
    setSizes(currState)
  }

  //will add a new shoe size entry to the state
  const addNewShoeSize = () => {
    const newState:OnlySizesData[] = [...sizes, {size: 0, quantity:0}];
    setSizes(newState)
  }

  const removeSize = (index:number) => {
    const data = [...sizes]
    data.splice(index, 1)
    setSizes(data)
  }

  return {
    sizes, handleShoeSizeChange, addNewShoeSize, removeSize
  }
}

export default useShoeSizes