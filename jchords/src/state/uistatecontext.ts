import { createContext } from 'preact';
import UIState from 'src/types/uistate';

const UIStateContext = createContext<UIState>(undefined!);

export default UIStateContext;
