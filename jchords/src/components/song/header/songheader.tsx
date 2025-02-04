import { route } from 'preact-router';
import { useContext } from 'preact/hooks';
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
      <div class="flex flex-1 justify-end px-3"></div>
    </div>
  );
}
