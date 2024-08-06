import { useState } from 'react';
import renderLine from 'src/utils/renderline';
import ChartEditorSectionProps from './charteditorsectionprops';
import './chordseditor.css';

const idk = '意';

export default function ChordsEditorComponent(props: ChartEditorSectionProps) {
  const [selectedRow, setSelectedRow] = useState<number>();
  const [selectedCol, setSelectedCol] = useState<number>();

  const selectedId = props.selectedId || '';
  const sections = props.sections || {};
  const selectedSection = sections[selectedId];
  const isRowAndColSelected = selectedSection && selectedRow !== undefined && selectedCol !== undefined;

  function setSelectedChord(newChord: string) {
    if (isRowAndColSelected) {
      if (newChord === '') {
        delete sections[selectedId].lines[selectedRow].chords[selectedCol];
      } else {
        console.log(sections[selectedId].lines[selectedRow].chords);
        sections[selectedId].lines[selectedRow].chords[selectedCol] = newChord;
      }
      console.log(sections);
      props.setSections(sections);
    }
  }

  function getSelectedChord(): string {
    if (isRowAndColSelected) {
      return selectedSection.lines[selectedRow].chords[selectedCol] || '';
    }
    return '';
  }

  return (
    <section className="chords-editor-section">
      <h2>Chords:</h2>
      <div className="chords-editor-inline">
        <h3>Selected Chord:</h3>
        <input
          id="chord-input"
          value={getSelectedChord()}
          onChange={() => setSelectedChord((document.getElementById('chord-input') as HTMLInputElement).value)}
        ></input>
      </div>
      <div className="chords-editor">
        {sections[selectedId]?.lines.map((line, i) => {
          const [rawLyricsStr, chordsStr] = renderLine(line, idk);
          let lyricsStr = rawLyricsStr;
          while (
            isRowAndColSelected &&
            selectedSection.lines[selectedRow].chords[lyricsStr.length - lyricsStr.split(idk).length + 1] !== undefined
          )
            lyricsStr += ' ';
          console.log(`(${lyricsStr})`, lyricsStr.length);
          let offset = 0;
          return (
            <>
              <div className="chords-editor-row" key={'c' + i + chordsStr}>
                {Array.from(chordsStr).map((letter, j) => (
                  <div className="chords-editor-chord-letter" key={'c' + j}>
                    <pre>{letter}</pre>
                  </div>
                ))}
              </div>
              <div className="chords-editor-row" key={'l' + i + lyricsStr}>
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
                      }}
                    >
                      <pre>{letter}</pre>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    </section>
  );
}
