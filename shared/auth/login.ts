import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../firebase/auth';

export const enum LogInResult {
  Success,
  Bad,
}

export default async function logIn(email: string, password: string): Promise<LogInResult> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // for UI reasons
    await signInWithEmailAndPassword(auth, email, password);
    return LogInResult.Success;
  } catch (error) {
    console.log(error);
    // if (error instanceof FirebaseError) {
    //   if (error.code === AuthErrorCodes.WEAK_PASSWORD) return CreateAccountResult.WeakPassword;
    //   else if (error.code === AuthErrorCodes.INVALID_EMAIL) return CreateAccountResult.InvalidEmail;
    //   else if (error.code === AuthErrorCodes.EMAIL_EXISTS) return CreateAccountResult.EmailInUse;
    // }
    // return CreateAccountResult.Failed;
  }
  return LogInResult.Success;
}
