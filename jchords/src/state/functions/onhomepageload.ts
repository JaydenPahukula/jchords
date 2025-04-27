import { batch } from '@preact/signals';
import Dialog from 'shared/enums/dialog';
import LoadState from 'shared/enums/loadstate';
import getSongList from 'shared/functions/api/endpoints/getsonglist';
import state from 'src/state/state';

export default function onHomePageLoad() {
  state.dialog.value = Dialog.None;
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
