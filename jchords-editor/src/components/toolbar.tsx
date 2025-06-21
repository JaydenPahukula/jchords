import { useComputed } from '@preact/signals-react';
import { useContext } from 'react';
import { OpenFolderIcon } from 'shared/components/icons/openfoldericon';
import { PlusCircleIcon } from 'shared/components/icons/pluscircleicon';
import { UploadIcon } from 'shared/components/icons/uploadicon';
import { DialogType } from 'shared/enums/dialogtype';
import { showDialog } from 'src/state/functions/showdialog';
import { newTab } from 'src/state/functions/tabs';
import { StateContext } from 'src/state/statecontext';

export function Toolbar() {
  const state = useContext(StateContext);

  const deleteButtonDisabled = useComputed(
    () => state.isCurrSongNew.value || state.currSong.value.info.author !== state.user.value?.uid,
  );

  return (
    <div className="bg-bg-0 border-b-bg-4 flex h-9 gap-2 border-b-1 px-2 py-1">
      <button
        onClick={() => newTab()}
        className="not-disabled:hover:bg-bg-button not-disabled:active:bg-bg-button-hover flex items-center rounded-md not-disabled:cursor-pointer"
      >
        <div className="h-full p-[7px] pr-[5px]">
          <PlusCircleIcon />
        </div>
        <p className="mr-2 whitespace-nowrap">New Song</p>
      </button>
      <button
        onClick={() => showDialog(DialogType.OpenSong)}
        className="not-disabled:hover:bg-bg-button not-disabled:active:bg-bg-button-hover flex items-center rounded-md not-disabled:cursor-pointer"
      >
        <div className="h-full p-[7px] pr-[5px]">
          <OpenFolderIcon />
        </div>
        <p className="mr-2 whitespace-nowrap">Open Song</p>
      </button>
      <button
        onClick={() => showDialog(DialogType.Import)}
        className="not-disabled:hover:bg-bg-button not-disabled:active:bg-bg-button-hover flex items-center rounded-md not-disabled:cursor-pointer"
      >
        <div className="h-full p-[7px] pr-[5px]">
          <UploadIcon />
        </div>
        <p className="mr-2 whitespace-nowrap">Import</p>
      </button>
      <button
        disabled={deleteButtonDisabled.value}
        onClick={() => showDialog(DialogType.DialogConfirmation)}
        className="not-disabled:hover:bg-bg-button not-disabled:active:bg-bg-button-hover flex items-center rounded-md not-disabled:cursor-pointer"
      >
        <div className="h-full p-[7px] pr-[5px]">
          <UploadIcon />
        </div>
        <p className="mr-2 whitespace-nowrap">Delete</p>
      </button>
    </div>
  );
}
