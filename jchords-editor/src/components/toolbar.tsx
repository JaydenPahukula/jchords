import { useContext } from 'preact/hooks';
import OpenFolderIcon from 'shared/components/icons/openfoldericon';
import PlusCircleIcon from 'shared/components/icons/pluscircleicon';
import SaveIcon from 'shared/components/icons/saveicon';
import UploadIcon from 'shared/components/icons/uploadicon';
import Dialog from 'shared/enums/dialog';
import save from 'src/state/functions/save';
import showDialog from 'src/state/functions/showdialog';
import { newTab } from 'src/state/functions/tabs';
import StateContext from 'src/state/statecontext';

export default function Toolbar() {
  const { songs, currSongId } = useContext(StateContext);

  const saveButtonDisabled = !songs.value[currSongId.value ?? '']?.modified;

  return (
    <div class="bg-bg-0 border-b-bg-4 flex h-9 gap-2 border-b-1 px-2 py-1">
      <button
        onClick={() => newTab()}
        class="not-disabled:hover:bg-bg-button not-disabled:active:bg-bg-button-hover flex items-center rounded-md not-disabled:cursor-pointer"
      >
        <div class="h-full p-[7px] pr-[5px]">
          <PlusCircleIcon />
        </div>
        <p class="mr-2 whitespace-nowrap">New Song</p>
      </button>
      <button
        onClick={() => showDialog(Dialog.OpenSong)}
        class="not-disabled:hover:bg-bg-button not-disabled:active:bg-bg-button-hover flex items-center rounded-md not-disabled:cursor-pointer"
      >
        <div class="h-full p-[7px] pr-[5px]">
          <OpenFolderIcon />
        </div>
        <p class="mr-2 whitespace-nowrap">Open Song</p>
      </button>
      <button
        onClick={save}
        disabled={saveButtonDisabled}
        class="not-disabled:hover:bg-bg-button not-disabled:active:bg-bg-button-hover flex items-center rounded-md not-disabled:cursor-pointer"
      >
        <div class="h-full p-[7px] pr-[5px]">
          <SaveIcon />
        </div>
        <p class="mr-2 whitespace-nowrap">Save</p>
      </button>
      <button class="not-disabled:hover:bg-bg-button not-disabled:active:bg-bg-button-hover flex items-center rounded-md not-disabled:cursor-pointer">
        <div class="h-full p-[7px] pr-[5px]">
          <UploadIcon />
        </div>
        <p class="mr-2 whitespace-nowrap">Import</p>
      </button>
    </div>
  );
}
