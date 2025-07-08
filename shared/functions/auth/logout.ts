import { signOut } from 'firebase/auth';
import { auth } from 'src/firebase/auth';

export function logOut() {
  signOut(auth);
}
