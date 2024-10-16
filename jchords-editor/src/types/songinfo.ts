import SongId, { isSongId } from './songid';

export default interface SongInfo {
  id: SongId;
  title: string;
  artist: string;
}

export const emptySongInfo: SongInfo = {
  id: '',
  title: '',
  artist: '',
};

export function isSongInfo(obj: unknown): obj is SongInfo {
  const objAs = obj as SongInfo;
  return (
    !!obj &&
    isSongId(objAs.id) &&
    typeof objAs.title === 'string' &&
    typeof objAs.artist === 'string'
  );
}
