import ChartChord, { isChartChord } from 'src/types/chartchord';

export default interface ChartLine {
  chords: ChartChord[];
  lyrics: string;
}

export function isChartLine(obj: unknown): obj is ChartLine {
  const objAs = obj as ChartLine;
  return !!obj && Array.isArray(objAs.chords) && objAs.chords.every(isChartChord) && typeof objAs.lyrics === 'string';
}
