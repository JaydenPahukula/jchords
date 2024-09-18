export default interface SongInfo {
  id: string;
  name: string;
  artist: string;
}

export function makeEmptySongInfo(): SongInfo {
  return {
    id: '',
    name: '',
    artist: '',
  };
}

export function isSongInfo(obj: unknown): obj is SongInfo {
  const objAs = obj as SongInfo;
  return (
    !!obj &&
    typeof objAs.name === 'string' &&
    typeof objAs.id === 'string' &&
    typeof objAs.artist === 'string'
  );
}
