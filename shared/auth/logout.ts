import { signOut } from 'firebase/auth';
import auth from '../firebase/auth';

export default function logOut() {
  signOut(auth);
}
