import { useContext, useEffect } from 'preact/hooks';
import onSongPageLoad from 'src/state/functions/onsongpageload';
import UIStateContext from 'src/state/uistatecontext';
import SongLoadState from 'src/types/songloadstate';
import SongHeader from './header/songheader';
import SongPageContent from './songpagecontent';

export default function SongPage({ id }: { id: string }) {
  const { currSongLoadState, currSongInfo } = useContext(UIStateContext);

  useEffect(() => onSongPageLoad(id), []);

  // page title
  useEffect(() => {
    if (
      (currSongLoadState.value === SongLoadState.InfoLoaded ||
        currSongLoadState.value === SongLoadState.Loaded) &&
      !!currSongInfo.value?.title
    ) {
      document.title = currSongInfo.value.title + ' - JChords';
    } else {
      document.title = 'JChords';
    }
  }, [currSongLoadState.value]);

  return (
    <div id="songpage" class="flex h-screen w-full flex-col overflow-hidden bg-bg3">
      <SongHeader />
      <div class="flex flex-grow flex-col items-center overflow-y-auto p-4">
        <SongPageContent />
      </div>
    </div>
  );
}
