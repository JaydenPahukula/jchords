import { useContext } from 'preact/hooks';
import UIStateContext from 'src/state/uistatecontext';

export default function SongPageContent() {
  const state = useContext(UIStateContext);

  return (
    <div class="flex flex-grow flex-col items-center overflow-y-auto">
      {state.currSongInfo.value?.id === undefined ? (
        <>Invalid song ID</>
      ) : (
        <>{state.currSongInfo.value?.title}</>
      )}
    </div>
  );
}
