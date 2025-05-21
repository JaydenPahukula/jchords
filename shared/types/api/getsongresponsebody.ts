import { Song, isSong } from 'shared/types/song';

export interface GetSongResponseBody {
  song: Song;
}

export function isGetSongResponseBody(obj: unknown): obj is GetSongResponseBody {
  const objAs = obj as GetSongResponseBody;
  return !!objAs && isSong(objAs.song);
}
