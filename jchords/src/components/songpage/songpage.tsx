import { useContext, useEffect } from 'preact/hooks';
import { LoadState } from 'shared/enums/loadstate';
import { SongHeader } from 'src/components/songpage/header/songheader';
import { SongPageContent } from 'src/components/songpage/songpagecontent';
import { onSongPageLoad } from 'src/state/functions/onsongpageload';
import { StateContext } from 'src/state/statecontext';

export function SongPage({ id }: { id: string }) {
  const { currSongLoadState, currSong } = useContext(StateContext);

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
    <div id="songpage" class="bg-bg-4 flex h-screen w-full flex-col overflow-hidden">
      <SongHeader />
      <div class="flex grow flex-col items-center overflow-y-auto p-4">
        <SongPageContent />
      </div>
    </div>
  );
}
