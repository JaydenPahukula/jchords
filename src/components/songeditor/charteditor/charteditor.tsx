import { useState } from 'react';
import Chart, { isChart } from 'src/types/chart';
import ChartOrder from 'src/types/chartorder';
import ChartSections from 'src/types/chartsections';
import './charteditor.css';
import ChartEditorSectionProps from './charteditorsectionprops';
import ChordsEditorComponent from './chordseditor/chordseditor';
import LyricEditorComponent from './lyriceditor/lyriceditor';
import OrderEditorComponent from './ordereditor/ordereditor';
import SectionEditorComponent from './sectioneditor/sectioneditor';

interface ChartEditorComponentProps {
  chart: Chart | undefined;
  setChart: (chart: Chart) => void;
}

function isChartOrUndefined(obj: unknown): obj is Chart | undefined {
  return obj === undefined || isChart(obj);
}

export default function ChartEditorComponent(props: ChartEditorComponentProps) {
  const [selectedSectionId, setSelectedSectionId] = useState<string>();

  // deep copy
  const chart = props.chart === undefined ? undefined : JSON.parse(JSON.stringify(props.chart || ''));
  if (!isChartOrUndefined(chart)) return <>error loading chart</>;

  function setSections(sections: ChartSections | undefined) {
    if (sections && chart) {
      chart.sections = sections;
      props.setChart(chart);
    }
  }

  function setOrder(order: ChartOrder) {
    if (chart) {
      chart.order = order;
      props.setChart(chart);
    }
  }

  const inputs: ChartEditorSectionProps = {
    sections: chart?.sections,
    setSections: setSections,
    selectedId: selectedSectionId,
    setSelectedId: setSelectedSectionId,
  };

  return (
    <div className="chart-editor">
      {props.chart === undefined ? <p className="error-msg">Chart format is invalid!</p> : <></>}
      <div className="section-editor">
        <SectionEditorComponent {...inputs} />
        <LyricEditorComponent {...inputs} />
        <ChordsEditorComponent {...inputs} />
      </div>
      <OrderEditorComponent
        sectionIds={chart === undefined ? undefined : Object.keys(chart?.sections)}
        order={chart?.order}
        setOrder={setOrder}
      />
    </div>
  );
}
