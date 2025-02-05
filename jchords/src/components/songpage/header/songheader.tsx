import { route } from 'preact-router';
import { useContext } from 'preact/hooks';
import ExpandableMenuButton from 'src/components/expandablemenubutton/expandablemenubutton';
import GearIcon from 'src/components/icons/gearicon';
import HomeIcon from 'src/components/icons/homeicon';
import UIStateContext from 'src/state/uistatecontext';
import SongHeaderButton from './songheaderbutton';

export default function SongHeader() {
  const state = useContext(UIStateContext);

  return (
    <div
      id="header"
      class="z-[1] flex h-[3.25rem] flex-shrink-0 items-center bg-bg9 text-fg9 shadow-md"
    >
      <div class="flex flex-1 px-3">
        <SongHeaderButton onClick={() => route('/')} icon={<HomeIcon />} />
      </div>
      <h1 class="align-middle text-2xl font-bold">{state.currSongInfo.value?.title}</h1>
      <div class="flex flex-1 justify-end px-3">
        <ExpandableMenuButton menu={<div class="h-96 w-96 bg-bg0 text-fg0 shadow-lg">test</div>}>
          <SongHeaderButton icon={<GearIcon />} />
        </ExpandableMenuButton>
      </div>
    </div>
  );
}
