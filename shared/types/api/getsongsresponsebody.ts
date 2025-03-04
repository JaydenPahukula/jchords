import SongInfo, { isSongInfo } from '../songinfo';

export default interface GetSongsResponseBody {
  songs: SongInfo[];
}

export function isGetResponseBody(obj: unknown): obj is GetSongsResponseBody {
  const objAs = obj as GetSongsResponseBody;
  return !!objAs && Array.isArray(objAs.songs) && objAs.songs.every(isSongInfo);
}
