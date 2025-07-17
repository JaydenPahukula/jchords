import { Request } from 'express';
import { getAuth, UserRecord } from 'firebase-admin/auth';
import { app } from 'src/firebase/app';

const auth = getAuth(app);

/** Verifies Firebase ID token then returns the UID, or undefined if the token is invalid */
export async function authenticate(request: Request): Promise<string | undefined> {
  const token = request.headers.authorization;

  if (token === undefined) return undefined;

  return auth
    .verifyIdToken(token ?? '')
    .then((decodedToken) => decodedToken.uid)
    .catch((e) => {
      console.error('asdf', e);
      return undefined;
    });
}

export async function getUser(id: string): Promise<UserRecord | undefined> {
  try {
    return await auth.getUser(id);
  } catch (e) {
    console.error('Error getting user:\n', e);
    return undefined;
  }
}
