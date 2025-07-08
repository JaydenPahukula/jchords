import { Signal } from '@preact/signals-react';
import { User } from 'firebase/auth';
import { createContext, useContext } from 'react';

export const UserContext = createContext<Signal<User | null | undefined>>(undefined!);

export const useUserContext = () => useContext(UserContext);
