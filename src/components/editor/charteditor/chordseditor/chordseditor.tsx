import React, { useState } from 'react';
import ChartSection from 'src/types/chartsection';
import renderLine from 'src/utils/renderline';
import './chordseditor.css';

const idk = '意';

interface ChordsEditorComponentProps {
  section: ChartSection | undefined;
  setSection: (section: ChartSection) => void;
}

export default function ChordsEditorComponent(props: ChordsEditorComponentProps) {
  const [selectedRow, setSelectedRow] = useState<number>();
  const [selectedCol, setSelectedCol] = useState<number>();

  const isRowAndColSelected = selectedRow !== undefined && selectedCol !== undefined;

  function setSelectedChord(newChord: string) {
    if (props.section !== undefined && isRowAndColSelected) {
      if (newChord === '') {
        delete props.section.lines[selectedRow].chords[selectedCol];
      } else {
        props.section.lines[selectedRow].chords[selectedCol] = newChord;
      }
      props.setSection(props.section);
    }
  }

  function getSelectedChord(): string {
    if (isRowAndColSelected) {
      return props.section?.lines[selectedRow]?.chords[selectedCol] ?? '';
    }
    return '';
  }

  return (
    <section className="chords-editor-section">
      <h2>Chords:</h2>
      <div className="chords-editor-selected-chord">
        <h3 className="preserve-white-space">Selected Chord: </h3>
        <input
          className="chord-input"
          id="chord-input"
          disabled={!isRowAndColSelected}
          value={getSelectedChord()}
          onChange={(e) => setSelectedChord(e.target.value)}
        ></input>
      </div>
      <div className="chords-editor">
        {props.section?.lines.map((line, i) => {
          const [rawLyricsStr, chordsStr] = renderLine(line, idk);
          let lyricsStr = rawLyricsStr;
          while (
            isRowAndColSelected &&
            props.section?.lines[selectedRow]?.chords[
              lyricsStr.length - lyricsStr.split(idk).length + 1
            ] !== undefined
          )
            lyricsStr += ' ';
          let offset = 0;
          return (
            <React.Fragment key={i + chordsStr}>
              <div className="chords-editor-row">
                {Array.from(chordsStr).map((letter, j) => (
                  <div className="chords-editor-chord-letter" key={'c' + j}>
                    <pre>{letter}</pre>
                  </div>
                ))}
              </div>
              <div className="chords-editor-row">
                {Array.from(lyricsStr + ' ').map((letter, j) => {
                  j -= offset;
                  if (letter === idk) {
                    offset += 1;
                    return (
                      <div className="chords-editor-empty-letter" key={'l' + (j + offset - 1)}>
                        <pre> </pre>
                      </div>
                    );
                  }
                  return (
                    <div
                      className={`chords-editor-lyric-letter${selectedRow === i && selectedCol === j ? '-selected' : ''}`}
                      key={'l' + (j + offset)}
                      onClick={() => {
                        setSelectedRow(i);
                        setSelectedCol(j);
                        document.getElementById('chord-input')?.focus();
                      }}
                    >
                      <pre>{letter}</pre>
                    </div>
                  );
                })}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}