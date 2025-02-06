import cmAccidental from './cmaccidental';
import cmKey from './cmkey';

interface cmSongLine {
  // TODO
}

interface cmSongChord {
  // TODO
}

interface cmKeyDeclaration {
  string: cmKey;
  accidentals: cmAccidental;
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
