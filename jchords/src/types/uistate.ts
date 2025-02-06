import { ReadonlySignal } from '@preact/signals';
import LoadState from 'src/shared/enums/loadstate';
import cmRenderOptions from 'src/shared/types/cm/cmrenderoptions';
import ParsedSong from 'src/shared/types/parsedsong';
import SongInfo from 'src/shared/types/songinfo';
import SongLoadState from './songloadstate';

interface UIState {
  songList: ReadonlySignal<SongInfo[]>;
  songListLoadState: ReadonlySignal<LoadState>;
  currSong: ReadonlySignal<ParsedSong>;
  currSongInfo: ReadonlySignal<SongInfo>;
  currSongLoadState: ReadonlySignal<SongLoadState>;
  renderOptions: ReadonlySignal<cmRenderOptions>;
}

export default UIState;
