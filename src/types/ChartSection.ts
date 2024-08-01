import ChartLine, { isChartLine } from 'src/types/ChartLine';

type ChartSection = {
  sectionname: string;
  lines: ChartLine[];
};

export default ChartSection;

export function isChartSection(obj: unknown): obj is ChartSection {
  const objAs = obj as ChartSection;
  return !!obj && typeof objAs.sectionname === 'string' && Array.isArray(objAs.lines) && objAs.lines.every(isChartLine);
}
