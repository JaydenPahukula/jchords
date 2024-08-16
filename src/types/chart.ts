import { QueryDocumentSnapshot } from 'firebase/firestore';
import ChartOrder, { isChartOrder, makeEmptyChartOrder } from 'src/types/chartorder';
import ChartSection, { isChartSection } from 'src/types/chartsection';
import ObjectOf, { isObjectOf } from './objectof';

export default interface Chart {
  sections: ObjectOf<ChartSection>;
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
  return (
    !!obj && isObjectOf<ChartSection>(objAs.sections, isChartSection) && isChartOrder(objAs.order)
  );
}

export function parseChart(docs: QueryDocumentSnapshot[]): Chart | undefined {
  const maybeSections: ObjectOf<ChartSection> = {};
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
