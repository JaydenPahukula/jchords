import { computed, ReadonlySignal, signal, Signal } from '@preact/signals';
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
    songList: copySignal(state.songList),
    songListLoadState: copySignal(state.songListLoadState),
    searchText: signal<string>(''),
    currSong: copySignal(state.currSong),
    currSongLoadState: copySignal(state.currSongLoadState),
    renderOptions: copySignal(state.renderOptions),
    user: copySignal(state.user),
  };
}
