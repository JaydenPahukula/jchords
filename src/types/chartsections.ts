import ChartSection, { isChartSection } from 'src/types/chartsection';

type ChartSections = {
  [key: string]: ChartSection;
};

export default ChartSections;

export function isChartSections(obj: unknown): obj is ChartSections {
  const objAs = obj as ChartSections;
  const keys = Object.getOwnPropertyNames(obj);
  return !!obj && !!keys.length && keys.every((key) => typeof key === 'string' && isChartSection(objAs[key]));
}
