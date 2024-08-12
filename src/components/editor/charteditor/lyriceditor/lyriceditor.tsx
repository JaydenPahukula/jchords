import ChartSection from 'src/types/chartsection';
import './lyriceditor.css';

interface LyricEditorComponentProps {
  section: ChartSection | undefined;
  setSection: (section: ChartSection) => void;
}

export default function LyricEditorComponent(props: LyricEditorComponentProps) {
  const lyrics: string[] = props.section?.lines.map((line) => line.lyrics) || [];

  function handleChange(newValue: string) {
    const lines = newValue.split('\n');
    if (props.section) {
      let i = 0;
      for (; i < lines.length; i++) {
        if (i < props.section.lines.length) {
          props.section.lines[i].lyrics = lines[i];
        } else {
          props.section.lines.push({
            lyrics: lines[i],
            chords: {},
          });
        }
      }
      // handle deleted lines
      for (; i < props.section.lines.length; i++) {
        props.section.lines.pop();
      }
      props.setSection(props.section);
    }
  }

  return (
    <section className="lyric-editor-section">
      <h2>Lyrics:</h2>
      <textarea
        className="lyric-editor-textarea"
        value={lyrics.join('\n')}
        onChange={(e) => handleChange(e.target.value)}
        disabled={props.section === undefined}
      ></textarea>
    </section>
  );
}
