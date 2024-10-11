import Key from '../types/key';

export default function calculateTransposeValue(
  originalKey: Key | undefined,
  selectedKey: Key | undefined,
): number {
  return originalKey !== undefined &&
    selectedKey !== undefined &&
    originalKey !== Key.None &&
    selectedKey !== Key.None
    ? originalKey - selectedKey
    : 0;
}
