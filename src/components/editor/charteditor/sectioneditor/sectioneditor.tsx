import { useState } from 'react';
import ChartSection, { makeEmptyChartSection } from 'src/types/chartsection';
import ObjectOf from 'src/types/objectof';
import './sectioneditor.css';

enum ErrorState {
  None,
  Empty,
  Taken,
}

function renderErrorState(errorState: ErrorState): JSX.Element {
  switch (errorState) {
    case ErrorState.Empty:
      return <p className="error-msg">Section ID must not be empty!</p>;
    case ErrorState.Taken:
      return <p className="error-msg">Section ID must be unique!</p>;
    default:
      return <></>;
  }
}

interface SectionEditorComponentProps {
  sections: ObjectOf<ChartSection> | undefined;
  setSections: (sections: ObjectOf<ChartSection>) => void;
  selectedId: string | undefined;
  setSelectedId: (selectedId: string | undefined) => void;
}

export default function SectionEditorComponent(props: SectionEditorComponentProps) {
  const [errorState, setErrorState] = useState(ErrorState.None);
  const [idInputValue, setIdInputValue] = useState(props.selectedId ?? '');
  const [lastIdInputValue, setLastIdInputValue] = useState('');

  const selectedId = props.selectedId || '';
  const sections = props.sections || {};

  function getDefaultSectionId(): string {
    let i = 1;
    while (sections[`section${i}`] !== undefined) i += 1;
    return `section${i}`;
  }

  function newSection() {
    const newId = getDefaultSectionId();
    const newSection: ObjectOf<ChartSection> = {};
    newSection[newId] = makeEmptyChartSection(newId);
    props.setSections({
      ...sections,
      ...newSection,
    });
    props.setSelectedId(newId);
    setIdInputValue(newId);
  }

  function deleteSelectedSection() {
    if (sections[selectedId] && confirm(`Are you sure you want to delete ${selectedId}?`)) {
      delete sections[selectedId];
      props.setSections(sections);
      props.setSelectedId(undefined);
      setIdInputValue('');
    }
  }

  function setSelectedSectionId(newId: string) {
    if (sections[selectedId]) {
      setIdInputValue(newId);
      if (newId === '') {
        setErrorState(ErrorState.Empty);
      } else if (newId !== lastIdInputValue && sections[newId] !== undefined) {
        setErrorState(ErrorState.Taken);
      } else {
        const newSection: ObjectOf<ChartSection> = {};
        newSection[newId] = sections[selectedId];
        delete sections[selectedId];
        props.setSections({
          ...props.sections,
          ...newSection,
        });
        props.setSelectedId(newId);
        if (errorState !== ErrorState.None) setErrorState(ErrorState.None);
        setLastIdInputValue(newId);
      }
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
            onClick={() => {
              props.setSelectedId(sectionId);
              setIdInputValue(sectionId);
            }}
          >
            {sectionId}
          </div>
        ))}
      </div>
      {renderErrorState(errorState)}
      <div className="flex-row">
        <h3 className="preserve-white-space">ID: </h3>
        <input
          className="width-100"
          disabled={selectedId === ''}
          onFocus={(e) => e.target.select()}
          value={idInputValue}
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
