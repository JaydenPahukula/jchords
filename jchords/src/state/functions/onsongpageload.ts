import { batch } from '@preact/signals';
import { DialogType } from 'shared/enums/dialogtype';
import { LoadState } from 'shared/enums/loadstate';
import { apiGetSong } from 'shared/functions/api/endpoints/getsong';
import { parseSong } from 'shared/functions/parsesong';
import { state } from 'src/state/state';

export function onSongPageLoad(songId: string) {
  batch(() => {
    state.currSongId.value = songId;
    state.dialog.value = DialogType.None;
  });
  if (state.currSongLoadState.value == LoadState.None || state.currSong.value.info.id != songId) {
    state.currSongLoadState.value = LoadState.Loading;
    apiGetSong(songId).then((result) => {
      if (result === undefined) {
        state.currSongLoadState.value = LoadState.Error;
      } else {
        batch(() => {
          state.currSongLoadState.value = LoadState.Loaded;
          state.currSong.value = parseSong(result);
        });
      }
    });
  }
}
