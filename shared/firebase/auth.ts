import { connectAuthEmulator, getAuth } from 'firebase/auth';
import 'shared/declarations/vite-env.d.ts';
import app from 'shared/firebase/app';

const auth = getAuth(app);

if (import.meta.env.DEV) connectAuthEmulator(auth, 'http://127.0.0.1:9099');

export default auth;
