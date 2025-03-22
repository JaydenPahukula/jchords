import { signOut } from 'firebase/auth';
import auth from 'shared/firebase/auth';

export default function logOut() {
  signOut(auth);
}
