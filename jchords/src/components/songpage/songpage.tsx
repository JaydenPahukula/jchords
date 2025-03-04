import { useContext, useEffect } from 'preact/hooks';
import LoadState from 'shared/enums/loadstate';
import onSongPageLoad from 'src/state/functions/onsongpageload';
import UIStateContext from 'src/state/uistatecontext';
import SongHeader from './header/songheader';
import SongPageContent from './songpagecontent';

export default function SongPage({ id }: { id: string }) {
  const { currSongLoadState, currSong } = useContext(UIStateContext);

  useEffect(() => onSongPageLoad(id), []);

  // page title
  useEffect(() => {
    if (currSongLoadState.value === LoadState.Loaded && !!currSong.value.info.title) {
      document.title = currSong.value.info.title + ' - JChords';
    } else {
      document.title = 'JChords';
    }
  }, [currSongLoadState.value]);

  return (
    <div id="songpage" class="bg-bg-2 flex h-screen w-full flex-col overflow-hidden">
      <SongHeader />
      <div class="flex flex-grow flex-col items-center overflow-y-auto p-4">
        <SongPageContent />
      </div>
    </div>
  );
}
