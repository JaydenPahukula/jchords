import { useContext } from 'preact/hooks';
import LoadingSpinner from 'shared/components/loadingspinner/loadingspinner';
import LoadState from 'shared/enums/loadstate';
import Chart from 'src/components/songpage/chart';
import StateContext from 'src/state/statecontext';

export default function SongPageContent() {
  const { currSongLoadState } = useContext(StateContext);
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
