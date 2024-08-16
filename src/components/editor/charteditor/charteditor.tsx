import { useState } from 'react';
import ChordsEditorComponent from 'src/components/editor/charteditor/chordseditor/chordseditor';
import LyricEditorComponent from 'src/components/editor/charteditor/lyriceditor/lyriceditor';
import OrderEditorComponent from 'src/components/editor/charteditor/ordereditor/ordereditor';
import SectionEditorComponent from 'src/components/editor/charteditor/sectioneditor/sectioneditor';
import Chart from 'src/types/chart';
import ChartOrder from 'src/types/chartorder';
import ChartSection from 'src/types/chartsection';
import ObjectOf from 'src/types/objectof';
import './charteditor.css';

interface ChartEditorComponentProps {
  chart: Chart | undefined;
  setChart: (chart: Chart) => void;
}

export default function ChartEditorComponent(props: ChartEditorComponentProps) {
  const [selectedSectionId, setSelectedSectionId] = useState<string | undefined>(undefined);

  // make a deep copy for modification
  const chart: Chart | undefined =
    props.chart === undefined ? undefined : JSON.parse(JSON.stringify(props.chart || ''));

  function setSections(newSections: ObjectOf<ChartSection>) {
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

  const selectedSection: ChartSection | undefined = chart?.sections[selectedSectionId || ''];

  function setSelectedSection(newSection: ChartSection) {
    if (selectedSectionId !== undefined && chart?.sections[selectedSectionId] !== undefined) {
      chart.sections[selectedSectionId] = newSection;
      props.setChart(chart);
    }
  }

  return (
    <div className="chart-editor">
      {props.chart === undefined ? <p className="error-msg">Chart format is invalid!</p> : <></>}
      <div className="section-editor">
        <SectionEditorComponent
          sections={chart?.sections}
          setSections={setSections}
          selectedId={selectedSectionId}
          setSelectedId={setSelectedSectionId}
        />
        <LyricEditorComponent section={selectedSection} setSection={setSelectedSection} />
        <ChordsEditorComponent section={selectedSection} setSection={setSelectedSection} />
      </div>
      <OrderEditorComponent
        sectionIds={chart === undefined ? undefined : Object.keys(chart?.sections)}
        order={chart?.order}
        setOrder={setOrder}
      ></OrderEditorComponent>
    </div>
  );
}
