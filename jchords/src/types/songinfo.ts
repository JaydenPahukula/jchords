export default interface SongInfo {
  id: string;
  title: string;
  artist: string;
}

export function isSongInfo(obj: unknown): obj is SongInfo {
  const objAs = obj as SongInfo;
  return (
    !!obj &&
    typeof objAs.id === 'string' &&
    typeof objAs.title === 'string' &&
    typeof objAs.artist === 'string'
  );
}
