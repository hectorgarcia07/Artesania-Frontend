import { State } from "./state";
import { Shoe, Alert, UserAuth } from "../types";

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
  | {
      type: 'UPDATE_ALERT',
      payload: Alert
    }
  | {
      type: 'SIGN_IN',
      paloyad: UserAuth
    }
  | {
      type: 'SIGN_OUT'
    }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_SHOE_LIST":
      console.log('state', state);
      return {
        ...state,
        shoes: {
          ...action.payload.reduce(
            (memo, shoe) => ({ ...memo, [shoe.id]: shoe }),
            {}
          ),
        }
      };
    case "ADD_SHOE":
      return {
        ...state,
        shoes: {
          ...state.shoes,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_SHOE":
      return {
        ...state,
        shoes:{
          ...state.shoes,
          [action.payload.id]: action.payload
        }
      }
    case "DELTE_SHOE":
      return {
        ...state,
        shoes: deleteFromState(action.payload, state.shoes)
      }
    case "UPDATE_ALERT":
      return {
        ...state,
        alert: action.payload
      }
    case 'SIGN_IN':
      return {
        ...state,
        user: action.paloyad.user,
        token: action.paloyad.token
      }
    case 'SIGN_OUT':
      return {
        ...state,
        user: null,
        token: null
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