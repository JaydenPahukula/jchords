import { batch, computed, ReadonlySignal, Signal, signal } from '@preact/signals';
import { getSong, getSongInfo, getSongMap } from 'src/shared/db/functions';
import { LoadingStatus } from 'src/shared/types/loadingstatus';
import Song from 'src/shared/types/song';
import SongInfo from 'src/shared/types/songinfo';
import SongInfoMap from 'src/shared/types/songinfomap';
import State from 'src/types/state';

// create a readonly copy of a state signal
function copySignal<T>(signal: Signal<T>): ReadonlySignal<T> {
  return computed(() => signal.value);
}

export default class StateManager {
  private _state: State = {
    songMap: signal<SongInfoMap>({}),
    songMapLoadingStatus: signal<LoadingStatus>(LoadingStatus.None),
    currSongId: signal<string | undefined>(undefined),
    currSongInfo: signal<SongInfo | undefined>(undefined),
    currSongInfoLoadingStatus: signal<LoadingStatus>(LoadingStatus.None),
    currSong: signal<Song | undefined>(undefined),
    currSongLoadingStatus: signal<LoadingStatus>(LoadingStatus.None),
  };

  // public state
  public songList = computed<SongInfo[]>(() => {
    const songMap = this._state.songMap.value;
    return Object.keys(songMap).map((id) => songMap[id]);
  });
  public songListLoadingStatus = copySignal(this._state.songMapLoadingStatus);
  public currSongInfo = copySignal(this._state.currSongInfo);
  public currSongInfoLoadingStatus = copySignal(this._state.currSongInfoLoadingStatus);
  public currSong = copySignal(this._state.currSong);
  public currSongLoadingStatus = copySignal(this._state.currSongLoadingStatus);

  public onHomePageLoad() {
    batch(() => {
      if (this._state.songMapLoadingStatus.value === LoadingStatus.None) {
        this._state.songMapLoadingStatus.value = LoadingStatus.Loading;
        getSongMap().then((songMap) => {
          batch(() => {
            if (songMap === undefined) {
              this._state.songMapLoadingStatus.value = LoadingStatus.Error;
            } else {
              this._state.songMap.value = songMap;
              this._state.songMapLoadingStatus.value = LoadingStatus.Loaded;
            }
          });
        });
      }
    });
  }

  public onSongPageLoad(songId: string) {
    batch(() => {
      const oldSongId = this._state.currSongId.value;
      this._state.currSongId.value = songId;
      // load song info
      if (songId in this._state.songMap.value) {
        this._state.currSongInfo.value = this._state.songMap.value[songId];
        this._state.currSongInfoLoadingStatus.value = LoadingStatus.Loaded;
      } else {
        this._state.currSongInfoLoadingStatus.value = LoadingStatus.Loading;
        getSongInfo(songId).then((songInfo) => {
          batch(() => {
            if (songInfo === undefined) {
              this._state.currSongInfoLoadingStatus.value = LoadingStatus.Error;
            } else {
              this._state.currSongInfo.value = songInfo;
              this._state.currSongInfoLoadingStatus.value = LoadingStatus.Loaded;
            }
          });
        });
      }
      // load song
      if (this._state.currSongLoadingStatus.value === LoadingStatus.None || oldSongId != songId) {
        this._state.currSong.value = undefined;
        this._state.currSongLoadingStatus.value = LoadingStatus.Loading;
        getSong(songId).then((song) => {
          batch(() => {
            if (song === undefined) {
              this._state.currSongLoadingStatus.value = LoadingStatus.Error;
            } else {
              this._state.currSong.value = song;
              this._state.currSongLoadingStatus.value = LoadingStatus.Loaded;
            }
          });
        });
      }
    });
  }
}
