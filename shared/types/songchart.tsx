import Key, { isKey } from './key';
import SongId, { isSongId } from './songid';

export default interface SongChart {
  id: SongId;
  text: string;
  key: Key;
}

export const emptySongChart: SongChart = {
  id: '',
  text: '',
  key: Key.None,
};

export function isSongChart(obj: unknown): obj is SongChart {
  const objAs = obj as SongChart;
  return !!obj && isSongId(objAs.id) && typeof objAs.text === 'string' && isKey(objAs.key);
}
