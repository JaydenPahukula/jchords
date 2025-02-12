import Accidental from 'shared/enums/accidental';
import Key from 'shared/enums/key';
import Mode from 'shared/enums/mode';

/** Get the string representation of the given key. */
export default function keyToString(
  key: Key,
  accidental: Accidental,
  mode: Mode = Mode.Major,
): string {
  if (mode == Mode.Major) {
    if (accidental == Accidental.Sharp) {
      return ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'][key];
    } else {
      return ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'][key];
    }
  } else {
    if (accidental == Accidental.Sharp) {
      return ['Am', 'A#m', 'Bm', 'Cm', 'C#m', 'Dm', 'D#m', 'Em', 'Fm', 'F#m', 'Gm', 'G#m'][key];
    } else {
      return ['Am', 'Bbm', 'Bm', 'Cm', 'Dbm', 'Dm', 'Ebm', 'Em', 'Fm', 'Gbm', 'Gm', 'Abm'][key];
    }
  }
}
