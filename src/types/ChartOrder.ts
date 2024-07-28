type ChartOrder = string[];

export default ChartOrder;

export function isChartOrder(obj: unknown): obj is ChartOrder {
  return (
    !!obj && Array.isArray(obj) && obj.every((item) => typeof item === 'string')
  );
}
