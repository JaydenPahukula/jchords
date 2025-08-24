import { signOut } from 'firebase/auth';
import { auth } from 'src/firebase/auth';

export async function logOut() {
  await signOut(auth);
}
