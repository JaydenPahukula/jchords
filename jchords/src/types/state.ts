import { Signal } from '@preact/signals';
import { LoadingStatus } from 'src/shared/types/loadingstatus';
import SongInfoMap from 'src/shared/types/songinfomap';

export default interface State {
  songMap: Signal<SongInfoMap | undefined>;
  songMapLoadingStatus: Signal<LoadingStatus>;
}
