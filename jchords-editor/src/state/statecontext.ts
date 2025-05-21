import { createContext } from 'preact';
import { State } from 'src/types/state';

export const StateContext = createContext<State>(undefined!);
