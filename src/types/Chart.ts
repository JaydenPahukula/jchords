import { QueryDocumentSnapshot } from 'firebase/firestore';
import ChartOrder, { isChartOrder } from 'src/types/ChartOrder';
import ChartSections, { isChartSections } from 'src/types/ChartSections';
import { isChartSection } from './ChartSection';

export default interface Chart {
  sections: ChartSections;
  order: ChartOrder;
}

const invalidChart = Symbol.for('InvalidChart');
export type InvalidChart = typeof invalidChart;

export function isChart(obj: unknown): obj is Chart {
  const objAs = obj as Chart;
  return !!obj && isChartSections(objAs.sections) && isChartOrder(objAs.order);
}

export function parseChart(
  docs: QueryDocumentSnapshot[],
): Chart | InvalidChart {
  const maybeSections: ChartSections = {};
  let maybeOrder: ChartOrder | undefined;
  for (const doc of docs) {
    if (doc.id === '(order)') {
      const data = doc.data();
      if (isChartOrder(data)) {
        maybeOrder = data;
      }
    } else {
      const data = doc.data();
      if (isChartSection(data)) {
        maybeSections[doc.id] = data;
      }
    }
  }
  const maybeChart = {
    sections: maybeSections,
    order: maybeOrder,
  };
  return isChart(maybeChart) ? maybeChart : invalidChart;
}
