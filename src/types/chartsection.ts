import ChartLine, { isChartLine } from 'src/types/chartline';
import ChartSectionType from './chartsectiontype';

type ChartSection = {
  sectionname: string;
  lines: ChartLine[];
  type: ChartSectionType;
};

export default ChartSection;

export function makeEmptyChartSection(
  name: string = 'section',
  type: ChartSectionType = ChartSectionType.Normal,
): ChartSection {
  return {
    sectionname: name,
    lines: [],
    type: type,
  };
}

export function isChartSection(obj: unknown): obj is ChartSection {
  const objAs = obj as ChartSection;
  return (
    !!obj &&
    typeof objAs.sectionname === 'string' &&
    typeof objAs.type === 'number' &&
    objAs.type in ChartSectionType &&
    Array.isArray(objAs.lines) &&
    objAs.lines.every(isChartLine)
  );
}
