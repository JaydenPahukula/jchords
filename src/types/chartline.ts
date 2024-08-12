import { isNumeric } from './guards';

export default interface ChartLine {
  chords: {
    [key: number]: string;
  };
  lyrics: string;
}

export function isChartLine(obj: unknown): obj is ChartLine {
  const objAs = obj as ChartLine;
  return (
    !!obj &&
    typeof objAs.lyrics === 'string' &&
    typeof objAs.chords === 'object' &&
    Object.keys(objAs.chords).every(
      (key) => isNumeric(key) && typeof objAs.chords[Number(key)] === 'string',
    )
  );
}
