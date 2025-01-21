import SongId from './songid';
import SongInfo from './songinfo';

export default interface SongInfoMap {
  [key: SongId]: SongInfo;
}
