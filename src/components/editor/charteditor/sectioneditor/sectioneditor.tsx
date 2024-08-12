import { emptyChartSection } from 'src/types/chartsection';
import ChartSections from 'src/types/chartsections';
import './sectioneditor.css';

interface SectionEditorComponentProps {
  sections: ChartSections | undefined;
  setSections: (sections: ChartSections) => void;
  selectedId: string | undefined;
  setSelectedId: (selectedId: string | undefined) => void;
}

export default function SectionEditorComponent(props: SectionEditorComponentProps) {
  const selectedId = props.selectedId || '';
  const sections = props.sections || {};

  function defaultSectionId(): string {
    let i = 1;
    while (sections[`section${i}`] !== undefined) i += 1;
    return `section${i}`;
  }

  function newSection() {
    const newId = defaultSectionId();
    const newSection: ChartSections = {};
    newSection[newId] = emptyChartSection(newId);
    props.setSections({
      ...sections,
      ...newSection,
    });
    props.setSelectedId(newId);
  }

  function deleteSelectedSection() {
    if (sections[selectedId] && confirm(`Are you sure you want to delete ${selectedId}?`)) {
      delete sections[selectedId];
      props.setSections(sections);
      props.setSelectedId(undefined);
    }
  }

  function setSelectedSectionId(newId: string) {
    if (sections[selectedId] && newId) {
      const newSection: ChartSections = {};
      newSection[newId] = sections[selectedId];
      delete sections[selectedId];
      props.setSections({
        ...props.sections,
        ...newSection,
      });
      props.setSelectedId(newId);
    }
  }

  function setSelectedSectionName(name: string) {
    if (selectedId && props.sections?.[selectedId]) {
      props.sections[selectedId].sectionname = name;
      props.setSections(props.sections);
    }
  }

  return (
    <section className="section-editor-section">
      <div className="flex-row">
        <h2 className="flex-grow-1">Sections:</h2>
        <button
          className="square-button"
          onClick={newSection}
          disabled={props.sections === undefined}
        >
          +
        </button>
        <button
          className="square-button"
          onClick={deleteSelectedSection}
          disabled={props.sections === undefined || selectedId === ''}
        >
          -
        </button>
      </div>
      <div className={`section-list flex-grow-1${props.sections === undefined ? ' disabled' : ''}`}>
        {Object.keys(sections).map((sectionId) => (
          <div
            className={`section-list-row${sectionId === selectedId ? '-selected' : ''}`}
            key={sectionId}
            onClick={() => props.setSelectedId(sectionId)}
          >
            {sectionId}
          </div>
        ))}
      </div>
      <div className="flex-row">
        <h3 className="preserve-white-space">ID: </h3>
        <input
          className="width-100"
          disabled={selectedId === ''}
          onFocus={(e) => e.target.select()}
          value={selectedId}
          onChange={(e) => setSelectedSectionId(e.target.value)}
        ></input>
      </div>
      <div className="flex-row">
        <h3 className="preserve-white-space">Name: </h3>
        <input
          className="width-100"
          disabled={selectedId === ''}
          onFocus={(e) => e.target.select()}
          value={sections[selectedId]?.sectionname || ''}
          onChange={(e) => setSelectedSectionName(e.target.value)}
        ></input>
      </div>
    </section>
  );
}
