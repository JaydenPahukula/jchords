import Chart from 'shared/types/chart';
import ChartOrder from 'shared/types/chartorder';
import ChartSections from 'shared/types/chartsections';
import OrderEditorComponent from 'src/components/editor/charteditor/ordereditor/ordereditor';
import ChartSectionsEditorComponent from './sectioneditor/chartsectionseditor';

interface ChartEditorComponentProps {
  chart: Chart | undefined;
  setChart: (chart: Chart) => void;
}

export default function ChartEditorComponent(props: ChartEditorComponentProps) {
  // make a deep copy for modification
  const chart: Chart | undefined =
    props.chart === undefined ? undefined : JSON.parse(JSON.stringify(props.chart || ''));

  function setSections(newSections: ChartSections) {
    if (chart) {
      chart.sections = newSections;
      props.setChart(chart);
    }
  }

  function setOrder(newOrder: ChartOrder) {
    if (chart !== undefined) {
      chart.order = newOrder;
      props.setChart(chart);
    }
  }

  return (
    <div className="chart-editor">
      {props.chart === undefined ? <p className="error-msg">Chart format is invalid!</p> : <></>}
      <ChartSectionsEditorComponent sections={chart?.sections} setSections={setSections} />
      <OrderEditorComponent
        sectionIds={chart === undefined ? undefined : Object.keys(chart?.sections)}
        order={chart?.order}
        setOrder={setOrder}
      />
    </div>
  );
}
