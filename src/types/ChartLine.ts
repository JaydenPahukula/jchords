import ChartChord, { isChartChord } from 'src/types/ChartChord';

type ChartLine = {
  chords: ChartChord[];
  lyrics: string;
};

export default ChartLine;

export function isChartLine(obj: unknown): obj is ChartLine {
  const objAs = obj as ChartLine;
  return !!obj && Array.isArray(objAs.chords) && objAs.chords.every(isChartChord) && typeof objAs.lyrics === 'string';
}
