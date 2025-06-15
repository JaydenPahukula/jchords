import { apiFetch } from 'shared/functions/api/apifetch';
import { PatchSongRequestBody } from 'shared/types/api/patchsongrequestbody';
import { Song } from 'shared/types/song';

export async function apiSaveSong(
  song: Song,
  firebaseAuthToken: string,
): Promise<true | undefined> {
  const body: PatchSongRequestBody = { song: song };
  const result = await apiFetch('PATCH', 'song/' + song.info.id, body, {
    authorization: firebaseAuthToken,
  });
  return result;
}
