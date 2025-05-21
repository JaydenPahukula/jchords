import { signOut } from 'firebase/auth';
import { growlManager } from 'shared/classes/growlmanager';
import { auth } from 'shared/firebase/auth';

export function logOut() {
  signOut(auth);
  growlManager.dispatchGrowl({ content: 'Signed out successfully' });
}
