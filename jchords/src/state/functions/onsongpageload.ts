import { batch } from '@preact/signals';
import { getSong, getSongInfo } from 'src/shared/db/functions';
import SongNotFoundError from 'src/shared/errors/songnotfounderror';
import { LoadingStatus } from 'src/shared/types/loadingstatus';
import state from 'src/state/state';

export default function onSongPageLoad(songId: string) {
  let songExists = true;
  // load song info
  batch(async () => {
    state.currSongId.value = songId;
    if (songId in state.songMap.value) {
      const info = state.songMap.value[songId];
      state.currSongInfo.value = info;
      state.currSongInfoLoadingStatus.value = LoadingStatus.Loaded;
    } else {
      state.currSongInfoLoadingStatus.value = LoadingStatus.Loading;
      await getSongInfo(songId)
        .then((songInfo) => {
          batch(() => {
            state.currSongInfo.value = songInfo;
            state.currSongInfoLoadingStatus.value = LoadingStatus.Loaded;
          });
        })
        .catch((error) => {
          batch(() => {
            state.currSongInfoLoadingStatus.value = LoadingStatus.Error;
            if (error instanceof SongNotFoundError) {
              state.currSongId.value = undefined;
              songExists = false;
            } else throw error;
          });
        });
    }
  });
  // load song
  if (songExists && state.currSong.value?.id !== songId) {
    batch(() => {
      state.currSong.value = undefined;
      state.currSongLoadingStatus.value = LoadingStatus.Loading;
      getSong(songId)
        .then((song) => {
          batch(() => {
            state.currSong.value = song;
            state.currSongLoadingStatus.value = LoadingStatus.Loaded;
          });
        })
        .catch((error) => {
          state.currSongInfoLoadingStatus.value = LoadingStatus.Error;
          if (error instanceof SongNotFoundError) {
            state.currSongId.value = undefined;
          } else throw error;
        });
    });
  }
}
