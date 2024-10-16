type SongId = string;

export default SongId;

export function isSongId(obj: unknown): obj is SongId {
  return typeof obj === 'string';
}
