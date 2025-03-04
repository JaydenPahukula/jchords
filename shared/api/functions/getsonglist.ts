import SongInfo from 'shared/types/songinfo';
import { isGetSongListResponseBody } from '../../types/api/getsonglistresponsebody';
import apiFetch from '../apifetch';

export default async function getSongList(): Promise<SongInfo[] | undefined> {
  const result = await apiFetch('GET', 'songlist');
  if (!isGetSongListResponseBody(result)) return undefined;
  return result.songList;
}
