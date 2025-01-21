import { useContext } from 'preact/hooks';
import LoadingSpinner from 'src/components/loadingspinner/loadingspinner';
import { LoadingStatus } from 'src/shared/types/loadingstatus';
import StateContext from 'src/state/statecontext';

export default function HomeSongList() {
  const state = useContext(StateContext);
  if (state === undefined) return <></>;

  switch (state.songMapLoadingStatus.value) {
    case LoadingStatus.None:
      return <></>;
    case LoadingStatus.Loading:
      return (
        <div class="pt-12">
          <LoadingSpinner class="w-12" />
        </div>
      );
    case LoadingStatus.Error:
      return <p class="text-fgerror p-4 text-xl">Could not load songs</p>;
    case LoadingStatus.Loaded:
      return <>done</>;
  }
}
