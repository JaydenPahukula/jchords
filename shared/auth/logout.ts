import { signOut } from 'firebase/auth';
import growlManager from 'shared/classes/growlmanager';
import auth from 'shared/firebase/auth';

export default function logOut() {
  signOut(auth);
  growlManager.dispatchGrowl({ message: 'Signed out successfully' });
}
