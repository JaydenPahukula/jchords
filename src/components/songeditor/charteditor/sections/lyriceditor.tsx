import ChartEditorSectionProps from './charteditorsectionprops';
import './lyriceditor.css';

export default function LyricEditorComponent(props: ChartEditorSectionProps) {
  const selectedId = props.selectedId || '';
  const sections = props.sections || {};
  const lyrics: string[] = sections[selectedId]?.lines.map((line) => line.lyrics) || [];

  function getInputValue() {
    return (document.getElementById('lyric-editor-input') as HTMLInputElement).value;
  }

  function handleChange() {
    const lines = getInputValue().split('\n');
    if (selectedId && sections?.[selectedId]) {
      let i = 0;
      for (; i < lines.length; i++) {
        if (i < sections[selectedId].lines.length) {
          sections[selectedId].lines[i].lyrics = lines[i];
        } else {
          sections[selectedId].lines.push({
            lyrics: lines[i],
            chords: {},
          });
        }
      }
      // handle deleted lines
      for (; i < sections[selectedId].lines.length; i++) {
        sections[selectedId].lines.pop();
      }
      props.setSections(sections);
    }
  }

  return (
    <section className="lyric-editor-section">
      <h2>Lyrics:</h2>
      <textarea
        className="lyric-editor-textarea"
        id="lyric-editor-input"
        value={lyrics.join('\n')}
        onChange={handleChange}
        disabled={sections[selectedId] === undefined}
      ></textarea>
    </section>
  );
}
