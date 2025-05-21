import { apiFetch } from 'shared/functions/api/apifetch';
import { isGetSongResponseBody } from 'shared/types/api/getsongresponsebody';
import { Song } from 'shared/types/song';

export async function getSong(id: string): Promise<Song | undefined> {
  const result = await apiFetch('GET', 'song/' + id);
  if (!isGetSongResponseBody(result)) return undefined;
  const song = result.song;
  if (song.info.id != id) return undefined;
  return song;
}
