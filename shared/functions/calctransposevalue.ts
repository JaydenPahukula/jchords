import Key from '../enums/key';

/** Calculates the transpose value (0 to 11) given the original and new keys */
export default function calcTransposeValue(currKey: Key, newKey: Key): number {
  return (newKey - currKey + 12) % 12;
}
