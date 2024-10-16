// @ts-ignore
import { parseSong, renderSong } from 'chord-mark/lib/chord-mark.js';
import SongChart from 'shared/types/songchart';
import calcCmRenderOptions from 'shared/utils/cmrenderoptions';
import './editor.css';

interface EditorProps {
  chart: SongChart | undefined;
  setChart: (chart: SongChart) => void;
}

export default function Editor(props: EditorProps) {
  function setText(newText: string) {
    if (props.chart !== undefined) {
      props.setChart({
        ...props.chart,
        text: newText,
      });
    }
  }

  return (
    <div id="editor">
      <div id="editor-input-section">
        <h2 className="editor-header">Edit: (ChordMark)</h2>
        <textarea
          id="editor-input"
          wrap="off"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          disabled={props.chart === undefined}
          value={props.chart?.text ?? ''}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <div id="editor-preview-section">
        <h2 className="editor-header">Preview</h2>
        <div className="editor-preview-container">
          <pre
            className="editor-preview"
            dangerouslySetInnerHTML={{
              __html:
                props.chart === undefined
                  ? ''
                  : renderSong(parseSong(props.chart.text), calcCmRenderOptions({})),
            }}
          ></pre>
        </div>
      </div>
    </div>
  );
}
