import Key from 'src/types/key';
import keyToNum from 'src/utils/keytonum';

/**
 * Calculates the transpose value (0 to 11) given the original and new keys
 */
export default function calculateTransposeValue(defaultKey: Key, newKey: Key): number {
  const defVal = keyToNum(defaultKey);
  const newVal = keyToNum(newKey);
  return (newVal - defVal + 12) % 12;
}
