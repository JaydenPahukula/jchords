import { ReadonlySignal, Signal } from '@preact/signals';
import { User } from 'firebase/auth';
import LoadState from 'shared/enums/loadstate';
import Size from 'shared/enums/size';
import cmRenderOptions from 'shared/types/cm/cmrenderoptions';
import ParsedSong from 'shared/types/parsedsong';
import SongInfo from 'shared/types/songinfo';

interface UIState {
  size: ReadonlySignal<Size>;
  songList: ReadonlySignal<SongInfo[]>;
  songListLoadState: ReadonlySignal<LoadState>;
  searchText: Signal<string>;
  currSong: ReadonlySignal<ParsedSong>;
  currSongLoadState: ReadonlySignal<LoadState>;
  renderOptions: ReadonlySignal<cmRenderOptions>;
  user: ReadonlySignal<User | null>;
}

export default UIState;
