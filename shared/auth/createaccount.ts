import { FirebaseError } from '@firebase/util';
import { AuthErrorCodes, createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../firebase/auth';

export const enum CreateAccountResult {
  Success,
  WeakPassword,
  InvalidEmail,
  EmailInUse,
  Failed,
}

export default async function createAccount(
  email: string,
  password: string,
): Promise<CreateAccountResult> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // for UI reasons
    await createUserWithEmailAndPassword(auth, email, password);
    return CreateAccountResult.Success;
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === AuthErrorCodes.WEAK_PASSWORD) return CreateAccountResult.WeakPassword;
      else if (error.code === AuthErrorCodes.INVALID_EMAIL) return CreateAccountResult.InvalidEmail;
      else if (error.code === AuthErrorCodes.EMAIL_EXISTS) return CreateAccountResult.EmailInUse;
    }
    return CreateAccountResult.Failed;
  }
}
