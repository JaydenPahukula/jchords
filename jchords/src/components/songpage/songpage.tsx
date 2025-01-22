import { useContext, useEffect } from 'preact/hooks';
import { LoadingStatus } from 'src/shared/types/loadingstatus';
import StateContext from 'src/state/statecontext';

export default function SongPage({ id }: { id: string }) {
  const state = useContext(StateContext);

  useEffect(() => state.onSongPageLoad(id), []);

  // update title when appropriate
  useEffect(() => {
    const title = state.currSongInfo.value?.title;
    if (
      state.currSongInfoLoadingStatus.value === LoadingStatus.Loaded &&
      title !== undefined &&
      title !== document.title
    ) {
      document.title = `${title} - JChords`;
    }
  });

  return <>{state.currSongInfo.value?.title}</>;
}
