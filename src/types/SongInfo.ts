export default interface SongInfo {
  id: string;
  name: string;
}

export function isSongInfo(obj: unknown): obj is SongInfo {
  const objAs = obj as SongInfo;
  return typeof objAs.name === 'string' && typeof objAs.id === 'string';
}
