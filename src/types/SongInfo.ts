export default interface SongInfo {
  id: string;
  name: string;
}

export function isSongInfo(obj: unknown): obj is SongInfo {
  return (
    !!obj &&
    typeof obj === 'object' &&
    'name' in obj &&
    typeof obj.name === 'string' &&
    'id' in obj &&
    typeof obj.id === 'string'
  );
}
