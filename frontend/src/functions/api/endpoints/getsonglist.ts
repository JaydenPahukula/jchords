import { isGetSongListResponseBody } from 'shared/types/api/getsonglistresponsebody';
import { SongInfo } from 'shared/types/songinfo';
import { apiFetch } from 'src/functions/api/apifetch';

export async function apiGetSongList(): Promise<SongInfo[] | undefined> {
  const result = await apiFetch('GET', 'songlist');
  if (!isGetSongListResponseBody(result)) return undefined;
  return result.songList.sort((a, b) => a.title.localeCompare(b.title));
}
