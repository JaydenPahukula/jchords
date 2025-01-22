import { Signal } from '@preact/signals';
import { LoadingStatus } from 'src/shared/types/loadingstatus';
import Song from 'src/shared/types/song';
import SongInfo from 'src/shared/types/songinfo';
import SongInfoMap from 'src/shared/types/songinfomap';

export default interface State {
  songMap: Signal<SongInfoMap>;
  songMapLoadingStatus: Signal<LoadingStatus>;
  currSongId: Signal<string | undefined>;
  currSongInfo: Signal<SongInfo | undefined>;
  currSongInfoLoadingStatus: Signal<LoadingStatus>;
  currSong: Signal<Song | undefined>;
  currSongLoadingStatus: Signal<LoadingStatus>;
}
