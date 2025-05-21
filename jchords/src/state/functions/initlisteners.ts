import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'shared/firebase/auth';
import { state } from 'src/state/state';

export function initListeners() {
  onAuthStateChanged(auth, (user) => {
    console.log('user changed:', user);
    state.user.value = user;
  });
}
