import { computed, ReadonlySignal, signal, Signal } from '@preact/signals';
import SongInfo from 'shared/types/songinfo';
import State from 'src/types/state';
import UIState from 'src/types/uistate';

// create a readonly copy of a state signal
function copySignal<T>(signal: Signal<T>): ReadonlySignal<T> {
  return computed(() => signal.value);
}

/** Makes a subset of the global state signals that will be used by the ui */
export default function makeUIState(state: State): UIState {
  return {
    size: copySignal(state.size),
    songList: computed<SongInfo[]>(() => {
      const songMap = state.songMap.value;
      const songList = Object.keys(songMap).map((id) => songMap[id]);
      songList.sort((a, b) => (a.title == b.title ? 0 : a.title > b.title ? 1 : -1));
      return songList;
    }),
    songListLoadState: copySignal(state.songMapLoadState),
    searchText: signal<string>(''),
    currSong: copySignal(state.currSong),
    currSongInfo: copySignal(state.currSongInfo),
    currSongLoadState: copySignal(state.currSongLoadState),
    renderOptions: copySignal(state.renderOptions),
  };
}
