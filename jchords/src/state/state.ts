import { signal } from '@preact/signals';
import { LoadingStatus } from 'src/shared/types/loadingstatus';
import Song from 'src/shared/types/song';
import SongInfo from 'src/shared/types/songinfo';
import SongInfoMap from 'src/shared/types/songinfomap';

/** Global app state */
const state = {
  songMap: signal<SongInfoMap>({}),
  songMapLoadingStatus: signal<LoadingStatus>(LoadingStatus.None),
  currSongId: signal<string | undefined>(undefined),
  currSongInfo: signal<SongInfo | undefined>(undefined),
  currSongInfoLoadingStatus: signal<LoadingStatus>(LoadingStatus.None),
  currSong: signal<Song | undefined>(undefined),
  currSongLoadingStatus: signal<LoadingStatus>(LoadingStatus.None),
};

export default state;
