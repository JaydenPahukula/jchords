import { isGetSongResponseBody } from 'shared/types/api/getsongresponsebody';
import { Song } from 'shared/types/song';
import { apiFetch } from 'src/functions/api/apifetch';

export async function apiGetSong(id: string): Promise<Song | undefined> {
  const result = await apiFetch('GET', 'song/' + id);
  if (!isGetSongResponseBody(result)) return undefined;
  const song = result.song;
  if (song.info.id != id) return undefined;
  return song;
}
