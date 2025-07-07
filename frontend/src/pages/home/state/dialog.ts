import { Signal } from '@preact/signals-react';
import { createContext, useContext } from 'react';
import { DialogType } from 'src/enums/dialogtype';

export const DialogContext = createContext<Signal<DialogType>>(undefined!);

export const useDialogContext = () => useContext(DialogContext);
