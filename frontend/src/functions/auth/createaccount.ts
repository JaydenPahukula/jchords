import { FirebaseError } from '@firebase/util';
import { AuthErrorCodes, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { CreateAccountResult } from 'src/enums/createaccountresult';
import { auth } from 'src/firebase/auth';

export async function createAccount(
  email: string,
  password: string,
  displayName: string,
): Promise<CreateAccountResult> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // for UI reasons
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(newUser.user, { displayName: displayName });
    return CreateAccountResult.Success;
  } catch (error) {
    switch ((error as FirebaseError).code) {
      case AuthErrorCodes.WEAK_PASSWORD:
        return CreateAccountResult.WeakPassword;
      case AuthErrorCodes.INVALID_EMAIL:
        return CreateAccountResult.InvalidEmail;
      case AuthErrorCodes.EMAIL_EXISTS:
        return CreateAccountResult.EmailInUse;
      default:
        console.error(`Unknown Firebase error when creating account: ${error}`);
    }
    return CreateAccountResult.Failed;
  }
}
