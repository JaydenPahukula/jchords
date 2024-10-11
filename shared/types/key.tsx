enum Key {
  None = 0,
  C,
  Cs,
  Db,
  D,
  Ds,
  Eb,
  E,
  F,
  Fs,
  Gb,
  G,
  Gs,
  Ab,
  A,
  As,
  Bb,
  B,
}

export default Key;

export function keyToString(key: Key | undefined): string {
  return key === undefined
    ? ''
    : ({
        0: '',
        1: 'C',
        2: 'C#',
        3: 'Db',
        4: 'D',
        5: 'D#',
        6: 'Eb',
        7: 'E',
        8: 'F',
        9: 'F#',
        10: 'Gb',
        11: 'G',
        12: 'G#',
        13: 'Ab',
        14: 'A',
        15: 'A#',
        16: 'Bb',
        17: 'B',
      }[key] ?? '');
}

export function stringToKey(str: string): Key {
  return (
    {
      C: Key.C,
      'C#': Key.Cs,
      Db: Key.Db,
      D: Key.D,
      'D#': Key.Ds,
      Eb: Key.Eb,
      E: Key.E,
      F: Key.F,
      'F#': Key.Fs,
      Gb: Key.Gb,
      G: Key.G,
      'G#': Key.Gs,
      Ab: Key.Ab,
      A: Key.A,
      'A#': Key.As,
      Bb: Key.Bb,
      B: Key.B,
    }[str] ?? Key.None
  );
}

export const realKeys: Key[] = [
  Key.C,
  Key.Cs,
  Key.Db,
  Key.D,
  Key.Ds,
  Key.Eb,
  Key.E,
  Key.F,
  Key.Fs,
  Key.Gb,
  Key.G,
  Key.Gs,
  Key.Ab,
  Key.A,
  Key.As,
  Key.Bb,
  Key.B,
];

export const allKeys: Key[] = [Key.None, ...realKeys];

export function isKey(obj: unknown): obj is Key {
  return typeof obj === 'number' && obj in Key;
}
