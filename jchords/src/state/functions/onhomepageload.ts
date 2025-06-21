import { batch } from '@preact/signals';
import { DialogType } from 'shared/enums/dialogtype';
import { LoadState } from 'shared/enums/loadstate';
import { apiGetSongList } from 'shared/functions/api/endpoints/getsonglist';
import { state } from 'src/state/state';

export function onHomePageLoad() {
  state.dialog.value = DialogType.None;
  if (state.songListLoadState.value === LoadState.None) {
    state.songListLoadState.value = LoadState.Loading;
    apiGetSongList().then((list) => {
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
