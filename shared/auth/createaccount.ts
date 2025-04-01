import { FirebaseError } from '@firebase/util';
import { AuthErrorCodes, createUserWithEmailAndPassword } from 'firebase/auth';
import CreateAccountResult from 'shared/enums/createaccountresult';
import auth from 'shared/firebase/auth';

export default async function createAccount(
  email: string,
  password: string,
): Promise<CreateAccountResult> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // for UI reasons
    await createUserWithEmailAndPassword(auth, email, password);
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
