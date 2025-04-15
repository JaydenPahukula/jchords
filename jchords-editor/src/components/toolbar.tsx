import OpenFolderIcon from 'shared/components/icons/openfoldericon';
import PlusCircleIcon from 'shared/components/icons/pluscircleicon';
import SaveIcon from 'shared/components/icons/saveicon';
import UploadIcon from 'shared/components/icons/uploadicon';
import { newTab } from 'src/state/functions/tabs';

export default function Toolbar() {
  return (
    <div class="bg-bg-0 border-b-bg-4 flex h-9 gap-2 border-b-1 px-2 py-1">
      <button
        onClick={newTab}
        class="hover:bg-bg-button active:bg-bg-button-hover flex cursor-pointer items-center rounded-md"
      >
        <div class="h-full p-[7px] pr-[5px]">
          <PlusCircleIcon />
        </div>
        <p class="mr-2 whitespace-nowrap">New Song</p>
      </button>
      <button class="hover:bg-bg-button active:bg-bg-button-hover flex cursor-pointer items-center rounded-md">
        <div class="h-full p-[7px] pr-[5px]">
          <OpenFolderIcon />
        </div>
        <p class="mr-2 whitespace-nowrap">Open Song</p>
      </button>
      <button class="hover:bg-bg-button active:bg-bg-button-hover flex cursor-pointer items-center rounded-md">
        <div class="h-full p-[7px] pr-[5px]">
          <SaveIcon />
        </div>
        <p class="mr-2 whitespace-nowrap">Save</p>
      </button>
      <button class="hover:bg-bg-button active:bg-bg-button-hover flex cursor-pointer items-center rounded-md">
        <div class="h-full p-[7px] pr-[5px]">
          <UploadIcon />
        </div>
        <p class="mr-2 whitespace-nowrap">Import</p>
      </button>
    </div>
  );
}
