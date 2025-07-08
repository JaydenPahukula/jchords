import { PutSongRequestBody } from 'shared/types/api/putsongrequestbody';
import { isPutSongResponseBody } from 'shared/types/api/putsongresponsebody';
import { Song } from 'shared/types/song';
import { apiFetch } from 'src/functions/api/apifetch';

export async function apiNewSong(
  song: Song,
  firebaseAuthToken: string,
): Promise<string | undefined> {
  const body: PutSongRequestBody = { song: song };
  const result = await apiFetch('PUT', 'song', body, { authorization: firebaseAuthToken });
  if (!isPutSongResponseBody(result)) return undefined;
  return result.id;
}
