import { batch } from '@preact/signals';
import { getSong, getSongInfo } from 'shared/db/functions';
import SongNotFoundError from 'shared/errors/songnotfounderror';
import parseSong from 'shared/functions/parsesong';
import state from 'src/state/state';
import SongLoadState from 'src/types/songloadstate';
import { resetTransposeOptions } from './transpose';

function loadSong(id: string) {
  // check if already loaded
  if (state.currSong.value?.id === id) {
    state.currSongLoadState.value = SongLoadState.Loaded;
  } else {
    getSong(id)
      .then((song) => {
        batch(() => {
          state.currSong.value = parseSong(song);
          resetTransposeOptions();
          state.currSongLoadState.value = SongLoadState.Loaded;
        });
      })
      .catch((error) => {
        console.error(error);
        state.currSongLoadState.value = SongLoadState.Error;
      });
  }
}

export default function onSongPageLoad(songId: string) {
  // load song info
  let needToFetchSongInfo = false;
  batch(() => {
    state.currSongId.value = songId;
    // check if already loaded
    if (state.currSongInfo.value?.id === songId) {
      state.currSongLoadState.value = SongLoadState.InfoLoaded;
    } else {
      // try to get from songmap
      if (songId in state.songMap.value) {
        state.currSongInfo.value = state.songMap.value[songId];
        state.currSongLoadState.value = SongLoadState.InfoLoaded;
      } else {
        state.currSongLoadState.value = SongLoadState.Loading;
        needToFetchSongInfo = true;
      }
    }
  });

  if (needToFetchSongInfo) {
    getSongInfo(songId)
      .then((info) => {
        batch(() => {
          state.currSongInfo.value = info;
          state.currSongLoadState.value = SongLoadState.InfoLoaded;
        });
        loadSong(songId);
      })
      .catch((error) => {
        if (error instanceof SongNotFoundError) {
          state.currSongLoadState.value = SongLoadState.SongNotFound;
        } else {
          console.error(error);
          state.currSongLoadState.value = SongLoadState.Error;
        }
      });
  } else {
    loadSong(songId);
  }
}
