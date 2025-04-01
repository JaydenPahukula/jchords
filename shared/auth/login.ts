import { FirebaseError } from '@firebase/util';
import { AuthErrorCodes, signInWithEmailAndPassword } from 'firebase/auth';
import LogInResult from 'shared/enums/loginresult';
import auth from 'shared/firebase/auth';

export default async function logIn(email: string, password: string): Promise<LogInResult> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // for UI reasons
    await signInWithEmailAndPassword(auth, email, password);
    return LogInResult.Success;
  } catch (error) {
    switch ((error as FirebaseError).code) {
      case AuthErrorCodes.INVALID_EMAIL:
      case AuthErrorCodes.USER_DELETED:
      case AuthErrorCodes.INVALID_PASSWORD:
        return LogInResult.BadCredentials;
      default:
        console.error(`Unknown Firebase error when logging in: ${error}`);
        return LogInResult.Failed;
    }
  }
}
