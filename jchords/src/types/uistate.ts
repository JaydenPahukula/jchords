import { ReadonlySignal, Signal } from '@preact/signals';
import LoadState from 'shared/enums/loadstate';
import cmRenderOptions from 'shared/types/cm/cmrenderoptions';
import ParsedSong from 'shared/types/parsedsong';
import SongInfo from 'shared/types/songinfo';
import SongLoadState from './songloadstate';

interface UIState {
  songList: ReadonlySignal<SongInfo[]>;
  songListLoadState: ReadonlySignal<LoadState>;
  searchText: Signal<string>;
  currSong: ReadonlySignal<ParsedSong>;
  currSongInfo: ReadonlySignal<SongInfo>;
  currSongLoadState: ReadonlySignal<SongLoadState>;
  renderOptions: ReadonlySignal<cmRenderOptions>;
}

export default UIState;
