import { useContext, useEffect } from 'preact/hooks';
import { LoadingStatus } from 'src/shared/types/loadingstatus';
import onSongPageLoad from 'src/state/functions/onsongpageload';
import UIStateContext from 'src/state/uistatecontext';
import SongHeader from './songheader';
import SongPageContent from './songpagecontent';

export default function SongPage({ id }: { id: string }) {
  const state = useContext(UIStateContext);

  useEffect(() => onSongPageLoad(id), []);

  useEffect(() => {
    if (
      state.currSongInfoLoadingStatus.value === LoadingStatus.Loaded &&
      state.currSongInfo.value?.title !== undefined
    ) {
      document.title = state.currSongInfo.value.title + ' - JChords';
    } else {
      document.title = 'JChords';
    }
  });

  return (
    <div id="songpage" class="bg-bg3 flex h-screen w-full flex-col">
      <SongHeader />
      <SongPageContent />
    </div>
  );
}
