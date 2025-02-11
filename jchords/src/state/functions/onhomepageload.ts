import { batch } from '@preact/signals';
import { getSongMap } from 'shared/db/functions';
import LoadState from 'shared/enums/loadstate';
import state from 'src/state/state';

export default function onHomePageLoad() {
  if (state.songMapLoadState.value === LoadState.None) {
    state.songMapLoadState.value = LoadState.Loading;
    getSongMap()
      .then((songMap) => {
        batch(() => {
          state.songMap.value = songMap;
          state.songMapLoadState.value = LoadState.Loaded;
        });
      })
      .catch(() => {
        state.songMapLoadState.value = LoadState.Error;
      });
  }
}
