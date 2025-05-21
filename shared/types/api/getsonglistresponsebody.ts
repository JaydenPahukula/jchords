import { SongInfo, isSongInfo } from 'shared/types/songinfo';

export interface GetSongListResponseBody {
  songList: SongInfo[];
}

export function isGetSongListResponseBody(obj: unknown): obj is GetSongListResponseBody {
  const objAs = obj as GetSongListResponseBody;
  return !!objAs && Array.isArray(objAs.songList) && objAs.songList.every(isSongInfo);
}
