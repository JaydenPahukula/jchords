import { signOut } from 'firebase/auth';
import { auth } from 'shared/firebase/auth';

export function logOut() {
  signOut(auth);
}
