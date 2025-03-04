import { ReadonlySignal, Signal } from '@preact/signals';
import LoadState from 'shared/enums/loadstate';
import Size from 'shared/enums/size';
import cmRenderOptions from 'shared/types/cm/cmrenderoptions';
import ParsedSong from 'shared/types/parsedsong';
import SongInfo from 'shared/types/songinfo';
import SongLoadState from './songloadstate';

interface UIState {
  size: ReadonlySignal<Size>;
  songList: ReadonlySignal<SongInfo[]>;
  songListLoadState: ReadonlySignal<LoadState>;
  searchText: Signal<string>;
  currSong: ReadonlySignal<ParsedSong>;
  currSongLoadState: ReadonlySignal<SongLoadState>;
  renderOptions: ReadonlySignal<cmRenderOptions>;
}

export default UIState;
