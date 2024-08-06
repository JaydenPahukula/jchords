import { QueryDocumentSnapshot } from 'firebase/firestore';
import ChartOrder, { isChartOrder } from 'src/types/chartorder';
import ChartSections, { isChartSections } from 'src/types/chartsections';
import { isChartSection } from './chartsection';

export default interface Chart {
  sections: ChartSections;
  order: ChartOrder;
}

export function isChart(obj: unknown): obj is Chart {
  const objAs = obj as Chart;
  return !!obj && isChartSections(objAs.sections) && isChartOrder(objAs.order);
}

export function parseChart(docs: QueryDocumentSnapshot[]): Chart | undefined {
  const maybeSections: ChartSections = {};
  let maybeOrder: ChartOrder | undefined;
  for (const doc of docs) {
    if (doc.id === '(order)') {
      const data = doc.data()?.order;
      if (!isChartOrder(data)) return undefined;
      maybeOrder = data;
    } else {
      const data = doc.data();
      if (!isChartSection(data)) return undefined;
      maybeSections[doc.id] = data;
    }
  }
  const maybeChart = {
    sections: maybeSections,
    order: maybeOrder,
  };
  return isChart(maybeChart) ? maybeChart : undefined;
}
