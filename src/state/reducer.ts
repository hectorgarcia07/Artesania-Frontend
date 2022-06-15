import { State } from "./state";
import { Shoe } from "../types";

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
    default:
      return state;
  }
};