import { apiFetch } from 'shared/functions/api/apifetch';
import { isGetSongListResponseBody } from 'shared/types/api/getsonglistresponsebody';
import { SongInfo } from 'shared/types/songinfo';

export async function apiGetSongList(): Promise<SongInfo[] | undefined> {
  const result = await apiFetch('GET', 'songlist');
  if (!isGetSongListResponseBody(result)) return undefined;
  return result.songList;
}
