import { useContext } from 'preact/hooks';
import LoadState from 'shared/enums/loadstate';
import UIStateContext from 'src/state/uistatecontext';
import LoadingSpinner from '../loadingspinner/loadingspinner';
import Chart from './chart';

export default function SongPageContent() {
  const { currSongLoadState } = useContext(UIStateContext);
  switch (currSongLoadState.value) {
    case LoadState.Loading:
      return (
        <div class="pt-12">
          <LoadingSpinner class="w-12" />
        </div>
      );
    case LoadState.Error:
      return <>Error</>;
    case LoadState.Loaded:
      return <Chart />;
  }
  return <></>;
}
