import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import GearIcon32 from 'shared/icons/gear';
import LeftArrowIcon32 from 'shared/icons/leftarrow';
import SongPageMenu from 'src/components/songpagemenu/songpagemenu';
import SongContext from 'src/pages/song/songcontext';
import './songpagetoolbar.css';

export default function SongPageToolbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { songInfo } = useContext(SongContext);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // close menu when clicked elsewhere
  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (
        isMenuOpen &&
        !menuRef.current?.contains(e.target as Node) &&
        !menuButtonRef.current?.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

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
          <button
            className="toolbar-button"
            ref={menuButtonRef}
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <GearIcon32 />
          </button>
          {isMenuOpen && <SongPageMenu ref={menuRef} />}
        </div>
      </div>
    </div>
  );
}
