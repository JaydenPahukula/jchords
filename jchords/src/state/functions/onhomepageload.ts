import { batch } from '@preact/signals';
import { getSongMap } from 'src/shared/db/functions';
import { LoadingStatus } from 'src/shared/types/loadingstatus';
import state from 'src/state/state';

export default function onHomePageLoad() {
  if (state.songMapLoadingStatus.value === LoadingStatus.None) {
    state.songMapLoadingStatus.value = LoadingStatus.Loading;
    getSongMap()
      .then((songMap) => {
        batch(() => {
          state.songMap.value = songMap;
          state.songMapLoadingStatus.value = LoadingStatus.Loaded;
        });
      })
      .catch(() => {
        state.songMapLoadingStatus.value = LoadingStatus.Error;
      });
  }
}
