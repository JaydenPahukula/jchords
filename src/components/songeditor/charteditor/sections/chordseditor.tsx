import ChartChord from 'src/types/chartchord';
import ChartLine from 'src/types/chartline';
import ChartEditorSectionProps from './charteditorsectionprops';
import './chordseditor.css';

export default function ChordsEditorComponent(props: ChartEditorSectionProps) {
  const selectedId = props.selectedId || '';
  const sections = props.sections || {};
  const selectedSection = sections[selectedId];

  function maxLineLength(line: ChartLine) {
    return Math.max(line.lyrics.length, ...line.chords.map((chord) => chord.index + 1));
  }

  function createChord(lineNum: number, index: number) {
    selectedSection.lines[lineNum].chords;
  }

  return (
    <section className="chords-editor-section">
      <h2>Chords:</h2>
      <div className="chords-editor">
        {sections[selectedId]?.lines.map((line, i) => {
          const chordMap = line.chords.reduce((map: Map<number, string>, chord: ChartChord) => {
            map.set(chord.index, chord.chord);
            return map;
          }, new Map<number, string>());
          return (
            <div className="chords-editor-row" key={line.lyrics}>
              {[...Array(maxLineLength(line) + 1).keys()].map((j) => {
                const chord = chordMap.get(j);
                return (
                  <div className="chords-editor-letter" onClick={() => chord && createChord(i, j)}>
                    <p>{line.lyrics[j] || ' '}</p>
                    {chord ? (
                      <span className="chords-editor-chord-input" contentEditable>
                        {' ' || line.lyrics[j] || ' '}
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
