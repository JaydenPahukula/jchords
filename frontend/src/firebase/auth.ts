import { connectAuthEmulator, getAuth } from 'firebase/auth';
import 'shared/types/declarations/vite-env.d.ts';
import { app } from 'src/firebase/app';

export const auth = getAuth(app);

if (import.meta.env.DEV) connectAuthEmulator(auth, 'http://127.0.0.1:9099');
