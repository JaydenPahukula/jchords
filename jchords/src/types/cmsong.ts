import Accidental from 'src/types/accidental';
import Key from 'src/types/key';

interface cmSongLine {
  // TODO
}

interface cmSongChord {
  // TODO
}

interface cmKeyDeclaration {
  string: Key;
  accidentals: Accidental;
}

interface cmSongKeys {
  auto: cmKeyDeclaration | undefined;
  explicit: cmKeyDeclaration[];
}

export default interface cmSong {
  allLines: cmSongLine[];
  allChords: cmSongChord[];
  allKeys: cmSongKeys;
}
