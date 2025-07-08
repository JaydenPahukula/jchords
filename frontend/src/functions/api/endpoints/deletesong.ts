import { apiFetch } from 'src/functions/api/apifetch';

export async function apiDeleteSong(
  id: string,
  firebaseAuthToken: string,
): Promise<true | undefined> {
  const result = await apiFetch('DELETE', 'song/' + id, undefined, {
    authorization: firebaseAuthToken,
  });
  return result;
}
