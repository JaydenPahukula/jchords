import { ReactElement } from 'react';
import OpenFolderIcon18 from 'src/components/icons/openfoldericon18';
import { useAppDispatch } from 'src/redux/hooks';
import { openSongPickerDialog } from 'src/redux/slices/dialog';
import './toolbar.css';

export default function Toolbar(): ReactElement {
  const dispatch = useAppDispatch();

  const openSongPicker = () => dispatch(openSongPickerDialog());

  return (
    <div id="toolbar">
      <div className="toolbar-button" onClick={openSongPicker}>
        <OpenFolderIcon18 />
        Open Song
      </div>
      <div className="toolbar-button">
        <OpenFolderIcon18 />
        Placeholder
      </div>
    </div>
  );
}
