import { ReadonlySignal } from '@preact/signals';
import LoadState from 'src/shared/types/loadstate';
import Song from 'src/shared/types/song';
import SongInfo from 'src/shared/types/songinfo';
import SongLoadState from './songloadstate';

interface UIState {
  songList: ReadonlySignal<SongInfo[]>;
  songListLoadState: ReadonlySignal<LoadState>;
  currSong: ReadonlySignal<Song | undefined>;
  currSongInfo: ReadonlySignal<SongInfo | undefined>;
  currSongLoadState: ReadonlySignal<SongLoadState>;
}

export default UIState;
