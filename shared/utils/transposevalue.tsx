import Key from '../types/key';

// convert from key enum to actual key offset (in [0 -> 11])
const keyVal = (key: Key): number =>
  [0, 0, 1, 1, 2, 3, 3, 4, 5, 6, 6, 7, 8, 8, 9, 10, 10, 11][key] ?? 0;

const calcTransposeValue = (originalKey: Key | undefined, selectedKey: Key | undefined): number =>
  originalKey !== undefined &&
  selectedKey !== undefined &&
  originalKey !== Key.None &&
  selectedKey !== Key.None
    ? keyVal(selectedKey) - keyVal(originalKey)
    : 0;

export default calcTransposeValue;
