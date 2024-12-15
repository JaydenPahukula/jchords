import Accidental from 'src/types/accidental';
import Key from 'src/types/key';
import keyToNum from 'src/utils/keytonum';
import posMod from 'src/utils/posMod';

/**
 * Transpose a key by a number value
 */
export default function transposeKey(
  key: Key,
  transposeValue: number,
  accidentals?: Accidental,
): Key {
  if (accidentals === undefined) accidentals = 'sharp';
  const num = posMod(keyToNum(key) + transposeValue, 12);
  if (num === 0) return 'C';
  if (num === 1 && accidentals === 'sharp') return 'C#';
  if (num === 1 && accidentals === 'flat') return 'Db';
  if (num === 2) return 'D';
  if (num === 3 && accidentals === 'sharp') return 'D#';
  if (num === 3 && accidentals === 'flat') return 'Eb';
  if (num === 4) return 'E';
  if (num === 5) return 'F';
  if (num === 6 && accidentals === 'sharp') return 'F#';
  if (num === 6 && accidentals === 'flat') return 'Gb';
  if (num === 7) return 'G';
  if (num === 8 && accidentals === 'sharp') return 'G#';
  if (num === 8 && accidentals === 'flat') return 'Ab';
  if (num === 9) return 'A';
  if (num === 10 && accidentals === 'sharp') return 'A#';
  if (num === 10 && accidentals === 'flat') return 'Bb';
  if (num === 11) return 'B';
  throw new Error('idk');
}
