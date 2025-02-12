import { route } from 'preact-router';
import { useContext } from 'preact/hooks';
import ExpandableMenuButton from 'src/components/expandablemenubutton/expandablemenubutton';
import GearIcon from 'src/components/icons/gearicon';
import HomeIcon from 'src/components/icons/homeicon';
import MusicNoteIcon from 'src/components/icons/musicnoteicon';
import UIStateContext from 'src/state/uistatecontext';
import SongHeaderButton from './songheaderbutton';
import TestMenu from './testmenu';
import TransposeMenu from './transposemenu';

export default function SongHeader() {
  const state = useContext(UIStateContext);

  return (
    <div
      id="header"
      class="bg-bg-9 text-fg-9 z-[1] flex h-[3.25rem] flex-shrink-0 items-center shadow-md"
    >
      <div class="flex flex-1 px-3">
        <SongHeaderButton onClick={() => route('/')}>
          <HomeIcon />
        </SongHeaderButton>
      </div>
      <h1 class="align-middle text-2xl font-bold">{state.currSongInfo.value?.title}</h1>
      <div class="flex flex-1 justify-end gap-2 px-3">
        <ExpandableMenuButton menu={<TransposeMenu />}>
          <SongHeaderButton>
            <MusicNoteIcon />
          </SongHeaderButton>
        </ExpandableMenuButton>
        <ExpandableMenuButton menu={<TestMenu />}>
          <SongHeaderButton>
            <GearIcon />
          </SongHeaderButton>
        </ExpandableMenuButton>
      </div>
    </div>
  );
}
