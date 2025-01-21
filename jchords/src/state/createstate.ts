import { signal } from '@preact/signals';
import { LoadingStatus } from 'src/shared/types/loadingstatus';
import SongInfoMap from 'src/shared/types/songinfomap';
import State from 'src/types/state';

export default function createState(): State {
  return {
    songMap: signal<SongInfoMap | undefined>(),
    songMapLoadingStatus: signal<LoadingStatus>(LoadingStatus.None),
  };
}
