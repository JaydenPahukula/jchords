import SongLine from './songline';

export default interface SongSection {
  name: string | undefined;
  lines: SongLine[];
}
