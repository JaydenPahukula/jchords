import { batch } from '@preact/signals';
import getSong from 'shared/api/functions/getsong';
import LoadState from 'shared/enums/loadstate';
import parseSong from 'shared/functions/parsesong';
import state from 'src/state/state';

export default function onSongPageLoad(songId: string) {
  state.currSongId.value = songId;
  if (state.currSongLoadState.value == LoadState.None || state.currSong.value.info.id != songId) {
    state.currSongLoadState.value = LoadState.Loading;
    getSong(songId).then((result) => {
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
