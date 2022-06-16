import { State } from "./state";
import { Shoe } from "../types";
import { ObjectSchema } from "yup";

export type Action =
  | {
      type: "SET_SHOE_LIST";
      payload: Shoe[];
    }
  | {
      type: "ADD_SHOE";
      payload: Shoe;
    }
  | {
    type: 'UPDATE_SHOE',
    payload: Shoe;
    }
  | {
    type: 'DELTE_SHOE',
    payload: string;
   }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_SHOE_LIST":
      console.log('state', state);
      return {
        shoes: {
          ...action.payload.reduce(
            (memo, shoe) => ({ ...memo, [shoe.id]: shoe }),
            {}
          ),
        }
      };
    case "ADD_SHOE":
      return {
        shoes: {
          ...state.shoes,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_SHOE":
      return {
        shoes:{
          ...state.shoes,
          [action.payload.id]: action.payload
        }
      }
    case "DELTE_SHOE":
      console.log("DEL SHOE")
      return {
        shoes: deleteFromState(action.payload, state.shoes)
      }
    default:
      return state;
  }
};

const deleteFromState = (id:string, state:{ [id: string]: Shoe }):{ [id: string]: Shoe } => {
  console.log("ID",id, state)
  const keysArr = Object.keys(state)
  let newState:{ [id: string]: Shoe } = {}

  for(const key of keysArr){
    if(key != id){
      newState = {
        ...newState,
        [key]: state[key]
      }
    }
  }
  console.log("New State stuff ",newState)
  return newState
}