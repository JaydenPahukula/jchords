import InvalidKeyError from 'src/errors/invalidkeyerror';
import Accidental from 'src/types/accidental';
import Key from 'src/types/key';

/**
 * Calculate the default accidentals given a key
 */
export default function keyToAccidental(key: Key): Accidental {
  if (key === 'C') return 'sharp';
  if (key === 'C#') return 'sharp';
  if (key === 'Db') return 'flat';
  if (key === 'D') return 'sharp';
  if (key === 'D#') return 'sharp';
  if (key === 'Eb') return 'flat';
  if (key === 'E') return 'sharp';
  if (key === 'F') return 'flat';
  if (key === 'F#') return 'sharp';
  if (key === 'Gb') return 'flat';
  if (key === 'G') return 'sharp';
  if (key === 'G#') return 'sharp';
  if (key === 'Ab') return 'flat';
  if (key === 'A') return 'sharp';
  if (key === 'A#') return 'sharp';
  if (key === 'Bb') return 'flat';
  if (key === 'B') return 'sharp';
  throw new InvalidKeyError(key);
}
