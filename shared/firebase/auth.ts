import { connectAuthEmulator, getAuth } from 'firebase/auth';
import app from 'shared/firebase/app';
import 'shared/types/declarations/vite-env.d.ts';

const auth = getAuth(app);

if (import.meta.env.DEV) connectAuthEmulator(auth, 'http://127.0.0.1:9099');

export default auth;
