import apiFetch from 'shared/api/apifetch';
import { isGetSongListResponseBody } from 'shared/types/api/getsonglistresponsebody';
import SongInfo from 'shared/types/songinfo';

export default async function getSongList(): Promise<SongInfo[] | undefined> {
  const result = await apiFetch('GET', 'songlist');
  if (!isGetSongListResponseBody(result)) return undefined;
  return result.songList;
}
