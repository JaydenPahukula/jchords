import SongInfo from 'shared/types/songinfo';
import { isGetResponseBody } from '../../types/api/getsongsresponsebody';
import apiFetch from '../apifetch';

export default async function getSongList(): Promise<SongInfo[] | undefined> {
  const result = await apiFetch('songs', 'GET');
  if (!isGetResponseBody(result)) return undefined;
  return result.songs;
}
