import { Context, createContext } from 'react';
import { State } from 'src/types/state';

export const StateContext: Context<State> = createContext<State>(undefined!);
