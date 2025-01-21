import { batch, computed, ReadonlySignal, Signal } from '@preact/signals';
import { getSongMap } from 'src/shared/db/functions';
import { LoadingStatus } from 'src/shared/types/loadingstatus';
import State from 'src/types/state';

const readonly = (signal: Signal): ReadonlySignal => computed(() => signal.value);

export default class StateManager {
  // readonly access
  public songMap = readonly(this._state.songMap);
  public songMapLoadingStatus = readonly(this._state.songMapLoadingStatus);

  constructor(private _state: State) {}

  public onHomePageLoad() {
    if (this._state.songMapLoadingStatus.value === LoadingStatus.None) {
      batch(() => {
        this._state.songMap.value = undefined;
        this._state.songMapLoadingStatus.value = LoadingStatus.Loading;
      });
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
  }
}
