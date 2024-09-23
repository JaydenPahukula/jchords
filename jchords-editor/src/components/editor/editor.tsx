import './editor.css';

export default function Editor() {
  return (
    <div id="editor">
      <div id="editor-input-section">
        <h2 className="editor-header">Edit: (ChordMark)</h2>
        <textarea id="editor-input"></textarea>
      </div>
      <div id="editor-preview-section">
        <h2 className="editor-header">Edit: (ChordMark)</h2>
        <div>preview</div>
      </div>
    </div>
  );
}
