import ChartSection, { isChartSection } from "./chartsection";

type ChartSections = { [key: string]: ChartSection };

export default ChartSections;

export function isChartSections(obj: unknown): obj is ChartSections {
  const objAs = obj as ChartSections;
  return (
    !!obj &&
    Object.getOwnPropertyNames(obj).every((key) => isChartSection(objAs[key]))
  );
}
