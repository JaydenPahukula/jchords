export const allKeys = [
  'C',
  'C#',
  'Db',
  'D',
  'D#',
  'Eb',
  'E',
  'F',
  'F#',
  'Gb',
  'G',
  'G#',
  'Ab',
  'A',
  'A#',
  'Bb',
  'B',
] as const;

type Key = (typeof allKeys)[number];

export default Key;

export function isKey(obj: unknown): obj is Key {
  return typeof obj === 'string' && allKeys.includes(obj as Key);
}
