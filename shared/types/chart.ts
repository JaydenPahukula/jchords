import ChartOrder, { isChartOrder, makeEmptyChartOrder } from "./chartorder";
import ChartSections, { isChartSections } from "./chartsections";

export default interface Chart {
  sections: ChartSections;
  order: ChartOrder;
}

export function makeEmptyChart(): Chart {
  return {
    sections: {},
    order: makeEmptyChartOrder(),
  };
}

export function isChart(obj: unknown): obj is Chart {
  const objAs = obj as Chart;
  return !!obj && isChartSections(objAs.sections) && isChartOrder(objAs.order);
}
