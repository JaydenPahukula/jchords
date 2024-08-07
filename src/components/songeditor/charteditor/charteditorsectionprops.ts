import ChartSections from 'src/types/chartsections';

export default interface ChartEditorSectionProps {
  sections: ChartSections | undefined;
  setSections: (sections: ChartSections | undefined) => void;
  selectedId: string | undefined;
  setSelectedId: (selectedId: string | undefined) => void;
}
