import SongLine from './line';
import TimeSignature from './timesignature';

export default interface Song {
  timeSignature: TimeSignature;
  lines: SongLine;
}
