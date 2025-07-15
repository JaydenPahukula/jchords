import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { app } from 'src/firebase/app';
import 'src/types/declarations/vite-env.d.ts';

export const auth = getAuth(app);

if (import.meta.env.DEV) connectAuthEmulator(auth, 'http://127.0.0.1:9099');
