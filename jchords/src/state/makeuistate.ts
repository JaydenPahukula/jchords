import { computed, ReadonlySignal, Signal } from '@preact/signals';
import SongInfo from 'src/shared/types/songinfo';
import State from 'src/types/state';

// create a readonly copy of a state signal
function copySignal<T>(signal: Signal<T>): ReadonlySignal<T> {
  return computed(() => signal.value);
}

/** Makes a subset of the global state signals that will be used by the ui */
export default function makeUIState(state: State) {
  return {
    songList: computed<SongInfo[]>(() => {
      const songMap = state.songMap.value;
      return Object.keys(songMap).map((id) => songMap[id]);
    }),
    songListLoadingStatus: copySignal(state.songMapLoadingStatus),
    currSongInfo: copySignal(state.currSongInfo),
    currSongInfoLoadingStatus: copySignal(state.currSongInfoLoadingStatus),
    currSong: copySignal(state.currSong),
    currSongLoadingStatus: copySignal(state.currSongLoadingStatus),
  };
}
