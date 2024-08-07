import { emptyChartSection } from 'src/types/chartsection';
import ChartSections from 'src/types/chartsections';
import ChartEditorSectionProps from '../charteditorsectionprops';
import './sectioneditor.css';

export default function SectionEditorComponent(props: ChartEditorSectionProps) {
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
        <span>
          <button className="section-editor-button" onClick={newSection}>
            +
          </button>
          <button className="section-editor-button" onClick={deleteSelectedSection} disabled={selectedId === ''}>
            -
          </button>
        </span>
      </div>
      <div className="section-list">
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
      {selectedId !== undefined ? (
        <>
          <div className="flex-row">
            <h3 className="preserve-white-space">ID: </h3>
            <input
              className="width-100"
              id="section-id-input"
              disabled={selectedId === ''}
              onFocus={(e) => e.target.select()}
              value={selectedId}
              onChange={() =>
                setSelectedSectionId((document.getElementById('section-id-input') as HTMLInputElement).value)
              }
            ></input>
          </div>
          <div className="flex-row">
            <h3 className="preserve-white-space">Name: </h3>
            <input
              className="width-100"
              id="section-name-input"
              disabled={selectedId === ''}
              onFocus={(e) => e.target.select()}
              value={sections[selectedId]?.sectionname || ''}
              onChange={() =>
                setSelectedSectionName((document.getElementById('section-name-input') as HTMLInputElement).value)
              }
            ></input>
          </div>
        </>
      ) : (
        <></>
      )}
    </section>
  );
}
