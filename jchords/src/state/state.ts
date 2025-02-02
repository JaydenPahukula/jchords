import { signal } from '@preact/signals';
import LoadState from 'src/shared/types/loadstate';
import Song from 'src/shared/types/song';
import SongInfo from 'src/shared/types/songinfo';
import SongInfoMap from 'src/shared/types/songinfomap';
import SongLoadState from 'src/types/songloadstate';

/** Global app state */
const state = {
  songMap: signal<SongInfoMap>({}),
  songMapLoadState: signal<LoadState>(LoadState.None),
  currSongId: signal<string | undefined>(undefined),
  currSong: signal<Song | undefined>(undefined),
  currSongInfo: signal<SongInfo | undefined>(undefined),
  currSongLoadState: signal<SongLoadState>(SongLoadState.Loading),
};

export default state;
