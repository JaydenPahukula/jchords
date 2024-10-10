import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import LeftArrowIcon32 from 'shared/icons/leftarrow';
import MusicNoteIcon32 from 'shared/icons/musicnote';
import TransposeMenu from 'src/components/transposemenu/transposemenu';
import SongContext from 'src/pages/song/songcontext';
import './songpagetoolbar.css';

export default function SongPageToolbar() {
  const [isTransposeMenuOpen, setIsTransposeMenuOpen] = useState<boolean>(false);
  const { songInfo } = useContext(SongContext);

  function toggleTransposeMenu() {
    setIsTransposeMenuOpen(!isTransposeMenuOpen);
  }

  return (
    <div id="toolbar">
      <div id="toolbar-left-buttons">
        <Link to="/" className="toolbar-button">
          <LeftArrowIcon32 />
        </Link>
      </div>
      <div id="toolbar-title-container">
        <h1 id="toolbar-title">{songInfo?.name}</h1>
      </div>
      <div id="toolbar-right-buttons">
        <div className="toolbar-menu-wrapper">
          <button className="toolbar-button" onClick={toggleTransposeMenu}>
            <MusicNoteIcon32 />
          </button>
          {isTransposeMenuOpen && <TransposeMenu />}
        </div>
      </div>
    </div>
  );
}
