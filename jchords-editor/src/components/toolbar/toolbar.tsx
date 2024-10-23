import { ReactElement, useEffect, useState } from 'react';
import CheckIcon18 from 'src/components/icons/checkicon18';
import HourglassIcon18 from 'src/components/icons/hourglassicon18';
import OpenFolderIcon18 from 'src/components/icons/openfoldericon18';
import SaveIcon18 from 'src/components/icons/saveicon18';
import WarningIcon18 from 'src/components/icons/warningicon18';
import { createNewSong, setSongInfo, setSongSrc } from 'src/db/functions';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { openSongPickerDialog } from 'src/redux/slices/dialog';
import { markUnmodified, selectSongData, songCreated } from 'src/redux/slices/songdata';
import './toolbar.css';

enum SaveState {
  None,
  Loading,
  Success,
  Error,
}

export default function Toolbar(): ReactElement {
  const [saveState, setSaveState] = useState<SaveState>(SaveState.None);

  const { currIndex, songs, order } = useAppSelector(selectSongData);
  const dispatch = useAppDispatch();
  const currId = order[currIndex];

  useEffect(() => {
    setSaveState(SaveState.None);
  }, [currIndex]);

  const openSongPicker = () => dispatch(openSongPickerDialog());

  const saveDisabled =
    currId === 'welcome' || !(songs[currId].infoModified || songs[currId].srcModified);

  function saveSong() {
    if (saveDisabled || saveState === SaveState.Loading) return;
    const id = order[currIndex];
    const { song, srcModified, infoModified, isNew } = songs[id];
    setSaveState(SaveState.Loading);
    if (isNew) {
      if (song.src !== undefined)
        createNewSong(song.info, song.src)
          .then((newId) => {
            dispatch(songCreated({ oldId: id, id: newId }));
            setSaveState(SaveState.Success);
          })
          .catch(() => {
            console.error('failed to create song');
            setSaveState(SaveState.Error);
          });
    } else {
      Promise.all([
        !isNew && srcModified && song.src !== undefined && setSongSrc(song.info.id, song.src),
        !isNew && infoModified && setSongInfo(song.info),
      ])
        .then(() => {
          dispatch(markUnmodified(id));
          setSaveState(SaveState.Success);
        })
        .catch(() => {
          console.error('failed to save song');
          setSaveState(SaveState.Error);
        });
    }
  }

  return (
    <div id="toolbar">
      <div className="toolbar-button" onClick={openSongPicker}>
        <OpenFolderIcon18 />
        Open Song
      </div>
      <div
        className={saveDisabled ? 'toolbar-button-disabled' : 'toolbar-button'}
        onClick={saveSong}
      >
        {saveState === SaveState.Loading ? (
          <HourglassIcon18 />
        ) : saveState === SaveState.Success ? (
          <CheckIcon18 />
        ) : saveState === SaveState.Error ? (
          <WarningIcon18 />
        ) : (
          <SaveIcon18 />
        )}
        Save
      </div>
    </div>
  );
}
