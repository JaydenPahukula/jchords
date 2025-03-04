import { batch } from '@preact/signals';
import getSongList from 'shared/api/functions/getsonglist';
import LoadState from 'shared/enums/loadstate';
import state from 'src/state/state';

export default function onHomePageLoad() {
  if (state.songListLoadState.value === LoadState.None) {
    state.songListLoadState.value = LoadState.Loading;
    getSongList().then((list) => {
      batch(() => {
        if (list == undefined) {
          state.songListLoadState.value = LoadState.Error;
        } else {
          state.songList.value = list;
          state.songListLoadState.value = LoadState.Loaded;
        }
      });
    });
  }
}
