import { useContext } from 'preact/hooks';
import LoadState from 'shared/enums/loadstate';
import LoadingSpinner from 'src/components/loadingspinner/loadingspinner';
import Chart from 'src/components/songpage/chart';
import UIStateContext from 'src/state/uistatecontext';

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
