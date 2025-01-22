import { createContext } from 'preact';
import StateManager from './statemanager';

const StateContext = createContext<StateManager>(undefined!);

export default StateContext;
