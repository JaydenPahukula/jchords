import Key from 'shared/enums/key';

/** Calculate key from transpose value */
export default function calcKey(key: Key, transposeVal: number): Key {
  return (((key + transposeVal) % 12) + 12) % 12;
}
