import { FirebaseError } from '@firebase/util';
import { AuthErrorCodes, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { LogInResult } from 'shared/enums/loginresult';
import { auth } from 'src/firebase/auth';

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');

export async function logInWithGoogle(): Promise<LogInResult> {
  try {
    await signInWithPopup(auth, googleProvider);
    return LogInResult.Success;
  } catch (error) {
    console.log(error);
    switch ((error as FirebaseError).code) {
      case AuthErrorCodes.INVALID_EMAIL:
      case AuthErrorCodes.USER_DELETED:
      case AuthErrorCodes.INVALID_PASSWORD:
        return LogInResult.BadCredentials;
      case AuthErrorCodes.POPUP_CLOSED_BY_USER:
        return LogInResult.Canceled;
      default:
        console.error(`Unknown Firebase error when logging in with google: ${error}`);
        return LogInResult.Failed;
    }
  }
}
