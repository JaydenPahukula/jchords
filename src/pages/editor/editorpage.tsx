import { Link } from 'react-router-dom';
import EditorComponent from 'src/components/editor/editor';
import './editorpage.css';

export default function EditorPage() {
  return (
    <div className="song-editor-page">
      <Link to="/">&lt;- Home</Link>
      <EditorComponent></EditorComponent>
    </div>
  );
}
