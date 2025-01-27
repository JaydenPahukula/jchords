import { useContext } from 'preact/hooks';
import UIStateContext from 'src/state/uistatecontext';

export default function SongHeader() {
  const state = useContext(UIStateContext);

  return (
    <div
      id="header"
      class="bg-bg9 text-fg9 z-[1] flex h-14 flex-shrink-0 items-center justify-center shadow-md"
    >
      <h1 class="text-2xl font-bold">{state.currSongInfo.value?.title}</h1>
    </div>
  );
}
