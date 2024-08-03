import { Link } from 'react-router-dom';
import SongEditorComponent from 'src/components/songeditor/songeditor';
import './songeditorpage.css';

export default function SongEditorPage() {
  return (
    <div className="song-editor-page">
      <Link to="/">&lt;- Home</Link>
      <SongEditorComponent></SongEditorComponent>
    </div>
  );
}
