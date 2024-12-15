import InvalidKeyError from 'src/errors/invalidkeyerror';
import Key from 'src/types/key';

/**
 * Converts a key to the corresponded number value (0 = C, 11 = B)
 */
export default function keyToNum(key: Key): number {
  if (key === 'C') return 0;
  if (key === 'C#') return 1;
  if (key === 'Db') return 1;
  if (key === 'D') return 2;
  if (key === 'D#') return 3;
  if (key === 'Eb') return 3;
  if (key === 'E') return 4;
  if (key === 'F') return 5;
  if (key === 'F#') return 6;
  if (key === 'Gb') return 6;
  if (key === 'G') return 7;
  if (key === 'G#') return 8;
  if (key === 'Ab') return 8;
  if (key === 'A') return 9;
  if (key === 'A#') return 10;
  if (key === 'Bb') return 10;
  if (key === 'B') return 11;
  throw new InvalidKeyError(key);
}
