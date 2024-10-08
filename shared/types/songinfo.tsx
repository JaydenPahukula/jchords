import SongId, { isSongId } from './songid';

export default interface SongInfo {
  id: SongId;
  name: string;
  artist: string;
}

export const emptySongInfo: SongInfo = {
  id: '',
  name: '',
  artist: '',
};

export function isSongInfo(obj: unknown): obj is SongInfo {
  const objAs = obj as SongInfo;
  return (
    !!obj &&
    isSongId(objAs.id) &&
    typeof objAs.name === 'string' &&
    typeof objAs.artist === 'string'
  );
}
