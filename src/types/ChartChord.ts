type ChartChord = {
  chord: string;
  index: number;
};

export default ChartChord;

export function isChartChord(obj: unknown): obj is ChartChord {
  const objAs = obj as ChartChord;
  return !!obj && typeof objAs.chord === 'string' && typeof objAs.index === 'number';
}
