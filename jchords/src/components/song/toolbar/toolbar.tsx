import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import LeftArrowIcon32 from 'src/components/icons/leftarrowicon32';
import { useAppSelector } from 'src/redux/hooks';
import { selectCurrSongInfo } from 'src/redux/slices/songdata';
import './toolbar.css';

export default function Toolbar(): ReactElement {
  const info = useAppSelector(selectCurrSongInfo);

  return (
    <div id="toolbar">
      <div id="toolbar-left">
        <Link to="/" className="toolbar-button">
          <LeftArrowIcon32 />
        </Link>
      </div>
      <h1 id="toolbar-title">{info?.title}</h1>
      <div id="toolbar-right"></div>
    </div>
  );
}
