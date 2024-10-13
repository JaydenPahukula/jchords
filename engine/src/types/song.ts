import SongSection from './section';
import TimeSignature from './timesignature';

export default interface Song {
  timeSignature: TimeSignature | undefined;
  sections: SongSection[];
}
