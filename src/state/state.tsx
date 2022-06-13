import React, { createContext, useContext, useReducer } from "react";
import { Shoe } from "../types";

import { Action } from "./reducer";

export type State = {
  shoes: { [id: string]: Shoe };
};

const initialState: State = {
  shoes: {}
};

//The context of that will be used
export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

//the type of Props that StateProvider should have
type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

//The JSX component that will be used to pass the prop.
export const StateProvider = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);