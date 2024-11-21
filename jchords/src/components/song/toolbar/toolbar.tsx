import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import GearIcon32 from 'src/components/icons/gearicon32';
import LeftArrowIcon32 from 'src/components/icons/leftarrowicon32';
import MusicNoteIcon32 from 'src/components/icons/musicnoteicon32';
import { useAppSelector } from 'src/redux/hooks';
import { selectCurrSongInfo } from 'src/redux/slices/songdata';
import './toolbar.css';
import ToolbarMenuButton from './toolbarmenubutton';
import TransposeMenu from './transposemenu/transposemenu';

export default function Toolbar(): ReactElement {
  const title = useAppSelector(selectCurrSongInfo)?.title ?? '';

  return (
    <div id="toolbar">
      <div id="toolbar-left">
        <Link to="/" className="toolbar-button">
          <LeftArrowIcon32 />
        </Link>
      </div>
      <h1 id="toolbar-title">{title}</h1>
      <div id="toolbar-right">
        <ToolbarMenuButton renderMenu={(ref) => <TransposeMenu ref={ref} />}>
          <MusicNoteIcon32 />
        </ToolbarMenuButton>
        <button className="toolbar-button">
          <GearIcon32 />
        </button>
      </div>
    </div>
  );
}
