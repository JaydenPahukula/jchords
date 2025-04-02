import { createContext } from 'preact';
import State from 'src/types/state';

const StateContext = createContext<State>(undefined!);

export default StateContext;
