import { useState } from 'react';
import ChartSection, { makeEmptyChartSection } from 'shared/types/chartsection';
import ChartSections from 'shared/types/chartsections';
import './chartsectionseditor.css';

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

interface ChartSectionsEditorComponentProps {
  sections: ChartSections | undefined;
  setSections: (sections: ChartSections) => void;
}

export default function ChartSectionsEditorComponent(props: ChartSectionsEditorComponentProps) {
  const [selectedSectionId, setSelectedSectionId] = useState('');
  const [errorState, setErrorState] = useState(ErrorState.None);
  const [idInputValue, setIdInputValue] = useState('');
  const [lastIdInputValue, setLastIdInputValue] = useState('');

  const sections = props.sections || {};
  const selectedSection: ChartSection | undefined = sections[selectedSectionId];

  function getDefaultSectionId(): string {
    let i = 1;
    while (sections[`section${i}`] !== undefined) i += 1;
    return `section${i}`;
  }

  function newSection() {
    const newId = getDefaultSectionId();
    const newSections: ChartSections = {};
    newSections[newId] = makeEmptyChartSection(newId);
    props.setSections({
      ...sections,
      ...newSections,
    });
    setSelectedSectionId(newId);
    setIdInputValue(newId);
  }

  function deleteSelectedSection() {
    if (selectedSection && confirm(`Are you sure you want to delete ${selectedSectionId}?`)) {
      delete sections[selectedSectionId];
      props.setSections(sections);
      setSelectedSectionId('');
      setIdInputValue('');
    }
  }

  function modifySelectedSectionId(newId: string) {
    if (selectedSection !== undefined) {
      setIdInputValue(newId);
      if (newId === '') {
        setErrorState(ErrorState.Empty);
      } else if (newId !== lastIdInputValue && sections[newId] !== undefined) {
        setErrorState(ErrorState.Taken);
      } else {
        const newSections: ChartSections = {};
        newSections[newId] = sections[selectedSectionId];
        delete sections[selectedSectionId];
        props.setSections({
          ...props.sections,
          ...newSections,
        });
        setSelectedSectionId(newId);
        if (errorState !== ErrorState.None) setErrorState(ErrorState.None);
        setLastIdInputValue(newId);
      }
    }
  }

  function setSelectedSectionLabel(label: string) {
    if (selectedSection !== undefined) {
      sections[selectedSectionId].label = label;
      props.setSections(sections);
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
          disabled={props.sections === undefined || selectedSection === undefined}
        >
          -
        </button>
      </div>
      <div className={`section-list flex-grow-1${props.sections === undefined ? ' disabled' : ''}`}>
        {Object.keys(sections).map((sectionId) => (
          <div
            className={`section-list-row${sectionId === selectedSectionId ? '-selected' : ''}`}
            key={sectionId}
            onClick={() => {
              setSelectedSectionId(sectionId);
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
          disabled={selectedSection === undefined}
          onFocus={(e) => e.target.select()}
          value={idInputValue}
          onChange={(e) => modifySelectedSectionId(e.target.value)}
        ></input>
      </div>
      <div className="flex-row">
        <h3 className="preserve-white-space">Name: </h3>
        <input
          className="width-100"
          disabled={selectedSection === undefined}
          onFocus={(e) => e.target.select()}
          value={selectedSection?.label}
          onChange={(e) => setSelectedSectionLabel(e.target.value)}
        ></input>
      </div>
    </section>
  );
}
