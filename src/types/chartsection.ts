import ChartLine, { isChartLine } from 'src/types/chartline';

type ChartSection = {
  sectionname: string;
  lines: ChartLine[];
};

export default ChartSection;

export function makeEmptyChartSection(name: string = 'section'): ChartSection {
  return {
    sectionname: name,
    lines: [],
  };
}

export function isChartSection(obj: unknown): obj is ChartSection {
  const objAs = obj as ChartSection;
  return (
    !!obj &&
    typeof objAs.sectionname === 'string' &&
    Array.isArray(objAs.lines) &&
    objAs.lines.every(isChartLine)
  );
}
