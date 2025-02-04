import { useContext } from 'preact/hooks';
import UIStateContext from 'src/state/uistatecontext';
import SongLoadState from 'src/types/songloadstate';
import LoadingSpinner from '../loadingspinner/loadingspinner';
import Chart from './chart';

export default function SongPageContent() {
  const { currSongLoadState } = useContext(UIStateContext);

  switch (currSongLoadState.value) {
    case SongLoadState.Loading:
    case SongLoadState.InfoLoaded:
      return (
        <div class="pt-12">
          <LoadingSpinner class="w-12" />
        </div>
      );
    case SongLoadState.Error:
      return <>Error</>;
    case SongLoadState.SongNotFound:
      return <>Song not found</>;
    case SongLoadState.Loaded:
      return <Chart />;
  }
}
