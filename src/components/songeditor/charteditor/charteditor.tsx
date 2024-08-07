import { useEffect, useState } from 'react';
import DBManager from 'src/db/dbmanager';
import ChartSections, { isChartSections } from 'src/types/chartsections';
import './charteditor.css';
import ChartEditorSectionProps from './charteditorsectionprops';
import ChordsEditorComponent from './chordseditor/chordseditor';
import LyricEditorComponent from './lyriceditor/lyriceditor';
import SectionEditorComponent from './sectioneditor/sectioneditor';

interface ChartEditorComponentProps {
  songId: string;
}

export default function ChartEditorComponent(props: ChartEditorComponentProps) {
  const [isChartLoading, setIsChartLoading] = useState(true);
  const [oldSections, setSections] = useState<ChartSections>();
  const [selectedSectionId, setSelectedSectionId] = useState<string>();

  useEffect(() => {
    DBManager.getSongChart(props.songId).then((chart) => {
      setSections(chart?.sections);
      setIsChartLoading(false);
    });
  }, []);

  // deep copy
  const sections = JSON.parse(JSON.stringify(oldSections || ''));
  if (isChartLoading) return <>loading...</>;
  if (!isChartSections(sections)) return <>error loading chart</>;

  const inputs: ChartEditorSectionProps = {
    sections: sections,
    setSections: setSections,
    selectedId: selectedSectionId,
    setSelectedId: setSelectedSectionId,
  };

  return (
    <div className="chart-editor">
      <SectionEditorComponent {...inputs} />
      <LyricEditorComponent {...inputs} />
      <ChordsEditorComponent {...inputs} />
    </div>
  );
}
