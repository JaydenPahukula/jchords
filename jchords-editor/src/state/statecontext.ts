import { Context, createContext, useContext } from 'react';
import { State } from 'src/types/state';

export const StateContext: Context<State> = createContext<State>(undefined!);

export const useStateContext = () => useContext(StateContext);
