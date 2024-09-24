import SongId, { isSongId } from './songid';

export default interface SongChart {
  id: SongId;
  text: string;
  key: string;
}

export const emptySongChart = {
  id: '',
  text: '',
  key: '',
};

export function isSongChart(obj: unknown): obj is SongChart {
  const objAs = obj as SongChart;
  return (
    !!obj && isSongId(objAs.id) && typeof objAs.text === 'string' && typeof objAs.key === 'string'
  );
}
