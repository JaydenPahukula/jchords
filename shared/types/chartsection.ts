type ChartSection = {
  label: string;
  content: string;
};

export default ChartSection;

export function makeEmptyChartSection(
  name: string = 'section',
  content: string = '',
): ChartSection {
  return {
    label: name,
    content: content,
  };
}

export function isChartSection(obj: unknown): obj is ChartSection {
  const objAs = obj as ChartSection;
  return !!obj && typeof objAs.label === 'string' && typeof objAs.content === 'string';
}
