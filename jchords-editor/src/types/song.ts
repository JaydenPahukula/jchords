import SongInfo from './songinfo';

export default interface Song {
  src: string | undefined;
  info: SongInfo;
}
